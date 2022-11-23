const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/mysql.connection");
const Contact = require("./contact.model");
class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El nombre de usuario es requerido",
        },
        len: {
          args: [3, 255],
          msg: "El nombre de usuario debe tener como minimo 3 letras",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "El correo electronico es requerido",
        },
        notEmpty: {
          args: true,
          msg: "El correo electronico es requerido",
        },
      },
      unique: {
        args: true,
        msg: "Ya existe una cuenta con este correo electronico",
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

User.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

User.hasMany(Contact, { as: "contactos", foreignKey: "userId" });
Contact.belongsTo(User, { as: "autorUser", foreignKey: "userId" });

module.exports = User;
