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
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    document.getElementById("registerBtn").addEventListener("click", async function () {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        try {
            let userCredential = await auth.createUserWithEmailAndPassword(email, password);
            alert("User registered successfully!");
        } catch (error) {
            alert(error.message);
        }
    });

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
});
