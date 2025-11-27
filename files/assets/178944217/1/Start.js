var ButtonLogic = pc.createScript('Start');

// Dodajemy atrybut 'sceneName', który będzie przechowywał nazwę sceny, na którą chcemy przełączyć
ButtonLogic.attributes.add('Gra-Pauza', {type: 'string'});

// initialize code called once per entity
ButtonLogic.prototype.initialize = function() {
    var app = this.app;

    this.entity.button.on('click', function(event) {
        // Pobieramy aktualną scenę
        var oldScene = app.root.findByName(app.scene.name);
        this.app.scenes.changeScene('Gra-Pauza');
        // Ładujemy nową scenę
        app.scenes.loadSceneHierarchy(this.sceneName + '.json', function (err, parent) {
            if (!err) {
                oldScene.destroy(); // Usuwamy starą scenę
            } else {
                console.error(err);
            }
        });
    }, this);
};
