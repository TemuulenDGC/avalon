const terminalInput = document.getElementById('terminalInput');
const terminalContent = document.getElementById('terminalContent');
const bootScreen = document.getElementById('bootScreen');
const bootText = document.getElementById('bootText');

// --- 1. BOOT SEQUENCE ---
const bootLines = [
    "INITIALIZING AVALON_OS...",
    "LOADING KERNEL MODULES...",
    "ESTABLISHING SECURE UPLINK...",
    "CHECKING OPERATOR CREDENTIALS...",
    "RANK: JUNIOR SERGEANT VERIFIED.",
    "ACCESS GRANTED."
];

let i = 0;
const bootInterval = setInterval(() => {
    bootText.innerHTML += `<div>[ OK ] ${bootLines[i]}</div>`;
    i++;
    if (i >= bootLines.length) {
        clearInterval(bootInterval);
        setTimeout(() => bootScreen.style.display = 'none', 1000);
    }
}, 400);

// --- 2. LIVE CLOCK ---
setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString();
}, 1000);

// --- 3. TERMINAL LOGIC ---
function log(text, type = '') {
    const line = document.createElement('div');
    line.style.marginBottom = "5px";
    line.innerHTML = `<span style="color: #00ff41">>></span> <span class="${type}">${text}</span>`;
    terminalContent.appendChild(line);
    terminalContent.scrollTop = terminalContent.scrollHeight;
}

// --- 4. SYSTEM METRICS SIMULATION ---
setInterval(() => {
    document.getElementById('tempBar').style.width = (Math.random() * 20 + 50) + "%";
    document.getElementById('netBar').style.width = (Math.random() * 30 + 60) + "%";
    document.getElementById('ramBar').style.width = (Math.random() * 10 + 20) + "%";
}, 3000);

// --- 5. COMMANDS ---
terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const val = terminalInput.value.trim();
        const [cmd, ...args] = val.split(' ');
        terminalInput.value = '';

        log(val.toUpperCase(), 'user-cmd');

        switch(cmd.toLowerCase()) {
            case 'help':
                log("AVAILABLE: STATUS, ANALYZE [STRING], CLEAR, PROTOCOL");
                break;
            case 'status':
                log("NODE_01: ACTIVE | ENCRYPTION: AES-256 | LATENCY: 14MS");
                break;
            case 'protocol':
                log("INITIATING DEFENSE PROTOCOL 07...", "warning");
                setTimeout(() => log("PROTOCOL 07: SYSTEM HARDENED.", "success"), 1500);
                break;
            case 'clear':
                terminalContent.innerHTML = '';
                break;
            default:
                log("UNKNOWN_COMMAND: ACCESS_DENIED", "error");
        }
    }
});
