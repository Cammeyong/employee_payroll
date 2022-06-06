var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/employee_payslip_list', function(req, res, next) {
     if(req.session.loggedin == true ) {
    conn.query('SELECT * FROM payslip', function(err,row)     {
        console.log(err);
            
    
        if(err){ 
            res.render('../views/employee_payslip_list',
            {
                page_title: "Employees Payslip",
                payslip: ''
            });   
        }
        else{ 
            res.render('../views/employee_payslip_list',
            {
                page_title: "Employees Payslip",
                payslip: row,
                my_session: req.session
            });
        }
                            
    });
    
     }else {
     res.redirect('/login')
 }
    
});

router.get('/employee_payslip/edit/:id', function(req, res, next) {
    if(req.session.loggedin == true ) {
    conn.query('SELECT * FROM payslip WHERE id='+ req.params.id, function(err,row)     {
    
        if(err){
            //req.flash('error', err); 
            res.render('../views/employee_payslip_update',
            {
                page_title: "Edit Payslip Page",
                data: ''
            });   
        }
        else{ 
            res.render('../views/employee_payslip_update',
            {
                page_title: "Edit Payslip Page",
                data: row,
                my_session: req.session
            });
        }
                            
        });
    }else {
        res.redirect('/login')
    }
           
    });

router.post('/employee_payslip/update/:id', function (req,res) {
    if(req.session.loggedin == true ) {
    let sqlQuery = "UPDATE employee_payroll.payslip SET emply_id ='" + req.body.emply_id + 
    "', date ='" + req.body.date + 
    "', regular_pay ='" +  req.body.regular_pay + 
    "', overtime ='" + req.body.overtime + 
    "', gross_pay ='" + req.body.gross_pay +
    "', net_pay = '" + req.body.net_pay +
    "' WHERE id = " + req.body.id;

    let query = conn.query(sqlQuery,(err,rows) => {
        if(err) throw err;
        console.log(err)
        //req.flash('error', err); 
        res.redirect('/employee_payslip_list');                  
    });
    
}else {
    res.redirect('/login')
} 
});




router.get('/employee_payslip/delete/:id', function(req, res){
    if(req.session.loggedin == true ) {
    conn.query('DELETE FROM employee_payroll.payslip WHERE id =' + req.params.id, function(err, row){
        if(err)  throw err;
        //req.flash('error', err); //must install additionals 'flash messages and others from to do list for these to work;

       //req.flash('success', 'Deleted Successfully') 
            // alert('Delete Successful');
            res.redirect('/employee_payslip_list');
           
    });
        }else {
            res.redirect('/login')
        } 
});


module.exports = router;