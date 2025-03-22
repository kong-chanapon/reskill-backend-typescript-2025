import { NextFunction, Request, Response } from "express";
import container from "../config   /setup";
import { IAccountService } from "../services/account.service";
import { Result } from "../models/dto/result.dto";
import { Common } from "../ utils  /common";
import { TYPES } from "../config   /types";

const accountService = container.get<IAccountService>(TYPES.IAccountService);

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(401).json(new Result(Common.getBizCode("401"), null));
            return;
        }

        const user = await accountService.authorize(token as string);

        if (!user) {
            res.status(401).json(new Result(Common.getBizCode("401"), null));
            return;
        };
        

        const payload = accountService.getPayloadAccessToken(token as string);

        req.body.userInfo = payload;
        next();
    } catch (error: any) {
        if(error?.name === "TokenExpiredError") {
            res.status(401).json({ message: "Token Expired" });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
        return;
    }
}
