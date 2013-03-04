/*---------------------
	:: Session 
	-> controller
---------------------*/

var bcrypt = require('bcrypt');

var SessionController = {

	// To trigger this action locally, visit: `http://localhost:port/session/login`
	login: function (req,res) {

		// This will render the view: /home/jbeard4/workspace/testProject/views/session/login.ejs
		//res.view();

        // Get password and emailAddress from request
        var emailAddress = req.param('emailAddress');
        var password = req.param('password');
 
        // No emailAddress/password entered
        if(!(emailAddress && password)) {
            res.send("No emailAddress or password specified!",500);
            // TODO: redirect, storing an error in the session
        }
 
        else {
            // Lookup the emailAddress/password combination
            User.find({
                emailAddress: emailAddress
            }).done(function (err, user) {

                // Login failed, incorrect emailAddress/password combination
                if (err || !user) {
                    res.send("Invalid emailAddress",500);
                    // TODO: redirect, storing an error in the session
                }else{
                    console.log('Comparing password with hashed password',password,user.hashedPassword);
                    bcrypt.compare(password, user.hashedPassword, function(err, result) {
                        if(err){
                            res.send("Error hashing password",500);
                        }else if(!result){
                            res.send('Passwords do not match',401);         //passsords didn't match! return a 401
                        }else{
                            // Login succeeded
                            req.session.authenticated = true;
                            req.session.User = user;
         
                            // Redirect to protected area
                            //res.redirect('/dashboard');
                            res.send('You have successfully authenticated',200);         //passsords didn't match! return a 401
                        }
                    });
                }
            });
        }

	}

};
module.exports = SessionController;
