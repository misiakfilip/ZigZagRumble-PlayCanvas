/*
var PlayerController = pc.createScript('playerController');

PlayerController.attributes.add('cameraEntity', { type: 'entity' });
PlayerController.attributes.add('playerSpeed', {
    type: 'number',
    default: 5,
    title: 'Player Speed'
});

PlayerController.attributes.add('jumpForce', {
    type: 'number',
    default: 4,
    title: 'Jump Force'
});

// initialize code called once per entity
PlayerController.prototype.initialize = function() {
    this.force = new pc.Vec3();
    this.isGrounded = false;

    this._camera = this.cameraEntity.camera;
    this._mousePos = new pc.Vec3();
    this._screenPos = new pc.Vec3();
    this._directionToMouse = new pc.Vec3();

    this.app.mouse.on(pc.EVENT_MOUSEMOVE, this._onMouseMove, this);

    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
    this.entity.collision.on('collisionend', this.onCollisionEnd, this);
};

PlayerController.prototype.onCollisionStart = function(result) {
    this.isGrounded = true;
};

PlayerController.prototype.onCollisionEnd = function(result) {
    this.isGrounded = false;
};

PlayerController.prototype.update = function(dt) {
    var forward = this.entity.forward;
    var right = this.entity.right;
    var app = this.app;

    var x = 0;
    var z = 0;

    if (app.keyboard.isPressed(pc.KEY_A)) {
        x -= right.x;
        z -= right.z;
    }

    if (app.keyboard.isPressed(pc.KEY_D)) {
        x += right.x;
        z += right.z;
    }

    if (app.keyboard.isPressed(pc.KEY_W)) {
        x += forward.x;
        z += forward.z;
    }

    if (app.keyboard.isPressed(pc.KEY_S)) {
        x -= forward.x;
        z -= forward.z;
    }

    if (x !== 0 || z !== 0) {
        this.force.set(x, 0, z).normalize().scale(this.playerSpeed);
        this.entity.rigidbody.applyForce(this.force);
    }

    if (app.keyboard.wasPressed(pc.KEY_SPACE) && this.isGrounded) {
        this.entity.rigidbody.applyImpulse(0, this.jumpForce, 0);
    }

    this.updateRotation();
};

PlayerController.prototype.updateRotation = function() {
    this._camera.worldToScreen(this.entity.getPosition(), this._screenPos);
    this._screenPos.z = 0;
    this._directionToMouse.sub2(this._mousePos, this._screenPos);
    this._directionToMouse.y *= -1;

    var angle = Math.atan2(this._directionToMouse.x, this._directionToMouse.y) * pc.math.RAD_TO_DEG;
    angle *= -1;

    // Adjust the angle if the model has a base rotation
    this.entity.setEulerAngles(-90, angle, 0);
};

PlayerController.prototype._onMouseMove = function(e) {
    this._mousePos.set(e.x, e.y, 0);
};

var PlayerController = pc.createScript('playerController');

PlayerController.attributes.add('cameraEntity', { type: 'entity' });
PlayerController.attributes.add('playerSpeed', {
    type: 'number',
    default: 5,
    title: 'Player Speed'
});

PlayerController.attributes.add('jumpForce', {
    type: 'number',
    default: 4,
    title: 'Jump Force'
});

// initialize code called once per entity
PlayerController.prototype.initialize = function() {
    this.force = new pc.Vec3();
    this.isGrounded = false;

    this.currentRotation = this.entity.getEulerAngles().clone();

    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
    this.entity.collision.on('collisionend', this.onCollisionEnd, this);
};

PlayerController.prototype.onCollisionStart = function(result) {
    this.isGrounded = true;
};

PlayerController.prototype.onCollisionEnd = function(result) {
    this.isGrounded = false;
};

PlayerController.prototype.update = function(dt) {
    var forward = this.entity.forward;
    var right = this.entity.right;
    var app = this.app;

    var x = 0;
    var z = 0;

    if (app.keyboard.isPressed(pc.KEY_A)) {
        this.currentRotation.y += 90;
        this.entity.setEulerAngles(this.currentRotation);
    }

    if (app.keyboard.isPressed(pc.KEY_D)) {
        this.currentRotation.y -= 90;
        this.entity.setEulerAngles(this.currentRotation);
    }

    if (app.keyboard.isPressed(pc.KEY_W)) {
        x += forward.x;
        z += forward.z;
    }

    if (app.keyboard.isPressed(pc.KEY_S)) {
        x -= forward.x;
        z -= forward.z;
    }

    if (x !== 0 || z !== 0) {
        this.force.set(x, 0, z).normalize().scale(this.playerSpeed);
        this.entity.rigidbody.applyForce(this.force);
    }

    if (app.keyboard.wasPressed(pc.KEY_SPACE) && this.isGrounded) {
        this.entity.rigidbody.applyImpulse(0, this.jumpForce, 0);
    }
};
*/
var PlayerController = pc.createScript('playerController');

PlayerController.attributes.add('cameraEntity', { type: 'entity' });
PlayerController.attributes.add('playerSpeed', {
    type: 'number',
    default: 5,
    title: 'Player Speed'
});

PlayerController.attributes.add('jumpForce', {
    type: 'number',
    default: 4,
    title: 'Jump Force'
});

// initialize code called once per entity
PlayerController.prototype.initialize = function() {
    this.force = new pc.Vec3();
    this.isGrounded = false;
    
    this.currentRotation = this.entity.getEulerAngles().clone();

    this.app.mouse.on(pc.EVENT_MOUSEMOVE, this._onMouseMove, this);

    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
    this.entity.collision.on('collisionend', this.onCollisionEnd, this);

    this.rotationSpeed = 90;  // Rotation speed in degrees
    this.rotationAngle = 0;   // Total rotation angle to apply
};

PlayerController.prototype.onCollisionStart = function(result) {
    this.isGrounded = true;
};

PlayerController.prototype.onCollisionEnd = function(result) {
    this.isGrounded = false;
};

PlayerController.prototype.update = function(dt) {
    var forward = this.entity.forward;
    var right = this.entity.right;
    var app = this.app;

    var x = 0;
    var z = 0;

    if (app.keyboard.wasPressed(pc.KEY_A)) {
        this.rotationAngle += this.rotationSpeed;
    }

    if (app.keyboard.wasPressed(pc.KEY_D)) {
        this.rotationAngle -= this.rotationSpeed;
    }

    this.currentRotation.y += this.rotationAngle;
    this.entity.setEulerAngles(this.currentRotation);
    this.rotationAngle = 0;  // Reset rotation angle after applying it

    if (app.keyboard.isPressed(pc.KEY_W)) {
        x += forward.x;
        z += forward.z;
    }

    if (app.keyboard.isPressed(pc.KEY_S)) {
        x -= forward.x;
        z -= forward.z;
    }

    if (x !== 0 || z !== 0) {
        this.force.set(x, 0, z).normalize().scale(this.playerSpeed);
        this.entity.rigidbody.applyForce(this.force);
    }

    if (app.keyboard.wasPressed(pc.KEY_SPACE) && this.isGrounded) {
        this.entity.rigidbody.applyImpulse(0, this.jumpForce, 0);
    }
};

// Prevent camera from rotating left or right
PlayerController.prototype._onMouseMove = function(e) {
    // Do nothing, preventing mouse movement from affecting camera rotation
};
