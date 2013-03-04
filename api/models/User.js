/*---------------------
	:: User 
	-> model
---------------------*/
module.exports = {
	
	attributes	: {

		// Simple attribute:
		// name: 'STRING',

		// Or for more flexibility:
		// phoneNumber: {
		//	type: 'STRING',
		//	defaultValue: '555-555-5555'
		// }
        name: 'STRING',
        age: 'INTEGER',
        birthDate: 'DATE',
        phoneNumber: 'STRING',
        emailAddress: 'STRING'
	}

};
