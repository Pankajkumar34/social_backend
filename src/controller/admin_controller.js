import { user_model } from "../model/user_model.js";
import bcrypt from 'bcrypt';
import TokenGenrate from "../utils/TokenGenarate.js";
export default {
    admin_create: async (req, res, next) => {
        try {
            const { name, last_name, email, password, profile_pic } = req.body;
            const is_exist_user = await user_model.findOne({ email: email })
            if (is_exist_user) return res.send({ status: false, message: "User exist" })
            // Check for required data
            if (!(name, email, password)) {
                const err = {
                    status: false,
                    statusCode: 404,
                    message: `Required data not found`
                };
                return next(err);
            }

            // Hash the password
            let hash_password;
            try {
                hash_password = await bcrypt.hash(password, 10);
            } catch (error) {
                return next(error);
            }

            // Create user with hashed password
            const created_result = await user_model.create({ name, last_name, email, password: hash_password, profile_pic: "no image" });

            if (!created_result) {
                const err = {
                    status: false,
                    statusCode: 500,
                    message: `Error creating user`
                };
                return next(err);
            } else {
                return res.status(200).json({ status: 200, message: "User created successfully", data: created_result });
            }

        } catch (error) {
            next(error);
        }
    },
    admin_login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const is_exist_user = await user_model.findOne({ email: email })
            if (!is_exist_user) return res.send({ status: false, message: "User not exist" })

            if (!(email, password)) {
                const err = {
                    status: false,
                    statusCode: 404,
                    message: `Required data not found`
                };
                return next(err);
            }
            const match_password = await bcrypt.compare(password, is_exist_user.password)
            if (!match_password) {
                const err = {
                    status: false,
                    statusCode: 404,
                    message: `invaild user`,
                };
                return next(err);
            }
            let user_login = await user_model.findOneAndUpdate({ email: email }, { is_login: 'login' });
            const token = await TokenGenrate(is_exist_user)
            const user_detail = {
                name: is_exist_user.name,
                role: is_exist_user.role,
                email: is_exist_user.email,
                token: token,
                user: user_login.is_login
            }
            if (token) {
                // Store user data in session
                req.session.user = user_detail;

            }
            return res.status(201).json({ status: true, statusCode: 201, message: "user Logged succesfully", user: user_detail })

        } catch (error) {
            next(error);
        }
    },
    logout: async (req, res, next) => {
        try {
            const { email, token } = req.body

            const find_user = await user_model.findOne({ email: email })
            if (find_user?.is_login === 'logout') return res.send({ message: "you are already logout" })
            if (!email && !token) {
                return res.send({ status: false, message: `user could not be logout ` })
            } else {
                req.session.destroy(function (err) {
                    if (err) {
                        return next(err)
                    }

                })
                if (!req.session) {
                    let user_login = await user_model.findOneAndUpdate({ email: email }, { is_login: 'logout' });
                    return res.send({ success:true, message: `user ${user_login?.name} logout` })
                }
            }
        } catch (error) {
            next(error);
        }
    },
    admin_get: async (req, res, next) => {
        try {
            const admin = await user_model.findOne({ role: 'admin' })
            if (admin) {
                return res.status(200).json({ status: true, message: "get data successfully", admin: admin })
            }

        } catch (error) {
            next(error)
        }
    },
    update_admin: async (req, res, next) => {
        const { id } = req.params
        try {
            if (id) return res.status(404).json({ status: false, message: "user not found" })
            const updated_data = await user_model.findByIdAndUpdate({ _id: id }, { name: name, last_name: last_name, profile_pic: profile_pic })
            if (!updated_data) {
                return res.send({ status: false, message: "user not updated" })
            }
            return res.status(201).json({ tatus: true, message: "user updated successfully", data: updated_data })
        } catch (error) {
            next(error)
        }
    }


};
