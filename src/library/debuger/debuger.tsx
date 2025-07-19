import {debug, error} from "../logger/logger.tsx";


export let debug_ = false;

export function get_debug() {
    return debug_;
}

export function set_debug(value : boolean) {
    if (typeof value != "boolean") {
        debug("[setdebug]");
        error("The new debug value doesn't have the right type or doesn't exist.");
    }
    else {
        debug_ = value;
    }
}