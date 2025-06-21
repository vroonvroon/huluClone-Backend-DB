require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
const SignUpPage = require('./routers/routes');
const LogInPage = require('./routers/routes');
const db = require('./db');
const cors = require('cors');
const SeriesPage = require('./series/series-router');
const Profilepage = require('./routers/routes');
const errorMiddleware = require("./middlewares/error-middleware");

app.use(cors());
app.use(express.json());
app.use('/api/auth', SignUpPage);
app.use('/api/auth', LogInPage);
app.use('/api/data', SeriesPage);
app.use('/api/data', Profilepage);
app.use(errorMiddleware);


app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});
  
db().then(() => {
    app.listen(port, '0.0.0.0', () => {
        console.log(`Website running on port ${port}`);
    });  
}).catch((err) => {
    console.error('Error connecting to database:', err);
    process.exit(1);
});


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ------------------------------- USE ONLY IF YOU ARE SERVING FRONTEND STATIC FILES (HTML, CSS, JS) -------------------------------------
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// require("dotenv").config();
// const express = require("express");
// const app = express();
// const port = 5000;
// const SignUpPage = require('./routers/routes');
// const LogInPage = require('./routers/routes');
// const db = require('./db');
// const cors = require('cors');
// const SeriesPage = require('./series/series-router');
// const Profilepage = require('./routers/routes');
// const errorMiddleware = require("./middlewares/error-middleware");


// Serve frontend static files
// app.use(express.static(path.join(__dirname, 'dist')));


// app.use(cors());
// app.use(express.json());
// app.use('/api/auth', SignUpPage);
// app.use('/api/auth', LogInPage);
// app.use('/api/data', SeriesPage);
// app.use('/api/data', Profilepage);
// app.use(errorMiddleware);


// SPA fallback (send index.html for all unmatched routes)
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });



// // ---------------------- TOGGLING DB USAGE FOR CI/CD ---------------
// if (process.env.USE_DB === 'false') {
//     console.log("Skipping DB connection for CI/CD...");
//     app.listen(port, '0.0.0.0', () => {
//       console.log(`Website running on port ${port} (no DB)`);
//     });
// } else {
//     db().then(() => {
//       app.listen(port, '0.0.0.0', () => {
//         console.log(`Website running on port ${port}`);
//       });  
//     }).catch((err) => {
//       console.error('Error connecting to database:', err);
//       process.exit(1);
//     });
//   }

// ------------------ Disable DB connection during CI/CD ----------------------
// db().then(() => {
//     app.listen(port, '0.0.0.0', () => {
//         console.log(`Website running on port ${port}`);
//     });  
// }).catch((err) => {
//     console.error('Error connecting to database:', err);
//     process.exit(1);
// });
