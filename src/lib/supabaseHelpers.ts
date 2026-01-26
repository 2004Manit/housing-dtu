import { supabase } from './supabase';

/**
 * Uploads multiple images to Supabase Storage
 * 
 * How it works:
 * 1. Takes an array of image files from the form
 * 2. Uploads each image to Supabase Storage one by one
 * 3. Organizes files in folders: PG/{userId}/image-timestamp-0.jpg
 * 4. Returns an array of permanent URLs
 * 
 * @param images - Array of File objects (the images user selected)
 * @param userId - The user's unique ID from authentication
 * @param submissionType - Either 'PG' or 'Flat'
 * @returns Promise with array of public URLs
 */
export const uploadImages = async (
  images: File[],
  userId: string,
  submissionType: 'PG' | 'Flat'
): Promise<string[]> => {
  
  // This array will store all the URLs we get back
  const uploadedUrls: string[] = [];

  // Loop through each image and upload it
  for (let i = 0; i < images.length; i++) {
    const file = images[i];
    
    // Step 1: Create a unique filename
    // Example: "abc-123/image-1704567890123-0.jpg"
    const fileExt = file.name.split('.').pop(); // Get extension (jpg, png, etc.)
    const timestamp = Date.now(); // Current time in milliseconds
    const fileName = `${userId}/image-${timestamp}-${i}.${fileExt}`;
    
    // Step 2: Create the full path in storage
    // Example: "PG/abc-123/image-1704567890123-0.jpg"
    const filePath = `${submissionType}/${fileName}`;

    // Step 3: Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('property-submissions') // Our bucket name
      .upload(filePath, file, {
        cacheControl: '3600', // Cache for 1 hour (makes loading faster)
        upsert: false // Don't overwrite if file already exists
      });

    // Step 4: Check for errors
    if (error) {
      console.error('Image upload error:', error);
      throw new Error(`Failed to upload image ${i + 1}: ${error.message}`);
    }

    // Step 5: Get the public URL for this image
    const { data: { publicUrl } } = supabase.storage
      .from('property-submissions')
      .getPublicUrl(data.path);

    // Step 6: Add this URL to our array
    uploadedUrls.push(publicUrl);
    
    // Console log for debugging (you'll see this in browser console)
    console.log(`✅ Uploaded image ${i + 1}:`, publicUrl);
  }

  // Return all URLs
  return uploadedUrls;
};

/**
 * Uploads a single video to Supabase Storage
 * 
 * How it works:
 * 1. Takes a video file from the form (optional - might be null)
 * 2. Uploads it to Supabase Storage
 * 3. Returns the permanent URL (or null if no video)
 * 
 * @param video - Video File object (or null if no video uploaded)
 * @param userId - The user's unique ID
 * @param submissionType - Either 'PG' or 'Flat'
 * @returns Promise with public URL or null
 */
export const uploadVideo = async (
  video: File | null,
  userId: string,
  submissionType: 'PG' | 'Flat'
): Promise<string | null> => {
  
  // If no video was uploaded, return null
  if (!video) {
    console.log('ℹ️ No video to upload');
    return null;
  }

  // Step 1: Create unique filename
  const fileExt = video.name.split('.').pop();
  const timestamp = Date.now();
  const fileName = `${userId}/video-${timestamp}.${fileExt}`;
  
  // Step 2: Create full path
  const filePath = `${submissionType}/${fileName}`;

  // Step 3: Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('property-submissions')
    .upload(filePath, video, {
      cacheControl: '3600',
      upsert: false
    });

  // Step 4: Check for errors
  if (error) {
    console.error('Video upload error:', error);
    throw new Error(`Failed to upload video: ${error.message}`);
  }

  // Step 5: Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('property-submissions')
    .getPublicUrl(data.path);

  console.log('✅ Uploaded video:', publicUrl);
  
  return publicUrl;
};