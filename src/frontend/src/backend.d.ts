import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PrincipalMessage {
    title: string;
    name: string;
    imageUrl: string;
    message: string;
}
export interface NewsArticle {
    id: bigint;
    title: string;
    date: string;
    shortDescription: string;
    category: string;
}
export interface Facility {
    id: bigint;
    name: string;
    description: string;
    iconName: string;
}
export interface backendInterface {
    getFacilities(): Promise<Array<Facility>>;
    getNewsArticles(): Promise<Array<NewsArticle>>;
    getPrincipalMessage(): Promise<PrincipalMessage>;
}
