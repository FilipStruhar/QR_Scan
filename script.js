
// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Initialize the QR scanner
    const qrCodeScanner = new Html5QrcodeScanner("scanner", {
        fps: 10,   // Frames per second to scan
        qrbox: 250 // Size of the scanning box
    });

    // Callback function when QR code is successfully scanned
    function onScanSuccess(decodedText, decodedResult) {
        // Show the result on the webpage
        document.getElementById('result').textContent = `QR Code Scanned: ${decodedText}`;
        // You can also stop the scanner after a successful scan
        qrCodeScanner.clear();
    }

    // Start the QR scanner
    qrCodeScanner.render(onScanSuccess);
});