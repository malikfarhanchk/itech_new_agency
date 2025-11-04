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
        const { clientId } = await req.json();

        if (!clientId) {
            throw new Error('clientId is required');
        }

        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

        // Get current week's data (last 7 days)
        const today = new Date();
        const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const fourteenDaysAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);

        // Fetch current period data
        const currentResponse = await fetch(
            `${supabaseUrl}/rest/v1/seo_performance_data?client_id=eq.${clientId}&date=gte.${sevenDaysAgo.toISOString().split('T')[0]}&date=lte.${today.toISOString().split('T')[0]}`,
            {
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey
                }
            }
        );

        // Fetch previous period data
        const previousResponse = await fetch(
            `${supabaseUrl}/rest/v1/seo_performance_data?client_id=eq.${clientId}&date=gte.${fourteenDaysAgo.toISOString().split('T')[0]}&date=lt.${sevenDaysAgo.toISOString().split('T')[0]}`,
            {
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey
                }
            }
        );

        const currentData = await currentResponse.json();
        const previousData = await previousResponse.json();

        // Calculate averages
        const calculateAverage = (data: any[], field: string) => {
            if (data.length === 0) return 0;
            const sum = data.reduce((acc, item) => acc + (parseFloat(item[field]) || 0), 0);
            return sum / data.length;
        };

        const currentTraffic = calculateAverage(currentData, 'organic_traffic');
        const previousTraffic = calculateAverage(previousData, 'organic_traffic');
        const currentRankings = calculateAverage(currentData, 'keyword_rankings_improved') - calculateAverage(currentData, 'keyword_rankings_declined');
        const previousRankings = calculateAverage(previousData, 'keyword_rankings_improved') - calculateAverage(previousData, 'keyword_rankings_declined');

        // Calculate percentage changes
        const trafficChange = previousTraffic > 0 ? ((currentTraffic - previousTraffic) / previousTraffic) * 100 : 0;
        const rankingChange = previousRankings !== 0 ? ((currentRankings - previousRankings) / Math.abs(previousRankings)) * 100 : 0;

        // Determine performance status
        let performanceStatus = 'green';
        if (trafficChange < -10 || rankingChange < -10) {
            performanceStatus = 'red';
        } else if (trafficChange < 0 || rankingChange < 0) {
            performanceStatus = 'yellow';
        }

        // Update client performance status
        await fetch(`${supabaseUrl}/rest/v1/clients?id=eq.${clientId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                performance_status: performanceStatus,
                updated_at: new Date().toISOString()
            })
        });

        return new Response(JSON.stringify({
            data: {
                clientId: clientId,
                performanceStatus: performanceStatus,
                metrics: {
                    currentTraffic: Math.round(currentTraffic),
                    previousTraffic: Math.round(previousTraffic),
                    trafficChange: Math.round(trafficChange * 10) / 10,
                    currentRankings: Math.round(currentRankings),
                    previousRankings: Math.round(previousRankings),
                    rankingChange: Math.round(rankingChange * 10) / 10
                }
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Performance calculation error:', error);
        return new Response(JSON.stringify({
            error: {
                code: 'PERFORMANCE_CALCULATION_FAILED',
                message: error.message
            }
        }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
