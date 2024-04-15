export function updateDisplay(contacts) {
    const agendaDisplay = document.getElementById('agendaDisplay');
    if (Array.isArray(contacts)) {
        agendaDisplay.innerHTML = '';
        contacts.forEach(contact => {
            agendaDisplay.innerHTML += `<div>${contact.name}: ${contact.number}</div>`;
        });
    } else {
        agendaDisplay.innerHTML = `<div>${contacts.name}: ${contacts.number}</div>`;
    }
}