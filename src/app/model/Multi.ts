import { Genre } from "./Genre"
import { Season } from "./Season"

export interface Multi {
    id: string,
    original_language: string,
    overview: string,
    poster_path: string, 
    release_date: string,
    title: string,
    backdrop_path: string,
    genres: Genre[],
    media_type: string,    
    gender: number,
    name: string,
    character: string,
    profile_path: string,   
    first_air_date: string,   
    number_of_seasons: string,
    number_of_episodes: string,
    next_episode_to_air: string,
    in_production: string,    
    seasons: Season[],
    
}