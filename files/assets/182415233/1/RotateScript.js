// Skrypt obracający obiekt na scenie w PlayCanvas
var RotateScript = pc.createScript('rotateScript');

// Zdefiniuj prędkość obrotu (stopnie na sekundę)
RotateScript.attributes.add('speed', { type: 'number', default: 90, title: 'Speed', description: 'How fast the object rotates in degrees per second' });

// Inicjalizacja, ustawienie początkowej prędkości obrotu
RotateScript.prototype.initialize = function() {
    this.entity.rotateLocal(0, this.speed, 0);
};

// Aktualizacja, obrót obiektu każdej klatki
RotateScript.prototype.update = function(dt) {
    this.entity.rotateLocal(0, this.speed * dt, 0);
};
