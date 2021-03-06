// add admin cloud functions
const adminForm = document.querySelector(".admin-actions");
adminForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const adminEmail = document.querySelector("#admin-email").value;
    // constant addAdminRole is referencing functions that is HTTPS callable from addAdminRole in index.js functions
    const addAdminRole = functions.httpsCallable("addAdminRole");
    // invoking the function addAdminRole asynchronous task
    addAdminRole({email: adminEmail}).then(result => {
        console.log(result);
    });
});

// Listen for auth status changes
auth.onAuthStateChanged(user => {
    // console.log(user)
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        })
        // get data
        db.collection("guides").onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
        }, err => {
            console.log(err.message)
        });
    } else {
        // console.log('user is logged out: ');
        setupUI();
        setupGuides([]);
    }
});

// create new guide
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
    e.preventDefault();

    db.collection("guides").add({
        title: createForm["title"].value,
        content: createForm["content"].value
    }). then(() => {
        // close the modal and reset form after it is done adding to db.collection in firebase
        const modal = document.querySelector("#modal-create");
        M.Modal.getInstance(modal).close(); // close the modal after user has created a guide
        createForm.reset();
        // catch an error and console the error message
    }).catch(err => {
        console.log(err.message)
    });
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
        // set the bio to a doc (new collection called users if it doesn't exist) with user credential id
        return  db.collection('users').doc(cred.user.uid).set({
            bio: signupForm["signup-bio"].value
        });
    }).then(() => {
        const modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close(); // close the modal after user is signed up
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = "";
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;

    })

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
        loginForm.querySelector('.error').innerHTML = "";
    }).catch ( err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    })

})