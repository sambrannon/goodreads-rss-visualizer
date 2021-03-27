import React from 'react';

interface IBookProps {
  title: string,
}

export default function Book(props: IBookProps) {
  return (
    <div className="book">
      Book!
    </div>
  );
}
