import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-contect';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const FIRE_API_URL = process.env.REACT_APP_FIRE_URL;

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCTX = useContext(CartContext);
  const totalAmount = `$${cartCTX.totalAmount.toFixed(2)}`;
  const cartHasItems = cartCTX.items.length > 0;

  const cartAddHandler = (item) => {
    cartCTX.addItem({ ...item, amount: 1 });
  };

  const cartRemoveHandler = (id) => {
    cartCTX.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(`${FIRE_API_URL}/orders.json`, {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItems: cartCTX.items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCTX.clearCart();
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {cartHasItems && (
        <button onClick={orderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
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
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
