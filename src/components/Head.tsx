import React from 'react';
import { Helmet } from 'react-helmet';

interface IHeadProps {
  rawFeedTitle?: string;
}

export default function Head({ rawFeedTitle }:IHeadProps) {
  function pageTitle() {
    const siteName = 'Goodreads Stack';
    const title = rawFeedTitle;

    if (title) {
      const name = title.split(':');

      return `${name[0]} | ${siteName}`;
    }

    return siteName;
  }

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{pageTitle()}</title>
    </Helmet>
  );
}
