import css from './filter.module.scss';
import PropTypes from 'prop-types';


const Filter = ({ filter, onChange }) => {
  return (
    <div>
      <h3 className={css.title}>Find contacts by name</h3>
      <input 
        className={css.inputFilter}
        type="text"
        name="filter"
        defaultValue={filter}
        onChange={onChange}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default Filter;
