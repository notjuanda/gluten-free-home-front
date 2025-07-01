import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = path.join(process.cwd(), 'public');
const outputDir = path.join(process.cwd(), 'public/optimized');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const files = fs.readdirSync(inputDir).filter(file => /\.(jpe?g|png|webp)$/i.test(file));

files.forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputName = path.parse(file).name + '.webp';
    const outputPath = path.join(outputDir, outputName);
    sharp(inputPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 60, effort: 6 })
        .toFile(outputPath)
        .then(() => console.log(`Optimizada: ${outputName}`))
        .catch(err => console.error(`Error optimizando ${file}:`, err));
});
 