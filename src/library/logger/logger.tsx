import {get_debug} from "../debuger/debuger.tsx";


function getTime() {
    const current_date = new Date();
    return current_date.getDate() + "/" +
        current_date.getMonth() + "/" +
        current_date.getFullYear() + " " +
        current_date.getHours() + ":" +
        current_date.getMinutes() + ":" +
        current_date.getSeconds();
}

export function debug(message : string) {
    if (get_debug()) {
        console.log("[DEBUG]<" + getTime() + ">: " + message);
    }
}

export function info(message : string) {
    console.info("[INFO]<" + getTime() + ">: " + message);
}

export function warn(message : string) {
    console.warn("[WARN]<" + getTime() + ">: " + message);
}

export function error(message : string) {
    console.error("[ERROR]<" + getTime() + ">: " + message);
}