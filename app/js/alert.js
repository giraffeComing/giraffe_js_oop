/**
 * Created by zhangwei36 on 2017/10/10.
 */
define("project/alert", function(require, exports, module) {
    module.exports = function alert() {
        Alert = function (data) {
            if(!data)
                return;
            // 创建弹窗容器
            this.container = document.createElement('div');
            // 创建遮罩层和面板，并赋class
            this.container.setAttribute('id','AlertComponent');
            this.mask = document.createElement('div');
            this.panel = document.createElement('div');
            // 获取弹窗遮罩层的配置信息
            this.maskStyle = data.maskOpts;
            // 获取弹窗面板的配置信息
            this.panelStyle = data.panelOpts;

            this.alertClose = document.createElement('div');
            this.alertCloseStyle = data.closeOpts;
        };

        Alert.prototype = {
            init : function () {
                // 组装DOM结构
                this.container.appendChild(this.mask);
                this.container.appendChild(this.panel);
                // 在面板中放入弹窗关闭按钮
                this.panel.appendChild(this.alertClose);
                document.getElementsByTagName('body')[0].appendChild(this.container);

                // 配置项中的静态属性赋值
                this.mask.style = this.splitStyle(this.maskStyle);
                this.panel.style = this.splitStyle(this.panelStyle);
                this.alertClose.style = this.splitStyle(this.alertCloseStyle);
                // 动态属性赋值
                this.setStyle();
                // 事件绑定
                this.bindEvent();

            },
            bindEvent : function () {
                var This = this;
                // 窗口改变重新计算面板位置
                window.onresize = function () {
                    This.setStyle();
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
        var alert = new Alert({
            maskOpts : {
                background : '#000',
                position : 'fixed',
                opacity : '0.4',
                top : '0',
                left : '0'
            },
            panelOpts : {
                position : 'fixed',
                background : 'green',
                width : '600px',
                height : '400px'
            },
            closeOpts : {
                position : 'absolute',
                width : '50px',
                height : '50px',
                background : 'red',
                right : '-25px',
                top : '-25px'
            },
            titleOpts : {
                content : '弹窗标题'
            }
        });
        alert.init();
    }
});