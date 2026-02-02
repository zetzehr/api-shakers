import 'dotenv/config';
import { connect } from 'mongoose';
import { Keyword, KeywordSchema } from '../keyword/keyword.schema';
import { model } from 'mongoose';
import { skills, specialties, industries, categories, subcategories } from '../../data/keyword.data';

async function seed() {
  await connect(process.env.MONGO_URI as string);

  const KeywordModel = model(Keyword.name, KeywordSchema);

  await KeywordModel.deleteMany({});

  await KeywordModel.create({
    skills,
    specialties,
    industries,
    categories,
    subcategories,
  });

  console.log('Keywords seed OK');
  process.exit(0);
}

seed();
