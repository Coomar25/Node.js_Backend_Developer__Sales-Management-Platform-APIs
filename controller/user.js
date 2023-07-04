import db from '../model/dbmodel.js'

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

