<?php
session_start();
error_reporting(E_ALL);
ini_set("display_errors", 1);
ini_set("allow_url_include", 1);
if (isset($_SESSION["session"]) && $_SESSION["session"]==true) {
	//$_SESSION["session"]
}
?>
<!DOCTYPE html>
<html>
    <head> 
        <title>ZedCraft</title>
        <link rel="stylesheet" type="text/css" href="core/css/default.css" /> 
        <link type="text/css" href="core/css/trontastic/jquery-ui-1.8.16.custom.css" rel="stylesheet" />
<?php if ($_SERVER["SERVER_NAME"] != "localhost" && $_SERVER["SERVER_NAME"] != "127.0.0.1") { ?>
        <script type="text/javascript">
var _gaq = _gaq || [];_gaq.push(['_setAccount', 'UA-27765967-1']);_gaq.push(['_trackPageview']);(function() {var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);})();
        </script>
<?php } ?>
    </head>
    <body>
        <div id="infopan" >text</div>
        <div id="welcome" class='ui-helper-hidden'>
            Welcome to Zedcraft. An "post apocalyptic zombie" RTS game.<br />
        </div>
        <div id="resources" class="ui-widget-header ui-corner-all toolbar">
            Use the mouse or WSAD keys for camera movement. More functionality coming soon.<br />
            Zoom functionality(mousewheel) is a little buggy but will be fixed soon.
        </div>
        
        <div id="h_unit" class="ui-widget-header ui-corner-all toolbar">
            <div id="h_stance_menu" class="menu ui-widget-header ui-corner-all ui-helper-hidden">
                <button id="h_stance_passive" class="human">Passive</button>
                <button id="h_stance_range" class="human zombie">Ranged</button>
                <button id="h_stance_aggressive" class="human zombie">Aggressive</button>
            </div>
            <div id="h_action_menu" class="noborder menu ui-widget-header ui-corner-all ui-helper-hidden">
                <button id="h_scavenge" class="human civilian chef worker engineer nurse doctor guard cop soldier">Scavenge</button>
                <button id="h_cook" class="human chef">Cook</button>
                <button id="h_const" class="human worker engineer">Construct</button>
                <button id="h_invent" class="human engineer">Invent</button>
                <button id="h_mend" class="human nurse doctor">Mend</button>
                <button id="h_heal" class="human doctor">Heal</button>
                <button id="h_patrol" class="human guard cop soldier">Patrol</button>
                <button id="h_enforce" class="human cop soldier">Enforce</button>
                <button id="h_supression" class="human soldier">Supression</button>
            </div>
            <button id="h_cancel">Cancel</button>
            <button id="h_move">Move</button>
            <button id="h_stance">Stance</button>
            <button id="h_action">Action</button>
        </div>
        <!-- 
        <div id="z_">
            <button id="h_"></button>
        </div>
        
 -->        <!-- <canvas id="minimap"></canvas> -->
        <canvas id="gamewindow"></canvas>
        <script type="application/javascript" src="core/js/jquery.js"></script>
        <script type="application/javascript" src="core/js/jquery.ui.js"></script>
        <script type="application/javascript" src="core/js/jquery.cookie.js"></script>
        <script type="application/javascript" src="core/js/glge.0.8.js"></script>
        <script type="text/javascript" src="core/js/glge.extend.js"></script>
        <script type="text/javascript" src="core/js/zedcraft.js"></script>
        <script type="text/javascript" src="core/js/zcex.js"></script>
        <script type="text/javascript" src="core/js/zcui.js"></script>
    </body>
</html>