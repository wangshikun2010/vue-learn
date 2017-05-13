window.onload = function() {

    var bindingMark = 'v-text';

    // Vue构造函数
    function Vue(id, initData) {
        var self = this,
            el = document.getElementById(id),
            bindings = {},
            data = {},
            eles = el.querySelectorAll('[' + bindingMark + ']');

        // 收集v-text属性
        [].forEach.call(eles, function(ele) {
            bindings[ele.getAttribute(bindingMark)] = {};
        });

        // 绑定数据
        function bind(variable) {
            bindings[variable].els = el.querySelectorAll('[' + bindingMark + '=' + variable+ ']');

            [].forEach.call(bindings[variable].els, function(e) {
                e.removeAttribute(bindingMark);
            });

            Object.defineProperty(data, variable, {
                set: function(newVal) {
                    [].forEach.call(bindings[variable].els, function(e) {
                        bindings[variable].value = e.textContent = newVal;
                    })
                },
                get: function() {
                    return bindings[variable].value;
                }
            });
        }

        // 指定绑定
        for (var variable in bindings) {
            bind(variable);
        }

        // 初始化赋值
        if (initData) {
            for (var variable in initData) {
                data[variable] = initData[variable];
            }
        }

        return data;
    }

    // Vue实例
    window.vm = new Vue('app', {
        msg: 'test app'
    });
}