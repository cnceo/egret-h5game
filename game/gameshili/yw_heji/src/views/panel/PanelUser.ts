/**
 *
 * @author 
 *
 */
class PanelUser extends basic.PanelBase {
    private static _instance: PanelUser;
    public static get instance(): PanelUser {
        if(this._instance == undefined) {
            this._instance = new PanelUser();
        }
        return this._instance;
    }

    //定义变量
    private head: Head;
    private txt_id: eui.Label;
    private img_vip: eui.Image;
    private txt_name: eui.Label;
    private txt_gold: eui.Label;
    private txt_tips: eui.Label;
    private btn_save: eui.Button;
    private btn_close: eui.Button;
    private txt_account: eui.Label;
    private tabbar_sex: eui.TabBar;
    private g_choosehead: eui.Group;
    private img_headlight: eui.Image;
    private txt_phone: eui.EditableText;
    private txt_password: eui.EditableText;
    private txt_namechange: eui.EditableText;
    private btn_head: eui.Button[] = [];
    private now_head: string = "";
    private username: string;
    private callBack: Function;
    
    //定义界面
    constructor() {
        super(basic.dialogEffect.Scale,{
            withFade: true,
            ease: egret.Ease.backOut
        },basic.dialogEffect.Scale,{ withFade: true,ease: egret.Ease.backIn });
    }

    //初始化
    createChildren(): void {
        super.createChildren();

        //定义界面
        this.skinName = PanelUserSkin;
        
        //数据赋值
        for(var i: number = 0;i < 30;i++) {
            //定义变量
            var btn: eui.Button = this["btn_head"+i];
            
            //数据赋值
            this.btn_head[i] = btn;
            
            //注册按钮
            this.btn_head[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onHeadChooseBtn,this);
        }

        //注册按钮
        this.head.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onHeadBtn,this);
        this.btn_save.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSaveBtn,this);
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);
    }

    //显示界面
    show(_callback: Function = null): void {
        //显示界面
        this.popup(this.funExit.bind(this));
        
        //显示基本信息
        this.callBack = _callback;
        this.txt_tips.text = "";
        this.g_choosehead.visible = false;
        this.now_head = UserData.User_Head;
        this.head.show(UserData.User_Head);
        this.txt_phone.text = UserData.User_Phone;
        this.txt_account.text = UserData.User_Account;
        this.txt_id.text = UserData.User_Id.toString();
        this.txt_password.text = UserData.User_Password;
        this.tabbar_sex.selectedIndex = UserData.User_Sex;
        this.txt_gold.text = UserData.User_Gold.toString();
        this.img_vip.source = "txt_s_vip" + UserData.User_VIP.toString() + "_png";
        
        //判断显示
        if(UserData.User_Account == UserData.User_Name) {
            this.txt_name.visible = false;
            this.txt_namechange.visible = true;
            this.txt_namechange.text = UserData.User_Name;
        }
        else {
            this.txt_name.visible = true;
            this.txt_namechange.visible = false;
            this.txt_name.text = UserData.User_Name;
        }
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.SHOW_TIPS,this.onShowTips,this);
    }

    //退出对话框
    private funExit(): void {
        //退出界面
        this.dealAction();

        //调用函数
        if(this.callBack) {
            this.callBack();
        }
    }
    
    //头像按钮
    private onHeadBtn(e:egret.TouchEvent):void{
        //定义变量
        var now_head_num: number;
        
        //显示界面
        this.g_choosehead.visible = true;
        
        //判断显示位置
        if(this.now_head.indexOf("http") < 0) {
            this.img_headlight.visible = true;
            
            //数据赋值
            now_head_num = Number(this.now_head.substring(9,this.now_head.length-4));
            
            //定义位置
            this.img_headlight.x = (now_head_num % 5) * 106 - 14;
            this.img_headlight.y = Math.floor(now_head_num / 5) * 107 - 10;
        }
        else {
            this.img_headlight.visible = false;
        }
        
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
    }
    
    //头像选择按钮
    private onHeadChooseBtn(e:egret.TouchEvent):void{
        //定义变量
        var btnnum: number = Number(e.target.name);
        
        //数据赋值
        this.now_head = "icon_head" + btnnum.toString()+"_jpg";
        
        //显示界面
        this.head.show(this.now_head);
        this.g_choosehead.visible = false;
        
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
    }
    
    //退出界面
    private onCloseBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //退出对话框
        this.funExit();
    }
    
    //保存按钮
    private onSaveBtn(e:egret.TouchEvent):void{
        //判断赋值
        if(UserData.User_Account == UserData.User_Name) {
            this.username = this.txt_namechange.text;
        }
        else {
            this.username  = this.txt_name.text;
        }
        
        //判断显示
        this.txt_tips.text = "";
        if(this.username  == "") {
            this.txt_tips.text = "昵称不能为空";
        }
        else if(this.txt_password.text==""){
            this.txt_tips.text = "密码不能为空";
        }
        else{
            Comm.instance.sendSocket({
                "type": "changeUserInfo",
                "headImgURL": this.now_head,
                "password": this.txt_password.text,
                "nickName": this.username,
                "phone": this.txt_phone.text,
                "sex": this.tabbar_sex.selectedIndex 
            });
        }
        
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
    }
    
    //显示提示
    private onShowTips(e:egret.Event):void{
        //判断显示
        if(e.data.tips == "修改成功") {
            //数据赋值
            UserData.User_Name = this.username;
            UserData.User_Head = this.now_head;
            UserData.User_Phone = this.txt_phone.text;
            UserData.User_Password = this.txt_password.text;
            UserData.User_Sex = this.tabbar_sex.selectedIndex;

            //判断显示
            if(UserData.User_Account == UserData.User_Name) {
                this.txt_name.visible = false;
                this.txt_namechange.visible = true;
                this.txt_namechange.text = UserData.User_Name;
            }
            else {
                this.txt_name.visible = true;
                this.txt_namechange.visible = false;
                this.txt_name.text = UserData.User_Name;
            }

            //保存密码
            basic.localStorage.setItem('password',UserData.User_Password);
        }
    }
}
