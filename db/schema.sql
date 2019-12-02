-- Drops the burger_db if it exists currently --
DROP DATABASE IF EXISTS burger_db;
-- Creates the "burger_db" database --
CREATE DATABASE burger_db;
-- Use DB 
USE burger_db; 
-- create table 
CREATE TABLE burger(
id INTEGER NOT NULL AUTO_INCREMENT,
burgerName VARCHAR(250) NOT NULL,
devoured BOOLEAN NOT NULL,
PRIMARY KEY (id)
); 