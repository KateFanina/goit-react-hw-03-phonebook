import { Component } from 'react';
import { nanoid } from 'nanoid'
import CloseIcon from '@mui/icons-material/Close';
import ContactForm from './contactForm';
import Filter from './filter';
import ContactList from './contactList';
import baseContacts from '../resources/contacts.json';
import{
  TitleMain, 
  TitleList,
  CloseButton,
} from './App.styled'
import Modal from './modal/Modal';

const CONTACTS = 'contacts';
class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      filter: '',
      id: '',
      name: '',
      number: '',
      showModal: false,
    };
  }

  toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal,
    }));
  };

  validateExistContact = ({ contacts, values }) => {
    const { showModal } = this.state;
    const messages = [];
    if (contacts.some(contact => contact.number === values.number)) {
      const user = contacts.find(
        contact => contact.number === values.number
      ).name;
      messages.push(`${values.number} is already belongs to ${user}!`);
    }
    if (contacts.some(contact => contact.name === values.name)) {
      const phone = contacts.find(
        contact => contact.name === values.name
      ).number;
      messages.push(
        `${values.name} is already containce in phonebook with phone ${phone}!`
      );
    }
    if (messages.length && !showModal) {
      alert(messages.join('\n'));
    }
    return !!messages.length;
  };

  handleSubmit = (values, actions) => {
    const { contacts, id, showModal } = this.state;
    if (
      this.validateExistContact({
        contacts,
        values,
      }) && !showModal
    ) {
      return;
    }
    let newContacts = [...contacts];
    if (id) {
      newContacts = [
        ...newContacts.filter(contact => contact.id !== id),
        {
          id,
          name: values.name,
          number: values.number,
        },
      ]
    } else {
      newContacts = [
        ...newContacts,
        {
          id: nanoid(),
          name: values.name,
          number: values.number,
        },
      ]
    }
    this.setState({
      contacts: newContacts,
      id: '',
      showModal: false,
    });
    actions.resetForm({
      name: '',
      number: '',
    });
  };
  
  onContactEdit = id => {
    const { contacts, showModal } = this.state;
    const currentContact = contacts.find(contact => contact.id === id);
    this.setState({
      showModal: !showModal,
      id: currentContact.id,
      name: currentContact.name,
      number: currentContact.number,
    });
  };

  onContactDelete = id => {
    const { contacts } = this.state;
    const newContacts = [...contacts];
    this.setState({
      contacts: newContacts.filter(contact => contact.id !== id),
    });
  };

  handleFilter = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  componentDidMount() {
    localStorage.setItem(CONTACTS, JSON.stringify(baseContacts));

    const contactsString = localStorage.getItem(CONTACTS);
    this.setState({
      contacts: JSON.parse(contactsString),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      contacts,
    } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem(CONTACTS, JSON.stringify(contacts));
    }
  }

  render() {
    const {
      contacts,
      filter,
      showModal,
      id,
      name,
      number,
    } = this.state;
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
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <CloseButton onClick={this.toggleModal}>
              < CloseIcon/>
            </CloseButton>
            <ContactForm
              contact={{
                name, number
              }}
              handleSubmit={(values, actions) =>
                this.handleSubmit(values, actions)
              }
            />
          </Modal>
        )}
        <div>
          {!showModal && (
            <>
              <TitleMain>Phonebook</TitleMain>
              <ContactForm
                handleSubmit={(values, actions) =>
                  this.handleSubmit(values, actions)
                }
              />
            </>
          )}

          <TitleList>Contacts</TitleList>
          <Filter handleFilter={e => this.handleFilter(e)} />
          <ContactList
            contacts={contacts}
            filter={filter}
            onContactEdit={id => this.onContactEdit(id)}
            onContactDelete={id => this.onContactDelete(id)}
          />
        </div>
      </div>
    );
  }
}

export default App;
