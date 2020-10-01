"use strict";
const db = require("./conn");
const bcrypt = require('bcryptjs');




class UsersModel {
    constructor(id, first_name, last_name, email, password, handle, user_name) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.handle = handle;
        this.prof_photo = prof_photo; 
        this.user_name = user_name;
    }
    // Private (instance) Method to Check Password Validity
    async checkPassword(hashedPassword) {
        // Returns true or false
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    async signup() {
        try {
            const response = await db.one(`INSERT INTO users (first_name, last_name, email, password, handle, prof_photo, user_name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`, [this.first_name, this.last_name, this.email, this.password, this.handle, this.prof_photo, this.user_name]);
            console.log("User was created with ID:", response.id);
            return response;
        } catch(error) {
            console.error("ERROR: ", error.message);
            return error.message;
        }
    }


    async login() {
        try {
            const response = await db.one(`SELECT id, user_name, email, password FROM users WHERE user_name = $1;`, [this.user_name]);
            const isValid = await this.checkPassword(response.password);
            console.log(response);
            if (!!isValid) {
                // (!!IsValid) = if (isValid === absolutely, completely, 100% TRUE)
                const { user_name, id  } = response;
                console.log("This is response: ", response);
                return { isValid, user_name, user_id: id}
            } else {
                return { isValid }
            }
        } catch (error) {
            console.error("ERROR:", error.message);
            return error.message;
        }
    }

    static async profile(id) {
        try {
            const response = await db.one(`SELECT * FROM users WHERE id = ${id}`);
            console.log("PROFILES RESPONSE IS", response);
            return response;
        } catch(error) {
            console.error("ERROR: ", error.message);
            return error.message;
        }
    }
}

module.exports = UsersModel;