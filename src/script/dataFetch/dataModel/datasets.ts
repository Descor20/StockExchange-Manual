import type {links} from "./links.ts";

export interface datasets {
    total_count: number;
    links: links[];
    datasets: object[];
}
