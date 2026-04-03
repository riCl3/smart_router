export function auth(req, res, next) {

    if (!process.env.API_KEY) {

        console.error("API_KEY missing in environment");

        return res.status(500).json({
            error: "server misconfiguration"
        });

    }

    const header = req.headers.authorization;

    if (!header) {

        return res.status(401).json({
            error: "Missing Authorization header"
        });

    }

    const token = header.replace("Bearer ", "");

    if (token !== process.env.API_KEY) {

        return res.status(401).json({
            error: "Invalid API Key"
        });

    }

    next();
}