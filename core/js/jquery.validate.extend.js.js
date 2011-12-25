jQuery.validator.addMethod('usernameCheck', function(username) {
    var postURL = "user/json_username_check";
    $.ajax({
        cache:false,
        async:false,
        type: "POST",
        data: "username=" + username,
        url: postURL,
        success: function(msg) {
            result = (msg=='TRUE') ? true : false;
        }
    });
    return result;
}, '');

jQuery.validator.addMethod('emailCheck', function(email) {
    var postURL = "user/json_email_check";
    $.ajax({
        cache:false,
        async:false,
        type: "POST",
        data: "email=" + email,
        url: postURL,
        success: function(msg) {
            result = (msg=='TRUE') ? true : false;
        }
    });
    return result;
}, '');

// check for unwanted characters
$.validator.addMethod('validChars', function (value) {

    var result = true;
    // unwanted characters
    var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
 
    for (var i = 0; i < value.length; i++) {
        if (iChars.indexOf(value.charAt(i)) != -1) {
            return false;
        }
    }
    return result;
}, '');