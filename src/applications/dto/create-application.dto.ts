import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty()
  eventId: number;

  @ApiProperty({ required: false })
  message?: string;
}
