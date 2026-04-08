document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(email && password) {
        alert("Po provohet hyrja për: " + email);
        // Ketu mund te shtohet pjesa e backend-it me vone
    }
});