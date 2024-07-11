import './style.css';

const LOCAL_ARRAY_NAME = 'my-todos';

type ToDoItem = {
  isCompleted: boolean;
  text: string;
  id: string;
};
let toDos: ToDoItem[] = [];

const listEl = document.querySelector<HTMLUListElement>('#list')!;
const formEl = document.querySelector<HTMLFormElement>('#new-todo-form')!;
const todoInputEl = document.querySelector<HTMLInputElement>('#todo-input')!;

const savedTodos = localStorage.getItem(LOCAL_ARRAY_NAME);
if (savedTodos) {
  toDos = JSON.parse(savedTodos);
  toDos.forEach((toDo) => renderToDoItem(toDo));
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = todoInputEl.value;
  if (!text) return;
  const newToDoItem: ToDoItem = {
    isCompleted: false,
    text: text,
    id: crypto.randomUUID(),
  };
  toDos.push(newToDoItem);
  todoInputEl.value = '';
  renderToDoItem(newToDoItem);
  saveToLocalStorage();
});

function renderToDoItem(item: ToDoItem) {
  const liEl = document.createElement('li');
  liEl.classList.add('list-item');
  const labelEl = document.createElement('label');
  labelEl.classList.add('list-item-label');
  const inputEl = document.createElement('input');
  inputEl.classList.add('label-input');
  inputEl.type = 'checkbox';
  inputEl.checked = false;
  inputEl.addEventListener('change', () => {
    item.isCompleted = inputEl.checked;
    saveToLocalStorage();
  });
  const spanEl = document.createElement('span');
  spanEl.classList.add('label-text');
  spanEl.innerText = item.text;
  const buttonEl = document.createElement('button');
  buttonEl.classList.add('delete-btn');
  buttonEl.innerText = 'Delete';
  buttonEl.addEventListener('click', () => {
    liEl.remove();
    toDos = toDos.filter((toDoItem) => toDoItem.id !== item.id);
    saveToLocalStorage();
  });

  labelEl.append(inputEl, spanEl);
  liEl.append(labelEl, buttonEl);
  listEl.append(liEl);
}

function saveToLocalStorage() {
  localStorage.setItem(LOCAL_ARRAY_NAME, JSON.stringify(toDos));
}
