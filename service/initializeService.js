import db from "../db/initializeSequelize.js";

import ProcessService from './processService.js';

import { initializeModels } from "../models/initializeModels.js";

const { Process } = initializeModels(db.getSequelize());

async function syncModels() {
    try {
        await Process.sync();
        console.log('KemonoUrl model sync-ed in database');
    } catch(error) {
        console.error('Error sync-ing the KemonoUrl model', error);
        return;
    };
};

syncModels();

const processService = new ProcessService(Process);

export { processService };
