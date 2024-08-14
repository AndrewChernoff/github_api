import axios from "axios";
import { ChosenRepoType } from "../types/types";

export type ParamsType = {name: string, order: string, sortParam:string, page: number, portion: number} 


const instance = axios.create({
    baseURL: 'https://api.github.com/',
  });

export const api = {
    getRepos({name, order="desc", sortParam, page, portion}: ParamsType) {
        return instance.get(`search/repositories?q=${name}&sort=${sortParam}&order=${order}&page=${page}&per_page=${portion}`)
    },
    getRepo({ownerName, repoName}: ChosenRepoType) {
        return instance.get(`repos/${ownerName}/${repoName}`)
    },
}