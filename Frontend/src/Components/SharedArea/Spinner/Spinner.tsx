import React from 'react';
import imageSource from '../../../Assets/Images/loading.gif';

import './Spinner.css';

const Spinner: React.FC = (): JSX.Element => {
  return (
    <div className="Spinner">
      <img src={imageSource} alt='Loading' />
    </div>
  );
};

export default Spinner;
