import React, { useState, useEffect } from 'react';
import { feedData } from '../types';

interface IUserBarProps {
  data?: feedData | null,
  status?: string,
  userIDQuery?: string,
  onUserSearch?: any, // TODO fix
  onUserValueChange(event: React.FormEvent<HTMLInputElement>): void,
  onRefresh?: any, // TODO fix
}

export default function UserBar(props: IUserBarProps) {
  const [showData, toggleFormVisibility] = useState(false);

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

  function cleanedUpTitle(title: string) {
    return title.split(':')[0];
  }

  useEffect(() => {
    console.log(showData);
    toggleFormVisibility(Boolean(props.data))
  }, []);

  return (
    <div className="user-bar">
      <div className="user-bar__inner">
        {showData ? (
          <>
            <div className="user-bar__stats">
              <div className="user-bar__stat user-bar__stat--name">
                <p className="user-bar__stat__data">
                  {props.data?.title ? cleanedUpTitle(props.data.title) : ''}
                </p>
                <p className="user-bar__stat__label">
                  Goodreads User
                </p>
              </div>
              <div className="user-bar__stat user-bar__stat--book-count">
                <p className="user-bar__stat__data">
                  {props.data?.items?.length.toLocaleString()}
                </p>
                <p className="user-bar__stat__label">
                  Books
                </p>
              </div>
              <div className="user-bar__stat user-bar__stat--book-count">
                <p className="user-bar__stat__data">
                  {totalPageCount().toLocaleString()}
                </p>
                <p className="user-bar__stat__label">
                  Total Pages
                </p>
              </div>
            </div>
            <div className="user-bar__actions">
              <button
                type="button"
                onClick={props.onRefresh}
                className="user-bar__action"
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={() => toggleFormVisibility(!showData)}
                className="user-bar__action"
              >
                Edit ID
              </button>
            </div>
          </>
        ) : (
          <form
            onSubmit={props.onUserSearch}
            className="user-bar__form"
          >
            <label
              htmlFor="goodreads-id"
              className="user-bar__form__label"
            >
              Goodreads User ID:
            </label>
            <input
              className="user-bar__form__input"
              id="goodreads-id"
              type="text"
              value={props.userIDQuery}
              required
              onChange={props.onUserValueChange}
            />
            <button
              type="submit"
              className="user-bar__form__submit"
            >
              Go
            </button>
            {Boolean(props.data) &&
              <button
                type="button"
                className="user-bar__form__cancel"
                onClick={() => toggleFormVisibility(!showData)}
              >
                Cancel
              </button>
            }
          </form>
        )}
      </div>
    </div>
  );
}
