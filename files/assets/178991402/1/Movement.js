/*
var Movement = pc.createScript('movement');

Movement.attributes.add('playerSpeed', {
    type: 'number',
    default: 5,
    title: 'Player Speed'
});

Movement.attributes.add('jumpForce', {
    type: 'number',
    default: 4,
    title: 'Jump Force'
});

// initialize code called once per entity
Movement.prototype.initialize = function() {
    this.force = new pc.Vec3();

    this.isGrounded = false;

    // Event listener for when the character touches the ground
    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
    this.entity.collision.on('collisionend', this.onCollisionEnd, this);
};

Movement.prototype.onCollisionStart = function(result) {
    //if (result.other.rigidbody) {
        this.isGrounded = true;
    //}
    // każda kolizja oznacza, że postać jest na ziemi,
    // każda utrata kolizji oznacza, że postać nie jest na ziemi.
};

Movement.prototype.onCollisionEnd = function(result) {
    //if (result.other.rigidbody) {
        this.isGrounded = false;
    //}
};

// update code called every frame
Movement.prototype.update = function(dt) {
    var forward = this.entity.forward;
    var right = this.entity.right;
    var app = this.app;

    x = 0;
    z = 0;
    
    var direction = new pc.Vec3();

    if (app.keyboard.isPressed(pc.KEY_A)) {
        x += right.x;
        z += right.z;
        
    }

    if (app.keyboard.isPressed(pc.KEY_D)) {
        
        x -= right.x;
        z -= right.z;
       
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
        x *= dt;
        z *= dt;

        this.force.set (x, 0, z).normalize ().scale ((this.playerSpeed));
        this.entity.rigidbody.applyForce (this.force);
    }
    if (app.keyboard.wasPressed(pc.KEY_SPACE) && this.isGrounded) {
        this.entity.rigidbody.applyImpulse(0, this.jumpForce, 0);
    }
   
};
*/
var Movement = pc.createScript('movement');

Movement.attributes.add('playerSpeed', {
    type: 'number',
    default: 5,
    title: 'Player Speed'
});

Movement.attributes.add('jumpForce', {
    type: 'number',
    default: 4,
    title: 'Jump Force'
});

// initialize code called once per entity
Movement.prototype.initialize = function() {
    this.force = new pc.Vec3();

    this.isGrounded = false;

    // Event listener for when the character touches the ground
    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
    this.entity.collision.on('collisionend', this.onCollisionEnd, this);
};

Movement.prototype.onCollisionStart = function(result) {
    this.isGrounded = true;
};

Movement.prototype.onCollisionEnd = function(result) {
    this.isGrounded = false;
};

// update code called every frame
Movement.prototype.update = function(dt) {
    var forward = this.entity.forward;
    var right = this.entity.right;
    var app = this.app;

    var x = 0;
    var z = 0;
    //var moveDirection = new pc.Vec3();

    if (app.keyboard.isPressed(pc.KEY_A)) {
        //moveDirection.set(-1, 0, 0);
        x += right.x;
        z += right.z;
    }

    if (app.keyboard.isPressed(pc.KEY_D)) {
       // moveDirection.set(1, 0, 0);
        x -= right.x;
        z -= right.z;
    }

    if (app.keyboard.isPressed(pc.KEY_W)) {
       // moveDirection.set(0, 0, -1);
        x += forward.x;
        z += forward.z;
    }

    if (app.keyboard.isPressed(pc.KEY_S)) {
       // moveDirection.set(0, 0, 1);
        x -= forward.x;
        z -= forward.z;
    }

    if (x !== 0 || z !== 0) {
        x *= dt;
        z *= dt;

        this.force.set(x, 0, z).normalize().scale(this.playerSpeed);
        this.entity.rigidbody.applyForce(this.force);

        //var angle = Math.atan2(moveDirection.x, moveDirection.z) * pc.math.RAD_TO_DEG;
        //this.entity.setEulerAngles(0, angle, 0);
    }

    if (app.keyboard.wasPressed(pc.KEY_SPACE) && this.isGrounded) {
        this.entity.rigidbody.applyImpulse(0, this.jumpForce, 0);
    }
};

/*
var Movement = pc.createScript('playerMovement');

Movement.attributes.add('speed', { type: 'number', default: 0.09 });

Movement.prototype.initialize = function () {
    var app = this.app;
    var camera = app.root.findByName('Camera');
    this.cameraScript = camera.script.cameraMovement;    
};


// Temp variable to avoid garbarge colleciton
Movement.worldDirection = new pc.Vec3();
Movement.tempDirection = new pc.Vec3();

Movement.prototype.update = function (dt) {
    var app = this.app;
    var worldDirection = Movement.worldDirection;
    worldDirection.set(0, 0, 0);
    
    var tempDirection = Movement.tempDirection;
    
    var forward = this.entity.forward;
    var right = this.entity.right;

    var x = 0;
    var z = 0; 
    
    if (app.keyboard.isPressed(pc.KEY_A)) {
        x -= 1;
    }

    if (app.keyboard.isPressed(pc.KEY_D)) {
        x += 1;
    }

    if (app.keyboard.isPressed(pc.KEY_W)) {
        z += 1;
    }

    if (app.keyboard.isPressed(pc.KEY_S)) {
        z -= 1;
    }

    if (x !== 0 || z !== 0) {
        worldDirection.add(tempDirection.copy(forward).mulScalar(z));
        worldDirection.add(tempDirection.copy(right).mulScalar(x));        
        worldDirection.normalize();
        
        var pos = new pc.Vec3(worldDirection.x * dt, 0, worldDirection.z * dt);
        pos.normalize().scale(this.speed);
        pos.add(this.entity.getPosition());

        var targetY = this.cameraScript.eulers.x + 180;
        var rot = new pc.Vec3(0, targetY, 0);

        this.entity.rigidbody.teleport(pos, rot);
    }
    
    this.entity.anim.setFloat('xDirection', x);
    this.entity.anim.setFloat('zDirection', z);
};
*/