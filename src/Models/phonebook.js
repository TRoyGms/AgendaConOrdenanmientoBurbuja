import { ContactNode } from './contacts.js';

class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    add(value) {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    remove(value) {
        if (!this.head) {
            return;
        }
        if (this.head.value === value) {
            this.head = this.head.next;
            this.size--;
            return;
        }
        let current = this.head;
        let prev = null;
        while (current && current.value !== value) {
            prev = current;
            current = current.next;
        }
        if (current) {
            prev.next = current.next;
            this.size--;
        }
    }

    isEmpty() {
        return this.size === 0;
    }

    getSize() {
        return this.size;
    }

    toArray() {
        const array = [];
        let current = this.head;
        while (current) {
            array.push(current.value);
            current = current.next;
        }
        return array;
    }
}

class PhoneBook {
    constructor() {
        this.linkedList = new LinkedList();
    }

    addContact(name, number) {
        const contactNode = new ContactNode(name, number);
        this.linkedList.add(contactNode);
        return contactNode;
    }

    getAllContacts() {
        const contacts = [];
        let current = this.linkedList.head;
        while (current) {
            contacts.push(current.value.contact);
            current = current.next;
        }
        return contacts;
    }

    removeContactByNumber(number) {
        let current = this.linkedList.head;
        let prev = null;
        while (current) {
            if (current.value.contact.number === number) {
                if (prev === null) {
                    this.linkedList.head = current.next;
                } else {
                    prev.next = current.next;
                }
                return;
            }
            prev = current;
            current = current.next;
        }
    }

    bubbleSortContacts() {
        let swapped;
        let current;
        let next;
        let temp;
        do {
            swapped = false;
            current = this.linkedList.head;
            while (current && current.next) {
                next = current.next;
                if (this.compareContacts(current.value.contact, next.value.contact) > 0) {
                    // Intercambiar los nodos
                    if (current === this.linkedList.head) {
                        this.linkedList.head = next;
                    } else {
                        let prev = this.linkedList.head;
                        while (prev.next !== current) {
                            prev = prev.next;
                        }
                        prev.next = next;
                    }
                    current.next = next.next;
                    next.next = current;
    
                    // Actualizar referencias para la siguiente iteración
                    temp = current;
                    current = next;
                    next = temp;
    
                    swapped = true;
                }
                current = current.next;
            }
        } while (swapped);
    }
    
    compareContacts(contact1, contact2) {
        // Función de comparación para ordenar por símbolos, números y letras
        const categoryOrder = { 'symbol': 0, 'number': 1, 'letter': 2 };

        function getCategory(contact) {
            if (/[^a-zA-Z0-9]/.test(contact.name[0])) {
                return 'symbol';
            } else if (/\d/.test(contact.name[0])) {
                return 'number';
            } else {
                return 'letter';
            }
        }

        const category1 = getCategory(contact1);
        const category2 = getCategory(contact2);

        // Ordenar primero por categoría
        if (categoryOrder[category1] < categoryOrder[category2]) {
            return -1;
        } else if (categoryOrder[category1] > categoryOrder[category2]) {
            return 1;
        }

        // Si están en la misma categoría, ordenar alfabéticamente
        return contact1.name.localeCompare(contact2.name);
    }
}

export { PhoneBook };
