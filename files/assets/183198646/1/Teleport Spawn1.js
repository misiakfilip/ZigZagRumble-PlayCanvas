var TeleportSpawn1 = pc.createScript('teleportSpawn1');

// initialize code called once per entity
/*
TeleportSpawn1.prototype.initialize = function() {
this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};

// update code called every frame
TeleportSpawn1.prototype.update = function(dt) {

};

TeleportSpawn1.prototype.onTriggerEnter = function(entity) 
{
    
    if (entity.name === 'Player' || 'Other') 
    {
        // Zmiana sceny gdy gracz wejdzie w trigger
        this.app.scenes.changeScene('Spawn');
        
    }
};
*/
TeleportSpawn1.attributes.add('targetPosition', {
    type: 'vec3',   
    default: [0, 0, 0],
    title: 'Target Position',
});

// initialize code called once per entity
TeleportSpawn1.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};

// update code called every frame
TeleportSpawn1.prototype.update = function(dt) {

};

TeleportSpawn1.prototype.onTriggerEnter = function(entity) {
    if (entity.name === 'Player') 
    {
        // Teleportowanie gracza do punktu docelowego
        //entity.rigidbody.teleport(this.targetPosition.x, this.targetPosition.y, this.targetPosition.z);
        entity.rigidbody.teleport(new pc.Vec3(-11.533,1.2,42.09));
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
        entity.rigidbody.teleport(new pc.Vec3(-11.533,1.2,42.09));
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

  //var network = this.app.root.findByName('Network').script.network;
       // network.requestSceneChange('Level 1');
// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// TeleportSpawn1.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/