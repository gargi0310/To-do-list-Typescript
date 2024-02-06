import './style.css'

interface Todo{
  title:string;
  isCompleted:boolean;
  readonly id: string;
}

const todos:Todo[] = [];

const todosContainer = document.querySelector(".todoContainer") as HTMLDivElement;

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;

const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) =>{
  e.preventDefault();

  const todo:Todo ={
    title:todoInput.value,
    isCompleted:false,
    id:String(Math.random() * 1000),
  };

  todos.push(todo);
  todoInput.value = "";
  // console.log(todos);

  renderTodo(todos);

}

const generateTodoItem = (title:string, isCompleted:boolean, id:string) =>{
  const todo:HTMLDivElement = document.createElement("div");
  todo.className = "todo";

  //CREATING A CHECKBOX
  const checkBox:HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted"
  checkBox.checked = isCompleted
  checkBox.onchange = ()=>{
    paragraph.className =  checkBox.checked ? "textCut" : ""; 
  }

  //CREATING P FOR TITLE
  const paragraph:HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;

  //CREATING DELETE BUTTON
  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X"
  btn.className = "deleteBtn";
  btn.onclick=()=>{
    deleteTodo(id);
  }

  //APPENDING ALL TO TODOiTEM

  todo.append(checkBox, paragraph, btn);

  todosContainer.append(todo);

};

const deleteTodo = (id:string)=>{
  const idx = todos.findIndex(item=>item.id===id);

  todos.splice(idx, 1);

  renderTodo(todos);
}

const renderTodo = (todos:Todo[])=>{
  todosContainer.innerText="";
  todos.forEach(item=>{
    generateTodoItem(item.title, item.isCompleted, item.id);
  })
}
