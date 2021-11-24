-- CreateEnum
CREATE TYPE "AuthorPublicNameType" AS ENUM ('Pseudonym');

-- CreateEnum
CREATE TYPE "IprUpdatesLogsType" AS ENUM ('Test');

-- CreateEnum
CREATE TYPE "PublicationCreationReason" AS ENUM ('Test');

-- CreateEnum
CREATE TYPE "PublicationObjectType" AS ENUM ('Test');

-- CreateEnum
CREATE TYPE "PublicationOrigin" AS ENUM ('Derivative', 'NonDerivative');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Administrator', 'Recorder');

-- CreateTable
CREATE TABLE "Author" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "patronymic" VARCHAR NOT NULL,
    "birthdate" DATE NOT NULL,
    "postalAddress" VARCHAR NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ipr" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "applicationNumber" BIGINT NOT NULL,
    "applicationDate" DATE NOT NULL,
    "copyrightRegistrationNumber" BIGINT NOT NULL,
    "copyrightRegistrationDate" DATE NOT NULL,
    "certificateIssueDate" DATE NOT NULL,
    "officialBulletinNumber" BIGINT NOT NULL,
    "publicationSphereData" VARCHAR NOT NULL,
    "publicationType" VARCHAR NOT NULL,
    "publicationTitle" VARCHAR NOT NULL,
    "publicationAlternativeTitle" VARCHAR,
    "publicationOrigin" "PublicationOrigin" NOT NULL,
    "publicationCreationReason" "PublicationCreationReason" NOT NULL,
    "authorPublicNameType" "AuthorPublicNameType" NOT NULL,
    "publicationObject" "PublicationObjectType" NOT NULL,
    "publicationPublicData" TEXT,
    "paymentReceiptCode" VARCHAR,

    CONSTRAINT "Ipr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IprAuthorRelationships" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "iprId" UUID NOT NULL,
    "authorId" UUID NOT NULL,

    CONSTRAINT "IprAuthorRelationships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IprUpdatesLogs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,
    "affectedIprId" UUID NOT NULL,
    "type" "IprUpdatesLogsType" NOT NULL,
    "updateReason" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "documentNumber" VARCHAR,

    CONSTRAINT "IprUpdatesLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "addressCity" VARCHAR,
    "addressDistrict" VARCHAR,
    "addressStreet" VARCHAR,
    "addressHouse" VARCHAR,

    CONSTRAINT "Organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PassportAuthorities" (
    "id" UUID NOT NULL,
    "code" VARCHAR(4) NOT NULL,
    "name" VARCHAR NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "address" VARCHAR NOT NULL,

    CONSTRAINT "PassportAuthorities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(72) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "UserRole" NOT NULL,
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "patronymic" VARCHAR NOT NULL,
    "birthDate" DATE NOT NULL,
    "passportSeries" VARCHAR,
    "passportNumber" VARCHAR NOT NULL,
    "passportIssueDate" VARCHAR NOT NULL,
    "passportAuthority" VARCHAR(4) NOT NULL,
    "inn" VARCHAR,
    "organizationId" UUID,
    "organizationPosition" VARCHAR,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IprAuthorRelationships" ADD CONSTRAINT "IprAuthorRelationships_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "IprAuthorRelationships" ADD CONSTRAINT "IprAuthorRelationships_iprId_fkey" FOREIGN KEY ("iprId") REFERENCES "Ipr"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "IprUpdatesLogs" ADD CONSTRAINT "IprUpdatesLogs_affectedIprId_fkey" FOREIGN KEY ("affectedIprId") REFERENCES "Ipr"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "IprUpdatesLogs" ADD CONSTRAINT "IprUpdatesLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
