# Structure
It got 3 servers all hosted differently, one for adding questions( using Django, I've removed it now and merged with others), server for Collaboration and server of featured codes.

## Backend

### 1. Featured Codes and Adding,deleting new codes server
Repo: https://github.com/Ashish0o7/chat-code-server/tree/master

### 2. Collaboration and chatting
Repo: https://github.com/Ashish0o7/chat-code-server/tree/main

### 3. Adding questions
Repo: https://github.com/Ashish0o7/add_codes_server
( I've discontinued it, and for more robust process, merged these operations with Featured codes)


# Home Page
[![Screenshot-2024-04-09-at-3-22-57-AM.png](https://i.postimg.cc/P5GcMpf6/Screenshot-2024-04-09-at-3-22-57-AM.png)](https://postimg.cc/fJKBzb9X)
# Featured Page, with rating
[![Screenshot-2024-04-09-at-3-23-05-AM.png](https://i.postimg.cc/rwNDV4K3/Screenshot-2024-04-09-at-3-23-05-AM.png)](https://postimg.cc/jDCxvL64)
# Collab in realtime
[![Screenshot-2024-04-09-at-3-23-13-AM.png](https://i.postimg.cc/bJNkcTgm/Screenshot-2024-04-09-at-3-23-13-AM.png)](https://postimg.cc/JyvGjj9X)
# Add Code
[![Screenshot-2024-04-09-at-3-23-17-AM.png](https://i.postimg.cc/k43MWX6K/Screenshot-2024-04-09-at-3-23-17-AM.png)](https://postimg.cc/mcjGs4Sg)

# Byte Builder
The Code Editor is a cutting-edge platform tailored for programmers and developers. It enables you to write, edit, save, and compile code both individually and collaboratively. This application stands out by merging real-time collaboration with the ability to share and evaluate high-quality code snippets. Furthermore, it offers a unique feature where users can share coding questions, fostering a collaborative and supportive environment for learning and problem-solving. Designed with a user-friendly interface, this editor ensures a seamless and enriching coding experience for all users.

## Features

### 1. Real-Time Collaboration
Collaborate seamlessly with others on coding projects in real-time, boosting productivity and teamwork.

### 2. Code Compilation and Execution
Write and execute code within the browser, with instant feedback on output, time, and memory usage.

### 3. Community-Driven Code Sharing
Discover and rate high-quality code snippets shared by the user community, fostering a culture of peer learning.

### 4. Secure Authentication
A robust login and registration system ensures the security and management of user data.

### 5. Enhanced Performance with Redis
Integrates Redis for efficient data handling, significantly improving system performance.


## Technologies Used

- Frontend: React.js
- Backend: NodeJS, Django, Express.js
- Database: MongoDB, Redis
- Authentication: Firebase
- APIs & Libraries: Axios, Socket.IO, Mongoose
- Architecture: Microservices
  


## Getting Started

1. Clone the repository:
   
```
git clone https://github.com/Ashish0o7/code-editor.git
```


3. Install the dependencies:

```
cd code-editor
npm install
```

3. Start the server:

```
npm run start
```
4. Open your browser and go to `http://localhost:3000` to use the code editor.
   
## Backend 

1. Clone these repositories seperately

###  Featured Codes and Adding,deleting new codes server
Repo: https://github.com/Ashish0o7/chat-code-server/tree/master

###  Collaboration and chatting
Repo: https://github.com/Ashish0o7/chat-code-server/tree/main


2. Install dependencies for both
```
npm install
```

3. To Start collaboration server
```
node server.js
```
4.
To start Featured codes and questions server
```
node server2.js
```

5. By this time, your frontend and both the server would be running

6. Now go ahead and setup .env file for both frontend and backend server

#### For frontend

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```

### For backend server
```
REACT_APP_RAPID_API_URL = ''
REACT_APP_RAPID_API_HOST = ''
REACT_APP_RAPID_API_KEY = ''

```





## Contributing

Contributions are welcome! Please submit a pull request if you'd like to make any changes or improvements to the code editor.

##
