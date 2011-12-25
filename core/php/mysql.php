<?php
$db = new mysqli('localhost','root','j03lD13$','zedcraft');
// Create a prepared statement
if(mysqli_connect_errno()) {
	echo "Connection Failed: " . mysqli_connect_errno();
	exit();
}

$sql = "
SELECT
	news.iduser,
	news.header,
	news.summary,
	news.body,
	news.datetime,
	user.iduser,
	user.name,
	user.email
FROM
	news
LEFT JOIN
    user ON user.iduser = news.iduser";

if($stmt = $db->prepare($sql)) {
    /* Bind parameters
       s - string, b - boolean, i - int, etc */
    /*
WHERE
	iduser=?
	$stmt -> bind_param("i", $iduser);
    if (isset($_REQUEST['id']))
    	$iduser=$_REQUEST['id'];
    else
        $iduser = 0;
    */
    $stmt->execute();
    /* Bind results */
    $stmt->bind_result($iduser, $header, $summary, $body, $datetime, $useriduser, $name, $email);
    /* Fetch the value */
    while ($stmt->fetch()){
    	echo $name . "'s email is " . $email;
    }
    /* Close statement */
    $stmt->close();
}

/* Close connection */
$db->close();
/*
if($stmt->prepare("INSERT INTO `table` (`name`, `age`, `bio`) VALUES (?, ?, ?)")) {
	// Bind your variables to replace the ?s
	$stmt->bind_param('sis', $name, $age, $bio);
	
	// Set your variables
	$name = 'John Doe';
	$age = 32;
	$bio = 'Unknown...';
	// Execute query
	$stmt->execute();
	
	// Close statement object
	$stmt->close();
	
}*/

?>