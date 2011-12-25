                    <form id="signup" autocomplete="on">
                        <div class="holding">
                            <input type="text" name="username" id="usernamesignup" />
                            <!-- <label for="username" class="holder">Username</label> -->
                        </div>
                        <div class="clear"></div>
                        <div class="holding">
                            <input type="hidden" name="password" id="passwordsignup" />
                            <input type="password" name="vispassword" id="vispasswordsignup" />
                            <!-- <label for="password" class="holder">Password</label> -->
                        </div>
                        <div class="clear"></div>
                        <div class="holding">
                            <input type="text" name="email" id="emailsignup" />
                            <!-- <label for="email" class="holder">Email</label> -->
                        </div>
                        <button id="signupsubmit" class="submit" type="submit" formmethod="post" formaction="core/php/action/signup.php">Sign Up!</button>
                    </form>
                    <script type="text/javascript">
                    $(document).ready(function() {
                        $('form#signup input#vispasswordsignup').keyup(function() {
                            if ($('form#signup input#vispasswordsignup').val())
                                $("form#signup input#passwordsignup").val($().crypt({ method: "md5", source: $('form#signup input#vispasswordsignup').val()}))
                            console.log($("form#signup input#passwordsignup").val());
                        });
                        // validate signup form on keyup and submit
                        validate_signup = $("form#signup").validate({
                            onkeyup: false,
                            rules: {
                                username: {
                                    required: true,
                                    remote: "core/php/validate.php"
                                },
                                vispassword: {
                                    required: true,
                                    remote: "core/php/validate.php"
                                },
                                email: {
                                    required: true,
                                    remote: "core/php/validate.php"
                                }
                            },
                            messages: {
                                username: {
                                    required: "Username field is required.",
                                    remote: $.format("{0} is already in use.")
                                },
                                vispassword: {
                                    required: "Password field is required.",
                                    remote: $.format("Password must be letter, numbers, and contain any symbol(@!#$%&*^).")
                                },
                                email: {
                                    required: "Email field is required.",
                                    remote: $.format("{0} is already registered.")
                                }
                            }
                        });
                    });
                    </script>