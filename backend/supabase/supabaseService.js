const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

const uploadFile = async (fileBuffer, fileName, mimeType) => {
  // Upload file
  const { data, error } = await supabase
    .storage
    .from('molamazogames')  // nombre bucket
    .upload(fileName, fileBuffer, {
      contentType: mimeType,
      upsert: true
    });

  if (error) throw error;
  
  const filePath = data?.path;
  if (!filePath) throw new Error('No file path returned from Supabase');

  const { data: urlData, error: urlError } = supabase
    .storage
    .from('molamazogames')
    .getPublicUrl(filePath);

  if (urlError) throw urlError;

  console.log('Public URL:', urlData.publicUrl);
  return urlData.publicUrl;
};

// Delete file
const deleteFile = async (filePath) => {
  const { data, error } = await supabase
    .storage
    .from('molamazogames')
    .remove([filePath]);

  if (error) throw error;
  return data;
};

module.exports = { uploadFile, deleteFile };