var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @加载数据
 *
 */
var LoaderData = (function () {
    function LoaderData() {
    }
    //定义变量
    LoaderData.is_LoginEnd = false;
    LoaderData.is_ThemeLoadEnd = false;
    LoaderData.is_Loading_LoadEnd = false;
    LoaderData.is_Start_LoadEnd = false;
    LoaderData.is_Start_Show = false;
    return LoaderData;
}());
__reflect(LoaderData.prototype, "LoaderData");
//# sourceMappingURL=LoaderData.js.map