import type {links} from "./links.ts";

export interface datasets {
    links: links[];
    datasets: innerdataset[];
}

export interface innerdataset {
    dataset_id:	string;
    dataset_uid:	string;
    attachments:	object[];
    has_records:	boolean ;
    data_visible:	boolean ;
    features:	object;
    metas:	object;
    fields:	object[];
}