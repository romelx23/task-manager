import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Icon } from '@chakra-ui/react';
import { HiTrash } from 'react-icons/hi';
import { useTasks } from '../../context/taskContext';

interface TrashButtonProps {
  taskId: string;
}

export const TrashButton = ({ taskId }: TrashButtonProps) => {
  const { deleteTask } = useTasks();

  const handleDelete = async () => {
    await deleteTask(taskId);
  };

  return (
    <DialogRoot
      placement={"center"}
      motionPreset="slide-in-bottom"
    >
      <DialogTrigger asChild>
        <Button variant="outline"
          colorScheme="red"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <Icon fontSize="2xl" color="white">
            <HiTrash />
          </Icon>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this task?
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <span className='text-red-500'>This action cannot be undone.</span>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline"
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >Cancel</Button>
          </DialogActionTrigger>
          <Button
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
