/* 
Setup
*/
process.env.NODE_ENV = 'test';
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

// Unit Test for Course
describe('Course', () => {
    // Empty the database before each round of testing
    beforeEach((done) => {
        Course.remove({}, (err) => { 
           done();           
        });        
    });

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
    describe('/POST courses', () => {
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
        
        it('it should POST a course without a TA', (done) => {
            const course = {
                coursename: "CSCI-UA 480",
                description: " Agile Software Development",
                semester: "Fall 2019",
                prof: "Amos Bloomberg"
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
                    res.body.course.comments.should.be.a('array');
                done();
            });
        });
    });

});

// Unit Test for Comment
describe('Comment', () => {
    // Empty the database before each round of testing
    beforeEach((done) => {
        Comment.remove({}, (err) => { 
           done();           
        });        
    });

    // Test the /POST route
    describe('/POST comment', () => {
        it('it should POST a comment to a course', (done) => {
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
                    const current_course_id = res.body.course._id;
                    const newComment = {
                        comment: "The class is good, but need to know js",
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
                    const current_course_id = res.body.course._id;
                    const newComment = {
                        comment: "The class is fine, but need to know js",
                        course_id: current_course_id
                    }
                    chai.request(server)
                        .post('/comments/add')
                        .send(newComment)
                        .end((err, res) => {
                            res.body.should.have.property('course_id').eql(current_course_id);
                });
                done();
            });
        });
    });
});