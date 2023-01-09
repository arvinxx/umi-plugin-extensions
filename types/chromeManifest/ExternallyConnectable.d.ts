declare namespace chromeManifest {
  export interface ExternallyConnectable {
    /**
     *
     * 允许连接的扩展或应用的ID。如果留空或未指定，则无法连接任何扩展或应用程序。通配符 `*` 将允许所有扩展和应用程序连接。
     */
    ids?: string[];
    /**
     * 允许连接的网页的URL模式。这不会影响内容脚本。如果留空或未指定，则无法连接任何网页
     */
    matches?: string[];
    /**
     * 如果为 `true`, 通过 `runtime.connect` 或 `runtime.sendMessage` 发送的消息将被设置为 `runtime.MessageSender.tlsChannelId`
     *
     *  如果为 `false` , `runtime.MessageSender.tlsChannelId` 在任何情况下都不会被设定。
     */
    accepts_tls_channel_id?: boolean;
  }
}
