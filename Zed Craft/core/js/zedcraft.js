var canvasElement = document.getElementById("canvas");
var doc = new GLGE.Document();

doc.load("res/test/stage.xml");

doc.onLoad = function() {
	var renderer = new GLGE.Renderer(canvasElement);
	var scene = new GLGE.Scene();
	scene = doc.getElement("mainScene");
	renderer.setScene(scene);
	renderer.render();
}