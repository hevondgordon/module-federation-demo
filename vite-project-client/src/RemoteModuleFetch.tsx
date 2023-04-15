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

// This is a generic component that will fetch a remote module and render it
const RemoteModuleFetch = function <T>(props: RemoteModuleFetchProps<T>) {
    const [RemoteModule, setRemoteModule] = useState<FC<RemoteModuleProps<T>> | null>(null);
    const { remoteModuleProps, remoteModuleLocation } = props;
    useEffect(() => {
        const fetchRemoteModule = async () => {
            const remoteModule = React.lazy(() => import(`outsiders/${remoteModuleLocation}.js`)) as FC<RemoteModuleProps<T>>;
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
