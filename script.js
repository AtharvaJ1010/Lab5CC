document.addEventListener("DOMContentLoaded", function () {
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

    // Register User and Save to Firestore
    document.getElementById("registerBtn").addEventListener("click", async function () {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        try {
            let userCredential = await auth.createUserWithEmailAndPassword(email, password);
            let user = userCredential.user;

            // Save user data in Firestore
            await db.collection("users").doc(user.uid).set({
                email: user.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            alert("User registered successfully and data stored in Firestore!");
        } catch (error) {
            alert(error.message);
        }
    });

    // Login User
    document.getElementById("loginBtn").addEventListener("click", async function () {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        try {
            let userCredential = await auth.signInWithEmailAndPassword(email, password);
            alert("Login successful!");
        } catch (error) {
            alert(error.message);
        }
    });

    // Fetch User Data from Firestore
    document.getElementById("fetchUserDataBtn").addEventListener("click", async function () {
        let user = auth.currentUser;
        if (user) {
            try {
                let doc = await db.collection("users").doc(user.uid).get();
                if (doc.exists) {
                    console.log("User Data:", doc.data());
                    alert(`User Data: ${JSON.stringify(doc.data())}`);
                } else {
                    console.log("No user data found.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        } else {
            console.log("No user is logged in.");
        }
    });
});
