// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { createCanvas } from 'node-canvas'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const canvas = createCanvas(1200, 630)
  const ctx = canvas.getContext('2d')

  const color = req.query.color.toString()
  ctx.fillStyle = (color.length == 6 && /^[a-fA-F0-9]6$/) ? `#${color}` : color
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  res.setHeader('Content-Type', 'image/png');
  canvas.createPNGStream().pipe(res);
}
