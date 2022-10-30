import { Genre } from "./Genre";

export interface Movie {  
    id: string,
    original_language: string,
    overview: string,
    poster_path: string, 
    release_date: string,
    title: string,
    backdrop_path: string,
    genres: Genre[],
    media_type: string
};