var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *
 * @二八杠-结束界面
 *
 */
var EBG_Over = (function (_super) {
    __extends(EBG_Over, _super);
    function EBG_Over() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.img_name = [];
        _this.txt_yazhu = [];
        _this.img_star = [];
        _this.com_star = [];
        _this._tween_alpha = [];
        _this._tween_scaleX = [];
        _this._tween_scaleY = [];
        _this._tween_rotation = [];
        _this._tween_scaleX_title = null;
        _this._tween_scaleY_title = null;
        _this._tween_rotation_light = null;
        return _this;
    }
    //初始化
    EBG_Over.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //隐藏界面
        this.visible = false;
        //数据赋值
        for (var i = 0; i < 3; i++) {
            //定义变量
            var img = this["img_name" + i];
            var txt = this["txt_yazhu" + i];
            //数据赋值
            this.img_name[i] = img;
            this.txt_yazhu[i] = txt;
        }
        //星星数据赋值
        for (var j = 0; j < 5; j++) {
            //定义变量
            var now_img_star = this["img_star" + j];
            //数据赋值
            this.img_star[j] = now_img_star;
            this._tween_alpha[j] = null;
            this._tween_scaleX[j] = null;
            this._tween_scaleY[j] = null;
        }
        for (var k = 0; k < 4; k++) {
            //定义变量
            var now_com_star = this["com_star" + k];
            //数据赋值
            this.com_star[k] = now_com_star;
            this._tween_rotation[k] = null;
        }
        //注册事件
        basic.Dispatcher.addListener(EventNames.EBG_SHOWOVER, this.onShowOver, this);
        basic.Dispatcher.addListener(EventNames.EBG_HIDEOVER, this.onHideOver, this);
    };
    //显示结算界面
    EBG_Over.prototype.onShowOver = function (e) {
        //定义变量
        var win_gold = 0;
        //显示界面
        this.visible = true;
        //判断显示界面
        if (GameData.Game_Zhuang_Id == UserData.User_Id) {
            //显示文本
            for (var i1 = 0; i1 < 3; i1++) {
                //判断赋值
                if (GameData.EBG_Poker_Table_IsWin[i1] == true) {
                    win_gold -= GameData.EBG_YaZhu_Total[i1];
                    this.txt_yazhu[i1].text = "-" + GameData.assShowGold(GameData.EBG_YaZhu_Total[i1]);
                }
                else {
                    win_gold += GameData.EBG_YaZhu_Total[i1];
                    this.txt_yazhu[i1].text = "+" + GameData.assShowGold(GameData.EBG_YaZhu_Total[i1]);
                }
            }
            //显示文本
            if (win_gold == 0) {
                this.txt_total.text = "0";
            }
            else if (win_gold > 0) {
                win_gold = win_gold * 0.99;
                this.txt_total.text = "+" + GameData.assShowGold(win_gold);
            }
            else {
                this.txt_total.text = "-" + GameData.assShowGold(-win_gold);
            }
            //判断显示胜负
            if (GameData.EBG_Poker_Table_IsWin[0] == false) {
                this.img_name[0].source = "txt_ebg_qm_ch_png";
            }
            else {
                this.img_name[0].source = "txt_ebg_qm_hui_ch_png";
            }
            if (GameData.EBG_Poker_Table_IsWin[1] == false) {
                this.img_name[1].source = "txt_ebg_cm_ch_png";
            }
            else {
                this.img_name[1].source = "txt_ebg_cm_hui_ch_png";
            }
            if (GameData.EBG_Poker_Table_IsWin[2] == false) {
                this.img_name[2].source = "txt_ebg_wm_ch_png";
            }
            else {
                this.img_name[2].source = "txt_ebg_wm_hui_ch_png";
            }
        }
        else {
            //显示文本
            for (var i2 = 0; i2 < 3; i2++) {
                //判断赋值
                if (GameData.EBG_Poker_Table_IsWin[i2] == true) {
                    win_gold += GameData.EBG_YaZhu_User[i2];
                    this.txt_yazhu[i2].text = "+" + GameData.assShowGold(GameData.EBG_YaZhu_User[i2]);
                }
                else {
                    win_gold -= GameData.EBG_YaZhu_User[i2];
                    this.txt_yazhu[i2].text = "-" + GameData.assShowGold(GameData.EBG_YaZhu_User[i2]);
                }
            }
            //显示文本
            if (win_gold == 0) {
                this.txt_total.text = "0";
            }
            else if (win_gold > 0) {
                this.txt_total.text = "+" + GameData.assShowGold(win_gold);
            }
            else {
                this.txt_total.text = "-" + GameData.assShowGold(-win_gold);
            }
            //判断显示胜负
            if (GameData.EBG_Poker_Table_IsWin[0] == true) {
                this.img_name[0].source = "txt_ebg_qm_ch_png";
            }
            else {
                this.img_name[0].source = "txt_ebg_qm_hui_ch_png";
            }
            if (GameData.EBG_Poker_Table_IsWin[1] == true) {
                this.img_name[1].source = "txt_ebg_cm_ch_png";
            }
            else {
                this.img_name[1].source = "txt_ebg_cm_hui_ch_png";
            }
            if (GameData.EBG_Poker_Table_IsWin[2] == true) {
                this.img_name[2].source = "txt_ebg_wm_ch_png";
            }
            else {
                this.img_name[2].source = "txt_ebg_wm_hui_ch_png";
            }
        }
        //判断播放是声音
        if (win_gold < 0) {
            //播放声音
            this.g_back.visible = false;
            basic.SoundManager.instance.playEffect("sound_g_fail_mp3");
        }
        else {
            //播放声音
            this.g_back.visible = true;
            basic.SoundManager.instance.playEffect("sound_g_win" + Math.floor(Math.random() * 2 + 1).toString() + "_mp3");
        }
        //开始动画
        this.startAction();
    };
    //开始动画
    EBG_Over.prototype.startAction = function () {
        var _this = this;
        //背景动画
        this.img_title.scaleX = 4;
        this.img_title.scaleY = 4;
        this.g_light.visible = false;
        this._tween_scaleX_title = egret.Tween.get(this.img_title).
            to({ scaleX: 1.2 }, 400);
        this._tween_scaleY_title = egret.Tween.get(this.img_title).
            to({ scaleY: 1.2 }, 400).call(function () {
            _this.g_light.visible = true;
            _this._tween_rotation_light = egret.Tween.get(_this.g_light, { loop: true }).
                to({ rotation: 360 }, 5000);
        });
        //显示星星动画
        for (var i = 0; i < 4; i++) {
            //显示动画
            this.showStarAction1(i);
        }
        for (var j = 0; j < 5; j++) {
            //显示动画
            this.showStarAction2(j);
        }
    };
    //显示星星动画1
    EBG_Over.prototype.showStarAction1 = function (_num) {
        //定义变量
        var now_rotation = Math.floor(Math.random() * 360);
        //显示的那个话
        this.com_star[_num].rotation = now_rotation;
        this._tween_rotation[_num] = egret.Tween.get(this.com_star[_num], { loop: true }).
            to({ rotation: now_rotation + 360 }, 3000);
    };
    //星星动画
    EBG_Over.prototype.showStarAction2 = function (_num) {
        //定义变量
        var play_time = 800;
        var start_alpha = Math.random() * 1;
        //定义动画
        this.img_star[_num].alpha = start_alpha;
        this.img_star[_num].scaleX = start_alpha;
        this.img_star[_num].scaleY = start_alpha;
        this._tween_alpha[_num] = egret.Tween.get(this.img_star[_num], { loop: true }).
            to({ alpha: 1 }, play_time * (1 - start_alpha)).
            to({ alpha: 0 }, play_time).
            to({ alpha: start_alpha }, play_time * start_alpha);
        this._tween_scaleX[_num] = egret.Tween.get(this.img_star[_num], { loop: true }).
            to({ scaleX: 1 }, play_time * (1 - start_alpha)).
            to({ scaleX: 0 }, play_time).
            to({ scaleX: start_alpha }, play_time * start_alpha);
        this._tween_scaleY[_num] = egret.Tween.get(this.img_star[_num], { loop: true }).
            to({ scaleY: 1 }, play_time * (1 - start_alpha)).
            to({ scaleY: 0 }, play_time).
            to({ scaleY: start_alpha }, play_time * start_alpha);
    };
    //停止动画
    EBG_Over.prototype.stopAction = function () {
        //判断停止
        if (this._tween_rotation_light) {
            this._tween_rotation_light.setPaused(true);
            this._tween_rotation_light = null;
        }
        if (this._tween_scaleX_title) {
            this._tween_scaleX_title.setPaused(true);
            this._tween_scaleX_title = null;
        }
        if (this._tween_scaleY_title) {
            this._tween_scaleY_title.setPaused(true);
            this._tween_scaleY_title = null;
        }
        for (var i = 0; i < 4; i++) {
            if (this._tween_rotation[i]) {
                this._tween_rotation[i].setPaused(true);
                this._tween_rotation[i] = null;
            }
        }
        for (var j = 0; j < 5; j++) {
            if (this._tween_alpha[j]) {
                this._tween_alpha[j].setPaused(true);
                this._tween_alpha[j] = null;
            }
            if (this._tween_scaleX[j]) {
                this._tween_scaleX[j].setPaused(true);
                this._tween_scaleX[j] = null;
            }
            if (this._tween_scaleY[j]) {
                this._tween_scaleY[j].setPaused(true);
                this._tween_scaleY[j] = null;
            }
        }
    };
    //影藏结算界面
    EBG_Over.prototype.onHideOver = function (e) {
        //隐藏界面
        this.visible = false;
        //停止动画
        this.stopAction();
    };
    return EBG_Over;
}(eui.Component));
__reflect(EBG_Over.prototype, "EBG_Over");
//# sourceMappingURL=EBG_Over.js.map