const mongoose = require('mongoose')


const EmployeeSchema = new mongoose.Schema({
    employee_name:{
        type: String,
        required: true
    },
    employee_email:{
        type: String,
        required: true
    },
    employee_password:{
        type: String,
        required: true
    }
})


module.exports = mongoose.model('employee',EmployeeSchema)