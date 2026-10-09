import { deflateSync } from 'node:zlib';
import type { Route } from './+types/app-icon';
function crc32(data: Buffer) {
  let crc = 0xffffffff;
  for (const byte of data) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type: string, data: Buffer) {
  const name = Buffer.from(type);
  const size = Buffer.alloc(4); size.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([size, name, data, crc]);
}
export function loader({ url }: Route.LoaderArgs) {
  const size = url.searchParams.get('size') === '192' ? 192 : 512;
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const nx = x / size, ny = y / size;
    const leftPage = nx > 0.23 && nx < 0.485 && ny > 0.29 + (nx - 0.23) * 0.14 && ny < 0.67 + (nx - 0.23) * 0.14;
    const rightPage = nx > 0.515 && nx < 0.77 && ny > 0.325 - (nx - 0.515) * 0.14 && ny < 0.705 - (nx - 0.515) * 0.14;
    const dot = (nx - 0.79) ** 2 + (ny - 0.77) ** 2 < 0.002;
    const color = leftPage || rightPage ? [244, 226, 222] : dot ? [184, 133, 107] : [88, 61, 80];
    const i = y * (size * 4 + 1) + 1 + x * 4;
    raw[i] = color[0]; raw[i + 1] = color[1]; raw[i + 2] = color[2]; raw[i + 3] = 255;
  }
  const header = Buffer.alloc(13); header.writeUInt32BE(size, 0); header.writeUInt32BE(size, 4); header[8] = 8; header[9] = 6;
  const png = Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', header), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' } });
}
