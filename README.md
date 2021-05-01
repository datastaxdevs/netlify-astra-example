<!--- STARTEXCLUDE --->
# JAMStack + Netlify + Astra + Cassandra 📒
*10 minutes, Beginner, [Start Building](https://github.com/DataStax-Examples/todo-astra-jamstack-netlify#prerequisites)*

This is an example React To-Do application using a [DataStax Astra](https://astra.datastax.com/register?utm_source=devplay&utm_medium=github&utm_campaign=todo-astra-jamstack-netlify) free tier database.
<!--- ENDEXCLUDE --->

![image](https://monosnap.com/image/Fv0yPAznbeNJD3vYlQfztME6yogzFT)

## Objectives
* Provide a fullstack development example using Astra as the storage backend

## How this works
Once the Astra credentials are provided, the necessary tables are created in the database. The webservice will be available on port 8080 once the application has been deployed.

[JAMstack](https://jamstack.org/) is a big leap forward in how we can write web applications that are easy to write, deploy, scale, and also maintain. Using this approach means that newly created content is rendered from a content API, while a static render of it is being built into the site for future.

<!--- STARTEXCLUDE --->
# Running JAMStack + Netlify + Astra + Cassandra 
Follow the instructions below to get started.

## Prerequisites
Let's do some initial setup by creating a serverless(!) database.

### DataStax Astra
1. Create a [DataStax Astra account](https://astra.datastax.com/register?utm_source=github&utm_medium=referral&utm_campaign=todo-astra-jamstack-netlify) if you don't already have one:
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-register-basic-auth.png)

2. On the home page. Locate the button **`Create Database`**
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-dashboard.png)

3. Locate the **`Get Started`** button to continue
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-select-plan.png)

4. Define a **database name**, **keyspace name** and select a database **region**, then click **create database**.  For this example you should use "netlify" and "todos".
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-create-db.png)

5. Your Astra DB will be ready when the status will change from *`Pending`* to **`Active`** 💥💥💥 
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-db-active.png)

### Github
1. Click `Use this template` at the top of the [GitHub Repository](https://github.com/DataStax-Examples/todo-astra-jamstack-netlify):
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/github-use-template.png)

2. Enter a repository name and click 'Create repository from template':
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/github-create-repository.png)

3. Clone the repository:
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/github-clone.png)

## 🚀 Getting Started Paths:
*Make sure you've completed the [prerequisites](#prerequisites) before starting this step*
  - [Running on your local machine](#running-on-your-local-machine)
  - [Deploying to Netlify](#deploying-to-netlify)

### Running on your local machine
1. `cd` to the cloned repository, and install Node dependencies: `npm install`.

2. In the cloned repository, build the app: `npm run dev`.

2. Open http://localhost:8080 to view your application:
![image](https://user-images.githubusercontent.com/3254549/88739693-fdadac00-d0ef-11ea-9f95-d2ee643b5431.png)

### Deploying to Netlify
1. Click the 'Deploy to Netlify' button:
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/synedra/netlify-astra-example)

2. Connect your GitHub account:
![image](https://user-images.githubusercontent.com/3254549/88744656-d9a49780-d0fc-11ea-97ad-f05aa0ace11e.png)

3. In your local terminal, run `netlify login` to connect to the service.

4. Link your repository to the site you created with `netlify link`

6. Click your Netlify app link to view your live app:
![image](https://user-images.githubusercontent.com/3254549/88744822-4fa8fe80-d0fd-11ea-97dd-9f9611b332dc.png)

7. You've deployed your app to Netlify!
![image](https://user-images.githubusercontent.com/3254549/88744842-62233800-d0fd-11ea-8e20-29aa71027885.png)

### Things to Note:
 - The contents of this repo are based on [Jake's port](https://github.com/tjake/todo-astra-react-serverless/) of the [TodoMVC code](https://github.com/tastejs/todomvc/tree/master/examples/react) originally written by [Pete Hunt](https://github.com/petehunt).
 - The example is modified from https://github.com/huksley/todo-react-ssr-serverless.
<!--- ENDEXCLUDE --->
