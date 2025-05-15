const { login } = require("../controllers/user.controller");


const delay = (req, res, next) => {
    // Simulate a delay of 2 seconds
    // if(url==login) next();
    setTimeout(() => {
        if (req.headers.authorization) {
            // Check if the token is valid
            const token = req.headers.authorization.split(' ')[1];
            // if (!token) {
            //     return res.status(401).json({ message: 'Unauthorized' });
            // }
        }
      
        next();
    }, 2000);
}
module.exports = delay;