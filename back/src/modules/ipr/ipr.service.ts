import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/services';
import { Ipr, Prisma } from '@prisma/client';
import {
  CountIprsRequest,
  CreateIprRequest,
  GetIprsRequest,
  UpdateIprRequest,
} from '@modules/ipr/dtos/requests';

@Injectable()
export class IprService {
  constructor(private readonly prisma: PrismaService) {}

  public async getIprFilters(): Promise<unknown> {
    // TODO
    return {};
  }

  public async getIprs(query: GetIprsRequest): Promise<Ipr[]> {
    const {
      limit,
      offset,
      publicationTitle,
      publicationObject,
      authorName,
      copyrightRegistrationNumber,
    } = query;

    const args: Prisma.IprFindManyArgs = {
      take: limit,
      skip: offset,
      where: {},
      include: {
        publicationObject: true,
        authors: true,
      },
    };

    if (!copyrightRegistrationNumber) {
      args.where.copyrightRegistrationNumber = copyrightRegistrationNumber;
    }

    if (!publicationTitle) {
      args.where.publicationTitle = {
        contains: publicationTitle,
        mode: 'insensitive',
      };
    }

    if (!publicationObject) {
      args.where.publicationObject = {
        is: {
          name: publicationObject,
        },
      };
    }

    if (!authorName) {
      const parsedAuthorName = authorName.split(' ').join(' | ');
      args.where.authors = {
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

    return this.prisma.ipr.findMany(args);
  }

  public async countIprs(query: CountIprsRequest): Promise<number> {
    const {
      publicationTitle,
      publicationObject,
      authorName,
      copyrightRegistrationNumber,
    } = query;

    const args: Prisma.IprCountArgs = {
      where: {},
    };

    if (!copyrightRegistrationNumber) {
      args.where.copyrightRegistrationNumber = copyrightRegistrationNumber;
    }

    if (!publicationTitle) {
      args.where.publicationTitle = {
        contains: publicationTitle,
        mode: 'insensitive',
      };
    }

    if (!publicationObject) {
      args.where.publicationObject = {
        is: {
          name: publicationObject,
        },
      };
    }

    if (!authorName) {
      const parsedAuthorName = authorName.split(' ').join(' | ');
      args.where.authors = {
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

    return this.prisma.ipr.count(args);
  }

  public async createIpr(data: CreateIprRequest, userId: string): Promise<Ipr> {
    const { authors, publicationObjectTypeId, ...props } = data;

    return this.prisma.ipr.create({
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

  public async updateIpr(id: string, data: UpdateIprRequest): Promise<Ipr> {
    const { authors, deleteAuthors, publicationObjectTypeId, ...props } = data;
    const delAuthors = deleteAuthors.map((item) => {
      return { id: item };
    });

    return this.prisma.ipr.update({
      where: {
        id,
      },
      data: {
        ...props,
        publicationObject: {
          connect: {
            id: publicationObjectTypeId,
          },
        },
        authors: {
          create: authors,
          deleteMany: delAuthors,
        },
      },
      include: {
        publicationObject: true,
        authors: true,
      },
    });
  }
}
