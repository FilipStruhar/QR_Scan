function qr_scan(caller) {

    document.getElementById('transport_bt').style.display = 'none';
    document.getElementById('airport_bt').style.display = 'none';
    document.getElementById('reader').style.display = 'flex';

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

        //console.log(`${caller}: ${qr_result}`);
        // Send the variable to the PHP script using Fetch API
        fetch('index.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'track_num': qr_result,
                'caller': caller
            })
        })
        .then(response => response.json()) // Convert response to JSON
        .then(data => {
            console.log('Received from PHP:', data);
        })
        .catch((error) => {
            console.error('Fetch Error:', error);
        });
    }
    // Console log error when scanning QR
    function error(err) {
        console.error(err);
    }
    
    // Starts scanner with output either succes or error
    scanner.render(success, error);
}


  
// Wait for the document to fully load
document.addEventListener('DOMContentLoaded', function() {

    const transport_bt = document.getElementById('transport_bt');
    const airport_bt = document.getElementById('airport_bt');

    if (transport_bt) {
        transport_bt.addEventListener('click', function() {
            qr_scan('Transport');
        });
    }
    if (airport_bt) {
        airport_bt.addEventListener('click', function() {
            qr_scan('Airport');
        });
    }
});
  
