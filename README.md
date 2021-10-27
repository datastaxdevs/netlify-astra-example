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
* git installed on your local system
* github account
* [node 15 and npm 7 or later](https://www.whitesourcesoftware.com/free-developer-tools/blog/update-node-js/)

## Getting Started
Let's do some initial setup by creating a serverless(!) database.

1. **Login/Register**
Click the button to login or register with Datastax.
- <a href="https://astra.datastax.com/register?utm_source=github&utm_medium=referral&utm_campaign=todo-astra-jamstack-netlify"><img src="https://dabuttonfactory.com/button.png?t=Create+Astra+Database&f=Calibri-bold&ts=20&tc=fff&hp=40&vp=10&c=8&bgt=unicolored&bgc=6fa8dc" /></a>
- <details><summary>Show me!</summary>
    <img src="https://github.com/datastaxdevs/workshop-spring-stargate/raw/main/images/tutorials/astra-create-db.gif?raw=true" />
</details>

**Use the following values when creating the database**
|Field| Value|
|---|---|
|**database name**| `netlify` |
|**keypace**| `todos` |
|**Cloud Provider**| *Use the one you like, click a cloud provider logo,  pick an Area in the list and finally pick a region.* |


2. **Deploy to Netlify**
- <details><summary> What does the netlify deploy button do?</summary>The Netlify deploy button will:<ul>
    <li>Create a new repository for you on Github</li>
    <li>Create a site on Netlify</li>
    <li>Link the two together.</li></ul>
</details>

- Click the button to deploy:
  [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/datastaxdevs/netlify-astra-example)
 * <details><summary>Show me!</summary>
    <img src="https://github.com/datastaxdevs/workshop-spring-stargate/raw/main/images/tutorials/astra-create-token.gif?raw=true" />
    </details>

### 3. Access YOUR GitHub repository

  * Click on the `GitHub` in `Deploys from GitHub` to get back to your new repository.  Scroll to where you were in the README.
    <details>
    <summary>Show me! </summary>
    <img src="tutorial/images/deploy-5.png" />
    </details>

### 4. Launch GitPod IDE
- Click the button to launch the GitPod IDE from **YOUR** repository.

* _Supported by <img src="tutorial/images/chrome-logo.svg" height="20"/> Chrome and <img src="tutorial/images/firefox-logo.svg" height="20"/> Firefox_

#### WAIT! Before moving on ensure you are working out of YOUR repository, not the datastaxdevs repository.

If you are still using the `datastaxdevs` repo please ensure to follow the previous step, [step3](#3-clone-your-github-repository) to get to your repo.

 * Ok, I've got it, just give me the button already
 * <details>
     <summary>CLICK HERE to launch GitPod</summary>

     [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/from-referrer/)
   </details>
   
#### WAIT! Before moving on ensure you are working out of YOUR repository, not the datastaxdevs repository.
* From your GitPod terminal execute the following command
```
git remote -v
```

If the result returned from the command displays **`datastaxdevs`** then you are not in the correct repository. If this is the case please [repeat step 3 above](#3-access-your-github-repository), otherwise just move on to the next step.

### 5. Install the Netlify CLI (Command Line Interface)
 * In the `workshop-astra-tik-tok` directory run the following command to install the netlify-cli
 ```
 npm install -g netlify-cli
```
 * <details><summary>Show me!</summary>
    <img src="tutorial/images/netlify-install-cli.png?raw=true" />
    </details>

### 6. Generate application token to securely connect to the database

Following the [Documentation](https://docs.datastax.com/en/astra/docs/manage-application-tokens.html) create a token with `Database Admnistrator` roles.

- Go the `Organization Settings`

- Go to `Token Management`

- Pick the role `Database Admnistrator` on the select box

- Click Generate token

 * <details><summary>Show me!</summary>
    <img src="tutorial/images/astra-create-token.gif?raw=true" />
    </details>

This is what the token page looks like. 
 * Click the **`Download CSV`** button. You are going to need these values here in a moment.

![image](tutorial/images/astra-token.png?raw=true)

Notice the clipboard icon at the end of each value.

- `Client ID:` We will *not* use this during this workshop

- `Client Secret:` We will *not* use this during this workshop

- `Token:` *This is your token!* We will use it as a api Key to interact with APIS

[This video](https://www.youtube.com/watch?v=TUTCLsBuUd4) describes the procedure to generate a token in Astra DB.

### 7. Configure and connect database
 * In the repository directory run the following command to set up your Astra DB environment. This will verify the database you created earlier or create a new one for you if it can't find your database.
 ```
 npm exec astra-setup tiktok_workshop_db tiktok_keyspace
```

<details>
<summary>What does astra-setup do?</summary>
    To setup your ASTRA instance, you want to run `npm exec astra-setup`

    This will do the following:
    * Have you go to your [Astra DB instance](https://datastx.io/workshops) to register or login. There is no credit card required to sign up. The 'Pay as you go' option gives you a huge amount of transactions for free:
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

### 8. Launch your app
  * Run the application 
  ```
  netlify dev
  ```
  * The application should automatically launch in the GitPod preview pane

### 9. Connect Netlify to your site
Execute each of the commands below to link your code to your Netlify deployment.
  * First thing, we'll need to **STOP** the `netlify dev` command we issued a moment ago. In the terminal where you executed the netlify command issue a `CTRL-C` (control key + the C key) in order to stop the process.
  * Then continue with the following commands
  * This will pop up a browser to authenticate with netlify
  ```
  netlify login
  ```
  _Note, when using GitPod the preview pane will not display this properly. You must click the "open in a new window" button in the very top right of the preview pane._

  * This will link your workspace to the associated site
  ```
  netlify link
  ```

  * This will take the .env file created by astra-setup and upload it to netlify
  ```
  netlify env:import .env
  ```

<!--
  * Will be used to allow you to execute `netlify open`
  ```
  netlify sites:list
  ```
-->

### 10. Deploy to production
Now that you've hooked everything up, time to deploy to production.

  * Run
  ```
  netlify build
  ```

  * Then run
  ```
  netlify deploy --prod
  ```

  * Then finally run
  ```
  netlify open:site
  ```
  
  You've deployed your app to Netlify!
  ![Netlify Setup Example](./tutorial/images/netlify-livesite.png?raw=true)

