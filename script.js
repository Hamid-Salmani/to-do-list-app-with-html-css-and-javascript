window.addEventListener('load' , showTask)
let input = document.querySelector('input');
let addBtn = document.querySelector('button');
let taskList = document.querySelector('ul');
let deleteBtn = document.getElementById("delete-all")
let tasks;

if(!localStorage.getItem('todo')){
    tasks = [];
}else{
    tasks = getItems();
}

function inputIsEmpty(){
    if(input.value == ''){
        return false
    }else{
        return true
    }
}

function eventHandler(){
    if(inputIsEmpty()){
        let text = input.value;
        let task = createTask(text);
        task.innerHTML += `<span class="closeBtn"><i class="fa-solid fa-trash-can"></i></span>`
        taskList.appendChild(task);
        saveTasks(text);
        input.value = '';
    }else{
        alert("لطفا فیلد را پر کنید")
    }
}

deleteBtn.addEventListener('click' , ()=>{
    localStorage.clear();
    location.reload();
})

addBtn.addEventListener('click' ,eventHandler )

input.addEventListener('keypress' , (event)=>{
    
        if(event.key === "Enter"){
            eventHandler()
        }
    
})

taskList.addEventListener('click' , (e)=>{
        if(e.target.nodeName === 'I'){
            let target = e.target.parentElement.parentElement;
            target.style = `display : none`;
            tasks.splice(tasks.indexOf(target.textContent) , 1);
            localStorage.setItem('todo' , tasks);

         };
         if(e.target.nodeName === 'LI'){
            e.target.classList.toggle('done')
         }
})

function createTask(text){
    let Li = document.createElement('li');
    Li.textContent += text;
    return Li;
}

function saveTasks(text){
    tasks.push(text);
    localStorage.setItem('todo' , tasks);
}

function getItems(){
    //this if clear localstorage to prevent empty list
    if(localStorage.getItem('todo') == ""){
        localStorage.clear();
    }
    return localStorage.getItem('todo').split(',');
}

function showTask(){
    for (let taskText of getItems()) {
        let task = createTask(taskText);
        task.innerHTML += `<span class="closeBtn"><i class="fa-solid fa-trash-can"></i></span>`
        taskList.appendChild(task);
    }
}