import React, { useState, useEffect } from 'react';
import RSSParser from 'rss-parser';
import Head from './Head';
import { feedData } from '../types';
import UserBar from './UserBar';
import Book from './Book';

const CORS_PROXY = window.location.hostname === "localhost"
  ? "https://cors-anywhere.herokuapp.com"
  : "/cors-proxy";

const STATUS_IDLE = 'idle';
const STATUS_FETCHING = 'fetching';
const STATUS_FETCHED = 'fetched';
const STATUS_ERROR = 'error';

function goodreadsUserFeedURL(userID: string) {
  return `https://www.goodreads.com/review/list_rss/${userID}?shelf=%23ALL%23`;
}

// const MIKES_USER_ID = '122854469';
// const SAMS_USER_ID = '123624018';

function App() {
  const [status, setStatus] = useState(STATUS_IDLE);
  const [userIDQuery, setUserIDQuery] = useState('');
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

  function saveFetchedData(data: feedData) {
    setData(data);
    setUserIDQuery(userIDQuery);

    window.localStorage.setItem('data', JSON.stringify(data));
    window.localStorage.setItem('userIDQuery', JSON.stringify(userIDQuery));

    setStatus(STATUS_FETCHED);
  }

  const fetchData = async () => {
    if (!userIDQuery) return;

    const fetchURL = `${CORS_PROXY}/${goodreadsUserFeedURL(userIDQuery)}`;

    setStatus(STATUS_FETCHING);

    parser.parseURL(fetchURL, function(err, feed) {
      if (err) {
        setStatus(STATUS_ERROR);
        throw err;
      };

      saveFetchedData(feed);
    });
  };

  function onFormSubmission(event: React.FormEvent<EventTarget>) {
    event.preventDefault();
    fetchData();
  }

  useEffect(() => {
    const lsData = window.localStorage.getItem('data');
    const lsUserIDQuery = window.localStorage.getItem('userIDQuery');

    if (lsData && lsUserIDQuery) {
      setData(JSON.parse(lsData));
      setUserIDQuery(JSON.parse(lsUserIDQuery));
    }
  }, []);

  return (
    <>
      <Head rawFeedTitle={data?.title} />
      <div className="app">
        <div className="app__books">
          {data?.items?.map(book => (
            <Book
              key={book.guid}
              book={book}
            />
          ))}
        </div>
        <div className="app__user-bar">
          <UserBar
            data={data}
            status={status}
            userIDQuery={userIDQuery}
            onUserSearch={onFormSubmission}
            onUserValueChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setUserIDQuery(ev.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default App;
