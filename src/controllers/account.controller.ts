import { Request, Response } from "express";
import { CreateUserModel } from "../models/dto/users.dto";
import container from "../config   /setup";
import { IAccountService } from "../services/account.service";
import { Result } from "../models/dto/result.dto";
import { Common } from "../ utils  /common";
import { LoginRequest } from "../models/dto/auth.dto";
import { TYPES } from "../config   /types";

const accountService = container.get<IAccountService>(TYPES.IAccountService);

export const register = async (req: Request, res: Response) => {
        try {
                const user = await accountService.register(req.body as CreateUserModel);

                if (!user) {
                        res.status(500).json(new Result(Common.getBizCode("500"), null));
                        return;
                }

                res.status(200).json(new Result(Common.getBizCode("200"), user));
                return;
        } catch (error) {
                res.status(500).json(new Result(Common.getBizCode("500"), null));
                return;
        }
};


export const login = async (req: Request, res: Response) => {
        try {
                const user = await accountService.login(req.body as LoginRequest);

                if (!user) {
                        res.status(500).json(new Result(Common.getBizCode("500"), null));
                        return;
                }

                res.status(200).json(new Result(Common.getBizCode("200"), user));
                return;
        } catch (error) {
                res.status(500).json(new Result(Common.getBizCode("500"), null));
                return;
        }
};
