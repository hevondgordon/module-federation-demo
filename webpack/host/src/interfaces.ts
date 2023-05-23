export interface RemoteComponents {
  sideBar: JSX.Element | null;
  header: JSX.Element | null;
  footer: JSX.Element | null;
}

export interface RemoteModuleConfig<T> {
  defaultScope: string
  defaultUrl: string;
  requiredRemoteModules: Array<string>;
  // remoteModules: Array<RemoteModule<T>>;
  remoteModules: { [key: string]: RemoteModule<T>[] }
  mapping: string[]
  remoteModuleOptions: {
    defaultUrl: string;
    modules: Array<{ name: string, import: string }>
  }
}

export interface RemoteModule<T> {
  name: string
  url: string
  componentName: string
  scope: string
  props: { [key: string | number]: T }
  enabled?: boolean
}

export interface ConfiguredRemoteModules {
  [key: string | number]: JSX.Element
}

interface blah {
  name: string
  remoteModule: JSX.Element
}

export interface RemoteModuleConfigProps<T> {
  configurationObject: RemoteModuleConfig<T>
}

export interface DragAndDropProps {
  childComponentSlot: string;
  className: string;
}