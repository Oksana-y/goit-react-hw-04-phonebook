import PropTypes from 'prop-types';
import css from './contact-list.module.scss';

const ContactsList = ({ contacts, onDeleteBtn }) => {
  const contact = contacts.map(item => (
    <li key={item.id} className={css.item}>
      <p>
        {item.name}: {item.number}
      </p>
      <button
        type="button"
        className={css.button}
        onClick={() => {
          onDeleteBtn(item.id);
        }}
      >
        Delete
      </button>
    </li>
  ));

  return <ul className={css.list}>{contact}</ul>;
  
};

ContactsList.propTypes = {
  onDeleteBtn: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactsList;
