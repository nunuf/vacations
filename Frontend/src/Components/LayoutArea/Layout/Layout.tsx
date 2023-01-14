import React, { useEffect, useRef, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Routing from '../Routing/Routing';

import './Layout.css';

const DELAY = 60 * 60 * 1000; // 1 hour in msec

const Layout: React.FC = (): JSX.Element => {

  const [time, setTime] = useState(new Date().getHours());
  const intervalRef = useRef(null);

  // Render background by hour
  useEffect(() => {
    const now = new Date();
    const start = DELAY - (now.getMinutes() * 60 + now.getSeconds()) * 1000 + now.getMilliseconds();
    const timer = setTimeout(() => {
      setTime(new Date().getHours());
      intervalRef.current = setInterval(() => {
        setTime(new Date().getHours());
      }, DELAY);
    }, start);
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timer);
    }
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
