import { useState, useEffect, useContext } from 'react';
import { onDragStart } from '../dragAndDrop'
import { ConfigurationContext } from './contexts/ConfigurationContext'
import { RemoteModuleConfig } from '../interfaces'
import { useConfigurationContext } from '../hooks'
import App from "./App";
import '../styles/App.css';

const Builder = <T,>() => {

    const configContext = useConfigurationContext()
    console.log('configContext', configContext.configuration)
    const remoteModules = configContext.configuration.remoteModules;

    const slotNames = Object.keys(remoteModules);

    const optionsToDrag: JSX.Element[] = [];

    for (const slotName of slotNames) {
        const modules = remoteModules[slotName];
        for (const module of modules) {
            optionsToDrag.push(<div key={module.name} onDragStart={onDragStart} draggable='true' className='drag-component' id={module.name}>
                {module.name}
            </div>
            )
        }
    }

    const [dragAndDropModules, setDragAndDropModules] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setDragAndDropModules(optionsToDrag);
    }, [remoteModules]);

    return (
        <div className="builder-container">
            <div className='component-drag-holder'>
                {dragAndDropModules}
            </div>
            <App />
        </div>
    );
};

export default Builder;
