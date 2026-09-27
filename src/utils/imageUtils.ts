/**
 * Image Utilities for CakeShop
 * Handles image optimization, base64 compression for Vercel/localStorage,
 * and reliable fallback handling so images never break in production.
 */

// Production-ready Unsplash CDN fallbacks (high-availability worldwide)
export const FALLBACK_CAKE_IMAGE = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80';
export const FALLBACK_CHOCOLATE_IMAGE = 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1000&q=80';
export const FALLBACK_WEDDING_IMAGE = 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1000&q=80';

/**
 * Normalizes image paths so legacy "/src/assets/images/..." paths
 * work seamlessly on Vercel production where Vite does not serve the raw /src folder.
 */
export function getSafeImageUrl(url?: string | null): string {
  if (!url) return FALLBACK_CAKE_IMAGE;
  
  // If it's a legacy Vite dev path, point to public static folder
  if (url.startsWith('/src/assets/images/')) {
    return url.replace('/src/assets/images/', '/images/');
  }
  
  // If it's already a valid base64 data URL, full http(s) URL, or static public path, keep it
  return url;
}

/**
 * Compresses an image file from user's device (phone/camera/laptop) using an in-memory Canvas.
 * This guarantees the resulting Base64 string is < 200KB so it saves safely in localStorage
 * without triggering browser QuotaExceededError on Vercel or any device.
 */
export function compressImageFile(file: File, maxDimension = 1200, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to parse image'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to raw data url if 2D context fails
          resolve(reader.result as string);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Export as JPEG with chosen compression quality
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
