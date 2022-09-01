import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { FormWrapper, Input } from './Filter.styled';

export const Filter = ({ onChange, valueFilter, onSubmit }) => {
  const FilterField = (
    <Formik initialValues={{ filter: '' }} onSubmit={onSubmit}>
      <FormWrapper>
        <Input
          type="text"
          name="filter"
          value={valueFilter}
          onChange={onChange}
        />
      </FormWrapper>
    </Formik>
  );
  return FilterField;
};
Filter.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  valueFilter: PropTypes.string.isRequired,
};
