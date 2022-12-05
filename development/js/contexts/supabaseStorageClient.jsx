import { StorageClient } from "@supabase/storage-js";

const VITE_STORAGE_URL = import.meta.env.VITE_SUPABASE_URL;
const VITE_SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_KEY;

const storageClient = new StorageClient(VITE_STORAGE_URL, {
  apikey: VITE_SERVICE_KEY,
  Authorization: `Bearer ${VITE_SERVICE_KEY}`,
});

export default storageClient;
