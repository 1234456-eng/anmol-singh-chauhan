function togglePassword() {
    let passField = document.getElementById("password");
    let icon = document.getElementById("eyeIcon");

    if (passField.type === "password") {
        passField.type = "text";
        icon.innerText = "🙈";
    } else {
        passField.type = "password";
        icon.innerText = "👁";
    }
}

function generatePassword() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let pass = "";

    for (let i = 0; i < 12; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }

    document.getElementById("password").value = pass;
}

function checkStrength() {
    let password = document.getElementById("password").value;
    let strength = "Weak";

    if (password.length >= 8) strength = "Medium";

    if (
        password.match(/[A-Z]/) &&
        password.match(/[0-9]/) &&
        password.match(/[@$!%*?&]/)
    ) {
        strength = "Strong";
    }

    document.getElementById("strength").innerText = "Strength: " + strength;
}




function loadPasswords() {
    fetch('/get')
    .then(res => res.json())
    .then(data => {
        let list = document.getElementById("list");
        list.innerHTML = "";

        data.forEach(item => {
            let li = document.createElement("li");
            li.textContent = item.website + " | " + item.username;
            list.appendChild(li);
        });
    });
}

loadPasswords();