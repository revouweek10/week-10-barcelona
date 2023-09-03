

const express = require('express')
const bodyParser = require('body-parser')

const databaseMiddleware = require('./middleware/database-middleware.js')
const authMiddleware = require('./middleware/authentication-middleware.js')
const errorHandlerMiddleware = require('./middleware/error-handler.js')

const authRouter = require('./routes/auth-route.js')
const spiceRouter = require('./routes/spice-route.js')
const transferRouter = require('./routes/transfer-route.js');


const openApiValidator = require('express-openapi-validator')
const yaml = require('yaml')
const swaggerUi = require('swagger-ui-express')



const port = process.env.PORT || 2222;

const app = express()



app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(yaml.parse(require('fs').readFileSync('./doc/openapi.yaml', 'utf8'))))
app.use(openApiValidator.middleware({ 
    apiSpec: './doc/openapi.yaml'
  })
)

app.use(databaseMiddleware)


app.get('/', (req, res) => {

    res.send('Assignment week 10 by Iman')
})



app.use('/auth', authRouter)
app.use('/spices',authMiddleware, spiceRouter)
app.use('/transfer', authMiddleware, transferRouter)


// error handler
app.use(errorHandlerMiddleware)



app.listen(port, () => {
    console.log(`⚡️ Server is running at ${port}`);

})
