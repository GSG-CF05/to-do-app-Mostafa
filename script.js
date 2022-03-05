const label = document.querySelector(".label");
const addBtn = document.getElementById("push");
const list = document.getElementById("tasks");
const save = document.getElementById("save");
addBtn.addEventListener("click", addTask);
let array = []; // Declare an Array for save values and passing them into the local storage
function addTask(e) {
  e.preventDefault();
  if (label.value == null || label.value == "") {
    alert("Please enter a task !");
    return;
  }
  let newTaskDiv = document.createElement("div"); // Create div element and append it to list
  newTaskDiv.classList="parent-item-style"

  list.appendChild(newTaskDiv);
  let newTaskLi = document.createElement("li"); // Create li element
  newTaskLi.classList="item-style"

  newTaskLi.innerText = label.value;
  //newTaskLi.className="forEdit"
  // Take value from label and give it into li element
  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete";
  let editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.className = "edit";
  newTaskDiv.appendChild(newTaskLi);
  newTaskDiv.appendChild(editBtn);
  newTaskDiv.appendChild(deleteBtn); // append the li to the div
  saveToLocalStorage(label.value); // Calling this function for save values we entered in the label to  local storage
  label.value = "";
  let editCurrentTask = document.querySelectorAll(".edit");
 
  let valueEdit;

  for (let y = 0; y < editCurrentTask.length; y++) {
    editCurrentTask[y].onclick = function () {
      valueEdit = this.parentNode.firstChild.innerText;
      //   let index = array.indexOf(valueEdit) ;
      label.value = valueEdit;
      addBtn.style.display = "none";
      save.style.display = "block";
      save.addEventListener("click", saveEdit);
      function saveEdit() {
        let index = array.indexOf(valueEdit);
        array[index] = label.value;
        localStorage.setItem("array", JSON.stringify(array));
        addBtn.style.display = "block";
        save.style.display = "none";
        location.reload() ;

        label.value = "";
      }
    };
  }
  let currentTask = document.querySelectorAll(".delete");
  let x;
  let valueArr;
  for (x = 0; x < currentTask.length; x++) {
    currentTask[x].onclick = function () {
      valueArr = this.parentNode.firstChild.innerText;
      deleteFromLocalStorage(valueArr);
      this.parentNode.remove();
    };
  }
  //window.localStorage.setItem("array", JSON.stringify(array));
}
//This function for save values into local storage
function saveToLocalStorage(labelValue) {
  //(parameter) has the value we want save
  array.push(labelValue);
  localStorage.setItem("array", JSON.stringify(array));
}
function deleteFromLocalStorage(key) {
  array = JSON.parse(localStorage.getItem("array"));
  for (let i = 0; i < array.length; i++) {
    if (array[i] == key) {
      array.splice(i, 1);
    }
  }
  localStorage.setItem("array", JSON.stringify(array));
}
// This Event and function for get items from local storage and display them on the page
document.addEventListener("DOMContentLoaded", getDataFromLocalStorage);
function getDataFromLocalStorage() {
  if (localStorage.getItem("array")) {
    //Check if there is values in local storage
    array = JSON.parse(localStorage.getItem("array")); // Store items from local storage to the array
  }
  for (let i = 0; i < array.length; i++) {
    let newTaskDiv = document.createElement("div"); // Create div element and append it to list
    newTaskDiv.classList="parent-item-style"

    list.appendChild(newTaskDiv);
    let newTaskLi = document.createElement("li"); // Create li element>> To append it later to the div
    newTaskLi.classList="item-style"

    newTaskLi.innerText = array[i]; // Take value from label and give it into li element

    newTaskDiv.appendChild(newTaskLi);
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.innerText = "Delete";
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "edit";

    newTaskDiv.appendChild(editBtn);
let editCurrentTask = document.querySelectorAll(".edit");
 
  let valueEdit;

  for (let y = 0; y < editCurrentTask.length; y++) {
    editCurrentTask[y].onclick = function () {
      valueEdit = this.parentNode.firstChild.innerText;
      //   let index = array.indexOf(valueEdit) ;
      label.value = valueEdit;
      addBtn.style.display = "none";
      save.style.display = "block";
      save.addEventListener("click", saveEdit);
      function saveEdit() {
        let index = array.indexOf(valueEdit);
        array[index] = label.value;
        localStorage.setItem("array", JSON.stringify(array));
        addBtn.style.display = "block";
        save.style.display = "none";
        location.reload() ;

        label.value = "";
      }
    };
  }

    newTaskDiv.appendChild(deleteBtn);
    let currentTask = document.querySelectorAll(".delete");
    let x;
    let valueArr;
    for (x = 0; x < currentTask.length; x++) {
      currentTask[x].onclick = function () {
        valueArr = this.parentNode.firstChild.innerText;
        deleteFromLocalStorage(valueArr);
        this.parentNode.remove();
      };
    }
  }
}