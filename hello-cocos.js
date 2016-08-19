/**
 * Created by harveyprince on 16/8/19.
 */
window.onload = function(){
    cc.game.onStart = function(){
        //load resources
        cc.LoaderScene.preload(["HelloWorld.png"], function () {
            var MyScene = cc.Scene.extend({
                onEnter:function () {
                    this._super();
                    var size = cc.director.getWinSize();
                    var sprite = cc.Sprite.create("HelloWorld.png");
                    sprite.setPosition(size.width / 2, size.height / 2);
                    sprite.setScale(0.8);
                    this.addChild(sprite, 0);

                    var sprite1 = cc.Sprite.create("circle.png");
                    sprite1.setPosition(size.width / 2, size.height / 2);
                    sprite1.setScale(2);
                    sprite1.setColor(cc.color.RED);
                    sprite1.setOpacity(200);
                    this.addChild(sprite1, 1);

                    var label = cc.LabelTTF.create("Hello World", "Arial", 40);
                    label.setPosition(size.width / 2, size.height / 2);
                    this.addChild(label, 1);

                }
            });
            cc.director.runScene(new MyScene());
        }, this);
    };
    cc.game.run("gameCanvas");
};
