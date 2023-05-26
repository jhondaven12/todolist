const todoStorage = sessionStorage.getItem('todoStorage');

let todoList;

todoStorage === null? todoList = [] : todoList = JSON.parse(todoStorage);

//Get Todolist Data
function todoELement() { 
    let str = '';

    for(let i = 0; i < todoList.length; i++) {
        str += `
        <div class="todolist active" data-class>
        <label class='boxContainer' for="${todoList[i].id}">
        <p>${todoList[i].text}</p>
        <input type="checkbox" id="${todoList[i].id}" data-input>
        <span class="checkmark"></span>
        </label>
        <div class="deltodoBtn" onclick="deltodo(${i})">
        <img src="./images/icon-cross.svg">
        </div>
        </div>
        `;
    }

    document.getElementById('todo-items').innerHTML = str;
    
}
todoELement();

//Checkboxes
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

let todoInput = document.getElementById('todoInput');
let addboxlist = document.getElementById('addboxlist');

todoInput.onkeypress = function(e) {

    if(e.key === 'Enter') {
        if(todoInput.value === '') { 
            addboxlist.style.border = '2px solid red';
        } else { 
            createTodo();
            addboxlist.style.border = '2px solid transparent';
            todoInput.value = '';
        }
    }
}

//Add list to Storage
function createTodo(){

    //Generate Random Id
    let id = () => {
        return Math.floor(1 + Math.random() * 0x10000)
        .toString(16)
        .substring(1);
    }

    let txt = todoInput.value.trim();

    todoList.push({
        id: id(),
        text: txt
    });

    totalItems.innerHTML = todoList.length + ' items left';

    todoELement();
    checkBoxes();
    filterSelection('all');
    sessionStorage.setItem('todoStorage', JSON.stringify(todoList));
}

//Delete list to storage
function deltodo(n){

    todoList.splice(n, 1);

    totalItems.innerHTML = todoList.length + ' items left';
    
    todoELement();
    checkBoxes();
    filterSelection('all');
    sessionStorage.setItem('todoStorage', JSON.stringify(todoList));   

}

//todolist total items
let totalItems = document.getElementById('totalItems');
totalItems.innerHTML = todoList.length + ' items left';

//filter for todolist
filterSelection('all');

function filterSelection(c){
    var x, i;
    x = document.getElementsByClassName('todolist');
    if(c == 'all') c = "";
    for(i = 0; i < x.length; i++) {
        removeClass(x[i], "show");
        if(x[i].className.indexOf(c) > -1) addClass(x[i], "show");
    }
}

//Add Class to element
function addClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for(i = 0; i < arr2.length; i++){
        if(arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

//Remove Class to element 
function removeClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for(i = 0; i < arr2.length; i++) {
        while(arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

/*Delete All Checked List
function clearAllComplete() {
    const todoClass = [...document.querySelectorAll('[data-class]')];

    todoClass.forEach((value, index) => {
        if(value.classList.contains('complete')) {
            todoList.splice(index, 1);

            totalItems.innerHTML = todoList.length + ' items left';
            
            todoELement();
            checkBoxes();
            filterSelection('all');
            sessionStorage.setItem('todoStorage', JSON.stringify(todoList));   
        }
    })
}
*/
