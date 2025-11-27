var Terrain = pc.createScript('terrain');

Terrain.attributes.add('width', { type: 'number', default: 100 });
Terrain.attributes.add('depth', { type: 'number', default: 100 });

// initialize code called once per entity
Terrain.prototype.initialize = function() {
    this.world = [];
    
    var tile = this.app.root.findByName('Tile');
    
    for (var x = 0; x < this.width; x++) {
        this.world[x] = [];
        for (var z = 0; z < this.depth; z++) {
            var clone = tile.clone();
            this.app.root.addChild(clone);
            this.world[x][z] = clone;
        }
    }

    this.timer = 0;
};

// update code called every frame
Terrain.prototype.update = function(dt) {
    this.timer += dt;

    var width = this.width;
    var depth = this.depth;
    var halfWidth = width * 0.5;
    var halfDepth = depth * 0.5;
    var sinTimer = Math.sin(this.timer) * 2;

    for (var x = 0; x < width; x++) {
        for (var z = 0; z < depth; z++) {
            var tile = this.world[x][z];
            tile.setLocalPosition(x - halfWidth, Math.cos(x / 3) * Math.sin(z / 3) * sinTimer, z - halfDepth);
        }
    }
};
