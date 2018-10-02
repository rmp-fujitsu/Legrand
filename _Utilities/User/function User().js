function User(){
	this.title;						// user's title
	this.name;						// user's name
	this.email;						// user's email
	this.status;					// user's status
	this.language;					// user's language
	this.profile;					// user's profile
	this.receive_alert;				// is the user marked to receive alert
	this.password;					// user's password
	this.lanes = [];				// Array containing a list of lanes
	this.acceptanceLanes = [];		// 
	this.lanePools = [];			// Array containing a list of pools loaded from lanes;
	this.laneUserType;				// 
	this.authorizations = [];		// Array containing a list of authorizations
	this.updated = new Date();		// The updated date and time
	this.author = {};				// Contains the data of the user's author
	this.extension = {};			// Contains the user's extension
	this.preference = {};			// Contains the user's preference
	this.poolLinks=[];				// List of pool links
	this.projects=[];				// List of projects
	this.delegations = [];			// Contains a list of delegations
	this.representations = [];		// 
	this.metadata={};				// Contains the user's metadata
	this.preferences={};			// Contains the user's preferences
	this.oauths = [];				// Contains the user's external applications authorizations
	this.oauths2 = [];				// 
	this.accessRestrictions = [];	// List of access restrictions
	this.billingStatus;				// is the user's bill status
	this.clientLanguage;			// is the user's Client Language
	this.saveQuery = {};			// DEPRECATED
	this.published = new Date();	// The published date 
};