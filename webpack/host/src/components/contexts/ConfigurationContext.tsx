import { createContext, useState } from 'react';
import { RemoteModuleConfig } from '../../interfaces';

const remoteModuleConfig = require('../../remoteModuleConfig.json');

export const ConfigurationContext = createContext({
    configuration: remoteModuleConfig,
    setConfiguration: <T,>(configuration: RemoteModuleConfig<T>) => { }
});

export const ConfigurationContextProvider = (props: { children: JSX.Element[] | JSX.Element }) => {
    const setConfiguration = <U,>(configuration: RemoteModuleConfig<U>) => {
        console.log('did this happen?', JSON.stringify(configuration))
        setConfigurationState({ setConfiguration, configuration });
    }

    const [state, setConfigurationState] = useState({ configuration: remoteModuleConfig, setConfiguration: setConfiguration });

    return (
        <ConfigurationContext.Provider value={state}>
            <div>{JSON.stringify(state)}</div>
            {props.children}
        </ConfigurationContext.Provider>
    )
}