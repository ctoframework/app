export default function handler(req, res) {
  const size = 16; // favicon standard size
  const bytesPerPixel = 4; // RGBA

  // Generate raw pixel data (solid blue square)
  const pixelData = Buffer.alloc(size * size * bytesPerPixel);
  for (let i = 0; i < size * size; i++) {
    pixelData[i * 4 + 2] = 126; // R
    pixelData[i * 4 + 1] = 86; // G
    pixelData[i * 4 + 0] = 194; // B
    pixelData[i * 4 + 3] = 255; // A
  }

  // BMP header inside ICO (BITMAPINFOHEADER)
  const header = Buffer.alloc(40);
  header.writeUInt32LE(40, 0); // header size
  header.writeInt32LE(size, 4); // width
  header.writeInt32LE(size * 2, 8); // height * 2 (includes XOR+AND masks)
  header.writeUInt16LE(1, 12); // planes
  header.writeUInt16LE(32, 14); // bits per pixel
  header.writeUInt32LE(0, 16); // compression
  header.writeUInt32LE(pixelData.length, 20); // image size
  header.writeInt32LE(0, 24); // x pixels per metre
  header.writeInt32LE(0, 28); // y pixels per metre
  header.writeUInt32LE(0, 32); // colours in palette
  header.writeUInt32LE(0, 36); // important colours

  // ICO header
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // type = icon
  icoHeader.writeUInt16LE(1, 4); // image count

  // ICO directory entry
  const icoDirEntry = Buffer.alloc(16);
  icoDirEntry.writeUInt8(size, 0); // width
  icoDirEntry.writeUInt8(size, 1); // height
  icoDirEntry.writeUInt8(0, 2); // palette
  icoDirEntry.writeUInt8(0, 3); // reserved
  icoDirEntry.writeUInt16LE(1, 4); // colour planes
  icoDirEntry.writeUInt16LE(32, 6); // bits per pixel
  icoDirEntry.writeUInt32LE(header.length + pixelData.length, 8); // size of BMP data
  icoDirEntry.writeUInt32LE(6 + 16, 12); // offset

  // Combine into ICO
  const icoBuffer = Buffer.concat([icoHeader, icoDirEntry, header, pixelData]);

  res.setHeader("Content-Type", "image/x-icon");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(icoBuffer);
}
