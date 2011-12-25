<?php

include_once('global.php');

global $connHN, $connUN, $connPW, $connDB;
$db = new mysqli($connHN, $connUN, $connPW, $connDB);

if ($db->connect_errno) {
	echo "Connection Failed({$db->connect_errno}): {$db->connect_error}";
	exit();
}

$SQL = "
SELECT
    news.idnews,
	news.iduser,
	news.header,
	news.summary,
	news.body,
	news.datetime,
	users.iduser,
	users.name,
	users.email
FROM
	news
LEFT JOIN
    users ON users.iduser = news.iduser";
if (isset($_REQUEST['newsid']))
	$SQL .= "
WHERE
	news.idnews=?";
elseif (isset($_REQUEST['userid']))
	$SQL .= "
WHERE
	users.iduser=?";

$SQL .= "
ORDER BY
	news.idnews DESC
LIMIT 0, 10";

$stmt = $db->prepare($SQL);

if($stmt) {
    if (isset($_REQUEST['newsid']))
        $id = $_REQUEST['newsid'];
    elseif (isset($_REQUEST['userid']))
        $id = $_REQUEST['userid'];
        
    if (isset($id))
        $stmt->bind_param("i", $id);
    
	$stmt->execute();
	$stmt->bind_result($idnews, $newsiduser, $header, $summary, $body, $datetime, $useriduser, $name, $email);
	while ($stmt->fetch()) {
		echo "                    <article class=\"ui-widget ui-widget-content ui-corner-all\">";
		echo "                        <header class=\"ui-widget-header ui-corner-all\"><h3>{$header}</h3></header>";
		echo "                        <details>";
		echo "                            <summary><big><strong>{$summary}</strong></big></summary>";
		echo "                            <div>{$body}</div>";
		echo "                        </details>";
		echo "						  <footer><small>{$datetime} - <a href=\"mailto:{$email}\">{$name}</a></small></footer>";
		echo "                    </article>";
        /*
		if (!isset($_REQUEST['newsid']) && !isset($_REQUEST['userid']))
			echo "                            <summary>
		<form>
			<input type=\"hidden\" name=\"newsid\" value=\"{$idnews}\" />
			<button class=\"news ui-widget-content\" onclick=\"this.form.submit();\">
				<big>
					<strong>{$summary}</strong>
				</big>
			</button>
		</form></summary>";
		if (isset($_REQUEST['newsid'])) {
			echo "                            <summary><big><strong>{$summary}</strong></big></summary>";
			echo "                            <div>{$body}</div>";
		}
		*/
	}
	$stmt->close();
}
$db->close();
?>