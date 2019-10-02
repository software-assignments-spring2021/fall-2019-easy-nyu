# How to build and run our app locally
## File Structrue
The file system consists of two folders:
- Backend: Express.js, mongoDB connections, graphQL setups
- Frontend: React.js framework
## Setting up
### 1. make sure you have npm on your machine
type in command line 
```console
{username}:~$ npm -v
```
this should give you a version number if you have npm installed on your machine.
if the console returns command not found, please install npm with any means(brew for OS).
### 2. install all dependencies
To make sure the service can run properly on your local machine, you need to install all the dependencies for both backend and frontend. You need to be in the root directory(fall-2019-easy-nyu) of the git repository to do the following steps
```console
{username}:~$ cd backend
{username}:~$ npm install
```
This will install all required dependencies to run the backend service

exit out of the backend folder and cd into the frontend folder to install dependencies 
```console
{username}:~$ cd ..
{username}:~$ cd frontend
{username}:~$ npm install
```
now dependency installation is done for both backend and frontend
### 3. running the servers
The frontend has a built-in React server that serves at defualt prot 3000 to display the development webpage. This is not the way to deploy our app on cloud server but just a mean to let you see the frontend preview.
You will need to have both the frontend and backend servers running to test full functionalities of the application.
To do that, you need to open two terminals at the root direcotry.
In one terminal, run:
```console
{username}:~$ cd backend
{username}:~$ npm strat
```
In the other terminal, run:
```console
{username}:~$ cd frontend
{username}:~$ npm strat
```
### 4. See our site!
Now you can go to http://localhost:3000 to view the app that is up and running on your computer
