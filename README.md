# Chatter

<img src='./frontendUi/public/chatter-logo-transparent.png' width='300px' height='300px'>

## Description

At Chatter, we’re dedicated to bringing people together, one message
at a time.Our chat application is designed to connect friends,
colleagues,

and new acquaintances effortlessly. With a focus on seamless
communication and meaningful interactions,we help you stay
connected and engaged, no matter where you are. Discover a new way to
chat and experience the joy of every conversation with Chatter.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contact](#contact)

## Installation

To set up the project, follow these steps:

1. **Install Server Dependencies:**
   Navigate to the project directory and run:

   ```sh
   npm install
   ```

2. **Start the Server:**
   To start the server, execute:

   ```sh
   npm start
   ```

3. **Run Server Tests:**
   To run the tests, use:

   ```sh
   npm test
   ```

4. **Install Client Dependencies:**
   Navigate to the client directory and run:

   ```sh
   npm install
   ```

5. **Start the Client:**
   To start the client for development, execute:

   ```sh
   npm run dev
   ```

6. **Build the Client:**
   To build the client for production, use:
   ```sh
   npm run build
   ```

## Configuration

To configure the project, create a `.env` file in the root directory with the following variables:

```plaintext
PORT=3000 # Choose any port number
MONGODB_URI=mongodb://<enter your mongodb uri>/
JWT_SECRET=<secret>
JWT_EXPIRES_IN=<duration of jwt token> # e.g., 7d or 30d 1h
NODE_ENV=development # or production
DATABASE=chatter # Any database name
```

Additionally, create a `.env` file in the client directory with the following variable:

```plaintext
VITE_SERVER_URI=http://localhost:3000 # Enter the server URI
```

## Usage


To use the application, follow these steps:

1. **Register an Account:**
   Open the application and sign up with your email and password and username.

2. **Log In:**
   Use your credentials to log in to the application.

3. **Start Chatting:**
   Once logged in, you can start a new conversation by searching for users and groups.

4. **Send Messages:**
   Type your message in the chat box and hit enter to send.

5. **Log Out:**
   When you're done, log out from the application to secure your account.


## Contact

[![GitHub](https://img.shields.io/badge/GitHub-Profile-informational?style=flat&logo=github&logoColor=white&color=2bbc8a)](https://github.com/kirlosbasta)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-informational?style=flat&logo=linkedin&logoColor=white&color=2bbc8a)](https://www.linkedin.com/in/kirlos-basta/)
