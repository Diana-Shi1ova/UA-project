const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

const uploadFile = async (fileBuffer, fileName, mimeType) => {
  const { data, error } = await supabase
    .storage
    .from('assets') // nombre bucket
    .upload(fileName, fileBuffer, {
      contentType: mimeType,
      upsert: true
    });

  if (error) throw error;
  return data;
};

module.exports = { uploadFile };
