import { useState } from 'react';
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Icon, Input } from '@chakra-ui/react';
import { HiPencil } from 'react-icons/hi';
import { useTasks } from '../../context/taskContext';
import { Task } from './list-cards';

interface UpdateButtonProps {
    task: Task;
}

export const UpdateButton = ({ task }: UpdateButtonProps) => {
    const { updateTask } = useTasks();
    const [open, setOpen] = useState(false);
    const [updatedTask, setUpdatedTask] = useState<Task>(task);

    const handleUpdate = async () => {
        await updateTask(updatedTask);
        setOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedTask({ ...updatedTask, [name]: value });
    };

    return (
        <DialogRoot
            placement={"center"}
            motionPreset="slide-in-bottom"
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
        >
            <DialogTrigger asChild>
                <Button variant="outline"
                    colorScheme="blue"
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    <Icon fontSize="2xl" color="white">
                        <HiPencil />
                    </Icon>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Update Task
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Input
                        placeholder="Title"
                        name="title"
                        value={updatedTask.title}
                        onChange={handleChange}
                        mb={4}
                    />
                    <Input
                        placeholder="Description"
                        name="description"
                        value={updatedTask.description}
                        onChange={handleChange}
                        mb={4}
                    />
                    <Input
                        type="checkbox"
                        name="completed"
                        value={updatedTask.completed.toString()}
                        onChange={handleChange}
                        mb={4}
                    />
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline"
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        >Cancel</Button>
                    </DialogActionTrigger>
                    <Button
                        className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
                        onClick={handleUpdate}
                    >
                        Update
                    </Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    );
};
