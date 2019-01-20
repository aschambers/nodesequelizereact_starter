const products = require('../controllers/products.js');

module.exports = function(app){
  app.post('/api/insertProduct', products.insertProduct);
  app.get('/api/products', products.getProducts);
  app.post('/api/getProduct', products.getSingleProduct);
  app.put('/api/updateProduct', products.updateProduct);
  app.post('/api/deleteProduct', products.deleteProduct);

}
