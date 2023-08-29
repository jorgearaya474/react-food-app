import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChar = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValid, setFormInputsValid] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    // get values
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const entredNameIsValid = !isEmpty(enteredName);
    const entredStreetIsValid = !isEmpty(enteredStreet);
    const entredPostalIsValid = isFiveChar(enteredPostal);
    const entredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValid({
      name: entredNameIsValid,
      street: entredStreetIsValid,
      city: entredPostalIsValid,
      postal: entredCityIsValid,
    });

    const formIsValid =
      entredNameIsValid &&
      entredStreetIsValid &&
      entredPostalIsValid &&
      entredCityIsValid;

    if (!formIsValid) {
      return;
    } else {
      props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postalCode: enteredPostal,
        city: enteredCity,
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputsValid.name ? '' : classes.invalid
        }`}
      >
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValid.name && <p>Please enter a valid name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValid.street ? '' : classes.invalid
        }`}
      >
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValid.street && <p>Please enter a valid street!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValid.postal ? '' : classes.invalid
        }`}
      >
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputsValid.postal && <p>Please enter a valid postal code!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValid.city ? '' : classes.invalid
        }`}
      >
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValid.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
