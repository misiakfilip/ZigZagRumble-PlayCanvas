var Rotation = pc.createScript('rotation');


Rotation.prototype.update = function(dt) {
    var movementSpeed = 5; // Szybkość poruszania postaci

    var movement = new pc.Vec3(); // Wektor przechowujący kierunek ruchu postaci

    // Sprawdź, czy wciśnięto klawisz A lub strzałkę w lewo
    if (this.app.keyboard.isPressed(pc.KEY_A) || this.app.keyboard.isPressed(pc.KEY_LEFT)) {
        movement.x -= 1; // Poruszaj postać w lewo
    }

    // Sprawdź, czy wciśnięto klawisz D lub strzałkę w prawo
    if (this.app.keyboard.isPressed(pc.KEY_D) || this.app.keyboard.isPressed(pc.KEY_RIGHT)) {
        movement.x += 1; // Poruszaj postać w prawo
    }

    // Sprawdź, czy wciśnięto klawisz W lub strzałkę w górę
    if (this.app.keyboard.isPressed(pc.KEY_W) || this.app.keyboard.isPressed(pc.KEY_UP)) {
        movement.z -= 1; // Poruszaj postać do przodu
    }

    // Sprawdź, czy wciśnięto klawisz S lub strzałkę w dół
    if (this.app.keyboard.isPressed(pc.KEY_S) || this.app.keyboard.isPressed(pc.KEY_DOWN)) {
        movement.z += 1; // Poruszaj postać do tyłu
    }

    // Znormalizuj wektor ruchu, aby uniknąć szybszego poruszania się po przekątnych
    movement.normalize();

    // Pomnóż wektor ruchu przez szybkość poruszania się postaci i czas delta
    movement.scale(movementSpeed * dt);

    // Przesuń postać na podstawie obliczonego wektora ruchu
    this.entity.translateLocal(movement);
};