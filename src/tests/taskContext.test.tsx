import { renderHook, act, waitFor } from '@testing-library/react';
import { TaskProvider, useTasks } from '../context/taskContext';
import { OmitIdTask } from '../components/main/list-cards';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('TaskContext', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TaskProvider>{children}</TaskProvider>
    );

    beforeEach(() => {
        mock.reset(); // Resetea los mocks antes de cada prueba
    });

    it('should fetch tasks', async () => {
        mock.onGet('/tasks?page=1&limit=50').reply(200, {
            total: 1,
            tasks: [
                {
                    id: '1',
                    title: 'Test Task',
                    description: 'Test Description',
                    completed: false,
                    createdAt: '2024-12-28T23:07:46.467Z',
                },
            ],
        });

        const { result } = renderHook(() => useTasks(), { wrapper });

        await act(async () => {
            await result.current.fetchTasks();
        });

        // Usa waitFor para esperar las actualizaciones del estado
        await waitFor(() => {
            expect(result.current.tasks).toHaveLength(1);
            expect(result.current.tasks[0].title).toBe('Test Task');
        });
    });

    it('should add a task', async () => {
        const newTask: OmitIdTask = {
            title: 'New Task',
            description: 'New Description',
            completed: false,
        };

        mock.onPost('/tasks').reply(200, {
            id: '2',
            ...newTask,
            createdAt: '2024-12-28T23:07:46.467Z',
        });

        const { result } = renderHook(() => useTasks(), { wrapper });

        await act(async () => {
            await result.current.addTask(newTask);
        });

        await waitFor(() => {
            expect(result.current.tasks).toHaveLength(1);
            expect(result.current.tasks[0].title).toBe('New Task');
        });
    });

    it('should update a task', async () => {
        const updatedTask = {
            id: '1',
            title: 'Updated Task',
            description: 'Updated Description',
            completed: true,
        };

        mock.onPut('/tasks/1').reply(200, updatedTask);

        const { result } = renderHook(() => useTasks(), { wrapper });

        await act(async () => {
            await result.current.updateTask(updatedTask);
        });

        await waitFor(() => {
            expect(result.current.tasks[0].title).toBe('Updated Task');
            expect(result.current.tasks[0].completed).toBe(true);
        });
    });

    it('should delete a task', async () => {
        mock.onDelete('/tasks/1').reply(200);

        const { result } = renderHook(() => useTasks(), { wrapper });

        await act(async () => {
            await result.current.deleteTask('1');
        });

        await waitFor(() => {
            expect(result.current.tasks).toHaveLength(0);
            expect(result.current.tasks.find(task => task.id === '1')).toBeUndefined();
        });
    });
});