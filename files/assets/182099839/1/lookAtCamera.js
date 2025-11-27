var LookAtCamera = pc.createScript('lookAtCamera');
var camera;
// initialize code called once per entity
LookAtCamera.prototype.initialize = function() {
    camera = this.app.root.findByName("Camera");
};

// update code called every frame
LookAtCamera.prototype.postUpdate = function(dt) {
    this.entity.lookAt(camera.getPosition());
    this.entity.rotateLocal(0, 180, 0);
};

// swap method called for script hot-reloading
// inherit your script state here
// LookAtcamera.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/