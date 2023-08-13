import { Fragment } from 'react';
import headerImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import CardButton from './CartButton';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <CardButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={headerImage} alt='The most delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;
