const path = require('path')
const express = require('express')
const methodOverride = require('method-override')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000

const SortMiddleware = require('./app/middleware/SortMiddleware')

const route = require('./routes')
const db = require('./config/db')

// Connect to DB
db.connect()

app.use(express.static(path.join(__dirname, 'public')))

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

// XMLHttpRequest, fetch, axios

//HTTP logger
//app.use(morgan('combined'))

app.use(methodOverride('_method'))

app.use(SortMiddleware)

//Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'fa-brands fa-elementor',
                    asc: 'fa-solid fa-arrow-down-wide-short',
                    desc: 'fa-solid fa-arrow-down-short-wide'
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }

                const type = types[sortType];
                const icon = icons[sortType];

                return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`;
            }
        },
    }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// Routes init
route(app)

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})
