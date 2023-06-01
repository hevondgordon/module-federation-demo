import { useContext } from 'react';
import { ConfigurationContext } from './components/contexts/ConfigurationContext'

export const useConfigurationContext = <T,>() => {
    const configContext = useContext(ConfigurationContext);
    return configContext;
}