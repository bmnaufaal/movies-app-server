const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(require('./routers/index'));
app.use(require('./routers/movie'));
app.use(require('./routers/genre'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})