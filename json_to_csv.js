   const fs = require('fs');
   const customers = JSON.parse(fs.readFileSync('customers.json'));

   const csv = [
     'id,email,name,created',
     ...customers.map(c =>
       [c.id, c.email || '', c.name || '', new Date(c.created * 1000).toISOString()].join(',')
     )
   ].join('\n');

   fs.writeFileSync('customers.csv', csv);
   console.log('Converted customers.json to customers.csv');