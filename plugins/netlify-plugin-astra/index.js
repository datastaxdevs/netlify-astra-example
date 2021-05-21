
const prompts = require('prompts');
const astraCollections = require('@astrajs/collections');
const astraRest = require('@astrajs/rest');
const chalk = require('chalk');
const os = require('os');
const fs = require('fs');
const readline = require('readline');
const axios = require('axios');
const dotenv = require("parsenv");
const jq = require('node-jq');

const envpath = '.env'
if (!fs.existsSync(envpath)) {
	fs.closeSync(fs.openSync(envpath, 'w'));
}
const config = {
    path: envpath
};

dotenv.config(config)


function wait(timeout) {
return new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, timeout);
});
}


let dbID = '';

start();

async function start() {
console.log(chalk.yellow('Checking your credentials...\n'));

let creds = await getTokens()
if (!creds) {
  console.log(chalk.red('Need to set up authentication stuff'));
  process.exit(0);
}
axios.defaults.headers.common['Authorization'] = "Bearer " + process.env.ASTRA_DB_ADMIN_TOKEN;
console.log(chalk.yellow('Credentials set up, checking database'))
dbID = await setUpDatabase();
console.log(chalk.yellow('Database setup: ' + dbID));
process.exit()
}

// First, check for a database
async function setUpDatabase() {
let database = await findWorkShopDatabase(false);
if (!database.id || database.status == 'TERMINATING') {
  let db = createDB();
  database = await findWorkShopDatabase(true);
} else {
  console.log(chalk.yellow('Found existing ' + astra_database + ' database'));
}

dbID = database.id;

if (database.status != 'ACTIVE') {
  console.log(chalk.yellow('     Current status is ' + database.status));

  const astraClient = await astraRest.createClient({
    applicationToken: process.env.ASTRA_DB_ADMIN_TOKEN,
    baseUrl: 'https://api.astra.datastax.com',
  });
  let dbActive = await requestWithRetry(astraClient, '/v2/databases/' + dbID);
  console.log(chalk.yellow('     Database is now ACTIVE'));
}

// Check for the keyspace
console.log(chalk.green('Checking for keyspace'));

const astraClient = await astraRest.createClient({
  applicationToken: process.env.ASTRA_DB_ADMIN_TOKEN,
  baseUrl: 'https://api.astra.datastax.com',
});
response = await astraClient.get('/v2/databases/' + dbID);
if (response.data.info.keyspaces.indexOf(astra_keyspace) != -1) {
  console.log(chalk.green('     ' + astra_keyspace + ' keyspace found'));
  return dbID;
} else {
  response = await astraClient.post('/v2/databases/' + dbID + '/keyspaces/' + astra_keyspace);
  console.log(chalk.yellow('     Created new ' + astra_keyspace + ' keyspace'));
  return dbID;
}
}

async function findWorkShopDatabase(retry) {
const astraClient = await astraRest.createClient({
  applicationToken: process.env.ASTRA_DB_ADMIN_TOKEN,
  baseUrl: 'https://api.astra.datastax.com',
});
axios.defaults.headers.common['Authorization'] = "Bearer " + process.env.ASTRA_DB_ADMIN_TOKEN;

response = await astraClient.get('/v2/databases');
databases = {};
output = '';
parseoutput = await jq.run('[.data[] | {id: .id, name: .info.name, status: .status, region: .info.region, keyspace: .info.keyspaces[0]}] | unique', response, {
  input: 'json',
});
JSON.parse(parseoutput).forEach((database) => {
  if (database.name == astra_database) {
    output = database;
  }
});
if (!output && retry) {
  const timeout = 5000 * 10;
  console.log(chalk.yellow('Waiting', timeout, 'ms'));
  await wait(timeout);
  output = findWorkShopDatabase(true);
}
      astraconfig.read(astrapath)
      dotenv.edit({ ASTRA_DB_ID: output.id});
    dotenv.edit({ ASTRA_DB_REGION: output.region});
    dotenv.edit({ ASTRA_DB_KEYSPACE: astra_keyspace});
    
    dotenv.write(config)
    dotenv.config(config)
return output;
}

async function createDB() {
console.log(chalk.green('Creating new database'));
const astraClient = await astraRest.createClient({
  applicationToken: process.env.ASTRA_DB_ADMIN_TOKEN,
  baseUrl: 'https://api.astra.datastax.com',
});
try {
  response = await astraClient.post('/v2/databases', {
    name: astra_database,
    keyspace: astra_keyspace,
    cloudProvider: 'GCP',
    tier: 'serverless',
    capacityUnits: 1,
    region: 'us-east1',
  });
} catch (e) {
  console.log('ERROR:' + e);
}
}

// This is the main file for the Netlify Build plugin astra.
// Please read the comments to learn more about the Netlify Build plugin syntax.
// Find more information in the Netlify documentation.
async function getTokens(constants) {
  let data = {};
  console.log(process.env)
  console.log(constants)
  if (!process.env['ASTRA_DB_APPLICATION_TOKEN']) {         
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
    console.log('Login to Astra at https://dstx.io/workshops')
    console.log('After login, you can create a database.')
    console.log('    database: netlify')
    console.log('    keyspace: classes')
    console.log('Click on the database name (netlify) to view details.')
    console.log('Click on the Settings tab at the top of the screen')
    
    process.env['ASTRA_DB_ADMIN_TOKEN']= rl.question("Create an application token for Database Administrator\n    (save to CSV if desired)\n    and paste the 'Token' value here:\n")
    process.env['ASTRA_DB_ADMIN_TOKEN'] = process.env['ASTRA_DB_ADMIN_TOKEN'].replace(/"/g,"");
    dotenv.edit({ ASTRA_DB_ADMIN_TOKEN: process.env['ASTRA_DB_ADMIN_TOKEN']});
    process.env['ASTRA_DB_APPLICATION_TOKEN'] = rl.question("Create an application token for API Admin User \n    (save to CSV if desired)\n    and paste the 'Token' value here:\n")
    process.env['ASTRA_DB_APPLICATION_TOKEN'] = process.env['ASTRA_DB_APPLICATION_TOKEN'].replace(/"/g,"");
    dotenv.edit({ ASTRA_DB_APPLICATION_TOKEN: process.env['ASTRA_DB_APPLICATION_TOKEN']});
    dotenv.write(config)
    dotenv.config(config)
    return dotenv;
  } else {
    console.log(process.env['ASTRA_DB_APPLICATION_TOKEN'])
  }
  return dotenv;
}
/* eslint-disable no-unused-vars */
module.exports = {
  async onPreBuild({
    netlifyConfig,
    inputs,
    error,

    // Build constants
    constants: {
      // Path to the Netlify configuration file. `undefined` if none was used
      CONFIG_PATH,
      // Directory that contains the deploy-ready HTML files and assets
      // generated by the build. Its value is always defined, but the target
      // might not have been created yet.
      PUBLISH_DIR,
      // The directory where function source code lives.
      // `undefined` if not specified by the user.
      FUNCTIONS_SRC,
      // The directory where built serverless functions are placed before
      // deployment. Its value is always defined, but the target might not have
      // been created yet.
      FUNCTIONS_DIST,
      // Boolean indicating whether the build was run locally (Netlify CLI) or
      // in the production CI
      IS_LOCAL,
      // Version of Netlify Build as a `major.minor.patch` string
      NETLIFY_BUILD_VERSION,
      // The Netlify Site ID
      SITE_ID,
      ASTRA_DB_ADMIN_TOKEN,
      ASTRA_DB_APPLICATION_TOKEN,
      ASTRA_DB_ID,
      ASTRA_DB_REGION,
      ASTRA_DB_KEYSPACES,
      ASTRA_DB_NAME
    },

    // Core utilities
    utils: {
      // Utility to report errors.
      // See https://github.com/netlify/build#error-reporting
      build,
      // Utility to display information in the deploy summary.
      // See https://github.com/netlify/build#logging
      status,
      // Utility for caching files.
      // See https://github.com/netlify/build/blob/master/packages/cache-utils#readme
      cache,
      // Utility for running commands.
      // See https://github.com/netlify/build/blob/master/packages/run-utils#readme
      run,
      // Utility for dealing with modified, created, deleted files since a git commit.
      // See https://github.com/netlify/build/blob/master/packages/git-utils#readme
      git,
       // Utility for handling Netlify Functions.
      // See https://github.com/netlify/build/tree/master/packages/functions-utils#readme
      functions,
    },
  }) {
    try {
      if (process.stdout.isTTY) {
        console.log('not redirected');
      }
      // Commands are printed in Netlify logs
      let tokens = await start()
      console.log(tokens)
      // Write them to .env
      // push them to netlify
    } catch (error) {
      // Report a user error
      build.failBuild('Error message', { error })
    }
  }
}
}
