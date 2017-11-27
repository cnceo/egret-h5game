
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"bin-debug/basiclib/popup/PanelBase.js",
	"bin-debug/basiclib/scene/SceneBase.js",
	"bin-debug/views/components/ebg/EBG_Chip.js",
	"bin-debug/basiclib/animation/IAnimation.js",
	"bin-debug/basiclib/animation/Wave.js",
	"bin-debug/basiclib/popup/DialogEffect.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/basiclib/popup/PopUpManager.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/basiclib/scene/SceneeEffect.js",
	"bin-debug/basiclib/scene/SceneManager.js",
	"bin-debug/basiclib/support/Dispatcher.js",
	"bin-debug/basiclib/support/LanguageManager.js",
	"bin-debug/basiclib/support/LocalStorage.js",
	"bin-debug/basiclib/support/Native.js",
	"bin-debug/basiclib/support/SoundManager.js",
	"bin-debug/basiclib/support/StageProxy.js",
	"bin-debug/basiclib/support/Timer.js",
	"bin-debug/basiclib/support/TimerEvent.js",
	"bin-debug/basiclib/tools/HashMap.js",
	"bin-debug/basiclib/tools/MathUtils.js",
	"bin-debug/basiclib/tools/Utils.js",
	"bin-debug/control/Comm_ebg.js",
	"bin-debug/control/Comm_jsys.js",
	"bin-debug/control/Comm.js",
	"bin-debug/control/Socket.js",
	"bin-debug/model/EventNames.js",
	"bin-debug/model/GameConfig.js",
	"bin-debug/model/GameData.js",
	"bin-debug/model/LoaderData.js",
	"bin-debug/model/SceneNames.js",
	"bin-debug/model/UserData.js",
	"bin-debug/views/components/Action_Fly.js",
	"bin-debug/views/components/Chat_Item.js",
	"bin-debug/views/components/Head.js",
	"bin-debug/views/components/Start_Card.js",
	"bin-debug/views/components/Start_Cards.js",
	"bin-debug/views/components/Start_Chat.js",
	"bin-debug/views/components/Start_Up.js",
	"bin-debug/views/components/Tips.js",
	"bin-debug/views/components/ebg/EBG_BiaoQing.js",
	"bin-debug/views/components/ebg/EBG_Chat.js",
	"bin-debug/views/components/ebg/EBG_ChatSystem.js",
	"bin-debug/views/scenes/SceneWaiting.js",
	"bin-debug/views/components/ebg/EBG_ChipFly.js",
	"bin-debug/views/components/ebg/EBG_Clock.js",
	"bin-debug/views/components/ebg/EBG_Down.js",
	"bin-debug/views/components/ebg/EBG_GoldFlay.js",
	"bin-debug/views/components/ebg/EBG_Mahjong.js",
	"bin-debug/views/components/ebg/EBG_Over.js",
	"bin-debug/views/components/ebg/EBG_Result.js",
	"bin-debug/views/components/ebg/EBG_SpecialResult.js",
	"bin-debug/views/components/ebg/EBG_StartTips.js",
	"bin-debug/views/components/ebg/EBG_Table.js",
	"bin-debug/views/components/ebg/EBG_Up.js",
	"bin-debug/views/components/ebg/EBG_Zhuang.js",
	"bin-debug/views/components/jsys/JSYS_BaoZhuang.js",
	"bin-debug/views/components/jsys/JSYS_BiaoQing.js",
	"bin-debug/views/components/jsys/JSYS_Box.js",
	"bin-debug/views/components/jsys/JSYS_Btn.js",
	"bin-debug/views/components/jsys/JSYS_Chat.js",
	"bin-debug/views/components/jsys/JSYS_Choose.js",
	"bin-debug/views/components/jsys/JSYS_History.js",
	"bin-debug/views/components/jsys/JSYS_OverShow.js",
	"bin-debug/views/components/jsys/JSYS_Time.js",
	"bin-debug/views/components/jsys/JSYS_Up.js",
	"bin-debug/views/components/jsys/JSYS_Zhuang.js",
	"bin-debug/views/panel/Panel_EBG_PaiXing.js",
	"bin-debug/views/panel/Panel_EBG_ZhuangList.js",
	"bin-debug/views/panel/Panel_EBG_ZouShi.js",
	"bin-debug/views/panel/PanelCreateRoom.js",
	"bin-debug/views/panel/PanelExit.js",
	"bin-debug/views/panel/PanelSet.js",
	"bin-debug/views/panel/PanelUser.js",
	"bin-debug/views/scenes/SceneAbout.js",
	"bin-debug/views/scenes/SceneClause.js",
	"bin-debug/views/scenes/SceneCustom.js",
	"bin-debug/views/scenes/SceneGame_EBG.js",
	"bin-debug/views/scenes/SceneGame_JSYS.js",
	"bin-debug/views/scenes/SceneGuoFen.js",
	"bin-debug/views/scenes/SceneLoading.js",
	"bin-debug/views/scenes/SceneRanking.js",
	"bin-debug/views/scenes/SceneSaveBox.js",
	"bin-debug/views/scenes/SceneShop.js",
	"bin-debug/views/scenes/SceneStart.js",
	"bin-debug/Main.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "exactFit",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};