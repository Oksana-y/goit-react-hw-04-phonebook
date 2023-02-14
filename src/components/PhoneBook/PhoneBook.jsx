import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './phone-book.module.scss';
import Filter from '../Filter/Filter';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import { getLocalData } from '../helpers/getLocalData';

const LOCAL_STORAGE_KEY = 'contacts';


const PhoneBook = () => {
  const [contacts, setContacts] = useState(
    () => getLocalData(LOCAL_STORAGE_KEY) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleChangeFilter = e => {
    const { value } = e.target;
    setFilter({
      filter: value,
    });
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(item => item.id !== id));
  };
  console.log(contacts);
  const addContact = data => {
    console.log(data);
    if (
      contacts.some(
        item =>
          item.name.toLowerCase().trim() === data.name.toLowerCase().trim()
      )
    ) {
      return alert(`${data.name} is already in contacts`);
    }
    setContacts(prevState => {
      const newContact = { ...data, id: nanoid() };
      return [...prevState, newContact];
    });
  };

  const filterContacts = () => {
    const result = contacts.filter(item => {
      return item.name.toLowerCase().includes(filter.toLowerCase());
    });

    return result;
  };

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onAddNumber={addContact} />
      <h2 className={css.contacts}>Contacts</h2>
      <Filter filter={filter} onChange={handleChangeFilter} />
      <ContactList contacts={filterContacts()} onDeleteBtn={deleteContact} />
    </div>
  );
};
export default PhoneBook;

