    
    const contentDiv = document.getElementById("content");
    //<div id="signup">
    const signupDiv = document.createElement("div");
    signupDiv.setAttribute("id", "signup");
    contentDiv.appendChild(signupDiv);

    //<div id="containerId" class="container">
    const containerDiv = document.createElement("div");
    containerDiv.setAttribute("class", "container");
    containerDiv.setAttribute("id", "containerId");
    signupDiv.appendChild(containerDiv);

    //<h2>Sign Up</h2>
    const signupHeading = document.createElement("h2");
    signupHeading.textContent = "Sign Up";
    signupHeading.style.marginTop = "100px";
    signupHeading.style.marginLeft = "450px";
    containerDiv.appendChild(signupHeading);

    //<form id="signup-form">
    const signupForm = document.createElement("form");
    signupForm.setAttribute("id", "signup-form");
    signupForm.setAttribute("name", "signup-form");
    signupForm.setAttribute("method", "POST");
    signupForm.setAttribute("action", "/signup");
    signupForm.style.marginLeft = "450px";
    containerDiv.appendChild(signupForm);

    //<input id="singupUsername" class="input" type="text" name="username" placeholder="Username" required="true">
    const usernameInput = document.createElement("input");
    usernameInput.setAttribute("id", "singupUsername");
    usernameInput.setAttribute("name", "signupUsername");
    usernameInput.setAttribute("class", "input");
    usernameInput.setAttribute("type", "text");
    usernameInput.setAttribute("placeholder", "Username");
    usernameInput.setAttribute("required", "true");
    signupForm.appendChild(usernameInput);

    signupForm.appendChild(document.createElement("br"));

    //<input id="signupPassword" class="input" type="password" name="password" placeholder="Password" required="true">
    const passwordInput = document.createElement("input");
    passwordInput.setAttribute("id", "signupPassword");
    passwordInput.setAttribute("class", "input");
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("name", "password");
    passwordInput.setAttribute("placeholder", "Password");
    passwordInput.setAttribute("required", "true");
    signupForm.appendChild(passwordInput);

    signupForm.appendChild(document.createElement("br"));
    signupForm.appendChild(document.createElement("br"));

    //<button id="submitBtn" type="submit" class="button" action="/add">Sign Up</button>
    const submitButton = document.createElement("button");
    submitButton.setAttribute("id", "submit");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("class", "btn btn-primary");
    submitButton.textContent = "Sign Up";
    signupForm.appendChild(submitButton);

    //<p>Already have an account? </p>
    const signinMessage = document.createElement("p");
    signinMessage.textContent = "Already have an account? ";
    signupForm.appendChild(signinMessage);

    //<div id="signinDiv">
    const signinLinkDiv = document.createElement("div");
    signinLinkDiv.setAttribute("id", "signinDiv");
    containerDiv.appendChild(signinLinkDiv);

    //<button id="signinBtn" class="button" type="button">Sign In</button>
    const signinLink = document.createElement("a");
    signinLink.setAttribute("id", "signin-link");
    signinLink.setAttribute("href", "/signin");
    signinLink.textContent = "Sign In";
    signinLink.style.marginLeft = "450px";
    signinLinkDiv.appendChild(signinLink);
    
    //Event listener for the sign up event
    document.addEventListener('DOMContentLoaded', () => {
        const signupForm = document.getElementById('signup-form');
        if(!signupForm){
            console.error("Signup Form is not present");
            return;
        }else{
            console.log("Signup Form is present");
        }
        document.getElementById('signup-form').addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = usernameInput.value;
            const password = passwordInput.value;
            console.log("Signup button clicked");
            const payload = {
                username,
                password
            };
            
            try {
                const response = await fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                if(response.ok) {
                    alert("Signup successful. Please sign in to continue.");
                }else{
                    alert("Signup failed. Please try again");
                }
            } catch (error) {
                console.error(error);
                console.log('Error signing up. Please try again.');
            }  
        });
    });

    //Sign in Link calls the signinFunction to delete the index content and load the signin content
    signinLink.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log("Sign In link clicked");

        contentDiv.innerHTML = '';
        signinFunction(contentDiv);

    });
