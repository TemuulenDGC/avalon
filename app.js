const terminalInput = document.getElementById('terminalInput');
const terminalContent = document.getElementById('terminalContent');
const cpuBar = document.getElementById('cpuBar');
const netBar = document.getElementById('netBar');

// --- HELPER: ADD LINE ---
function log(text, type = '') {
    const line = document.createElement('div');
    line.className = `line ${type}`;
    line.innerHTML = `>> ${text}`;
    terminalContent.appendChild(line);
    terminalContent.scrollTop = terminalContent.scrollHeight;
}

// --- SYSTEM SIMULATION ---
setInterval(() => {
    const cpu = Math.floor(Math.random() * 40) + 20;
    const net = Math.floor(Math.random() * 60) + 5;
    cpuBar.style.width = cpu + "%";
    netBar.style.width = net + "%";
}, 2000);

// --- PASSWORD ANALYSIS LOGIC ---
function analyze(pass) {
    if (!pass) return log("ERROR: NO STRING PROVIDED", "error");
    
    let entropy = pass.length * 4; // Simple simulation logic
    log(`ANALYZING STRING: [${pass}]...`);
    
    setTimeout(() => {
        log(`RESULT: ENTROPY ${entropy} BITS`, "success");
        if (entropy < 30) log("VERDICT: CRITICAL VULNERABILITY", "error");
        else log("VERDICT: ASSET SECURE", "success");
    }, 800);
}

// --- COMMAND HANDLER ---
terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value.trim();
        const [cmd, arg] = input.split(' ');
        terminalInput.value = '';

        log(input.toUpperCase());

        switch(cmd.toLowerCase()) {
            case 'help':
                log("COMMANDS: STATUS, ANALYZE [PASS], CLEAR, ABOUT");
                break;
            case 'status':
                log("SYSTEMS: NOMINAL | OPERATOR: JUNIOR SERGEANT");
                break;
            case 'analyze':
                analyze(arg);
                break;
            case 'clear':
                terminalContent.innerHTML = '';
                break;
            case 'about':
                log("AVALON TERMINAL v2.1 // BUILT FOR FORENSIC OPS");
                break;
            default:
                log("COMMAND NOT RECOGNIZED", "error");
        }
    }
});
