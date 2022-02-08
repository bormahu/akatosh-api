import * as fs from 'fs'
import * as https from 'https'

import app from './app';


const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server started. Listening on port ${PORT}`)
})