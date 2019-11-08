/* 
Setup
*/
process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server_test');
const should = chai.should();
chai.use(chaiHttp);

/*
Import Test Units
*/
const Course = require('../models/course.model');
const Comment = require('../models/comment.model');
const User = require('../models/user.model')

const test_login_credential = {
    name: "Jack Zhang",
    nid: "yz3559",
    email: 'yz3559@nyu.edu',
    password: '123456',
    password2: '123456'
};

before(function(done){
    chai.request(server)
      .post('/api/users/register')
      .send(test_login_credential)
      .end(function(err, response){
        done();
      });
    });

//run once after all tests
after(function (done) {
    console.log('Deleting test database');
    mongoose.connection.db.dropDatabase(done);
});

// Unit Test for Course
describe('Course', () => {
    // Test the /GET route
    describe('/GET courses', () => {
        it('it should GET all the courses', (done) => {
            chai.request(server)
                .get('/courses')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
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
                    //res.should.have.status(404);
                    res.should.have.property('error');
                    done();
                });
        });

        it('it should not POST a book without coursename field', (done) => {
            const course = {
                description: " Agile Software Development",
                semester: "Fall 2019",
                prof: "Amos Bloomberg"
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    //res.should.have.status(404);
                    res.should.have.property('error');
                    done();
                });
        });

        it('it should not POST a book without semester field', (done) => {
            const course = {
                coursename: "CSCI-UA 480",
                description: " Agile Software Development",
                prof: "Amos Bloomberg"
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    //res.should.have.status(404);
                    res.should.have.property('error');
                    done();
                });
        });

        it('it should not POST a book without description field', (done) => {
            const course = {
                coursename: "CSCI-UA 480",
                semester: "Fall 2019",
                prof: "Amos Bloomberg"
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    //res.should.have.status(404);
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
                prof: "Ricardo Lagos"
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
                prof: "Amos Bloomberg",
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
                prof: "John Weiler",
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
                .get('/courses')
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
                .get('/courses')
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

// Unit Test for User Register and Login
describe('Register and Login', () => {

    // Test the /POST route for Register
    describe('Register', () => {
        it('Should not allow register without email', (done) => {
            const user = {
                name: 'Jack',
                password: '123456',
                password2: '123456',
                nid: 'yz3559'
            }
            chai.request(server)
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not allow register with invalid email', (done) => {
            const user = {
                name: 'Jack',
                email: 'abcabcaaa',
                password: '123456',
                password2: '123456',
                nid: 'yz3559'
            }
            chai.request(server)
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not allow register without name', (done) => {
            const user = {
                email: 'yz3559@nyu.edu',
                password: '123456',
                password2: '123456',
                nid: 'yz3559'
            }
            chai.request(server)
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not allow register without nid', (done) => {
            const user = {
                email: 'yz3559@nyu.edu',
                password: '123456',
                password2: '123456',
                name: 'Jack'
            }
            chai.request(server)
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not allow register without password', (done) => {
            const user = {
                name: 'Jack',
                email: 'yz3559@nyu.edu',
                password2: '123456',
                nid: 'yz3559'
            }
            chai.request(server)
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not allow register without confirm password', (done) => {
            const user = {
                name: 'Jack',
                email: 'yz3559@nyu.edu',
                password: '123456',
                nid: 'yz3559'
            }
            chai.request(server)
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not allow register when passwords dont match', (done) => {
            const user = {
                name: 'Jack',
                email: 'yz3559@nyu.edu',
                password: '123456',
                password2: '654321',
                nid: 'yz3559'
            }
            chai.request(server)
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        // it('Should allow register when all fields are completed', (done) => {
        //     const user = {
        //         name: 'Sam',
        //         email: 'yz1234@nyu.edu',
        //         password: '123456',
        //         password2: '123456',
        //         nid: 'yz1234'
        //     }
        //     chai.request(server)
        //         .post('/api/users/register')
        //         .send(user)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             done();
        //         });
        // });
    });

    describe('Login', () => {
        it('Should not Loin requests without both the email and nid', (done) => {
            const user = {
                password: '123456',
            }
            chai.request(server)
                .post('/api/users/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not Loin requests without password', (done) => {
            const user = {
                email: 'yz3559@nyu.edu'
            }
            chai.request(server)
                .post('/api/users/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should allow Loin with correct password and email', (done) => {
            const user = {
                email: 'yz3559@nyu.edu',
                password: '123456'
            }
            chai.request(server)
                .post('/api/users/login')
                .send(user)
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
                .get('/courses')
                .end((err, res) => {
                    var i;
                    for (var i =0; i<res.body.length-1; i++) {
                        let compare;
                        if (res.body[i].comments.length >= res.body[i+1].comments.length) {
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
                .get('/courses')
                .end((err, res) => {
                    res.body[0].comments.length.should.be.eql(2);
                    res.body[1].comments.length.should.be.eql(1);
                    done();
                });
        });
    });
});
