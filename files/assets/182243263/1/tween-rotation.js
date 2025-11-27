var TweenRotation = pc.createScript('tweenRotation');

TweenRotation.attributes.add('duration', {type: 'number', default: 1.0});
TweenRotation.attributes.add('easing', {type: 'string', default: 'Linear'});
TweenRotation.attributes.add('delay', {type: 'number', default: 0});
TweenRotation.attributes.add('loop', {type: 'boolean', default: true});
TweenRotation.attributes.add('yoyo', {type: 'boolean', default: false});
TweenRotation.attributes.add('repeat', {type: 'number', default: 2});

TweenRotation.prototype.initialize = function() {
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

TweenRotation.prototype.reset = function () {                   
    // if we are already tweening then stop first
    if (this.tween) {
        this.tween.stop();
    }
    
    // reset our rotation
    this.entity.setLocalEulerAngles(0, 0, 0);
    
    // create a new tween using our script attributes
    this.tween = this.entity.tween(this.entity.getLocalEulerAngles())
        .rotate(new pc.Vec3(180, 0, 90), this.duration, pc[this.easing])
        .delay(this.delay)
        .loop(this.loop)
        .yoyo(this.yoyo);
    
    // only set repeats if loop is false
    if (! this.loop)
        this.tween.repeat(this.repeat);
    
    // start the tween
    this.tween.start();
};

