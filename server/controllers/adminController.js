const Product = require('../models/productsModel');

class AdminController {
  getProducts = (req, res, next) => {
    req.user
      .getProducts()
      .then(products => {
        res.send(products);
      })
      .catch(err => console.log(err));
  };

  getAddProduct = (req, res, next) => {};

  postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    req.user
      .createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
      })
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    req.user
      .getProducts({ where: { id: prodId } })
      .then(products => {
        const product = products[0];
        if (!product) {
          return res.redirect('/');
        }
        res.send(product);
      })
      .catch(err => console.log(err));
  };

  postEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    Product.findByPk(prodId)
      .then(product => {
        console.log(product);
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl;
        product.description = updatedDesc;
        return product.save();
      })
      .then(result => {
        res.send(result);
      })
      .catch(err => console.log(err));
  };

  postDeleteProduct = (req, res, next) => {
    const prodId = req.body.prodId;
    Product.findByPk(prodId)
      .then(product => {
        return product.destroy();
      })
      .then(result => res.send(result))
      .catch(err => console.log(err));
    res.redirect('/admin/products');
  };
}
module.exports = new AdminController();
