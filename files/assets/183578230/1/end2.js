var End2 = pc.createScript('end2');

// initialize code called once per entity
End2.prototype.initialize = function() {
this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};

// update code called every frame
End2.prototype.update = function(dt) {

};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// End2.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/

// update code called every frame

End2.prototype.onTriggerEnter = function(entity) {
    // Wysłanie żądania zmiany sceny tylko dla lokalnego gracza
    //if (entity.name === 'Player' || entity.name === 'Other') {
        // Zmiana sceny gdy gracz wejdzie w trigger
        //Network.requestSceneChange('Spawn 2');
    //}

    if (entity.name === 'Player' || entity.name === 'Other') 
    {
        // Zmiana sceny gdy gracz wejdzie w trigger
        this.app.scenes.changeScene('Spawn 3');
        
        //var network = this.app.root.findByName('Network').script.network;
       // network.requestSceneChange('Level 1');
    }
};
