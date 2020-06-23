-- CREATE DATABASE

CREATE SCHEMA `delivery` ;

-- CREATE A USER
CREATE USER 'admin'@'localhost' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON delivery.* TO 'admin'@'localhost';
