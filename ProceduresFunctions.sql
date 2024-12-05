use stories;

-- Define Procedures and Functions:

-- drop procedure if exists get_story_comments;
-- DELIMITER //
-- create procedure get_story_comments
-- (story_id_p int)
-- begin
-- 	select s.*, count(*) as num_likes from story s
-- 	join likes l on l.story_id = s.story_id
-- 	where s.story_id = story_id_p
-- 	group by s.story_id;
-- end //
-- DELIMITER ;
-- call get_story_comments(1)

-- select * from story;
-- 
-- select * from passage;
-- 
-- select * from story;
-- 
-- select * from account;
-- 
-- select * from theme;

-- select * from story;
-- -- 
-- -- select * from likes;
-- call get_story_metadata(1);
-- 
-- 
-- 
-- 
-- 
-- select s.*, count(*) as num_likes from story s
-- 	left join likes l on l.story_id = s.story_id
-- 	where s.story_id = 2
-- 	group by s.story_id;






-- select * from passage;
-- 
-- insert into passage (text, username, previous_passage, prompt)
-- 	values ('hhhhhhhhhhhhh', 'joe', null, 1);
-- 
-- SELECT LAST_INSERT_ID();
select * from passage;

