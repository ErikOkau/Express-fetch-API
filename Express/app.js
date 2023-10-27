const express = require("express");
const path = require("path");
const axios = require("axios"); // Import the axios library

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "users.html"));
});

async function getUsers(request, response) {
    let results = request.query.results || 10;
    let nat = request.query.nat || "";
    let gender = request.query.gender || ""

    const baseURL = "https://randomuser.me/api/?";
    const queryParams = new URLSearchParams({
        results: results,
        nat: nat,
        gender: gender,
    });

    try {
        const url = baseURL + queryParams;
        const axios_response = await axios.get(url)
        const users = axios_response.data.results;
        console.log(users);
        response.send(users);
    } catch (error) {
        console.error("Error fetching users:", error);
       response.status(500).send("Server error")
    }
}

app.get("/users", getUsers)

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
})
