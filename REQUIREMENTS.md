# Requirements for EasyNYU
- This file documents requirements for EasyNYU project with inputs from Prof Bloomberg and Karan. It includes the profile modeling of a typical end-user, features & functionalities EasyNYU team wishes to accomplish, and domain models.

## End User
### Yuting Zhou
**“How do I maintain a high GPA at NYU (and still enjoy my life)?”**
- Profile: Chinese international student <br>
Gender: Female <br>
Age: 18 <br>
Campus: NYC <br> 
Major: Computer Science

- Motivation:
Yuting is an introverted foreign girl who just received her admissions letter to NYU. Not long after she is excited to get into her dream school, she starts to be intimidated by all the academic challenges flooding over her. To begin with, is Computer Science really a good fit for her? What courses to take? Which professor and tutor is right for her? What could she do in the summer to get a head start? She wants to know it all! But shy as she is, how is she supposed to acquire all the comprehensive and first-hand information?

- Goals:
To access the comprehensive, subjective, personal, first-hand information of NYU academics on the same website!

- Frustration:
Current information on website is too much but not personal enough.
Quora, Zhihu - not personal enough, are often too subjective and story-based, largely biased opinions.
RateMyProfessor - may have ratings from students of other universities; doesn’t have TA ratings.
 NYU courses website, Albert does have official information. But they may be not entirely up-to-date, especially for humanities/arts majors, information could be very limited.
CourseHero, OneClass requires paid membership - and yet they may offer too much information that may become plagiarism...

## Use Cases
- As a user, I want to be able to access course information
- As a user, I want to be able to view professor ratings
- As a user, I want to be able to verify my account with a NetID to prove that I am a professor or a student
- As a NYU student enrolled in a class, I want to be able to rate the professor and/or leave comments.
- As a NYU professor, I want to be able to view my ratings and comments and upload info on my classes
- As an administrator, I want to be able to moderate comments and reviews (e.g. remove comments with personal attacks, profanity, or racist/misogynistic/homophobic/ableist content, potentially libellous/defamatory content, etc.) and remove inappropriate content from all courses (per a DMCA takedown notification, removing NSFW content, to prevent cheating/plagiarism etc.)
- As an administrator, I want to be able to ban/disable abusive accounts (Accounts that are impersonating students/professors, accounts that are repeatedly uploading copyright violations or inappropriate content, etc. )

## Domain Modeling
![Domain Modeling](https://github.com/nyu-software-engineering/fall-2019-easy-nyu/blob/domain_modeling/resources/class-diagram.jpeg)
