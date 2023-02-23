import PropTypes from 'prop-types';
import styled from 'styled-components';

const Li = styled.li`
  display: grid;
  grid-template-columns: 3fr 80px;
  margin-bottom: 16px;
`;

const Ul = styled.ul`
  margin: 0;
  padding-left: 0;
`;

const Paragraph = styled.p`
  margin: 0;
  font-size: 18px;
  margin-right: 20px;
`;
const Button = styled.button`
  color: #2a2a2a;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 3px 3px rgb(0 0 0 / 30%), 2px 0px 2px rgb(0 0 0 / 14%), 0px 0px 3px rgb(0 0 0 / 20%);
  border: none;
  cursor: pointer;
  &:hover {
    scale: 1.2;
  }
`;

const ContactList = props => {
  const { 
    contacts,
    filter,
    onDelete,
  } = props;
  return (
    <Ul>
      {contacts
      .filter(contact => contact.name.toLowerCase()
        .includes(filter.toLowerCase())
        ||  contact.number.includes(filter))
      .map(contact => (
        <Li key={contact.id}>
          <Paragraph>
            {`${contact.name}: ${contact.number}`}
          </Paragraph>
          <Button type="button" onClick={() => onDelete(contact.id)}>
            Delete
          </Button>
        </Li>
      ))}
    </Ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;
