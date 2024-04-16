async function todoFunction(contentDiv, username){
  const todoDiv = document.createElement('div');
  contentDiv.appendChild(todoDiv);  

  //<input id="title" type="text" name="title" class="input" placeholder="Title"></input>
  const todoInput = document.createElement('input');
  todoInput.setAttribute('id', 'title');
  todoInput.setAttribute('class', 'input');
  todoInput.setAttribute('type', 'text');
  todoInput.setAttribute('name', 'title');
  todoInput.setAttribute('placeholder', 'Title');
  todoInput.style.marginTop = "100px";
  todoInput.style.marginLeft = '600px';
  todoDiv.appendChild(todoInput);

  //<button type="submit" class="btn btn-primary" id="addBtn">Add</button>
  const addButton = document.createElement('button');
  addButton.setAttribute('id', 'addBtn');
  addButton.setAttribute('type', 'submit');
  addButton.setAttribute('class', 'btn btn-primary');
  addButton.textContent = 'Add';
  addButton.style.marginLeft = '10px';
  todoDiv.appendChild(addButton);

  //<button class="btn btn-primary" id="listDone">List Done</button>
  const listDone = document.createElement('button');
  listDone.setAttribute('id', 'listDone');
  listDone.setAttribute('class', 'btn btn-primary');
  listDone.textContent = 'List Done';
  listDone.style.marginLeft = '10px';
  todoDiv.appendChild(listDone);

  //<button class="btn btn-primary" id="listUndone">List Undone</button>
  const listUndone = document.createElement('button');
  listUndone.setAttribute('id', 'listUndone');
  listUndone.setAttribute('class', 'btn btn-primary');
  listUndone.textContent = 'List Undone';
  listUndone.style.marginLeft = '10px';
  todoDiv.appendChild(listUndone);

  todoInput.appendChild(document.createElement('br'));

  //<h2 id="todoHeader">Todo List</h2>
  const todoHeader = document.createElement('h2');
  todoHeader.setAttribute('id', 'todoHeader');
  todoHeader.textContent = 'Todo List';
  todoDiv.appendChild(todoHeader);

  //<div id="todoContent" style="margin-top: 50px;"></div>
  const todoContent = document.createElement('div');
  todoContent.setAttribute('id', 'todoContent');
  todoContent.style.marginTop = "50px";
  todoDiv.appendChild(todoContent);

  //<div id="tableDiv" class="row"></div
  const rowDiv = document.createElement('div');
  rowDiv.setAttribute('id', 'tableDiv');
  rowDiv.setAttribute('class', "row");
  todoContent.appendChild(rowDiv);

  //<table id="table" class="table table-striped table-bordered table-hover table-"></table>
  const table = document.createElement('table');
  table.setAttribute('id', 'table');
  table.setAttribute('class', 'table table-striped table-bordered table-hover table-');
  rowDiv.appendChild(table);

  //T<thead class="table-primary" id="thead"></thead>
  const thead = document.createElement('thead');
  thead.setAttribute('id', 'thead');
  thead.setAttribute('class', 'table-primary');
  table.appendChild(thead);

  //<tr></tr>
  const headerTr = document.createElement('tr');
  thead.appendChild(headerTr);

  const th0 = document.createElement('th');
  th0.setAttribute('scope', 'col');
  headerTr.appendChild(th0);

  //<th scope="col">Title</th>
  const th1 = document.createElement('th');
  th1.setAttribute('scope', 'col');
  th1.textContent = 'Title';
  headerTr.appendChild(th1);

  //<th scope="col">Assignee</th>
  const th2 = document.createElement('th');
  th2.setAttribute('scope', 'col');
  th2.textContent = 'Assignee';
  headerTr.appendChild(th2);

  //<th scope="col">Done</th>
  const th3 = document.createElement('th');
  th3.setAttribute('scope', 'col');
  th3.textContent = 'Done';
  headerTr.appendChild(th3);

  //<tbody></tbody>
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  //Get the todo list from server
   const result = await fetch(`/todoList?username=${username}`)
    .then((response) => {console.log("res", response);return response.json()})
    .catch((error) => {
      console.error('Error:', error);
    });

   console.log('=====', result)

  if (result?.message?.length) {
    result.message.forEach((task) => {
      //<tr><td>task.title</td><td>task.assignee</td><td>task.done</td></tr>
      const tr = document.createElement("tr");
      tbody.appendChild(tr);

      const imageTd = document.createElement("td");
      tr.appendChild(imageTd);

      const todoImg = document.createElement('img');
      todoImg.setAttribute("id", "todoImg");
      todoImg.setAttribute('width', '75');
      todoImg.setAttribute('height', '75');
      imageTd.appendChild(todoImg);


      const title = document.createElement("td");
      title.textContent = String(task.title);
      tr.appendChild(title);

      const assignee = document.createElement("td");
      assignee.textContent = String(task.assignee);
      tr.appendChild(assignee);

      const done = document.createElement("td");
      done.textContent = String(task.done);
      tr.appendChild(done);

      

      if (String(task.done) === 'false') {
        //<button type="button" id="markDoneBtn" method="post" action="/markDone" class="btn btn-primary done-btn">Mark as Done</button>
        const markDoneBtn = document.createElement("button");
        markDoneBtn.setAttribute("id", "markDoneBtn");
        markDoneBtn.setAttribute('type', "button");
        markDoneBtn.setAttribute("method", "POST");
        markDoneBtn.setAttribute("action", "/markDone");
        markDoneBtn.setAttribute("class", "btn btn-primary done-btn");
        markDoneBtn.textContent = "Mark as Done";
        tr.appendChild(markDoneBtn);
        //Event listener for mark done button
        markDoneBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          const taskid = task.id;
          console.log('Mark Done Button Clicked');
          console.log('Task Id:', taskid);
          try {
            await fetch(`/markDone?id=${taskid}`, {
              method: 'POST',
            }).then((response) => {
              console.log(response);
              if (response.status === 200) {
                console.log('Task Marked Done');
                contentDiv.innerHTML = '';
                todoFunction(contentDiv, username);
              } else {
                console.log('Task Mark Done Failed');
              }
            });
          } catch (error) {
            console.error(error);
            console.log('Task Mark Done Failed');
          }
        
        });

      } else {
        //<button type="button" id="markUndoneBtn" method="post" action="/markUndone" class="btn btn-primary undone-btn">Mark as Undone</button>
        const markUndoneBtn = document.createElement("button");
        markUndoneBtn.setAttribute("id", "markUndoneBtn");
        markUndoneBtn.setAttribute('type', "button");
        markUndoneBtn.setAttribute("method", "POST")
        markUndoneBtn.setAttribute("action", "/markUndone");
        markUndoneBtn.setAttribute("class", "btn btn-primary undone-btn");
        markUndoneBtn.textContent = "Mark as Undone";
        tr.appendChild(markUndoneBtn);
        //Event listener for mark undone button
        markUndoneBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          const taskid = task.id;
          console.log('Mark Undone Button Clicked');
          console.log('Task Id:', taskid);
          try {
            await fetch(`/markUndone?id=${taskid}`, {
              method: 'POST',
            }).then((response) => {
              console.log(response);
              if (response.status === 200) {
                console.log('Task Marked Undone');
                contentDiv.innerHTML = '';
                todoFunction(contentDiv, username);
              } else {
                console.log('Task Mark Undone Failed');
              }
            });
          } catch (error) {
            console.error(error);
            console.log('Task Mark Undone Failed');
          }
        });
      }
      //<button id="updateBtn" class="btn btn-primary">Update</button>
      const updatebtn = document.createElement("button");
      updatebtn.setAttribute("id", "updatebtn");
      updatebtn.setAttribute("class", "btn btn-primary");
      updatebtn.textContent = "Update";
      tr.appendChild(updatebtn);
      //<button id="deleteBtn" class="btn btn-primary delete-btn">Delete</button>
      const deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("id", "deleteBtn");
      deleteBtn.setAttribute("type", "submit");
      deleteBtn.setAttribute("class", "btn btn-primary delete-btn");
      deleteBtn.textContent = "Delete";
      tr.appendChild(deleteBtn);
      //Event listener for update button
      updatebtn.addEventListener('click', async () => {
        const taskid = task.id;
        const taskUser = username;
        contentDiv.innerHTML = '';
        updateFunction(contentDiv, taskid, taskUser);
      
      });
      
      //<input type="file" id="pic" name="pic" accept="image/*">
      const uploadInput = document.createElement('input');
      uploadInput.setAttribute('type', 'file');
      uploadInput.setAttribute('id', 'pic');
      uploadInput.setAttribute('name', 'pic');
      uploadInput.setAttribute('accept', 'image/*');
      tr.appendChild(uploadInput);

      //<button type="submit" id="imageDeleteBtn" class="btn btn-primary">Delete Image</button>
      const imageDeleteBtn = document.createElement('button');
      imageDeleteBtn.setAttribute('id', 'imageDeleteBtn');
      imageDeleteBtn.setAttribute('type', 'submit');
      imageDeleteBtn.setAttribute('class', 'btn btn-primary');
      imageDeleteBtn.textContent = 'Delete Image';
      tr.appendChild(imageDeleteBtn);

      // Function to upload image to AWS S3
      async function uploadToS3(file) {
        console.log(file.name, file.type);
        const signedUrlResponse = await fetch('/getSignedUrl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filename: file.name,
                filetype: file.type
            })
        });

        const { signedUrl, imageUrl } = await signedUrlResponse.json();

        // Upload the file to the pre-signed URL
        const uploadResponse = await fetch(signedUrl, {
            method: 'PUT',
            body: file
        });
        const filename = file.name;
        if (uploadResponse.ok) {
            console.log('File uploaded successfully');
            alert('File uploaded successfully');

            //Display the image
            const displayImage = await fetch(`/getObject?filename=${filename}`);
            if(displayImage.ok) {
              const blob = await displayImage.blob();
              const url = window.URL.createObjectURL(blob);
              document.getElementById('todoImg').src = url;
            } else {
              console.error('Failed to display image');
            }

        } else {
            console.error('Failed to upload file');
        }
      }

      // Event listener for file input change
      uploadInput.addEventListener('change', (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        uploadToS3(file);
      });


      // Event listener for image delete button
      imageDeleteBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        const imageUrl = document.getElementById('todoImg').src;
        const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
        console.log(filename);
          
        const response = await fetch('/deleteObject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filename: filename
                
            })
        });

        if(response.ok) {
          alert('Image deleted successfully');
        } else {
          alert('Failed to delete image');
        }
      });

      //Event listener for delete button
      deleteBtn.addEventListener('click', async () => {
        const taskid = task.id;
        console.log('Delete Button Clicked');
        console.log('Task Id:', taskid);
        try {
          await fetch(`/delete?id=${taskid}`, {
            method: 'POST',
          }).then((response) => {
            console.log(response);
            if (response.status === 200) {
              console.log('Task Deleted');
              contentDiv.innerHTML = '';
              todoFunction(contentDiv, username);
            } else {
              console.log('Task Delete Failed');
            }
          });
        } catch (error) {
          console.error(error);
          console.log('Task Delete Failed');
        }
      });
    });
   }
  //Event listener to add a new task to the todo list
  addButton.addEventListener('click', async () => {
    const taskTitle = todoInput.value;
    console.log("Button Clicked");

    const payload= {
      title: taskTitle
    }
  
    try {
      //Fetch request to add a new task
      fetch(`/addTask?username=${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log('Task Added');
          contentDiv.innerHTML = '';
          todoFunction(contentDiv, username);
        } else {
          console.log('Task Add Failed');
        }
      });
    }catch (error) {
        console.error(error);
        console.log('Task Add Failed');
    }
  });

  //Event listener for list done button
  listDone.addEventListener('click', async () => {
    console.log(username);
    console.log("Button Clicked");
    contentDiv.innerHTML = '';
    doneFunction(contentDiv, username);
  });
  //Event listener for list undone button
  listUndone.addEventListener('click', async () => {
    console.log(username);
    console.log("Button Clicked");
    contentDiv.innerHTML = '';
    undoneFunction(contentDiv, username);
  });
 
}
