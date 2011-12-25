<?php
session_start();
error_reporting(E_ALL);
ini_set("display_errors", 1);
ini_set("allow_url_include", 1);
?>
<!DOCTYPE html>
<html itemscope itemtype="http://schema.org/CreativeWork">
    <head>
        <title>ZedCraft</title>
        <meta itemprop="name" content="Zedcraft">
        <meta itemprop="description" content="A game under development of which is an post apocalyptic zombie RTS styled game.">
        <!-- <link rel="stylesheet" type="text/css" href="core/css/960/reset_rtl.css" /> -->
        <!-- <link rel="stylesheet" type="text/css" href="core/css/960/text_rtl.css" /> -->
        <link rel="stylesheet" type="text/css" href="core/css/960/960.css" />
        <link rel="stylesheet" type="text/css" href="core/css/default.css" />
        <link rel="stylesheet" type="text/css" href="core/css/zedcraft/jquery-ui-1.8.16.custom.css" rel="stylesheet" />
        <script type="application/javascript" src="core/js/jquery.js"></script>
        <script type="application/javascript" src="core/js/jquery.ui.js"></script>
        <script type="application/javascript" src="core/js/jquery.validate.js"></script>
        <script type="application/javascript" src="core/js/jquery.crypt.js"></script>   
        <!--[if lt IE 9]>
        <script>
            document.createElement("header" );
            document.createElement("footer" );
            document.createElement("section"); 
            document.createElement("aside"  );
            document.createElement("nav"    );
            document.createElement("article"); 
            document.createElement("hgroup" ); 
            document.createElement("time"   );
        </script>
        <noscript>
         <strong>Warning !</strong>
         Because your browser does not support HTML5, some elements are simulated using JScript.
         Unfortunately your browser has disabled scripting. Please enable it in order to display this page.
        </noscript>
        <![endif]-->
<?php if ($_SERVER["SERVER_NAME"] != "localhost" && $_SERVER["SERVER_NAME"] != "127.0.0.1") { ?>
        <script type="text/javascript">
(function() {var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;po.src = 'https://apis.google.com/js/plusone.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);})();
        </script>
        <script type="text/javascript">
var _gaq = _gaq || [];_gaq.push(['_setAccount', 'UA-27765967-1']);_gaq.push(['_trackPageview']);(function() {var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);})();
        </script>
<?php } ?>
    </head>
    <body>
        <div class="container_16">
            <header id="header">
                <div id="title" class="grid_6">
                    <h1><a href="." title="Welcome to Zedcraft">Zedcraft</a></h1>
                    <div class="g-plusone" data-size="small" data-href="http://www.phreak-nation.com/zedcraft/"></div>
                    <a class="censorship" href="http://americancensorship.org" target="_blank" onclick="$(this).hide();"></a>
                </div>
                <div class="totalheight grid_2">
                    &nbsp;
                </div>
                <div class="grid_8">
	                <nav class="ui-widget-header ui-corner-all">
	                    <button onclick="window.location='.';">News</button>
                        <button class="" type="submit">Test Demo</button>
                        <?php /*if (isset($_SESSION['loggedin']) && ($_SESSION['loggedin'] == true && isset($_SESSION['username']) && isset($_SESSION['password']))) { ?>
                        <!-- <button onclick="">test</button> -->
	                    <button class="usermenu"><?php echo $_SESSION['username'] ?></button>
                    	<div id="signindropdown" class="toolbar ui-widget-content ui-corner-all ui-helper-hidden">
							<?php include_once('core/php/form/useraccount.php'); ?>
                        </div>
	                    <?php } else { ?>
                    	<button class="login">Login</button>
                    	<div id="signindropdown" class="toolbar ui-widget-content ui-corner-all ui-helper-hidden">
							<?php include_once('core/php/form/signin.php'); ?>
                        </div>
	                    <?php }*/ ?>
	                </nav>
                </div>
            </header>
            <div class="clear"></div>
            <section>
                <div class="grid_12">
                	<?php include_once('core/php/news.php'); ?>
                </div>
                <div class="grid_4">
              		<?php /*if (isset($_SESSION['loggedin']) && ($_SESSION['loggedin'] == true && isset($_SESSION['username']) && isset($_SESSION['password']))) { ?>
              		<?php } else { ?>
              			<?php include_once('core/php/form/signup.php'); ?>
                    <?php }*/ ?>
                </div>
            </section>
            <div class="clear"></div>
            <footer class="center">
                <small>site design &amp; logo &copy; 2011 Phreak Nation</small>
            </footer>
        </div>
        <script type="text/javascript">
        $("button").each(function() {
            if ($(this).attr('class') != "news" && $(this).attr('class') != "usermenu")
                $(this).button();
            else if ($(this).attr('class') == "usermenu") {
            	$(this).button({
            		text: true,
					icons: {
						secondary: "ui-icon-triangle-1-s"
					}
            	}).click(function() {
                    $("#signindropdown").toggle();
                    
                });;
            }
        });
        $("form .holding input").addClass('ui-widget ui-widget-content ui-corner-all');
        $("form .holding .holder").each(function() {
        	if ($(this).prev().val() != "")
                $(this).hide();
        	$(this).click(function(e) {
            	$(e.target).prev().focus();
            });
        });
        $("form .holding input").each(function() {
        	if ($(this).val() != "")
            	$(this).next().hide();
            else
            	$(this).next().show();

            $(this).click(function() {
            	if ($(this).val() != "")
                	$(this).next().hide();
                else
                	$(this).next().show();
            }).keyup(function() {
                if ($(this).val() != "")
                	$(this).next().hide();
                else
                	$(this).next().show();
            }).blur(function() {
                if ($(this).val() != "")
                    $(this).next().hide();
                else
                    $(this).next().show();
            });
        });
        $("#progressbar").progressbar({
            value: 37
        });
        $(document).mouseup(function(e) {
            if($(e.target) != $("button.login")) {
            	$("#signindropdown").hide();
            }
        });
        
        $("button.login").click(function() {
        	$("#signindropdown").toggle();
            
        });
        $("#signindropdown").blur(function() {
            $(this).hide();
        }).mouseup(function() { return false; });

        
<?php 
if(!isset($_SESSION)) {
    //First time visit
}
?>
        </script>
        <script type="text/javascript">!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
    </body>
</html>