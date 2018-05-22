### Install

```shell
npm install @forzoom/scroll-listener
```

### Usage

```javascript
import Vue from 'vue';
import store from 'store/index.js'; // Vuex store instance
import ScrollListener from '@forzoom/scroll-listener';

Vue.use(ScrollListener, {
	store: store,
});
```

### Description

添加名为'scrollListener'的Vuex module

提供
addScrollCallback
cleanScrollCallbacks
两个函数

将在window上注册scroll监听，每当有scroll事件发生，将调用通过store.commit('addScrollCallback', foo);将入的foo函数

#### addScrollCallback

store.commit('addScrollCallback', foo);

#### cleanScrollCallbacks

store.commit('cleanScrollCallbacks');