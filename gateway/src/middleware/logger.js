export function logger(req,res,next){
    const start = Date.now();

    res.on("finish", ()=>{
        const duration = Date.now()-start;
        console.lof({
            request_id: req.id,
            method: req.method,
            path: req.originalUrl,
            status: res.statusCode,
            duration: duration
        });
    });

    next();
}