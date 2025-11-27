var BoxPlacement = pc.createScript('boxPlacement');

BoxPlacement.attributes.add('boxEntity', {type: 'entity', description: 'The entity to be spawned after clicking.'});
BoxPlacement.attributes.add('cameraEntity', {type: 'entity', description: 'The main camera entity in the scene.'});

// initialize code called once per entity
BoxPlacement.prototype.initialize = function () {
    if (this.app.touch) {
        this.app.touch.on('touchstart', this.onTouchStart, this);
    } 
    
    this.app.mouse.on('mousedown', this.onMouseDown, this);

    this.on('destroy', function () {
        if (this.app.touch) {
            this.app.touch.off('touchstart', this.onTouchStart, this);
        } 

        this.app.mouse.off('mousedown', this.onMouseDown, this);       
    }, this);
};

BoxPlacement.prototype.onMouseDown = function (e) {
    this.fireRaycast (e);
};

BoxPlacement.prototype.onTouchStart = function (touchEvent) {
    // For each new touch on screen, create a box
    var changedTouches = touchEvent.changedTouches;
    
    for (var i = 0; i < changedTouches.length; i++) {
        this.fireRaycast (changedTouches[i]);
    }
    
    touchEvent.event.preventDefault();
};

BoxPlacement.prototype.fireRaycast = function (event) {
    // Get the vec3 to start from
    var from = this.cameraEntity.getPosition ();
    
    // Convert the 2D screen space coordinates to a 3D point for the end point
    var to = this.cameraEntity.camera.screenToWorld (event.x, event.y, this.cameraEntity.camera.farClip);

    // Cast a ray between the two points
    var raycastResult = this.app.systems.rigidbody.raycastFirst (from, to);
    
    // If there was a hit, spawn a box at the point
    if (raycastResult) {
        var hitPoint = raycastResult.point;
        this.spawnBox (hitPoint);
    }
};

BoxPlacement.prototype.spawnBox = function (point) {
    // Clone the box entity and add it to the hierarchy
    var newBox = this.boxEntity.clone ();
    this.boxEntity.parent.addChild (newBox);
    
    // Adjust the position up so the box does not clip through the plane
    point.y += 0.5;
    
    // Move the box to the clicked position
    newBox.rigidbody.teleport (point);
    
    // Enable the new box
    newBox.enabled = true;
};