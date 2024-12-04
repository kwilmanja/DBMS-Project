use stories;

-- Define Procedures and Functions:

-- drop procedure if exists build_story;
-- DELIMITER //
-- create procedure build_story
-- (story_id_p int)
-- begin
-- 	WITH RECURSIVE passage_tree AS (
--     SELECT *
--     FROM passage
--     WHERE id = (select end_passage from story where story_id = story_id_p)
--     UNION ALL
--     SELECT p.*
--     FROM passage_tree pt
--     JOIN passage p 
--     ON pt.previous_passage = p.id
-- 	)
-- 	SELECT * from passage_tree order by id;
-- end //
-- DELIMITER ;
-- call build_story(1);



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
call get_all_stories();

-- select * from story;
-- 
-- select * from passage;
-- 
-- select * from story;
-- 
-- select * from account;
-- 
-- select * from theme;




select s.*, sum(CASE WHEN l.username IS NOT NULL THEN 1 ELSE 0 END) as num_likes from story s
	left join likes l on l.story_id = s.story_id
	group by s.story_id;









