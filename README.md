
# challenge-begrowth

## REASON
👨‍💻💻 This challenge was proposed by the company Be Growth. I have to create a system following some requirements

> This is a delivery system.

## DESCRIPTION

- He owns the entry as a **company** and as a **user**.
- The **company** registers the products that are about to expire.
- **Deliverers** choose the products to deliver.

## BEFORE RUN

**RUN WITH MySQL**  this file:  **database\start-database.sql**
**DATABASE START COMMANDS:**

> - CREATE SCHEMA
>
> CREATE SCHEMA `delivery` ;

> - CREATE A USER
>
> CREATE USER 'admin'@'localhost' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON delivery.* TO 'admin'@'localhost';

## FUNCTIONALITIES

  - **Home page:** /
- **Company login screen:** /company-login
- **Company registration screen:** /company-register
- **User registration screen:** /register
-  **User login screen:** /login
- **Demand Page** /demanda
- **New Demand** (Just company): /demanda/new
- **My Demand**(Just company): /demanda/list
- **Edit Demands**(Just company): /demanda/edit (POST)
- **Remove Demand**(Just company): /demanda/delete (POST)

## DEPENDENCIES

- express
- ejs
- nodemon
- body-parser
- sequelize
- mysql2
- slugify
- bcryptjs
- express-session
- connect-flash
- cookie-parser
