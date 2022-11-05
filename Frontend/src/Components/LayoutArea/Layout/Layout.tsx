import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Routing from '../Routing/Routing';

import './Layout.css';

const Layout: React.FC = (): JSX.Element => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const now = new Date();
    let hour = now.getHours();
    setTime(hour);
  }, []);

  return (
    <div className={`Layout Sky${time}`}>
      <header>
        <Header />
      </header>

      <main>
        <Routing />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
