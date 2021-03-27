import React, { useState, useEffect } from 'react';

type bookEntry = {
  content?: string;
  contentSnippet?: string;
  guid?: string;
  isoDate?: string;
  link?: string;
  pubDate?: string;
  title?: string;
  'book_id'?: string,
  'book_small_image_url'?: string,
  'book_medium_image_url'?: string,
  'book_large_image_url'?: string,
  'book_description'?: string,
  'book'?: {
    'num_pages'?: string[],
  },
  'author_name'?: string,
  'isbn'?: string,
  'user_date_added'?: string,
  'user_read_at'?: string,
  'user_review'?: string,
  'average_rating'?: string,
  'user_shelves'?: string,
}

type feedData = {
  copyright?: string;
  description?: string;
  feedUrl?: string;
  image?: {
    height?: string;
    link?: string;
    title?: string;
    url?: string;
    width?: string;
  };
  items?: bookEntry[];
  language?: string;
  lastBuildDate?: string;
  link?: string;
  title?: string;
}

const CORS_PROXY = "http://localhost:3001/?feedUrl=";

function useStickyState(defaultValue: string, key: string) {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function getBookData(key: string) {
  if (window.localStorage.getItem(key) === null) {
    console.warn(`localstorage item "${key}" is null`);
    return {};
  }

  return JSON.parse(window.localStorage.getItem(key));
}

function App() {
  const [goodReadsID, updategoodReadsID] = useStickyState('', 'goodreadsID');
  const [stringifiedBookData, updateBookData] = useStickyState('', 'bookData');
  const [errorState, updateErrorState] = useStickyState('', 'errorState');

  let data:feedData = {};

  // useEffect(() => {
  //   const lsData = localStorage.getItem('bookData');

  //   if (lsData) {
  //     updateBookData(JSON.parse(lsData));
  //   }
  // }, []);

  function onFormSubmission(event: React.FormEvent<EventTarget>) {
    event.preventDefault();

    const fetchAndStoreBookData = async () => {
      try {
        const result = await fetch(`${CORS_PROXY}https://www.goodreads.com/review/list_rss/${goodReadsID}?shelf=all`);
        const body = await result.json();

        console.log(body);

        updategoodReadsID(goodReadsID);
        updateBookData(JSON.stringify(body));
      } catch(err) {
        console.error('Something didn\'t work... But your old results were not deleted');
      }
    }

    fetchAndStoreBookData();
  }

  // const data:feedData = JSON.parse(stringifiedBookData) || false;

  // console.log(JSON.parse(stringifiedBookData));

  // if (Boolean(data)) {
  //   // console.log(stringifiedBookData);
  // }

  return (
    <div className="app">
      <header className="app-header">
        <form onSubmit={onFormSubmission}>
          {errorState === '404' &&
            <p style={{ color: 'red' }}>
              That ID wasn't found on Goodreads, please make sure it's right.
            </p>
          }
          <label htmlFor="goodreads-id">
            Goodreads User ID:
          </label>
          <input
            id="goodreads-id"
            type="text"
            value={goodReadsID}
            required
            onChange={(
                ev: React.ChangeEvent<HTMLInputElement>,
            ): void => updategoodReadsID(ev.target.value)}
          />
          <button type="submit">Go</button>
        </form>
        {/* {data?.items?.map(item => (
          <div key={item.guid}>
            {item.title}
            {item.book?.num_pages}
          </div>
        ))} */}
      </header>
    </div>
  );
}

export default App;
