async function undoneFunction(contentDiv, username){
    const undoneDiv = document.createElement('div');
    contentDiv.appendChild(undoneDiv);

    //<button class="btn btn-primary" id="backBtn">Back</button>
    const backBtn = document.createElement('button');
    backBtn.setAttribute('id', 'backBtn');
    backBtn.setAttribute('class', 'btn btn-primary');
    backBtn.textContent = 'Back';
    undoneDiv.appendChild(backBtn);

    //<h2 id="todoHeader">Todo List</h2>
    const undoneHeader = document.createElement('h2');
    undoneHeader.setAttribute('id', 'todoHeader');
    undoneHeader.textContent = 'Undone List';
    undoneDiv.appendChild(undoneHeader);

    //<div id="todoContent" style="margin-top: 50px;"></div>
    const undoneContent = document.createElement('div');
    undoneContent.setAttribute('id', 'todoContent');
    undoneContent.style.marginTop = "50px";
    undoneDiv.appendChild(undoneContent);

    //<div id="tableDiv" class="row"></div
    const undoneRowDiv = document.createElement('div');
    undoneRowDiv.setAttribute('id', 'tableDiv');
    undoneRowDiv.setAttribute('class', "row");
    undoneContent.appendChild(undoneRowDiv);

    //<table id="table" class="table table-striped table-bordered table-hover table-"></table>
    const undoneTable = document.createElement('table');
    undoneTable.setAttribute('id', 'table');
    undoneTable.setAttribute('class', 'table table-striped table-bordered table-hover table-');
    undoneRowDiv.appendChild(undoneTable);

    //<thead id="thead" class="table-primary"></thead>
    const undoneThead = document.createElement('thead');
    undoneThead.setAttribute('id', 'thead');
    undoneThead.setAttribute('class', 'table-primary');
    undoneTable.appendChild(undoneThead);

    //<tr></tr>
    const undoneTr = document.createElement('tr');
    undoneThead.appendChild(undoneTr);

    //<th scope="col">Title</th>
    const undoneTh1 = document.createElement('th');
    undoneTh1.setAttribute('scope', 'col');
    undoneTh1.textContent = 'Title';
    undoneTr.appendChild(undoneTh1);

    //<th scope="col">Assignee</th>
    const undoneTh2 = document.createElement('th');
    undoneTh2.setAttribute('scope', 'col');
    undoneTh2.textContent = 'Assignee';
    undoneTr.appendChild(undoneTh2);

    //<th scope="col">Done</th>
    const undoneTh3 = document.createElement('th');
    undoneTh3.setAttribute('scope', 'col');
    undoneTh3.textContent = 'Done';
    undoneTr.appendChild(undoneTh3);

    //<tbody></tbody>
    const undoneTbody = document.createElement('tbody');
    undoneTable.appendChild(undoneTbody);

    //Get the undone tasks
    const undoneResult = await fetch(`/undoneList?username=${username}`)
    .then((response) => {console.log("res", response);return response.json()})
    .catch((error) => {
      console.error('Error:', error);
    });
    if(undoneResult?.message?.length){
        //Populate the table with the undone tasks
        undoneResult.message.forEach(task => {
            //<tr><td>Title</td><td>Assignee</td><td>Done</td></tr>
            const undoneRow = document.createElement('tr');
            undoneTbody.appendChild(undoneRow);

            const undoneTitle = document.createElement('td');
            undoneTitle.textContent = String(task.title);
            undoneRow.appendChild(undoneTitle);

            const undoneAssignee = document.createElement('td');
            undoneAssignee.textContent = String(task.assignee);
            undoneRow.appendChild(undoneAssignee);

            const done = document.createElement('td');
            done.textContent = String(task.done);
            undoneRow.appendChild(done);
        });

    }
    //Back button to turn back to the todo list
    backBtn.addEventListener('click', async () => {
        contentDiv.innerHTML = '';
        todoFunction(contentDiv, username);
    });
}


