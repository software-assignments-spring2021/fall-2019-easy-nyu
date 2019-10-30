//I hate react so much

class Courses extends React.Component {
    //this contains one prop named "id" which contains the course ID# to be loaded
    componentDidMount() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "courses/" + this.props.id, true);
        xhr.onload = function () {
            var course = JSON.parse(xhr.responseText);
            this.state = {
                    coursename: course.coursename,
                    description: course.description,
                    semester: course.semester,
                    prof: course.prof,
                    ta: course.ta,
                    comments: course.comments,
            }
        }
    }
        
        
    }
    render() {
        return(
                <div id="title" class="title">{this.state.coursename} - {this.state.semester}</div>
                <div class="centerContent"><div class="textBoxContainer">
                    <div class="textBox">
                        <div id="names">Professor: {this.state.prof} TAs: {this.state.ta}</div>
                        <div id="description">{this.state.description}</div> 
                    </div>
                    <div class="textBox">
                        <strong>Comments:</strong><br />
                        {this.state.comments}
                    </div>
                    <div class="textBox">
                        <button class="buttonLink">Post New Comment</button>
                    </div>
                </div></div>
        }
    }
}
