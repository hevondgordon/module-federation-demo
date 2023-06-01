import { createContext, useEffect, useState } from 'react';
import { RemoteModuleConfig } from '../../interfaces';

const remoteModuleConfig = require('../../configuration/remoteModuleConfig.json');

export const ConfigurationContext = createContext({
    configuration: remoteModuleConfig,
    setConfiguration: <T,>(configuration: RemoteModuleConfig<T>) => { }
});

export const ConfigurationContextProvider = (props: { children: JSX.Element[] | JSX.Element }) => {
    const [state, setConfigurationState] = useState({ configuration: remoteModuleConfig });

    const setConfiguration = <U,>(configuration: RemoteModuleConfig<U>) => {
        setConfigurationState({ configuration });
    }


    return (
        <ConfigurationContext.Provider value={{ ...state, setConfiguration: setConfiguration }}>
            {props.children}
        </ConfigurationContext.Provider>
    )
}