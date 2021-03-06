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
 * @夜市场-押注
 *
 */
var YSC_YaZhu = (function (_super) {
    __extends(YSC_YaZhu, _super);
    function YSC_YaZhu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //定义变量
        _this.btn_ya = [];
        _this.btn_qiang = [];
        _this.txt_yazhu_user = [];
        _this.txt_yazhu_total = [];
        return _this;
    }
    //初始化
    YSC_YaZhu.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 0; i < 4; i++) {
            //定义变量
            var ya = this["btn_ya" + i];
            var qiang = this["btn_qiang" + i];
            var yazhu_user = this["txt_yazhu_user" + i];
            var yazhu_total = this["txt_yazhu_total" + i];
            //数据赋值
            this.btn_ya[i] = ya;
            this.btn_qiang[i] = qiang;
            this.txt_yazhu_user[i] = yazhu_user;
            this.txt_yazhu_total[i] = yazhu_total;
            //注册按钮
            this.btn_ya[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYaZhuBtn, this);
            this.btn_qiang[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQiangZhuBtn, this);
        }
        //定义事件
        basic.Dispatcher.addListener(EventNames.YSC_REMOVEBTN, this.onRemoveBtn, this);
        basic.Dispatcher.addListener(EventNames.YSC_REGISTERBTN, this.onRegisterBtn, this);
        basic.Dispatcher.addListener(EventNames.YSC_USERYAZHU, this.onShowUserYaZhu, this);
        basic.Dispatcher.addListener(EventNames.YSC_CHANGEYAZHU, this.onShowTotalYaZhu, this);
        basic.Dispatcher.addListener(EventNames.YSC_USERQIANGZHU, this.onShowUserQiangZhu, this);
    };
    //初始化界面
    YSC_YaZhu.prototype.info = function (_data) {
        //数据初始化
        GameData.YSC_Now_YaZhu_User = [0, 0, 0, 0];
        GameData.YSC_Now_QiangZhu_User = [0, 0, 0, 0];
        GameData.YSC_YaZhu_User = _data.betGolds;
        GameData.YSC_YaZhu_Total = _data.totalBetGolds;
        GameData.YSC_QiangZhu_User = _data.grabGolds;
        GameData.YSC_QiangZhu_Total = _data.totalGrabGolds;
        GameData.YSC_Now_YaZhuDetail_User = [[], [], [], []];
        GameData.YSC_Now_QiangZhuDetail_User = [[], [], [], []];
        //显示界面
        this.showTotalYaZhu();
        //显示总金币
        basic.Dispatcher.dispatch(EventNames.YSC_SHOWGOLD, { "gold": UserData.User_Gold - GameData.YSC_YaZhu_UserTotal + GameData.YSC_QiangZhu_UserTotal });
    };
    //清除界面
    YSC_YaZhu.prototype.clean = function () {
        //数据初始化
        GameData.YSC_YaZhu_User = [0, 0, 0, 0];
        GameData.YSC_YaZhu_Total = [0, 0, 0, 0];
        GameData.YSC_QiangZhu_User = [0, 0, 0, 0];
        GameData.YSC_QiangZhu_Total = [0, 0, 0, 0];
        GameData.YSC_Now_YaZhu_User = [0, 0, 0, 0];
        GameData.YSC_Now_QiangZhu_User = [0, 0, 0, 0];
        GameData.YSC_Now_YaZhuDetail_User = [[], [], [], []];
        GameData.YSC_Now_QiangZhuDetail_User = [[], [], [], []];
        //显示界面
        this.showTotalYaZhu();
        //显示总金币
        basic.Dispatcher.dispatch(EventNames.YSC_SHOWGOLD, { "gold": UserData.User_Gold });
    };
    //核对数据
    YSC_YaZhu.prototype.checkData = function (_data) {
        //定义变量
        var is_right = true;
        //数据赋值
        for (var i = 0; i < 4; i++) {
            if (_data.betGolds[i] != GameData.YSC_YaZhu_User[i]) {
                GameData.YSC_YaZhu_User[i] = _data.betGolds[i];
                is_right = false;
            }
            if (_data.grabGolds[i] != GameData.YSC_QiangZhu_User[i]) {
                GameData.YSC_QiangZhu_User[i] = _data.grabGolds[i];
                is_right = false;
            }
            if (_data.totalBetGolds[i] != GameData.YSC_YaZhu_Total[i]) {
                GameData.YSC_YaZhu_Total[i] = _data.totalBetGolds[i];
                is_right = false;
            }
            if (_data.totalGrabGolds[i] != GameData.YSC_QiangZhu_Total[i]) {
                GameData.YSC_QiangZhu_Total[i] = _data.totalGrabGolds[i];
                is_right = false;
            }
        }
        //判断显示
        if (is_right == false) {
            //数据赋值
            GameData.YSC_YaZhu_UserTotal = 0;
            GameData.YSC_QiangZhu_UserTotal = 0;
            for (var j = 0; j < 4; j++) {
                GameData.YSC_YaZhu_UserTotal += GameData.YSC_YaZhu_User[j];
                GameData.YSC_QiangZhu_UserTotal += GameData.YSC_QiangZhu_User[j];
            }
            //显示界面
            this.showTotalYaZhu();
            //显示总金币
            basic.Dispatcher.dispatch(EventNames.YSC_SHOWGOLD, {
                "gold": UserData.User_Gold - GameData.YSC_YaZhu_UserTotal + GameData.YSC_QiangZhu_UserTotal
            });
            //显示提示
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "tips": "部分压住失败，请以实际显示为准" });
        }
    };
    //注销按钮
    YSC_YaZhu.prototype.onRemoveBtn = function (e) {
        for (var i = 0; i < 4; i++) {
            this.btn_ya[i].enabled = false;
            this.btn_qiang[i].enabled = false;
        }
    };
    //注册按钮
    YSC_YaZhu.prototype.onRegisterBtn = function (e) {
        for (var i = 0; i < 4; i++) {
            this.btn_ya[i].enabled = true;
            this.btn_qiang[i].enabled = true;
        }
    };
    //显示用户压住
    YSC_YaZhu.prototype.onShowTotalYaZhu = function (e) {
        //定义变量
        var is_yazhu = false;
        //数据赋值
        GameData.YSC_YaZhu_User = e.data.betGolds;
        GameData.YSC_YaZhu_Total = e.data.totalBetGolds;
        GameData.YSC_QiangZhu_User = e.data.grabGolds;
        GameData.YSC_QiangZhu_Total = e.data.totalGrabGolds;
        for (var i = 0; i < 4; i++) {
            //定义变量
            var other_yazhu = [];
            var other_qiangzhu = [];
            var user_yazhu = GameData.YSC_Now_YaZhuDetail_User[i];
            var user_qiangzhu = GameData.YSC_Now_QiangZhuDetail_User[i];
            //数据赋值
            for (var k1 = 0; k1 < e.data.newBetGoldDetails[i].length; k1++) {
                //定义变量
                var juge_yazhu = true;
                //数据赋值
                for (var p1 = 0; p1 < user_yazhu.length; p1++) {
                    if (e.data.newBetGoldDetails[i][k1] == user_yazhu[p1]) {
                        //数据赋值
                        juge_yazhu = false;
                        user_yazhu[p1] = -1;
                        break;
                    }
                }
                //判断赋值
                if (juge_yazhu == true) {
                    other_yazhu[other_yazhu.length] = e.data.newBetGoldDetails[i][k1];
                }
            }
            for (var k2 = 0; k2 < e.data.newGrabGoldDetails[i].length; k2++) {
                //定义变量
                var juge_qiangzhu = true;
                //数据赋值
                for (var p2 = 0; p2 < user_qiangzhu.length; p2++) {
                    if (e.data.newGrabGoldDetails[i][k2] == user_qiangzhu[p2]) {
                        //数据赋值
                        juge_qiangzhu = false;
                        user_qiangzhu[p1] = -1;
                        break;
                    }
                }
                //判断赋值
                if (juge_qiangzhu == true) {
                    other_qiangzhu[other_qiangzhu.length] = e.data.newGrabGoldDetails[i][k2];
                }
            }
            //显示其他压注动画
            for (var j1 = 0; j1 < other_yazhu.length; j1++) {
                basic.Dispatcher.dispatch(EventNames.YSC_YAZHU_OTHER, {
                    "pos": i,
                    "gold": other_yazhu[j1]
                });
            }
            //显示其他抢注动画
            for (var j2 = 0; j2 < other_qiangzhu.length; j2++) {
                basic.Dispatcher.dispatch(EventNames.YSC_QIANGZHU_OTHER, {
                    "pos": i,
                    "gold": other_qiangzhu[j2]
                });
            }
            //判断赋值
            if (other_yazhu.length > 0) {
                is_yazhu = true;
            }
        }
        //判断显示声音
        if (is_yazhu == true) {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_yazhu_mp3");
        }
        //数据清空
        GameData.YSC_Now_YaZhu_User = [0, 0, 0, 0];
        GameData.YSC_Now_QiangZhu_User = [0, 0, 0, 0];
        GameData.YSC_Now_YaZhuDetail_User = [[], [], [], []];
        GameData.YSC_Now_QiangZhuDetail_User = [[], [], [], []];
        //显示界面
        this.showTotalYaZhu();
    };
    //显示总压住
    YSC_YaZhu.prototype.showTotalYaZhu = function () {
        //显示界面
        GameData.YSC_YaZhu_UserTotal = 0;
        GameData.YSC_QiangZhu_UserTotal = 0;
        for (var i = 0; i < 4; i++) {
            //定义变量
            var yazhu_user = GameData.YSC_YaZhu_User[i];
            var yazhu_total = GameData.YSC_YaZhu_Total[i] + GameData.YSC_Now_YaZhu_User[i];
            yazhu_total -= GameData.YSC_QiangZhu_Total[i] + GameData.YSC_Now_QiangZhu_User[i];
            //显示界面
            GameData.YSC_YaZhu_UserTotal += GameData.YSC_YaZhu_User[i];
            GameData.YSC_QiangZhu_UserTotal += GameData.YSC_QiangZhu_User[i];
            this.txt_yazhu_user[i].text = this.assShowGold(yazhu_user);
            this.txt_yazhu_total[i].text = this.assShowGold(yazhu_total);
            //判断显示抢注
            if (GameData.YSC_QiangZhu_User[i] > 0) {
                this.btn_qiang[i].label = GameData.assShowGold(GameData.YSC_QiangZhu_User[i]);
            }
            else {
                this.btn_qiang[i].label = "q";
            }
        }
        //显示总金币
        basic.Dispatcher.dispatch(EventNames.YSC_SHOWGOLD, { "gold": UserData.User_Gold - GameData.YSC_YaZhu_UserTotal + GameData.YSC_QiangZhu_UserTotal });
    };
    //文本赋值
    YSC_YaZhu.prototype.assShowGold = function (_gold) {
        //定义变量
        var show_gold;
        //判断显示
        if (_gold > 99999) {
            show_gold = String(_gold).substring(0, String(_gold).length - 3) + "K";
        }
        else {
            show_gold = String(_gold);
        }
        return show_gold;
    };
    //用户押注
    YSC_YaZhu.prototype.onShowUserYaZhu = function (e) {
        //数据赋值
        GameData.YSC_YaZhu_User[e.data.pos] = e.data.totalGold;
        //显示界面
        this.showTotalYaZhu();
    };
    //用户抢注
    YSC_YaZhu.prototype.onShowUserQiangZhu = function (e) {
        //数据赋值
        GameData.YSC_QiangZhu_User[e.data.pos] = e.data.totalGold;
        //显示界面
        this.showTotalYaZhu();
    };
    //压住按钮
    YSC_YaZhu.prototype.onYaZhuBtn = function (e) {
        //定义变量
        var btnnum = Number(e.target.name);
        var yazh_gold = GameData.Game_Chip_Gold[GameData.Game_Chip_Now];
        var can_yazhu_gold = UserData.User_Gold - GameData.YSC_YaZhu_UserTotal - GameData.YSC_QiangZhu_UserTotal * 3;
        //判断显示
        if (GameData.YSC_Game_Status == 1) {
            if (can_yazhu_gold - yazh_gold >= 0) {
                //判断显示
                if (GameData.YSC_YaZhu_User[btnnum] + GameData.YSC_Now_YaZhu_User[btnnum] + yazh_gold > UserData.User_MaxYaZhu) {
                    //显示金币不足提示
                    basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "tips": "超过每门可下金币！" });
                }
                else {
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_g_yazhu_mp3");
                    //数据赋值
                    GameData.YSC_Now_YaZhu_User[btnnum] += yazh_gold;
                    GameData.YSC_Now_YaZhuDetail_User[btnnum][GameData.YSC_Now_YaZhuDetail_User[btnnum].length] = yazh_gold;
                    //发送消息
                    Comm_ysc.instance.sendSocket({ "type": "bet", "pos": btnnum, "gold": yazh_gold });
                    //发送动画消息
                    basic.Dispatcher.dispatch(EventNames.YSC_YAZHU_USER, {
                        "pos": btnnum,
                        "gold": yazh_gold
                    });
                }
            }
            else {
                //显示金币不足提示
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "tips": "金币不足，请充值" });
            }
        }
    };
    //抢注按钮
    YSC_YaZhu.prototype.onQiangZhuBtn = function (e) {
        //定义变量
        var btnnum = Number(e.target.name);
        var qiangzh_gold = GameData.Game_Chip_Gold[GameData.Game_Chip_Now];
        var can_qiangzhu_gold = UserData.User_Gold - GameData.YSC_YaZhu_UserTotal - GameData.YSC_QiangZhu_UserTotal * 3;
        //判断显示
        if (GameData.YSC_Game_Status == 1) {
            if (can_qiangzhu_gold - qiangzh_gold * 3 >= 0) {
                if (GameData.YSC_YaZhu_Total[btnnum] < GameData.YSC_QiangZhu_Total[btnnum] + qiangzh_gold) {
                    //显示压住金额不够
                    basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "tips": "可抢金币不足" });
                }
                else {
                    //判断显示
                    var qiangzhu_num = 0;
                    //数据赋值
                    for (var i = 0; i < 4; i++) {
                        if (i != btnnum && GameData.YSC_QiangZhu_User[i] + GameData.YSC_Now_QiangZhu_User[i] > 0) {
                            qiangzhu_num += 1;
                        }
                    }
                    //判断显示
                    if (qiangzhu_num < 3) {
                        //判断显示
                        if (GameData.YSC_QiangZhu_User[btnnum] + GameData.YSC_Now_QiangZhu_User[btnnum] + qiangzh_gold > UserData.User_MaxYaZhu) {
                            //显示最多抢3门
                            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "tips": "超过每门可抢金币！" });
                        }
                        else {
                            //数据赋值
                            GameData.YSC_Now_QiangZhu_User[btnnum] += qiangzh_gold;
                            GameData.YSC_Now_QiangZhuDetail_User[btnnum][GameData.YSC_Now_QiangZhuDetail_User[btnnum].length] = qiangzh_gold;
                            //播放声音
                            basic.SoundManager.instance.playEffect("sound_ysc_get_mp3");
                            //发送消息
                            Comm_ysc.instance.sendSocket({ "type": "grab", "pos": btnnum, "gold": qiangzh_gold });
                            //发送动画消息
                            basic.Dispatcher.dispatch(EventNames.YSC_QIANGZHU_USER, {
                                "pos": btnnum,
                                "gold": qiangzh_gold
                            });
                        }
                    }
                    else {
                        //显示最多抢3门
                        basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "tips": "最多只能抢三门" });
                    }
                }
            }
            else {
                //显示金币不足提示
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "tips": "金币不足，请充值" });
            }
        }
    };
    return YSC_YaZhu;
}(eui.Component));
__reflect(YSC_YaZhu.prototype, "YSC_YaZhu");
//# sourceMappingURL=YSC_YaZhu.js.map