async function doneFunction(contentDiv, username){
    const doneDiv = document.createElement('div');
    contentDiv.appendChild(doneDiv);

    //<button id="backBtn" class="btn btn-primary">Back</button>
    const doneBackBtn = document.createElement('button');
    doneBackBtn.setAttribute('id', 'backBtn');
    doneBackBtn.setAttribute('class', 'btn btn-primary');
    doneBackBtn.textContent = 'Back';
    doneDiv.appendChild(doneBackBtn);

    //<h2 id="todoHeader">Todo List</h2>
    const doneHeader = document.createElement('h2');
    doneHeader.setAttribute('id', 'todoHeader');
    doneHeader.textContent = 'Done List';
    doneDiv.appendChild(doneHeader);

    //<div id="todoContent" style="margin-top: 50px;"></div>
    const doneContent = document.createElement('div');
    doneContent.setAttribute('id', 'todoContent');
    doneContent.style.marginTop = "50px";
    doneDiv.appendChild(doneContent);

    //<div id="tableDiv" class="row"></div
    const doneRowDiv = document.createElement('div');
    doneRowDiv.setAttribute('id', 'tableDiv');
    doneRowDiv.setAttribute('class', "row");
    doneContent.appendChild(doneRowDiv);

    //<table id="table" class="table table-striped table-bordered table-hover table-"></table>
    const doneTable = document.createElement('table');
    doneTable.setAttribute('id', 'table');
    doneTable.setAttribute('class', 'table table-striped table-bordered table-hover table-');
    doneRowDiv.appendChild(doneTable);

    //<thead id="thead" class="table-primary"></thead>
    const doneThead = document.createElement('thead');
    doneThead.setAttribute('id', 'thead');
    doneThead.setAttribute('class', 'table-primary');
    doneTable.appendChild(doneThead);

    //<tr></tr>
    const doneHeaderTr = document.createElement('tr');
    doneThead.appendChild(doneHeaderTr);

    //<th scope="col">Title</th>
    const doneTh1 = document.createElement('th');
    doneTh1.setAttribute('scope', 'col');
    doneTh1.textContent = 'Title';
    doneHeaderTr.appendChild(doneTh1);

    //<th scope="col">Assignee</th>
    const doneTh2 = document.createElement('th');
    doneTh2.setAttribute('scope', 'col');
    doneTh2.textContent = 'Assignee';
    doneHeaderTr.appendChild(doneTh2);

    //<th scope="col">Done</th>
    const doneTh3 = document.createElement('th');
    doneTh3.setAttribute('scope', 'col');
    doneTh3.textContent = 'Done';
    doneHeaderTr.appendChild(doneTh3);

    //<tbody></tbody>
    const doneTbody = document.createElement('tbody');
    doneTable.appendChild(doneTbody);

    //Get the done tasks
    const doneResult = await fetch(`/doneList?username=${username}`)
    .then((response) => {console.log("res", response);return response.json()})
    .catch((error) => {
      console.error('Error:', error);
    });
    if(doneResult?.message?.length){
        //Populate the table with done tasks
        doneResult.message.forEach((task) => {
            //<tr><td>Title</td><td>Assignee</td><td>Done</td></tr>
            const doneTr = document.createElement('tr');
            doneTbody.appendChild(doneTr);

            const doneTd1 = document.createElement('td');
            doneTd1.textContent = String(task.title);
            doneTr.appendChild(doneTd1);

            const doneTd2 = document.createElement('td');
            doneTd2.textContent = String(task.assignee);
            doneTr.appendChild(doneTd2);

            const doneTd3 = document.createElement('td');
            doneTd3.textContent = String(task.done);
            doneTr.appendChild(doneTd3);
        });
        
    }

    doneBackBtn.addEventListener('click', async () => {
        doneDiv.innerHTML = '';
        todoFunction(contentDiv, username);
    });
}

        
    




