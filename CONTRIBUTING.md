# Who Should Contribute

The EasyNYU team strongly encourages the GitHub community member to contribute in any of the following criteria if true:
- You have expertise in pure JavaScript web development.
- You identify bugs / suggestions / better and more efficient solutions in master code.
- You want to create a easy to use template for other universities beyond the current NYU scope.

# How to Run
### Step 0: Make sure you have npm on your machine.
```
npm -v
```
This should give you a version number if you have npm installed on your machine.
If the console returns command not found, please install npm with any means(brew for OS).

### Step 1: Open terminal, and change to the directory where you want to store the code.
```
cd <Target Directory>
```
### Step 2: Clone the repository by using the below command.
```
git clone https://github.com/nyu-software-engineering/fall-2019-easy-nyu.git
```
### Step 3: Change to EasyNYU directory by using the below command.
```
cd fall-2019-easy-nyu/
```
### Step 4: Now we will install all the dependencies. Please execute the below commands in order.
```
cd backend
npm install
cd ../frontend
npm install
```
### Step 5: In order to get access to the database, please do the following.
```
cd ../backend
vim .env
```
### Step 6: Inside the .env file, please reach out to the EasyNYU team for connection string. For grading purpose, the connection strings are sent in Slack. Please copy paste the connection string into the first line and the testing string into the third line respectively.
```
ATLAS_URI = ...
secretOrKey = secret
Testing_URI = ...
```
### Step 7: Time to run. Open two terminals that are in the EasyNYU directory, and execute the below accordingly.
```
cd backend
npm start
```
```
cd frontend
npm start
```
### Last Step: See our site!
Now you can go to http://35.192.158.132:8080 to view the app that is up and running on your computer

# How to Contribute

Community members with decent experiences with [Pull Requests](https://help.github.com/articles/using-pull-requests) and [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links) can contribute in the ways below.
- Community contributor can create an new issue tracker under issue tab in GitHub so that your voice can be appreciated
- Please pull from/ merge to the development branch since we need the master branch as a fully functional application
- For additional features, bug fixes, elegant coding expressions, contributor can fork the master branch, create your own branch, implement changes offline and submit a pull request from your developer branch to master branch.
  - EasyNYU team will try to get back to your pull request as early as possible.
  
# Team Norm

The EasyNYU team firmly adheres to [NYU Code of Ethical Conduct](https://www.nyu.edu/about/policies-guidelines-compliance/policies-and-guidelines/code-of-ethical-conduct.html). The team wants to foster an environment which everyone is able to speak freely about his or her opinion and mutual supports. The final decision the team made as a whole, however, will be based on **vote** to avoid any dispute that could delay the development. Also, in order to achieve the high performing team, EasyNYU team will use Slack for all offline discussion and communications, expect a prompt response (being @) no later than **two hours**, and requires **in person participation** in weekly scrum meeting.
