import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL != "http://127.0.0.1:54321" ? import.meta.env.VITE_SUPABASE_URL : "http://127.0.0.1:54321"
const supabaseKey = import.meta.env.VITE_SUPABASE_URL != "http://127.0.0.1:54321" ? import.meta.env.VITE_SUPABASE_ANON_KEY : ""

export const IS_DEMO = !supabaseUrl || !supabaseKey

if (IS_DEMO) {
  console.info(
    '[Imperium] Rodando em modo DEMO — dados mockados, sem Supabase.\n' +
    'Para usar o backend real, copie .env.example → .env e preencha as variáveis.'
  )
}else{
  console.log("aaaa");
  
}

// Só cria o cliente real se as variáveis estiverem presentes.
// Em modo demo, exportamos null e os hooks ignoram chamadas ao Supabase.
export const supabase = IS_DEMO
  ? null
  : createClient(supabaseUrl, supabaseKey)
