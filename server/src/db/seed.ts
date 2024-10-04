import { client, db } from './index';
import { goals, goalsCompleted } from './schema';

async function seed() {
  await db.delete(goalsCompleted);
  await db.delete(goals);

  await db.insert(goals).values([
    { title: 'Estudar 3h', desiredWeeklyFrequency: 5 },
    { title: "Tomar 3L d'água", desiredWeeklyFrequency: 7 },
    { title: 'Caminhar 5km', desiredWeeklyFrequency: 3 },
  ]);
}

seed().finally(() => {
  client.end();
});
