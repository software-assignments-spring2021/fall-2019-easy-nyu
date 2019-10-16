process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Course = require('../models/course.model');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

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
    
    /*
    describe('/POST courses', () => {
        it('it should not POST a book without prof field', (done) => {
            let course = {
                coursename: "CSCI-UA 480",
                description: " Agile Software Development",
                semester: "Fall 2019"
            }
            chai.request(server)
                .post('/courses')
                .send(course)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.should.have.property('error');
                done();
            });
        });
        
        it('it should POST a course', (done) => {
            let course = {
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
        
    });
    */
});
