import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const req = context.switchToHttp().getRequest();
    if (!req.headers.authorization) {
      return false;
    }

    req.user = await this.validateToken(req.headers.authorization);

    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(" ")[0] !== "Bearer") {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(" ")[1];

    try {
      const decoded: any = await jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (err) {
      const message = "Token error: " + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }

}