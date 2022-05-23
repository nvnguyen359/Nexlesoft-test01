const models = require("../models/index");

/**
 * @param {any} _tableName
 *  @param {any} knex
 * khởi tạo service với knex 
 */
class Service {
	constructor(_tableName, knex) {
		if (!knex) {
			this.knex = models.knex;
		}
		this._tableName = _tableName;
	}
	/**
	 * @param {any} _tableName
	 */
	set tableName(_tableName) {
		this._tableName = _tableName;
	}
	get tableName() {
		return this._tableName;
	}
	convertResult(_rows) {
		const dt = Object.values(JSON.parse(JSON.stringify(_rows)));
		return dt.length > 0 ? (dt.length == 1 ? dt[0] : dt) : null;
	}
	async create(obj, _tableName) {
		try {
			if (!_tableName) {
				// eslint-disable-next-line no-undef
				_tableName = this.tableName;
			}
			if (!obj.createdAt) {
				obj.createdAt = new Date();
			}
			if (!obj.updatedAt) {
				obj.updatedAt = new Date();
			}
			return await this.knex(_tableName).insert(obj);
		} catch (error) {
			console.log(error.message);
		}
	}
	async update(obj, _tableName) {
		try {
			if (typeof obj === "string") {
				return "obj is string";
			}
			if (!_tableName) {
				// eslint-disable-next-line no-undef
				_tableName = this.tableName;
			}

			obj.updatedAt = new Date();
			const id1 = obj.id || obj.ID || obj.Id;
			// eslint-disable-next-line no-unused-vars
			const { id, createdAt, ...objNotId } = obj;

			for (let key in objNotId) {
				try {
					let o = {};
					o[key] = objNotId[key];
					if (key == "updatedAt") {
						o[key] = new Date(objNotId[key]);
					}
					await this.knex(_tableName).update(o).where({ id: id1 });
				} catch (error) {
					console.log(error.message);
				}
			}
			return obj;
		} catch (error) {
			console.log(error.message);
		}
	}
	async upset(obj, _tableName) {
		const id = obj.id || obj.ID || obj.Id;
		const result = id ? await this.update(obj, _tableName) : await this.create(obj, _tableName);
		return result;
	}
	async getEmail(email, _tableName) {
		try {
			if (typeof email === "string") {
				email = { email };
			}
			if (!_tableName) {
				// eslint-disable-next-line no-undef
				_tableName = this.tableName;
			}
			const resultArray = await this.knex(this.tableName).where(email);
			return this.convertResult(resultArray);
		} catch (error) {
			console.log("getEmail", error.message);
		}
	}
	async deleteId(obj, _tableName) {
		try {
			if (!_tableName) {
				// eslint-disable-next-line no-undef
				_tableName = this.tableName;
			}
			if (typeof obj === "string") {
				return await this.knex(_tableName).where({ id: obj }).del();
			} else {
				const resultArray = await this.knex(_tableName).where(obj).del();
				return resultArray;
			}

		} catch (error) {
			return error.message;
		}
	}
	async getAll(obj, _tableName) {
		try {
			if (!_tableName) {
				// eslint-disable-next-line no-undef
				_tableName = this.tableName;
			}
			//console.log("getAll", obj);
			const resultArray = await this.knex(_tableName).where(obj).select("*");
			return this.convertResult(resultArray);
		} catch (error) {
			console.log("getAll", error.message);
			return error.message;
		}
	}
	/**
	 * 
	 * @param {*} obj 
	 * @param {*} _tableName 
	 * @returns 
	 * Login với email và password
	 * obj {email,password}
	 *  _tableName =users 
	 */
	async getUser(obj, _tableName) {
		try {
			if (!_tableName) {
				// eslint-disable-next-line no-undef
				_tableName = this.tableName;
			}
			let user = await this.knex(this.tableName).where({ email: obj.email });
			user = this.convertResult(user);
			return user;
		} catch (error) {
			return error.message;
		}
	}

}
module.exports = { Service };