const Product = require('../models/Product.js');
const { validationResult } = require('express-validator');

class AdminController {
  getProducts = (req, res, next) => {
    Product.find({ userId: req.user._id })
      // .select('title price -_id')
      // .populate('userId', 'name')
      .then(products => {
        res.send(products);
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        error.message = err.message;
        return next(error);
      });
  };
  getAddProduct = (req, res, next) => {};

  postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const image = req.file;
    const price = req.body.price;
    const description = req.body.description;
    const userId = req.user;

    if (!image) {
      return res.status(422).json('Attached file is not an image.');
    }
    const imageUrl = image.path;

    const product = new Product({
      title,
      price,
      imageUrl,
      description,
      userId,
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array()[0].msg);
    }

    product
      .save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        error.message = err.message;
        return next(error);
      });
  };

  getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
      .then(product => {
        res.send(product);
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        error.message = err.message;
        return next(error);
      });
  };

  postEditProduct = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array()[0]);
    }

    const prodId = req.params.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    Product.findById(prodId)
      .then(product => {
        if (product.userId.toString() !== req.user._id.toString()) {
          return res.status(500).json('You are not authorization');
        }
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl;
        product.description = updatedDesc;
        return product.save().then(result => {
          res.send(result);
        });
      })

      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        error.message = err.message;
        return next(error);
      });
  };

  DeleteProduct = (req, res, next) => {
    const prodId = req.params.prodId;
    Product.deleteOne({ _id: prodId, userId: req.user._id })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        error.message = err.message;
        return next(error);
      });
  };
}
module.exports = new AdminController();
