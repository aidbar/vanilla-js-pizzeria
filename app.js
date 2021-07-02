// Selectors
document.querySelector('form').addEventListener('submit', handleSubmitForm);
document.querySelector('ul').addEventListener('click', handleDelete);
document.getElementById('clearAll').addEventListener('click', handleClearAll);

//Global variables
var idSessionStorage = 0;
var heatIcon = './pics/heatIcon.png'




// Event Handlers
function handleSubmitForm(e) {
    e.preventDefault();
    //let input = document.querySelector('input');

    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let heat = document.getElementById("heat").value;

    let toppings = [];
    let toppingsHTMLNodes = document.getElementsByName("toppings");
    console.log(toppingsHTMLNodes);
    for (i = 0; i < toppingsHTMLNodes.length; i++){
        //if 'checked' is true then add the 'value' to 'toppings'
        console.log("checked is " + toppingsHTMLNodes[i].checked);
        if (toppingsHTMLNodes[i].checked) {
            toppings.push(toppingsHTMLNodes[i].value);
        }
    }

    console.log("selected toppings are: ");
    console.log(toppings);

    let photo = "";
    let photosHTMLNodes = document.getElementsByName("photo");
    console.log(photosHTMLNodes);
    for (i = 0; i < photosHTMLNodes.length; i++) {
        //if 'checked' is true then save the 'value' as 'photo'
        console.log("checked is " + photosHTMLNodes[i].checked);
        if (photosHTMLNodes[i].checked) {
            photo = photosHTMLNodes[i].value;
        }
    }
    console.log(photo);

    let newPizza = {
        'name': name,
        'price': price,
        'heat': heat,
        'toppings': toppings,
        'photo': photo
    };

    //console.log(toppings);

    if (toppings.length >= 2) { //toppings: Array<string> // required, min-length 2 (other required parameters are handled with 'required' keyword in index.html)
        console.log("length checked");
        console.log(newPizza);
        addPizza(newPizza);
    }

    /*console.log(input);
    if (input.value != '')
        addPizza(input.value);
    input.value = '';*/
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
    sessionStorage.setItem(idSessionStorage, pizza);
    //let prevId = idSessionStorage;
    console.log("added to sessionStorage");
    console.log(sessionStorage.getItem(idSessionStorage).toString);

    displayAddedPizza(pizza);

    idSessionStorage++;
}

function deletePizza(e) {
    console.log("e.target.value is " + e.target.value);
    if (window.confirm("Do you really want to delete this pizza?")) {
        sessionStorage.removeItem(e.target.value);
        console.log("getItem returned " + sessionStorage.getItem(e.target.value)); //checking if the item was actually deleted from sessionStorage (expected result is 'null')
        console.log(sessionStorage.getItem(e.target.value)); //checking if the item was actually deleted from sessionStorage (expected result is 'null')

        removeDeletedPizzaFromDisplay(e);
    }
}

function displayAddedPizza(pizza) {
    let ul = document.querySelector('ul');
    let li = document.createElement('li');

    let heatDisplayString = "";
    if (pizza.heat != "") {
        for (i = 0; i < pizza.heat; i++) heatDisplayString += `<img src="${heatIcon}" alt="heat icon" width="20" height="20"/>`;
    }

    li.innerHTML = `
        <span class="pizza-item"> ${idSessionStorage} ${pizza.name} ${pizza.price} ${heatDisplayString} ${pizza.toppings} <img src="${pizza.photo}" alt="Photo of pizza" width="20" height="20"/></span >
        <button name="deleteButton" value="${idSessionStorage}">Delete pizza</button>
    `;
    li.classList.add('pizza-list-item');
    li.value = idSessionStorage;
    console.log("li.value is " + li.value);
    ul.appendChild(li);

    document.getElementById("form").reset();
}

function removeDeletedPizzaFromDisplay(e) {
    let item = e.target.parentNode;

    item.addEventListener('transitionend', function () {
        item.remove();
    });

    item.classList.add('pizza-list-item-fall');
}