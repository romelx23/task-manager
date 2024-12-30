import { createContext, useContext, useState, useEffect, FC } from 'react';
import taskApi from '../../api/taskApi';
import { OmitIdTask, Task } from '../components/main/list-cards';
import { toaster } from '../components/ui/toaster';
import { ITaskResponse, TaskResponse } from '../interfaces/taskResponse';

interface TaskContextProps {
    tasks: ITaskResponse[];
    title: string;
    addTask: (task: OmitIdTask) => Promise<void>;
    updateTask: (task: Task) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    fetchTasks: (page?: number, completed?: boolean) => Promise<void>;
    currentPage: number;
    totalPages: number;
    setTitle: (title: string) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

interface TaskProviderProps {
    children: React.ReactNode;
}

export const TaskProvider: FC<TaskProviderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<ITaskResponse[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [title, setTitle] = useState("");

    const fetchTasks = async (page = 1, completed?: boolean) => {
        try {
            const response = await taskApi.get<TaskResponse>(`/tasks?page=${ page }&limit=50${ completed !== undefined ? `&completed=${ completed }` : '' }`);
            setTasks(response.data.tasks);
            setCurrentPage(page);
            setTotalPages(Math.ceil(response.data.total / 50));
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async (task: OmitIdTask) => {
        try {
            const response = await taskApi.post('/tasks', task);
            setTasks([...tasks, response.data]);
            toaster.create({
                title: 'Task added', description: 'Task has been added successfully',
                type: 'success'
            });
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const updateTask = async (task: Task) => {
        try {
            const response = await taskApi.put(`/tasks/${ task.id }`, {
                title: task.title,
                description: task.description,
                completed: task.completed
            });
            setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
            toaster.create({
                title: 'Task updated', description: 'Task has been updated successfully',
                type: 'success'
            });
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            await taskApi.delete(`/tasks/${ taskId }`);
            setTasks(tasks.filter(t => t.id !== taskId));
            toaster.create({
                title: 'Task deleted', description: 'Task has been deleted successfully',
                type: 'success'
            });
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, title, addTask, updateTask, deleteTask, fetchTasks, currentPage, totalPages, setTitle }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};
