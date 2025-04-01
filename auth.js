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
const db = firebase.firestore(); // Initialize Firestore

// Register User and Add to Firestore
function register() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            let user = userCredential.user;
            
            // Save user details to Firestore
            return db.collection("users").doc(user.uid).set({
                email: user.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            alert("User Registered Successfully and added to Firestore!");
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
// Login with Google
document.getElementById("googleLoginBtn").addEventListener("click", async function () {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        alert("Google Login successful! Welcome " + user.displayName);
        document.getElementById("fetchUserBtn").style.display = "block";
    } catch (error) {
        alert(error.message);
    }
});

// Fetch User Data from Firestore
function getUserData() {
    let user = auth.currentUser;
    if (user) {
        db.collection("users").doc(user.uid).get()
            .then(doc => {
                if (doc.exists) {
                    console.log("User Data:", doc.data());
                } else {
                    console.log("No user data found.");
                }
            })
            .catch(error => {
                console.log("Error getting user data:", error);
            });
    } else {
        console.log("No user is logged in.");
    }
}
