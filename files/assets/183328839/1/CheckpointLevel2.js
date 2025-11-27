var CheckpointLevel2 = pc.createScript('checkpointLevel2');

// update code called every frame
CheckpointLevel2.prototype.update = function(dt) {

};

CheckpointLevel2.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};


CheckpointLevel2.prototype.onTriggerEnter = function(entity) {
    if (entity.name === 'Player') 
    {
        // Teleportowanie gracza do punktu docelowego
        //entity.rigidbody.teleport(this.targetPosition.x, this.targetPosition.y, this.targetPosition.z);
        entity.rigidbody.teleport(new pc.Vec3(21.247,0.204,0));
        // Emisja zdarzenia o teleportacji do serwera
        // Network.socket.emit('positionUpdate', {
        //     id: Network.id,
        //     x: this.targetPosition.x,
        //     y: this.targetPosition.y,
        //     z: this.targetPosition.z,
        //     rx: entity.getEulerAngles().x,
        //     ry: entity.getEulerAngles().y,
        //     rz: entity.getEulerAngles().z
        // });
    }
    else if (entity.name === 'Other') 
    {
        // Teleportowanie gracza do punktu docelowego
        //entity.rigidbody.teleport(this.targetPosition.x, this.targetPosition.y, this.targetPosition.z);
        entity.rigidbody.teleport(new pc.Vec3(21.247,0.204,0));
        // Emisja zdarzenia o teleportacji do serwera
        // Network.socket.emit('positionUpdate', {
        //     id: Network.id,
        //      x: -11.533.x,
        //     y: 1.2.y,
        //     z: 42.09.z,
        //     rx: entity.getEulerAngles().x,
        //     ry: entity.getEulerAngles().y,
        //     rz: entity.getEulerAngles().z
        // });
    }
};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// CheckpointLevel2.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/