const authRouter = require('./auth')
const postRouter = require('./post')
const productRouter = require('./product')

function Router (app) {
    
app.use('/api/auth', authRouter)

app.use('/api/post', postRouter)

app.use('/api/product', productRouter)


}

module.exports = Router