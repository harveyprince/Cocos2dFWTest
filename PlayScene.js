/**
 * Created by harveyprince on 16/8/20.
 */
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

        return true;
    },
    addSushi : function() {

        var sushi = new cc.Sprite(res.Sushi_png);
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