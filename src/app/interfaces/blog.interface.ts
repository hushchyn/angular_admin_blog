export interface IPostRequest {
    title: string;
    text: string;
    author: string;
    date: Date;
    imgPath: string;
}

export interface IPostResponse {
    id: number;
    title: string;
    text: string;
    author: string;
    date: Date;
    imgPath: string;
}