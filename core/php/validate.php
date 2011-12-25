<?php
header("Content-type: text/html; charset=iso-8859-1");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");


if (isset($_REQUEST['username'])) {
    $user = $_REQUEST['username'];
    if (preg_match('/[^a-zA-Z]/', $user)) {
        echo 'true';
    }
    
    $SQL ="
SELECT
	users.name
FROM
	users 
WHERE
    users.name=?";
}
elseif (isset($_REQUEST['email'])) {
    $email = (isset($_REQUEST['email']))? $_REQUEST['email']:'';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo 'true';
    }
    $SQL = "
SELECT
    users.email
FROM
    users
WHERE
    users.email=?";
}
elseif (isset($_REQUEST['password'])) {
    $password = (isset($_REQUEST['password']))? $_REQUEST['password']:'';
    $mask = "/[a-zA-Z0-9!@#$%^&]/";
    $result = preg_replace($mask, '', $password);

    if ($result == "") {
        echo 'false';
        
    }
    echo 'true';
    
}

include_once('global.php');

global $connHN, $connUN, $connPW, $connDB;
$db = new mysqli($connHN, $connUN, $connPW, $connDB);

if ($db->connect_errno) {
	echo "Connection Failed({$db->connect_errno}): {$db->connect_error}";
	exit();
}

$stmt = $db->prepare($SQL);

if ($stmt) {
	if (isset($_REQUEST['username']))
		$stmt->bind_param("s", $user);
    elseif (isset($_REQUEST['email']))
		$stmt->bind_param("s", $email);
	
    $stmt->execute();
    $stmt->store_result();
    echo json_encode((($stmt->num_rows >= 1)? false : true));
	$db->close();
}
else {
    echo 'true';
    $db->close();
}
?>