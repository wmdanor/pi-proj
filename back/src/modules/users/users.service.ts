import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/services';
import { Prisma, User, UserRole } from '@prisma/client';
import {
  CountRecordersRequest,
  CreateRecorderRequest,
  GetRecordersRequest,
} from '@modules/users/dtos/requests';
import * as generator from 'generate-password';
import * as bcrypt from 'bcrypt';

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public getUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async createRecorder(data: CreateRecorderRequest): Promise<User> {
    const password = generator.generate({
      length: getRandomInt(12, 16),
    });
    const encryptedPassword = await bcrypt.hash(password, 10);

    const result = await this.prisma.user.create({
      data: {
        ...data,
        role: UserRole.Recorder,
        password: encryptedPassword,
      },
    });

    // TODO: Send email
    console.log('Email sent');

    return result;
  }

  public async getRecorder(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id,
        role: UserRole.Recorder,
      },
    });
  }

  public async updateRecorder(id: string, data): Promise<User | null> {
    return this.prisma.user.update({
      data: {
        ...data,
      },
      where: {
        id,
      },
    });
  }

  public async activateRecorder(
    id: string,
    isActive: boolean,
  ): Promise<User | null> {
    return this.prisma.user.update({
      data: {
        isActive,
      },
      where: {
        id,
      },
    });
  }

  public async countRecorders(query: CountRecordersRequest): Promise<number> {
    const { q } = query;
    const args: Prisma.UserCountArgs = {
      where: {
        role: UserRole.Recorder,
      },
    };

    if (q) {
      const parsedQuery = q.split(' ').join(' | ');

      args.where.OR = {
        firstName: {
          search: parsedQuery,
          mode: 'insensitive',
        },
        lastName: {
          search: parsedQuery,
          mode: 'insensitive',
        },
        patronymic: {
          search: parsedQuery,
          mode: 'insensitive',
        },
      };
    }

    return this.prisma.user.count(args);
  }

  public async getRecorders(query: GetRecordersRequest): Promise<User[]> {
    const { q, limit, offset } = query;
    const args: Prisma.UserFindManyArgs = {
      skip: offset,
      take: limit,
      where: {
        role: UserRole.Recorder,
      },
    };

    if (q) {
      const parsedQuery = q.split(' ').join(' | ');

      args.where.OR = {
        firstName: {
          search: parsedQuery,
          mode: 'insensitive',
        },
        lastName: {
          search: parsedQuery,
          mode: 'insensitive',
        },
        patronymic: {
          search: parsedQuery,
          mode: 'insensitive',
        },
      };
    }

    return this.prisma.user.findMany(args);
  }
}
