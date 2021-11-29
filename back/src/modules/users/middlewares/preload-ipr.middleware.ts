import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from '@common/services';
import { validate } from 'uuid';

@Injectable()
export class PreloadIprMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  public async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!validate(id)) {
      throw new BadRequestException(['id must be a UUID']);
    }

    const ipr = await this.prisma.ipr.findUnique({
      where: {
        id,
      },
    });

    if (!ipr) {
      throw new NotFoundException('Invalid id');
    }

    res.locals.ipr = ipr;

    next();
  }
}
