import { z } from 'zod';
import { createGoalCompletion } from '../../features/create-goal-completion';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

export const createCompletionGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async request => {
      const { goalId } = request.body;

      await createGoalCompletion({ goalId });
    }
  );
};
