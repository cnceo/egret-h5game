/**
 *
 * @
 *
 */
class Panel_EBG_PaiXing extends basic.PanelBase {
    //自定义界面
    private static _instance: Panel_EBG_PaiXing;
    public static get instance(): Panel_EBG_PaiXing {
        if(this._instance == undefined) {
            this._instance = new Panel_EBG_PaiXing();
        }
        return this._instance;
    }

    //定义变量
    private rect_back: eui.Rect;
    
    //皮肤设置
    protected init(): void {
        this.skinName = Panel_EBG_PaiXingSkin;
    }

    //定义界面
    constructor() {
        super(basic.dialogEffect.Flew,{
            duration: 400,
            direction: 'left',
            withFade: true
        },basic.dialogEffect.Flew,{ duration: 400,direction: 'left',withFade: true });
    }

    //初始化界面
    createChildren(): void {
        super.createChildren();

        //判断显示
        this.width = basic.StageProxy.width;
        this.height = basic.StageProxy.height;

        //注册按钮
        this.rect_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);
    }

    //显示界面
    show(callback: Function = null): void {
        //数据赋值
        this._callback = callback;
        basic.PopUpManager.modalMaskAlpha = 0;

        //显示界面
        this.popup();
    }

    //退出按钮
    private onCloseBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //显示透明度
        basic.PopUpManager.modalMaskAlpha = 0.6;
        
        //退出界面
        this.dealAction();
    }
}