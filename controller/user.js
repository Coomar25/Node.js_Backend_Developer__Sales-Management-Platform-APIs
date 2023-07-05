import db from '../model/dbmodel.js'
export const secretKey = "secretKey";
import jwt from 'jsonwebtoken';

export const registerUser = (req, res) => {
    const { username, email, password, confirmpassword } = req.body;

    if (!username || !email || !password || !confirmpassword) {
        return res.status(400).send({ error: "Seems like some fields are empty! Provide all field intel." });
    }

    if (password !== confirmpassword) {
        return res.status(400).send({ error: "Password and confirm password do not match." });
    }

    const sqlInsert = "INSERT INTO userinfo(username, email, password) VALUES (?, ?, ?)";
    db.promise()
        .execute(sqlInsert, [username, email, password])
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(500).send({ error: "An error occurred while inserting the user's data." });
        });
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






