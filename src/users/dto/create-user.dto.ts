import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString(
        // {message: "Invalid name"}
    )
    readonly name: string;

    @IsEmail({}, {message: "Invalid email"}) 
    readonly email: string;

    @IsEnum(["INTERN", "ENGINEER", "ADMIN"], {
        message: "Role must be either INTERN, ENGINEER, or ADMIN"
    })
    readonly role: "INTERN" | "ENGINEER" | "ADMIN";
}


