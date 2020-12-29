declare namespace chromeExtension {
  export interface Requirements {
    /**
     * access GPU hardware acceleration
     */
    '3D'?: { features?: string[] };
    plugins?: {
      npapi: boolean;
    };
  }
}
