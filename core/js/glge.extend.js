if (typeof WebGLFloatArray === 'undefined') var WebGLFloatArray = Float32Array;

GLGE.Vec2 = function(x, y) {
    return [x,y];
}

GLGE.ValidMatrix=function(array) {
	if (array instanceof Array) {
	    if (array.length == 16) {
	    	for (var i = 0; i < 16; i++) {
	    		if (isNaN(array[i])) return false;
	      	}
	      	return true;
	    }
	    else if (array.length == 9) {
	    	for (var i = 0; i < 9; i++) {
	    		if (isNaN(array[i])) return false;
	      	}
	      	return true;
	    }
	}
	return false;
};

GLGE.getMouseFrom3DPosition = function(pos, renderer) {
	var scene = renderer.getScene();
	var camera = scene.getCamera();
	var vec = GLGE.mulMat4Vec4(GLGE.mulMat4(camera.getProjectionMatrix(), camera.getViewMatrix()), pos.concat(1.0) );
	var size = [ renderer.getViewportHeight() / 2, renderer.getViewportwidth() / 2 ];
	
	if ( vec[3] < 0.0 )
		return false;
	
	var z = vec[3] === 0.0 ? 1.0 : ( 1.0 / vec[3] );
	return [
		size[0] + Math.round(size[0] * (vec[0] * z)),
		size[1] - Math.round(size[1] * (vec[1] * z))
	];
};

GLGE.get2DCoords = function(mouse) {
	var mousepos = mouse.getMousePosition();
	return mousepos;
};

GLGE.NormalizeVector = function (pos) {
	return [(2 * pos[0] / $("#gamewindow").width()) - 1, -((2 * pos[1] / $("#gamewindow").height()) - 1), 1, 1];
};

GLGE.getWorldCoords = function(pos, renderer) {
	var scene = renderer.getScene();
	var camera = scene.getCamera();
	if (pos[0] != null && pos[1] != null) {
		pos = GLGE.NormalizeVector(pos);
	
		if (GLGE.Mat3(camera.getProjectionMatrix())) {
			var iproj = GLGE.inverseMat4(camera.getProjectionMatrix());
	
			pos = GLGE.mulMat4(iproj, pos);
		
		    pos[0] /= pos[3];
		    pos[1] /= pos[3];
		    pos[2] /= pos[3];
		    pos[2] = -pos[2];
		
		    var cameraPos = camera.getPosition();
		
		    var kludge = c3dl.multiplyVector(cam.getLeft(), -1);
		    var viewMatrix = c3dl.makePoseMatrix(kludge, cam.getUp(), cam.getDir(), cam.getPosition());
		
		    var rayTerminalPoint = GLGE.mulMat4(viewMatrix, [pos[0], pos[1], pos[2], 0]);
		    var rayDir = c3dl.normalizeVector(rayTerminalPoint);
		
		    var angle = Math.acos(-1 * rayDir[1]);
		    var camHeight = cameraPos[1];
		
		    var hyp = camHeight / Math.cos(angle);
		
		    selEndWorldCoords[0] = hyp * rayDir[0] + cameraPos[0];
		    selEndWorldCoords[1] = hyp * rayDir[2] + cameraPos[2];
		    return [selEndWorldCoords[0], hyp * rayDir[1], selEndWorldCoords[1]];
	    }
	    else return false;
	}
	else return false;
};

GLGE.V3_scale = function(a, k, r) {
    if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(3);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    r[2] = a[2] * k;
    return r;
}

/*
getScreenCoordinatesForPosition = function(position) {
	var targetPos = position;

	container = document.getElementById("canvas");
	var containerWidth = container.offsetWidth;

	var containerHeight = container.offsetHeight;

	targetPos.push(1);
	var xy = new Array();
	var targetloc = GLGE.mulMat4Vec4(camera.getProjectionMatrix(), GLGE.mulMat4Vec4(camera.getViewMatrix(), targetPos));
	targetloc=[(targetloc[0]/targetloc[3]+1)/2,(targetloc[1]/targetloc[3]+1)/2,(targetloc[2])];

	var screenLocLeft = targetloc[0] * containerWidth;
	var screenLocBottom = targetloc[1] * containerHeight;

	screenLocLeft = Math.max(screenLocLeft, 65);
	screenLocLeft = Math.min(screenLocLeft, containerWidth – 80);
	screenLocBottom = Math.max(screenLocBottom, 45);
	screenLocBottom = Math.min(screenLocBottom, containerHeight – 40);
	xy.push(screenLocLeft);
	xy.push(screenLocBottom);
	return xy;
};
*/