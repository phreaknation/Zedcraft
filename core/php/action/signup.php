<?php
session_start();
error_reporting(E_ALL);
ini_set("display_errors", 1);
ini_set("allow_url_include", 1);
if (isset($_REQUEST['username']) && $_REQUEST['username']!= '') {
	if (isset($_REQUEST['password']) && $_REQUEST['password']!= '') {
		if (isset($_REQUEST['email']) && $_REQUEST['email']!= '') {
			include_once('../ps/adduser.php');
			if (adduser($_REQUEST['username'], $_REQUEST['email'], $_REQUEST['password'])) {
				$_SESSION['username'] = $_REQUEST['username'];
				$_SESSION['password'] = $_REQUEST['password'];
				$_SESSION['email'] = $_REQUEST['email'];
				header('Location: signin.php');
			}
			else
				echo 'Failed: Add User';
		}
		else
			echo 'Failed: Email';
	}
	else
		echo 'Failed: Password';
}
else
	echo 'Failed: Username';
?>