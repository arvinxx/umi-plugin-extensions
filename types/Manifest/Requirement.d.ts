declare namespace chromeManifest {
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
