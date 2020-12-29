declare namespace chromeExtension {
  /**
   * @see https://developer.chrome.com/docs/extensions/mv2/settings_override/
   */
  export interface ChromeSettingsOverrides {
    /**
     * New value for the homepage.
     */
    homepage?: string;
    /**
     * A search engine
     *
     * @see https://developer.chrome.com/docs/extensions/mv2/settings_override/#reference
     */
    search_provider?: SearchProvider;
    /**
     * An array of length one containing a URL to be used as the startup page.
     */
    startup_pages?: string[];
  }

  /**
   * A search engine
   */
  export interface SearchProvider {
    /**
     * An search URL used by the search engine.
     */
    search_url: string;
    /**
     * Name of the search engine displayed to user.
     * This may only be omitted if `prepopulated_id` is set.
     */
    name?: string;
    /**
     * Omnibox keyword for the search engine.
     * This may only be omitted if `prepopulated_id` is set.
     */
    keyword?: string;
    /**
     * An icon URL for the search engine.
     * This may only be omitted if `prepopulated_id` is set.
     */
    favicon_url?: string;
    /**
     * Encoding of the search term. This may only be omitted if prepopulated_id is set.
     */
    encoding?: string;
    /**
     * If omitted, this engine does not support suggestions.
     */
    suggest_url?: string;
    instant_url?: string;
    /**
     * If omitted, this engine does not support image search.
     */
    image_url?: string;
    /**
     * The string of post parameters to search_url
     */
    search_url_post_params?: string;
    /**
     * The string of post parameters to suggest_url
     */
    suggest_url_post_params?: string;

    instant_url_post_params?: string;
    /**
     * The string of post parameters to image_url
     */
    image_url_post_params?: string;
    /**
     * A list of URL patterns that can be used, in addition to |search_url|.
     */
    alternate_urls?: string[];
    /**
     * An ID of the built-in search engine in Chrome.
     */
    prepopulated_id?: number;
    /**
     * Specifies if the search provider should be default.
     */
    is_default: boolean;
  }
}
