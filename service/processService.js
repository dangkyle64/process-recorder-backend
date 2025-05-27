class ProcessService {
    constructor(ProcessModel) {
        this.ProcessModel = ProcessModel;
    };

    async getAllProcesses() {
        const processes = await this.ProcessModel.findAll();
        return processes;
    };
};