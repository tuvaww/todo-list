class Todos {
  constructor(todo, done) {
    this.todo = todo;
    this.done = done;
  }
}

window.onload = function () {
  addTodo();
  done();
  createHTML();
  goBack();
  sortList();
  doneNote();
  undo();
};
let todo1 = new Todos("träna", true);
let todo2 = new Todos("äta", true);
let todo3 = new Todos("sova", true);

let listOfObjects = [todo1, todo2, todo3];

let listOfNewTodos = [todo1, todo2, todo3];

function addTodo() {
  let addElement = document.querySelector(".add-button");
  addElement.addEventListener("click", () => {
    let input = document.getElementById("input");
    let inputValue = input.value;
    let newTodo = new Todos(inputValue, true);

    input.value = "";
    if (inputValue === "") {
      alert("you must write something");
    } else {
      listOfNewTodos.push(newTodo);
      for (let i = 0; i < 1; i++) {
        let li = document.createElement("li");
        li.classList.add("lis");

        li.classList.add("bullet-list");
        let icon = document.createElement("i");
        icon.classList.add("bi");
        icon.classList.add("bi-trash-fill");
        icon.addEventListener("click", () => {
          deleteItem(i);
        });
        let doneIcon = document.createElement("i");
        doneIcon.classList.add("bi");
        doneIcon.classList.add("bi-check2");
        let string = document.createTextNode(
          listOfNewTodos[listOfNewTodos.length - 1].todo
        );
        li.appendChild(string);

        li.appendChild(icon);
        li.appendChild(doneIcon);
        document.getElementById("ol").appendChild(li);
      }
    }
    console.log("lägg till i listan", listOfNewTodos);
  });
}

function createHTML() {
  for (let i = 0; i < listOfNewTodos.length; i++) {
    if (listOfNewTodos[i].done === true) {
      let li = document.createElement("li");
      li.classList.add("lis");

      li.classList.add("bullet-list");
      let icon = document.createElement("i");
      icon.classList.add("bi");
      icon.classList.add("bi-trash-fill");
      icon.addEventListener("click", () => {
        deleteItem(i);
      });
      let doneIcon = document.createElement("i");
      doneIcon.classList.add("bi");
      doneIcon.classList.add("bi-check2");
      let string = document.createTextNode(listOfNewTodos[i].todo);
      li.appendChild(string);

      li.appendChild(icon);
      li.appendChild(doneIcon);
      document.getElementById("ol").appendChild(li);

      done();
    }
  }
}
function goBack() {
  let back = document.getElementsByClassName("back")[0];

  back.addEventListener("click", () => {
    for (let i = 0; i < listOfNewTodos.length; i++) {
      if (listOfNewTodos[i].done === false) {
        listOfNewTodos[i].done = !listOfNewTodos[i].done;
        console.log("bör göra boolean till true", listOfNewTodos);
        let containerOfLi = document.getElementById("ol");
        containerOfLi.innerHTML = "";
        createHTML();
      }
    }
  });
}

function deleteItem(i) {
  listOfNewTodos[i].done = !listOfNewTodos[i].done;
  let containerOfLi = document.getElementById("ol");
  containerOfLi.innerHTML = "";
  createHTML();
  console.log("detta händer när man raderar", listOfNewTodos);
}

function sortList() {
  let sorts = document.getElementsByClassName("sortList")[0];
  sorts.addEventListener("click", () => {
    listOfNewTodos.sort(function (a, b) {
      let textA = a.todo.toUpperCase();
      let textB = b.todo.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    let containerOfLi = document.getElementById("ol");
    containerOfLi.innerHTML = "";
    createHTML();
    console.log("sorterad", listOfNewTodos);
  });
}

function doneNote() {
  let drawLine = document.querySelectorAll(".list-ul");

  drawLine.forEach((checkedItem) => {
    checkedItem.addEventListener("click", () => {
      checkedItem.classList.add("list-checked");
    });
  });
}

function undo() {
  let reverse = document.querySelector(".bi-arrow-repeat");
  reverse.addEventListener("click", () => {
    let hej = document.querySelectorAll(".list-ul");
    hej.forEach((undoItem) => {
      undoItem.classList.remove("list-checked");
    });
  });
}

function done() {
  let check = document.querySelectorAll(".bi-check2");
  check.forEach((checkedItem) => {
    checkedItem.addEventListener("click", () => {
      checkedItem.classList.add("checked");
    });
  });
}

function addNote() {
  let bulletList = document.querySelector(".bullet-notes");
  bulletList.addEventListener("click", () => {
    let noteLi = document.createElement("li");
    noteLi.classList.add("list-ul");
    let noteValue = document.getElementById("noteInput").value;
    let newNoteValue = noteValue;
    let newNotes = new Todos(newNoteValue);
    listOfObjects.push(newNotes);

    let value = document.createTextNode(newNotes.todo);
    noteLi.appendChild(value);
    if (noteValue === "") {
      alert("You must write something");
    } else {
      document.getElementById("ul").appendChild(noteLi);
    }
    document.getElementById("noteInput").value = "";

    doneNote();
  });
}
