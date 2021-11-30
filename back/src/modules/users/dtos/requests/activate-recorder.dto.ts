import { IsBoolean } from 'class-validator';

export class ActivateRecorderRequest {
  @IsBoolean()
  public isActive: boolean;
}
