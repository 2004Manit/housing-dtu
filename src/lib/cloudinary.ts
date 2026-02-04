/**
 * Cloudinary Image Optimization Utility
 * 
 * Provides functions to optimize images through Cloudinary CDN
 */

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = 'dgof5pmgh';
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`;

/**
 * Optimizes a Supabase storage image URL through Cloudinary's fetch API
 * This allows automatic optimization without manually uploading to Cloudinary
 * 
 * @param supabaseUrl - The original Supabase storage URL
 * @param options - Optional transformation parameters
 * @returns Optimized Cloudinary URL
 */
export function optimizeSupabaseImage(
  supabaseUrl: string,
  options: {
    width?: number | 'auto';
    quality?: number | 'auto';
    format?: string | 'auto';
  } = {}
): string {
  // Return empty string if no URL provided
  if (!supabaseUrl || supabaseUrl.trim() === '') {
    return '';
  }

  // Default options for best performance
  const width = options.width || 'auto';
  const quality = options.quality || 'auto';
  const format = options.format || 'auto';

  // Build transformation string
  const transformations = [
    `f_${format}`,      // Automatic format (WebP/AVIF)
    `q_${quality}`,     // Automatic quality
    width === 'auto' ? 'w_auto' : `w_${width}`, // Responsive width
  ].join(',');

  // Construct Cloudinary fetch URL
  // This tells Cloudinary to fetch from Supabase and apply optimizations
  return `${CLOUDINARY_BASE_URL}/image/fetch/${transformations}/${encodeURIComponent(supabaseUrl)}`;
}

/**
 * Optimizes a direct Cloudinary image URL with transformations
 * Use this for images already uploaded to Cloudinary
 * 
 * @param cloudinaryUrl - The Cloudinary image URL
 * @param options - Optional transformation parameters
 * @returns Optimized URL with transformations
 */
export function optimizeCloudinaryImage(
  cloudinaryUrl: string,
  options: {
    width?: number | 'auto';
    quality?: number | 'auto';
    format?: string | 'auto';
  } = {}
): string {
  if (!cloudinaryUrl) return '';

  const width = options.width || 'auto';
  const quality = options.quality || 'auto';
  const format = options.format || 'auto';

  const transformations = [
    `f_${format}`,
    `q_${quality}`,
    width === 'auto' ? 'w_auto' : `w_${width}`,
  ].join(',');

  // If URL already has transformations, we'll need to add to them
  // For simplicity, we assume it doesn't and add transformations after /upload/
  if (cloudinaryUrl.includes('/upload/')) {
    return cloudinaryUrl.replace('/upload/', `/upload/${transformations}/`);
  }

  return cloudinaryUrl;
}

/**
 * Checks if a URL is from Supabase storage
 */
export function isSupabaseUrl(url: string): boolean {
  return url.includes('supabase.co/storage');
}
