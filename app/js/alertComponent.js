/**
 * Created by zhangwei36 on 2017/11/24.
 */
define("project/alertComponent", function(require, exports, module) {
    module.exports = function alertComponent() {
        Alert = function (data) {
            if(!data)
                return;
            // 创建弹窗容器
            this.container = document.createElement('div');
            // 创建遮罩层和面板，并赋class
            this.container.setAttribute('id','AlertComponent');
            // 获取弹窗遮罩层的配置信息
            this.mask = document.createElement('div');
            this.maskStyle = data.maskOpts;
            // 获取弹窗面板的配置信息
            this.panel = document.createElement('div');
            this.panelStyle = data.panelOpts;
            // 创建右上角关闭按钮
            this.alertClose = document.createElement('div');
            this.alertCloseStyle = data.closeOpts;
            // 创建弹窗标题容器
            this.title = document.createElement('div');
            this.title.innerHTML = data.titleOpts.content;
            this.titleStyle = data.titleOpts.titleStyle;
            // 创建确定按钮
            this.confirmBtn = document.createElement('button');
            this.confirmBtn.innerHTML = data.confirmOpts.content;
            this.confirmBtnStyle = data.confirmOpts.confirmStyle;
            // 创建取消按钮
            this.cancelBtn = document.createElement('button');
            this.cancelBtn.innerHTML = data.cancelOpts.content;
            this.cancelBtnStyle = data.cancelOpts.cancelStyle;
            // handler 关闭按钮时候执行的回调函数
            this.closeFun = data.closeFun || function () {};
            this.confirmFun = data.confirmFun || function () {};
            this.cancelFun = data.cancelFun || function () {}
        };
        Alert.prototype = {
            init : function () {
                // 组装DOM结构
                // 在容器中放入遮罩层
                this.container.appendChild(this.mask);
                // 在容器中放入面板
                this.container.appendChild(this.panel);
                // 在面板中放入弹窗关闭按钮
                this.panel.appendChild(this.alertClose);
                // 在面板中放入标题容器
                this.panel.appendChild(this.title);
                // 在面板中放入确定按钮
                this.panel.appendChild(this.confirmBtn);
                // 在面板中放入取消按钮
                this.panel.appendChild(this.cancelBtn);
                // 在body中放入组装好的弹窗
                document.getElementsByTagName('body')[0].appendChild(this.container);

                // 配置项中的静态属性赋值
                this.mask.style = this.splitStyle(this.maskStyle);
                this.panel.style = this.splitStyle(this.panelStyle);
                this.alertClose.style = this.splitStyle(this.alertCloseStyle);
                this.title.style = this.splitStyle(this.titleStyle);
                this.confirmBtn.style = this.splitStyle(this.confirmBtnStyle);
                this.cancelBtn.style = this.splitStyle(this.cancelBtnStyle);
                // 动态属性赋值
                this.setStyle();
                // 事件绑定
                this.bindEvent();
            },
            bindEvent : function () {
                var This = this;
                // 窗口改变重新计算面板位置
                this.addEvent(window,'resize',function () {
                    This.setStyle();
                });
                // 点击关闭按钮移除弹窗
                this.addEvent(this.alertClose,'click',function () {
                    document.getElementsByTagName('body')[0].removeChild(This.container);
                    This.closeFun()
                });
                // 点击确定按钮执行的回调函数
                this.addEvent(this.confirmBtn,'click',function () {
                    document.getElementsByTagName('body')[0].removeChild(This.container);
                    This.confirmFun()
                });
                // 点击取消按钮执行的回调函数
                this.addEvent(this.cancelBtn,'click',function () {
                    document.getElementsByTagName('body')[0].removeChild(This.container);
                    This.cancelFun()
                });
            },
            // 事件代理
            addEvent : function (obj,type,handle){
                try{
                    obj.addEventListener(type,handle,false);
                }catch(e){
                    try{
                        obj.attachEvent('on' + type,handle);
                    }catch(e){
                        obj['on' + type] = handle;
                    }
                }
            },
            // 动态属性设置方法
            setStyle : function () {
                this.mask.style.width = this.getWindowWidth()+'px';
                this.mask.style.height = this.getWindowHeight()+'px';
                this.panel.style.left = parseInt((this.getWindowWidth()- parseInt(this.panelStyle.width))/2) +'px';
                this.panel.style.top = parseInt((this.getWindowHeight()- parseInt(this.panelStyle.height))/2) +'px';
            },
            // 样式配置项组装
            splitStyle : function (opts) {
                var str='';
                for(var i in opts){
                    str += i+':'+opts[i]+';'
                }
                return str;
            },
            // 获取窗口高度
            getWindowWidth : function () {
                return document.documentElement.clientWidth || document.body.clientWidth;
            },
            // 获取窗口宽度
            getWindowHeight : function () {
                return document.documentElement.clientHeight || document.body.clientHeight;
            }
        };

        // 实例化弹窗类时候的参数配置
        var alertObj = new Alert({
            maskOpts : {
                'background' : '#000',
                'position' : 'fixed',
                'opacity' : '0.4',
                'top' : '0',
                'left' : '0'
            },
            panelOpts : {
                'position' : 'fixed',
                'background' : '#fff',
                'width' : '600px',
                'height' : '400px',
                'border' : '5px solid gray'
            },
            closeOpts : {
                'position' : 'absolute',
                'width' : '40px',
                'height' : '40px',
                'background' : '#626262',
                'right' : '-25px',
                'top' : '-25px',
                'border-radius' : '50px'
            },
            titleOpts : {
                'titleStyle' : {
                    'line-height' : '40px',
                    'text-align' : 'center',
                    'border-bottom' : '1px solid #000'
                },
                'content' : '弹窗标题'
            },
            confirmOpts : {
                'confirmStyle' : {
                    'position' : 'absolute',
                    'right' : '120px',
                    'bottom' : '20px',
                    'background' : '#f22b47',
                    'border' : 'none',
                    'color' : '#fff',
                    'width' : '80px',
                    'height' : '30px'
                },
                'content' : '确定啦'
            },
            cancelOpts : {
                'cancelStyle' : {
                    'position' : 'absolute',
                    'right' : '20px',
                    'bottom' : '20px',
                    'background' : 'gray',
                    'border' : 'none',
                    'color' : '#fff',
                    'width' : '80px',
                    'height' : '30px'
                },
                'content' : '取消啦'
            },
            closeFun : function () {
                setTimeout(function () {
                    alert('关闭成功之后的回调函数')
                },500)
            },
            confirmFun : function () {
                setTimeout(function () {
                    alert('确定的回调函数')
                },500)
            },
            cancelFun : function () {
                setTimeout(function () {
                    alert('取消了取消了')
                },500)
            }
        });
        // 实例初始化
        alertObj.init();

/**********************扩展项目弹窗的继承***************************/
        var extendAlert = function (data) {
            // 属性继承
            Alert.call( this,data )
        };
        // 原型链下的方法继承
        extendAlert.prototype = new Alert();
        // 实例化扩展弹窗
        var testAlert = new extendAlert({
            maskOpts : {
                'background' : '#000',
                'position' : 'fixed',
                'opacity' : '0.4',
                'top' : '0',
                'left' : '0'
            },
            panelOpts : {
                'position' : 'fixed',
                'background' : '#fff',
                'width' : '600px',
                'height' : '400px',
                'border' : '5px solid gray'
            },
            closeOpts : {
                'position' : 'absolute',
                'width' : '40px',
                'height' : '40px',
                'background' : '#626262',
                'right' : '-25px',
                'top' : '-25px',
                'border-radius' : '50px'
            },
            titleOpts : {
                'titleStyle' : {
                    'line-height' : '40px',
                    'text-align' : 'center',
                    'border-bottom' : '1px solid #000'
                },
                'content' : '弹窗标题'
            },
            confirmOpts : {
                'confirmStyle' : {
                    'position' : 'absolute',
                    'right' : '120px',
                    'bottom' : '20px',
                    'background' : '#f22b47',
                    'border' : 'none',
                    'color' : '#fff',
                    'width' : '80px',
                    'height' : '30px'
                },
                'content' : '确定啦'
            },
            cancelOpts : {
                'cancelStyle' : {
                    'position' : 'absolute',
                    'right' : '20px',
                    'bottom' : '20px',
                    'background' : 'gray',
                    'border' : 'none',
                    'color' : '#fff',
                    'width' : '80px',
                    'height' : '30px'
                },
                'content' : '取消啦'
            },
            closeFun : function () {
                setTimeout(function () {
                    alert('关闭成功之后的回调函数')
                },500)
            },
            confirmFun : function () {
                setTimeout(function () {
                    alert('确定的回调函数')
                },500)
            },
            cancelFun : function () {
                setTimeout(function () {
                    alert('取消了取消了')
                },500)
            }
        });
        // testAlert.init();
/*******************************************************/
    }
});