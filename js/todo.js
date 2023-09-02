const users = document.getElementById('todo-items');
const TodoInput = document.getElementById('todoInput');
const TotalItems = document.getElementById('totalItems');
const TodoStorage = sessionStorage.getItem('TodoStorage');

let TodoList;

TodoStorage === null ? TodoList = [] : TodoList = JSON.parse(TodoStorage);

//Display List and Total list
function DisplayList() {
    let str = '';

    for (let i = 0; i < TodoList.length; i++) {
        str += `
        <div class="todolist active" data-class>
            <label class='boxContainer' for="${TodoList[i].id}">
                <p>${TodoList[i].todo}</p>
                <input type="checkbox" id="${TodoList[i].id}" data-input>
                <span class="checkmark"></span>
            </label>
            <div class="deltodoBtn" onclick="Deltodo(${i})">
                <img src="./images/icon-cross.svg">
            </div>
        </div>
        `
    }

    users.innerHTML = str;
    TotalItems.innerHTML = `${TodoList.length} Items left`;
}

DisplayList();

function checkBoxes(){
    var boxes = document.querySelectorAll("input[type='checkbox']");
    var todoClass = document.querySelectorAll('[data-class]');
    
    for (var i = 0; i < boxes.length; i++) {
         var box = boxes[i];
         if (box.hasAttribute("id")) {
            setupBox(box);
            checkBox();
        }
    }

    function checkBox(){
        if(boxes[i].checked === true) {
            todoClass[i].classList.add('complete');
            todoClass[i].classList.remove('active');
        }else{
            todoClass[i].classList.add('active');
            todoClass[i].classList.remove('complete');
        }
    }
    
    function setupBox(box) {
        var storageId = box.getAttribute("id");
        var oldVal = sessionStorage.getItem(storageId);
        
        box.checked = oldVal === "true" ? true : false;

        box.addEventListener("change", function() {

            for(let i = 0; i < boxes.length; i++){
                if(boxes[i].checked === true){
                    todoClass[i].classList.add('complete');
                    todoClass[i].classList.remove('active');
                }else{
                    todoClass[i].classList.add('active');
                    todoClass[i].classList.remove('complete');
                }
            }
            sessionStorage.setItem(storageId, this.checked); 
        });
    }
}
checkBoxes();

//Click Enter if input is not empty Submit Value
TodoInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        if(TodoInput.value.trim() === ''){
            alert('Input is Empty')
        } else {
            AddTodo();
            TodoInput.value = '';
        }
    }
})

//Add List
function AddTodo() {
    let RandomID = Math.floor(1 + Math.random() * 0x10000).toString(16).substring(1);
    let InputValue = TodoInput.value.trim();

    TodoList.push({
        id: RandomID,
        todo: InputValue
    })
    myFunctions();
}

//Remove selected List
function Deltodo(index){
    TodoList.splice(index, 1);
    myFunctions();
}

function myFunctions(){
    DisplayList();
    checkBoxes();
    filterSelection('all');
    sessionStorage.setItem('TodoStorage', JSON.stringify(TodoList));
}

function filterSelection(c) {
    const elements = document.getElementsByClassName('todolist');
    
    for (const element of elements) {
        if (c === 'all' || element.classList.contains(c)) {
            addClass(element, 'show');
        } else {
            removeClass(element, 'show');
        }
    }
}
filterSelection('all');

function addClass(element, name) {
    const classesToAdd = name.split(' ');

    for (const className of classesToAdd) {
        if (!element.classList.contains(className)) {
            element.classList.add(className);
        }
    }
}

function removeClass(element, name) {
    const classesToRemove = name.split(' ');

    for (const className of classesToRemove) {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        }
    }
}
