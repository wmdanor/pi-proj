import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Ipr, User } from '@prisma/client';

@Injectable()
export class CanUpdateGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const user = context.switchToHttp().getRequest().user as User;
    const ipr = context.switchToHttp().getResponse().locals.ipr as Ipr;

    return true;
  }
}
