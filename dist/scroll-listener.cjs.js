'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vuexModule = {
	state: {
		// 滑动回调
        scrollCallbacks: [],
	},
	mutations: {
		/**
         * 添加callback
         *
         * @param {} callback
         */
        addScrollCallback: function(state, callback) {
            state.scrollCallbacks.push(callback);
        },
        /**
         * 清除所有的callback
         */
        cleanScrollCallbacks: function(state) {
            state.scrollCallbacks = [];
        },
	},
};

// Vue对象
exports._Vue = null;
var snakeName = 'scroll-listener';
var camelName = 'scrollListener';

function install(Vue, options) {
    // 很想知道这里的install是什么
    if (install.installed) {
        return;
    }
    install.installed = true;

    if (!options.store) {
        console.log('[' + snakeName + '][fail] lost options.store');
        return;
    }
    if (options.store.state[camelName]) {
        console.log('[' + snakeName + '][fail] options.store.state.' + camelName + ' already exist');
        return;
    }

    exports._Vue = Vue;
    var store = options.store;

    // 注册module
    store.registerModule(camelName, vuexModule);

    // 处理store中的scroll事件
    window.addEventListener('scroll', function() {
        // 处理所有的callbacks内容
        var callbacks = store.state[camelName].scrollCallbacks;
        if (callbacks.length === 0) {
            return;
        }
        store.commit('cleanScrollCallbacks');
        callbacks.forEach(function(cb) {
            var result = cb();
            // 如果返回true，则再次加入
            if (result === true) {
                store.commit('addScrollCallback', cb);
            }
        });
    });
}

var index = {
    /**
     * 注册
     *
     * @param {} options
     *  - store
     */
    install: install,
};

exports.default = index;
