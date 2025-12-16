import struct
import zlib
import os

def create_png(width, height, filename):
    # RGB color (Blue-ish: 59, 130, 246) - similar to Tailwind blue-500
    r, g, b = 59, 130, 246

    # Simple PNG writer
    # Signature
    png = b'\x89PNG\r\n\x1a\n'

    # IHDR chunk
    ihdr = struct.pack('!I4sIIBBBBB', 13, b'IHDR', width, height, 8, 2, 0, 0, 0)
    ihdr += struct.pack('!I', zlib.crc32(ihdr[4:]) & 0xFFFFFFFF)
    png += ihdr

    # IDAT chunk
    # raw data: 1 byte filter (0) per scanline + width * 3 bytes (RGB)
    raw_data = b''
    for _ in range(height):
        raw_data += b'\x00' + struct.pack('BBB', r, g, b) * width

    compressed = zlib.compress(raw_data)
    idat = struct.pack('!I4s', len(compressed), b'IDAT') + compressed
    idat += struct.pack('!I', zlib.crc32(idat[4:]) & 0xFFFFFFFF)
    png += idat

    # IEND chunk
    iend = struct.pack('!I4s', 0, b'IEND')
    iend += struct.pack('!I', zlib.crc32(iend[4:]) & 0xFFFFFFFF)
    png += iend

    with open(filename, 'wb') as f:
        f.write(png)
    print(f"Created {filename}")

os.makedirs('public/icons', exist_ok=True)
create_png(48, 48, 'public/icons/icon-48.png')
create_png(128, 128, 'public/icons/icon-128.png')
