import * as React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import './spinner.css';

export const Spinner: React.FunctionComponent = () => {
  const { promiseInProgress } = usePromiseTracker(null);

  return (
    promiseInProgress && (
      <div className="spinner">
        <img src={'logo512.png'} alt={'spinner'}></img>
      </div>
    )
  );
};
