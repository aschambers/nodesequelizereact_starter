const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const sequelize = require('./server/config/mysqlclient');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
// routes for users api
require('./server/routes/users.js')(app);
// routes for products api
require('./server/routes/products.js')(app);

app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})

const PORT = process.env.PORT || 5000;

// syncs models to database and creates tables and relations
sequelize.sync()
  .then((result) => {
    const server = app.listen(PORT, function(){
      console.log("Server is listening on port: " + PORT);
    });

    const io = require('socket.io')(server);
  })
  .catch((err) => {
    console.log(err);
  });
