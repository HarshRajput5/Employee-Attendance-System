const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JavaScript)
// app.use(express.static(path.join(__dirname)));



// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb+srv://jiogptg:25hwfLexMFanClQb@cluster0.y6dmvfr.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));


// Create a schema for attendance
// const attendanceSchema = new mongoose.Schema({
//   employeeId: String,
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Attendance = mongoose.model('Attendance', attendanceSchema);

// Mark attendance for an employee
// app.post('/markAttendance', express.json(), async (req, res) => {
//   const { employeeId } = req.body;

//   try {
//     await Attendance.create({ employeeId });
//     res.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false });
//   }
// });

// Get all attendance data for admin
// app.get('/attendanceData', async (req, res) => {
//   try {
//     const attendance = await Attendance.find({}, 'employeeId date').lean();
//     res.json({ attendance });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch attendance data.' });
//   }
// });


const collectionName = "Login1";
// Define a schema for the data
const userSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    email: String,
    department: String,
    address: String,
    city: String,
    state: String,
    pin_code: String,
    designation: String,
    date_of_joining: Date,
    date: [{
        type: Date,
        // default: Date.now
    }],
});

// Create a model based on the schema
const User = mongoose.model('Item', userSchema, collectionName);

app.post('/register', async (req, res) => {

    const { name, mobile, email, department, address, city, state, pin_code, designation, date_of_joining } = req.body;

    try {
      // Check if employee ID exists in the database
      const existingAttendance = await User.findOne({ name });
    //   const sameDate = await User.findOne({date})

      if (existingAttendance) {
        // If employee ID exists, update attendance by adding a new date
        // if(!sameDate){
            // existingAttendance.date.push(new Date(date_of_joining));
            // await existingAttendance.save();
            console.log("Available");
        // }
        // else{
        //     console.log("Attendance done");
        // }
       
      } else {
        // If employee ID doesn't exist, create a new attendance record
        const newUser = new User({ name, mobile, email, department, address, city, state, pin_code, designation, date_of_joining });

        await newUser.save();
        console.log("Added");
      }
  
    //   res.json({ success: true });
      res.redirect('/employees');
    } catch (error) {
      console.error(error);
      res.json({ success: false });
    }


    // const newUser = new User({ name, mobile, email, department, address, city, state, pin_code, designation, date: [new Date(date)] });

    // try {
    //     await newUser.save();
    //     // res.sendStatus(200);
    //     // res.get('/employees');
    //     res.redirect('/employees');
    // } catch (error) {
    //     console.error('Error registering user:', error);
    //     res.status(500).send('Error registering user');
    // }

});

app.post('/api/attendance/:name', async(req,res)=>{
    const { name } = req.params;
    const { date } = req.body;

    try {
      // Check if employee ID exists in the database
      const existingAttendance = await User.findOne({ name });
    //   const sameDate = await User.findOne({date})

      if (existingAttendance) {
        // If employee ID exists, update attendance by adding a new date
        // if(!sameDate){
            existingAttendance.date.push(new Date(date));
            await existingAttendance.save();
            console.log("Attendance Done");
            console.log(date);
        // }
       
       
      } else {
        // If employee ID doesn't exist, create a new attendance record
        // const newUser = new User({ name, mobile, email, department, address, city, state, pin_code, designation, date: [new Date(date)] });

        // await newUser.save();
        console.log("Employee not found!");
      }
  
    //   res.json({ success: true });
      res.redirect('/employees');
    } catch (error) {
      console.error(error);
      res.json({ success: false });
    }


    // const newUser = new User({ name, mobile, email, department, address, city, state, pin_code, designation, date: [new Date(date)] });

    // try {
    //     await newUser.save();
    //     // res.sendStatus(200);
    //     // res.get('/employees');
    //     res.redirect('/employees');
    // } catch (error) {
    //     console.error('Error registering user:', error);
    //     res.status(500).send('Error registering user');
    // }
})

app.post('/date', async(req,res)=>{
    const {date}= req.body;
    try {
        const employees = await User.find({date: date});
        // res.json({ employees });
        res.render('attendance.ejs', { employees }); // Render the 'index.ejs' file and pass data to it
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch employees.' });
    }
})

app.get('/attendance', async (req, res) => {
    try {
        const employees = await User.find({date: '2023-11-20'});
        // res.json({ employees });
        res.render('a.ejs', { employees }); // Render the 'index.ejs' file and pass data to it
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch employees.' });
    }
});

// Endpoint to fetch all employees
app.get('/employees', async (req, res) => {
    try {
        const employees = await User.find({});
        // res.json({ employees });
        res.render('index.ejs', { employees }); // Render the 'index.ejs' file and pass data to it
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch employees.' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin_employee.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// DELETE endpoint to delete data by ID
app.delete('/api/delete-data/:id', async (req, res) => {
    
    const { id } = req.params;
    
      try {
        // Find the document by ID
        const foundDoc = await User.findById(id);
    
        if (!foundDoc) {
          return res.status(404).json({ message: 'Document not found' });
        }
    
        // Delete the found document
        const deletedDoc = await foundDoc.deleteOne();
        return res.json({ message: 'Document deleted successfully', deletedDoc });
      } catch (error) {
        console.error('Error deleting data:', error);
        return res.status(500).json({ message: 'Error deleting data' });
      }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
