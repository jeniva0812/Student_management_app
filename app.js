// Import necessary modules
const oracledb = require('oracledb');
const express = require('express');
const bodyParser = require('body-parser');

// Create Express application
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Database connection configuration
const dbConfig = {
  user: 'your_username',
  password: 'your_password',
  connectString: 'your_connection_string', // e.g., localhost:1521/orclpdb
};

// Endpoint to fetch departments
app.get('/departments', async (req, res) => {
  try {
    // Connect to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the query to fetch departments
    const result = await connection.execute('SELECT * FROM departments');

    // Close the database connection
    await connection.close();

    // Send the departments as JSON response
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching departments:', err);
    res.status(500).json({ error: 'Error fetching departments' });
  }
});

// Endpoint to add a new student record
app.post('/students', async (req, res) => {
  const { roll, name, address, phone, dept } = req.body;

  try {
    // Connect to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the query to insert the student record
    const result = await connection.execute(
      `INSERT INTO students (roll, name, address, phone, dept_code) VALUES (:1, :2, :3, :4, :5)`,
      [roll, name, address, phone, dept]
    );

    // Commit the transaction
    await connection.commit();

    // Close the database connection
    await connection.close();

    res.json({ message: 'Student record added successfully' });
  } catch (err) {
    console.error('Error adding student record:', err);
    res.status(500).json({ error: 'Error adding student record' });
  }
});

// Endpoint to delete a student record
app.delete('/students/:roll', async (req, res) => {
  const roll = req.params.roll;

  try {
    // Connect to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the query to delete the student record
    const result = await connection.execute(
      `DELETE FROM students WHERE roll = :1`,
      [roll]
    );

    // Commit the transaction
    await connection.commit();

    // Close the database connection
    await connection.close();

    res.json({ message: 'Student record deleted successfully' });
  } catch (err) {
    console.error('Error deleting student record:', err);
    res.status(500).json({ error: 'Error deleting student record' });
  }
});

// Endpoint to search for a student record
app.get('/students/:roll', async (req, res) => {
  const roll = req.params.roll;

  try {
    // Connect to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the query to search for the student record
    const result = await connection.execute(
      `SELECT * FROM students WHERE roll = :1`,
      [roll]
    );

    // Close the database connection
    await connection.close();

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Student record not found' });
    }
  } catch (err) {
    console.error('Error searching for student record:', err);
    res.status(500).json({ error: 'Error searching for student record' });
  }
});

// Endpoint to modify a student record
app.put('/students/:roll', async (req, res) => {
  const roll = req.params.roll;
  const { name, address, phone, dept } = req.body;

  try {
    // Connect to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the query to modify the student record
    const result = await connection.execute(
      `UPDATE students SET name = :1, address = :2, phone = :3, dept_code = :4 WHERE roll = :5`,
      [name, address, phone, dept, roll]
    );

    // Commit the transaction
    await connection.commit();

    // Close the database connection
    await connection.close();

    res.json({ message: 'Student record modified successfully' });
  } catch (err) {
    console.error('Error modifying student record:', err);
    res.status(500).json({ error: 'Error modifying student record' });
  }
});

// Endpoint to display all student records
app.get('/students', async (req, res) => {
  try {
    // Connect to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the query to fetch all student records
    const result = await connection.execute('SELECT * FROM students');

    // Close the database connection
    await connection.close();

    // Send the student records as JSON response
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching all student records:', err);
    res.status(500).json({ error: 'Error fetching all student records' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
