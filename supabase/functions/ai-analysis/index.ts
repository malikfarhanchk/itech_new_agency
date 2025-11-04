Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Max-Age': '86400',
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        const { clientId, analysisType, data } = await req.json();

        if (!clientId || !analysisType) {
            throw new Error('Missing required parameters');
        }

        const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
        if (!geminiApiKey) {
            throw new Error('Gemini API key not configured');
        }

        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

        // Build prompt based on analysis type
        let prompt = '';
        switch (analysisType) {
            case 'keyword_opportunities':
                prompt = `Analyze the following SEO keyword data and provide actionable insights for improving rankings:\n\n${JSON.stringify(data)}\n\nProvide: 1) Top 3 quick win opportunities, 2) Long-term strategy recommendations, 3) Content gaps to address.`;
                break;
            case 'competitor_analysis':
                prompt = `Analyze this competitor data and identify strategic advantages:\n\n${JSON.stringify(data)}\n\nProvide: 1) Competitor weaknesses we can exploit, 2) Their strengths we should learn from, 3) Content topics they're missing.`;
                break;
            case 'performance_summary':
                prompt = `Analyze this week's SEO performance data:\n\n${JSON.stringify(data)}\n\nProvide: 1) Key wins and concerns, 2) Traffic trend explanation, 3) Action items for next week.`;
                break;
            case 'content_strategy':
                prompt = `Based on this keyword and traffic data, suggest a content strategy:\n\n${JSON.stringify(data)}\n\nProvide: 1) 5 high-priority content topics, 2) Target keywords for each, 3) Expected ROI timeline.`;
                break;
            default:
                prompt = `Analyze this SEO data and provide insights:\n\n${JSON.stringify(data)}`;
        }

        // Call Gemini API
        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1024,
                    }
                })
            }
        );

        if (!geminiResponse.ok) {
            const errorText = await geminiResponse.text();
            throw new Error(`Gemini API error: ${errorText}`);
        }

        const geminiData = await geminiResponse.json();
        const aiResponse = geminiData.candidates[0].content.parts[0].text;

        // Save to database
        const insertResponse = await fetch(`${supabaseUrl}/rest/v1/ai_responses`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                client_id: clientId,
                input_data: JSON.stringify(data),
                ai_response: aiResponse,
                response_type: analysisType,
                tokens_used: geminiData.usageMetadata?.totalTokenCount || 0
            })
        });

        if (!insertResponse.ok) {
            console.error('Database insert failed, but returning AI response anyway');
        }

        return new Response(JSON.stringify({
            data: {
                analysis: aiResponse,
                type: analysisType,
                clientId: clientId
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('AI analysis error:', error);
        return new Response(JSON.stringify({
            error: {
                code: 'AI_ANALYSIS_FAILED',
                message: error.message
            }
        }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
