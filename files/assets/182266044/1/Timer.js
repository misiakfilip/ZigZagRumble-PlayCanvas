var Timer = pc.createScript('timer');

// Inicjalizacja timera
Timer.prototype.initialize = function() {
    this.timer = 180; // Czas w sekundach
    this.timerText = this.app.root.findByName('Timer'); // Upewnij się, że ten element istnieje
    if (this.timerText && this.timerText.element) {
        this.updateText();
    } else {
        console.error('Element UI "Timer" nie został znaleziony lub nie ma komponentu "element".');
    }
};

// Aktualizacja timera co klatkę
Timer.prototype.update = function(dt) {
    if(this.timer > 0) {
        this.timer -= dt;
        if (this.timerText && this.timerText.element) {
            this.updateText();
        }
    } else {
        this.app.scenes.changeScene('Spawn');
    }
};

// Aktualizacja tekstu timera
Timer.prototype.updateText = function() {
    var minutes = Math.floor(this.timer / 60);
    var seconds = Math.floor(this.timer % 60);
    this.timerText.element.text = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

