// Functions

function saveToStorage(list) {
    localStorage.setItem('todos', JSON.stringify(list));
    saved = true;
}

function loadFromStorage() {
    let list = JSON.parse(localStorage.getItem('todos'))
    if (list) {
        return list;
    } else {
        return [];
    }
}


function addnew() {
    let input = document.getElementById('new-todo-input')
    let name = input.value;
    list.push({
        "name": name,
        "completed": false
    });
    saved = false;
    saveToStorage(list);
    let index = listUl.childElementCount;
    listUl.appendChild(generateListItem(index, name, false));
    input.value = '';

}

function generateList(list, listUl) {
    while (listUl.firstChild) {
        listUl.removeChild(listUl.firstChild);
    }

    let i = 0;
    for (let element of list) {

        let listElement = generateListItem(i, element.name, element.completed);
        listUl.appendChild(listElement);

        i++;
    }
    saveToStorage(list);
}

function generateListItem(i, name, completed) {
    let listElement = document.createElement("li");
    listElement.classList = ['element'];


    let checkBtn = document.createElement("i");
    // checkBtn.type = 'button';
    checkBtn.classList = ['check-button'];

    let v = i;
    checkBtn.addEventListener("click", function (e) {
        toggleItem(v, list, listUl);
    });
    listElement.appendChild(checkBtn);

    // let v = i;

    // listElement.addEventListener("click", function (e) {
    //     toggleItem(v, list, listUl);
    // });

    let innerText = document.createElement("span");
    innerText.classList = ['element-label'];
    // innerText.innerText = element.name;

    if (completed == true) {
        checkBtn.innerText = "✓";
        // innerText.innerText = '(X) ';
        innerText.classList.add('checked');
        listElement.classList.add('checked');
    } else {
        checkBtn.innerText = " ";
        // innerText.innerText = '( ) ';
        innerText.classList.add('unchecked');
        listElement.classList.add('unchecked');
    }
    innerText.innerText += name;

    listElement.appendChild(innerText);

    let deleteBtn = document.createElement('i');
    deleteBtn.className = 'fas fa-trash';
    deleteBtn.addEventListener('click', function (e) {
        e.preventDefault();
        deleteItem(v, list, listUl);
    })
    listElement.appendChild(deleteBtn);
    return listElement;
}

function toggleItem(index, list, listUl) {
    list[index].completed = !list[index].completed;

    let newChild = generateListItem(index, list[index].name, list[index].completed);

    let oldChild = listUl.querySelectorAll('li')[index];

    listUl.replaceChild(newChild, oldChild);
    saved = false;
    saveToStorage(list);

}

function deleteItem(index, list, listUl) {
    list.pop(index);
    generateList(list, listUl);
}


// Eventlisteners

document.getElementById('addnew-form').addEventListener('submit', function (event) {
    event.preventDefault();
    addnew();
    document.getElementById('new-todo-input').focus()
});

let saved = true;

window.addEventListener("beforeunload", function (e) {
    if (!saved) {
        e.preventDefault();
        e.returnValue = "good bye";
    }
})


// Variables

let list = loadFromStorage();
let listUl = document.getElementById('list');


generateList(list, listUl);