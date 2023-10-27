import { db } from "../db.js"
import jwt from "jsonwebtoken"

export const getPosts = (req, res) => {
    const q = req.query.cat
        ? "SELECT * FROM posts WHERE cat=?"
        : "SELECT * FROM posts";
    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).send(err);
        if (data) {
            res.status(200).json(data);
        }
    })
}

export const getPost = (req, res) => {
    const q = "SELECT p.`id`, u.`username`, p.`title`, p.`desc`, p.`img`, u.`img` AS userImg, p.`cat`, p.`date` FROM `users` u JOIN `posts` p ON u.`id` = p.`uid` WHERE p.`id` = ?;"

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).send(err)
        if (data) {
            return res.status(200).json(data[0])
        }
    })
}

export const addPost = (req, res) => {

}

export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).josn("Not Authenticated!");

    jwt.verify(token, "jwtKey", (err, userInfo) => {
        if (err) return res.status(403).send("Token is invalid")
        const postID = req.params.id;
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"

        db.query(q, [postID, userInfo.id], (err, data) => {
            if (err) return res.status(500).json("You can only delete your Post!")
            if (data) {
                return res.status(200).json("Your post has been deleted!")
            }
        })
    })
}

export const updatePost = (req, res) => {

}
