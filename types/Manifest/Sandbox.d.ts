declare namespace chromeExtension {
  interface Sandbox {
    pages: string[];
    content_security_policy?: string;
  }
}
