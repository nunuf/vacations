import React, { useState } from 'react';

import './Footer.css';

const Footer: React.FC = (): JSX.Element => {

  const [year] = useState<number>(new Date().getFullYear());

  return (
    <div className="Footer">
      <p>All Rights Reserved &copy; {year}</p>
    </div>
  );
  
};

export default Footer;
