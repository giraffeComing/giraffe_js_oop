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
            this.mask = document.createElement('div');
            this.mask.className = 'alert-mask';
            this.panel = document.createElement('div');
            this.panel.className = 'alert-panel';

            // 获取窗口宽度
            this.windowWidth = '';
            // 获取窗口高度
            this.windowHeight = '';

        };

        Alert.prototype = {
            init : function () {
                // 组装DOM结构
                this.container.appendChild(this.mask);
                this.container.appendChild(this.panel);
                document.getElementsByTagName('body')[0].appendChild(this.container);

                // 给遮罩层动态赋值样式
                this.container.style = 'background:#000; position:absolute; opacity:0.4;top:0; left:0;'
                    +'width:'+this.getWindowWidth()+'px;'
                    +'height:'+this.getWindowHeight()+'px;';

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
            // id : '',
            width : 400,
            height : 200,
        });
        alert.init();
    }
})