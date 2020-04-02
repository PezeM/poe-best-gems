import axios, { AxiosInstance } from "axios";
import { config } from "./config";
import { IPoeNinjaItemOverview } from "src/interfaces/poe-ninja/poeNinjaItemOverview.interface";

class Api {
    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: `https://poe.ninja/api/data/`,
        });
    }

    async getGems(): Promise<IPoeNinjaItemOverview | undefined> {
        try {
            const request = await this.axios.get<IPoeNinjaItemOverview>(`itemoverview?league=${config.league}&type=SkillGem`);
            return request.data;
        } catch (error) {
            console.error(`Error in getting gems from poe ninja`, error);
            return undefined;
        }
    }
}

const api = new Api();
export default api;