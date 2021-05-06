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

1. Create a [DataStax Astra account](https://astra.datastax.com/register?utm_source=github&utm_medium=referral&utm_campaign=todo-astra-jamstack-netlify) if you don't already have one.  Define a **database name**, **keyspace name** and select a database **region**, then click **create database**.  Use what you like, the setup will create the correct database and keyspace.

2. Deploy to Netlify
<details>
<summary> What does the netlify deploy button do?</summary>

    The Netlify deploy button will:
    * Create a new repository for you on Github
    * Create a site on Netlify
    * Link the two together.
</details>

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/synedra/netlify-astra-example)


This will take a few minutes.

  * Click on "Site deploy in progress", then the top deploy link to see the build process.

  * When you see "Pushing to repository " you're ready to move on.  Scroll up to the top and click on the site name (it'll be after {yourlogin}'s Team next to the Netlify button).

  * Click on the 'GitHub' in "Deploys from GitHub' to get back to your new repository.  Scroll to where you were in the README.

{{GITHUB_REPO}}
  * Clone this repository to your local system with `git clone https://github.com/{{github_user}}/{{github_repo}}`

3. Clone your new repository into your development workspace after the build is done on Netlify.

7. In the repository directory, run `npm install`

8. In the repository directory, run astra-setup to set up your Astra environment
<details>
  <summary>What does astra-setup do?</summary>
      To setup your ASTRA instance, you want to run `npm exec astra-setup`

      This will do the following:
      * Have you go to your [Astra Database](https://datastx.io/workshops) to register or login. There is no credit card required to sign up. The 'Pay as you go' option gives you a huge amount of transactions for free:
         * 30 million reads
         * 5 million writes
         * 40 gigabytes of storage
      * Give steps to grab a Database Administrator Token and paste it into the input field
      * Ask you what database you want to use (default, existing, create)
      * Create or access the database
      * Create/update an .env file in the project root
      * Create/update an .astrarc file in your home directory
        * This can be used by httpie-astra `pip3 install httpie-astra`
        * It can also be used by the @astra/collections and @astra/rest node modules

      ## Specify the database and keyspace
      You can run the script and tell it which database/keyspace to use by using:
      `npm exec astra-setup databasename keyspacename`
</details>

`npm exec astra-setup netlify todos`

9. Next you will run `npm exec astra-netlify` to connect your workspace to your netlify site.
<details>
  <summary>What does astra-netlify do?</summary>
      To connect your workspace to netlify, you want to run `npm exec astra-netlify`

      This will do the following:
      * `netlify login` - if the script doesn't work with this because you are in a hosted environment, you can run `netlify login` first.
      * `netlify link` - this will link your workspace to the associated site
      * `netlify env: import` - this will take the .env file created by astra-setup and upload it to netlify.
      * `netlify sites:list` - will be used to allow you to execute `npm exec netlify-open`
</details>

10. Run the application `netlify dev` and open http://localhost:8080 to view your application:

11. Run `npm exec netlify-open`.  You've deployed your app to Netlify!
![image](https://user-images.githubusercontent.com/3254549/88744842-62233800-d0fd-11ea-8e20-29aa71027885.png)

### Things to Note:
 - The contents of this repo are based on [Jake's port](https://github.com/tjake/todo-astra-react-serverless/) of the [TodoMVC code](https://github.com/tastejs/todomvc/tree/master/examples/react) originally written by [Pete Hunt](https://github.com/petehunt).
 - The example is modified from https://github.com/huksley/todo-react-ssr-serverless.
<!--- ENDEXCLUDE --->
