import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@common/services';
import {
  Ipr,
  IprUpdatesLogsType,
  Prisma,
  PublicationObjectType,
  User,
  UserRole,
} from '@prisma/client';
import {
  CountIprsRequest,
  CreateIprRequest,
  GetIprsRequest,
  UpdateIprRequest,
} from '@modules/ipr/dtos/requests';

@Injectable()
export class IprService {
  constructor(private readonly prisma: PrismaService) {}

  public async getIprObjectTypes(): Promise<PublicationObjectType[]> {
    return this.prisma.publicationObjectType.findMany();
  }

  public async getIprs(query: GetIprsRequest): Promise<Ipr[]> {
    const { limit, offset } = query;

    const args: Prisma.IprFindManyArgs = {
      take: limit,
      skip: offset,
      where: IprService.generateIprWhereInput(query),
      include: {
        publicationObject: true,
        authors: true,
      },
    };

    return this.prisma.ipr.findMany(args);
  }

  public async countIprs(query: CountIprsRequest): Promise<number> {
    const args: Prisma.IprCountArgs = {
      where: IprService.generateIprWhereInput(query),
    };

    return this.prisma.ipr.count(args);
  }

  public async createIpr(data: CreateIprRequest, userId: string): Promise<Ipr> {
    const { authors, publicationObjectTypeId, ...props } = data;

    const ipr = await this.prisma.ipr.create({
      data: {
        ...props,
        createdBy: {
          connect: {
            id: userId,
          },
        },
        publicationObject: {
          connect: {
            id: publicationObjectTypeId,
          },
        },
        authors: {
          create: authors,
        },
      },
      include: {
        publicationObject: true,
        authors: true,
      },
    });

    await this.prisma.iprUpdatesLog.create({
      data: {
        type: IprUpdatesLogsType.Update,
        description: 'Додавання права інтелектуальної власності до реєстру',
        updateReason: 'Ipr creation',
        user: {
          connect: {
            id: userId,
          },
        },
        ipr: {
          connect: {
            id: ipr.id,
          },
        },
      },
    });

    return ipr;
  }

  public async getIpr(id: string): Promise<Ipr> {
    return this.prisma.ipr.findUnique({
      where: {
        id,
      },
      include: {
        publicationObject: true,
        authors: true,
      },
    });
  }

  public async updateIpr(
    id: string,
    data: UpdateIprRequest,
    user: User,
  ): Promise<Ipr> {
    const { authors, publicationObjectTypeId, ...props } = data;

    const checkIpr = await this.prisma.ipr.findUnique({
      where: {
        id,
      },
      include: {
        authors: true,
      },
    });

    if (checkIpr.userId !== user.id && user.role !== UserRole.Administrator) {
      throw new UnauthorizedException(
        'You have no permission to perform this operation',
      );
    }

    const args: Prisma.IprUpdateArgs = {
      where: {
        id,
      },
      data: {
        ...props,
      },
      include: {
        publicationObject: true,
        authors: true,
      },
    };

    if (publicationObjectTypeId) {
      args.data.publicationObject = {
        connect: {
          id: publicationObjectTypeId,
        },
      };
    }

    if (authors) {
      const connOrCr = authors.map((item) => {
        const { id: authorId, ...other } = item;
        return {
          where: {
            id: authorId,
          },
          create: other,
        };
      });

      const conn = authors
        .filter((item) => item.id)
        .map((item) => {
          const { id: authorId, ...other } = item;
          return { id: authorId };
        });

      const creat = authors
        .filter((item) => !item.id)
        .map((item) => {
          const { id: authorId, ...other } = item;
          return other;
        });

      const toDelAuthors = checkIpr.authors
        .filter(
          (itemCheck) => !authors.find((item) => item.id === itemCheck.id),
        )
        .map((item) => {
          return { id: item.id };
        });

      // console.log(creat, conn, connOrCr, toDelAuthors);

      args.data.authors = args.data.authors ?? {};
      args.data.authors.create = creat;
      args.data.authors.connect = conn;
      args.data.authors.deleteMany = toDelAuthors;
      // args.data.authors.connectOrCreate = connOrCr;
    }

    const ipr = await this.prisma.ipr.update(args);

    await this.prisma.iprUpdatesLog.create({
      data: {
        type: IprUpdatesLogsType.Create,
        description: 'Редагування права інтелектуальної власності у реєстрі',
        updateReason: 'Ipr update',
        user: {
          connect: {
            id: user.id,
          },
        },
        ipr: {
          connect: {
            id: ipr.id,
          },
        },
      },
    });

    return ipr;
  }

  private static generateIprWhereInput(
    query: GetIprsRequest | CountIprsRequest,
  ): Prisma.IprWhereInput {
    const {
      publicationTitle,
      publicationObjectTypeId,
      authorName,
      copyrightRegistrationNumber,
    } = query;

    const whereInput: Prisma.IprWhereInput = {};

    if (copyrightRegistrationNumber) {
      whereInput.copyrightRegistrationNumber = copyrightRegistrationNumber;
    }

    if (publicationTitle) {
      whereInput.publicationTitle = {
        contains: publicationTitle,
        mode: 'insensitive',
      };
    }

    if (publicationObjectTypeId) {
      whereInput.publicationObject = {
        is: {
          id: publicationObjectTypeId,
        },
      };
    }

    if (authorName) {
      const parsedAuthorName = authorName.split(' ').join(' | ');
      whereInput.authors = {
        some: {
          firstName: {
            search: parsedAuthorName,
            mode: 'insensitive',
          },
          lastName: {
            search: parsedAuthorName,
            mode: 'insensitive',
          },
          patronymic: {
            search: parsedAuthorName,
            mode: 'insensitive',
          },
        },
      };
    }

    return whereInput;
  }
}
