import airplane from '../../../Assets/Images/airplane.png'
import cloud1 from '../../../Assets/Images/cloud1.png'
import cloud2 from '../../../Assets/Images/cloud2.png'
import cloud3 from '../../../Assets/Images/cloud3.png'
import Star1 from '../../../Assets/Images/star1.png';
import Star2 from '../../../Assets/Images/star2.png';
import Star3 from '../../../Assets/Images/star3.png';
import Star4 from '../../../Assets/Images/star4.png';
import Star5 from '../../../Assets/Images/star5.png';
import AuthMenu from '../../AuthArea/AuthMenu/AuthMenu';

import './Header.css';

const Header: React.FC = (): JSX.Element => {

  // Check whether to show stars
  const isNight = (): boolean => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 20 || hour <= 5;
  }

  return (
    <div className="Header">
      <AuthMenu />
      <h1>Magic Trip</h1>
      <img className='Airplane' src={airplane} alt='Airplane' />
      <img src={cloud1} alt='Cloud' />
      <img src={cloud2} alt='Cloud' />
      <img src={cloud3} alt='Cloud' />
      <img src={cloud1} alt='Cloud' />
      <img src={cloud2} alt='Cloud' />
      <img src={cloud3} alt='Cloud' />
      {
        isNight() &&
        <>
          <img src={Star1} alt='Star' />
          <img src={Star2} alt='Star' />
          <img src={Star3} alt='Star' />
          <img src={Star4} alt='Star' />
          <img src={Star5} alt='Star' />
        </>
      }
    </div>
  );
};

export default Header;
