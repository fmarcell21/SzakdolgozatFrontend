import { Genre } from "./Genre";
export interface Show {
    id: string,
    name: string,
    overview: string,
    poster_path: string,
    first_air_date: string,
    backdrop_path: string,
    number_of_seasons: string,
    number_of_episodes: string,
    next_episode_to_air: string,
    in_production: string,
    genres: Genre[],
    
}