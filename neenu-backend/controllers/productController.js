const db = require("../config/db");
const path = require("path");
const fs = require("fs");

// Get all products
exports.getAllProducts = (req, res) => {
  db.query("SELECT * FROM products ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get single product by id
exports.getProduct = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Product not found" });
    res.json(results[0]);
  });
};

// Add new product
exports.addProduct = (req, res) => {
  const {
    name,
    weight,
    description,
    price,
    original_price,
    stock,
    category,
    subcategory,
    ingredients,
    benefits
  } = req.body;

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `
    INSERT INTO products
    (title, weight, description, price, original_price, stock, category, subcategory, imageUrl, ingredients, benefits)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [
      name,
      weight,
      description,
      price,
      original_price,
      stock,
      category,
      subcategory,
      imageUrl,
      JSON.stringify(ingredients?.split(",") || []),
      JSON.stringify(benefits?.split(",") || [])
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ success: true, productId: result.insertId });
    }
  );
};

// Update product by id
exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const {
    name,
    weight,
    description,
    price,
    original_price,
    stock,
    category,
    subcategory,
    ingredients,
    benefits
  } = req.body;

  let imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `
    UPDATE products SET
    title=?, weight=?, description=?, price=?, original_price=?, stock=?,
    category=?, subcategory=?, ${imageUrl ? "imageUrl=?, " : ""} ingredients=?, benefits=?
    WHERE id=?
  `;

  const values = [
    name,
    weight,
    description,
    price,
    original_price,
    stock,
    category,
    subcategory
  ];
  if (imageUrl) values.push(imageUrl);
  values.push(JSON.stringify(ingredients?.split(",") || []));
  values.push(JSON.stringify(benefits?.split(",") || []));
  values.push(id);

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Product not found" });
    res.json({ success: true });
  });
};

// Delete product by id
exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Product not found" });
    res.json({ success: true });
  });
};
