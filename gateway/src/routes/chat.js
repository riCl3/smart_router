import express from "express";

const router = express.Router();

router.post("/chat/completions", async(req,res)=>{
    res.json({
        id: req.id,
        choices: [
            {
                message: {
                    content: "stub process"
                }
            }
        ]
    });
});

export default router;