import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './phone-book.module.scss';
import Filter from '../Filter/Filter';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import { getLocalData } from '../helpers/getLocalData';

const LOCAL_STORAGE_KEY = 'contacts';

// const initialContacts = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

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

// import { Component } from 'react';
// import { nanoid } from 'nanoid';
// import css from './phone-book.module.scss';
// import Filter from '../Filter/Filter';
// import ContactForm from '../ContactForm/ContactForm';
// import ContactList from '../ContactList/ContactList';

// const LOCAL_STORAGE_KEY = 'contacts';

// class PhoneBook extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const savedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
//     if (savedContacts) {
//       this.setState({ contacts: savedContacts });
//     }
//   }
//   componentDidUpdate(_, prevState) {
//     if (prevState.contacts.length !== this.state.contacts.length) {
//       localStorage.setItem(
//         LOCAL_STORAGE_KEY,
//         JSON.stringify(this.state.contacts)
//       );
//     }
//   }

//   handleChangeFilter = e => {
//     const { value } = e.target;
//     this.setState({
//       filter: value,
//     });
//   };

//   deleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(item => item.id !== id),
//     }));
//   };

//   addContact = data => {
//     console.log(data);
//     if (
//       this.state.contacts.some(
//         item =>
//           item.name.toLowerCase().trim() === data.name.toLowerCase().trim()
//       )
//     ) {
//       return alert(`${data.name} is already in contacts`);
//     }
//     this.setState(({ contacts }) => {
//       const newContact = { ...data, id: nanoid() };

//       return {
//         contacts: [...contacts, newContact],
//       };
//     });
//   };

//   filterContacts() {
//     const { filter, contacts } = this.state;

//     const result = contacts.filter(item => {
//       return item.name.toLowerCase().includes(filter.toLowerCase());
//     });

//     return result;
//   }

//   render() {
//     const { filter } = this.state;

//     return (
//       <div className={css.wrapper}>
//         <h1 className={css.title}>Phonebook</h1>
//         <ContactForm onAddNumber={this.addContact} />
//         <h2 className={css.contacts}>Contacts</h2>
//         <Filter filter={filter} onChange={this.handleChangeFilter} />
//         <ContactList
//           contacts={this.filterContacts()}
//           onDeleteBtn={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }
// export default PhoneBook;
