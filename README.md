# Welcome to the Navigate Tech Hub Project!

This guide will walk you through setting up your local development environment to start contributing. This is web app with advice and content regarding the nuances of the tech field. Designed to help students navigate the difficulties and achieve success in the tech sector.

## Prerequisites

Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/en) (LTS version recommended)
- [Git](https://git-scm.com/)
- A code editor like [VS Code](https://code.visualstudio.com/)

## Step-by-Step Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/ColorStack-at-Northeastern-University/Navigate-Tech-Hub.git](https://github.com/ColorStack-at-Northeastern-University/Navigate-Tech-Hub.git)
    cd Navigate-Tech-Hub
    ```

2.  **Switch to the `develop` Branch:**
    All our development work happens on the `develop` branch.
    ```bash
    git checkout develop
    ```

3.  **Install Frontend Dependencies:**
    Navigate into the `frontend` directory and install all the necessary packages.
    ```bash
    cd frontend
    npm install
    ```

4.  **Run the Development Server:**
    Once the installation is complete, you can start the local development server.
    ```bash
    npm run dev
    ```

5.  **Open in Browser:**
    Open your web browser and navigate to `http://localhost:3000`. You should see the Next.js starter page.

You are now ready to start developing!
