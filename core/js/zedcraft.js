//
//	Engine Specific Variables 
//
var XMLdoc = new GLGE.Document();
var canvas = document.getElementById("gamewindow");
var gameSize = ({'width': parseInt(canvas.offsetWidth), 'height': parseInt(canvas.offsetHeight) });
var renderer = new GLGE.Renderer(canvas);
var objects = new Array();
	objects['models'] = new Array();
	objects['cameras'] = new Array();
var scene;

//
// Camera Specific Variables 
//
var cameraMatrix;
var cameraModes = ({
	0: "God View",		// Similar to Sim games and strategy.
	1: "First Person",	// Similar to Shooters.
	2: "Action View",	// Over the shoulder view. Similar to Gears of War.
	4: "Third Person"	// Similar to action games like Tomb Raider.
});
var cameraPos = [0,0,0];
//
// Mouse Specific Variables 
//
var mouseEnabled = false;
var mousePos = ({ 'x': 32, 'y': 32 });
var mousePosPrev =  ({ 'x': 32, 'y': 32 });
var mouseDirection = ({ 'hoz': 0, 'vert': 0 });
var mouseButtons = new Array();
var mouseWheel = 0;
var mouseDrag = false;
var mouseBumperArea = 25; // Pixel value for the mouse bumper area for start scroll

//
// Keyboard Specific Variables 
//
var keyboard = new Array();

//
// Game Specific Variables 
//
var selectedObject = null;
var lastPick = null;
var selectstart = null;
//
// Misc Specific Variables 
//
var debug = '';


$(window).resize(function() {
	$('#gamewindow').attr({
    	'height': $(window).height(),
    	'width': $(window).width()	
    });
});

var lookAt = function(origin, point) {
	var coord = [origin[0] - point[0], origin[1] - point[1], origin[2] - point[2]];
	var zvec = GLGE.toUnitVec3(coord);
	var xvec = GLGE.toUnitVec3(GLGE.crossVec3([0, 1, 0], zvec));
	var yvec = GLGE.toUnitVec3(GLGE.crossVec3(zvec, xvec));		
	return [xvec[0], yvec[0], zvec[0], 0,
					xvec[1], yvec[1], zvec[1], 0,
					xvec[2], yvec[2], zvec[2], 0,
					0, 0, 0, 1];
};

var loadCollada = function(dae) {
    objects['models'][dae] = new GLGE.Collada;
	objects['models'][dae].setName(dae);
	objects['models'][dae].setDocument("http://localhost/zedcraft/models/" + dae + "/" + dae + ".dae");
	scene.addCollada(objects['models'][dae]);
	return objects['models'][dae];
};

var drawGrid = function(size) {
	//draw grid
	var positions = [];
	for (var x =- size; x < size; x++) {
		if (x!=0) {
			positions.push(x);
			positions.push(0);
			positions.push(-size);
			
			positions.push(x);
			positions.push(0);
			positions.push(size);
			
			positions.push(size);
			positions.push(0);
			positions.push(x);
			
			positions.push(-size);
			positions.push(0);
			positions.push(x);
		}
	}
	
	var line = (new GLGE.Object).setDrawType(GLGE.DRAW_LINES);
	line.setMesh((new GLGE.Mesh).setPositions(positions));
	line.setPickable(false);
	line.setMaterial(XMLdoc.getElement("lines"));
	scene.addObject(line);
	delete(line);
};

XMLdoc.onLoad = function() {
	scene = XMLdoc.getElement("mainScene");
	renderer.setScene(scene);
	renderer.render();
	
	objects['cameras']['mainCamera'] = scene.camera;
	cameraMatrix = objects['cameras']['mainCamera'].getViewMatrix();
	cameraOffset = XMLdoc.getElement("cameraOffset");
	cameraOffset.setLocY(60);
	zoom = parseInt(60);
	cameraPos = [parseInt(objects['cameras']['mainCamera'].getLocX()), 60, parseInt(objects['cameras']['mainCamera'].getLocZ())];
	
	
	var soldier1 = XMLdoc.getElement("soldier1");
	var highlight = XMLdoc.getElement("highlight");
	var cusrsor = XMLdoc.getElement("cusrsor");
	
	var mouse = new GLGE.MouseInput(canvas);
	var keys = new GLGE.KeyInput();
	
	drawGrid(100);
	
	document.oncontextmenu = function() { return false; };
	canvas.oncontextmenu = function() { return false; };
	
	$('body').children().each(function() {
		$(this).mousedown(function(e) {
		    if(e.button == 2)
		    	return false;
	    	return true; 
		});
	});
	
	document.onkeydown = function(e) {
		var charCode = (e.which) ? e.which : e.keyCode;
		keyboard[charCode] = true;
	};
	
	document.onkeyup = function(e) {
		var charCode = (e.which) ? e.which : e.keyCode;
		keyboard[charCode] = false;
	};
	
	canvas.onmousedown = function(e) {
		e.preventDefault();
		mouseButtons[e.button] = true;
	};
	
	canvas.onmouseup = function(e) {
		e.preventDefault();
		mouseButtons[e.button] = false;
	};
	
	canvas.onmousemove = function(e) {
		mousePos = mouse.getMousePosition();
	};
	
	canvas.onmouseover = function() {
		mouseEnabled = true;
	};
	
	canvas.onmouseout = function() {
		mouseEnabled = false;
	};
	
	canvas.onmousewheel = function(e) {
	    mouseWheel = (e.detail) ? parseInt(e.detail) / 3 : parseInt(e.wheelDelta) / 300;
	};
	canvas.addEventListener('DOMMouseScroll', canvas.onmousewheel, false);
	
	function mouseCheck() {
		if (!mouseEnabled)
			return;
		// ------------------------------------------------------ Mouse Buttons ------------------------------------------------------
		for (button in mouseButtons) {
			if (mouse.isButtonDown(button))
				debug += 'Mouse Button ' + button + ': ' + mouse.isButtonDown(button) + '<br />';
				if (lastPick && mouse.isButtonDown(0)==0 && selectstart==lastPick)
					selectObject(lastPick);
		}
		
		// -------------------------------------------------------- Mouse Wheel --------------------------------------------------------
		if (mouseWheel != 0) {
			debug += 'Mouse Wheel : ' + mouseWheel + '<br />';
	    	var zoom = Math.max(Math.min(parseInt(objects['cameras']['mainCamera'].getFovY()) + mouseWheel, 35), 15);
	    	objects['cameras']['mainCamera'].setFovY(zoom);
		}
		
		// ------------------------------------------------------- Mouse X Axis -------------------------------------------------------
		if (mousePos['x'] - mousePosPrev.x < 0 ) { mouseDirection['hoz'] = -1; } 		// Mouse move Left
		else if (mousePos['x'] - mousePosPrev.x > 0 ) { mouseDirection['hoz'] = 1; } 	// Mouse move Right
		else { mouseDirection['hoz'] = 0; }

		if (mousePos['x'] <= mouseBumperArea) {
			cameraPos[0] -= cameraMatrix[0] * 1;
			//cameraPos[1] -= cameraMatrix[1] * 2;
			cameraPos[2] -= cameraMatrix[2] * 1;
		}
		else if (mousePos['x'] >= ($('#gamewindow').width() - mouseBumperArea)) {
			cameraPos[0] += cameraMatrix[0] * 1;
			//cameraPos[1] += cameraMatrix[1] * 2;
			cameraPos[2] += cameraMatrix[2] * 1;
		}
		
		// ------------------------------------------------------- Mouse Y Axis -------------------------------------------------------
		if (mousePos['y'] - mousePosPrev.y < 0 ) { mouseDirection['vert'] = -1; } 		// Mouse move Up
		else if (mousePos['y'] - mousePosPrev.y > 0 ) { mouseDirection['vert'] = 1; } 	// Mouse move Down
		else { mouseDirection['vert'] = 0; }
		if (mousePos['y'] <= mouseBumperArea) {
			cameraPos[0] -= cameraMatrix[8] * 2;
			//cameraPos[1] -= cameraMatrix[9] * 2;
			cameraPos[2] -= cameraMatrix[10] * 2;
		}
		else if (mousePos['y'] >= ($('#gamewindow').height() - mouseBumperArea)) {
			cameraPos[0] += cameraMatrix[8] * 2;
			//cameraPos[1] += cameraMatrix[9] * 2;
			cameraPos[2] += cameraMatrix[10] * 2;
		}
		

		// ---------------------------------------------- Update Mouse Position ----------------------------------------------
		if (mouseEnabled) {
			debug += 'Mouse Axis : ' + mousePos['x'] + ', ' + mousePos['y'] + '<br />';
			cameraOffset.setLocX(cameraPos[0]);
			cameraOffset.setLocZ(cameraPos[2]);
			if (mousePosPrev != mousePos) {
				mousePosPrev = mousePos;
			}
		}
	};
	
	function keyboardCheck() {
		for (key in keyboard) {
			if (keys.isKeyPressed(key)) {
				if (key==GLGE.KI_W) {
					cameraPos[0] -= cameraMatrix[8] * 1;
					//cameraPos[1] -= cameraMatrix[9] * 1;
					cameraPos[2] -= cameraMatrix[10] * 1;
				}
				if (key==GLGE.KI_S) {
					cameraPos[0] += cameraMatrix[8] * 1;
					//cameraPos[1] += cameraMatrix[9] * 1;
					cameraPos[2] += cameraMatrix[10] * 1;
				}
				if (key==GLGE.KI_A) {
					cameraPos[0] -= cameraMatrix[0] * 1;
					//cameraPos[1] -= cameraMatrix[1] * 1;
					cameraPos[2] -= cameraMatrix[2] * 1;
				}
				if (key==GLGE.KI_D) {
					cameraPos[0] += cameraMatrix[0] * 1;
					//cameraPos[1] += cameraMatrix[1] * 1;
					cameraPos[2] += cameraMatrix[2] * 1;
				}
				debug += 'Keyboard Input' + key + ': ' + keys.isKeyPressed(key) + '<br />';
				cameraOffset.setLocX(cameraPos[0]);
				cameraOffset.setLocZ(cameraPos[2]);
			}
		}
	};
	
	function picking() {
		if (!mouseEnabled)
			return;
		
		/*
		if (mousePos['x'] && mousePos['y']) {
			var obj = scene.pick(mousePos['x'],mousePos['y']);
			if (obj && obj != selectedObject) {
				if (obj.getId() && obj.getId() != "wallobject") {
					obj.oldmaterial = obj.getMaterial();
					obj.setMaterial(highlight);
				}
				if (selectedObject && selectedObject.getId() != "wallobject")
					selectedObject.setMaterial(selectedObject.oldmaterial);
				selectedObject = obj;
			}
		}
		*/
		/*
		var result = scene.pick(mousePos['x'], mousePos['y']);
		if (result && result.object.id) {
			if (!result.object.mat)
				result.object.mat = result.object.getMaterial();
			
			if (lastPick != result.object) {
				if (lastPick) lastPick.setMaterial(lastPick.mat);
				lastPick = result.object;
				canvas.style.cursor = "pointer";
				result.object.setMaterial(highlight);
			}
			
		}
		else if (result && result.object) {
			console.log(result.object);
			if (!result.object.mat)
				result.object.mat = result.object.getMaterial();
			
			if (lastPick != result.object) {
				if (lastPick) lastPick.setMaterial(lastPick.mat);
				lastPick = result.object;
				canvas.style.cursor = "pointer";
				result.object.setMaterial(highlight);
			}
		}
		else {
			if (lastPick) lastPick.setMaterial(lastPick.mat);
			lastPick = null;
			canvas.style.cursor="default";
		}
		
		selectstart = lastPick;
		*/
	};
	
	function selectObject(obj) {
		if(obj == selectedObject)
			return;
		selectedObject = obj;
		cusrsor.blendTo({
			LocX:obj.getLocX(),
			LocZ:obj.getLocZ()
		}, 200);
		/*
		var animations = obj.getAnimations();
		for (var i = 0; i < animations.length; i++){
			var ele = document.createElement("div");
			ele.innerHTML=animations[i];
			var that=obj;
			ele.onmousedown=function(){
				that.setMD2Animation(this.innerHTML);
			};
			anim.appendChild(ele);
		}
		*/
	};
	
	//when model loaded get animations
	
	soldier1.addEventListener("loaded",function(data){
		selectObject(this);
	});
	
	
	$(window).resize();

	setInterval(function() {
		var now=+new Date;
		keyboardCheck();
		mouseCheck();
		picking();
		renderer.render();
		if (debug != '' && debug != $('#infopan').text()) {
			$('#infopan').html(debug);
		}
		debug = '';
		lasttime=now;
		
		//requestAnimationFrame(render);
		
		if ($('#gamewindow').css({'display': 'none'}))
			$('#gamewindow').show();
	}, 16);
	
	//requestAnimationFrame(render);
};

XMLdoc.load("res/test/stage.xml");