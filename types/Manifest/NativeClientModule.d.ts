declare namespace chromeExtension {
  export interface NativeClientModule {
    /**
     * the location of a Native Client manifest (a .nmf file) within the extension directory.
     */
    path: string;
    mime_type: string;
  }
}
