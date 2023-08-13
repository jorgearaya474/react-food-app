import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-contect';
import CartIcon from '../Cart/CartIcon';
import classes from './CardButton.module.css';

const CardButton = (props) => {
  const [btnAnimaion, setBtnAnimation] = useState(false);
  const cartCTX = useContext(CartContext);
  const { items } = cartCTX;
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnAnimaion ? classes.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnAnimation(true);

    const timer = setTimeout(() => {
      setBtnAnimation(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default CardButton;
