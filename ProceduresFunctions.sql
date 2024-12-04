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

-- select * from comment;
-- 
-- select * from likes;


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
call get_stories_by_prompt_id(1)




