import { useState } from 'react';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { ToastContainer, toast } from 'react-toastify';
import useLocalStorage from '../hooks/useLocalStorage';

import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { Box } from 'components/Box';
import { GlobalStyle } from './GlobalStyle';

const INITIAL_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

if (typeof window !== 'undefined') {
  injectStyle();
}

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', INITIAL_CONTACTS);
  const [filter, setFilter] = useState('');

  const deleteTodo = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const isAlreadyAdded = (newContact, contacts) =>
    contacts.find(item =>
      item.name.toLowerCase().includes(newContact.name.toLowerCase())
    );

  const handleSubmit = (values, actions) => {
    const newContact = { id: nanoid(), ...values };
    !isAlreadyAdded(newContact, contacts)
      ? setContacts(prevState => [...prevState, newContact])
      : notify(newContact.name);
    actions.resetForm();
  };

  const handleChangeFilter = e => {
    e.preventDefault();
    setFilter(e.target.value.toLowerCase());
  };

  const filterContacts = (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const onSubmit = (values, actions) => {
    actions.setSubmitting(false);
  };

  const filteredContacts = filterContacts(contacts, filter);

  const notify = newContactName =>
    toast.info(`Ups... ${newContactName} is already in contacts!`, {});

  return (
    <Box
      width={360}
      padding={32}
      m="auto"
      mt={30}
      mb={30}
      boxShadow="0 2px 5px rgba(0,0,0,0.2), 0 4px 6px rgba(0,0,0,0.2)"
      borderRadius="2px"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gridGap="24px"
      >
        <h1>PhoneBook</h1>
        <ContactForm onSubmit={handleSubmit} />
        <div>
          <h2 style={{ width: 'min-content', margin: '0 auto' }}>Contacts</h2>
          <Filter
            onChange={handleChangeFilter}
            valueFilter={filter}
            onSubmit={onSubmit}
          ></Filter>
          <Contacts
            contacts={filteredContacts}
            deleteTodo={deleteTodo}
          ></Contacts>
        </div>
        <ToastContainer autoClose={5000} />
      </Box>
      <GlobalStyle />
    </Box>
  );
}
