import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import router from './router.js'
import { cors } from 'hono/cors'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))

// 打刻履歴取得API
app.get('/attendances/history', (c) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const dayBeforeYesterday = new Date(today);
  dayBeforeYesterday.setDate(today.getDate() - 2);
  return c.json([
    {
      date: dayBeforeYesterday.toISOString().split('T')[0],
      startTime: '08:30',
      endTime: '17:30',
      breaks: [
        {
          start: '12:00',
          end: '13:00'
        }
      ]
    },
    {
      date: yesterday.toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '18:00',
      breaks: [
        {
          start: '12:00',
          end: '13:00'
        }
      ]
    },])
})

// 打刻API
app.post('/attendances', async (c) => {
  const { startTime, endTime, breaks } = await c.req.json();
  const today = new Date();
  const date = today.toISOString().split('T')[0];
  const start = startTime || today.toTimeString().split(' ')[0].slice(0, 5);
  const end = endTime || today.toTimeString().split(' ')[0].slice(0, 5);
  const breakTimes = breaks || [];
  const breakTimesFormatted = breakTimes.map((b: { start: string; end: string }) => ({
    start: b.start || today.toTimeString().split(' ')[0].slice(0, 5),
    end: b.end || today.toTimeString().split(' ')[0].slice(0, 5)
  }));
  return c.json({
    date,
    startTime: start,
    endTime: end,
    breaks: breakTimesFormatted
  });
})

app.route('/', router);