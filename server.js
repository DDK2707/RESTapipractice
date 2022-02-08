const Joi = require('joi')
const express = require('express')
const app = express();

app.use(express.json());

app.set('view engine', 'ejs')

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
]

app.get('/', (req, res) => {
    res.send('My name Jeff')
});

app.get('/api/courses', (req, res) => {
    res.send(courses)
});

app.post('/api/courses', (req, res) => {
    if (!req.body.name || req.body.name.length < 3 ) {
        res.status(400).send('Name required and should be minimum of 3 characters');
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name     
    };
    courses.push(course);
    res.send(course);
});

//api/courses/1
app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with this ID was not found.');
    res.send(course);
});

// PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
