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
	text VARCHAR(512) NOT null,
    username VARCHAR(100) not null,
    previous_passage INT,
    prompt int not null,
    unique(previous_passage, text),
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
	id INT primary key AUTO_INCREMENT,
	username VARCHAR(100),
    story_id INT,
    text VARCHAR(512) NOT NULL,
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
	('joe', 'joe@gmail.com', '7202444008', 'world'),
	('a', 'a', 'a', 'a');	

insert into prompt (name, description, username)
	values ('Prompt1', 'a prompt about something', 'joe'),
	('Prompt2', 'another prompt about something', 'joe');

insert into passage (text, username, previous_passage, prompt)
	values ('hhhhhhhhhhhhh', 'joe', null, 1),
	('gggggggggggggg', 'joe', null, 1);

insert into passage (text, username, previous_passage, prompt)
	values ('jjjjjjjjjjj', 'pozboi', 1, 1),
	('kkkkkkkkkkkk', 'pozboi', 1, 1),
	('llllllllllll', 'joe', 4, 1);

insert into story (title, description, username, published_date, end_passage)
	values ('story title', 'story description', 'joe', now(), 5),
	('another story', 'story description', 'joe', now(), 4);

insert into comment (username, story_id, text) values ('joe', 1, 'good story'), ('pozboi', 1, 'mid story');

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
	left join likes l on l.story_id = s.story_id
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

drop procedure if exists get_stories_by_prompt_id;
DELIMITER //
create procedure get_stories_by_prompt_id
(prompt_id_p int)
begin
	select s.*, 
	sum(CASE WHEN l.username IS NOT NULL THEN 1 ELSE 0 END) as num_likes
	from story s
	left join likes l on l.story_id = s.story_id
	join passage p on p.id = s.end_passage
	join prompt pr on pr.id = p.prompt
	where pr.id = prompt_id_p
	group by s.story_id;
end //
DELIMITER ;


drop procedure if exists insert_passage;
DELIMITER //
create procedure insert_passage
(text_p varchar(512), username_p varchar(100), 
previous_passage_p int, prompt_p int)
begin
	
	insert into passage (text, username, previous_passage, prompt)
	values (text_p, username_p, previous_passage_p, prompt_p);
	
	SELECT LAST_INSERT_ID() as id;
	
end //
DELIMITER ;



drop procedure if exists publish_story;
DELIMITER //
create procedure publish_story
(text_p varchar(512), username_p varchar(100), 
previous_passage_p int, prompt_p int,
description_p varchar(512), title_p varchar(256)
)
begin
	
	insert into passage (text, username, previous_passage, prompt)
	values (text_p, username_p, previous_passage_p, prompt_p);

	insert into story (title, description, username, published_date, end_passage)
	values (title_p, description_p, username_p, now(), LAST_INSERT_ID());

	SELECT LAST_INSERT_ID() as id;

end //
DELIMITER ;