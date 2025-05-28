import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ProcessService from '../../service/processService';

describe('ProcessService', () => {
    let mockProcessModel;
    let service;
    let consoleErrorMock;

    beforeEach(() => {
        mockProcessModel = {
            findAll: vi.fn(),
            findOne: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            destroy: vi.fn(),
        };

        service = new ProcessService(mockProcessModel);

        consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorMock.mockRestore();
    });

    describe('getAll', () => {
        it('should return all processes', async () => {
            const mockData = [{ id: 1 }, { id: 2 }];
            mockProcessModel.findAll.mockResolvedValue(mockData);

            const result = await service.getAll();
            expect(result).toEqual(mockData);
            expect(mockProcessModel.findAll).toHaveBeenCalledOnce();
        });

        it('should handle errors', async () => {
            mockProcessModel.findAll.mockRejectedValue(new Error('DB Error'));
            const result = await service.getAll();
            expect(result).toBeUndefined();
        });
    });

    describe('findOne', () => {
        it('should return the process by id', async () => {
            const process = { id: 1 };
            mockProcessModel.findOne.mockResolvedValue(process);

            const result = await service.findOne(1);
            expect(result).toEqual(process);
            expect(mockProcessModel.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });

        it('should handle errors', async () => {
            mockProcessModel.findOne.mockRejectedValue(new Error('Error'));
            const result = await service.findOne(1);
            expect(result).toBeUndefined();
        });
    });

    describe('createData', () => {
        it('should create a new process', async () => {
            const inputData = { name: 'Test' };
            const mockCreated = { id: 1, name: 'Test' };
            mockProcessModel.create.mockResolvedValue(mockCreated);

            const result = await service.createData(inputData);
            expect(result).toEqual(mockCreated);
            expect(mockProcessModel.create).toHaveBeenCalledWith(inputData);
        });

        it('should handle errors', async () => {
            mockProcessModel.create.mockRejectedValue(new Error('Create failed'));
            const result = await service.createData({ name: 'Fail' });
            expect(result).toBeUndefined();
        });
    });

    describe('updateData', () => {
        it('should update an existing process', async () => {
            const updated = { id: 1, name: 'Updated' };
            mockProcessModel.update.mockResolvedValue([1, [updated]]);

            const result = await service.updateData(1, { name: 'Updated' });
            expect(result).toEqual(updated);
            expect(mockProcessModel.update).toHaveBeenCalledWith(
                { name: 'Updated' },
                { where: { id: 1 }, returning: true }
            );
        });

        it('should return undefined if no rows are updated', async () => {
            mockProcessModel.update.mockResolvedValue([0, []]);

            const result = await service.updateData(1, {});
            expect(result).toBeUndefined();
        });

        it('should handle errors', async () => {
            mockProcessModel.update.mockRejectedValue(new Error('Update error'));
            const result = await service.updateData(1, {});
            expect(result).toBeUndefined();
        });
    });

    describe('deleteData', () => {
        it('should delete a process by id', async () => {
            mockProcessModel.destroy.mockResolvedValue(1);

            await service.deleteData(1);
            expect(mockProcessModel.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
        });

        it('should handle errors', async () => {
            mockProcessModel.destroy.mockRejectedValue(new Error('Delete error'));
            const result = await service.deleteData(999);
            expect(result).toBeUndefined();
        });
    });
});
