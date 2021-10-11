'use strict'
import { Model, Sequelize, DataTypes } from 'sequelize';

export default class Test extends Model {
    id: Number
    firstName: String
    secondName: String
    dob: Date
    email: String

}
export const UserMap = (sequelize:Sequelize) => {
    Test.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING(255)
        },
        secondName: {
            type: DataTypes.STRING(255)
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255)
        }

    }, {
        sequelize, 
        tableName:'test',
        timestamps: false
    });
    Test.sync();
}

