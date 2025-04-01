
const scanner = new Html5QrcodeScanner('reader', { 
    // Scanner will be initialized in DOM inside element with id of 'reader'
    qrbox: {
        width: 250,
        height: 250,
    },  // Sets dimensions of scanning box (set relative to reader element width)
    fps: 20, // Frames per second to attempt a scan
});

// On success show value in #result and clean the screen
function success(qr_result) {
    document.getElementById('result').innerHTML = `
    <h2>Success!</h2>
    <p><a href="${qr_result}">${qr_result}</a></p>
    `;

    scanner.clear();
    document.getElementById('reader').remove();
    document.getElementById('result').style.display = 'flex';
}
// Console log error when scanning QR
function error(err) {
    console.error(err);
}

// Starts scanner with output either succes or error
scanner.render(success, error);