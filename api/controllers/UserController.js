/*---------------------
	:: User 
	-> controller
---------------------*/

var bcrypt = require('bcrypt');

var UserController = {

	// To trigger this action locally, visit: `http://localhost:port/user/create`
	create: function (req,res) {
            
        //FIXME: are params normalized to always be on query? Or will we need to parse this as json?
        if(!req.query.emailAddress || !req.query.password){
            res.send("Please specify an email address and password",400);
        }else{
            // This will render the view: /home/jbeard4/workspace/testProject/views/user/create.ejs
            console.log(req);

            //encrypt the password with bcrypt
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.query.password, salt, function(err, hash) {
                    delete req.query.password;
                    req.query.hashedPassword = hash;
                    console.log('hashedPassword',req.query.hashedPassword);
                    User.create(req.query).done(function(err,user){
                        // Error handling
                        if (err || !user) {
                            console.log(err);
                            res.send(err && err.message,500);
                        }else {
                            // The User was created successfully!
                            console.log("User created:", user);
                            res.send(user.value,200);
                        }
                    });
                });
            });

        }

	}

};
module.exports = UserController;
