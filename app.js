if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cors = require('cors')
const authRoutes = require('./routes/auth');
const loggedInRoutes = require('./routes/loggedIn')
const generalRoutes = require('./routes/general')

// const MongoStore = require('connect-mongo')
const app = express()

// ✅ Agar Vercel mengenali bahwa kita bisa membaca IP/secure info dari reverse proxy
app.enable('trust proxy')

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
require('./config/database')
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) //  buat munculin UPDATE dan DELETE

app.use(cookieParser('secret'))
app.use(passport.initialize());

// Middleware untuk mengalihkan HTTP ke HTTPS
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production' && !req.secure) {
        return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
});

app.use('/',generalRoutes)
app.use('/',authRoutes)
app.use('/',loggedInRoutes)

//handle semua endpoint yang gaada untuk menampilkan 404 not found page
app.get('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' }) // ubah ke res.render('404') jika pakai view engine
})

const port = process.env.PORT || 3300;

// ✅ Jalankan server hanya di lokal (dev mode)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server running on port ${port} in development mode.`)
    })
}

// ✅ Export app untuk Vercel
module.exports = app;
