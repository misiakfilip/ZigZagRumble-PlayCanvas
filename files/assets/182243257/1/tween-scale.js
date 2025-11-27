var TweenScale = pc.createScript('tweenScale');

TweenScale.attributes.add('duration', {type: 'number', default: 1.0});
TweenScale.attributes.add('easing', {type: 'string', default: 'Linear'});
TweenScale.attributes.add('delay', {type: 'number', default: 0});
TweenScale.attributes.add('loop', {type: 'boolean', default: true});
TweenScale.attributes.add('yoyo', {type: 'boolean', default: false});
TweenScale.attributes.add('repeat', {type: 'number', default: 2});

TweenScale.prototype.initialize = function() {
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

TweenScale.prototype.reset = function () {                   
    // if we are already tweening then stop first
    if (this.tween) {
        this.tween.stop();
    }
    
    // reset our scale
    this.entity.setLocalScale(1, 1, 1);
    
    // create a new tween using our script attributes
    this.tween = this.entity.tween(this.entity.getLocalScale())
        .to(new pc.Vec3(3, 3, 3), this.duration, pc[this.easing])
        .delay(this.delay)
        .loop(this.loop)
        .yoyo(this.yoyo);
    
    // only set repeats if loop is false
    if (! this.loop)
        this.tween.repeat(this.repeat);
    
    // start the tween
    this.tween.start();
};

