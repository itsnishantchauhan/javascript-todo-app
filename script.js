let taskInput = document.querySelector("#taskInput");
let addBtn = document.querySelector(".addBtn");
let todoContainer = document.querySelector(".todoContainer");

let API = "https://6aa7debb9b08676cd32b97df.mockapi.io/api/v1/Todos";


addBtn.addEventListener("click", () => {

    
    if(taskInput.value.trim() === ""){
        return;
    }else{
        postData();
    }
    
})

async function fetchData() {
    let response = await fetch(API);
    let data = await response.json();

    if (data) {
        todoContainer.innerHTML = "";

        data.forEach(obj => {

            let div = document.createElement("div");
            div.className = "todo";
            div.innerHTML = `
                <p class= "paraText">${obj.text}</p>
                <input id="editInput" type="text" placeholder="Enter your task..!!" value= "${obj.text}">
                 <div>
                    <button class= "deleteBtn">Delete</button>
                    <button class= "editBtn">Edit</button>
                    <button class= "saveBtn">Save</button>
                </div>
                `

            let deleteBtn = div.querySelector(".deleteBtn");
            let editBtn = div.querySelector(".editBtn");
            let saveBtn = div.querySelector(".saveBtn");
            let editInput = div.querySelector("#editInput");
            let paraText= div.querySelector(".paraText")
            
            deleteBtn.addEventListener("click", () => {
                deleteData(obj.id);
            });
          
            editBtn.addEventListener("click", () => {
                editBtn.style.display= "none";
                saveBtn.style.display= "inline";

                editInput.style.display= "inline";
                paraText.style.display= "none";
            });

            saveBtn.addEventListener("click", async() => {
                await updateData(obj.id, editInput.value);

                editBtn.style.display= "inline";
                saveBtn.style.display= "none";
                editInput.style.display= "none";
                paraText.style.display= "inline";

            });

            todoContainer.append(div);
        });

    }

    // let parha= document.createElement("p");
    // let deleteBtn= document.createElement("button");
    // deleteBtn.textContent= "Delete";
    // let editBtn= document.createElement("button");
    // editBtn.textContent= "Edit";

    // div.append(deleteBtn);
    // div.append(editBtn);
    // div.append(parha);
}

async function postData() {

    let value = taskInput.value;
    let objData = {
        text: value.trim()
    }
    taskInput.value = "";

    let response = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objData)
    })
    console.log(response);
    // let data= await response.json();

    if (response.status === 201) {
        fetchData();
    }
}

async function deleteData(id) {

    let response = await fetch(`${API}/${id}`, {
        method: "DELETE",
    })

    if (response.status === 200) {
        fetchData();
    }

    console.log(response);
}

async function updateData(id,editedVal) {

    let objData = {
        text: editedVal.trim()
    }

    let response= await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(objData)
    })

    console.log(response);
    if(response.status === 200){
        fetchData();
    }

    
}

fetchData()
