//controllers.js

import { PhoneBook } from './Models/phonebook.js';
const phoneBook = new PhoneBook();

function displayContacts(contacts) {
    const displayArea = document.getElementById('agendaDisplay');
    displayArea.innerHTML = ''; // Limpiar el contenido existente
    if (contacts.length === 0) {
        displayArea.textContent = 'No hay contactos en la agenda.';
    } else {
        contacts.forEach(contact => {
            const contactElement = document.createElement('div');
            contactElement.textContent = `${contact.name}: ${contact.number}`;
            displayArea.appendChild(contactElement);
        });
    }
}

export function addContact() {
    const name = document.getElementById('nameInput').value;
    const number = document.getElementById('numberInput').value;
    phoneBook.addContact(name, number);
    phoneBook.bubbleSortContacts(); // Ordenar los contactos después de agregar uno nuevo
}

export function showAgenda() {
    const contacts = phoneBook.getAllContacts();
    displayContacts(contacts);
}

export function removeContact() {
    const number = document.getElementById('removeInput').value;
    phoneBook.removeContactByNumber(number);
    phoneBook.bubbleSortContacts(); // Ordenar los contactos después de eliminar uno
    const contacts = phoneBook.getAllContacts();
    displayContacts(contacts);
}
