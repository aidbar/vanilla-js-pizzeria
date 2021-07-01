// Selectors
document.querySelector('form').addEventListener('submit', handleSubmitForm);
document.querySelector('ul').addEventListener('click', handleDelete);
document.getElementById('clearAll').addEventListener('click', handleClearAll);




// Event Handlers
function handleSubmitForm(e) {
    e.preventDefault();
    let input = document.querySelector('input');
    if (input.value != '')
        addPizza(input.value);
    input.value = '';
}

function handleDelete(e) {
    if (e.target.name == 'deleteButton')
        deletePizza(e);
}

function handleClearAll(e) {
    document.querySelector('ul').innerHTML = '';
}

// Helpers
function addPizza(pizza) {
    let ul = document.querySelector('ul');
    let li = document.createElement('li');
    li.innerHTML = `
        <span class="pizza-item">${pizza}</span>
        <button name="deleteButton">Delete pizza</button>
    `;
    li.classList.add('pizza-list-item');
    ul.appendChild(li);
}

function deletePizza(e) {
    let item = e.target.parentNode;

    item.addEventListener('transitionend', function () {
        item.remove();
    });

    item.classList.add('pizza-list-item-fall');
}