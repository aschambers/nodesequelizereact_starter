const Product = require('../models/product');

module.exports = {
  insertProduct: (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
    Product.create({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description
    }).then((result) => {
      res.status(200).send({"success":"inserted a new product successfully"});
    }).catch((err) => {
      res.status(422).send({"error":"error inserting that product"});
    });
  },

  getProducts: (req, res, next) => {
    Product.findAll()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(422).send({'error':'error fetching all products'});
    });
  },

  getSingleProduct: (req, res, next) => {
    const productId = req.body.productId;
    // findbypk = findbyid
    Product.findByPk(productId).then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => {
      res.status(422).send({'error':'error fetching that product'});
    });
  },

  updateProduct: (req, res, next) => {
    const product = req.body;
    const { productId } = req.body;
    Product.update(product, { where: { id: productId } }).then((success) => {
      // findbypk = findbyid
      Product.findByPk(productId).then((product) => {
        res.status(200).send(product);
      })
      .catch((err) => {
        res.status(422).send({'error':'error finding updated product'});
      });
    })
    .catch((err) => {
      res.status(422).send({'error':'error updating that product'});
    });
  },

  deleteProduct: (req, res, next) => {
    const productId = req.body.productId;
    Product.destroy({where: { id: productId }}).then((success) => {
      Product.findAll()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(422).send({'error':'error fetching products after deletion'});
      });
    })
    .catch((err) => {
      res.status(422).send({'error':'error deleting product'});
    });
  },

}
