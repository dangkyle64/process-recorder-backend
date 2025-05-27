import ProcessModel from './Process.js';

export function initializeModels(sequelize) {
    const Process = ProcessModel(sequelize);

    return { Process };
};