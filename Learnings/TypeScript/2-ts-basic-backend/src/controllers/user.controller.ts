import { Request, Response } from "express"
import { pstInfo, getInfo } from "../services/user.service";

export const postUser = async ( req : Request , res : Response ) => {
    try {
        const { name , email } = req.body;

        if ( !name || !email ) {
            return res.status(401).json({
                message : "Bhai naam yaphir email missing hai"
            })
        }
        const postInfo = await pstInfo(name, email);
        res.status(201).json({
            postInfo
        })
    }
    catch ( jmt ) {
        res.status(401).json({
            message : jmt
        })
    }
}

export const getUser = async ( req : Request, res : Response ) => {
    try {
        const getUsers = await getInfo();

        res.status(200).json({
            getUsers
        })
    }
    catch ( err ) {
        res.status(401).json({
            message : err
        })
    }
}