import { useEffect, useState } from "react";
import { CardComponent } from "./card";
import { useTasks } from "../../context/taskContext";
import { Button } from "../ui/button";

export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

export type OmitIdTask = Omit<Task, "id">;

export const ListCards = () => {
    const { fetchTasks, tasks, currentPage, totalPages } = useTasks();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTasks = async () => {
            await fetchTasks();
            setLoading(false);
        };
        loadTasks();
    }, []);

    const handlePrevPage = async () => {
        if (currentPage > 1) {
            setLoading(true);
            await fetchTasks(currentPage - 1);
            setLoading(false);
        }
    };

    const handleNextPage = async () => {
        if (currentPage < totalPages) {
            setLoading(true);
            await fetchTasks(currentPage + 1);
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-5xl py-4 px-4 flex flex-wrap items-center gap-4">
            {loading ? (
                <div className="w-full text-center">Loading tasks...</div>
            ) : tasks.length === 0 ? (
                <div className="w-full text-center">No tasks</div>
            ) : (
                tasks.map((task) => (
                    <CardComponent key={task.id} task={task} />
                ))
            )}
            <div className="flex justify-between w-full mt-4">
                <Button
                    variant="outline"
                    colorScheme="blue"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    colorScheme="blue"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};
