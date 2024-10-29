import fastify from 'fastify';
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { createGoalRoute } from './routes/create-goal';
import { createCompletionGoalRoute } from './routes/create-completion-goal';
import { getPendingGoalsRoute } from './routes/get-pending-goals';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);
app.register(createCompletionGoalRoute);
app.register(getPendingGoalsRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running');
  });
