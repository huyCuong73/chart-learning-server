import auth from './auth.js'
import post from './post.js'
import course from './course.js'
import exercise from './exercise.js'
import user from './user.js'
import comment from './comment.js'


function route(app){
    app.use('/api/auth', auth)
    app.use('/api/post', post)
    app.use('/api/course', course)
    app.use('/api/exercise', exercise)
    app.use('/api/user', user)
    app.use('/api/comment', comment)

}

export default route