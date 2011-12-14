//
//	Entine Specific Variables 
//
var XMLdoc = new GLGE.Document();
var canvas = document.getElementById("gamewindow");
var gameSize = ({'width': canvas.offsetWidth, 'height': canvas.offsetheight});
var renderer = new GLGE.Renderer(canvas);
var objects = new Array();
	objects['models'] = new Array();
var scene;

//
// Camera Specific Variables 
//
var camera;
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
var mousePos = ({ 'x': 0, 'y': 0 });
var mousePosPrev = ({ 'x': 0, 'y': 0 });
var mouseDirection = ({ 'hoz': 0, 'vert': 0 });
var mouseButtons = ({ 'left': false, 'middle': false, 'right': false });
var mouseDrag = false;

var mouseBumperArea = 25; // Pixel value for the mouse bumper area for start scroll

//
// Keyboard Specific Variables 
//


//
// Player Specific Variables 
//

//
// Misc Specific Variables 
//

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
	line.setMaterial(XMLdoc.getElement("lines"));
	scene.addObject(line);
	delete(line);
};

XMLdoc.onLoad = function(){
	scene = XMLdoc.getElement("mainScene");
	scene.setBackgroundColor('#00A000');
	renderer.setScene(scene);
	renderer.render();
	
	camera = scene.camera;
	cameraMatrix=camera.getViewMatrix();
	cameraOffset = XMLdoc.getElement("cameraOffset");
	cameraOffset.setLocY(60);
	zoom = parseInt(60);
	cameraPos = [parseInt(camera.getLocX()), 60, parseInt(camera.getLocZ())];

	var player = loadCollada('player');
	
	var mouse = new GLGE.MouseInput(canvas);
	//var keys = new GLGE.KeyInput();
	
	
	drawGrid(100);
	
	document.oncontextmenu = function() { return false; };
	canvas.oncontextmenu = function() { return false; };
	
	$('body').children().each(function() {
		console.log($(this));
		$(this).mousedown(function(e){ 
		    if( e.button == 2 ) 
		      return false;
		    return true; 
		  });
	});
	
	canvas.onmousemove = function(e) {
		mousePos = mouse.getMousePosition();
		
		if (mousePos.x - mousePosPrev.x < 0 ) { mouseDirection['hoz'] = -1; } 		// Mouse move Left
		else if (mousePos.x - mousePosPrev.x > 0 ) { mouseDirection['hoz'] = 1; } 	// Mouse move Right
		else { mouseDirection['hoz'] = 0; }
		
		if (mousePos.y - mousePosPrev.y < 0 ) { mouseDirection['vert'] = -1; } 		// Mouse move Up
		else if (mousePos.y - mousePosPrev.y > 0 ) { mouseDirection['vert'] = 1; } 	// Mouse move Down
		else { mouseDirection['vert'] = 0; }
		
		if (mouseDirection['hoz'] != 0) {
			
		}

		if (mousePos.x <= mouseBumperArea) {
			cameraPos[0] -= cameraMatrix[0] * 2;
			//cameraPos[1] -= cameraMatrix[1] * 2;
			cameraPos[2] -= cameraMatrix[2] * 2;
		}
		else if (mousePos.x >= ($('#gamewindow').width() - mouseBumperArea)) {
			cameraPos[0] += cameraMatrix[0] * 2;
			//cameraPos[1] += cameraMatrix[1] * 2;
			cameraPos[2] += cameraMatrix[2] * 2;
		}
		if (mousePos.y <= mouseBumperArea) {
			cameraPos[0] -= cameraMatrix[8] * 2;
			//cameraPos[1] -= cameraMatrix[9] * 2;
			cameraPos[2] -= cameraMatrix[10] * 2;
		}
		else if (mousePos.y >= ($('#gamewindow').height() - mouseBumperArea)) {
			cameraPos[0] += cameraMatrix[8] * 2;
			//cameraPos[1] += cameraMatrix[9] * 2;
			cameraPos[2] += cameraMatrix[10] * 2;
		}

		cameraOffset.setLocX(cameraPos[0]);
		cameraOffset.setLocZ(cameraPos[2]);

		mousePosPrev = mousePos;
	};
	
	/*
	canvas.onmousedown = function(e) {
		e.preventDefault();
		switch (e.button) {
	    	case 0: //left
	    		mouseButtons['left'] = true;
	    		break;
	    	case 1: //middle
	    		mouseButtons['middle'] = true;
	    		break;
	    	case 2: //right
	    		mouseButtons['right'] = true;
	    		break;
	    	default:
	    		break;
		};
	};
	
	canvas.onmouseup = function(e) {
		e.preventDefault();
		switch (e.button) {
	    	case 0: //left
	    		mouseButtons['left'] = false;
	    		break;
	    	case 1: //middle
	    		mouseButtons['middle'] = false;
	    		break;
	    	case 2: //right
	    		mouseButtons['right'] = false;
	    		break;
	    	default:
	    		break;
		};
	};
	*/
	
	canvas.onmousewheel = function(e) {
	    var delta = e.detail ? parseInt(e.detail) / 3 : parseInt(e.wheelDelta) / 300;
	    
	    if (delta != 0) {
	    	var zoom = Math.max(Math.min(parseInt(camera.getFovY()) + delta, 35), 15);
	    	camera.setFovY(zoom);
		}
	};
	canvas.addEventListener('DOMMouseScroll', canvas.onmousewheel, false);
	
	
	canvas.onkeypress
	
	/*
		var mat=camera.getViewMatrix();
		switch(e.keyCode){
			case GLGE.KI_W:
			
			break;
			case GLGE.KI_S:
			
			break;
			case GLGE.KI_D:
			
			break;
			case GLGE.KI_A:
			
			break;
			}
	*/
	
	
	var selectedObject;
	var selectObject = function(obj) {
		var credit = document.getElementById("credit");
		var fc = credit.firstChild;
		if(obj == selectedObject)
			return;
		selectedObject = obj;
		cusrsor.blendTo({
			LocX:obj.getLocX(),
			LocZ:obj.getLocZ()
		}, 1000);
		
		do{
			if (fc.style)
				fc.style.display="none";
		}
		while(fc = fc.nextSibling);
		var credits = document.getElementById(obj.id + "credits");
		if (credits) credits.style.display = "block";
		var anim = document.getElementById("animations");
		while (anim.firstChild.nextSibling.nextSibling) {
			anim.removeChild(anim.firstChild.nextSibling.nextSibling);
		}
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
	}
	//when model loaded get animations
	model.addEventListener("loaded",function(data){
	selectObject(this);
	});
	
	
	var lastPick=null;
	var selectstart=null;
	var picking = function() {
		if (!mousechange)
			return;
		var result = scene.pick(mousePos[0],mousePos[1]);
		if (result && result.object.id) {
			if(!result.object.mat)
				result.object.mat = result.object.getMaterial();
			if(lastPick != result.object) {
				if(lastPick) lastPick.setMaterial(lastPick.mat);
				lastPick = result.object;
				canvas.style.cursor = "pointer";
				result.object.setMaterial(highlight);
			}
		}
		else {
			if(lastPick) lastPick.setMaterial(lastPick.mat);
			lastPick = null;
			canvas.style.cursor="default";
		}
		if(mousestate == 1)
			selectstart = lastPick;
		if(lastPick && mousestate == 0 && selectstart == lastPick)
			selectObject(lastPick);
		mousechange=false;
	};
	
	$(window).resize();
	setInterval(function() {
		var now=+new Date;
		picking();
		renderer.render();
		lasttime=now;
		
		requestAnimationFrame(render);
		
		if ($('#gamewindow').css({'display': 'none'}))
			$('#gamewindow').show();
	}, 16);
	
	requestAnimationFrame(render);
};

XMLdoc.load("res/test/stage.xml");





/* 
RTS Camera Controller
By Wyko ter Haar
Moves the camera within the bounds of the map variables.
An origin point of 0,0 is assumed. 
*/
/*
// The camera bounds
var mapMinX;
var mapMinZ;
var mapMaxX;
var mapMaxZ;

// Zoom limits for the camera
var mapMaxY = 9.5;
var mapMinY = 4;

var scrollArea = 10; // Defines the distance from the edge of the window that mouse scrolling starts
var scrollSpeed = 22; // Defines how fast the window scrolls


// Translates the camera
function moveMe(myDir, mySpeed) {
	
	switch (myDir)
	{
		case ("Left") :
			myVector = (Vector3(mySpeed,0,0) * scrollSpeed * Time.deltaTime);
			break;
			
		case ("Right") : 	
			myVector = (Vector3(mySpeed,0,0) * scrollSpeed * Time.deltaTime);		
			break;
			
		case ("Forwards") : 		
			myVector = (Vector3(0,0,mySpeed) * scrollSpeed * Time.deltaTime);		
			break;
			
		case ("Backwards") : 	
			myVector = (Vector3(0,0,mySpeed) * scrollSpeed * Time.deltaTime);		
			break;
			
		case ("Up") :
			myVector = (Vector3(0,mySpeed,0));		
			break;
		
		case ("Down") :
			myVector = (Vector3(0,mySpeed,0));		
			break;
		
		default : Debug.Log("Can't Move.");
	}
	
	if (InBounds(myVector))
		{transform.Translate(myVector, Space.World);}

		
	
}
	
function Update () {
	
	var mPosX = Input.mousePosition.x;
	var mPosY = Input.mousePosition.y;
	

	// Do camera movement by mouse position
	if (mPosX < scrollArea) {moveMe("Left", -1);}
	if (mPosX >= Screen.width-scrollArea) {moveMe("Right", 1);}
	if (mPosY >= Screen.height-scrollArea) {moveMe("Forwards", 1);}
	if (mPosY < scrollArea) {moveMe("Backwards", -1);} 
	
	// Do camera movement by keyboard
	if (Input.GetAxis("Horizontal") < 0) {moveMe("Left", Input.GetAxis("Horizontal"));}
	if (Input.GetAxis("Horizontal") > 0) {moveMe("Right", Input.GetAxis("Horizontal"));}
	if (Input.GetAxis("Vertical") > 0) {moveMe("Forwards", Input.GetAxis("Vertical"));}
	if (Input.GetAxis("Vertical") < 0) {moveMe("Backwards", Input.GetAxis("Vertical"));}
	
	// Zoom Camera in or out
	if (Input.GetAxis("Mouse ScrollWheel") < 0) {
		moveMe("Up", .2);
	}
	if (Input.GetAxis("Mouse ScrollWheel") > 0) {
		moveMe("Down", -.2);
	}
}

// Checks to see if the camera would be in bounds after the move
// if not, it brings the camera back to the edge of the bounds
function InBounds(vector) {
	var answer = true;
	
	if ((transform.position.x + vector.x) < mapMinX) {
		transform.position.x = mapMinX;
		answer = false;
	}
	if ((transform.position.z + vector.z) < mapMinZ) {
		transform.position.z = mapMinZ;
		answer = false;
	}
	if ((transform.position.x + vector.x) > mapMaxX) {
		transform.position.x = mapMaxX;
		answer = false;
	}
	if ((transform.position.z + vector.z) > mapMaxZ) {
		transform.position.z = mapMaxZ;
		answer = false;
	}
	if ((transform.position.y + vector.y) > mapMaxY) {
		transform.position.y = mapMaxY;
		answer = false;
	}
	
	if ((transform.position.y + vector.y) < mapMinY) {
		transform.position.y = mapMinY;
		answer = false;
	}
	
	return answer;
}
*/