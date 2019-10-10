const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const courses = [];

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
        type Course {
            _id: ID!
            serial: String!
            description: String!
            prof: String!
            semester: String!
            ta: String
        }
        input CourseInput {
            serial: String!
            description: String!
            prof: String!
            semester: String!
            ta: String
        }
        type RootQuery {
            courses: [Course!]!
        }
        type RootMutation {
            createCourse(courseInput: CourseInput): Course
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      courses: () => {
        return courses; // await Mongo DB setup ... store a local copy for now
      },

      createCourse: args => {
        const course = {
          _id: Math.random().toString(),
          serial: args.courseInput.serial,
          description: args.courseInput.description,
          prof: args.courseInput.prof,
          semester: args.courseInput.semester,
          ta: args.courseInput.ta
        };
        courses.push(course);
        return course;
      }
    },

    graphiql: true
  })
);

app.listen(4000);