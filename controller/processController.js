class ProcessController {
    constructor(processService) {
        this.processService = processService;
    };

    async getAllProcesses(request, response) {
        try {
            const processes = await this.processService.getAll();
            response.status(200).json(processes);
        } catch(error) {
            console.error('Error: ', error);
            response.status(500).json({ 'message': 'Error getting the processes' });
        };
    };

    async getProcess(request, response) {

        const id = request.params.id;

        try {
            const process = await this.processService.findOne(id);
            response.status(200).json(process);
        } catch(error) {
            console.error('Error: ', error);
            response.status(500).json({ 'message': 'Error getting the process' });
        };
    };

    async createProcess(request, response) {

        const { name, steps } = request.body;

        try {
            const process = await this.processService.createData(name, steps);
            response.status(200).json(process);
        } catch(error) {
            console.error('Error: ', error);
            response.status(500).json({ 'message': 'Error getting the URLs' });
        };
    };

    async updateProcess(request, response) {
        try {
            // await processService.getAllObjects etc 
            response.status(200).json({});
        } catch(error) {
            console.error('Error: ', error);
            response.status(500).json({ 'message': 'Error getting the URLs' });
        };
    };

    async deleteProcess(request, response) {
        try {
            // await processService.getAllObjects etc 
            response.status(200).json({});
        } catch(error) {
            console.error('Error: ', error);
            response.status(500).json({ 'message': 'Error getting the URLs' });
        };
    };
};

export default ProcessController;