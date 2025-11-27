var Collider = pc.createScript('collider');

// initialize code called once per entity
Collider.prototype.initialize = function () {
    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
};


Collider.prototype.onCollisionStart = function (result) {
    //if (result.other.rigidbody) {
    //    this.entity.sound.play("hit");    
   // }

     if (result.other.tags && result.other.tags.has('Player')) {
        if (result.other.rigidbody) {
            this.entity.sound.play("hit");   
           

        }
    }

};


