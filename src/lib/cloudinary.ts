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
    dpr?: number | 'auto';
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
  const dpr = options.dpr || 'auto';

  // Build transformation string
  const transformations = [
    `f_${format}`,      // Automatic format (WebP/AVIF)
    `q_${quality}`,     // Automatic quality
    width === 'auto' ? 'w_auto' : `w_${width}`, // Responsive width
    `dpr_${dpr}`,       // Device pixel ratio (Retina support)
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
    dpr?: number | 'auto';
  } = {}
): string {
  if (!cloudinaryUrl) return '';

  const width = options.width || 'auto';
  const quality = options.quality || 'auto';
  const format = options.format || 'auto';
  const dpr = options.dpr || 'auto';

  const transformations = [
    `f_${format}`,
    `q_${quality}`,
    width === 'auto' ? 'w_auto' : `w_${width}`,
    `dpr_${dpr}`,
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

/**
 * Creates a responsive srcset string for Cloudinary images
 * Generates multiple width variants for different screen sizes
 * 
 * @param cloudinaryUrl - Base Cloudinary URL
 * @param widths - Array of widths to generate (default: [400, 800, 1200, 1920])
 * @returns srcset string ready for <img> tag
 */
export function createResponsiveSrcSet(
  cloudinaryUrl: string,
  widths: number[] = [400, 800, 1200, 1920]
): string {
  if (!cloudinaryUrl || !cloudinaryUrl.includes('/upload/')) return '';
  
  return widths
    .map(width => {
      const responsiveUrl = cloudinaryUrl.replace(
        '/upload/',
        `/upload/f_auto,q_auto,w_${width},c_limit,dpr_auto/`
      );
      return `${responsiveUrl} ${width}w`;
    })
    .join(', ');
}

/**
 * Helper to get mobile-optimized image URL (max 800px)
 */
export function getMobileImageUrl(cloudinaryUrl: string): string {
  if (!cloudinaryUrl || !cloudinaryUrl.includes('/upload/')) return cloudinaryUrl;
  return cloudinaryUrl.replace(
    '/upload/',
    '/upload/f_auto,q_auto,w_800,c_limit,dpr_auto/'
  );
}

/**
 * Helper to get desktop-optimized image URL (max 1920px)
 */
export function getDesktopImageUrl(cloudinaryUrl: string): string {
  if (!cloudinaryUrl || !cloudinaryUrl.includes('/upload/')) return cloudinaryUrl;
  return cloudinaryUrl.replace(
    '/upload/',
    '/upload/f_auto,q_auto,w_1920,c_limit,dpr_auto/'
  );
}

/**
 * Generate poster image from Cloudinary video
 * @param videoUrl - Cloudinary video URL
 * @param timeInSeconds - Time in video to extract frame (default: 0)
 * @returns Image URL of video frame
 */
export function getVideoPosterUrl(videoUrl: string, timeInSeconds: number = 0): string {
  if (!videoUrl || !videoUrl.includes('/video/upload/')) return '';
  return videoUrl
    .replace('/video/upload/', `/video/upload/f_auto,q_auto,so_${timeInSeconds}/`)
    .replace('.mp4', '.jpg')
    .replace('.webm', '.jpg');
}
