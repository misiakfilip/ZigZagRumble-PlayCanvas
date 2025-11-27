var Network = pc.createScript('network');

// static variables
Network.id = null;
Network.socket = null;
Network.initialized = false;

// initialize code called once per entity
Network.prototype.initialize = function() {
    this.players = {};
    this.player = this.app.root.findByName('Player');
    this.other = this.app.root.findByName('Other');
    
    if (!Network.socket) {
        var socket = io.connect('https://ivy-tricolor-waste.glitch.me');
        Network.socket = socket;

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

       socket.on('sceneChanged', function(data) {
        var playerId = data.playerId;
        var newScene = data.newScene;
    
        // Sprawdzenie, czy zmiana sceny dotyczy lokalnego gracza
        if (playerId === Network.id) {
        // Załaduj nową scenę tylko dla lokalnego gracza
        this.app.scenes.loadSceneHierarchy(newScene, function(err, parent) {
            if (!err) {
                console.log('Scene loaded:', newScene);
            } else {
                console.error('Scene loading error:', err);
            }
            });
            }
        });
   }

    this.initialized = true;
    console.log('Network initialized');
};

Network.prototype.initializePlayers = function(data) {
    this.players = data.players;
    Network.id = data.id;

    for (var id in this.players) {
        if (id !== Network.id) {
            this.players[id].entity = this.createPlayerEntity(this.players[id]);
        } else {
            this.players[id].entity = this.player;
            this.setupLocalPlayerCamera();
            this.setupLocalPlayerController();
        }
    }

    this.initialized = true;
    console.log('Players initialized');
};

Network.prototype.addPlayer = function(data) {
    if (!this.players) this.players = {};

    this.players[data.id] = data;
    var newPlayer = this.createPlayerEntity(data);

    // Wyłącz kamerę nowego gracza
    var newPlayerCamera = newPlayer.findByName('View');
    if (newPlayerCamera) {
        newPlayerCamera.camera.enabled = false;
    }

    this.players[data.id].entity = newPlayer;
};

Network.prototype.movePlayer = function(data) {
    if (this.initialized && this.players[data.id] && !this.players[data.id].deleted) {
        this.players[data.id].entity.rigidbody.teleport(data.x, data.y, data.z, data.rx, data.ry, data.rz);
    }
};

Network.prototype.removePlayer = function(data) {
    if (this.players[data] && this.players[data].entity) {
        this.players[data].entity.destroy();
        this.players[data].deleted = true;
    }
};

Network.prototype.createPlayerEntity = function(data) {
    var newPlayer = this.other.clone();
    newPlayer.enabled = true;
    this.other.getParent().addChild(newPlayer);

    if (data) {
        newPlayer.rigidbody.teleport(data.x, data.y, data.z, data.rx, data.ry, data.rz);
    }

    return newPlayer;
};

Network.prototype.update = function(dt) {
    this.updatePosition();
};

Network.prototype.updatePosition = function() {
    if (this.initialized) {
        var pos = this.player.getPosition();
        var rot = this.player.getEulerAngles();
        Network.socket.emit('positionUpdate', {
            id: Network.id,
            x: pos.x,
            y: pos.y,
            z: pos.z,
            rx: rot.x,
            ry: rot.y - 180,
            rz: rot.z
        });
    }
};

// Ustawienia kamery dla lokalnego gracza
Network.prototype.setupLocalPlayerCamera = function() {
    var playerCamera = this.player.findByName('View');
    if (playerCamera) {
        playerCamera.camera.enabled = true;
    }

    // Wyłącz kamery dla wszystkich innych graczy
    for (var id in this.players) {
        if (id !== Network.id) {
            var otherPlayerCamera = this.players[id].entity.findByName('View');
            if (otherPlayerCamera) {
                otherPlayerCamera.camera.enabled = false;
            }
        }
    }
};

Network.prototype.setupLocalPlayerController = function() {
    var playerCamera = this.player.findByName('View');
    if (playerCamera) {
        this.player.script.create('character-controller', {
            attributes: {
                camera: playerCamera,
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


/* Poprzednie wersje skryptu
var Network = pc.createScript('network');

// static variables
Network.id = null;
Network.socket = null;
Network.initialized = false;

// initialize code called once per entity
Network.prototype.initialize = function() {
    this.players = {};
    this.player = this.app.root.findByName('Player');
    this.other = this.app.root.findByName('Other');
    
    if (!Network.socket) {
        var socket = io.connect('https://ivy-tricolor-waste.glitch.me');
        Network.socket = socket;
    
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
   }

    this.initialized = true;
    console.log('Network initialized');
};

Network.prototype.initializePlayers = function(data) {
    this.players = data.players;
    Network.id = data.id;

    for (var id in this.players) {
        if (id != Network.id) {
            this.players[id].entity = this.createPlayerEntity(this.players[id]);
        } else {
            this.players[id].entity = this.player;
            this.setupLocalPlayerCamera();
            this.setupLocalPlayerController();
        }
    }

    this.initialized = true;
    console.log('Players initialized');
};

Network.prototype.addPlayer = function(data) {
    if (!this.players) this.players = {}; // Dodanie sprawdzania

    this.players[data.id] = data;
    this.players[data.id].entity = this.createPlayerEntity(data);
};

Network.prototype.movePlayer = function(data) {
    if (this.initialized && this.players[data.id] && !this.players[data.id].deleted) {
        this.players[data.id].entity.rigidbody.teleport(data.x, data.y, data.z, data.rx, data.ry, data.rz);
    }
};

Network.prototype.removePlayer = function(data) {
    if (this.players[data] && this.players[data].entity) {
        this.players[data].entity.destroy();
        this.players[data].deleted = true;
    }
};

Network.prototype.createPlayerEntity = function(data) {
    var newPlayer = this.other.clone();
    newPlayer.enabled = true;
    this.other.getParent().addChild(newPlayer);

    if (data) {
        newPlayer.rigidbody.teleport(data.x, data.y, data.z, data.rx, data.ry, data.rz);
    }

    // if (data.id === Network.id) {
    //     this.setupLocalPlayerCamera();
    //     this.setupLocalPlayerController();
    // }
    var otherCamera = newPlayer.findByName('View');
    if (otherCamera) {
        otherCamera.camera.enabled = false;
    }

    return newPlayer;
};

Network.prototype.update = function(dt) {
    this.updatePosition();
};

Network.prototype.updatePosition = function() {
    if (this.initialized) {
        var pos = this.player.getPosition();
        var rot = this.player.getEulerAngles();
        Network.socket.emit('positionUpdate', {
            id: Network.id,
            x: pos.x,
            y: pos.y,
            z: pos.z,
            rx: rot.x,
            ry: rot.y, 
            rz: rot.z
        });
    }
};

Network.prototype.loadScene = function(sceneName) {
    var self = this;
    this.app.scenes.loadSceneHierarchy(sceneName, function(err, parent) {
        if (!err) {
            console.log('Scene loaded:', sceneName);

            // Usuwanie starych graczy
            for (var id in self.players) {
                if (self.players[id].entity) {
                    self.players[id].entity.destroy();
                }
            }

            // Resetowanie players
            self.players = {};

            var newNetwork = self.app.root.findByName('Network');
            if (newNetwork) {
                newNetwork.script.network.initialize();

                // Aktywowanie obiektu Player w nowej scenie
                var newPlayer = newNetwork.script.network.player;
                newPlayer.enabled = true;

                // Ustawianie gracza jako głównego gracza
                newNetwork.script.network.players[Network.id] = {
                    id: Network.id,
                    entity: newPlayer
                };
                newNetwork.script.network.setupLocalPlayerCamera();
                newNetwork.script.network.setupLocalPlayerController();
            } else {
                console.error('Network entity not found in the new scene.');
            }
        } else {
            console.error('Scene loading error:', err);
        }
    });
};
Network.prototype.requestSceneChange = function(newScene) {
    Network.socket.emit('changeScene', newScene);
};


Network.prototype.setupLocalPlayerCamera = function() {
    
    var playerCamera = this.player.findByName('View');
    if (playerCamera) {
        playerCamera.camera.enabled = true;
    }    

     for (var id in this.players) {
        if (id !== Network.id) {
            var otherPlayerCamera = this.players[id].entity.findByName('View');
            if (otherPlayerCamera) {
                otherPlayerCamera.camera.enabled = false;
            }
        }
    }  
};

Network.prototype.setupLocalPlayerController = function() {
    var playerCamera = this.player.findByName('View');
    if (playerCamera) {
        this.player.script.create('character-controller', {
            attributes: {
                camera: playerCamera,
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

*/

/*
var Network = pc.createScript('network');

// static variables
Network.id = null;
Network.socket = null;
Network.initialized = false;

// initialize code called once per entity
Network.prototype.initialize = function() {
    this.players = {};
    this.player = this.app.root.findByName('Player');
    this.other = this.app.root.findByName('Other');
    
    if (!Network.socket) {
        var socket = io.connect('https://ivy-tricolor-waste.glitch.me');
        Network.socket = socket;

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
    }

    this.initialized = true;
    console.log('Network initialized');
};

Network.prototype.initializePlayers = function(data) {
    this.players = data.players;
    Network.id = data.id;

    for (var id in this.players) {
        if (id !== Network.id) {
            this.players[id].entity = this.createPlayerEntity(this.players[id]);
        } else {
            this.players[id].entity = this.player;
            this.setupLocalPlayerCamera();
            this.setupLocalPlayerController();
        }
    }

    this.initialized = true;
    console.log('Players initialized');
};

Network.prototype.addPlayer = function(data) {
    if (!this.players) this.players = {};

    this.players[data.id] = data;
    var newPlayer = this.createPlayerEntity(data);

    // Wyłącz kamerę nowego gracza
    var newPlayerCamera = newPlayer.findByName('View');
    if (newPlayerCamera) {
        newPlayerCamera.camera.enabled = false;
    }

    this.players[data.id].entity = newPlayer;
};

Network.prototype.movePlayer = function(data) {
    if (this.initialized && this.players[data.id] && !this.players[data.id].deleted) {
        this.players[data.id].entity.rigidbody.teleport(data.x, data.y, data.z, data.rx, data.ry, data.rz);
    }
};

Network.prototype.removePlayer = function(data) {
    if (this.players[data] && this.players[data].entity) {
        this.players[data].entity.destroy();
        this.players[data].deleted = true;
    }
};

Network.prototype.createPlayerEntity = function(data) {
    var newPlayer = this.other.clone();
    newPlayer.enabled = true;
    this.other.getParent().addChild(newPlayer);

    if (data) {
        newPlayer.rigidbody.teleport(data.x, data.y, data.z, data.rx, data.ry, data.rz);
    }

    return newPlayer;
};

Network.prototype.update = function(dt) {
    this.updatePosition();
};

Network.prototype.updatePosition = function() {
    if (this.initialized) {
        var pos = this.player.getPosition();
        var rot = this.player.getEulerAngles();
        Network.socket.emit('positionUpdate', {
            id: Network.id,
            x: pos.x,
            y: pos.y,
            z: pos.z,
            rx: rot.x,
            ry: rot.y - 180,
            rz: rot.z
        });
    }
};

Network.prototype.loadScene = function(sceneName) {
    var self = this;
    this.app.scenes.loadSceneHierarchy(sceneName, function(err, parent) {
        if (!err) {
            console.log('Scene loaded:', sceneName);

            // Usuwanie starych graczy z poprzedniej sceny
            for (var id in self.players) {
                if (self.players[id].entity && self.players[id].entity !== self.player) {
                    self.players[id].entity.destroy();
                }
            }

            // Resetowanie players i dodanie lokalnego gracza
            self.players = {};
            self.players[Network.id] = { id: Network.id, entity: self.player };

            var newNetwork = self.app.root.findByName('Network');
            if (newNetwork) {
                newNetwork.script.network.initialize();

                // Aktywowanie obiektu Player w nowej scenie
                var newPlayer = newNetwork.script.network.player;
                newPlayer.enabled = true;

                // Ustawianie gracza jako głównego gracza
                if (newNetwork.script.network.players[Network.id]) {
                    newNetwork.script.network.players[Network.id].entity = newPlayer;
                    newNetwork.script.network.setupLocalPlayerCamera();
                    newNetwork.script.network.setupLocalPlayerController();
                } else {
                    console.error('Local player entity not found in the new scene.');
                }
            } else {
                console.error('Network entity not found in the new scene.');
            }
        } else {
            console.error('Scene loading error:', err);
        }
    });
};

Network.prototype.requestSceneChange = function(newScene) {
    Network.socket.emit('changeScene', newScene);
};

// Ustawienia kamery dla lokalnego gracza
Network.prototype.setupLocalPlayerCamera = function() {
    var playerCamera = this.player.findByName('View');
    if (playerCamera) {
        playerCamera.camera.enabled = true;
    }

    // Wyłącz kamery dla wszystkich innych graczy
    for (var id in this.players) {
        if (id !== Network.id) {
            var otherPlayerCamera = this.players[id].entity.findByName('View');
            if (otherPlayerCamera) {
                otherPlayerCamera.camera.enabled = false;
            }
        }
    }
};

Network.prototype.setupLocalPlayerController = function() {
    var playerCamera = this.player.findByName('View');
    if (playerCamera) {
        this.player.script.create('character-controller', {
            attributes: {
                camera: playerCamera,
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

*/