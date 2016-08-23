/**
 * Created by harveyprince on 16/8/19.
 */
var res = {
    BackGround_png : "res/background.png",
    Start_N_png : "res/start_N.png",
    Start_S_png : "res/start_S.png",
    Sushi_plist : "res/sushi.plist",
    Sushi_png : "res/sushi.png",
    Sushi_1_png: "res/sushi_1n/sushi_1n.png"

};
var g_resources = [
    res.BackGround_png,
    res.Start_N_png,
    res.Start_S_png,
    res.Sushi_plist,
    res.Sushi_png,
    res.Sushi_1_png
];

var StartLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var size = cc.director.getWinSize();
        // add bg
        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.addChild(this.bgSprite, 0);

        //add start menu
        var startItem = new cc.MenuItemImage(
            res.Start_N_png,
            res.Start_S_png,
            function () {
                cc.log("Menu is clicked!");
                cc.director.runScene( new PlayScene() );
            }, this);
        startItem.attr({
            x: size.width/2,
            y: size.height/2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(startItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        return true;
    }
});
var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});
window.onload = function(){
    cc.game.onStart = function(){
        //load resources
        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new StartScene());
        }, this);
    };
    cc.game.run("gameCanvas");
};
