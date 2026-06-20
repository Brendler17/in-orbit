import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';
import { CheckCircle2, Plus } from 'lucide-react';
import { getSummary } from '../http/get-summary';
import { InOrbitLogo } from './in-orbit-logo';
import { PendingGoals } from './pending-goals';
import { Button } from './ui/button';
import { DialogTrigger } from './ui/dialog';
import { Progress, ProgressIndicator } from './ui/progress-bar';
import { Separator } from './ui/separator';

dayjs.locale(ptBR);

export function Summary() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  });

  if (!data) {
    return null;
  }

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM');
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM');

  const completedPercentage = Math.round(
    (data.completedGoals * 100) / data.totalGoals
  );

  return (
    <div className="py-10 px-5 max-w-120 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitLogo />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{data.completedGoals}</span> de{' '}
            <span className="text-zinc-100">{data.totalGoals}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>

        <Separator />

        <PendingGoals />

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Sua semana</h2>

          {Object.entries(data.goalsPerDay).map(([date, goals]) => {
            const weekDay = dayjs(date).format('dddd');
            const formattedDate = dayjs(date).format('D[ de ]MMMM');

            return (
              <div key={date} className="flex flex-col gap-4">
                <h3 className="font-medium">
                  <span className="capitalize">{weekDay} </span>
                  <span className="text-zinc-400 text-xs">
                    ({formattedDate})
                  </span>
                </h3>

                <ul className="flex flex-col gap-3">
                  {goals.map(goal => {
                    const time = dayjs(goal.createdAt).format('HH:mm');

                    return (
                      <li key={goal.id} className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-pink-500" />
                        <span className="text-sm text-zinc-400 ">
                          Você completou "
                          <span className="text-zinc-100">{goal.title}</span>"
                          às <span className="text-zinc-100">{time}h</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
