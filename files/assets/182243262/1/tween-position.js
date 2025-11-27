var TweenPosition = pc.createScript('tweenPosition');

TweenPosition.attributes.add('duration', {type: 'number', default: 1.0});
TweenPosition.attributes.add('easing', {type: 'string', default: 'Linear'});
TweenPosition.attributes.add('delay', {type: 'number', default: 0});
TweenPosition.attributes.add('loop', {type: 'boolean', default: true});
TweenPosition.attributes.add('yoyo', {type: 'boolean', default: false});
TweenPosition.attributes.add('repeat', {type: 'number', default: 2});

TweenPosition.prototype.initialize = function() {
    // create our tween
    this.reset();
    
    // handle attribute changes
    this.on('attr:duration', function (value) {
        this.tween.duration = value;
    }, this);
    
    this.on('attr:easing', this.reset, this);
    this.on('attr:delay', this.reset, this);    
    this.on('attr:loop', this.reset, this);    
    this.on('attr:yoyo', this.reset, this);    
    this.on('attr:repeat', this.reset, this);
};

TweenPosition.prototype.reset = function () {                   
    // if we are already tweening then stop first
    if (this.tween) {
        this.tween.stop();
    }
    
    // reset our position
    this.entity.setLocalPosition(10, 0, 0);
    
    // create a new tween using our script attributes
    this.tween = this.entity.tween(this.entity.getLocalPosition())
        .to(new pc.Vec3(4, 0, 0), this.duration, pc[this.easing])
        .delay(this.delay)
        .loop(this.loop)
        .yoyo(this.yoyo);
    
    // only set repeats if loop is false
    if (! this.loop)
        this.tween.repeat(this.repeat);
    
    // start the tween
    this.tween.start();
};

