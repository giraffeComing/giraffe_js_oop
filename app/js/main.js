/**
 * Created by zhangwei36 on 2017/9/18.
 */
seajs.config({
    // 取消combo
    comboExcludes: /.*/,
    paths: {
        'project': '../js/'
    }
});
seajs.use([
        // PC端页头页脚布局
        'project/layout',
        'project/Alert'
    ],
    function(Alert,layout) {
        // PC端页头页脚布局
        layout();
        Alert();
    });
