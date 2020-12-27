declare namespace chromeExtension {
  export interface FileBrowserHandler {
    id: string;
    default_title: string;
    file_filters?: string[];
  }
}
