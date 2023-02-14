import { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './contact-form.module.scss';

const ContactForm = ({ onAddNumber }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const actions = {
    name: setName,
    number: setNumber,
  };

  const handleChangeInput = e => {
    const { name, value } = e.target;
    actions[name](value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    onAddNumber({ name, number, id: nanoid() });
    setName('');
    setNumber('');
  };

  return (
    <div className={css.formBox}>
      <form className={css.form} onSubmit={handleSubmitForm}>
        <label className={css.text}>Name</label>
        <input
          onChange={handleChangeInput}
          className={css.input}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label className={css.text}>Number</label>
        <input
          onChange={handleChangeInput}
          className={css.input}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

