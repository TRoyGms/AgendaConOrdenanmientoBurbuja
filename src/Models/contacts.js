class Contact {
    constructor(name, number) {
        this.name = name;
        this.number = number;
    }
}

class ContactNode {
    constructor(name, number) {
        this.contact = new Contact(name, number);
        this.next = null;
    }
}

export { Contact, ContactNode };