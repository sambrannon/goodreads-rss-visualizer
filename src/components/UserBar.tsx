import React from 'react';
import { feedData } from '../types';

interface IUserBarProps {
  data?: feedData | null,
  status?: string,
  userIDQuery?: string,
  onUserSearch?: any, // TODO fix
  onUserValueChange(event: React.FormEvent<HTMLInputElement>): void,
}

export default function UserBar(props: IUserBarProps) {
  function totalPageCount() {
    let count = 0;
    const books = props.data?.items || [];

    for (let i = 0; i < books.length; i++) {
      const bookPages = books[i].book?.num_pages || [];

      if (bookPages.length) {
        count += parseInt(bookPages[0]);
      }
    }

    return count;
  }

  return (
    <div className="user-bar">
      <div className="user-bar__inner">
        {props.data &&
          <>
            <div className="user-bar__name">
              {props.data?.title}
            </div>
            <div className="user-bar__books">
              {props.data?.items?.length} Books
            </div>
            <div className="user-bar__pages">
              {totalPageCount()} Total Pages
            </div>
            <div className="user-bar__actions">

            </div>
          </>
        }
      </div>
      <p>
        Status: {props.status}
      </p>
      <form onSubmit={props.onUserSearch}>
        <label htmlFor="goodreads-id">
          Goodreads User ID:
        </label>
        <input
          id="goodreads-id"
          type="text"
          value={props.userIDQuery}
          required
          onChange={props.onUserValueChange}
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
}
