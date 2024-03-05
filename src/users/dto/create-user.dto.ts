import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString(
        // {message: "Invalid name"}
    )
    name: string;

    @IsEmail({}, {message: "Invalid email"}) 
    email: string;

    @IsEnum(["INTERN", "ENGINEER", "ADMIN"], {
        message: "Role must be either INTERN, ENGINEER, or ADMIN"
    })
    role: "INTERN" | "ENGINEER" | "ADMIN";
}