                        <form id="signin" method="post" autocomplete="on">
			                <div class="holding">
		                        <input type="text" name="username" id="usernamesignin" />
		                        <!-- <label for="username" class="holder">Username</label> -->
		                    </div>
	                        <div class="clear"></div>
	                        <div class="holding">
	                            <input type="hidden" name="password" id="passwordsignin" />
                                <input type="password" name="vispassword" id="vispasswordsignin" />
	                            <!-- <label for="password" class="holder">Password</label> -->
	                        </div>
	                        <div class="clear"></div>
			                <button id="signinsubmit" class="submit" type="submit" formmethod="post" formaction="core/php/action/signin.php">Sign In</button>
                        </form>
                        <script type="text/javascript" language="javascript">
                    $(document).ready(function() {
                        $('form#signin input#vispasswordsignin').keyup(function() {
                            $("form#signin input#passwordsignin").val($().crypt({ method: "md5", source: $('form#signin input#vispasswordsignin').val()}));
                        });
                            validate_signup = $("form#signin").validate({
                                rules: {
                                    username: {
                                        required: true,
                                        minlength: 6,
                                        maxlength: 32
                                    },
                                    vispassword: {
                                        required: true,
                                        minlength: 5,
                                        maxlength: 32
                                    }
                                },
                                messages: {
                                    username: {
                                        required: "Username field is required.",
                                        minlength: jQuery.format("Username must be {0}<br /> characters or more."),
                                        maxlength: jQuery.format("Username must be no<br /> longer than {0} characters.")
                                    },
                                    vispassword: {
                                        required: "Password field is required.",
                                        minlength: "Password must be {0}<br />characters or more.",
                                        maxlength: jQuery.format("Password must be no<br />longer than {0} characters.")
                                    }
                                }
                            });
                    });
                    </script>