import { CreateDriverInput } from './create-driver.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateDriverInput extends PartialType(CreateDriverInput) {
  id: number;
}
