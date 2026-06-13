import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dzkapgmlvtxybexiziin.supabase.co'
const supabaseKey = 'sb_publishable_kRPU-Ph3v3FB6Us88sDGdg_H1fqtDbI'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)