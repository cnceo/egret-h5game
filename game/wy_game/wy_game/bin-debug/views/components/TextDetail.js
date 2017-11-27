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
 * @文本内容
 *
 */
var TextDetail = (function (_super) {
    __extends(TextDetail, _super);
    //初始化
    function TextDetail() {
        var _this = _super.call(this) || this;
        _this._timer_action = null;
        //定义界面
        _this.skinName = TextDetailSkin;
        //数据赋值
        _this.now_action = 0;
        _this.is_start = false;
        _this.action_speed = 200;
        return _this;
    }
    //开始动画
    TextDetail.prototype.start = function (_detail, _callback, _actionback) {
        if (_callback === void 0) { _callback = null; }
        if (_actionback === void 0) { _actionback = null; }
        //数据赋值
        this.now_action = 0;
        this.is_start = true;
        this.callback = _callback;
        this.actionback = _actionback;
        this.str_detail = this.assDetail(_detail);
        //清空文本
        this.txt_detail.text = "";
        //判断显示
        if (this.str_detail.indexOf("：") >= 0) {
            this.showText(this.str_detail.substring(0, this.str_detail.indexOf("：") + 1));
        }
        this.now_action = this.str_detail.indexOf("：");
        //开始动画
        this._timer_action = new egret.Timer(this.action_speed, this.str_detail.length - this.now_action);
        this._timer_action.addEventListener(egret.TimerEvent.TIMER, this.onAction, this);
        this._timer_action.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onActionComplete, this);
        this._timer_action.start();
    };
    //停止
    TextDetail.prototype.stop = function () {
        //结束动画
        if (this._timer_action) {
            this._timer_action.stop();
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER, this.onAction, this);
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onActionComplete, this);
            this._timer_action = null;
        }
        //判断赋值
        if (this.is_start == true) {
            //数据赋值
            this.is_start = false;
            //显示文本
            this.showText(this.str_detail);
        }
    };
    //显示文本
    TextDetail.prototype.showText = function (_detail) {
        //显示文本
        this.txt_detail.text = this.assDetail(_detail);
        //显示高度
        this.height = this.txt_detail.height;
    };
    //修改文本颜色
    TextDetail.prototype.changeTextColor = function () {
        //定义游戏颜色
        this.txt_detail.textColor = 0xB2B2B2;
        //显示文本
        this.txt_detail.text = this.txt_detail.text;
    };
    //定义高度
    TextDetail.prototype.assHeight = function (_detail) {
        //定义变量
        var show_height;
        //显示文本
        this.txt_detail.text = this.assDetail(_detail);
        show_height = this.txt_detail.height;
        this.txt_detail.text = "";
        return show_height;
    };
    //数据赋值
    TextDetail.prototype.assDetail = function (_detail) {
        //定义变量
        var now_detail = "";
        //数据赋值
        if (_detail.indexOf("**") >= 0) {
            now_detail += _detail.substring(0, _detail.indexOf("**")) + UserData.User_Name;
            now_detail += _detail.substring(_detail.indexOf("**") + 2, _detail.length);
        }
        else {
            now_detail = _detail;
        }
        return now_detail;
    };
    //显示动画
    TextDetail.prototype.onAction = function (e) {
        //数据赋值
        this.now_action += 1;
        //判断显示
        if (this.now_action <= this.str_detail.length) {
            //显示文本
            this.showText(this.str_detail.substring(0, this.now_action));
        }
        //显示动画回调
        if (this.actionback) {
            this.actionback();
        }
    };
    //动画结束
    TextDetail.prototype.onActionComplete = function (e) {
        //停止
        this.stop();
        //显示回调函数
        if (this.callback) {
            this.callback();
        }
    };
    return TextDetail;
}(eui.Component));
__reflect(TextDetail.prototype, "TextDetail");
//# sourceMappingURL=TextDetail.js.map