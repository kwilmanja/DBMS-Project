import * as usersDao from "./users-dao.js";
import * as dao from "./users-dao.js";
import pool from "../pool.js";

const UserController = (app) => {


    const register = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.username;
        const phone = req.body.password;

        pool.query('insert into account values (?, ?, ?, ?);', [username, email, phone, password], (err, results) => {
            if (err) {
                console.error('Error creating user:', err);
                res.status(500).json({ error: 'Failed to create user' });
                return;
            } else {
                res.json(results);
            }
          });
    };

    const login = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        pool.query('select * from account where username = ? AND password = ?;', [username, password], (err, results) => {
            if (err) {
                console.error('Error finding user:', err);
                res.status(500).json({ error: 'Failed to login user' });
                return;
            } else {
                req.session["currentUser"] = results[0];
                res.json(results[0]);
            }
          });
    };

    const profile = async (req, res) => {
        let currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        const username = currentUser.username;
        const password = currentUser.password;
        pool.query('select * from account where username = ? AND password = ?;', [username, password], (err, results) => {
            if (err) {
                console.error('Error finding user:', err);
                res.status(500).json({ error: 'Failed to login user' });
                return;
            } else {
                req.session["currentUser"] = results[0];
                res.json(results[0]);
            }
          });
    };

    const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };


    const updateUser = async (req, res) => {
        const user = req.body;
        const email = user.email;
        const phone = user.phone;

        pool.query('update account set email = ?, phone_no = ? where username = ?;', [email, phone, req.params.username], (err, results) => {
            if (err) {
                console.error('Error updating user:', err);
                res.status(500).json({ error: 'Failed to update user' });
                return;
            } else {
                res.json(results);
            }
        });
    };

    const findProfileByUsername = async (req, res) => {

        const username = req.params.username;
        pool.query('select username, email, phone_no from account where username = ?;', [username], (err, results) => {
            if (err) {
                console.error('Error finding user:', err);
                res.status(500).json({ error: 'Failed to login user' });
                return;
            } else {
                res.json(results[0]);
            }
          });
    };

    const findAllUsers = async (req, res) => {

        pool.query('SELECT * FROM account', (err, results) => {
            if (err) {
              console.error('Error fetching users:', err);
              res.status(500).json({ error: 'Failed to fetch users' });
            } else {
              res.json(results);
            }
          });
    };


    app.post("/api/users/login", login);
    app.post("/api/users/logout", logout);
    app.post("/api/users/register", register);
    app.post("/api/users/profile", profile);

    app.get("/api/users/profile/:username", findProfileByUsername);
    app.get("/api/users/all", findAllUsers);

    app.put("/api/users/:username", updateUser);


};
export default UserController;