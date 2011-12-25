/*$("#h_unit").dialog({
	'autoOpen': false,
	'position': ['left', 'bottom'],
	'title': 'Interface'
});*/

// Default Menu
$("#h_cancel").button({
	icons: {
		primary: 'ui-icon-close'
	},
	text: false
});

$("#h_move").button({
	icons: {
		primary: 'ui-icon-arrow-4'
	},
	text: false
});

$("#h_stance").button({
	icons: {
		primary: 'ui-icon-arrow-4-diag'
	},
	text: false
}).click(function() {
	$('#h_action_menu').hide();
	$('#h_stance_menu').toggle();
});;

$("#h_action").button({
	icons: {
		primary: 'ui-icon-extlink'
	},
	text: false
}).click(function() {
	$('#h_stance_menu').hide();
	$('#h_action_menu').toggle();
});


//Stance
//<button id="h_stance_passive" class="human">Passive</button>
//<button id="h_stance_range" class="human zombie">Ranged</button>
//<button id="h_stance_aggressive" class="human zombie">Aggressive</button>

$("#h_stance_passive").button({
	icons: {
		primary: 'ui-icon-cart'
	},
	text: false
});

$("#h_stance_range").button({
	icons: {
		primary: 'ui-icon-cart'
	},
	text: false
});

$("#h_stance_aggressive").button({
	icons: {
		primary: 'ui-icon-cart'
	},
	text: false
});

// Human Actiom Menu
//class="human civilian chef worker engineer nurse doctor guard cop soldier">Scavenge</button>
//class="human chef">Cook</button>
//class="human worker engineer">Construct</button>
//class="human engineer">Invent</button>
//class="human nurse doctor">Mend</button>
//class="human doctor">Heal</button>
//class="human guard cop soldier">Patrol</button>
//class="human cop soldier">Enforce</button>
//class="human soldier">Supression</button>

$("#h_scavenge").button({
	icons: {
		primary: 'ui-icon-cart'
	},
	text: false
});

$("#h_cook").button({
	icons: {
		primary: 'ui-icon-heart'
	},
	text: false
});

$("#h_const").button({
	icons: {
		primary: 'ui-icon-radio-on'
	},
	text: false
});

$("#h_invent").button({
	icons: {
		primary: 'ui-icon-radio-on'
	},
	text: false
});

$("#h_mend").button({
	icons: {
		primary: 'ui-icon-radio-on'
	},
	text: false
});

$("#h_heal").button({
	icons: {
		primary: 'ui-icon-radio-on'
	},
	text: false
});

$("#h_patrol").button({
	icons: {
		primary: 'ui-icon-refresh'
	},
	text: false
});

$("#h_enforce").button({
	icons: {
		primary: 'ui-icon-radio-on'
	},
	text: false
});

$("#h_supression").button({
	icons: {
		primary: 'ui-icon-radio-on'
	},
	text: false
});

$('#gamewindow').hover(function() {
	$('#h_action_menu').hide();
	$('#h_stance_menu').hide();
});
if (getCookie('Welcome_Dialog') == null || getCookie('Welcome_Dialog') == false) {
	$("#welcome").dialog({
		'buttons': [{
			'text': "Ok",
	          'click': function() {
	        	  setCookie('Welcome_Dialog', true, 999);
	        	  $("#h_unit").dialog('open');
	        	  $(this).dialog("close");
	    	  }
		}],
		'modal': true,
		'closeOnEscape': true,
		'position': 'center',
		'title': 'Welcome to Zedcraft v0.0.1',
		'open': function(event, ui) {
			$(".ui-dialog-titlebar-close").hide();
		}
	});
}
else {
	console.log(getCookie('Welcome_Dialog'));
}