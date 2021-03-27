import React, { useState } from 'react';
import RSSParser from 'rss-parser';
import { feedData } from '../types';

const CORS_PROXY = window.location.hostname === "localhost"
  ? "https://cors-anywhere.herokuapp.com"
  : "/cors-proxy";

function goodreadsUserFeedURL(userID: string) {
  return `https://www.goodreads.com/review/list_rss/${userID}?shelf=%23ALL%23`;
}

// const MIKES_USER_ID = '122854469';
// const SAMS_USER_ID = '123624018';

function App() {
  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState('');
  const [data, setData] = useState<feedData | null>({});

  const parser = new RSSParser({
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
        'user_shelves',
      ],
    }
  });

  const fetchData = async () => {
    if (!query) return;

    setStatus('fetching');

    parser.parseURL(CORS_PROXY + `/${goodreadsUserFeedURL(query)}`, function(err, feed) {
      if (err) {
        setStatus('error');
        throw err;
      };

      setData(feed);
      setStatus('fetched');
    });
  };

  function onFormSubmission(event: React.FormEvent<EventTarget>) {
    event.preventDefault();
    fetchData();
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          Status: {status}
        </h1>
        <form onSubmit={onFormSubmission}>
          <label htmlFor="goodreads-id">
            Goodreads User ID:
          </label>
          <input
            id="goodreads-id"
            type="text"
            value={query}
            required
            onChange={(
                ev: React.ChangeEvent<HTMLInputElement>,
            ): void => setQuery(ev.target.value)}
          />
          <button type="submit">Go</button>
        </form>
        {data?.items?.map(item => (
          <div key={item.guid}>
            {item.title}
            {item.book?.num_pages}
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
