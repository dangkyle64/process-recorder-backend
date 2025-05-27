import { beforeAll, afterAll, test, expect, describe } from 'vitest';
import { Sequelize } from 'sequelize';
import defineProcessModel from '../../models/Process.js';

let sequelize;
let Process;

beforeAll(async () => {
    sequelize = new Sequelize('sqlite::memory:', { logging: false });
    Process = defineProcessModel(sequelize);
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();    
});

describe('Process - Happy Path', () => {
    test('creates a process with steps', async () => {
        const process = await Process.create({
            name: 'Onboarding',
            steps: [
                { id: 'step1', name: 'Start', order: 100 },
                { id: 'step2', name: 'Profile Setup', order: 200 }
            ]
        });

        expect(process.name).toBe('Onboarding');
        expect(process.steps.length).toBe(2);
        expect(process.steps[0].name).toBe('Start');
        expect(process.steps[1].order).toBe(200);
    });

    test('retrieves a process from DB', async () => {
        await Process.create({
            name: 'Signup Flow',
            steps: [{ id: 'step1', name: 'Intro', order: 100 }]
        });

        const process = await Process.findOne({ where: { name: 'Signup Flow' } });
        expect(process).not.toBeNull();
        expect(process.steps[0].id).toBe('step1');
    });

    test('updates a process and its steps', async () => {
        const process = await Process.create({
            name: 'Update Test',
            steps: [{ id: 'step1', name: 'Step One', order: 100 }]
        });

        process.steps.push({ id: 'step2', name: 'Step Two', order: 200 });
        process.changed('steps', true);
        await process.save();

        const updated = await Process.findByPk(process.id);
        expect(updated.steps.length).toBe(2);
        expect(updated.steps[1].name).toBe('Step Two');
    });
});

describe('Process - Edge Cases', () => {
    test('creates a process with an empty string as name', async () => {
        try {
            await Process.create({ name: '', steps: [] });
        } catch (err) {
            expect(err).toBeTruthy();
            expect(err.name).toBe('SequelizeValidationError');
        }
    });

    test('creates a process with a large number of steps', async () => {
        const largeSteps = Array.from({ length: 1000 }, (_, i) => ({
            id: `step${i + 1}`,
            name: `Step ${i + 1}`,
            order: (i + 1) * 10
        }));

        const process = await Process.create({
            name: 'Large Process',
            steps: largeSteps
        });

        expect(process.steps.length).toBe(1000);
        expect(process.steps[999].name).toBe('Step 1000');
    });

    test('creates a process with duplicate step IDs', async () => {
        const process = await Process.create({
            name: 'Duplicate IDs',
            steps: [
                { id: 'dup', name: 'Step A', order: 100 },
                { id: 'dup', name: 'Step B', order: 200 }
            ]
        });

        expect(process.steps.length).toBe(2);
        // This passes because Sequelize/DB doesn't validate uniqueness inside JSON.
        expect(process.steps[0].id).toBe('dup');
    });

    test('creates a process with unordered step values', async () => {
        const process = await Process.create({
            name: 'Unordered Steps',
            steps: [
                { id: 'step3', name: 'Third', order: 300 },
                { id: 'step1', name: 'First', order: 100 },
                { id: 'step2', name: 'Second', order: 200 }
            ]
        });

        expect(process.steps[0].order).toBe(300);
    });

    test('creates a process with missing step fields', async () => {
        const process = await Process.create({
            name: 'Incomplete Steps',
            steps: [
                { id: 'step1', name: 'Valid' },
                { id: 'step2' }
            ]
        });

        expect(process.steps.length).toBe(2);
        expect(process.steps[1].name).toBeUndefined(); // JSON doesn't enforce shape
    });
});

