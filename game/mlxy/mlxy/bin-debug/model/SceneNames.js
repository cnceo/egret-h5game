var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @场景名称
 *
 */
var SceneNames = (function () {
    function SceneNames() {
    }
    SceneNames.LOADING = "loading"; //加载
    SceneNames.GAME_MLXYYH = "game_mlxyyh"; //游戏-马来西亚银行
    return SceneNames;
}());
__reflect(SceneNames.prototype, "SceneNames");
//# sourceMappingURL=SceneNames.js.map