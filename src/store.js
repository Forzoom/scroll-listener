export default {
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
