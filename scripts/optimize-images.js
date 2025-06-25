import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');
const OUTPUT_DIR = path.join(__dirname, '../public/optimized');

console.log('🔍 Verificando directorios...');
console.log('PUBLIC_DIR:', PUBLIC_DIR);
console.log('OUTPUT_DIR:', OUTPUT_DIR);

// Verificar si el directorio public existe
if (!fs.existsSync(PUBLIC_DIR)) {
    console.error('❌ El directorio public no existe:', PUBLIC_DIR);
    process.exit(1);
}

// Asegurar que el directorio de salida existe
if (!fs.existsSync(OUTPUT_DIR)) {
    console.log('📁 Creando directorio de salida...');
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Configuración de tamaños para responsive images
const SIZES = {
    small: 480,
    medium: 768,
    large: 1024,
    xlarge: 1920
};

// Función para optimizar una imagen
async function optimizeImage(inputPath, filename) {
    console.log(`🖼️  Optimizando: ${filename}`);
    
    // Generar versiones WebP en diferentes tamaños con compresión agresiva
    for (const [sizeName, width] of Object.entries(SIZES)) {
        const outputFilename = `${path.parse(filename).name}-${sizeName}.webp`;
        const outputPath = path.join(OUTPUT_DIR, outputFilename);
        
        await sharp(inputPath)
            .resize(width, null, { 
                withoutEnlargement: true,
                fit: 'inside'
            })
            .webp({ 
                quality: 60, // Compresión muy agresiva
                effort: 6,
                nearLossless: false // Desactivar para mejor compresión
            })
            .toFile(outputPath);
        
        // Verificar tamaño del archivo generado
        const stats = fs.statSync(outputPath);
        const sizeKB = Math.round(stats.size / 1024);
        console.log(`  ✓ ${outputFilename} (${width}px) - ${sizeKB}KB`);
    }
    
    // Generar versión original en WebP con compresión agresiva
    const originalWebp = `${path.parse(filename).name}.webp`;
    const originalWebpPath = path.join(OUTPUT_DIR, originalWebp);
    
    await sharp(inputPath)
        .webp({ 
            quality: 65, // Compresión agresiva
            effort: 6,
            nearLossless: false
        })
        .toFile(originalWebpPath);
    
    // Verificar tamaño del archivo original
    const stats = fs.statSync(originalWebpPath);
    const sizeKB = Math.round(stats.size / 1024);
    console.log(`  ✓ ${originalWebp} (original) - ${sizeKB}KB`);
}

// Función principal
async function main() {
    console.log('🟢 main() ejecutándose...');
    try {
        console.log('🚀 Iniciando optimización agresiva de imágenes...\n');
        
        const files = fs.readdirSync(PUBLIC_DIR);
        console.log('📂 Archivos encontrados en public:', files);
        
        const imageFiles = files.filter(file => 
            /\.(jpg|jpeg|png)$/i.test(file) && 
            !file.includes('optimized')
        );
        
        console.log('🖼️  Imágenes a optimizar:', imageFiles);
        
        if (imageFiles.length === 0) {
            console.log('⚠️  No se encontraron imágenes para optimizar');
            return;
        }
        
        for (const file of imageFiles) {
            const inputPath = path.join(PUBLIC_DIR, file);
            await optimizeImage(inputPath, file);
            console.log('');
        }
        
        console.log('🎉 Optimización agresiva completada!');
        console.log(`📁 Imágenes optimizadas guardadas en: ${OUTPUT_DIR}`);
        
    } catch (error) {
        console.error('❌ Error en la optimización:', error);
        process.exit(1);
    }
}

// Ejecutar siempre si es el archivo principal
main().catch(error => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
}); 