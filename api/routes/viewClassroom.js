/* router.get('/listCourses', (req, res) => {
    authorize(credentials, listCourses);

    function listCourses(auth) {
        const classroom = google.classroom({ version: 'v1', auth });
        classroom.courses.list({
            pageSize: 10,
        }, (err, response) => {
            console.log(req);
            if (err) return console.error('The API returned an error: ' + err);
            const courses = response.data.courses;
            if (courses && courses.length) {
                console.log('Courses:');
                courses.forEach((course) => {
                    console.log(`${course.name} (${course.id})`);
                });
                //console.log(response);
                res.json({
                    success: true,
                    courses: courses
                })
            }
            else {
                console.log('No courses found');
                res.json({
                    success: false,
                    courses: null
                })
            }
        })
    }
}); */

/* router.post('/createCourse', (req, res) => {
    authorize(credentials, createCourses);

    function createCourses(auth) {
        var course = req.body.course;

        const classroom = google.classroom({ version: 'v1', auth });
        console.log(course);

        classroom.courses.create(course, (err, response) => {
            //console.log(req);
            if(err){
                console.log(err);
                res.json({
                    success: false,
                    newCourse: null
                })
            }
            else{
                console.log(response);
                res.send("Creating a course");
            }
        });
    }

}) */

/* router.get('/getCourse', (req, res) => {
    var id = req.body.id;

    //var id = '16353445529';
    authorize(credentials, getCourse);

    function getCourse(auth){
        const classroom = google.classroom({ version: 'v1', auth });
        classroom.courses.get({
            id: id,
        }, (err, response) => {
            if(err){
                console.log(err);
                res.json({
                    success: false,
                    course: null
                });
            }
            //console.log(response.data);
            const course = response.data
            res.json({
                success: true,
                course: course,
            })
        });
    }
}); */

/* router.get('/courseStudents', (req, res) => {
    var courseId = req.body.courseId;
    authorize(credentials, listStudents);

    function listStudents(auth){
        const classroom = google.classroom({ version: 'v1', auth });
        classroom.courses.students.list({
            courseId: courseId,
            pageSize: 10
        }, (err, response) => {
            if(err){
                console.log(err);
                res.json({
                    success: false,
                    student: null
                });
            }
            else{
                console.log(response);
                res.json({
                    success: true
                })
            }
        })
    }
}) */

/* router.delete('/deleteCourse', (req, res) => {
    var id = req.body.id;
    authorize(credentials, deleteCourse);

    function deleteCourse(auth){
        const classroom = google.classroom({ version: 'v1', auth });
        classroom.courses.delete({
            id: id
        }, (err, response) => {
            if(err){
                console.log(err);
                res.json({
                    success: false
                });
            }
            else{
                console.log(response);
                res.json({
                    success: true
                });
            }
        })
    }

})
 */

//cannot read property legth error????
//functions related to invitations cannot be run properly. 
/* router.get('/getInvitations', (req, res) => {
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
            console.log(err);
            res.json({
                success: false
            });
        }
        else {
            refresh = JSON.parse(token).refresh_token;
            console.log(refresh);
        }
    });
    authorize(credentials, getInvitations);

    function getInvitations() {
        const client = new Client({
            clientId: keys.oauthClient.clientID,
            clientSecret: keys.oauthClient.clientSecret,
            refreshToken: refresh
        });

        client.on('ready', async classr => {
            client.getInvites()
                .then(data => {
                    console.log(data);
                });
        });
    }
}); */