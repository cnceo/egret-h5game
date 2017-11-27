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
 * @头像
 *
 */
var Head = (function (_super) {
    __extends(Head, _super);
    function Head() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化
    Head.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //显示遮罩
        this.rect_mask.visible = true;
        this.img_head.mask = this.rect_mask;
    };
    //显示头像
    Head.prototype.show = function (_address) {
        //显示头像
        if (_address != null && _address != "") {
            this.img_head.source = _address;
        }
        else {
            this.img_head.source = "";
        }
    };
    return Head;
}(eui.Component));
__reflect(Head.prototype, "Head");