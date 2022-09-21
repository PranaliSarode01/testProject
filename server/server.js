const express =  require('express')
require('dotenv').config()
const startConnection = require('./config/db')
const Employee = require('./models/Employee')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json } = require('express')
const axios = require('axios')





// Initialise APP
const app = express()


//Use middleware for parsing JSON data
app.use(express.json({extended:true}))

// INIT PORT from ENV file
const PORT = process.env.PORT || 5000


// Start Database Connection
startConnection()


// Register API
app.post('/register',async(req,res)=>{
    try {
        let requestData = req.body

        // check for already existing user with same email in db
        let employee = await Employee.findOne({employee_email:requestData.employee_email})

        console.log(employee)
        if(employee!==null){
            console.log("NOT NULL")
            res.json({msg:"Employee with same email aready exist"})
        }else{
            // SAVE NEW EMPLOYEE
            // Generate salt for hashing
            const salt = await bcrypt.genSalt(10)
            // Encrypt password
            let encryptedPassword = await bcrypt.hash(requestData.employee_password, salt)

            employee = new Employee({
                employee_name: requestData.employee_name,
                employee_email: requestData.employee_email,
                employee_password: encryptedPassword
            })

            await employee.save()

            res.status(200).json({msg:"REGISTERED"})
            console.log(employee)

        }

    } catch (error) {
       console.log(error) 
    }
})


app.post('/login', async(req,res)=>{
    let credentials = req.body

    try {
        // Check if provided email is present in database
        let check = await Employee.findOne({employee_email:credentials.employee_email})

        // if email is present in database, check for password comparison
        if(check!==null){
            // now comparing password
            // generating salt for hashing
            const salt = await bcrypt.genSalt(10)
            // comparing the hashed password
            let compare = await bcrypt.compare(credentials.employee_password, check.employee_password)
            
            // check if compare is true
            if(compare){
                // LOGIN
                const payload = {
                    employee:{
                        id:check.id
                    }
                }
                let token = await jwt.sign(payload,process.env.SECRET_KEY,{
                    expiresIn:3600
                })
                res.json({msg:"LOGGEDIN", token})

            }else{
                // Invalid Credentials
                res.json({msg:"Password in incorrect"})
            }
        }else{
            // Email not present
            res.json({msg:"Email not present in database"})
        }
    } catch (error) {
        res.status(503).json({msg:error.message})
    }

    

})


app.get('/getTweets',async(req,res)=>{
    try {
        const url = process.env.TWEET_API
        const token = process.env.BEARER_TOKEN
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        
        let response = await axios.get(url)
        console.log(response.data)
        res.status(200).json(response.data)
    } catch (error) {
        console.log(error.message)
        res.status(503).json({msg:"SERVER ERROR"})
    }
})


// Run Server on given PORT
app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
})


