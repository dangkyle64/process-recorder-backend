import { DataTypes } from 'sequelize';

export default function (sequelize) {
    return sequelize.define('Process', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        steps: {
            type: DataTypes.JSONB,
            allowNull: false,
            default: [],
        },
    });
};