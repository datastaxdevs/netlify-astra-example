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

TODO: INSERT SINGING DANCING NEW ACCOUNT FLOW ANIMATED GIF

1. Create a [DataStax Astra account](https://astra.datastax.com/register?utm_source=github&utm_medium=referral&utm_campaign=todo-astra-jamstack-netlify) if you don't already have one:

4. Define a **database name**, **keyspace name** and select a database **region**, then click **create database**.  For this example you should use "netlify" and "todos".

The Netlify deploy button will create a new repository for you on Github, create a site on Netlify, and link the two together.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/synedra/netlify-astra-example)

This will take a few minutes.

6. Clone your new repository into your development workspace after the build is done on Netlify.  theres a github button on the deploy screen you can use.

7. Get your npm requirements: `npm install`

8. In your local terminal, run `netlify login` to connect to the service.

9. Link your repository to the site you created with `netlify link`

10. Build your application `netlify build`

11. Set your environment variables on the Netlify site: `netlify env:import`

12. Run the application `netlify dev`

13. Open http://localhost:8080 to view your application:

14. Open your Netlify site in the browser: 
    * Run `netlify sites:list` to find your site URL
    * Launch your site using the URL in the list

15. You've deployed your app to Netlify!
![image](https://user-images.githubusercontent.com/3254549/88744842-62233800-d0fd-11ea-8e20-29aa71027885.png)

### Things to Note:
 - The contents of this repo are based on [Jake's port](https://github.com/tjake/todo-astra-react-serverless/) of the [TodoMVC code](https://github.com/tastejs/todomvc/tree/master/examples/react) originally written by [Pete Hunt](https://github.com/petehunt).
 - The example is modified from https://github.com/huksley/todo-react-ssr-serverless.
<!--- ENDEXCLUDE --->
