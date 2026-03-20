// --- 1. MATRIX RAIN EFFECT ---
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff41";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 50);

// --- 2. BOOT & SYSTEM TIME ---
const bootLines = ["CORE_INIT...", "UPLINK_ESTABLISHED", "DB_CONNECTED", "AVALON_READY"];
let b = 0;
const boot = setInterval(() => {
    document.getElementById('bootText').innerHTML += `<div>[ OK ] ${bootLines[b]}</div>`;
    b++;
    if (b >= bootLines.length) { clearInterval(boot); setTimeout(() => document.getElementById('bootScreen').style.display='none', 800); }
}, 300);

setInterval(() => document.getElementById('clock').innerText = new Date().toLocaleTimeString(), 1000);

// --- 3. TERMINAL ENGINE ---
const terminalContent = document.getElementById('terminalContent');
const terminalInput = document.getElementById('terminalInput');
const miniLog = document.getElementById('miniLog');

function log(text, type = '') {
    const line = document.createElement('div');
    line.innerHTML = `<span style="color: #00ff41">>></span> <span class="${type}">${text}</span>`;
    terminalContent.appendChild(line);
    terminalContent.scrollTop = terminalContent.scrollHeight;
    
    // Add to mini log
    const mLine = document.createElement('div');
    mLine.innerText = `[${new Date().toLocaleTimeString()}] ${text.substring(0, 20)}...`;
    miniLog.prepend(mLine);
}

// --- 4. NEW POWERFUL FEATURES ---
const commands = {
    "help": () => log("AVAIL: STATUS, ENCODE [TXT], DECODE [TXT], CLEAR, SCAN"),
    "status": () => log("SENSORS: NOMINAL | FREQ: 5.4GHz | OPS: 100%", "success"),
    "encode": (val) => log(`B64_RESULT: ${btoa(val)}`, "success"),
    "decode": (val) => { try { log(`TXT_RESULT: ${atob(val)}`, "success"); } catch(e) { log("INVALID_BASE64", "danger"); }},
    "scan": () => {
        log("INITIATING PACKET_SCAN...", "blink");
        setTimeout(() => log("SCAN_COMPLETE: 0 THREATS FOUND.", "success"), 2000);
    },
    "clear": () => terminalContent.innerHTML = ""
};

terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value.trim();
        const [cmd, ...args] = input.split(' ');
        const argStr = args.join(' ');
        terminalInput.value = '';
        log(input.toUpperCase());

        if (commands[cmd.toLowerCase()]) commands[cmd.toLowerCase()](argStr);
        else log("CMD_NOT_FOUND", "danger");
    }
});
