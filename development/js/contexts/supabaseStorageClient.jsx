import { SupabaseStorageClient } from "@supabase/storage-js";

const STORAGE_URL = import.meta.env.VITE_SUPABASE_URL;
const SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_KEY;

const storageClient = new SupabaseStorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
});

export default storageClient;
