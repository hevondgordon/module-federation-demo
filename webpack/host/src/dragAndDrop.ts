import { DragEvent } from 'react';

export const dragoverHandler = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    if (ev.dataTransfer) ev.dataTransfer.dropEffect = "move";
}

export const dropHandler = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    if (ev.dataTransfer && ev.target) {
        const data = ev.dataTransfer.getData("text/plain");
        const target = ev.target as HTMLElement;
        const targetId = target.className;
        console.log(target, data);
    }
}

export const onDragStart = (ev: DragEvent<HTMLDivElement>) => {
    if (ev.dataTransfer) {
        const target = ev.target as HTMLElement;
        console.log(`drag started on ${target.className}`)
        ev.dataTransfer.setData("text/plain", target.className);
    }
}