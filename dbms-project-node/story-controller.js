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
        pool.query('insert into passage (text, username, previous_passage, prompt) values (?, ?, ?, ?);', 
            [text, username, previousPassage, prompt], (err, results) => {
            if (err) {
                console.error('Error creating prompt:', err);
                res.status(500).json({ error: 'Failed to create prompt' });
                return;
            } else {
                res.json(results[0]);
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



    const publishStory = async (req, res) => {
        const title = req.body.title;
        const username = req.body.username;
        const description = req.body.description;
        const endPassage = req.body.endPassage;
        pool.query('insert into story (title, description, username, published_date, end_passage) values (?, ?, ?, now(), ?);', 
            [title, description, username, endPassage], (err, results) => {
            if (err) {
                console.error('Error creating story:', err);
                res.status(500).json({ error: 'Failed to create story' });
                return;
            } else {
                res.json(results[0]);
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

    app.post("/api/prompt/create", createPrompt);
    app.get("/api/prompt/info/:id", getPromptById);
    app.get("/api/prompt/all", getAllPrompts);

    app.post("/api/passage/create", createPassage);
    app.get("/api/passage/info/:id", getPassageById);

    app.post("/api/story/publish", publishStory);
    app.delete("/api/story/delete/:id", deleteStory);
    app.get("/api/story/all", getAllStories);
    app.get("/api/story/info/metadata/:id", getStoryMetadata);
    app.get("/api/story/info/passages/:id", getStoryPassages);


    app.get("/api/story/all/prompt/:id", getAllStoriesByPromptId)

};
export default StoryController;