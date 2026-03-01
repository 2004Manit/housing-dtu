/**
 * ImageKit Image Optimization Utility
 * 
 * Provides functions to optimize images through ImageKit CDN
 */

// ImageKit configuration
const IMAGEKIT_URL_ENDPOINT = 'https://ik.imagekit.io/bpt0bijnm';
const SUPABASE_BASE_URL = 'https://dhqaahtebxvmqvvhkkzr.supabase.co/storage/v1/object/public';

interface ImageKitOptions {
  width?: number | 'auto';
  quality?: number | 'auto';
  format?: string | 'auto';
  dpr?: number | 'auto';
}

/**
 * Optimize a Supabase image URL through ImageKit
 * Uses ImageKit's external origin fetching feature
 */
export function optimizeSupabaseImage(
  supabaseUrl: string,
  options: ImageKitOptions = {}
): string {
  const {
    width = 'auto',
    quality = 'auto',
    format = 'auto',
    dpr = 'auto'
  } = options;

  // Build transformation parameters
  const transformations = [];
  
  if (width !== 'auto') transformations.push(`w-${width}`);
  if (quality !== 'auto') transformations.push(`q-${quality}`);
  if (format !== 'auto') transformations.push(`f-${format}`);
  if (dpr !== 'auto') transformations.push(`dpr-${dpr}`);
  
  // Always add auto format and quality if not specified
  if (format === 'auto') transformations.push('f-auto');
  if (quality === 'auto') transformations.push('q-auto');

  const transformStr = transformations.length > 0 
    ? `tr:${transformations.join(',')}` 
    : 'tr:f-auto,q-auto';

  // Extract the path after the Supabase base URL
  // Example: https://dhqaahtebxvmqvvhkkzr.supabase.co/storage/v1/object/public/property-submissions/...
  // We want: property-submissions/...
  const pathAfterBase = supabaseUrl.replace(SUPABASE_BASE_URL + '/', '');

  // Use ImageKit URL endpoint to fetch from external origin
  return `${IMAGEKIT_URL_ENDPOINT}/${transformStr}/${pathAfterBase}`;
}

/**
 * Optimize an ImageKit-hosted image
 */
export function optimizeImageKitImage(
  imagePath: string,
  options: ImageKitOptions = {}
): string {
  const {
    width = 'auto',
    quality = 'auto',
    format = 'auto',
    dpr = 'auto'
  } = options;

  // Build transformation parameters
  const transformations = [];
  
  if (width !== 'auto') transformations.push(`w-${width}`);
  if (quality !== 'auto') transformations.push(`q-${quality}`);
  if (format !== 'auto') transformations.push(`f-${format}`);
  if (dpr !== 'auto') transformations.push(`dpr-${dpr}`);
  
  // Always add auto format and quality if not specified
  if (format === 'auto') transformations.push('f-auto');
  if (quality === 'auto') transformations.push('q-auto');

  const transformStr = transformations.length > 0 
    ? `tr:${transformations.join(',')}` 
    : 'tr:f-auto,q-auto';

  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  return `${IMAGEKIT_URL_ENDPOINT}/${transformStr}/${cleanPath}`;
}

/**
 * Check if a URL is from Supabase
 */
export function isSupabaseUrl(url: string): boolean {
  return url.includes('supabase.co') || url.includes('supabase.in');
}

/**
 * Create responsive srcset for an image
 */
export function createResponsiveSrcSet(
  imagePath: string,
  widths: number[] = [400, 800, 1200, 1920]
): string {
  return widths
    .map(width => {
      const url = optimizeImageKitImage(imagePath, { width });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Get mobile-optimized image URL
 */
export function getMobileImageUrl(imagePath: string): string {
  return optimizeImageKitImage(imagePath, { width: 800, quality: 85 });
}

/**
 * Get desktop-optimized image URL
 */
export function getDesktopImageUrl(imagePath: string): string {
  return optimizeImageKitImage(imagePath, { width: 1920, quality: 90 });
}

/**
 * Get video poster/thumbnail URL
 */
export function getVideoPosterUrl(videoPath: string): string {
  // For videos, ImageKit can generate thumbnails
  return `${IMAGEKIT_URL_ENDPOINT}/tr:f-jpg,q-auto/${videoPath}`;
}

/**
 * Get optimized video URL
 */
export function getOptimizedVideoUrl(videoPath: string): string {
  return `${IMAGEKIT_URL_ENDPOINT}/${videoPath}`;
}