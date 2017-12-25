const express = require('express');
const url = require('url');
const app = express();

const philCollins = 'YkADj0TPrJA';
const newYear = 1514764800000;

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  response.sendFile('/public/index.html');
});
app.get('/play/?', (request, response) => {
  response.sendFile('/public/play.html');
});
app.get('/play/:timestamp?/:videoId?/:when?', ({params: { timestamp, when, videoId }}, response) => {
  response.redirect(`/play.html?timestamp=${timestamp}&videoId=${videoId || philCollins}&when=${when || newYear}`);
});
app.use((request, response) => {
  response.status(404).end('<h1>404');
});
const port = process.env.PORT || 5000;
app.listen(port, () => {

  console.log(`listening on ${port}`);
});
