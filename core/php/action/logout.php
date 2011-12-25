<?php
session_start();
unset($_SESSION['loggedin']);
unset($_REQUEST['loggedin']);
unset($_COOKIE['loggedin']);
session_destroy();
header('Location: ../../../');
?>