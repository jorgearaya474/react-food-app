import { useContext } from 'react';
import CartContext from '../../store/cart-contect';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartCTX = useContext(CartContext);
  const totalAmount = `$${cartCTX.totalAmount.toFixed(2)}`;
  const cartHasItems = cartCTX.items.length > 0;

  const cartAddHandler = (item) => {
    cartCTX.addItem({ ...item, amount: 1 });
  };

  const cartRemoveHandler = (id) => {
    cartCTX.removeItem(id);
  };

  return (
    <Modal onClose={props.onClose}>
      <ul className={classes['cart-items']}>
        {cartCTX.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={cartAddHandler.bind(null, item)}
            onRemove={cartRemoveHandler.bind(null, item.id)}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount: </span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {cartHasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
