'use strict'
import { Model, Sequelize, DataTypes } from 'sequelize';

export default class Test extends Model {
    id: Number
    first_name: String
    last_name: String
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
        first_name: {
            type: DataTypes.STRING(60)
        },
        last_name: {
            type: DataTypes.STRING(60)
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(60)
        }

    }, {
        sequelize, 
        tableName:'test',
        timestamps: false
    });
    Test.sync();
}

