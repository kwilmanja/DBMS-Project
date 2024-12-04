drop database if exists stories;
CREATE DATABASE stories;
USE stories;

CREATE TABLE account (
	username VARCHAR(100) PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    phone_no VARCHAR(10),
    password VARCHAR(100) NOT NULL
);


insert into account values 
	('pozboi', 'pozboi123@gmail.com', '7205607869', 'hello'),
	('joe', 'joe@gmail.com', '7202444008', 'world');	


-- 
-- CREATE TABLE prompt (
-- 	prompt_id INT AUTO_INCREMENT,
--     name VARCHAR(128) NOT NULL,
--     description VARCHAR(512),
--     username VARCHAR(100) NOT NULL,
--     PRIMARY KEY (username, prompt_id),
--     FOREIGN KEY (username) REFERENCES account(username) # creates relationship
-- 		ON UPDATE CASCADE ON DELETE CASCADE
-- );
-- 
-- CREATE TABLE rate_prompt (
-- 	username VARCHAR(100),
--     prompt_id INT,
--     value INT NOT NULL,
--     PRIMARY KEY (username, prompt_id),
--     FOREIGN KEY (username) REFERENCES account(username)
-- 		ON UPDATE CASCADE ON DELETE CASCADE,
-- 	FOREIGN KEY (prompt_id) REFERENCES prompt(prompt_id)
-- 		ON UPDATE CASCADE ON DELETE CASCADE
-- );
-- 
-- CREATE TABLE passage (
-- 	passage_id INT AUTO_INCREMENT,
-- 	text VARCHAR(512) NOT NULL,
--     username VARCHAR(100),
--     prompt_id INT,
--     PRIMARY KEY (username, passage_id),
--     FOREIGN KEY (username) REFERENCES account(username) # writes relationship
-- 		ON UPDATE CASCADE ON DELETE CASCADE,
-- 	FOREIGN KEY (prompt_id) REFERENCES prompt(prompt_id) # based on relationship
-- 		ON UPDATE CASCADE ON DELETE SET NULL
-- );
-- 
-- CREATE TABLE story (
-- 	story_id INT AUTO_INCREMENT,
-- 	title VARCHAR(256) NOT NULL,
--     description VARCHAR(512),
--     last_edited_date DATETIME,
--     username VARCHAR(100),
--     published_date DATETIME NOT NULL,
--     prompt_id INT NOT NULL,
--     PRIMARY KEY (username, story_id),
--     FOREIGN KEY (username) REFERENCES account(username) # publishes relationship
-- 		ON UPDATE CASCADE ON DELETE CASCADE,
-- 	FOREIGN KEY (prompt_id) REFERENCES prompt(prompt_id) # is about relationship
-- 		ON UPDATE CASCADE ON DELETE CASCADE
-- );
-- 
-- CREATE TABLE made_up_of (
-- 	story_id INT,
--     passage_id INT,
--     sequence_num INT AUTO_INCREMENT NOT NULL,
--     PRIMARY KEY (story_id, passage_id),
--     FOREIGN KEY (story_id) REFERENCES story(story_id)
-- 		ON UPDATE CASCADE ON DELETE CASCADE,
-- 	FOREIGN KEY (passage_id) REFERENCES passage(passage_id)
-- 		ON UPDATE CASCADE ON DELETE CASCADE
-- );
-- 
-- CREATE TABLE rate_story (
-- 	username VARCHAR(100),
--     story_id INT,
--     value INT NOT NULL,
--     PRIMARY KEY (username, story_id),
--     FOREIGN KEY (username) REFERENCES account(username)
-- 		ON UPDATE CASCADE ON DELETE CASCADE,
-- 	FOREIGN KEY (story_id) REFERENCES story(story_id)
-- 		ON UPDATE CASCADE ON DELETE CASCADE
-- );
-- 
-- CREATE TABLE comment (
-- 	username VARCHAR(100),
--     story_id INT,
--     text VARCHAR(512) NOT NULL,
--     PRIMARY KEY (username, story_id),
--     FOREIGN KEY (username) REFERENCES account(username)
-- 		ON UPDATE CASCADE ON DELETE CASCADE,
-- 	FOREIGN KEY (story_id) REFERENCES story(story_id)
-- 		ON UPDATE CASCADE ON DELETE CASCADE
-- );
-- 
-- CREATE TABLE genre (
-- 	name VARCHAR(64) PRIMARY KEY
-- );
-- 
-- CREATE TABLE describe_prompt (
-- 	prompt_id INT,
--     genre_name VARCHAR(64),
--     PRIMARY KEY (prompt_id, genre_name),
--     FOREIGN KEY (prompt_id) REFERENCES prompt(prompt_id)
-- 		ON UPDATE CASCADE ON DELETE CASCADE,
-- 	FOREIGN KEY (genre_name) REFERENCES genre(name)
-- 		ON UPDATE RESTRICT ON DELETE RESTRICT
-- );
-- 
-- CREATE TABLE theme (
-- 	name VARCHAR(64) PRIMARY KEY
-- );
-- 
-- CREATE TABLE describe_story (
-- 	story_id INT,
--     theme_name VARCHAR(64),
--     PRIMARY KEY (story_id, theme_name),
--     FOREIGN KEY (story_id) REFERENCES story(story_id)
-- 		ON UPDATE CASCADE ON DELETE CASCADE,
-- 	FOREIGN KEY (theme_name) REFERENCES theme(name)
-- 		ON UPDATE RESTRICT ON DELETE RESTRICT
-- );
