const Users = require('../../models/user.model');
const bcrypt = require('bcrypt');

exports.LoginUserPost = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(404).json({
            message: 'username and password are needed!',
        });
    } else {
        const email = req.body.email;
        const password = req.body.password;

        const user = Users.findOne({where:{email:email}})
            .then(dbuser => {
                if (!dbuser) {
                    return res.status(401).json({ error: 'User does not exist.' });
                }
        
                if (!bcrypt.compareSync(password, dbuser.password)) {
                    return res.status(401).json({ error: 'Invalid password.' });
                }
        
                return res.status(200).json({
                    ok:true,
                    dbuser
                })
            })
    }
}