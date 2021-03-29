import React, { useState } from 'react';
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
  const [actionPopoverIsOpen, toggleActionPopover] = useState(false);

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

  return (
    <div className="user-bar">
      <div className="user-bar__inner">
        {Boolean(props.data) ? (
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
              <div className="user-bar__popover-container">
                <button
                  type="button"
                  className="user-bar__popover-trigger"
                  onClick={() => toggleActionPopover(!actionPopoverIsOpen)}
                >
                  Menu
                </button>
                <div className={actionPopoverIsOpen ? 'user-bar__popover-content user-bar__popover-content--open' : 'user-bar__popover-content'}>
                  <button
                    type="button"
                    onClick={props.onRefresh}
                    className="user-bar__refresh-button"
                  >
                    Refresh
                  </button>
                  <button
                    type="button"
                    onClick={() => console.log('edit clicked')}
                    className="user-bar__refresh-button"
                  >
                    Edit ID
                  </button>
                </div>
              </div>

            </div>
          </>
        ) : (
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
        )}
      </div>
    </div>
  );
}
