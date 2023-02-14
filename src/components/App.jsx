import PhoneBook from './PhoneBook/PhoneBook';
import css from './styles/style.module.scss';

export const App = () => {
  return (
    <div className={css.container}>
      <PhoneBook />
    </div>
  );
};
