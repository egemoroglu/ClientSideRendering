
function signinFunction(contentDiv){
    const signInContent = document.createElement("div");
    contentDiv.appendChild(signInContent);
    const signinDiv = document.createElement("div");
    signinDiv.setAttribute("id", "signin");
    signInContent.appendChild(signinDiv);

    //<div id="containerId" class="container">
    const signinContainerDiv = document.createElement("div");
    signinContainerDiv.setAttribute("class", "container");
    signinContainerDiv.setAttribute("id", "containerId");
    signinDiv.appendChild(signinContainerDiv);

    //<h2>Sign In</h2>
    const signinHeading = document.createElement("h2");
    signinHeading.textContent = "Sign In";
    signinHeading.style.marginTop = "100px";
    signinHeading.style.marginLeft = "450px";
    signinContainerDiv.appendChild(signinHeading);

    //<form id="signin-form">
    const signinForm = document.createElement("form");
    signinForm.setAttribute("id", "signin-form");
    signinForm.style.marginLeft = "450px";
    signinForm.setAttribute('action', '/signin')
    signinForm.setAttribute('method', 'POST');
    signinContainerDiv.appendChild(signinForm);

    //<input id="singinUsername" class="input" type="text" name="username" placeholder="Username" required="true">
    const signinUsername = document.createElement("input");
    signinUsername.setAttribute("id", "signinUsername");
    signinUsername.setAttribute("class", "input");
    signinUsername.setAttribute("type", "text");
    signinUsername.setAttribute("name", "username");
    signinUsername.setAttribute("placeholder", "Username");
    signinUsername.setAttribute("required", "true");
    signinForm.appendChild(signinUsername);

    signinForm.appendChild(document.createElement("br"));

    //<input id="signinPassword" class="input" type="password" name="password" placeholder="Password" required="true">
    const signinPassword = document.createElement("input");
    signinPassword.setAttribute("id", "signinPassword");
    signinPassword.setAttribute("class", "input");
    signinPassword.setAttribute("type", "password");
    signinPassword.setAttribute("name", "password");
    signinPassword.setAttribute("placeholder", "Password");
    signinPassword.setAttribute("required", "true");
    signinForm.appendChild(signinPassword);

    signinForm.appendChild(document.createElement("br"));
    signinForm.appendChild(document.createElement("br"));

    //<button id="submitBtn" type="submit" class="button" action="/signin">Signin</button>
    const signinBtn = document.createElement("button");
    signinBtn.setAttribute("id", "Btn");
    signinBtn.setAttribute("type", "submit");
    signinBtn.setAttribute("class", "btn btn-primary");
    signinBtn.textContent = "Sign In";
    signinForm.appendChild(signinBtn);

    //<div id="btnDiv">
    const signupLinkDiv = document.createElement("div");
    signupLinkDiv.setAttribute("id", "btnDiv");
    signinContainerDiv.appendChild(signupLinkDiv);

    //<p>Don't have an account? </p>
    const signupMessage = document.createElement("p");
    signupMessage.textContent = "Don't have an account? ";
    signinForm.appendChild(signupMessage);

    //<button id="signupBtn" class="button">Sign Up</button>
    const signupLink = document.createElement("a");
    signupLink.setAttribute("id", "signup-link");
    signupLink.setAttribute("href", "/");
    signupLink.style.marginLeft = "450px";
    signupLink.textContent = "Sign Up";
    signupLinkDiv.appendChild(signupLink);

    //Event Listener for sign in event
    signinForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const username = signinUsername.value;
        const password = signinPassword.value;
        const payload = {
            username: username,
            password: password
        }
        console.log('Sign in button clicked');

        //Fetch request to sign in
        try{
            await fetch('/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            }).then((response) => {
                console.log('Response', response);
                console.log('User Found');
                contentDiv.innerHTML = '';
                todoFunction(contentDiv, username);
            }).catch((error) => {
                console.error('Error:', error);
                alert('User not found');
            });
        }catch(error){
            console.error(error);
            alert('User not found');
            console.log('User not found');
        }
        
    });


}

