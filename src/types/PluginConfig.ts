declare module 'umi' {
  interface BaseIConfig {
    extension: IExtensionPluginConfig;
  }
}

export type BaseManifest = Omit<
  chromeExtension.Manifest,
  'content_security_policy'
>;

export interface IExtensionPluginConfig extends BaseManifest {
  contentSecurityPolicy: IContentSecurityPolicy;
}

export interface IContentSecurityPolicy {
  nonce: string[];
  inlineScript: string[];
  url: string[];
}
