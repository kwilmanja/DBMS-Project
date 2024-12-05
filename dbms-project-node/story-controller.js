import pool from "./pool.js";

const StoryController = (app) => {

    const createPrompt = async (req, res) => {
        const name = req.body.name;
        const description = req.body.description;
        const username = req.body.username;
        pool.query('insert into prompt (name, description, username) values (?, ?, ?);', 
            [name, description, username], (err, results) => {
            if (err) {
                console.error('Error creating prompt:', err);
                res.status(500).json({ error: 'Failed to create prompt' });
                return;
            } else {
                res.json(results[0]);
            }
          });
    };

    const getPromptById = async (req, res) => {
        const promptId = req.params.id;
        pool.query('select * from prompt where id = ?;', 
            [promptId], (err, results) => {
            if (err) {
                console.error('Error finding prompt:', err);
                res.status(500).json({ error: 'Failed to find prompt' });
                return;
            } else {
                res.json(results[0]);
            }
          });
    };

    const getAllPrompts = async (req, res) => {
        pool.query('select * from prompt;', (err, results) => {
            if (err) {
                console.error('Error finding prompts:', err);
                res.status(500).json({ error: 'Failed to find prompts' });
                return;
            } else {
                res.json(results);
            }
          });
    };


    const createPassage = async (req, res) => {
        const username = req.body.username;
        const text = req.body.text;
        const previousPassage = req.body.previousPassage;
        const prompt = req.body.prompt;
        pool.query('call insert_passage(?, ?, ?, ?);', 
            [text, username, previousPassage, prompt], (err, results) => {
            if (err) {
                console.error('Error creating prompt:', err);
                res.status(500).json({ error: 'Failed to create prompt' });
                return;
            } else {
                res.json(results[0][0]);
            }
          });
    };

    const getPassageById = async (req, res) => {
        const promptId = req.params.id;
        pool.query('select * from passage where id = ?;', 
            [promptId], (err, results) => {
            if (err) {
                console.error('Error finding passage:', err);
                res.status(500).json({ error: 'Failed to find passage' });
                return;
            } else {
                res.json(results[0]);
            }
          });
    };

    const getNextPassages = async (req, res) => {
        const previousPassageId = req.body.previousPassageId;
        if(previousPassageId || previousPassageId == 0){
            pool.query('select * from passage where previous_passage = ?;', 
                [previousPassageId], (err, results) => {
                if (err) {
                    console.error('Error finding passage:', err);
                    res.status(500).json({ error: 'Failed to find passage' });
                    return;
                } else {
                    res.json(results);
                }
            });
        } else {
            const promptId = req.body.promptId;
            pool.query('select * from passage where prompt = ? and previous_passage is NULL;', 
                [promptId], (err, results) => {
                if (err) {
                    console.error('Error finding passage:', err);
                    res.status(500).json({ error: 'Failed to find passage' });
                    return;
                } else {
                    res.json(results);
                }
            });
        }
       
    };



    const publishStory = async (req, res) => {
        let currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        const username = currentUser.username;

        const text = req.body.passage.text;
        const previousPassage = req.body.passage.previousPassage;
        const prompt = req.body.passage.prompt;

        const title = req.body.title;
        const description = req.body.description;

        pool.query('call publish_story(?, ?, ?, ?, ?, ?);', 
            [text, username, previousPassage, prompt, description, title], (err, results) => {
            if (err) {
                console.error('Error creating story:', err);
                res.status(500).json({ error: 'Failed to create story' });
                return;
            } else {

                const themes = req.body.themes;
                const storyId = results[0][0].id;

                const query = "insert into describe_story (story_id, theme) values " +
                "(" + storyId + ", \'" + themes.join("\'), (" + storyId + ", \'") + "\');";

                pool.query(query, [], (err) => {
                    if (err) {
                        console.error('Error adding themes:', err);
                        res.status(500).json({ error: 'Failed to add themes' });
                        return;
                    } else {
                        res.json(storyId);
                    }
                  });
            }
          });
    };

    const deleteStory = async (req, res) => {
        const storyId = req.params.id;
        pool.query('delete from story where story_id = ?;', 
            [storyId], (err, results) => {
            if (err) {
                console.error('Error deleting story:', err);
                res.status(500).json({ error: 'Failed to delete story' });
                return;
            } else {
                res.json(results[0]);
            }
          });
    };

    const getAllStories = async (req, res) => {
        pool.query('call get_all_stories();', (err, results) => {
            if (err) {
                console.error('Error finding stories:', err);
                res.status(500).json({ error: 'Failed to find stories' });
                return;
            } else {
                res.json(results[0]);
            }
          });
    };

    const getStoryMetadata = async (req, res) => {
        const storyId = req.params.id;
        pool.query('call get_story_metadata(?);', 
            [storyId], (err, results) => {
            if (err) {
                console.error('Error finding story:', err);
                res.status(500).json({ error: 'Failed to find story' });
                return;
            } else {
                res.json(results[0][0]);
            }
          });
    };

    const getStoryPassages = async (req, res) => {
        const storyId = req.params.id;
        pool.query('call build_story(?);', 
            [storyId], (err, results) => {
            if (err) {
                console.error('Error finding story:', err);
                res.status(500).json({ error: 'Failed to find story' });
                return;
            } else {
                res.json(results[0]);
            }
          });
    };

    const getAllStoriesByPromptId = async (req, res) => {
        const promptId = req.params.id;
        pool.query('call get_stories_by_prompt_id(?);', 
            [promptId], (err, results) => {
            if (err) {
                console.error('Error finding stories associated with prompt:', err);
                res.status(500).json({ error: 'Failed to find stories associated with prompt' });
                return;
            } else {
                res.json(results[0]);
            }
          });
    };

    const getAllThemes = async (req, res) => {
        pool.query('select * from theme;', 
            [], (err, results) => {
            if (err) {
                console.error('Error finding themes:', err);
                res.status(500).json({ error: 'Failed to find themes' });
                return;
            } else {
                res.json(results);
            }
          });
    };

    app.post("/api/prompt/create", createPrompt);
    app.get("/api/prompt/info/:id", getPromptById);
    app.get("/api/prompt/all", getAllPrompts);

    app.post("/api/passage/create", createPassage);
    app.get("/api/passage/info/:id", getPassageById);
    app.post("/api/passage/next", getNextPassages)

    app.post("/api/story/publish", publishStory);
    app.delete("/api/story/delete/:id", deleteStory);
    app.get("/api/story/all", getAllStories);
    app.get("/api/story/info/metadata/:id", getStoryMetadata);
    app.get("/api/story/info/passages/:id", getStoryPassages);
    app.get("/api/story/all/prompt/:id", getAllStoriesByPromptId)
    app.get("/api/story/themes", getAllThemes);


};
export default StoryController;