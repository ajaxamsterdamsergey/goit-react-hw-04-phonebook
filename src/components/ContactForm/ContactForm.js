import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { FormWrapper, Input, Button } from './ContactForm.styled';

export const ContactForm = ({ onSubmit }) => {
  const FormSection = (
    <Formik initialValues={{ name: '', number: '' }} onSubmit={onSubmit}>
      {props => (
        <FormWrapper>
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label htmlFor="number">Number</label>

          <Input
            type="text"
            name="number"
            placeholder="+38(095)1764012"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          {props.errors.name && <div id="feedback">{props.errors.name}</div>}
          <Button type="submit">Submit</Button>
        </FormWrapper>
      )}
    </Formik>
  );
  ContactForm.propTypes = {
    onSubmit: PropTypes.func,
  };

  return FormSection;
};
