import './App.css';
import { CustomModal } from './components/main/custom-modal';
import { ListCards } from './components/main/list-cards';
import { toaster, Toaster } from './components/ui/toaster';
import { RefreshButton } from './components/main/refresh-button';
import { Button } from './components/ui/button';
import { useTasks } from './context/taskContext';
import { useState } from 'react';

function App() {
  const { fetchTasks, tasks, setTitle, title } = useTasks();

  const [showCompleted, setShowCompleted] = useState(false);

  const handleFilterCompleted = async () => {
    setShowCompleted(!showCompleted);
    if (showCompleted) {
      setTitle('Tareas Completadas');
      toaster.create({
        title: 'Tareas Completadas',
        description: 'Se están mostrando las tareas completadas',
        type: 'info'
      });
    } else {
      setTitle('Tareas Sin Completar');
      toaster.create({
        title: 'Tareas Sin Completar',
        description: 'Se están mostrando las tareas sin completar',
        type: 'info'
      });
    }
    await fetchTasks(1, showCompleted);
  };

  return (
    <>
      <div className='flex flex-col items-center w-full h-screen bg-salte-500 text-white p-4'>
        <div className="w-full flex flex-wrap justify-between items-center">
          <span className='text-2xl'>
            Listado de Tareas
          </span>
          <div className="flex items-center gap-4 md:flex-row flex-col">
            <span
              className="text-white text-sm"
            >
              {
                title
              }
              <span
                className='font-bold mx-1'
              >
                {tasks.length}
              </span>
              tareas
            </span>
            <div className="flex flex-wrap gap-4">
              <CustomModal />
              <RefreshButton />
              <Button
                variant="outline"
                colorScheme="blue"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleFilterCompleted}
              >
                {
                  showCompleted ? 'Completed' : 'Not Completed'
                }
              </Button>
            </div>
          </div>
        </div>
        <ListCards />
      </div>
      <Toaster />
    </>
  );
}

export default App;
