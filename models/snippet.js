/*Model for the table holding all snippets including their time created, importance, deadline and 
completed.  This will be joined to the category table to order all the snippets by category*/


/*=================================SNIPPETS TABLE MODEL=============================================*/

module.exports = function(sequelize, DataTypes){
var Snippets = sequelize.define('snippets', {
	//user_id joins users to snippets
	user_id: {
		type: DataTypes.INTEGER
	},
	//category_id joins snippets to categories
	category_id: {
		type: DataTypes.INTEGER
	},
	//the users snippet text 
	snippet: {
		type: DataTypes.TEXT
	},
	//the importance from 1-5
	importance: {
		type: DataTypes.INTEGER,
		//validate the importance level is between 1-5
		validate: {
			len: [1, 5]
		}
	},
	/*time: {
		type: DataTypes.DATE,
		allowNull: true,
		defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
	},
	deadline: {
		type: DataTypes.DATE,
		allowNull: true
	},*/
	//user_id joins the two tables together
	//if task is completed
	completed: {
		type: DataTypes.BOOLEAN,
		defaultValue: 0
	},
}, {
	classMethods: {
			associate: function(models){
				Snippets.belongsTo(models.Users, {
					foreignKey: 'user_id'
				});
				Snippets.belongsTo(models.Categories, {
					foreignKey: 'category_id'
				});
			}
		}
	},

	{
	/*!!!!!!once we are finished with testing we will remove this and time because we can use createdAt*/
	timestamps: false
});
return Snippets;
};

/*=================================END SNIPPETS TABLE MODEL=============================================*/