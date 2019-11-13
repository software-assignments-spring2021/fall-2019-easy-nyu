/* 
Setup
*/
process.env['NODE_ENV'] = 'test';
const mongoose = require("mongoose");
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
chai.use(chaiHttp);

/*
Import Test Units
*/
const Course = require('../models/course.model');
const Comment = require('../models/comment.model');
const Auth = require('../models/auth.model')
const Professor = require('../models/professor.model')

const test_login_credential = {
    name: "Jack Zhang",
    nid: "yz3559",
    email: 'yz3559@nyu.edu',
    password: '123456',
    password2: '123456'
};

before(function (done) {
    chai.request(server)
        .post('/api/auth/register')
        .send(test_login_credential)
        .end(function (err, response) {
            done();
        });
});

//run once after all tests
after(function (done) {
    console.log('Deleting test database');
    mongoose.connection.db.dropDatabase(done);
});

let professor_id;
let course_id;
let comment_id;

// Unit Test for Course
describe('Course', () => {
    let test_course_prof;
    // Test the /GET route
    describe('/GET courses', () => {
        it('it should GET all the courses', (done) => {
            chai.request(server)
                .get('/courses/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
        it('adding a prof to test course', (done) => {
            const prof = {
                professorname: "Amos Bloomberg",
                description: "This is a professor",
            }
            chai.request(server)
                .post('/professors/add')
                .send(prof)
                .end((err, res) => {
                    test_course_prof = res.body.prof._id
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Professor added!');
                    done();
                });
        });
    });

    // Test the /POST route
    describe('/POST courses Failed Cases', () => {
        it('it should not POST a book without prof field', (done) => {
            const course = {
                coursename: "CSCI-UA 480",
                description: " Agile Software Development",
                semester: "Fall 2019"
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    res.should.have.property('error');
                    done();
                });
        });

        it('it should not POST a book without coursename field', (done) => {
            const course = {
                description: " Agile Software Development",
                semester: "Fall 2019",
                prof: [test_course_prof]
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    res.should.have.property('error');
                    done();
                });
        });

        it('it should not POST a book without semester field', (done) => {
            const course = {
                coursename: "CSCI-UA 480",
                description: " Agile Software Development",
                prof: [test_course_prof]
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    res.should.have.property('error');
                    done();
                });
        });

        it('it should not POST a book without description field', (done) => {
            const course = {
                coursename: "CSCI-UA 480",
                semester: "Fall 2019",
                prof: [test_course_prof]
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    res.should.have.property('error');
                    done();
                });
        });
    });

    describe('/POST courses Success Case #1', () => {
        it('it should POST a course without a TA', (done) => {
            const course = {
                coursename: "ECON-UA 331",
                description: "Monetary Banking Theory",
                semester: "Fall 2019",
                prof: [test_course_prof]
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Course added!');
                    res.body.course.should.have.property('coursename');
                    res.body.course.should.have.property('description');
                    res.body.course.should.have.property('semester');
                    res.body.course.should.have.property('prof');
                    done();
                });
        });
    });

    describe('/POST courses Success Case #2', () => {
        it('it should POST a course with a TA', (done) => {
            const course = {
                coursename: "CSCI-UA 480",
                description: " Agile Software Development",
                semester: "Fall 2019",
                prof: [test_course_prof],
                ta: "Karan"
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Course added!');
                    res.body.course.should.have.property('coursename');
                    res.body.course.should.have.property('description');
                    res.body.course.should.have.property('semester');
                    res.body.course.should.have.property('prof');
                    res.body.course.should.have.property('ta');
                    done();
                });
        });
    });

    describe('/Connection with Comment', () => {
        it('it should have an array of comments', (done) => {
            const course = {
                coursename: "CORE-UA 400",
                description: "Justice and Injustice",
                semester: "Fall 2019",
                prof: [test_course_prof],
                ta: "Alex Weisberg"
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    res.body.course.comments.should.be.a('array');
                    done();
                });
        });
    });
});

// Unit Test for Comment
describe('Comment', () => {
    // Test the /POST route
    describe('/POST comment', () => {
        it('it should POST a comment to a course', (done) => {
            chai.request(server)
                .get('/courses/all')
                .end((err, res) => {
                    const current_course_id = res.body[0]._id;
                    const newComment = {
                        comment: "You need to write four essays for this class",
                        course_id: current_course_id
                    }
                    chai.request(server)
                        .post('/comments/add')
                        .send(newComment)
                        .end((err, res) => {
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql('Comment added!');
                        });
                    done();
                });
        });

        it('it should have a comment to link back to a course', (done) => {
            chai.request(server)
                .get('/courses/all')
                .end((err, res) => {
                    const current_course_id = res.body[0]._id;
                    const newComment = {
                        comment: "The Prof is hilarious",
                        course_id: current_course_id
                    }
                    chai.request(server)
                        .post('/comments/add')
                        .send(newComment)
                        .end((err, res) => {
                            res.body.should.have.property('course_id').eql(current_course_id);
                        });

                    const second_course_id = res.body[1]._id;
                    const NewComment = {
                        comment: "Second comment test",
                        course_id: second_course_id
                    }
                    chai.request(server)
                        .post('/comments/add')
                        .send(NewComment)
                        .end((err, res) => {
                            res.body.should.have.property('course_id').eql(second_course_id);
                        });
                    done();
                });
        });
    });
});

// Unit Test for Auth Register and Login
describe('Register and Login', () => {
    // Test the /POST route for Register
    describe('Register', () => {
        it('Should not allow register without email', (done) => {
            const auth = {
                name: 'Jack',
                password: '123456',
                password2: '123456',
                nid: 'yz3559'
            }
            chai.request(server)
                .post('/api/auth/register')
                .send(auth)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not allow register with invalid email', (done) => {
            const auth = {
                name: 'Jack',
                email: 'abcabcaaa',
                password: '123456',
                password2: '123456',
                nid: 'yz3559'
            }
            chai.request(server)
                .post('/api/auth/register')
                .send(auth)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not allow register without name', (done) => {
            const auth = {
                email: 'yz3559@nyu.edu',
                password: '123456',
                password2: '123456',
                nid: 'yz3559'
            }
            chai.request(server)
                .post('/api/auth/register')
                .send(auth)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not allow register without nid', (done) => {
            const auth = {
                email: 'yz3559@nyu.edu',
                password: '123456',
                password2: '123456',
                name: 'Jack'
            }
            chai.request(server)
                .post('/api/auth/register')
                .send(auth)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not allow register without password', (done) => {
            const auth = {
                name: 'Jack',
                email: 'yz3559@nyu.edu',
                password2: '123456',
                nid: 'yz3559'
            }
            chai.request(server)
                .post('/api/auth/register')
                .send(auth)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not allow register without confirm password', (done) => {
            const auth = {
                name: 'Jack',
                email: 'yz3559@nyu.edu',
                password: '123456',
                nid: 'yz3559'
            }
            chai.request(server)
                .post('/api/auth/register')
                .send(auth)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not allow register when passwords dont match', (done) => {
            const auth = {
                name: 'Jack',
                email: 'yz3559@nyu.edu',
                password: '123456',
                password2: '654321',
                nid: 'yz3559'
            }
            chai.request(server)
                .post('/api/auth/register')
                .send(auth)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        // it('Should allow register when all fields are completed', (done) => {
        //     const auth = {
        //         name: 'Sam',
        //         email: 'yz1234@nyu.edu',
        //         password: '123456',
        //         password2: '123456',
        //         nid: 'yz1234'
        //     }
        //     chai.request(server)
        //         .post('/api/auth/register')
        //         .send(auth)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             done();
        //         });
        // });
    });

    describe('Login', () => {
        it('Should not Loin requests without both the email and nid', (done) => {
            const auth = {
                password: '123456',
            }
            chai.request(server)
                .post('/api/auth/login')
                .send(auth)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not Login requests without password', (done) => {
            const auth = {
                email: 'yz3559@nyu.edu'
            }
            chai.request(server)
                .post('/api/auth/login')
                .send(auth)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should allow Login with correct password and email', (done) => {
            const auth = {
                email: 'yz3559@nyu.edu',
                password: '123456'
            }
            chai.request(server)
                .post('/api/auth/login')
                .send(auth)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});

// Unit Test for Course Display
describe('Courses Display', () => {
    // Test the /GET route
    describe('Trending Orders', () => {
        it('it should display courses from most to least comments', (done) => {
            chai.request(server)
                .get('/courses/all')
                .end((err, res) => {
                    var i;
                    for (var i = 0; i < res.body.length - 1; i++) {
                        let compare;
                        if (res.body[i].comments.length >= res.body[i + 1].comments.length) {
                            compare = true;
                        } else {
                            compare = false;
                        }
                        compare.should.be.eql(true);
                    }
                    done();
                });
        });
        it('it should match number of comments', (done) => {
            chai.request(server)
                .get('/courses/all')
                .end((err, res) => {
                    res.body[0].comments.length.should.be.eql(2);
                    res.body[1].comments.length.should.be.eql(1);
                    done();
                });
        });
    });
});

// Unit Test for Professor
describe('Professor', () => {
    // Test the /GET route
    describe('/GET professor', () => {
        it('it should GET all the professors', (done) => {
            chai.request(server)
                .get('/professors/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });

    // Test the /POST route
    describe('/POST professor Failed Cases', () => {
        it('it should not POST a professor without prof name field', (done) => {
            const prof = {
                description: "This is a professor",
                course_id: course_id,
                comments: "5dbcb1811c9d440000450e81"
            }
            chai.request(server)
                .post('/professors/add')
                .send(prof)
                .end((err, res) => {
                    res.should.have.property('error');
                    done();
                });
        });

        it('it should not POST a professor without description field', (done) => {
            const prof = {
                professorname: "John Weiler",
                course_id: "5dbb3024135b6e5f5466647d",
                comments: "5dbcb1811c9d440000450e81"
            }
            chai.request(server)
                .post('/professors/add')
                .send(prof)
                .end((err, res) => {
                    res.should.have.property('error');
                    done();
                });
        });
    });
    
    describe('/POST Professor Success Case #1', () => {
        it('it should POST a prof without a comment', (done) => {
            const prof = {
                professorname: "John Weiler",
                description: "This is a professor",
                course_id: "5dbb3024135b6e5f5466647d"
            }
            chai.request(server)
                .post('/professors/add')
                .send(prof)
                .end((err, res) => {
                    professor_id = res.body.prof._id
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Professor added!');
                    done();
                });
        });
    });

    describe('/POST Professor Success Case #2', () => {
        it('it should POST a prof without a course', (done) => {
            const prof = {
                professorname: "Joe Versoza",
                description: "This is a professor",
                comments: "5dbcb1811c9d440000450e81"
            }
            chai.request(server)
                .post('/professors/add')
                .send(prof)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Professor added!');
                    done();
                });
        });
    });

    describe('/Get professor now should get 3 professors', () => {
        it('it should GET all 3 professors', (done) => {
            chai.request(server)
                .get('/professors/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(3);
                    done();
                });
        });
    });

    describe('/Get professor by id should be successful', () => {
        it('it should get John Weiler', (done) => {
            chai.request(server)
                .get('/professors')
                .send({professor_id:professor_id})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('Course_id got from professor should link to a course', () => {
        let course_id;
        it('getting professor with id should get John Weiler', (done) => {
            chai.request(server)
                .get('/professors')
                .send({professor_id:professor_id})
                .end((err, res) => {
                    course_id = res.body
                    res.should.have.status(200);
                    done();
                });
        });
        it('using course number in response to get course should get the right course', (done) => {
            chai.request(server)
                .get('/courses')
                .send({course_id:course_id})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});
