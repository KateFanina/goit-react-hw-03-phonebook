import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.string().required(),
});

const initialValues = {
  name: '',
  number: '',
};

const CompleteForm = styled(Form)`
  border: 2px solid black;
  margin-bottom: 20px;
  padding: 20px;
  width: 300px;
`;

const Label = styled.label`
  color: #2a2a2a;
  display: grid;
  font-size: 20px;
  justify-content: center;
  margin-bottom: 20px;
`;

const Input = styled(Field)`
  color: #2a2a2a;
  font-size: 18px;
  &:focus {
    outline-color: #2196f3;
  }
`;

const Button = styled.button`
  background-color: #ffffff;
  border-radius: 4px;
  border: none;
  box-shadow: 0px 3px 3px rgb(0 0 0 / 30%), 2px 0px 2px rgb(0 0 0 / 14%),
    0px 0px 3px rgb(0 0 0 / 20%);
  color: #2a2a2a;
  cursor: pointer;
  font-size: 14px;
  margin-left: 40px;
  padding: 5px;
  &:hover {
    scale: 1.2;
  }
`;

const ContactForm = props => {
  const { handleSubmit } = props;
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
        <CompleteForm autoComplete="off">
          <Label htmlFor="name">
            Name
            <Input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </Label>
          <Label htmlFor="number">
            Number
            <Input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{0,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </Label>
          <Button type="submit">Add contact</Button>
        </CompleteForm>
    </Formik>
  );
};

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
