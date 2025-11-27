/*
var TeleportLevel1 = pc.createScript('teleportLevel1');

// initialize code called once per entity
TeleportLevel1.prototype.initialize = function() {
this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};

// update code called every frame
TeleportLevel1.prototype.update = function(dt) {

};

TeleportLevel1.prototype.onTriggerEnter = function(entity) {
    // Zmiana sceny gdy gracz wejdzie w trigger   
    this.app.scenes.changeScene('Level 1');
    var network = pc.app.root.findByName('Network').script.network;
    network.requestSceneChange('Level 1');

};

var TeleportLevel1 = pc.createScript('teleportLevel1');

TeleportLevel1.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};

TeleportLevel1.prototype.onTriggerEnter = function(entity) {
    if (entity.name === 'Player' || 'Other') {
        // Zmiana sceny gdy gracz wejdzie w trigger
        this.app.scenes.changeScene('Level 1');

        var network = this.app.root.findByName('Network').script.network;
        network.requestSceneChange('Level 1');
    }
};
*/
var TeleportLevel1 = pc.createScript('teleportLevel1');

TeleportLevel1.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};

TeleportLevel1.prototype.onTriggerEnter = function(entity) 
{
    if (entity.name === 'Playerr') 
    {
        // Zmiana sceny gdy gracz wejdzie w trigger
        this.app.scenes.changeScene('Level 1');
        
        //var network = this.app.root.findByName('Network').script.network;
       // network.requestSceneChange('Level 1');
    }
};
