import { Component } from 'react';
import { nanoid } from 'nanoid'
import ContactForm from './contactForm';
import Filter from './filter';
import ContactList from './contactList';
import styled from 'styled-components';

const TitleMain = styled.h1`
  font-size: 40px;
  margin-bottom: 20px;
  margin-top: 0;
`;

const TitleList = styled.h2`
  font-size: 40px;
  margin-bottom: 20px;
  margin-top: 0;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      filter: '',
    };
  }

  validateExcistContact = ({
    contacts,
    values,
  }) => {
    const messages = [];
    if (contacts.some(contact => contact.number === values.number)) {
      const user = contacts
        .find(contact => contact.number === values.number).name;
      messages.push(`${values.number} is already belongs to ${user}!`);
    }
    if (contacts.some(contact => contact.name === values.name)) {
      const phone = contacts
        .find(contact => contact.name === values.name).number;
      messages
      .push(`${values.name} is already containce in phonebook with phone ${phone}!`);
    }
    if (messages.length) {
      alert(messages.join('\n'));
    }
    return !!messages.length;
  };

  handleSubmit = (values, actions) => {
    const { contacts } = this.state;
    if (
      this.validateExcistContact({
        contacts,
        values,
      })
    ) {
      return;
    }
    const newContacts = [...contacts];
    this.setState({
      contacts: [
        ...newContacts,
        {
          id: nanoid(),
          name: values.name,
          number: values.number,
        },
      ],
    });
    actions.resetForm();
  };

  onDelete = id => {
    const { contacts } = this.state;
    const newContacts = [...contacts];
    this.setState({
      contacts: newContacts.filter(contact => contact.id !== id),
    });
  };

  handleFilter = event => {
    console.log({ event });
    this.setState({
      filter: event.target.value,
    });
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <div>
          <TitleMain>Phonebook</TitleMain>
          <ContactForm
            handleSubmit={(values, actions) =>
              this.handleSubmit(values, actions)
            }
          />

          <TitleList>Contacts</TitleList>
          <Filter handleFilter={e => this.handleFilter(e)} />
          <ContactList
            contacts={contacts}
            filter={filter}
            onDelete={id => this.onDelete(id)}
          />
        </div>
      </div>
    );
  }
}

export default App;
