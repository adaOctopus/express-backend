import express from 'express';
import path from 'path';
// Middlewares
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFoundMiddleware from './middleware/notfound.js';
// naming of the file
import posts from './routes/posts.js';
const app = express();

const port = process.env.PORT || 8000;

// Body middleware, boilerplate
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);
// Setup express static folder
// So we dont have to query the html pages every time.
// but you need to specify the html extension when putting the url path /about.html etc
//\\ app.use(express.static(path.join(__dirname, 'public')))

// Routes middleware
app.use('/api/posts', posts)
app.use(notFoundMiddleware)

// Catch all error for wrong url

// Custom  error handling middleware should go below your routes.
app.use(errorHandler);


app.listen(port, () => {
    console.log('Server started!!')
})


// *****************************
// This is just to undertand how one line or with curly braces callback function behaves.
// ONe expects return the other not.
// const postis = posts.filter((post) => {
//     if (post.id === id) {
//         console.log('you are here')
//         return post
//     }
// })
// console.log(postis)
// ******************************