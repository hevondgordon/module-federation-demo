import React, { useState, useEffect, FC } from 'react';

// This is the props that will be passed to the RemoteModuleFetch component
interface RemoteModuleFetchProps<T> {
    remoteModuleLocation: string;
    remoteModuleProps?: RemoteModuleProps<T>
}

// This is a generic type that will be used to pass props to the remote module
interface RemoteModuleProps<T> {
    [key: string | number]: T;
}

interface IWindow extends Window {
    [key: string]: any;
  }

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: string };

function loadComponent<T>(scope: string, module: string): () => Promise<T> {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');
    const _window = window as IWindow;
    const container = _window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await _window[scope].get(module);
    const Module = factory() as T;
    return Module;
  };
}

const useDynamicScript = (url: string) => {
      const element = document.createElement("script");
      element.src = url;
      element.type = "text/javascript";
      element.async = true;
      document.head.appendChild(element);
  };

// This is a generic component that will fetch a remote module and render it
const RemoteModuleFetch = function <T>(props: RemoteModuleFetchProps<T>) {
    const [RemoteModule, setRemoteModule] = useState<FC<RemoteModuleProps<T>> | null>(null);
    const { remoteModuleProps, remoteModuleLocation } = props;
    
    useEffect(() => {
        useDynamicScript(remoteModuleLocation);
        const fetchRemoteModule = async () => {
            const remoteModule = React.lazy(loadComponent('app2', './Widget')) as FC<RemoteModuleProps<T>>;
            setRemoteModule(remoteModule);
        };
        fetchRemoteModule();
    }, [props.remoteModuleLocation]);

    if (RemoteModule === null) {
        return null;
    }
    return (<RemoteModule {...remoteModuleProps} />);
}



export default RemoteModuleFetch;
