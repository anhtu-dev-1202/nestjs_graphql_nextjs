import { ApiProperty } from "@nestjs/swagger";

export class StudentResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    teacher: string
}