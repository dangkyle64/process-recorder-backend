class ProcessService {
    constructor(ProcessModel) {
        this.ProcessModel = ProcessModel;
    };

    async getAll() {
        try {
            const processes = await this.ProcessModel.findAll();
            return processes;
        } catch(error) {
            console.error('Error getting the processes in processService: ', error);
            return;
        };
    };

    async findOne(id) {
        try {
            const process = await this.ProcessModel.findOne({
                where: { id: id },
            });

            return process;
        } catch(error) {
            console.error('Error getting the process in processService: ', error);
            return;
        };
    };

    async createData(data) {
        try {
            const createdProcessData = await this.ProcessModel.create(data);
            return createdProcessData;
        } catch(error) {
            console.error('Error creating the process in processService: ', error);
            return;
        };
    };

    async updateData(id, data) {
        try {
            const [affectedRows, updatedProcesses] = await this.ProcessModel.update(data, {
                where : {id : id },
                returning: true,
                },
            );

            if (affectedRows === 0) {
                throw new Error('Process not found');
            };

            return updatedProcesses[0];
        } catch(error) {
            console.error('Error creating the process in processService: ', error);
            return;
        };
    };

    async deleteData(id) {
        try {
            await this.ProcessModel.destroy({
                where: { id: id },
            });
        } catch(error) {
            console.error('Error creating the process in processService: ', error);
            return;
        };
    };
};

export default ProcessService;