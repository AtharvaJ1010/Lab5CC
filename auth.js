// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyD2bSMb17h8_eNqPbxOT8N9BFPJrqPL-Qw",
    authDomain: "group3cc-d3676.firebaseapp.com",
    projectId: "group3cc-d3676",
    storageBucket: "group3cc-d3676.firebasestorage.app",
    messagingSenderId: "951967837196",
    appId: "1:951967837196:web:bf859e82a8545c05f69229",
    measurementId: "G-460SGX253D"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Register User
function register() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("User Registered Successfully!");
        })
        .catch(error => {
            alert(error.message);
        });
}

// Login User
function login() {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            userCredential.user.getIdToken().then(token => {
                sessionStorage.setItem("authToken", token);
                alert("Login Successful!");
            });
        })
        .catch(error => {
            alert(error.message);
        });
}
