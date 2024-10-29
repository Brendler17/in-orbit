import { client, db } from './index';
import { goals, goalsCompleted } from './schema';
import dayjs from 'dayjs';

async function seed() {
  await db.delete(goalsCompleted);
  await db.delete(goals);

  const response = await db
    .insert(goals)
    .values([
      { title: 'Estudar 3h', desiredWeeklyFrequency: 5 },
      { title: "Tomar 3L d'água", desiredWeeklyFrequency: 7 },
      { title: 'Caminhar 5km', desiredWeeklyFrequency: 3 },
    ])
    .returning();

  const startOfWeek = dayjs().startOf('week');

  await db.insert(goalsCompleted).values([
    { goalId: response[0].id, createdAt: startOfWeek.add(3, 'day').toDate() },
    { goalId: response[2].id, createdAt: startOfWeek.add(3, 'day').toDate() },
  ]);
}

seed().finally(() => {
  client.end();
});
