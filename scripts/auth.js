// get data
db.collection("guides").get().then(snapshot => {
    setupGuides(snapshot.docs);
});

// Listen for auth status changes
auth.onAuthStateChanged(user => {
    // console.log(user)
    if (user) {
        console.log('user is logged in: ', user);
    } else {
        console.log('user is logged out: ');
    }
});

// sign up
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // get user info
    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
       
        const modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close(); // close the modal after user is signed up
        signupForm.reset();
    });

});

// logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() =>{
        // console.log('user signed out');
    });
});

// login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;

    // log in the user
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user);
        // close the login model and reset the form
        const modal = document.querySelector("#modal-login");
        M.Modal.getInstance(modal).close(); // close the modal after user is signed up
        loginForm.reset();
    })

})