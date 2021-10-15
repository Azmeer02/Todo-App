const inputBox = document.querySelector(".input-field input");
const addBtn = document.querySelector(".input-field button");
const showTodo = document.querySelector(".todo-list")
const deleteAll = document.querySelector(".footer button")

inputBox.onkeyup = ()=> {
    let userData = inputBox.value;
    if(userData.trim() != 0){
        addBtn.classList.add("active");
    }
    else{
        addBtn.classList.remove("active");
    }
}

showTask();

addBtn.onclick = ()=> {
    let data = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){
        listArr = [];
    }
    else{
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(data);
    localStorage.setItem("New Todo" , JSON.stringify(listArr));
    showTask();
}

function showTask(){
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){
        listArr = [];
    }
    else{
        listArr = JSON.parse(getLocalStorage);
    }
    const pending = document.querySelector(".pending-task");
    pending.textContent = listArr.length;
    if(listArr.length > 0){
        deleteAll.classList.add("active");
    }
    else{
        deleteAll.classList.remove("active");
    }
    let newLi = "";
    listArr.forEach((element , index) => {
        newLi += `<li>${element}<span onclick = "deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    showTodo.innerHTML = newLi;
    inputBox.value = "";
}

showTask();

function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index,1);
    localStorage.setItem("New Todo" , JSON.stringify(listArr));
    showTask();
}

deleteAll.onclick = ()=> {
    listArr = [];
    localStorage.setItem("New Todo" , JSON.stringify(listArr));
    showTask();
}