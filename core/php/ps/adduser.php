<?php
include_once('../global.php');

function adduser($username, $email, $password) {
	if (!isset($username) && isset($_REQUEST['username']))
		$username = $_REQUEST['username'];
	if (!isset($email) && isset($_REQUEST['email']))
		$email = $_REQUEST['email'];
	if (!isset($password) && isset($_REQUEST['password']))
		$password = $_REQUEST['password'];
		
	global $connHN, $connUN, $connPW, $connDB, $guestrole;
	$db = new mysqli($connHN, $connUN, $connPW, $connDB);
	
	if (mysqli_connect_errno()) {
		echo "Connection Failed: " . mysqli_connect_errno();
		return false;
	}
	
	$SQL = "
	INSERT INTO
		users(name, email, idrole, password)
	VALUES
		(?, ?, ?, ?);";
	
	$stmt = $db->prepare($SQL);

    if ($stmt) {
		$stmt->bind_param("ssds", $username, $email, $guestrole, $password);
		if ($stmt->execute())
			echo 'true';
		else 
			echo $stmt->error;
		$stmt->close();
		$db->close();
		return true;
	}
	else {
		$db->close();
		return false;
	}
	$db->close();
	return false;
}
?>