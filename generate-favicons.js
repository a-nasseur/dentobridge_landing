const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const publicDir = path.join(__dirname, 'public');

  try {
    // Generate apple-touch-icon.png (180x180) from favicon128.png
    console.log('Generating apple-touch-icon.png (180x180px)...');
    await sharp(path.join(publicDir, 'favicon128.png'))
      .resize(180, 180, {
        kernel: sharp.kernel.lanczos3,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('✓ apple-touch-icon.png created');

    // Generate 16x16 PNG from favicon32.png for ICO generation
    console.log('Generating temporary 16x16 PNG...');
    await sharp(path.join(publicDir, 'favicon32.png'))
      .resize(16, 16, {
        kernel: sharp.kernel.lanczos3,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16-temp.png'));

    // Note: sharp doesn't support ICO format directly
    // We'll use a different approach - convert PNG to ICO using online tool or ImageMagick
    console.log('\n⚠️  Note: sharp does not support ICO format generation.');
    console.log('Options for favicon.ico generation:');
    console.log('1. Use ImageMagick: convert favicon32.png favicon-16x16-temp.png favicon.ico');
    console.log('2. Use online tool: https://favicon.io or https://cloudconvert.com');
    console.log('3. Install "to-ico" npm package\n');

    console.log('All PNG favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
