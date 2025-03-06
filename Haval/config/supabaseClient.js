const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Supabase URL yoki API Key aniqlanmagan. Iltimos, .env faylini tekshiring!");
}

exports.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
