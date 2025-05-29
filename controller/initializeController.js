import ProcessController from "./processController.js";

import { processService } from "../service/initializeService.js";

const processController = new ProcessController(processService);

export { processController };