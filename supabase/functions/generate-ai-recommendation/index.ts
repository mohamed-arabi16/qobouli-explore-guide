import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('🚀 Edge function called:', req.method, req.url);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    console.log('📦 Request body:', JSON.stringify(requestBody, null, 2));
    
    const { userName, answers, topPrograms, boosters } = requestBody;
    
    if (!userName) {
      throw new Error('userName is required');
    }
    
    console.log('✅ Generating AI recommendation for user:', userName);
    console.log('📊 Data received:', {
      answersCount: answers?.length,
      programsCount: topPrograms?.length,
      boostersCount: boosters?.length
    });
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Build detailed context from user answers with readable question-answer pairs
    const questionLabels: Record<string, string> = {
      'SP1': 'Favorite school subjects',
      'PRJ': 'Best school project',
      'STYLE': 'Problem-solving style',
      'TEAM': 'Team role preference',
      'MATH': 'Comfort level with math',
      'CODE': 'Comfort level with coding',
      'DRAW': 'Comfort level with drawing/design',
      'EMPATHY': 'Empathy level',
      'LEAD': 'Leadership preference',
      'RISK': 'Risk tolerance',
      'SALARY': 'Salary expectations',
      'STABILITY': 'Job stability importance',
      'TRAVEL': 'Travel preference',
      'HEALTH': 'Interest in healthcare',
      'MEDIA': 'Interest in media/entertainment',
      'LEGAL': 'Interest in legal/political fields',
      'BUSINESS': 'Interest in business/entrepreneurship',
      'LAB': 'Interest in lab/research work',
      'OUTDOOR': 'Interest in outdoor/field work',
      'SPORTS': 'Interest in sports/fitness',
      'ENV': 'Environmental sustainability interest',
      'GRADE': 'High school average',
      'TUITION': 'Maximum tuition budget'
    };

    const answerContext = answers.map((a: any) => {
      // Use enriched questionLabel and displayValue if available
      const questionLabel = a.questionLabel || questionLabels[a.questionId] || a.questionId;
      const formattedValue = a.displayValue || (Array.isArray(a.value) ? a.value.join(', ') : a.value);
      
      return `${questionLabel}: ${formattedValue}`;
    }).join('\n');

    // Build recommended programs list
    const programsList = topPrograms.map((p: any, i: number) => 
      `${i + 1}. ${p.title}`
    ).join('\n');

    const systemPrompt = `You are an expert educational counselor at Qobouli Education, specializing in helping Arab students choose the right university major in Turkey. 

Your approach:
- Analyze ALL the student's responses holistically to understand their personality, interests, and goals
- Connect specific answers to career paths and program recommendations
- Provide insights that show you truly understood their unique profile
- Be warm, supportive, and culturally sensitive
- Focus on their strengths and potential for success`;

    const userPrompt = `Provide a personalized recommendation for ${userName} based on their complete profile:

**Student Profile - All Responses:**
${answerContext}

**Top Recommended Programs:**
${programsList}

**Key Strengths Identified:**
${boosters.join(', ')}

Based on analyzing ALL their responses above, create a recommendation that:

1. Shows you understood their complete profile (mention specific answers that stood out)
2. Explains why these programs match their unique combination of interests, skills, and goals
3. Connects their responses to real career opportunities and growth potential
4. Provides encouraging, specific insights about their fit for these fields

Language: ${userName.match(/[\u0600-\u06FF]/) ? 'Arabic' : 'English'}
Length: 250-350 words
Tone: Personal, insightful, encouraging

Remember: Reference specific choices they made to show you truly analyzed their complete profile.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    console.log('🌐 Lovable AI response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ AI gateway error:', response.status, errorText);
      
      // Always return 200 with error details in JSON body to avoid function errors
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: 'Rate limit exceeded. Please try again in a moment.',
            status: 429
          }), 
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            error: 'AI service quota exceeded. Please contact support.',
            status: 402
          }), 
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          error: `AI Gateway error: ${response.status}`,
          details: errorText
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('📨 AI response data:', JSON.stringify(data, null, 2));
    
    const aiExplanation = data.choices?.[0]?.message?.content;

    if (!aiExplanation) {
      console.error('❌ No content in AI response. Full response:', JSON.stringify(data, null, 2));
      throw new Error('No AI response generated');
    }

    console.log('✅ AI recommendation generated successfully, length:', aiExplanation.length);

    return new Response(
      JSON.stringify({ 
        aiExplanation,
        generatedAt: new Date().toISOString()
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('❌ Critical error in generate-ai-recommendation:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
