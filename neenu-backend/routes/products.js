const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const userController = require("../controllers/userController");
const multer = require("multer");
const path = require("path");

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Public routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProduct);

// Protected routes (must be logged in)
router.post("/", userController.authenticate, upload.single("image"), productController.addProduct);
router.put("/:id", userController.authenticate, upload.single("image"), productController.updateProduct);
router.delete("/:id", userController.authenticate, productController.deleteProduct);

module.exports = router;
