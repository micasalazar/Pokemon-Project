const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,     
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hp:{
      type: DataTypes.INTEGER
    },
    attack:{
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    speed:{
      type: DataTypes.INTEGER
    },
    height:{
      type: DataTypes.INTEGER
    },
    weight:{
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpp8wG9nUAEpde2lHMEiTpQq_p6uQroXucUa6W-eKgXDSF_xA_KLQqN0ZpSd_cA1Fbd1U&usqp=CAU",
      
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
        
  });
};

