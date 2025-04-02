<?php
header('Content-Type: application/json'); // Ensure JSON response

$response = [];

if (isset($_POST['track_num'])) {
    $track_num = htmlspecialchars($_POST['track_num'], ENT_QUOTES, 'UTF-8');
    $response['track_num'] = $track_num;
} else {
    $response['track_num'] = 'No track_num received';
}

if (isset($_POST['caller'])) {
    $caller = htmlspecialchars($_POST['caller'], ENT_QUOTES, 'UTF-8');
    $response['caller'] = $caller;
} else {
    $response['caller'] = 'No caller received';
}

echo json_encode($response); // Return JSON to JavaScript
exit;
?>