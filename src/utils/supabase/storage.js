import { createClient } from "./client";

/**
 * Upload a file (image or document) to Supabase Storage
 * @param {File} file - The file to upload
 * @param {string} folder - The folder name (e.g. 'projects', 'awards')
 * @returns {Promise<string|null>} - Returns the public URL if successful, otherwise null
 */
export async function uploadFile(file, folder = 'projects') {
  if (!file) return null;

  try {
    const supabase = createClient();
    
    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading image:', error.message);
      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Upload exception:', error);
    throw error;
  }
}

export const uploadImage = uploadFile;

/**
 * Delete a file/image from Supabase Storage using its public URL
 * @param {string} fileUrl - The public URL of the file
 */
export async function deleteImage(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') return;
  
  // Only attempt to delete if the URL is from our Supabase storage
  if (!imageUrl.includes('supabase.co') && !imageUrl.includes('portfolio-images')) return;

  try {
    const supabase = createClient();
    
    // Extract the path from the URL
    // Format: https://<project>.supabase.co/storage/v1/object/public/portfolio-images/projects/filename.jpg
    const parts = imageUrl.split('portfolio-images/');
    if (parts.length < 2) return;
    
    const filePath = parts[1];

    const { error } = await supabase.storage
      .from('portfolio-images')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error.message);
    }
  } catch (error) {
    console.error('Delete exception:', error);
  }
}

export const deleteFile = deleteImage;
