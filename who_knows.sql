drop database if exists stories;
CREATE DATABASE stories;
USE stories;

CREATE TABLE account (
	username VARCHAR(100) PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    phone_no VARCHAR(10),
    password VARCHAR(100) NOT NULL
);



CREATE TABLE prompt (
	id INT primary key AUTO_INCREMENT,
    name VARCHAR(128) not null,
    description VARCHAR(512),
    username VARCHAR(100) NOT NULL,
    FOREIGN KEY (username) REFERENCES account(username) 
		ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE passage (
	id INT primary key AUTO_INCREMENT,
	text VARCHAR(512) NOT NULL,
    username VARCHAR(100) not null,
    previous_passage INT,
    prompt int,
	check (prompt is not null or previous_passage is not null),
    FOREIGN KEY (username) REFERENCES account(username)
		ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (prompt) REFERENCES prompt(id),
	FOREIGN KEY (previous_passage) REFERENCES passage(id)
	);


CREATE TABLE story (
	story_id INT primary key AUTO_INCREMENT,
	title VARCHAR(256) NOT NULL,
    description VARCHAR(512),
    username VARCHAR(100),
    published_date DATETIME NOT NULL,
    end_passage INT not null,
    FOREIGN KEY (end_passage) REFERENCES passage(id) # is about relationship
		ON UPDATE CASCADE ON DELETE cascade,
    FOREIGN KEY (username) REFERENCES account(username) # publishes relationship
		ON UPDATE CASCADE ON DELETE CASCADE
);

insert into account values 
	('pozboi', 'pozboi123@gmail.com', '7205607869', 'hello'),
	('joe', 'joe@gmail.com', '7202444008', 'world');	

insert into prompt (name, description, username)
	values ('Prompt1', 'a prompt about something', 'joe'),
	('Prompt2', 'another prompt about something', 'joe');

insert into passage (text, username, previous_passage, prompt)
	values ('hhhhhhhhhhhhh', 'joe', null, 1),
	('gggggggggggggg', 'joe', null, 1);

insert into passage (text, username, previous_passage, prompt)
	values ('jjjjjjjjjjj', 'pozboi', 1, null),
	('kkkkkkkkkkkk', 'pozboi', 1, null),
	('llllllllllll', 'joe', 4, null);

insert into story (title, description, username, published_date, end_passage)
	values ('story title', 'story description', 'joe', now(), 5);


-- drop database if exists stories;
-- CREATE DATABASE stories;
-- USE stories;
-- 
-- CREATE TABLE account (
-- 	username VARCHAR(100) PRIMARY KEY,
--     email VARCHAR(100) NOT NULL,
--     phone_no VARCHAR(10),
--     password VARCHAR(100) NOT NULL
-- );
-- 
-- 
-- insert into account values 
-- 	('pozboi', 'pozboi123@gmail.com', '7205607869', 'hello'),
-- 	('joe', 'joe@gmail.com', '7202444008', 'world');	
-- 
-- 
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


drop procedure if exists build_story;
DELIMITER //
create procedure build_story
(story_id_p int)
begin
	WITH RECURSIVE passage_tree AS (
    SELECT *
    FROM passage
    WHERE id = (select end_passage from story where story_id = story_id_p)
    UNION ALL
    SELECT p.*
    FROM passage_tree pt
    JOIN passage p 
    ON pt.previous_passage = p.id
	)
	SELECT * from passage_tree order by id;
end //
DELIMITER ;
