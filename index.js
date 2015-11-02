const PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var auth = require('./routes/auth');
app.use(express.static('./public'));
app.use('/auth', auth);
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log('listening on port' + PORT);
});