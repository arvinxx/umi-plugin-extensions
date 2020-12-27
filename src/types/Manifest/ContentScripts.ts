declare namespace chromeExtension {
  export interface ContentScript {
    /**
     * Specifies which pages this content script will be injected into.
     * See [Match Patterns](https://developer.chrome.com/docs/extensions/mv2/content_scripts/match_patterns)
     * for more details on the syntax of these strings and
     * [Match patterns and globs](https://developer.chrome.com/docs/extensions/mv2/content_scripts/#matchAndGlob)
     * for information on how to exclude URLs.
     *
     */
    matches: string[];
    /**
     * The list of CSS files to be injected into matching pages.
     * These are injected in the order they appear in this array,
     * before any DOM is constructed or displayed for the page.
     */
    css?: string[];
    /**
     * The list of JavaScript files to be injected into matching pages.
     * These are injected in the order they appear in this array.
     */
    js?: string[];
    /**
     * Whether the script should inject into an about:blank frame
     * where the parent or opener frame matches one of the
     * patterns declared in matches.
     *
     * @default false
     */
    match_about_blank?: boolean;
    /**
     * Excludes pages that this content script would otherwise be injected into.
     * See [Match Patterns](https://developer.chrome.com/docs/extensions/mv2/content_scripts/match_patterns)
     * for more details on the syntax of these strings.
     */
    exclude_matches?: string[];
    /**
     * Applied after matches to include only those URLs that also match this glob.
     * Intended to emulate the @include Greasemonkey keyword.
     */
    include_globs?: string[];
    /**
     * Applied after matches to exclude URLs that match this glob.
     * Intended to emulate the @exclude Greasemonkey keyword.
     */
    exclude_globs?: string[];
    /**
     * When JavaScript files are injected into the
     * web page is controlled by the run_at field.
     * The preffered and default field is "document_idle",
     * but can also be specified as
     * "document_start" or "document_end" if needed.
     *
     * @see https://developer.chrome.com/docs/extensions/mv2/content_scripts/#run_time
     */
    run_at: ContentScriptRunTime;
    /**
     * allows the extension to specify if JavaScript and CSS files should
     * be injected into all frames matching the specified URL requirements
     * or only into the topmost frame in a tab.
     * @default  false
     *
     * @see https://developer.chrome.com/docs/extensions/mv2/content_scripts/#frames
     */
    all_frames?: boolean;
  }

  export type ContentScriptRunTime =
    /**
     * Use "document_idle" whenever possible.
     *
     * The browser chooses a time to inject scripts between "document_end"
     * and immediately after the window.onloadevent fires.
     * The exact moment of injection depends on how complex the document is
     * and how long it is taking to load, and is optimized for page load speed.
     *
     *  Content scripts running at "document_idle" do not need to listen
     * for the window.onload event, they are guaranteed to run
     * after the DOM is complete. If a script definitely needs to run
     * after window.onload, the extension can check if onload has already fired
     * by using the document.readyStateproperty.
     */
    | 'document_idle'
    /**
     * Scripts are injected after any files from css,
     * but before any other DOM is constructed or any other script is run.
     */
    | 'document_start'
    /**
     * Scripts are injected immediately after the DOM is complete,
     * but before subresources like images and frames have loaded.
     */
    | 'document_end';
}
