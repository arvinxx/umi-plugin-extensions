declare namespace chromeManifest {
  export interface ExternallyConnectable {
    /**
     * The IDs of extensions or apps that are allowed to connect.
     * If left empty or unspecified, no extensions or apps can connect.
     *
     * The wildcard "*" will allow all extensions and apps to connect.
     */
    ids?: string[];
    /**
     * The URL patterns for web pages that are allowed to connect.
     * This does not affect content scripts.
     * If left empty or unspecified, no web pages can connect.
     */
    matches?: string[];
    /**
     * If true, messages sent via `runtime.connect` or `runtime.sendMessage` will
     * set `runtime.MessageSender.tlsChannelId` if those methods request it to be.
     *
     * If false, `runtime.MessageSender.tlsChannelId` will never be set under any circumstance.
     */
    accepts_tls_channel_id?: boolean;
  }
}
