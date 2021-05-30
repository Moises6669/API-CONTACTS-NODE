const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
const Contact = require("./contact.model");
class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The field cannot be null",
        },
        len: {
          args: [3, 255],
          msg: "The name must be between 3 and 255 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "The field has to be a valid email",
        },
        notEmpty: {
          args: true,
          msg: "Email-id required",
        },
      },
      unique: {
        args: true,
        msg: "Email address already in use!",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Users",
    timestamps: true,
  }
);

//method to not return the password
User.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

User.hasMany(Contact, { as: "contactos", foreignKey: "userId" });
Contact.belongsTo(User, { as: "autorUser", foreignKey: "userId" });

module.exports = User;
