import { Hono } from "hono";

const router = new Hono();

router.get('/get', (c) => c.json({ message: 'GET request received' }));

router.post('/post', async (c) => {
  const requestBody = await c.req.json();
  return c.json({ message: 'POST request received', data: requestBody });
});

export default router;