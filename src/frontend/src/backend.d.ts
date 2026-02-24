import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Video {
    url: string;
    title: string;
    thumbnail: string;
    description: string;
    category: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface VideoCategory {
    name: string;
    videos: Array<Video>;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ExchangeRate {
    rate: number;
    currencyPair: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Message {
    id: bigint;
    content: string;
    sender: string;
    language: string;
}
export interface UserProfile {
    name: string;
}
export interface http_header {
    value: string;
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addHistoricalMarketTrend(trend: string): Promise<void>;
    addRepeatedMarketTrend(trend: string): Promise<void>;
    addVideo(video: Video): Promise<void>;
    addVideoCategory(name: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    fetchAllPublicTEDVideos(): Promise<string>;
    fetchBusinessTEDVideos(): Promise<string>;
    fetchMarketData(): Promise<string>;
    getAllVideoCategories(): Promise<Array<VideoCategory>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCommonSearchTerms(): Promise<Array<string>>;
    getExchangeRates(): Promise<Array<ExchangeRate>>;
    getHistoricalMarketTrends(): Promise<Array<string>>;
    getLastExchangeRatesUpdateTimestamp(): Promise<bigint | null>;
    getRealTimeMarketTrends(): Promise<string | null>;
    getRecentMessages(user: Principal, count: bigint): Promise<Array<Message>>;
    getRepeatedMarketTrends(): Promise<Array<string>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVideoCategory(categoryName: string): Promise<VideoCategory | null>;
    getVideosByCategory(categoryName: string): Promise<Array<Video> | null>;
    initializeAccessControl(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    sendEnglishMessage(content: string): Promise<Message>;
    sendMarketQuery(content: string): Promise<Message>;
    sendMessage(content: string, language: string): Promise<Message>;
    sendSwahiliMessage(content: string): Promise<Message>;
    sendUSSDRequest(_code: string, _service: string): Promise<string>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    triggerAllExchangeRatesUpdate(): Promise<void>;
    updateAllExchangeRates(): Promise<void>;
    updateExchangeRate(currencyPair: string, newRate: number): Promise<void>;
    updateRealTimeMarketTrends(): Promise<void>;
    updateVideoThumbnail(categoryName: string, videoTitle: string, newThumbnail: string): Promise<void>;
}
