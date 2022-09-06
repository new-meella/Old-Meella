# Setup

### Type 1: without MySQL database/server (local) (for demo & testing pages)

#### Download all node modules

1. `npm install`

#### Run Server

1. `node index.js`
2. start requesting pages. To change the port number go into ./index.js`http://localhost:3030/`

### Type 2: with MySQL database/server (local) (for production / testing server)

#### Download all node modules

1. `npm install`

#### Setup MySQL database

1. Download [MySQL Workbench](https://www.mysql.com/products/workbench/downloads/).
2. Install MySQL Workbench.
3. Create a new database, local instance.
4. Create a new user, local instance.
5. Create a new schemas named "mydb"

#### Setup MySQL database

> Assumption for the prisma commands: prisma installed **globally**.

1. `prisma init`
2. Applying prisma schema to the MySQL localhost with
   `prisma migrate dev` & name the migration according
   > when updating the schema use `prisma db push`
3. To generate all the data for the server run the **./mockdata/mockdatagen.py** this will do all the nessary POST requests & check or error.
   > In python terminal it's normal for half of the test cases to be red. However, the TOP one should always be green. if not drop the MySQL Schema and create a new to reset the _AutoIncrement ID_.
4. Done. All data are in place for querying.

#### Run Server

1. `npm run dev`
2. start requesting pages. To change the port number go into ./src/app.ts`http://localhost:8080/`

### Type 3: with MySQL database/server (remote) (for production / testing server)

#### Download all node modules

1. `npm install`

---

### if bulding from scratch. Ignore!

**you may need to install dependancies**  
To run the localhost server,
change directory to the root of the project and run:

run the following command:  
`npm start`

This will create a .js project and and run the app.ts file.  
By default, the app.ts file will run on port 8080.

main file: src/app.ts

---

## When changes are made to the schema

run the following command:

pull the schema from the database in .prisma

`prisma db pull`

prisma the client again for the updated schema. Do this everytime the schema is updated.

`prisma generate`

---

## How to Query

Use **Insomnia** software to HTTP request

##### GET main page

`http://localhost:8080/`

##### GET All names of banks

`http://localhost:8080/banks`

##### GET All names of paymentmethods

`http://localhost:8080/payment-method`

---
