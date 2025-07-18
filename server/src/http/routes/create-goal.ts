import { z } from 'zod';
import { createGoal, type CreateGoalRequest } from '../../features/create-goal';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
      },
    },
    async request => {
      const { title, desiredWeeklyFrequency } =
        request.body as CreateGoalRequest;

      await createGoal({
        title,
        desiredWeeklyFrequency,
      });
    }
  );
};
