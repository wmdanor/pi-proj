import { IsUUID } from 'class-validator';

export class UuidParamRequest {
  @IsUUID()
  public id: string;
}
