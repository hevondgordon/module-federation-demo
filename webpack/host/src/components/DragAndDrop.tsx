import { useContext, useEffect, useState } from 'react';
import {
    RemoteModuleConfig, ConfiguredRemoteModules,
    DragAndDropProps,
    RemoteModule
} from '../interfaces'
import { dragoverHandler, dropHandler } from '../dragAndDrop'
import { ConfigurationContext } from './contexts/ConfigurationContext'
import { RemoteModuleFetch } from './RemoteModuleFetch';

interface RemoteModuleControllerProps<T> {
    modules: RemoteModule<T>[]
    defaultScope: string
    fallbackRemoteModuleLocation: string
}

const configureRemoteModules = <T,>(config: RemoteModuleConfig<T>) => {
    const remoteModuleConfig = config.remoteModules;
    const fallbackRemoteModuleLocation = config.defaultUrl;
    const defaultScope = config.defaultScope;
    const remoteModuleSectionNames = Object.keys(remoteModuleConfig) as string[];

    const configuredModules: ConfiguredRemoteModules = {};

    for (const remoteModuleSectionName of remoteModuleSectionNames) {
        const remoteModules = remoteModuleConfig[remoteModuleSectionName];

        configuredModules[remoteModuleSectionName] = <RemoteModuleController
            modules={remoteModules}
            fallbackRemoteModuleLocation={fallbackRemoteModuleLocation}
            defaultScope={defaultScope} />;
    }

    console.log('configuredModules', configuredModules)
    return configuredModules;
}

const RemoteModuleController = <T,>(props: RemoteModuleControllerProps<T>) => {
    const { modules, fallbackRemoteModuleLocation, defaultScope } = props;
    const remoteModules = []
    for (const remoteModule of modules) {
        const props = remoteModule.props;
        const scope = remoteModule.scope;
        const showModule = remoteModule.enabled;
        remoteModules.push(
            <div style={showModule ? { display: 'block' } : { display: 'none' }}>
                <RemoteModuleFetch
                    remoteModuleLocation={remoteModule.url ?? fallbackRemoteModuleLocation}
                    appScope={scope ?? defaultScope
                    }
                    componentName={remoteModule.componentName}
                    remoteModuleProps={props} />
            </div>
        )
    }

    return (
        <div>
            {remoteModules}
        </div>
    )
}

export const DragAndDrop = <T,>(props: DragAndDropProps) => {
    const testConfig = require('../configuration/tesConfig.json')

    const configContext = useContext(ConfigurationContext);
    const config = configContext.configuration as RemoteModuleConfig<T>;

    const { childComponentSlot, className } = props;

    const [selectedComponent, setSelectedComponent] = useState<JSX.Element | null | JSX.Element[]>(null)

    useEffect(() => {
        const remoteModules = configureRemoteModules(config);
        setSelectedComponent(remoteModules[childComponentSlot]);
    }, [config, childComponentSlot])

    return (
        <div className={`${className} drop-target`} onDrop={dropHandler} onDragOver={dragoverHandler}>
            <button onClick={() => configContext.setConfiguration(testConfig)}>Test config change</button>
            {selectedComponent}
        </div>
    )
}