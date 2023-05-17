import { useState, useEffect, useContext } from 'react';
import { onDragStart } from '../dragAndDrop'
import { ConfigurationContext } from './contexts/ConfigurationContext'
import { RemoteModuleConfig } from '../interfaces'
import App from "./App";
import '../styles/App.css';

const Builder = <T,>() => {

    const configContext = useContext(ConfigurationContext);
    const config = configContext.configuration as RemoteModuleConfig<T>;
    const remoteModuleOptions = config.remoteModuleOptions;
    const modules = remoteModuleOptions.modules;

    const [dragAndDropModules, setDragAndDropModules] = useState<Array<{ name: string, import: string }>>([]);
    const DragAndDropModules = dragAndDropModules.map((module, index) => {
        return <div key={index} onDragStart={onDragStart} draggable='true' className='drag-component'>{module.name}</div>
    })

    useEffect(() => {
        setDragAndDropModules(modules);
    }, [modules]);

    return (
        <div className="builder-container">
            <div className='component-drag-holder'>
                {DragAndDropModules}
            </div>
            <App />
        </div>
    );
};

export default Builder;
