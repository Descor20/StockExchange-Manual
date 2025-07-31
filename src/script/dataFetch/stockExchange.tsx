import './stockExchange.css'
import {debug, error} from "../../library/logger/logger.tsx";
import {useEffect, useState} from "react";
import {getBourseIndex} from "./api.ts";


function Display(uuid:string) {
    const [json_text, jsonsetter] = useState("loading . . .");
    // ---------------------
    let post : Promise<Response>;
    if (json_text == "loading . . .") {
        post = getBourseIndex();
    }

    useEffect(() => {
        if (post != undefined) {
            post
                .then(async (obj : Response) => {
                    if (json_text == "loading . . .") {
                        jsonsetter("extracting . . .");
                        const json = await obj.json();
                        console.log(json);
                        jsonsetter(JSON.stringify(json));
                    }
                })
                .catch(async (obj : Response) => {
                    jsonsetter("An error occurred");
                    error(obj.toString());
                })
        }
    });
    // ---------------------
    debug(uuid);

    return (
        <>
            <p>
                {json_text.toString()}
            </p>
        </>
    )
}

export default Display;