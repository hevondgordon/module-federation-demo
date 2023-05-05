import { useState, useEffect } from 'react';
import { onDragStart } from './dragAndDrop'
import { getConfigModules } from './configuration'
import App from "./App";
import './styles/App.css';


const Builder = () => {

    const [dragAndDropModules, setDragAndDropModules] = useState<Array<{ name: string, import: string }>>([]);
    const DragAndDropModules = dragAndDropModules.map((module) => {
        return <div onDragStart={onDragStart} draggable='true' className='drag-component'>{module.name}</div>
    })

    useEffect(() => {
        const dragAndDropModules = getConfigModules();
        setDragAndDropModules(dragAndDropModules);
    }, []);

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
