// Skrypt 'MenuScript' przypisany do obiektu 2D screen
var MenuScript = pc.createScript('menu');

// Inicjalizacja skryptu
MenuScript.prototype.initialize = function() {
    // Znajdź przyciski po nazwie
    var startButton = this.app.root.findByName('btn-start');
    var controlsButton = this.app.root.findByName('btn-help');
    var closeButton = this.app.root.findByName('btn-exit');

    this.controlsVisible = false;
    this.controlsEntity = null; 
    this.backgroundEntity = null;

    // Przypisz funkcje do zdarzeń kliknięcia dla każdego przycisku
    startButton.element.on('click', this.onStartClick, this);
    controlsButton.element.on('click', this.onControlsClick, this);
    closeButton.element.on('click', this.onCloseClick, this);
};

// Funkcja wywoływana po kliknięciu 'Start'
MenuScript.prototype.onStartClick = function(event) {
    // Przeniesienie do nowej sceny
    this.app.scenes.changeScene('Spawn');
};

// Funkcja wywoływana po kliknięciu 'Sterowanie'
MenuScript.prototype.onControlsClick = function(event) {
    // Jeśli informacje są już wyświetlone, ukryj je
    if (this.controlsVisible) {
        this.controlsEntity.destroy();
        this.backgroundEntity.destroy();
        this.controlsVisible = false;
        this.controlsEntity = null; 
        this.backgroundEntity = null;
    } else {
    // Wyświetlenie informacji o sterowaniu
    var controlsInfo = "WASD - ruch postaci\nSpacja - skok\nEsc - pauza gry";
    
    // Znajdź obiekt 2D screen w hierarchii sceny
    var screenEntity = this.app.root.findByName('2D Screen');
    this.fontAsset = this.app.assets.find("Montserrat-Black.ttf", "font");
    // Stwórz nowy element tekstowy
    var textElement = new pc.Entity();
    textElement.addComponent('element', {
        type: 'text',
        // Ustaw kotwicę, aby element tekstowy był wyświetlany obok przycisków
        anchor: new pc.Vec4(0, 0, 0.3, 0.1), // Zmodyfikuj te wartości, aby dopasować do swojego UI
        pivot: new pc.Vec2(0, 0),
        alignment: new pc.Vec2(0, 0), // Wyrównanie do lewej i góry
        text: controlsInfo,
        fontAsset: this.fontAsset,
        // Dodatkowe style
        fontSize: 24, // Rozmiar czcionki
        color: new pc.Color(1, 1, 1), // Kolor tekstu (biały)
        opacity: 1, // Nieprzezroczystość tekstu
        wrapLines: true // Zawijanie tekstu, jeśli jest za długi
    });
    var spriteAsset = this.app.assets.find("btn-default", "sprite");
    if (spriteAsset && spriteAsset.resource) {
        // Zasób jest załadowany i gotowy do użycia
        this.backgroundSpriteAsset = spriteAsset;
    } else {
        // Zasób nie jest załadowany, więc załaduj go
        this.app.assets.load(spriteAsset);
        spriteAsset.ready(function(loadedAsset) {
        // Teraz zasób jest załadowany
        this.backgroundSpriteAsset = loadedAsset;
    }.bind(this));
    }
    // Stwórz nowy element UI typu 'image' jako tło dla tekstu
    var backgroundElement = new pc.Entity();
    backgroundElement.addComponent('element', {
        type: 'image',
        anchor: new pc.Vec4(0, 0, 0.2, 0.1), // Dopasuj te wartości do rozmiaru tekstu
        pivot: new pc.Vec2(0, 0),
        color: new pc.Color(0, 0, 0, 0.5), // Kolor tła (czarny z półprzezroczystością)
        // Upewnij się, że masz przypisany asset tła
        spriteAsset: this.backgroundSpriteAsset
    });

    // Dodaj element tła do obiektu 2D screen przed elementem tekstowym
    screenEntity.addChild(backgroundElement);
    screenEntity.addChild(textElement);

    // Zapisz referencję do elementu tekstowego i tła
    this.controlsEntity = textElement;
    this.backgroundEntity = backgroundElement; // Dodaj tę linię
    this.controlsVisible = true;
    }
};

// Funkcja wywoływana po kliknięciu 'Zamknij'
MenuScript.prototype.onCloseClick = function(event) {
    // Zamknięcie aplikacji
    window.close();
};