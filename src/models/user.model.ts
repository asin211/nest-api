import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

@Prop({ required: true, enum: ['INTERN', 'ENGINEER', 'ADMIN'] })
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User);
