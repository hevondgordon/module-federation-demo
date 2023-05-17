import { useContext } from 'react';
import {
    RemoteModuleConfig, ConfiguredRemoteModules,
    DragAndDropProps
} from '../interfaces'
import { dragoverHandler, dropHandler } from '../dragAndDrop'
import { ConfigurationContext } from './contexts/ConfigurationContext'
import { RemoteModuleFetch } from './RemoteModuleFetch';

const configureRemoteModules = <T,>(config: RemoteModuleConfig<T>) => {
    const remoteModules = config.remoteModules;
    const configuredModules: ConfiguredRemoteModules = {};
    const fallbackRemoteModuleLocation = config.defaultUrl;
    const defaultScope = config.defaultScope;

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

export const DragAndDrop = <T,>(props: DragAndDropProps) => {
    const configContext = useContext(ConfigurationContext);
    const config = configContext.configuration as RemoteModuleConfig<T>;

    const { childComponentSlot, className } = props;
    const remoteModules = configureRemoteModules(config);
    const testConfig = require('../tesConfig.json')
    return (
        <div className={`${className} drop-target`} onDrop={dropHandler} onDragOver={dragoverHandler}>
            <button onClick={() => configContext.setConfiguration(testConfig)}>Add Component</button>
            {remoteModules[childComponentSlot]}
        </div>
    )
}