<?php
function checksignin($username, $password) {
    if (!isset($username) && isset($_REQUEST['username']))
        $username = ($_SESSION['username'])? $_SESSION['username'] : $_REQUEST['username'];
    if (!isset($password) && isset($_REQUEST['password']))
        $password = ($_SESSION['password'])? $_SESSION['password'] : $_REQUEST['password'];
    
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
        passwords.password,
        roles.name
    FROM
        users
    INNER JOIN
        passwords ON (passwords.idpassword = users.idpassword)
    INNER JOIN
        roles ON (roles.idrole = users.idrole)
    WHERE
        LOWER(users.name) = LOWER(?) AND
        passwords.password = ?
    LIMIT 1;";
    
    $stmt = $db->prepare($SQL);

    if ($stmt) {
        $stmt->bind_param("ss", $username, $password);
        $stmt->execute();
        $stmt->bind_result($name, $email, $password, $role);
        $stmt->store_result();
        printf("Number of rows: %d.\n", $stmt->num_rows);
        /*
        while ($stmt->fetch()) {
        	echo $stmt->results;
            //if (!isset($_SESSION['username']) || (isset($_SESSION['username']) && $_SESSION['username'] != $name))
                $_SESSION['username'] = $name;
            //if (!isset($_SESSION['email']) || (isset($_SESSION['email']) && $_SESSION['email'] != $email))
                $_SESSION['email'] = $email;
            //if (!isset($_SESSION['role']) || (isset($_SESSION['role']) && $_SESSION['role'] != $role))
                $_SESSION['role'] = $role;
            //if (!isset($_SESSION['password']) || (isset($_SESSION['password']) && $_SESSION['password'] != $password))
                $_SESSION['password'] = $password;
            $ret = $name;
        }*/
        $stmt->free_result();
        $stmt->close();
    }
    else {
        $db->close();
        return 'false';
    }
    
    $db->close();
    if (isset($ret))
        return 'true';
    else
        return 'false';
}
?>