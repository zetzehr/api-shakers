import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
class BaseItem {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;
}

@Schema({ _id: false })
class Subcategory extends BaseItem {
  @Prop({ required: true })
  categoryId: number;
}

@Schema()
export class Keyword extends Document {
  @Prop({ type: [BaseItem] })
  skills: BaseItem[];

  @Prop({ type: [BaseItem] })
  specialties: BaseItem[];

  @Prop({ type: [BaseItem] })
  industries: BaseItem[];

  @Prop({ type: [BaseItem] })
  categories: BaseItem[];

  @Prop({ type: [Subcategory] })
  subcategories: Subcategory[];
}

export const KeywordSchema = SchemaFactory.createForClass(Keyword);
