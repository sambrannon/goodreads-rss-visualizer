import React from 'react';
import { bookEntry } from '../types'

interface IBookProps {
  book: bookEntry,
}

export default function Book(props: IBookProps) {
  function pageCount() {
    if (props.book.book?.num_pages) {
      return props.book.book?.num_pages[0];
    }

    return '';
  }

  function bookThickness() {
    const DEFAULT_THICKNESS = 40;

    if (!pageCount()) return DEFAULT_THICKNESS;

    return parseInt(pageCount()) / 100;
  }

  return (
    <div
      className="book"
      style={{ height: `${bookThickness()}rem` }}
    >
      <div className="book__info">
        <div className="book__title">
          {props.book.title}
        </div>
        <div className="book__author">
          {props.book.author_name}
        </div>
      </div>
      <div className="book__pages">
        {pageCount()}
      </div>

    </div>
  );
}
