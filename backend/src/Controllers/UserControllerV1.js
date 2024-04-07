import { Op } from 'sequelize';
import UsersModel from '../Model/Sequelize/Users';
import { genPassword, validPassword } from '../Utils/auth';
import { issueJWT } from '../Utils/token';

const exports = {
  UserListing: async (req, res) => {
    UsersModel.findAll({
      attributes: ['uid', 'fullname', 'username', 'email', 'role', 'photo'],
      order: [['username', 'ASC']],
    })
      .then((rawData) => rawData.map((r) => r.toJSON()))
      .then((usersList) => {
        res.status(200).send({
          success: true,
          message: 'User Listing successfully.',
          body: usersList,
          total: usersList.length,
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: 'Error occurred while Fetching the user details',
          details: err,
        });
      });
  },
  RegisterUser: async (req, res) => {
    UsersModel.count({
      where: {
        [Op.or]: [{ email: req.body.email }, { username: req.body.username }],
      },
    })
      .then((count) => {
        if (count > 0) {
          // Email or username already exists
          return res.status(400).json({ success: false, message: 'Email or username already exists.' });
        } else {
          const saltHash = genPassword(req.body.password);

          const passwordSalt = saltHash.salt;
          const passwordHash = saltHash.hash;

          UsersModel.create({
            username: req.body.username,
            fullname: req.body.fullname,
            email: req.body.email,
            pwd_salt: passwordSalt,
            pwd_hash: passwordHash,
            roles: req.body.role,
            photo: req.body.photo,
            is_active: req.body.isActive,
          })
            .then((newUser) => {
              if (newUser) {
                return res
                  .status(201)
                  .json({ success: true, message: 'User created successfully.', user: newUser.toJSON() });
              }
            })
            .catch((err) => {
              console.error(err);
              return res
                .status(500)
                .json({ success: false, message: 'Error occurred while creating the user.', error: err });
            });
        }
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error occurred while creating the user.', error: err });
      });
  },
  UserLogin: async (req, res) => {
    UsersModel.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ success: false, msg: 'Could not find user' });
        }

        const isValid = validPassword(req.body.password, user.pwd_hash, user.pwd_salt);

        if (isValid) {
          const tokenObject = issueJWT(user);

          res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
        } else {
          res.status(401).json({ success: false, msg: 'You entered the wrong password' });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error occurred while checking the username', error: err });
      });
  },
};

module.exports = exports;
