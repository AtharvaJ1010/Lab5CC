<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Firebase Auth Example</title>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 400px;
            margin: auto;
            padding: 20px;
        }
        input, button {
            display: block;
            margin: 10px 0;
            padding: 10px;
            width: 100%;
        }
        #googleLoginBtn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            background-color: white;
            border: 1px solid #ccc;
        }
        #googleLoginBtn img {
            height: 20px;
        }
    </style>
</head>
<body>

    <h2>Register</h2>
    <input type="email" id="email" placeholder="Email">
    <input type="password" id="password" placeholder="Password">
    <button onclick="register()">Register</button>

    <h2>Login</h2>
    <input type="email" id="login-email" placeholder="Email">
    <input type="password" id="login-password" placeholder="Password">
    <button onclick="login()">Login</button>

    <button id="googleLoginBtn">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo">
        Sign in with Google
    </button>

    <button id="fetchUserBtn" style="display: none;" onclick="getUserData()">Fetch User Data</button>

    <script>
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
        const db = firebase.firestore();

        // Register User
        function register() {
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            auth.createUserWithEmailAndPassword(email, password)
                .then(userCredential => {
                    let user = userCredential.user;
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
                        document.getElementById("fetchUserBtn").style.display = "block";
                    });
                })
                .catch(error => {
                    alert(error.message);
                });
        }

        // Google Login
        document.getElementById("googleLoginBtn").addEventListener("click", function () {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider)
                .then(result => {
                    const user = result.user;

                    // Save or update Firestore user data
                    db.collection("users").doc(user.uid).set({
                        name: user.displayName,
                        email: user.email,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    });

                    alert("Google Login successful! Welcome " + user.displayName);
                    document.getElementById("fetchUserBtn").style.display = "block";
                })
                .catch(error => {
                    alert(error.message);
                });
        });

        // Fetch User Data
        function getUserData() {
            const user = auth.currentUser;
            if (user) {
                db.collection("users").doc(user.uid).get()
                    .then(doc => {
                        if (doc.exists) {
                            console.log("User Data:", doc.data());
                            alert("Check console for user data.");
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
    </script>
</body>
</html>
