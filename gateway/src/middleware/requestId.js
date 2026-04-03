import {v4} from "uuid";

export function requestId(req,res,next){
    const id = v4();

    req.id = id;
    res.setHeader("X-Request-ID", id);

    next();
};