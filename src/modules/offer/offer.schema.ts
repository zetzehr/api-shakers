// offer.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OfferDocument = Offer & Document;

@Schema()
export class Organization {
  @Prop() id: number;
  @Prop() name: string;
  @Prop() logo: string;
  @Prop() industry: number;
}

@Schema()
export class ProjectLeader {
  @Prop() id: number;
  @Prop() name: string;
  @Prop() lastName: string;
}

@Schema()
export class Budget {
  @Prop({ nullable: true }) hourFrom: number;
  @Prop({ nullable: true }) hourTo: number;
  @Prop() total: number;
}

@Schema()
export class FAQ {
  @Prop() question: string;
  @Prop() answer: string;
}

@Schema()
export class Position {
  @Prop() id: number;
  @Prop() title: string;
  @Prop([Number]) skills: number[];
  @Prop([Number]) specialties: number[];
  @Prop() referralBonus: number;
}

@Schema()
export class Offer {
  @Prop() id: number;
  @Prop() title: string;
  @Prop({ type: Organization }) organization: Organization;
  @Prop({ type: ProjectLeader }) projectLeader: ProjectLeader;
  @Prop() category: number;
  @Prop() subcategory: number;
  @Prop() startDate: Date;
  @Prop({ type: Budget }) budget: Budget;
  @Prop() totalHours: number;
  @Prop() description: string;
  @Prop([String]) goals: string[];
  @Prop({ type: [FAQ] }) faqs: FAQ[];
  @Prop() status: string;
  @Prop() creationDate: Date;
  @Prop({ type: [Position] }) positions: Position[];
  @Prop() totalApplicationsAmount: number;
  @Prop() publishedAt: Date;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
