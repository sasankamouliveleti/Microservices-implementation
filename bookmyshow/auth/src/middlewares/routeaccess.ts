import { Request, Response, NextFunction } from "express";
import { UnauthorisedError } from "../errors/unauthorised-error";

export const routeAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new UnauthorisedError("Unauthorised user");
  }
};
