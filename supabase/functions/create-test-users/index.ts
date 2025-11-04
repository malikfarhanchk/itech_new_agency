Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Create admin user
    const adminResponse = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        'apikey': serviceRoleKey,
      },
      body: JSON.stringify({
        email: 'admin@itech.com',
        password: 'Admin123!',
        email_confirm: true,
        user_metadata: {
          full_name: 'Admin User',
          role: 'admin'
        }
      })
    });

    const adminData = await adminResponse.json();
    console.log('Admin user created:', adminData);

    // Insert admin profile
    if (adminData.id) {
      await fetch(`${supabaseUrl}/rest/v1/profiles`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
          'apikey': serviceRoleKey,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          id: adminData.id,
          email: 'admin@itech.com',
          full_name: 'Admin User',
          role: 'admin',
          created_at: new Date().toISOString()
        })
      });
    }

    // Create client user
    const clientResponse = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        'apikey': serviceRoleKey,
      },
      body: JSON.stringify({
        email: 'client@test.com',
        password: 'Client123!',
        email_confirm: true,
        user_metadata: {
          full_name: 'Test Client',
          role: 'client'
        }
      })
    });

    const clientData = await clientResponse.json();
    console.log('Client user created:', clientData);

    // Insert client profile
    if (clientData.id) {
      await fetch(`${supabaseUrl}/rest/v1/profiles`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
          'apikey': serviceRoleKey,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          id: clientData.id,
          email: 'client@test.com',
          full_name: 'Test Client',
          role: 'client',
          created_at: new Date().toISOString()
        })
      });

      // Create client record
      await fetch(`${supabaseUrl}/rest/v1/clients`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
          'apikey': serviceRoleKey,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          user_id: clientData.id,
          business_name: 'Test Business',
          industry: 'Technology',
          status: 'active',
          tier: 'standard',
          created_at: new Date().toISOString()
        })
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        admin: adminData,
        client: clientData,
        message: 'Test users created successfully'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error creating test users:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        details: error
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
