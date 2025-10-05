const db = require("../config/db");

// Place an order
exports.createOrder = (req, res) => {
  const userId = req.user.id;
  const { items, totalAmount, shippingAddress } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0)
    return res.status(400).json({ error: "Order must contain items" });

  db.beginTransaction(err => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(
      "INSERT INTO orders (user_id, total_amount, shipping_address, status) VALUES (?,?,?,?)",
      [userId, parseFloat(totalAmount) || 0, shippingAddress || "", "pending"],
      (err, result) => {
        if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

        const orderId = result.insertId;
        const values = [];
        let i = 0;

        const processNext = () => {
          if (i >= items.length) {
            db.query(
              "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?",
              [values],
              err => {
                if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
                db.commit(err => {
                  if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
                  res.status(201).json({ success: true, orderId });
                });
              }
            );
            return;
          }

          const it = items[i];
          const productId = it.productId;
          const quantity = parseInt(it.quantity) || 0;
          const price = parseFloat(it.price) || 0.0;

          db.query("SELECT stock FROM products WHERE id=? FOR UPDATE", [productId], (err, rows) => {
            if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
            if (!rows.length) return db.rollback(() => res.status(400).json({ error: `Product ${productId} not found` }));
            if (rows[0].stock < quantity) return db.rollback(() => res.status(400).json({ error: `Insufficient stock for product ${productId}` }));

            db.query("UPDATE products SET stock=stock-? WHERE id=?", [quantity, productId], err => {
              if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
              values.push([orderId, productId, quantity, price]);
              i++;
              processNext();
            });
          });
        };

        processNext();
      }
    );
  });
};

// Get user orders
exports.getOrders = (req, res) => {
  const userId = req.user.id;

  db.query("SELECT * FROM orders WHERE user_id=? ORDER BY created_at DESC", [userId], (err, orders) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!orders.length) return res.json([]);

    const orderIds = orders.map(o => o.id);
    db.query(
      "SELECT oi.*, p.title AS product_title, p.imageUrl FROM order_items oi LEFT JOIN products p ON p.id=oi.product_id WHERE oi.order_id IN (?)",
      [orderIds],
      (err, items) => {
        if (err) return res.status(500).json({ error: err.message });

        const itemsByOrder = {};
        items.forEach(it => {
          if (!itemsByOrder[it.order_id]) itemsByOrder[it.order_id] = [];
          itemsByOrder[it.order_id].push({
            id: it.id,
            productId: it.product_id,
            productTitle: it.product_title,
            quantity: it.quantity,
            price: it.price
          });
        });

        const out = orders.map(o => ({
          id: o.id,
          total_amount: o.total_amount,
          shipping_address: o.shipping_address,
          status: o.status,
          created_at: o.created_at,
          items: itemsByOrder[o.id] || []
        }));

        res.json(out);
      }
    );
  });
};
