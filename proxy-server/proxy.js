const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
let Parser = require('rss-parser');
let parser = new Parser({
  customFields: {
    item: [
      'book_id',
      'book_small_image_url',
      'book_medium_image_url',
      'book_large_image_url',
      'book_description',
      'book',
      'author_name',
      'isbn',
      'user_date_added',
      'user_read_at',
      'user_review',
      'average_rating',
    ],
  }
});

app.get('/', cors(), (req, res) => {
  console.log(req.query.feedUrl);
  res.setHeader('Content-Type', 'application/json');

  (async () => {
    let feed = await parser.parseURL(req.query.feedUrl);
    console.log(feed);
    res.json(feed);
  })();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


