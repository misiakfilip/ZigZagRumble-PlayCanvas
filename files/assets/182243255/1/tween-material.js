var TweenMaterial = pc.createScript('tweenMaterial');

TweenMaterial.attributes.add('fromDiffuse', { type: 'rgb' });
TweenMaterial.attributes.add('toDiffuse', { type: 'rgb' });

TweenMaterial.attributes.add('duration', { type: 'number', default: 1.0 });
TweenMaterial.attributes.add('easing', { type: 'string', default: 'Linear' });
TweenMaterial.attributes.add('delay', { type: 'number', default: 0 });
TweenMaterial.attributes.add('loop', { type: 'boolean', default: true });
TweenMaterial.attributes.add('yoyo', { type: 'boolean', default: false });
TweenMaterial.attributes.add('repeat', { type: 'number', default: 2 });

TweenMaterial.prototype.initialize = function () {
    // have an initial copy of our material
    if (this.entity && this.entity.render && this.entity.render.material) {
        this.initialMaterial = this.entity.render.material.clone();
    } else {
        console.error("Nie można uzyskać dostępu do materiału renderującego");
    }

    // create our tween
    this.reset();

    // handle attribute changes

    this.on('attr:fromDiffuse', this.reset, this);
    this.on('attr:toDiffuse', this.reset, this);

    this.on('attr:duration', function (value) {
        this.tween.duration = value;
    }, this);

    this.on('attr:easing', this.reset, this);
    this.on('attr:delay', this.reset, this);
    this.on('attr:loop', this.reset, this);
    this.on('attr:yoyo', this.reset, this);
    this.on('attr:repeat', this.reset, this);
};

TweenMaterial.prototype.reset = function () {
    // if we are already tweening then stop first
    if (this.tween) {
        this.tween.stop();
    }

    this.tweenedProperties = {
        diffuse: this.fromDiffuse.clone()
    };

    // reset our material
    this.entity.render.material = this.initialMaterial.clone();
    this.entity.render.material.diffuse = this.fromDiffuse;
    this.entity.render.material.update();

    // create a new tween using our script attributes
    this.tween = this.app.tween(this.tweenedProperties.diffuse)
        .to(this.toDiffuse, this.duration, pc[this.easing])
        .delay(this.delay)
        .loop(this.loop)
        .yoyo(this.yoyo)
        .onUpdate(function () {
            // update diffuse on each tween update
             if (this.entity && this.entity.render && this.entity.render.material) {
                this.entity.render.material.diffuse = this.tweenedProperties.diffuse;
                this.entity.render.material.update();
            }
            //this.entity.render.material.diffuse = this.tweenedProperties.diffuse;
            //this.entity.render.material.update();
        }.bind(this));

    // only set repeats if loop is false
    if (!this.loop)
        this.tween.repeat(this.repeat);

    // start the tween
    this.tween.start();
};

