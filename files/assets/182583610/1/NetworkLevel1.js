var NetworkLevel1 = pc.createScript('network');

// static variables
NetworkLevel1.id = null;
NetworkLevel1.socket = null;

// initialize code called once per entity
NetworkLevel1.prototype.initialize = function() {
    this.player = this.app.root.findByName('Player');
    this.other = this.app.root.findByName('Other');

    var socket = io.connect('https://ivy-tricolor-waste.glitch.me');
    NetworkLevel1.socket = socket;

    socket.emit('initialize');

    var self = this;
    socket.on('playerData', function (data) {
        self.initializePlayers(data);
    });

    socket.on('playerJoined', function (data) {
        self.addPlayer(data);
    });

    socket.on('playerMoved', function (data) {
        self.movePlayer(data);
    });

    socket.on('killPlayer', function (data) {
        self.removePlayer(data);
    });

    socket.on('sceneChanged', function (newScene) {
        self.loadScene(newScene);
    });
};

NetworkLevel1.prototype.initializePlayers = function(data) {
    this.players = data.players;
    NetworkLevel1.id = data.id;

    for (var id in this.players) {
        if (id != NetworkLevel1.id) {
            this.players[id].entity = this.createPlayerEntity(this.players[id]);
        } else {
            this.players[id].entity = this.player;
            this.setupLocalPlayerCamera();
        }
    }

    this.initialized = true;
    console.log('initialized');
};

NetworkLevel1.prototype.addPlayer = function(data) {
    this.players[data.id] = data;
    this.players[data.id].entity = this.createPlayerEntity(data);
};

NetworkLevel1.prototype.movePlayer = function(data) {
    if (this.initialized && !this.players[data.id].deleted) {
        this.players[data.id].entity.rigidbody.teleport(data.x, data.y, data.z, data.rx, data.ry, data.rz);
    }
};

NetworkLevel1.prototype.removePlayer = function(data) {
    if (this.players[data].entity) {
        this.players[data].entity.destroy();
        this.players[data].deleted = true;
    }
};

NetworkLevel1.prototype.createPlayerEntity = function(data) {
    var newPlayer = this.other.clone();
    newPlayer.enabled = true;

    var parent = this.other.getParent();
    if (parent) {
        parent.addChild(newPlayer);

        if (data) {
            newPlayer.rigidbody.teleport(data.x, data.y, data.z, data.rx, data.ry, data.rz);
        }

        if (data.id === NetworkLevel1.id) {
            this.setupLocalPlayerCamera();
            this.setupLocalPlayerController();
        }

        return newPlayer;
    } else {
        console.error("Parent is null. Cannot add new player entity.");
        return null;
    }
};

NetworkLevel1.prototype.updatePosition = function() {
    if (this.initialized) {
        var pos = this.player.getPosition();
        var rot = this.player.getEulerAngles();
        NetworkLevel1.socket.emit('positionUpdate', {
            id: NetworkLevel1.id,
            x: pos.x,
            y: pos.y,
            z: pos.z,
            rx: rot.x,
            ry: rot.y,
            rz: rot.z
        });
    }
};

NetworkLevel1.prototype.loadScene = function(sceneName) {
    var self = this;
    this.app.scenes.loadSceneHierarchy(sceneName, (err, parent) => {
        if (!err) {
            console.log('Scene loaded:', sceneName);
            // Initialize Network again for the new scene
            var newNetwork = parent.findByName('Network');
            if (newNetwork) {
                newNetwork.script.network.initialize();
            } else {
                console.error('Network entity not found in the new scene.');
            }
        } else {
            console.error('Scene loading error:', err);
        }
    });
};

NetworkLevel1.prototype.requestSceneChange = function(newScene) {
    NetworkLevel1.socket.emit('changeScene', newScene);
};

NetworkLevel1.prototype.setupLocalPlayerCamera = function() {
    var camera = this.player.findByName('View');
    if (camera) {
        camera.camera.enabled = true;
    }
};

NetworkLevel1.prototype.setupLocalPlayerController = function() {
    var camera = this.player.findByName('View');
    if (camera) {
        this.player.script.create('characterController', {
            attributes: {
                camera: camera,
                lookSens: 0.08,
                speedGround: 50,
                speedAir: 5,
                sprintMult: 1.5,
                velocityDampingGround: 0.99,
                velocityDampingAir: 0.99925,
                jumpForce: 600
            }
        });
    }
};
// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// NetworkLevel1.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/