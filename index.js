import * as controllers from './src/controllers.js';

document.getElementById('addContactBtn').addEventListener('click', controllers.addContact);
document.getElementById('showAgendaBtn').addEventListener('click', controllers.showAgenda);
document.getElementById('removeContactBtn').addEventListener('click', controllers.removeContact);

document.getElementById("numberInput").addEventListener("input", function() {
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10); // Limitar la longitud a 10 caracteres
    }
});