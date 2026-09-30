console.log("JS Connected.......!")

const inputBox = document.querySelector("#input");
const addButton = document.querySelector("#addBtn");
let taskSection = document.querySelector(".div2");

addButton.addEventListener("click", () => {
    if (inputBox.value === ""){
        return;
    }

    //Delete Button:
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    //Edit Button:
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    let divChild = document.createElement("div");
    divChild.classList.add("divChild");
    divChild.append(editBtn);
    divChild.append(deleteBtn);

    let inpValue= document.createElement("div");
    inpValue.textContent= inputBox.value; 

    let task = document.createElement("div");
    task.classList.add("todo");
    task.append(inpValue);
    task.append(divChild);

    taskSection.append(task);
    inputBox.value = "";

    deleteBtn.addEventListener("click", () => {
        task.remove();
    });

    editBtn.addEventListener("click", ()=>{
        let editInput= prompt("Enter Here Edited task......!");
        inpValue.textContent= editInput;
    });

});


