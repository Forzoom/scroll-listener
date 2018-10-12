
import vuexModule from './store.js';

// Vue对象
export var _Vue = null;
// 默认的options
var _options = null;
var snakeName = 'scroll-listener';
var camelName = 'scrollListener';
var inBrowser = typeof window !== 'undefined';

function testSupportsPassive() {
    if (!inBrowser) {
        return false;
    }
    var support = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function() {
                support = true;
            },
        });
        window.addEventListener('test', null, opts);
    } catch (e) {}
    return support;
}

var supportPassive = testSupportsPassive();
var opts = false;
if (supportPassive) {
    opts = {
        passive: true,
    };
}

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

    _Vue = Vue;
    _options = options;
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
    }, opts);
}

export default {
    /**
     * 注册
     *
     * @param {} options
     *  - store
     */
    install: install,
};