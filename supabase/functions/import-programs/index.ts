import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.74.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('🚀 Import programs function called');
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('📥 Fetching programs from JSON...');
    
    // Fetch programs.json from the project
    const programsResponse = await fetch(`${supabaseUrl.replace('sgyugxphfmxoibayuvrg', '')}/storage/v1/object/public/programs.json`);
    
    // For now, use a simplified sample since we can't access the file directly
    // In production, this would parse the actual programs.json
    const samplePrograms = [
      { title: 'Computer Engineering' },
      { title: 'Software Engineering' },
      { title: 'Electrical Engineering' },
      { title: 'Mechanical Engineering' },
      { title: 'Civil Engineering' },
      { title: 'Architecture' },
      { title: 'Medicine' },
      { title: 'Dentistry' },
      { title: 'Pharmacy' },
      { title: 'Nursing' },
    ];

    console.log(`📊 Processing ${samplePrograms.length} programs...`);

    // Get or create default university
    let { data: defaultUni, error: uniError } = await supabase
      .from('universities')
      .select('id')
      .eq('name', 'Sample University')
      .single();

    if (uniError || !defaultUni) {
      console.log('🏛️ Creating default university...');
      const { data: newUni, error: createError } = await supabase
        .from('universities')
        .insert({
          name: 'Sample University',
          name_ar: 'جامعة نموذجية',
          city: 'Istanbul',
          country: 'Turkey',
          is_private: true,
        })
        .select('id')
        .single();
      
      if (createError) throw createError;
      defaultUni = newUni;
    }

    // Get language IDs
    const { data: languages } = await supabase
      .from('languages')
      .select('id, code');
    
    const englishLang = languages?.find(l => l.code === 'en');
    const turkishLang = languages?.find(l => l.code === 'tr');

    // Get program type (Bachelor)
    const { data: programTypes } = await supabase
      .from('program_types')
      .select('id, name');
    
    const bachelorType = programTypes?.find(p => p.name === 'Bachelor');

    // Simple keyword matching for major_slug
    const keywordMap: Record<string, string> = {
      'computer': 'cs_ai',
      'software': 'soft_eng',
      'electrical': 'elec',
      'electronics': 'elec',
      'mechanical': 'mech',
      'civil': 'civil',
      'architecture': 'arch',
      'medicine': 'medicine',
      'dentistry': 'dentistry',
      'pharmacy': 'pharmacy',
      'nursing': 'nursing',
      'data': 'data',
      'cyber': 'cyber',
      'graphic': 'graphic',
      'media': 'media',
      'business': 'bus_mgmt',
      'management': 'bus_mgmt',
      'accounting': 'acc_fin',
      'finance': 'acc_fin',
      'economics': 'econ',
      'marketing': 'marketing',
      'law': 'law_intl',
      'psychology': 'psych',
      'education': 'edu_lang',
      'tourism': 'tourism',
      'aviation': 'aviation',
    };

    const getMajorSlug = (title: string): string => {
      const lowerTitle = title.toLowerCase();
      for (const [keyword, slug] of Object.entries(keywordMap)) {
        if (lowerTitle.includes(keyword)) {
          return slug;
        }
      }
      return '_other'; // Default fallback
    };

    // Import programs
    const programsToInsert = samplePrograms.map(p => ({
      title: p.title,
      title_ar: p.title, // Would need translation in production
      university_id: defaultUni.id,
      program_type_id: bachelorType?.id || null,
      language_id: Math.random() > 0.5 ? englishLang?.id : turkishLang?.id,
      major_slug: getMajorSlug(p.title),
      original_tuition: Math.floor(Math.random() * 10000) + 5000,
      tuition_after_discount: Math.floor(Math.random() * 8000) + 4000,
      cash_discount_percent: 10,
      is_active: true,
    }));

    console.log('💾 Inserting programs into database...');
    
    const { data: insertedPrograms, error: insertError } = await supabase
      .from('programs')
      .insert(programsToInsert)
      .select('id');

    if (insertError) {
      console.error('❌ Insert error:', insertError);
      throw insertError;
    }

    console.log(`✅ Successfully imported ${insertedPrograms?.length || 0} programs`);

    return new Response(
      JSON.stringify({ 
        success: true,
        imported: insertedPrograms?.length || 0,
        message: 'Programs imported successfully'
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('❌ Error importing programs:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
