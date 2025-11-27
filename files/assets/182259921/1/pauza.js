var Pauza = pc.createScript('pauza');

// initialize code called once per entity
Pauza.prototype.initialize = function() {
    this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
    this.pauseMenu = this.entity.findByName('Pauza');
    var ctnButton = this.app.root.findByName('btn-ctn');
    var exitButton = this.app.root.findByName('btn-exit');

    ctnButton.element.on('click', this.onCtnClick, this);
    exitButton.element.on('click', this.onExitClick, this);

    this.pauseMenu.enabled = false; // Ukryj menu pauzy na początku
};

Pauza.prototype.onCtnClick = function(event) {
    this.togglePauseMenu();
};
Pauza.prototype.onExitClick = function(event) {
    // Przeniesienie do Menu
    this.app.scenes.changeScene('Main Menu');
};
Pauza.prototype.onKeyDown = function(event) {
    // Sprawdź, czy naciśnięto klawisz Escape
    if (event.key === pc.KEY_ESCAPE) {
        this.togglePauseMenu();
        this.toggleCursorVisibility();
    }
};
Pauza.prototype.toggleCursorVisibility = function() {
    // Przełącz widoczność kursora
    if (!this.app.mouse.pointerLock) {
        console.log('Enabling pointer lock'); // Dodaj tę linię
        this.app.mouse.enablePointerLock();
    } else {
        console.log('Disabling pointer lock'); // Dodaj tę linię
        this.app.mouse.disablePointerLock();
    }
};

Pauza.prototype.togglePauseMenu = function() {
    // Przełącz widoczność menu pauzy
    this.pauseMenu.enabled = !this.pauseMenu.enabled;
};
