const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Your Supabase project details
const supabaseUrl = 'yourURL';
const serviceRoleKey = 'yourKey';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Read and parse the CSV file
const customers = fs.readFileSync('customers.csv', 'utf-8')
  .split('\n')
  .slice(1) // skip header
  .filter(Boolean)
  .map(line => {
    const [id, email, name, created] = line.split(',');
    return { email: email.trim(), name: name ? name.trim() : '' };
  });

async function createUsers() {
  for (const customer of customers) {
    if (!customer.email) continue;
    const { data, error } = await supabase.auth.admin.createUser({
      email: customer.email,
      email_confirm: true, // set to false if you want users to confirm their email
      user_metadata: { name: customer.name }
    });
    if (error) {
      console.error(`Error creating user ${customer.email}:`, error.message);
    } else {
      console.log(`Created user: ${customer.email}`);
    }
  }
}

createUsers();
