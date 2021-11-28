import { Type } from 'class-transformer';
import { IsBooleanString } from 'class-validator';

export class ActivateRecorderRequest {
  @IsBooleanString()
  @Type(() => Boolean)
  public isActive: boolean;
}
