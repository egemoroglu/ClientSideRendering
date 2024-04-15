function updateFunction(contentDiv, taskid, taskUser){
    const updateDiv = document.createElement('div');
    contentDiv.appendChild(updateDiv);
    //<button id="backBtn" class="btn btn-primary">Back</button>
    const updateBackBtn = document.createElement('button');
    updateBackBtn.setAttribute('id', 'backBtn');
    updateBackBtn.setAttribute('class', 'btn btn-primary');
    updateBackBtn.textContent = 'Back';
    updateDiv.appendChild(updateBackBtn);

    //<h2 style="margin-top: 100px; margin-left: 600px;">Update Task</h2>
    const updateHeader = document.createElement('h2');
    updateHeader.textContent = 'Update Task';
    updateHeader.style.marginTop = "100px";
    updateHeader.style.marginLeft = '600px';
    updateDiv.appendChild(updateHeader);

    //<form id="update-form" name="update-form" method="POST" action="/update" style="margin-top: 100px; margin-left: 600px;"></form>
    const todoUpdate = document.createElement('form');
    todoUpdate.setAttribute('id', 'update-form');
    todoUpdate.setAttribute('name', 'update-form');
    todoUpdate.setAttribute('method', 'POST');
    todoUpdate.setAttribute('action', '/update');
    todoUpdate.style.marginTop = "100px";
    todoUpdate.style.marginLeft = '600px';
    updateDiv.appendChild(todoUpdate);

    //<input type="text" name="todoInput" class="input" placeholder="Title" id="todoInput">
    const updateInput = document.createElement('input');
    updateInput.setAttribute('id', 'todoInput');
    updateInput.setAttribute('type', 'text');
    updateInput.setAttribute('name', 'todoInput');
    updateInput.setAttribute('class', 'input');
    updateInput.setAttribute('placeholder', 'Title');
    todoUpdate.appendChild(updateInput);

    //<button class="btn btn-primary" type="submit" id="updateButton">Update</button>
    const updateButton = document.createElement('button');
    updateButton.setAttribute('class', 'btn btn-primary');
    updateButton.setAttribute('type', 'submit');
    updateButton.setAttribute('id', 'updateButton');
    updateButton.textContent = 'Update';
    todoUpdate.appendChild(updateButton);

    //Event listener to update the task with the given id
    todoUpdate.addEventListener('submit', async (event) => {
        event.preventDefault();
        const updatedTitle = updateInput.value;
        const data = {
            title: updatedTitle
        };
        //Fetch request to update the task with the given id
        await fetch(`/update?id=${taskid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            console.log(response);
            if(response.status === 200){
                console.log('Task Updated');
                contentDiv.innerHTML = '';
                todoFunction(contentDiv, taskUser);
               
            }else{
                console.log('Task Update Failed');
            }
        })    
    
    });

    //Event listener to go back to the todo list
    updateBackBtn.addEventListener('click', async () => {
        contentDiv.innerHTML = '';
        todoFunction(contentDiv, taskUser);
    });



}


