var PointsScript = pc.createScript('pointsScript');

function random(min, max) {
    var diff = max - min;
    return Math.random() * diff + min;
}

PointsScript.prototype.changeText = function() {
    // Zmiana tekstu na ekranie
    var n = parseInt(this.app.root.findByName('Points').element.text);
    n+=1;
    this.app.root.findByName('Points').element.text = n.toString();
    
};

PointsScript.prototype.minusText = function() {
    // Zmiana tekstu na ekranie
    var n = parseInt(this.app.root.findByName('Points').element.text);
    n-=1;
    this.app.root.findByName('Points').element.text = n.toString();
    
};

// initialize code called once per entity
PointsScript.prototype.initialize = function() {
    this.textEntity = this.app.root.findByName('Points');
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};

PointsScript.prototype.onTriggerEnter = function(otherEntity) {    

    if (otherEntity.tags.has('Sphere1')){
        this.changeText(); 
        otherEntity.rigidbody.linearVelocity = pc.Vec3.ZERO;
        otherEntity.rigidbody.angularVelocity = pc.Vec3.ZERO;
       // otherEntity.rigidbody.teleport(random(-10, 10), 5, -7);
    }
    if (otherEntity.tags.has('Box1')){
        this.minusText(); 
        otherEntity.rigidbody.linearVelocity = pc.Vec3.ZERO;
        otherEntity.rigidbody.angularVelocity = pc.Vec3.ZERO;
       // otherEntity.rigidbody.teleport(random(-10, 10), 5, -7);
    }
};
/*
Collider.prototype.initialize = function () {
    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
};

Collider.prototype.onCollisionStart = function (result) {
    if (result.other.rigidbody) {
        this.entity.sound.play("hit");    
    }
};
*/
// swap method called for script hot-reloading
// inherit your script state here
// PointsScript.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/