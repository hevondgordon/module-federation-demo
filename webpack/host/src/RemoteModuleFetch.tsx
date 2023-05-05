import React, { useState, useEffect, FC } from 'react';

// This is the props that will be passed to the RemoteModuleFetch component
interface RemoteModuleFetchProps<T> {
    remoteModuleLocation: string;
    componentName: string;
    appScope: string;
    remoteModuleProps?: RemoteModuleProps<T>
}

// This is a generic type that will be used to pass props to the remote module
interface RemoteModuleProps<T> {
    [key: string | number]: T;
}

interface IWindow extends Window {
    [key: string]: any;
}

interface Container {
    init(shareScope: string): Promise<void>;
}

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: string };

function loadComponent<T>(scope: string, module: string): () => Promise<T> {
    return async () => {
        await __webpack_init_sharing__('default');
        const _window = window as IWindow;
        const container = _window[scope] as Container;

        await container.init(__webpack_share_scopes__.default);
        const factory = await _window[scope].get(module);
        const Module = factory() as T;
        return Module;
    };
}

// This is a generic component that will fetch a remote module and render it
export const RemoteModuleFetch = function <T>(props: RemoteModuleFetchProps<T>) {
    const [RemoteModule, setRemoteModule] = useState<FC<RemoteModuleProps<T>> | null>(null);
    const { remoteModuleProps, remoteModuleLocation, appScope, componentName } = props;
    const [isScriptReady, setIsScriptReady] = useState(false);

    const setScript = (remoteModuleLocationParam: string) => {
        console.log('setting script', remoteModuleLocationParam)
        const element = document.createElement("script");

        element.src = remoteModuleLocationParam;
        element.type = "text/javascript";
        element.async = true;

        element.onload = () => {
            console.log('loaded')
            setIsScriptReady(true);
        };

        element.onerror = () => {
            console.log('error loading')
            setIsScriptReady(false);
        };

        document.head.appendChild(element);
    }

    useEffect(() => {
        const fetchRemoteModule = () => {
            setScript(remoteModuleLocation);
            if (isScriptReady) {
                const remoteModule = React.lazy(loadComponent(appScope, componentName)) as FC<RemoteModuleProps<T>>;
                setRemoteModule(remoteModule);
            }
        };
        fetchRemoteModule();
    }, [isScriptReady, remoteModuleLocation]);

    if (RemoteModule === null) {
        return <div>oh shoot it didn't load</div>;
    }
    return (<RemoteModule {...remoteModuleProps} />);
}

