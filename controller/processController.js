class ProcessController {
    constructor(processService) {
        this.processService = processService;
    };

    async getAllProcesses(request, response) {
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