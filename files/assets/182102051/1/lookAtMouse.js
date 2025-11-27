var LookAtMouse = pc.createScript('lookAtMouse');

LookAtMouse.attributes.add('cameraEntity', {type: 'entity'});

LookAtMouse.prototype.initialize = function() {
    this._camera = this.cameraEntity.camera;
    this._mousePos = new pc.Vec3();
    this._screenPos = new pc.Vec3();
    this._directionToMouse = new pc.Vec3();

    this.app.mouse.on(pc.EVENT_MOUSEMOVE, this._onMouseMove, this);
};

// update code called every frame
LookAtMouse.prototype.update = function(dt) {
    var pos = this.entity.getPosition();
    var forward = this.entity.forward;
    var right = this.entity.right;
    var app = this.app;

    if (app.keyboard.isPressed(pc.KEY_UP)) {
        pos.add(forward.clone().scale(2 * dt));
    }

    if (app.keyboard.isPressed(pc.KEY_DOWN)) {
        pos.add(forward.clone().scale(-2 * dt));
    }

    if (app.keyboard.isPressed(pc.KEY_LEFT)) {
        pos.add(right.clone().scale(-2 * dt));
    }

    if (app.keyboard.isPressed(pc.KEY_RIGHT)) {
        pos.add(right.clone().scale(2 * dt));
    }

    this.entity.setPosition(pos);

    this._camera.worldToScreen(this.entity.getPosition(), this._screenPos);
    this._screenPos.z = 0;
    this._directionToMouse.sub2(this._mousePos, this._screenPos);
    this._directionToMouse.y *= 1;

    var angle = Math.atan2(this._directionToMouse.x, this._directionToMouse.y) * pc.math.RAD_TO_DEG;
    angle *= 1;
    
    this.entity.setEulerAngles(-100, angle, 0);
};

LookAtMouse.prototype._onMouseMove = function(e) {
    this._mousePos.set(e.x, e.y, 0);
};



