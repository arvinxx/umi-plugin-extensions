declare namespace chromeManifest {
  export interface FileBrowserHandler {
    id: string;
    default_title: string;
    file_filters?: string[];
  }
}
