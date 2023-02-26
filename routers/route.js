import auth from './auth.js'
import post from './post.js'
import course from './course.js'
import exercise from './exercise.js'
import user from './user.js'


function route(app){
    app.use('/api/auth', auth)
    app.use('/api/post', post)
    app.use('/api/course', course)
    app.use('/api/exercise', exercise)
    app.use('/api/user', user)

}

export default route