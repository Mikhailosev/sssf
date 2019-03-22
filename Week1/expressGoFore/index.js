const express = require('express');
const app = express();
const example = require('./modules/example')
app.use(express.static('public'));
let json = {
  id: 1,
  name: 'My response'
}
//EXCERSICE 1

app.get('/', (req, res) => {
  const ip = req.ip;
  res.send(`Hello ${ip}`);
});
app.get('/user/:id', function (req, res) {
  res.send('user ' + req.params.id);
});
app.get('/path1/:param1', (req, res) => {
  console.log(req.params.param1)
  const output = example.addWord(req.params.param1);
  res.send(output)
})

app.get(/.*fly$/, function (req, res) {
  res.send('/.*fly$/');
});
app.get('/json-response', function (req, res) {
  res.send(json);
});
app.post('/to-google', function (req, res) {
  res.redirect('https://google.fi');
});
app.get('/not-gonna-find', function (req, res) {
  res.sendStatus(404);
});
app.get('/give-me-cookie', function (req, res) {
  res.cookie('for', 'you').send();
});
app.delete('/cookie-for', (req, res) => {
  res.sendStatus(200).clearCookie('for').send()
});
app.get('/accept', (req, res) => {
  res.format({
    text: function () {
      res.send('hey');
    },

    html: function () {
      res.send('<p>hey im html</p>');
    },

    json: function () {
      res.send({
        message: 'hey im json'
      });
    }
  });
});
const router = express.Router();
router.get('/users', (req, res) => {
  res.send('Hello from router!');
});
app.use('/myApi', router);
router.get('/path', (req, res) => {
  res.sendStatus(200)
});
app.use('/routed', router);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening in port ${port}`));