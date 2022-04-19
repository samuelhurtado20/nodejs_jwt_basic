import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.listen(8020, () =>
{
    console.log("On port 8020");
});

app.get('/getToken', (req, res) =>
{
    const user = 
    {
        id: 1,
        name: "Samuel",
        email: "Hurtado@gmail.com"
    };

    jwt.sign({user}, 'secretkey', {expiresIn: '30s'}, (err, token) =>
    {
        res.json({token: token});
    })
});

app.post('/checkToken', VerifyToken, (req, res) => 
{ 
    jwt.verify(req.token, 'secretkey', (err, authData) =>
    {
        if(err)
        {
            res.sendStatus(403);
        }
        else
        {
            res.json({
                messaje: "Seccess",
                authData
            });
        }
    })
});

function VerifyToken(req, res, next)
{
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined')
    {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }
    else
    {
        res.sendStatus(403);
    }
}