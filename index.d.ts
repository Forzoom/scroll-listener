import { PluginFunction, } from 'vue';

declare module '@forzoom/scroll-listener' {
    const install: PluginFunction<{store: any}>
}
