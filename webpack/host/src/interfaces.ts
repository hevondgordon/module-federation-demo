export interface RemoteComponents {
  sideBar: JSX.Element | null;
  header: JSX.Element | null;
  footer: JSX.Element | null;
}

export interface RemoteModuleConfig<T> {
  defaultScope: string
  defaultUrl: string;
  requiredRemoteModules: Array<string>;
  remoteModules: Array<RemoteModule<T>>;
  remoteModuleOptions: {
    defaultUrl: string;
    modules: Array<{ name: string, import: string }>
  }
}

export interface RemoteModule<T> {
  slot: string
  url: string
  componentName: string
  scope: string
  props: { [key: string | number]: T }
}

export interface ConfiguredRemoteModules {
  [key: string | number]: JSX.Element
}

export interface RemoteModuleConfigProps<T> {
  configurationObject: RemoteModuleConfig<T>
}

export interface DragAndDropProps {
  childComponentSlot: string;
  className: string;
}