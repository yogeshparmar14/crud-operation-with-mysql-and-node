const { dbQuery } = require("../../db/connectiondb.js");
const createApi = async (req, res) => {
	try {
		const { name, email, phone } = req.body;
		const userExists = await dbQuery("select * from customer_data where email =?", [email]);
		if (userExists.length > 0) {
			return res.status(403).send({
				data: {},
				error: {
					email: "Email is already registered email",
				},
			});
		}
		const posted_date = new Date().getTime();
		const savedUserRowData = await dbQuery(`insert into customer_data(name ,email ,phone ,posted_date) values(?,?,?,?)`, [name, email, phone, posted_date]);
		const user = await dbQuery("select * from customer_data where id =?", [savedUserRowData.insertId]);
		const userData = user[0];
		res.status(200).send({
			message: "Signup successfully!",
			status: 200,
			data: {
				_id: userData.id,
				name: userData.name,
				email: userData.email
			},
		});
	} catch (error) {
		console.log(error);
		res.status(403).send({
			data: {},
			error: {
				message: "unable to signup",
			},
		});
	}
};

const deleteApi = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await dbQuery("delete from customer_data where email =?", [email]);
		res.status(200).send({
			message: "deleted successfully!",
			status: 200,
			data: {

			},
		});
	} catch (error) {
		res.status(403).send({
			data: {},
			error: {
				message: "unable to delete",
			},
		});
	}

}

const searchApi = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await dbQuery("select * from customer_data where email =?", [email]);
		const userData = user[0];
		res.status(200).send({
			message: "search successfully!",
			status: 200,
			data: userData
		});
	} catch (error) {
		res.status(403).send({
			data: {},
			error: {
				message: "unable to search",
			},
		});
	}

}

const listApi = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await dbQuery("select * from customer_data order by posted_date ");
		res.status(200).send({
			message: " success",
			status: 200,
			data: user
		});
	} catch (error) {
		res.status(403).send({
			data: {},
			error: {
				message: "unable to get data",
			},
		});
	}

}

module.exports = { createApi, deleteApi, searchApi, listApi };
