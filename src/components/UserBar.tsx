import React from 'react';
import { feedData } from '../types';

interface IUserBarProps {
  data?: feedData,
}

export default function UserBar(props: IUserBarProps) {
  return (
    <div className="user-bar">
      Userbar...
    </div>
  );
}
