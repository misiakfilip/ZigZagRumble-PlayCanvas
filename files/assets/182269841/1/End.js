/*
var End = pc.createScript('End');

// initialize code called once per entity
End.prototype.initialize = function() {
this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};

// update code called every frame
End.prototype.update = function(dt) {

};

End.prototype.onTriggerEnter = function(entity) {
    // Zmiana sceny gdy gracz wejdzie w trigger
    this.app.scenes.changeScene('Spawn 2');
};
*/

var End = pc.createScript('end');

// initialize code called once per entity
End.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};

// update code called every frame
End.prototype.update = function(dt) {

};

End.prototype.onTriggerEnter = function(entity) {
    // Wysłanie żądania zmiany sceny tylko dla lokalnego gracza
    //if (entity.name === 'Player' || entity.name === 'Other') {
        // Zmiana sceny gdy gracz wejdzie w trigger
        //Network.requestSceneChange('Spawn 2');
    //}

    if (entity.name === 'Player' || entity.name === 'Other') 
    {
        // Zmiana sceny gdy gracz wejdzie w trigger
        this.app.scenes.changeScene('Spawn 2');
        
        //var network = this.app.root.findByName('Network').script.network;
       // network.requestSceneChange('Level 1');
    }
};
