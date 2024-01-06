import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';

const createScheduleBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  observations: z.string(),
  date: z.string().datetime(),
});

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const username = String(req.query.username);

  const user = await prisma.user.findUnique({
    where: {
      username,
    }
  });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const { name, email, observations, date } = createScheduleBodySchema.parse(
    req.body,
  );

  const schedulingDate = dayjs(date).startOf('hour');

  if (schedulingDate.isBefore(new Date())) {
    return res.status(400).json({
      message: 'Date is in the past'
    });
  }

  const conflictingScheduling = await prisma.schedule.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    }
  });

  if (conflictingScheduling) {
    return res.status(400).json({
      message: 'There is another scheduling at the same time'
    });
  }

  await prisma.schedule.create({
    data: {
      name,
      email,
      observations,
      date: schedulingDate.toDate(),
      user_id: user.id,
    }
  });

  return res.status(201).end();
};