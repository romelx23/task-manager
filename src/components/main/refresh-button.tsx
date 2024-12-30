import { Button } from "@chakra-ui/react";
import { HiRefresh } from "react-icons/hi";
import { useTasks } from "../../context/taskContext";
import { toaster } from "../ui/toaster";

export const RefreshButton = () => {
    const { fetchTasks, setTitle } = useTasks();

    const handleRefresh = async () => {
        await fetchTasks();
        setTitle('Todas las Tareas');
        toaster.create({
            title: 'Tareas actualizadas',
            description: 'Las tareas han sido actualizadas correctamente',
            type: 'success'
        });
    };

    return (
        <Button
            variant="outline"
            colorScheme="blue"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleRefresh}
        >
            <HiRefresh />
            Refresh
        </Button>
    );
};
