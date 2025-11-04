Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Max-Age': '86400',
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        const { fileUrl, clientId, dataType } = await req.json();

        if (!fileUrl || !clientId || !dataType) {
            throw new Error('Missing required parameters: fileUrl, clientId, dataType');
        }

        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

        // Download CSV file
        const fileResponse = await fetch(fileUrl);
        if (!fileResponse.ok) {
            throw new Error('Failed to download CSV file');
        }

        const csvText = await fileResponse.text();
        
        // Parse CSV (simple parser)
        const lines = csvText.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        
        const records = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const record: any = {};
            headers.forEach((header, index) => {
                record[header] = values[index]?.trim() || '';
            });
            records.push(record);
        }

        // Process based on data type
        let insertedCount = 0;
        let tableName = '';
        let mappedRecords = [];

        switch (dataType) {
            case 'keywords':
                tableName = 'keyword_data';
                mappedRecords = records.map(r => ({
                    client_id: clientId,
                    keyword: r.keyword || r.query || r.term || '',
                    search_volume: parseInt(r.volume || r['search volume'] || r.searches || '0'),
                    current_position: parseInt(r.position || r.rank || r.ranking || '0'),
                    difficulty: parseInt(r.difficulty || r.kd || r.competition || '0'),
                    cpc: parseFloat(r.cpc || r['cost per click'] || '0'),
                    url: r.url || r.page || ''
                })).filter(r => r.keyword);
                break;

            case 'backlinks':
                tableName = 'backlink_data';
                mappedRecords = records.map(r => ({
                    client_id: clientId,
                    source_url: r['source url'] || r.source || r.from || '',
                    target_url: r['target url'] || r.target || r.to || '',
                    anchor_text: r.anchor || r['anchor text'] || r.text || '',
                    domain_authority: parseFloat(r.da || r['domain authority'] || r.dr || '0'),
                    link_type: r.type || r['link type'] || 'follow',
                    status: 'active'
                })).filter(r => r.source_url);
                break;

            case 'competitors':
                tableName = 'competitor_data';
                mappedRecords = records.map(r => ({
                    client_id: clientId,
                    competitor_name: r.competitor || r.name || r.domain || '',
                    competitor_url: r.url || r.website || r.domain || '',
                    domain_authority: parseFloat(r.da || r['domain authority'] || r.dr || '0'),
                    organic_traffic: parseInt(r.traffic || r['organic traffic'] || r.visits || '0'),
                    total_keywords: parseInt(r.keywords || r['total keywords'] || '0'),
                    analysis_date: new Date().toISOString().split('T')[0]
                })).filter(r => r.competitor_name);
                break;

            default:
                throw new Error(`Unsupported data type: ${dataType}`);
        }

        // Batch insert to database
        if (mappedRecords.length > 0) {
            const insertResponse = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(mappedRecords)
            });

            if (insertResponse.ok) {
                const insertedData = await insertResponse.json();
                insertedCount = insertedData.length;
            } else {
                const errorText = await insertResponse.text();
                console.error('Database insert error:', errorText);
            }
        }

        // Update file processing status
        await fetch(`${supabaseUrl}/rest/v1/uploaded_files?file_url=eq.${encodeURIComponent(fileUrl)}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                is_processed: true,
                processing_status: 'completed',
                processing_results: { inserted_count: insertedCount, total_records: records.length }
            })
        });

        return new Response(JSON.stringify({
            data: {
                success: true,
                recordsProcessed: records.length,
                recordsInserted: insertedCount,
                dataType: dataType
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('CSV processing error:', error);
        return new Response(JSON.stringify({
            error: {
                code: 'CSV_PROCESSING_FAILED',
                message: error.message
            }
        }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
