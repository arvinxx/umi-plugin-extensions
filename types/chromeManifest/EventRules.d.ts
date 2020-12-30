declare namespace chromeManifest {
  export interface EventRule {
    event: string;
    actions?: Actions[];
    conditions?: Conditions[];
  }
  export interface Actions {
    type: string;
  }

  export interface Conditions {
    type: string;
    css?: string[];
  }
}
