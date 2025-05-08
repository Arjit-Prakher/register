# Project Setup Guide

Follow the steps below to set up and run the project on your local machine.

## 1. Clone the Repository

Open your terminal and run the following command to clone the repository:

```
git clone <git-repo-link>
```

Then, open the project folder in your preferred code editor and terminal.

## 2. Install Dependencies

Ensure you're in the root directory of the project and run:

```
npm install
```

## 3. Configure Environment Variables

Create a `.env` file in the root directory of the project. Add your Cloudant apikey from Service Credential. For example:

```
API_KEY={Your apikey}
```

## 4. Run the Application

You can run the project in either production or development mode:

- **Production Mode**  
  ```
  npm start
  ```

- **Development Mode**  
  ```
  npm run dev
  ```

For additional scripts and options, refer to the `scripts` section in the `package.json` file.
