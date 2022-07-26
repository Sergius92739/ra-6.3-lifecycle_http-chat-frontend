import { useState } from "react";
import PropTypes from 'prop-types';

export default function Form(props) {
  const [inputValue, setInputValue] = useState('');
  const { addMesHandler } = props;

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    addMesHandler(inputValue);
    setInputValue('');
  }

  return (
    <form className="app__form form" onSubmit={submitHandler}>
      <input
        value={inputValue}
        type="text"
        className="form__input"
        placeholder="Введите сообщение"
        onChange={handleChange}
      />
      <button className="form__btn"></button>
    </form>
  )
}

Form.propTypes = {
  addMesHandler: PropTypes.func.isRequired
}
