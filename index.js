
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // password: '',
  database: 'apartmentmanagement',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Express Middleware
app.use(express.json());


// API Routes

// Get apartment data
app.post('/apartmentdata', (req, res) => {
  let query = `SELECT * FROM apartment`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});


app.post('/apartmentinsert', (req, res) => {
  const { apartment_no, block_no,apartment_status,apartment_type,price } = req.body;

  let query = `INSERT INTO apartment(apartment_no,block_no,apartment_status,apartment_type,price) VALUES (? , ? )`;

  db.query(query, [ apartment_no, block_no,apartment_status,apartment_type,price], (err, results) => {

    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ sqlMessage: err.sqlMessage });
      return;
    }

    console.log(results);

    res.status(200).json({ message: 'Apartment inserted successfully'});
    
  });
});


app.post('/apartmentupdate', (req, res) => {
  const { apartment_no, block_no,apartment_status,apartment_type,price } = req.body;

  let query =
  `UPDATE apartment SET 
  block_no = '${block_no}'
  apartment_status = '${apartment_status}'
  apartment_type = '${apartment_type}'
  price = '${price}'
  WHERE apartment_no = '${apartment_no}' `;

  db.query(query,  (err, results) => {

    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ sqlMessage: err.sqlMessage });
      return;
    }

    console.log(results);
    console.log(query);


    res.status(200).json('Apartment updated successfully');
    
  });
});



app.post('/apartmentdelete', (req, res) => {

  const apartment_no = req.body.apartment_no;

  let query = `DELETE FROM apartment WHERE apartment_no = ?`;
  console.log(query);
  db.query(query,[apartment_no],(err, results) => {

    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ sqlMessage: err.sqlMessage });
      return;
    }
    
    console.log(results);

    res.status(200).json({ message: 'Apartment deleted successfully'});
   
  });
});



app.post('/apartmentsearch', (req, res) => {
  const apartment_no = req.body.apartment_no;
  let search = `'%${apartment_no}%'`
  let query = `SELECT * FROM apartment WHERE apartment_no LIKE ${search} OR block_no LIKE ${search}`;

  console.log(query);
    db.query(query, (err, results) => {
      
      if (err) {
        res.status(500).json({ sqlMessage: err.sqlMessage });
        return;
      }
      
      console.log(results)
      res.json(results);
      
    });
  }
);



// Get block data
app.post('/blockdata', (req, res) => {
  let query = `SELECT * FROM block`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});


app.post('/blockinsert', (req, res) => {
  const { block_no, block_name } = req.body;

  let query = `INSERT INTO block(block_no,block_name) VALUES (? , ? )`;

  db.query(query, [ block_no, block_name], (err, results) => {

    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ sqlMessage: err.sqlMessage });
      return;
    }

    console.log(results);

    res.status(200).json({ message: 'Block inserted successfully'});
    
  });
});


app.post('/blockupdate', (req, res) => {
  const { block_no, block_name } = req.body;

  let query =
  `UPDATE block SET 
  block_name = '${block_name}'
  WHERE block_no = '${block_no}' `;

  db.query(query,  (err, results) => {

    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ sqlMessage: err.sqlMessage });
      return;
    }

    console.log(results);
    console.log(query);


    res.status(200).json('Block updated successfully');
    
  });
});



app.post('/blockdelete', (req, res) => {

  const block_no = req.body.block_no;

  let query = `DELETE FROM block WHERE block_no = ?`;
  console.log(query);
  db.query(query,[block_no],(err, results) => {

    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ sqlMessage: err.sqlMessage });
      return;
    }

    console.log(results);

    res.status(200).json({ message: 'Block deleted successfully'});
   
  });
});



app.post('/blocksearch', (req, res) => {

  const block_no = req.body.block_no;

  let search = `'%${block_no}%'`

  let query = `SELECT * FROM block WHERE block_no LIKE ${search} OR block_name LIKE ${search}`;

  console.log(query);
    db.query(query, (err, results) => {
      
      if (err) {
        res.status(500).json({ sqlMessage: err.sqlMessage });
        return;
      }
      
      console.log(results)
      res.json(results);
      
    });
  }
);


// Get Owner data
app.post('/ownerdata', (req, res) => {
  let query = `SELECT * FROM owner`;
  console.log(query)
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
    console.log(results);
  });
});


app.post('/ownerinsert', (req, res) => {
  const { owner_id, name, apartment_no, email, phone} = req.body;

  let query = `INSERT INTO owner(owner_id, name, apartment_no, email, phone) VALUES (? , ? , ? , ? , ?)`;

  db.query(query, [ owner_id, name, apartment_no, email, phone], (err, results) => {

    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ sqlMessage: err.sqlMessage });
      return;
    }

    console.log(results);

    res.status(200).json({ message: 'Owner inserted successfully'});
    
  });
});


app.post('/ownerupdate', (req, res) => {
  const { owner_id, name, apartment_no, email, phone } = req.body;

  let query =
  `UPDATE owner SET 
  name = '${name}'
  apartment_no = '${apartment_no}'
  email = '${email}'
  phone = '${phone}'
  WHERE owner_id = '${owner_id}' `;

  db.query(query,  (err, results) => {

    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ sqlMessage: err.sqlMessage });
      return;
    }

    console.log(results);
    console.log(query);


    res.status(200).json('Owner updated successfully');
    
  });
});



app.post('/ownerdelete', (req, res) => {

  const owner_id = req.body.owner_id;

  let query = `DELETE FROM owner WHERE owner_id = ?`;
  console.log(query);
  db.query(query,[owner_id],(err, results) => {

    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ sqlMessage: err.sqlMessage });
      return;
    }

    console.log(results);

    res.status(200).json({ message: 'Owner deleted successfully'});
   
  });
});



app.post('/ownersearch', (req, res) => {

  const owner = req.body.owner_id;

  let search = `'%${owner}%'`

  let query = `SELECT * FROM owner WHERE owner_id LIKE ${search} OR apartment_no LIKE ${search}`;

  console.log(query);
    db.query(query, (err, results) => {
      
      if (err) {
        res.status(500).json({ sqlMessage: err.sqlMessage });
        return;
      }
      
      console.log(results)
      res.json(results);
      
    });
  }
);



// Get Tenant data
app.post('/tenantdata', (req, res) => {
  let query = `SELECT * FROM tenant`;
  console.log(query)
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
    console.log(results);
  });
});


app.post('/tenantinsert', (req, res) => {
  const { tenant_id, name, apartment_no, email, phone} = req.body;

  let query = `INSERT INTO tenant(tenant_id, tenant_name, apartment_no, email, phone) VALUES (? , ? , ? , ? , ?)`;

  db.query(query, [ tenant_id, name, apartment_no, email, phone], (err, results) => {

    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ sqlMessage: err.sqlMessage });
      return;
    }

    console.log(results);

    res.status(200).json({ message: 'Tenant inserted successfully'});
    
  });
});


app.post('/tenantupdate', (req, res) => {
  const { tenant_id, tenant_name, apartment_no, email, phone } = req.body;

  let query =
  `UPDATE tenant SET 
  tenant_name = '${tenant_name}'
  apartment_no = '${apartment_no}'
  email = '${email}'
  phone = '${phone}'
  WHERE tenant_id = '${tenant_id}' `;

  db.query(query,  (err, results) => {

    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ sqlMessage: err.sqlMessage });
      return;
    }

    console.log(results);
    console.log(query);


    res.status(200).json('Tenant updated successfully');
    
  });
});



app.post('/tenantdelete', (req, res) => {

  const tenant_id = req.body.tenant_id;

  let query = `DELETE FROM tenant WHERE tenant_id = ?`;
  console.log(query);
  db.query(query,[tenant_id],(err, results) => {

    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ sqlMessage: err.sqlMessage });
      return;
    }

    console.log(results);

    res.status(200).json({ message: 'Tenant deleted successfully'});
   
  });
});



app.post('/tenantsearch', (req, res) => {

  const tenant = req.body.tenant_id;

  let search = `'%${tenant}%'`

  let query = `SELECT * FROM tenant WHERE tenant_id LIKE ${search} OR apartment_no LIKE ${search}`;

  console.log(query);
    db.query(query, (err, results) => {
      
      if (err) {
        res.status(500).json({ sqlMessage: err.sqlMessage });
        return;
      }
      
      console.log(results)
      res.json(results);
      
    });
  }
);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});