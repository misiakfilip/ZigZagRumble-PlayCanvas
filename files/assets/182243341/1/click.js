var Click = pc.createScript('click');

// initialize code called once per entity
Click.prototype.initialize = function() {
    // Add a click event listener to the entity
    this.entity.element.on('click', this.onClick, this);
};

// Function to handle the click event
Click.prototype.onClick = function() {
    // Change the scene when the button is clicked
    
    this.app.scenes.changeScene('Untitled');
};

// swap method called for script hot-reloading
// inherit your script state here
// Click.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/