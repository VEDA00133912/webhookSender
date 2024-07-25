// script.js
async function sendWebhook() {
    const url = document.getElementById('webhookURL').value;
    const content = document.getElementById('messageContent').value;
    const count = parseInt(document.getElementById('sendCount').value);
    const name = document.getElementById('webhookName').value;
    const log = document.getElementById('log');

    log.innerHTML = '<h2>Send Log</h2>';

    const logEntry = (message, isSuccess) => {
        const entry = document.createElement('div');
        entry.className = `log-entry ${isSuccess ? 'success' : 'failure'}`;
        entry.textContent = message;
        log.appendChild(entry);
    };

    const payload = JSON.stringify({ username: name, content: content });

    for (let i = 0; i < count; i++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: payload
            });

            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            logEntry(`✓ Message ${i + 1} sent successfully`, true);
        } catch (error) {
            logEntry(`× Failed to send message ${i + 1}: ${error}`, false);
        }
    }
}
