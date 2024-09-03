import type { Logger } from "pino";
import type { Browser, Page } from "playwright";
import type { TvEpisodeRecord } from "@media-data-hub/sdk";

/**
 * Context for MdhTvEpisodeScraper
 */
export interface MdhTvEpisodeScraperContext {
  browser: Browser;
  logger: Logger;
  record: Partial<TvEpisodeRecord>;
}

/**
 * Context for MdhTvEpisodeScraper per episode
 */
export interface MdhTvEpisodeScraperEpisodeContext extends MdhTvEpisodeScraperContext {
  page: Page;
  epInfo: Readonly<EpisodeInfo>;
}

export interface EpisodeInfo {
  num: number;
  padNum: string;
}
