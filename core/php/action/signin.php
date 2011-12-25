<?php
session_start();
if (isset($_REQUEST['username']) && (!isset($_SESSION['username']) || $_REQUEST['username'] != $_SESSION['username']))
	$_SESSION['username'] = $_REQUEST['username'];
if (isset($_REQUEST['password']) && (!isset($_SESSION['password']) || $_REQUEST['password'] != $_SESSION['password']))
	$_SESSION['password'] = $_REQUEST['password'];
if (isset($_REQUEST['email']) && (!isset($_SESSION['email']) || $_REQUEST['email'] != $_SESSION['email']))
	$_SESSION['email'] = $_REQUEST['email'];
include_once('../ps/ps.php');
include_once('../ps/checksignin.php');
if (checksignin($_SESSION['username'], $_SESSION['password'])) {
	$_SESSION['loggedin'] = true;
	header('Location: ../../../');
	
}
?>