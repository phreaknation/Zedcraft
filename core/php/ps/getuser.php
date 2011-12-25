<?php
function getuser($username) {
	if (!isset($username) && isset($_REQUEST['username']))
		$username = $_REQUEST['username'];
	
	global $connHN, $connUN, $connPW, $connDB;
	$db = new mysqli($connHN, $connUN, $connPW, $connDB);
	
	if (mysqli_connect_errno()) {
		echo "Connection Failed: " . mysqli_connect_errno();
		return false;
	}
	
	$SQL = "
	SELECT
		users.name,
		users.email,
		roles.name
	FROM
		users
	JOIN
		roles ON roles.idroles = users.idroles 
	WHERE
    	users.name=?
	LIMIT 1";
	
	$stmt = $db->prepare($SQL);

    if ($stmt) {
		$stmt->bind_param("s", $username);
		$stmt->execute();
		$stmt->bind_result($name, $email, $role);
		while ($stmt->fetch()) {
			$_SESSION['username'] = $name;
			$_SESSION['email'] = $email;
			$_SESSION['role'] = $role;
			$ret = $name;
		}
		$stmt->close();
	}
	else {
		$db->close();
		return false;
	}
	
	$db->close();
	return $ret;
}
?>