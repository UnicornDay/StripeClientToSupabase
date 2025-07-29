const fs = require('fs');
const stripe = require('stripe')('sk_test_51R4IRiEzKO7RisbDBfYEddF4LtB227X5WsoORHlELBCcriZHvueyHPML8bVT02JDplKfRHBAY7ATn2SJWSkdk2zK00iJwFeTbf');

async function exportCustomers() {
  const customers = await stripe.customers.list({ limit: 10 });
  fs.writeFileSync('customers.json', JSON.stringify(customers.data, null, 2));
  console.log('Exported 10 customers to customers.json');
}

exportCustomers();