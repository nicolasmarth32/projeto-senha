const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}<>?,.";

const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const passwordField = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", () => {
    passwordField.select();
    document.execCommand("copy");
});

function generatePassword() {
    const includeUpper = document.getElementById("uppercase").checked;
    const includeLower = document.getElementById("lowercase").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeSymbols = document.getElementById("symbols").checked;
    const length = parseInt(document.getElementById("length").value);

    let chars = "";
    if (includeUpper) chars += uppercaseChars;
    if (includeLower) chars += lowercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;

    if (chars === "") {
        passwordField.value = "Selecione ao menos 1 opção!";
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    passwordField.value = password;
    checkStrength(password);
}

function checkStrength(password) {
    let score = 0;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (password.length >= 12) score++;

    let strength = ["Muito fraca", "Fraca", "Média", "Forte", "Muito forte", "Excelente"];
    let colors = ["red", "orange", "yellow", "lightgreen", "green", "darkgreen"];

    strengthBar.style.width = ((score / 5) * 100) + "%";
    strengthBar.style.background = colors[score];
    strengthText.textContent = `Segurança: ${strength[score]}`;
}

// Emojis passando pela tela
function createEmoji() {
    const emoji = document.createElement("div");
    emoji.textContent = "🤫";
    emoji.style.position = "absolute";
    emoji.style.left = Math.random() * window.innerWidth + "px";
    emoji.style.top = "-30px";
    emoji.style.fontSize = "24px";
    emoji.style.animation = `fall ${3 + Math.random() * 5}s linear`;
    document.getElementById("emojiContainer").appendChild(emoji);

    setTimeout(() => emoji.remove(), 8000);
}

setInterval(createEmoji, 500);

const style = document.createElement("style");
style.textContent = `
@keyframes fall {
    to {
        transform: translateY(${window.innerHeight + 50}px);
    }
}`;
document.head.appendChild(style);

