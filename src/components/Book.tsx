import React from 'react';
import { bookEntry } from '../types'

interface IBookProps {
  book: bookEntry,
}

function randomBookAttrs() {
  const DARK = 'dark';
  const LIGHT = 'light';

  const colors = [
    {
      background: '#F8B272',
      coverShade: LIGHT,
    },
    {
      background: '#316CB0',
      coverShade: DARK,
    },
    {
      background: '#636363',
      coverShade: DARK,
    },
    {
      background: '#E26161',
      coverShade: LIGHT,
    },
    {
      background: '#F6DC3D',
      coverShade: LIGHT,
    },
    {
      background: '#000000',
      coverShade: DARK,
    },
    {
      background: '#AEDD87',
      coverShade: LIGHT,
    },
  ];

  const widths = [60, 61, 62, 63, 64, 65, 66, 67, 68];

  const randomColor = Math.floor(Math.random() * colors.length);
  const randomWidth = Math.floor(Math.random() * widths.length);

  return {
    theme: colors[randomColor],
    width: widths[randomWidth],
  }
}

export default function Book(props: IBookProps) {
  const bookAttrs = randomBookAttrs();

  function pageCount() {
    if (props.book.book?.num_pages) {
      return props.book.book?.num_pages[0];
    }

    return '';
  }

  function bookThickness() {
    const DEFAULT_THICKNESS_REMS = 7;
    const AVG_PAGE_COUNT = 300;
    const pages = parseInt(pageCount());

    if (!pages || pages < AVG_PAGE_COUNT) return DEFAULT_THICKNESS_REMS;

    return (pages / AVG_PAGE_COUNT) * DEFAULT_THICKNESS_REMS;
  }

  return (
    <div
      className={`book book--${bookAttrs.theme.coverShade}`}
      style={{
        backgroundColor: bookAttrs.theme.background,
        height: `${bookThickness()}rem`,
        width: `${bookAttrs.width}rem`,
      }}
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
        <div className="book__pages__inner">
          {pageCount()}
        </div>
      </div>

    </div>
  );
}
