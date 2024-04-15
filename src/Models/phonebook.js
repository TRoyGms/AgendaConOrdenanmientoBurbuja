import { ContactNode } from './contacts.js';
class QueueNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.front = null;
        this.rear = null;
        this.size = 0;
    }

    enqueue(value) {
        const newNode = new QueueNode(value);
        if (!this.front) {
            this.front = newNode;
            this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }
        this.size++;
    }

    dequeue() {
        if (!this.front) {
            return null;
        }
        const removedNode = this.front;
        this.front = this.front.next;
        if (!this.front) {
            this.rear = null;
        }
        this.size--;
        return removedNode.value;
    }

    isEmpty() {
        return this.size === 0;
    }

    peek() {
        return this.front ? this.front.value : null;
    }

    getSize() {
        return this.size;
    }
}

class PhoneBook {
    constructor() {
        this.head = null;
        this.queue = new Queue();
    }

    addContact(name, number) {
        const contactNode = new ContactNode(name, number);
        if (!this.head) {
            this.head = contactNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = contactNode;
        }
        this.queue.enqueue(contactNode);
        return contactNode;
    }

    getAllContacts() {
        const contacts = [];
        let current = this.head;
        while (current) {
            contacts.push(current.contact);
            current = current.next;
        }
        return contacts;
    }

    removeContactByNumber(number) {
        if (!this.head) {
            return;
        }
        if (this.head.contact.number === number) {
            this.head = this.head.next;
            this.queue.dequeue();
            return;
        }
        let current = this.head;
        let prev = null;
        while (current && current.contact.number !== number) {
            prev = current;
            current = current.next;
        }
        if (current) {
            prev.next = current.next;
            this.queue.dequeue();
        }
    }

    bubbleSortContacts() {
        let swapped;
        let current;
        let next;
        let temp;
        do {
            swapped = false;
            current = this.head;
            while (current && current.next) {
                next = current.next;
                if (this.compareContacts(current.contact, next.contact) > 0) {
                    // Intercambiar los nodos
                    if (current === this.head) {
                        this.head = next;
                    } else {
                        let prev = this.head;
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
        // Función de comparación para ordenar por número primero y luego por nombre
        if (/\d/.test(contact1.name) && !/\d/.test(contact2.name)) {
            return -1;
        } else if (!/\d/.test(contact1.name) && /\d/.test(contact2.name)) {
            return 1;
        } else {
            return contact1.name.localeCompare(contact2.name);
        }
    }
}

export { PhoneBook };