import db from '../model/dbmodel.js'
export const secretKey = "secretKey";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';



export const home = (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(__dirname, '..', 'view', 'home.html');
    res.sendFile(filePath);
};

export const registerUser = async (req, res) => {
    const { username, email, password, confirmpassword } = req.body;

    if (!username || !email || !password || !confirmpassword) {
        return res.status(400).send({ error: "Seems like some fields are empty! Provide all field intel." });
    }

    if (password !== confirmpassword) {
        return res.status(400).send({ error: "Password and confirm password do not match." });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sqlInsert = "INSERT INTO userinfo(username, email, password) VALUES (?, ?, ?)";
        db.promise()
            .execute(sqlInsert, [username, email, hashedPassword])
            .then((result) => {
                res.status(200).json({
                    message: "User has been registered successfully",
                    result: result
                });
            })
            .catch((error) => {
                res.status(500).send({ error: "An error occurred while inserting the user's data." });
            });
    } catch (error) {
        res.status(500).send({ error: "An error occurred while encrypting the password." });
    }
};



export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const sqlSelect = "SELECT * FROM userinfo WHERE username = ? AND password = ?";
    try {
        const [rows] = await db.promise().execute(sqlSelect, [username, password]);
        if (rows.length === 0) {
            throw new Error("Invalid username or password.");
        }
        jwt.sign({ username }, secretKey, { expiresIn: '900s' }, (error, token) => {
            if (error) {
                throw new Error("Failed in token generation");
            }
            res.status(200).send({ message: "Login successful.", token });
        });
    } catch (error) {
        res.status(401).send({ error: "Exception Occcured" });
    }
};


export const testJWtAuthorization = (req, res) => {
    res.send({
        message: "This is from controller response",
    });
}


export const getalluser = (req, res) => {
    const getUser = 'SELECT * from userinfo';
    db.query(getUser, (error, result) => {
        if (error)
            res.status(500).json({ error: "Could not fetch all data! Some error occured" });
        else {
            res.json(result);
        }
    });
}


export const updateUser = (req, res) => {
    const { username, email, password } = req.body;
    const id = req.params.id;
    if (!username || !email || !password || !id) {
        return res.status(400).send({ error: "Please provide all required fields" });
    }
    const sqlUpdate = "UPDATE userinfo SET username = ?, email = ?, password = ? WHERE id = ?";
    db.query(sqlUpdate, [username, email, password, id], (error) => {
        if (error) {
            res.status(500).send({ error: "An error occurred while updating the user's data" });
        } else {
            res.status(200).send("User details updated successfully");
        }
    });
};


export const deleteUser = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: "Please provide the ID parameter" });
    }
    const sqlCheck = "SELECT * FROM userinfo WHERE id = ?";
    db.query(sqlCheck, [id], (error, result) => {
        if (error) {
            res.status(500).send({ error: "An error occurred while checking the user's data" });
        } else {
            if (result.length === 0) {
                return res.status(404).send({ error: "User not found" });
            }
            const sqlDelete = "DELETE FROM userinfo WHERE id = ?";
            db.query(sqlDelete, [id], (error) => {
                if (error) {
                    res.status(500).send({ error: "An error occurred while deleting the user's data" });
                } else {
                    res.status(200).send("User details deleted successfully");
                }
            });
        }
    });
};











