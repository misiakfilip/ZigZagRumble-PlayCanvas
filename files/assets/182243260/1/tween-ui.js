var TweenUi = pc.createScript('tweenUi');

TweenUi.attributes.add('target', {type: 'entity'});

// initialize code called once per entity
TweenUi.prototype.initialize = function() {
    var gui = new dat.GUI();

    if (this.target && this.target.script) {                
    var easings = [
        "Linear",
        "QuadraticIn",
        "QuadraticOut",
        "QuadraticInOut",
        "CubicIn",
        "CubicOut",
        "CubicInOut",
        "QuarticIn",
        "QuarticOut",
        "QuarticInOut",
        "QuinticIn",
        "QuinticOut",
        "QuinticInOut",
        "SineIn",
        "SineOut",
        "SineInOut",
        "ExponentialIn",
        "ExponentialOut",
        "ExponentialInOut",
        "CircularIn",
        "CircularOut",
        "CircularInOut",
        "BackIn",
        "BackOut",
        "BackInOut",
        "BounceIn",
        "BounceOut",
        "BounceInOut",
        "ElasticIn",
        "ElasticOut",
        "ElasticInOut"            
    ];
    
    var target;
    
    if (this.target.script.tweenPosition) {
        target = this.target.script.tweenPosition;    
    } else if (this.target.script.tweenScale) {
        target = this.target.script.tweenScale;
    } else if (this.target.script.tweenRotation) {
        target = this.target.script.tweenRotation;        
    } else if (this.target.script.tweenMaterial) {
        target = this.target.script.tweenMaterial;
        var fromColor = new pc.Color();
        var toColor = new pc.Color();
        
        var colors = {
            from: [target.fromDiffuse.r * 255, target.fromDiffuse.g * 255, target.fromDiffuse.b * 255],
            to: [target.toDiffuse.r * 255, target.toDiffuse.g * 255, target.toDiffuse.b * 255]
        };
        
        gui.addColor(colors, 'from').onChange(function (value) {
            fromColor.set(value[0] / 255, value[1] / 255, value[2] / 255);
            target.fromDiffuse = fromColor;
        });
        gui.addColor(colors, 'to').onChange(function (value) {
            toColor.set(value[0] / 255, value[1] / 255, value[2] / 255);
            target.toDiffuse = toColor;
        });
    }
    
    gui.add(target, 'duration', 0.5, 2);
    gui.add(target, 'easing', easings);
    gui.add(target, 'delay', 0, 2);
    gui.add(target, 'loop', true);
    gui.add(target, 'yoyo', false);    
    gui.add(target, 'repeat', 0).step(1);    
            
    }
};