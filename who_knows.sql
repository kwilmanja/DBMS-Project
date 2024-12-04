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
    name VARCHAR(128) not null unique,
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
    end_passage INT not null unique,
    FOREIGN KEY (end_passage) REFERENCES passage(id) # is about relationship
		ON UPDATE CASCADE ON DELETE cascade,
    FOREIGN KEY (username) REFERENCES account(username) # publishes relationship
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE likes (
	username VARCHAR(100),
    story_id INT,
    PRIMARY KEY (username, story_id),
    FOREIGN KEY (username) REFERENCES account(username)
		ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (story_id) REFERENCES story(story_id)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE comment (
	username VARCHAR(100),
    story_id INT,
    text VARCHAR(512) NOT NULL,
    PRIMARY KEY (username, story_id),
    FOREIGN KEY (username) REFERENCES account(username)
		ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (story_id) REFERENCES story(story_id)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE theme (
	name VARCHAR(64) PRIMARY KEY
);


CREATE TABLE describe_story (
	story_id INT,
    theme VARCHAR(64),
    PRIMARY KEY (story_id, theme),
    FOREIGN KEY (story_id) REFERENCES story(story_id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (theme) REFERENCES theme(name)
		ON UPDATE RESTRICT ON DELETE RESTRICT
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
	values ('story title', 'story description', 'joe', now(), 5),
	('another story', 'story description', 'joe', now(), 4);

insert into comment values ('joe', 1, 'good story');

insert into likes values ('joe', 1), ('pozboi', 1);


insert into theme values ('Thriller'), ('Mystery'), ('Romance'), ('Adventure');


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


drop procedure if exists get_story_metadata;
DELIMITER //
create procedure get_story_metadata
(story_id_p int)
begin
	select s.*, count(*) as num_likes from story s
	join likes l on l.story_id = s.story_id
	where s.story_id = story_id_p
	group by s.story_id;
end //
DELIMITER ;


drop procedure if exists get_all_stories;
DELIMITER //
create procedure get_all_stories
()
begin
	select s.*, 
	sum(CASE WHEN l.username IS NOT NULL THEN 1 ELSE 0 END) as num_likes 
	from story s
	left join likes l on l.story_id = s.story_id
	group by s.story_id;
end //
DELIMITER ;
