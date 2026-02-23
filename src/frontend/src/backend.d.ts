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
    addVideo(video: Video): Promise<void>;
    addVideoCategory(name: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    fetchAllPublicTEDVideos(): Promise<string>;
    fetchBusinessTEDVideos(): Promise<string>;
    fetchMarketData(): Promise<string>;
    getAllVideoCategories(): Promise<Array<VideoCategory>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getRecentMessages(user: Principal, count: bigint): Promise<Array<Message>>;
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
    updateVideoThumbnail(categoryName: string, videoTitle: string, newThumbnail: string): Promise<void>;
}
