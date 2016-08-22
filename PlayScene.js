/**
 * Created by harveyprince on 16/8/20.
 */
var SushiSprite = cc.Sprite.extend({
    disappearAction:null,//消失动画
    onEnter: function(){
        cc.log('onEnter');
        this._super();
        this.addTouchEventListenser();
        this.disappearAction = this.createDisappearAction();
        this.disappearAction.retain();
    },
    onExit: function(){
        cc.log('onExit');
        this.disappearAction.release();
        this._super();
    },
    addTouchEventListenser: function(){
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches: true,
            //onTouchBegan event callback function
            onTouchBegan: function(touch, event){
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if ( cc.rectContainsPoint(target.getBoundingBox(),pos)) {
                    cc.log('touched');

                    target.stopAllActions();
                    var ac = target.disappearAction;
                    var seqAc = cc.Sequence.create(ac, cc.CallFunc.create(function(){
                        target.removeFromParent();
                    }, target));
                    target.runAction(seqAc);
                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(this.touchListener,this);
    },
    createDisappearAction: function() {
        var frames = [];
        for (var i = 0; i < 11; i++) {
            var str = "sushi_1n_"+i+".png";
            //cc.log(str);
            //sprite frames seems to have a problem
            var frame = cc.spriteFrameCache.getSpriteFrame(str);

            frames.push(frame);
        }

        var animation = new cc.Animation(frames, 0.02);
        var action = new cc.Animate(animation);

        return action;
    }
});
var PlayLayer = cc.Layer.extend({
    bgSprite:null,
    SushiSprites:null,
    ctor:function () {
        this._super();
        this.SushiSprites = [];

        var size = cc.director.getWinSize();
        // add bg
        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.addChild(this.bgSprite, 0);

        this.schedule(this.update,1,16*1024,1);

        //sprite frames seems to have a problem
        cc.spriteFrameCache.addSpriteFrames(res.Sushi_plist);

        return true;
    },
    addSushi : function() {

        var sushi = new SushiSprite(res.Sushi_1_png);
        this.SushiSprites.push(sushi);
        var size = cc.winSize;

        var x = sushi.width/2+size.width/2*cc.random0To1();
        sushi.attr({
            x: x,
            y:size.height - 30
        });

        this.addChild(sushi,5);

        var dorpAction = cc.MoveTo.create(4, cc.p(sushi.x,-30));
        sushi.runAction(dorpAction);

    },
    removeSushi : function() {
        //移除到屏幕底部的sushi
        for (var i = 0; i < this.SushiSprites.length; i++) {
            cc.log("removeSushi.........");
            if(-25 >= this.SushiSprites[i].y) {
                cc.log("==============remove:"+i);
                this.SushiSprites[i].removeFromParent();
                this.SushiSprites[i] = undefined;
                this.SushiSprites.splice(i,1);
                i= i-1;
            }
        }
    },
    update : function() {
        this.addSushi();
        this.removeSushi();
    }
});

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});