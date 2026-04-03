import express from "express";
import { classifyTask } from "../../../classifier/classify.js";

const router = express.Router();

router.post("/chat/completions", async(req,res)=>{
    
    const messages = req.body.messages || [];
    const difficulty = await classifyTask(messages)
    
    res.json({
        id: req.id,
        difficulty,
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