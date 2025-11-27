// Skrypt obracający obiekt na scenie w PlayCanvas
var Rotate = pc.createScript('rotate');

// Zdefiniuj prędkość obrotu (stopnie na sekundę)
Rotate.attributes.add('speed', { type: 'number', default: 90, title: 'Speed', description: 'How fast the object rotates in degrees per second' });

// Inicjalizacja, ustawienie początkowej prędkości obrotu
Rotate.prototype.initialize = function() {
    this.entity.rotateLocal(0, this.speed, 0);
};

// Aktualizacja, obrót obiektu każdej klatki
Rotate.prototype.update = function(dt) {
    this.entity.rotateLocal(0, 0, this.speed * dt);
};
