// app.js - JavaScript Password Forensic Analysis and Terminal Command Logic

// Function to analyze password strength
function analyzePassword(password) {
    const lengthCriteria = password.length >= 8;
    const numberCriteria = /\d/.test(password);
    const uppercaseCriteria = /[A-Z]/.test(password);
    const specialCharCriteria = /[!@#$%^&*]/.test(password);

    return lengthCriteria && numberCriteria && uppercaseCriteria && specialCharCriteria;
}

// Function to simulate terminal command execution
function executeCommand(command) {
    console.log(`Executing command: ${command}`);
    // Simulated responses for common commands
    switch(command) {
        case 'show users':
            return 'Current users: user1, user2, user3';
        case 'check password strength':
            return 'Password strengths: user1: weak, user2: strong, user3: moderate';
        default:
            return 'Command not recognized';
    }
}

// Example usage
const password = "Password123!";
const isStrong = analyzePassword(password);
console.log(`Is the password strong? ${isStrong ? 'Yes' : 'No'}`);

const commandOutput = executeCommand('show users');
console.log(commandOutput);