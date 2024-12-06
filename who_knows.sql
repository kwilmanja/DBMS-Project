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
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL UNIQUE,
    description VARCHAR(512) NOT NULL,
    username VARCHAR(100),
    FOREIGN KEY (username) REFERENCES account(username)
		ON UPDATE CASCADE ON DELETE SET NULL
);


CREATE TABLE passage (
	id INT PRIMARY KEY AUTO_INCREMENT,
	text VARCHAR(512) NOT NULL,
    username VARCHAR(100),
    previous_passage INT,
    prompt INT NOT NULL,
    UNIQUE(previous_passage, text),
    FOREIGN KEY (username) REFERENCES account(username)
		ON UPDATE CASCADE ON DELETE SET NULL,
	FOREIGN KEY (prompt) REFERENCES prompt(id)
		ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY (previous_passage) REFERENCES passage(id)
		ON UPDATE CASCADE ON DELETE RESTRICT
);


CREATE TABLE story (
	story_id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(256) NOT NULL,
    description VARCHAR(512) NOT NULL,
    username VARCHAR(100),
    published_date DATETIME NOT NULL,
    end_passage INT NOT NULL UNIQUE,
    FOREIGN KEY (end_passage) REFERENCES passage(id)
		ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (username) REFERENCES account(username)
		ON UPDATE CASCADE ON DELETE SET NULL
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
	id INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(100) NOT NULL,
    story_id INT NOT NULL,
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
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE genre (
	name VARCHAR(64) PRIMARY KEY
);

CREATE TABLE describe_prompt (
	prompt_id INT,
    genre VARCHAR(64),
    PRIMARY KEY (prompt_id, genre),
    FOREIGN KEY (prompt_id) REFERENCES prompt(id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (genre) REFERENCES genre(name)
		ON UPDATE CASCADE ON DELETE CASCADE
);


insert into account values 
	('pozboi', 'pozboi123@gmail.com', '7205607869', 'hello'),
	('joe', 'joe@gmail.com', '7203218756', 'world'),
    ('Jay-Z', 'jay_zee@outlook.com', null, 'queenbee'),
    ('Pitbull', 'mrworldwide@gmail.com', null, 'notadog'),
    ('DJ Khaled', 'khaled@msn.com', '8189765252', 'wethebestmusic'),
    ('Bob', 'bob@thebuilder.org', '5557778888', 'yeswecan');	

insert into prompt (name, description, username) values 
	('Lost in the Blue Abyss', 'A curious young explorer is swept away into the vast, 
    colorful depths of the ocean, where unlikely friends help navigate dangers and reunite 
    with family.', 'pozboi'),
    ('Echoes in the Empty Hotel', 'A winter caretaker and his family find themselves trapped 
    in a sprawling, isolated lodge where eerie forces and personal demons blur the line between 
    reality and madness.', 'pozboi'),
	('Isle of Dinosaurs', 'A revolutionary wildlife sanctuary brings ancient creatures back 
    to life, but nature\'s unpredictability turns a dream into a thrilling fight for survival.', 
    'joe'),
    ('The Cosmic Traveler\'s Handbook', 'An ordinary human is swept into an absurd intergalactic 
    adventure, armed with a peculiar guidebook and a knack for stumbling into cosmic chaos.', 
    'joe'),
    ('The Tale of True Hearts and Peril', 'A daring hero, a spirited princess, and a cast of 
    quirky companions embark on a whimsical journey through danger, love, and legendary feats.', 
    'joe'),
    ('Life in the Family', 'A young hustler rises through the ranks of a powerful crime syndicate, 
    navigating loyalty, betrayal, and the high cost of living the good life.', 'joe'),
    ('The Path to Memory Creek', 'Four childhood friends embark on a life-changing journey to 
    uncover a secret, discovering the bonds of friendship and the weight of growing up along 
    the way.', 'Jay-Z'),
    ('Epic Night: The Final Countdown', 'Two lifelong friends set out on a chaotic quest to 
    make their last high school party unforgettable, facing hilarious mishaps and heartfelt 
    revelations along the way.', 'Pitbull'),
    ('Christmas Gone Haywire', 'A well-meaning family\'s quest for the perfect Christmas 
    spirals into chaos as unexpected guests, wild antics, and festive disasters pile up.', 
    'DJ Khaled'),
    ('Builder Bob and the Big Fix-Up', 'A cheerful builder and his team of talking tools tackle 
    their biggest challenge yet, proving that teamwork and determination can solve any problem.', 
    'Bob'),
    ('Critter Crew to the Rescue', 'A trio of pint-sized heroes springs into action, using smarts, 
    teamwork, and catchy tunes to help animals in need around the world.', 'Bob');
    
insert into genre values 
	('Thriller'), ('Mystery'), ('Romance'), ('Adventure'), ('Sci-fi'), ('Non-Fiction'), ('Horror'),
	('Comedy');

insert into describe_prompt values
	(1, 'Adventure'), (2, 'Horror'), (2, 'Thriller'), (2, 'Mystery'), (3, 'Thriller'), (3, 'Sci-fi'), (3, 'Adventure'),
    (4, 'Sci-fi'), (4, 'Adventure'), (5, 'Romance'), (5, 'Adventure'), (6, 'Adventure'), (6, 'Non-Fiction'),
    (7, 'Adventure'), (8, 'Comedy'), (8, 'Adventure'), (9, 'Non-fiction'), (9, 'Comedy'), (10, 'Thriller'), 
    (10, 'Comedy'), (11, 'Adventure');

insert into passage (text, username, previous_passage, prompt) values 
	('A young fish named Bemo is eager to explore the vast ocean, so he swims beyond the safety of his coral home.', 
    'joe', NULL, 1);

insert into passage (text, username, previous_passage, prompt) values 
	('He meets a wise old sea turtle who offers to guide him through the currents.', 'pozboi', 1, 1),
	('Caught by a sudden movement, the young fish is trapped in a net, struggling to escape.', 'joe', 1, 1),
	('Drawn by shimmering light, the young fish discovers a glowing cave filled with hidden treasures.', 'Jay-Z', 1, 1);
    
insert into passage (text, username, previous_passage, prompt) values 
	('The turtle shares secrets of the ocean, showing how to ride currents to travel great distances.', 'pozboi', 2, 1),
    ('Using quick thinking, the young fish wiggles free and promises his dad to stay cautious in the future.', 'joe', 3, 1),
    ('A giant octopus emerges from the shadows, offering a challenge in exchange for safe passage.', 'Jay-Z', 4, 1);

insert into story (title, description, username, published_date, end_passage) values 
	('Bemo meets a cool sea turtle', 'A young fish named Bemo makes an unlikely friend with a 100 year old sea turtle', 
    'pozboi', now(), 5),
	('Bemo escapes disaster!', 'Bemo is almost taken by a net, but he uses his brilliance to escape in time.', 
    'joe', now(), 6),
    ('Octopus lol', 'Bemo meets an octopus. The octopus has a challenge for him (unfinished: I got writer\'s block).', 
    'Jay-Z', now(), 7);

insert into theme values ('Survival'), ('Family'), ('Love'), ('Coming-of-Age'), ('Friendship'), ('Good and Evil');

insert into describe_story values
	(1, 'Friendship'), (2, 'Survival'), (2, 'Family'), (2, 'Coming-of-Age'), (3, 'Good and Evil');

insert into comment (username, story_id, text) values 
	('joe', 1, 'good story'), ('pozboi', 1, 'mid story'), ('Jay-Z', 1, 'made me laugh!'), 
    ('Pitbull', 1, 'Mr. Worldwide approves'), ('DJ Khaled', 1, 'my password is wethebestmusic'),
    ('Bob', 2, 'That was a close one!'), ('pozboi', 2, 'Bemo seems like a chill guy'), ('Jay-Z', 2, 'This one made me laugh too!'),
    ('Pitbull', 3, 'I had an octopus once...'), ('Jay-Z', 3, 'Hey guys, please help me finish this story. Much appreciated!'),
    ('DJ Khaled', 3, 'This story is the worst!');

insert into likes values 
	('joe', 1), ('pozboi', 1), ('Pitbull', 1), ('Jay-Z', 1), ('DJ Khaled', 1), ('Bob', 1),
    ('joe', 2), ('pozboi', 2), ('Pitbull', 2), ('Bob', 3);


CREATE VIEW full_story_data AS
select s.*, 
	sum(CASE WHEN l.username IS NOT NULL THEN 1 ELSE 0 END) as num_likes,
	t.themes,
	pr.name as prompt_name,
	pr.id as prompt_id
	from story s
	left join likes l on l.story_id = s.story_id
	left join (select story_id, group_concat(theme separator ', ') as themes
		from describe_story group by story_id) as t
		on t.story_id = s.story_id
	join passage p on p.id = s.end_passage
	join prompt pr on pr.id = p.prompt
	group by s.story_id;
    
CREATE VIEW full_prompt_data AS
select p.*, 
	g.genres
	from prompt p
	left join (select prompt_id, group_concat(genre separator ', ') as genres
		from describe_prompt group by prompt_id) as g
		on g.prompt_id = p.id
	group by p.id;

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

drop procedure if exists get_stories_by_username;
DELIMITER //
create procedure get_stories_by_username
(username_p varchar(100))
begin
	select * from full_story_data
	where username = username_p;
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

drop procedure if exists create_prompt;
DELIMITER //
create procedure create_prompt
(name_p varchar(128), description_p varchar(512), username_p varchar(100))
begin
	
	insert into prompt (name, description, username)
	values (name_p, description_p, username_p);

	SELECT LAST_INSERT_ID() as id;

end //
DELIMITER ;

drop procedure if exists get_story_metadata;
DELIMITER //
create procedure get_story_metadata
(story_id_p int)
begin
	select * from full_story_data
	where story_id = story_id_p;
end //
DELIMITER ;


drop procedure if exists get_all_stories;
DELIMITER //
create procedure get_all_stories
()
begin
	select * from full_story_data;
end //
DELIMITER ;

drop procedure if exists get_stories_by_prompt_id;
DELIMITER //
create procedure get_stories_by_prompt_id
(prompt_id_p int)
begin
	select * from full_story_data
	where prompt_id = prompt_id_p;
end //
DELIMITER ;

drop procedure if exists get_stories_by_username;
DELIMITER //
create procedure get_stories_by_username
(username_p varchar(100))
begin
	select * from full_story_data
	where username = username_p;
end //
DELIMITER ;