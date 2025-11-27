
var TeleportLevel2 = pc.createScript('teleportLevel2');

// initialize code called once per entity
TeleportLevel2.prototype.initialize = function() {
this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};

// update code called every frame
TeleportLevel2.prototype.update = function(dt) {

};

TeleportLevel2.prototype.onTriggerEnter = function(entity) 
{
    if (entity.name === 'Playerr' || 'Other') 
    {
        // Zmiana sceny gdy gracz wejdzie w trigger
        this.app.scenes.changeScene('Level2');
        
        //var network = this.app.root.findByName('Network').script.network;
       // network.requestSceneChange('Level 1');
    }
};

// TeleportLevel2.prototype.onTriggerEnter = function(entity) {
//     // Zmiana sceny gdy gracz wejdzie w trigger  
//     this.app.scenes.changeScene('Level2');
//     // var network = pc.app.root.findByName('Network').script.network;
//     // network.requestSceneChange('Level2');
// };


// var TeleportLevel2 = pc.createScript('teleportLevel2');

// TeleportLevel1.prototype.initialize = function() {
//     this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
// };

// TeleportLevel1.prototype.onTriggerEnter = function(entity) {
//     if (entity.name === 'Player' || 'Other') {
//         // Zmiana sceny gdy gracz wejdzie w trigger
//         this.app.scenes.changeScene('Level2');

//         var network = this.app.root.findByName('Network').script.network;
//         network.requestSceneChange('Level2');
//     }
// };
