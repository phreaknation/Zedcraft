<?php
header("Content-type: text/html; charset=iso-8859-1");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");

include_once('global.php');

global $connHN, $connUN, $connPW, $connDB;
$db = new mysqli($connHN, $connUN, $connPW, $connDB);

if ($db->connect_errno) {
	echo "Connection Failed({$db->connect_errno}): {$db->connect_error}";
	exit();
}

$SQL = "";

$stmt = $db->prepare($SQL);

if ($stmt) {
	while ($col = $stmt->fetch_row()) {
		echo $col[0];
	}
	$stmt->close();
}
$db->close();
?>