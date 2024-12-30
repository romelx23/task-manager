import { Card, Icon } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { HiCheck } from "react-icons/hi";
import { TrashButton } from "./trash-button";
// import { Task } from "./list-cards";
import { UpdateButton } from "./updateButton";
import { useTasks } from "../../context/taskContext";
import { ITaskResponse } from "../../interfaces/taskResponse";

export const CardComponent = ({ task }: { task: ITaskResponse }) => {
    const { updateTask } = useTasks();

    const handleToggleCompleted = async () => {

        const { createdAt, ...updatedTask } = task; // eslint-disable-line
        const taskToUpdate = { ...updatedTask, completed: !task.completed };
        await updateTask(taskToUpdate);
    };

    return (
        <Card.Root width="320px">
            <Card.Body gap="2">
                <Card.Title mt="2">{task.title || "Nue Camp"}</Card.Title>
                <Card.Description>
                    {task.description || "This is the card body. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec odio vel dui euismod fermentum."}
                </Card.Description>
                <Card.Description>
                    {task.completed ? "Completed" : "Not completed"}
                </Card.Description>
                {/* show createAt */}
                <Card.Description>
                    {
                        new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        }).format(new Date(task.createdAt))
                    }
                </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                <Button
                    variant="outline"
                    colorScheme={task.completed ? "red" : "green"}
                    className={`${ task.completed ? "bg-red-500" : "bg-green-500" } hover:bg-${ task.completed ? "red" : "green" }-700 text-white font-bold py-2 px-4 rounded`}
                    onClick={handleToggleCompleted}
                >
                    <Icon fontSize="2xl" color="white">
                        <HiCheck />
                    </Icon>
                </Button>
                <TrashButton taskId={task.id} />
                <UpdateButton task={task} />
            </Card.Footer>
        </Card.Root>
    );
};
