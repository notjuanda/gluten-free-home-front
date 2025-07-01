const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public');
const outputDir = path.join(__dirname, '../public/optimized');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const files = fs.readdirSync(inputDir).filter(file => /\.(jpe?g|png|webp)$/i.test(file));

files.forEach(file => {
  const inputPath = path.join(inputDir, file);
  const outputName = path.parse(file).name + '.webp';
  const outputPath = path.join(outputDir, outputName);
  sharp(inputPath)
    .webp({ quality: 70, effort: 6 })
    .toFile(outputPath)
    .then(() => console.log(`Optimizada: ${outputName}`))
    .catch(err => console.error(`Error optimizando ${file}:`, err));
}); 