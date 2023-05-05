const remoteModuleConfig = require('./remoteModuleConfig.json')

import { RemoteModuleFetch } from './RemoteModuleFetch';
import { RemoteModuleConfig } from './interfaces'

export const getConfigModules = <T,>() => {
    const _remoteModuleConfig = remoteModuleConfig as RemoteModuleConfig<T>;
    const configModules = _remoteModuleConfig.configModules;
    const modules = configModules.modules;
    return modules;
}

interface ConfiguredRemoteModules {
    [key: string | number]: JSX.Element
}

export const configureRemoteModules = <T,>() => {
    const _remoteModuleConfig = remoteModuleConfig as RemoteModuleConfig<T>;
    const remoteModules = _remoteModuleConfig.remoteModules;
    const configuredModules: ConfiguredRemoteModules = {};
    const fallbackRemoteModuleLocation = _remoteModuleConfig.defaultUrl;
    const defaultScope = _remoteModuleConfig.defaultScope;

    for (const remoteModule of remoteModules) {
        const props = remoteModule.props;
        const scope = remoteModule.scope;

        configuredModules[remoteModule.slot] = <RemoteModuleFetch
            remoteModuleLocation={remoteModule.url ?? fallbackRemoteModuleLocation}
            appScope={scope ?? defaultScope
            }
            componentName={remoteModule.componentName}
            remoteModuleProps={props} />
    }
    return configuredModules;
}