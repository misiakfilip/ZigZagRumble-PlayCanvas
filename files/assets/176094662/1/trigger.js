
var Trigger = pc.createScript('trigger');

// initialize code called once per entity
Trigger.prototype.initialize = function() {
    this.textEntity = this.app.root.findByName('Text');
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};


Trigger.prototype.changeText = function() {
    // Zmiana tekstu na ekranie
    var n = parseInt(this.app.root.findByName('Lives').element.text);
    n--;
    this.app.root.findByName('Lives').element.text = n.toString();
    if (n <= 0) {
        this.app.scenes.changeScene('Main Menu');
    }
};

Trigger.prototype.onTriggerEnter = function(otherEntity) {    
    // Zatrzymaj ruch obiektu w triggerze
    otherEntity.rigidbody.linearVelocity = pc.Vec3.ZERO;
    otherEntity.rigidbody.angularVelocity = pc.Vec3.ZERO;
    
    // Sprawdź, czy obiekt w triggerze ma tag 'Player'
    if (otherEntity.tags.has('Player')) {
        // Przywróć gracza do pozycji początkowej
        // Ustaw tutaj konkretne wartości dla pozycji początkowej
        var startPosition = new pc.Vec3(20, 1, 0);
        otherEntity.rigidbody.teleport(startPosition);

        // Zmniejsz liczbę n
        this.changeText();
    }  
};
