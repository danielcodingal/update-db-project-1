var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('example.db', function (err) {
    if (err) {
        return console.error("Error connecting to the database: ", err.message);
    }
    console.log("Connected to the SQLite database.");
});

var createTableQuery = `
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    position TEXT NOT NULL
  );
`;

db.run(createTableQuery, function (err) {
    if (err) {
        return console.error("Error creating table: ", err.message);
    }
    console.log("Employees table created successfully.");

    var insertValuesQuery = `
    INSERT INTO employees (name, position)
    VALUES 
    ('Alice', 'Manager'),
    ('Bob', 'Developer'),
    ('Charlie', 'Designer');
  `;

    db.run(insertValuesQuery, function (err) {
        if (err) {
            return console.error("Error inserting values: ", err.message);
        }
        console.log("Records inserted into the 'employees' table.");

        var updateQuery = `UPDATE employees SET position = 'Senior Developer' WHERE name = 'Bob';`;

        db.run(updateQuery, function (err) {
            if (err) {
                return console.error("Error updating record: ", err.message);
            }
            console.log("Record updated successfully.");

            var selectQuery = `SELECT * FROM employees;`;
            db.all(selectQuery, function (err, rows) {
                if (err) {
                    return console.error("Error retrieving data: ", err.message);
                }
                console.log("Updated records:");
                rows.forEach(function (row) {
                    console.log(row);
                });

                db.close(function (err) {
                    if (err) {
                        return console.error("Error closing the database: ", err.message);
                    }
                    console.log("Database connection closed.");
                });
            });
        });
    });
});
