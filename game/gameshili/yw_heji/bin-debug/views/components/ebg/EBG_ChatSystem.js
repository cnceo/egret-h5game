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
 * @author
 *
 */
var EBG_ChatSystem = (function (_super) {
    __extends(EBG_ChatSystem, _super);
    function EBG_ChatSystem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.system_message = [];
        _this.is_SystemStart = false;
        _this._tween_x = null;
        _this._tween_alpha = null;
        return _this;
    }
    //初始化
    EBG_ChatSystem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //清空文本
        this.visible = false;
        //显示系统文本
        this.rect_system_mask.visible = true;
        this.txt_System = new egret.TextField();
        this.txt_System.y = 10;
        this.txt_System.size = 20;
        this.txt_System.height = 20;
        this.txt_System.fontFamily = "微软雅黑";
        this.g_system.addChild(this.txt_System);
        this.g_system.setChildIndex(this.rect_system_mask, this.g_system.numChildren - 1);
        this.txt_System.mask = this.rect_system_mask;
        //注册事件
        basic.Dispatcher.addListener(EventNames.EBG_SHOWCHAT, this.onShowChat, this);
    };
    //显示聊天
    EBG_ChatSystem.prototype.onShowChat = function (e) {
        //数据赋值
        if (e.data.chatType == 0) {
            //显示系统通知
            this.showSystemChat(e.data.msg);
        }
    };
    //显示系统聊天
    EBG_ChatSystem.prototype.showSystemChat = function (_message) {
        //数据赋值
        this.system_message[this.system_message.length] = _message;
        //开始滚动
        this.startShowSystem();
    };
    //开始显示系统
    EBG_ChatSystem.prototype.startShowSystem = function () {
        var _this = this;
        //判断开始
        if (this.is_SystemStart == false) {
            //定义变量
            var str_nowshow = "";
            //数据赋值
            for (var i = 0; i < this.system_message.length; i++) {
                if (this.system_message[i] != "") {
                    //数据赋值
                    str_nowshow = this.system_message[i];
                    this.system_message[i] = "";
                    break;
                }
            }
            //判断显示
            if (str_nowshow != "") {
                //定义变量
                var num_move_x;
                var num_move_time;
                //数据赋值
                this.visible = true;
                this.is_SystemStart = true;
                //显示文本
                this.txt_System.x = 640;
                this.txt_System.width = 1000;
                this.txt_System.textFlow = (new egret.HtmlTextParser).parser(str_nowshow);
                this.txt_System.width = this.txt_System.textWidth;
                num_move_x = 640 + this.txt_System.width;
                num_move_time = num_move_x * 20;
                //开始动画
                this._tween_x = egret.Tween.get(this.txt_System).to({ x: 640 - num_move_x }, num_move_time).call(function () {
                    //数据赋值
                    _this.visible = false;
                    _this.is_SystemStart = false;
                    //开始滚动
                    _this.startShowSystem();
                });
            }
        }
    };
    return EBG_ChatSystem;
}(eui.Component));
__reflect(EBG_ChatSystem.prototype, "EBG_ChatSystem");