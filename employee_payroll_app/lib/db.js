var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",   
    user: "root",    
    password: "2018@Camelious2",   
    database: "employee_payroll"  
    });
    
    conn.connect((err)=> {
        if(!err)
            console.log('Connected to database...Blessings');
        else
            console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    });

    module.exports = conn;