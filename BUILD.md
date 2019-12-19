# How to build and run our app locally
## File Structrue
The file system consists of two folders:
- Backend: Express.js, mongoDB connections, graphQL setups
- Frontend: React.js framework

## Setting up
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
### Step 6: Inside the .env file, please reach out to the EasyNYU team for connection string. For grading purpose, the connection string is sent in Slack. Please copy paste the connection string into the first line.
```
ATLAS_URI = ...
secretOrKey = secret
Testing_URI = mongodb+srv://SkipperLin:12345678abc@cluster0-zslvh.gcp.mongodb.net/test?retryWrites=true&w=majority
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
## See our site!
Now you can go to http://35.192.158.132:8080 to view the app that is up and running on your computer
