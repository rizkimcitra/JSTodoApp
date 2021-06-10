const floatingButton = document.getElementById("btnAddTodo");
const backDrop = document.querySelector(".backlit");
const menuToggler = document.getElementById("btnSideBar");
const closeMenu = document.getElementById("closeBtn");

// Membuat variable yang berisikan id pada HTML element yang sudah tersedia
// id untuk daftar yang belum dilakukan atau belum di ceklis
const INCOMPLETE_TODO = "incompleteTodo";
// id untuk daftar yang sudah dilakukan atau sudah di ceklis
const COMPLETE_TODO = "completeTodo";
const TODO_ITEMID = "itemId";

const openSideBar = () => {
  const mainArea = document.getElementById("main");
  const sideBar = document.getElementById("sideBar");
  mainArea.classList.add("shifted");
  sideBar.classList.add("shifted");
};
const closeSideBar = () => {
  const mainArea = document.getElementById("main");
  const sideBar = document.getElementById("sideBar");
  mainArea.classList.remove("shifted");
  sideBar.classList.remove("shifted");
};

const openForm = () => {
  const formArea = document.getElementById("form");
  if (formArea) {
    return formArea.classList.add("isShow");
  }
};
const closeForm = () => {
  const formArea = document.getElementById("form");
  if (formArea) {
    return formArea.classList.remove("isShow");
  }
};

// membuat fungsi untuk membuat daftar todo baru
const makeTodo = (data, timestamp, isCompleted) => {
  const textTitle = document.createElement("h2");
  textTitle.classList.add("title__style");
  textTitle.innerText = data;

  const textTimestamp = document.createElement("span");
  textTimestamp.classList.add("date__style");
  textTimestamp.innerText = timestamp;

  const textContainer = document.createElement("div");
  textContainer.classList.add("contentArea");
  textContainer.append(textTitle, textTimestamp);

  const container = document.createElement("div");
  container.classList.add("item", "bd-rad");
  container.append(textContainer);

  if (isCompleted) {
    container.append(createUndoButton(), createTrashButton());
  } else {
    container.append(createCheckButton(), createTrashButton());
  }

  return container;
};

const createUndoButton = () => {
  return createButton("btnTodo__undo", (event) => {
    undoTaskFromCompleted(event.target.parentElement);
  });
};

const createTrashButton = () => {
  return createButton("btnTodo__delete", (event) => {
    removeTaskFromCompleted(event.target.parentElement);
  });
};
const createCheckButton = () => {
  return createButton("btnTodo__check", (event) => {
    addTaskToCompleted(event.target.parentElement);
  });
};

const createButton = (buttonTypeClass, eventListener) => {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", (event) => {
    eventListener(event);
  });
  return button;
};

const addTodo = () => {
  const uncompletedTODOList = document.getElementById(INCOMPLETE_TODO);
  const textTodo = document.getElementById("title").value;
  const timestamp = document.getElementById("date").value;

  const todo = makeTodo(textTodo, timestamp, false);
  const todoObject = composeTodoObject(textTodo, timestamp, false);

  todo[TODO_ITEMID] = todoObject.id;
  todos.push(todoObject);

  uncompletedTODOList.append(todo);
  updateDataToStorage();
};

const addTaskToCompleted = (taskElement) => {
  const listCompleted = document.getElementById(COMPLETE_TODO);
  const taskTitle = taskElement.querySelector(".contentArea > h2").innerText;
  const taskTimestamp = taskElement.querySelector(".contentArea > span").innerText;

  const newTodo = makeTodo(taskTitle, taskTimestamp, true);
  const todo = findTodo(taskElement[TODO_ITEMID]);
  todo.isCompleted = true;
  newTodo[TODO_ITEMID] = todo.id;

  listCompleted.append(newTodo);
  taskElement.remove();

  updateDataToStorage();
};

const removeTaskFromCompleted = (taskElement) => {
  const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
  todos.splice(todoPosition, 1);

  taskElement.remove();
  updateDataToStorage();
};

const undoTaskFromCompleted = (taskElement) => {
  const listUncompleted = document.getElementById(INCOMPLETE_TODO);
  const taskTitle = taskElement.querySelector(".contentArea > h2").innerText;
  const taskTimestamp = taskElement.querySelector(".contentArea > span").innerText;

  const newTodo = makeTodo(taskTitle, taskTimestamp, false);

  const todo = findTodo(taskElement[TODO_ITEMID]);
  todo.isCompleted = false;
  newTodo[TODO_ITEMID] = todo.id;

  listUncompleted.append(newTodo);
  taskElement.remove();

  updateDataToStorage();
};

const refreshDataFromTodos = () => {
  const listUncompleted = document.getElementById(INCOMPLETE_TODO);
  let listCompleted = document.getElementById(COMPLETE_TODO);

  for (todo of todos) {
    const newTodo = makeTodo(todo.task, todo.timestamp, todo.isCompleted);
    newTodo[TODO_ITEMID] = todo.id;

    if (todo.isCompleted) {
      listCompleted.append(newTodo);
    } else {
      listUncompleted.append(newTodo);
    }
  }
};

floatingButton.addEventListener("click", () => {
  const closeFormArea = document.getElementById("closeForm");
  const main = document.getElementById("main");
  const backlit = document.createElement("div");
  backlit.classList.add("backlit");
  main.append(backlit);
  openForm();

  const backDropArea = document.querySelector(".backlit");
  closeFormArea.addEventListener("click", () => {
    backDropArea.remove();
    closeForm();
  });

  backDropArea.addEventListener("click", () => {
    closeForm();
    backDropArea.remove();
  });
});
menuToggler.addEventListener("click", openSideBar);
closeMenu.addEventListener("click", closeSideBar);
