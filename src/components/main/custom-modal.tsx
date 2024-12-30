import { useState } from "react";
import { Button, HStack, Input, Stack, Text } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useTasks } from "../../context/taskContext";
import { OmitIdTask } from "./list-cards";
import { Switch } from "../ui/switch";
// import { Checkbox } from '../ui/checkbox';

export const CustomModal = () => {

    const [open, setOpen] = useState(false);

    const { addTask } = useTasks();
    const [newTask, setNewTask] = useState<OmitIdTask>({ title: "", description: "", completed: false });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleSave = async () => {
        console.log({ newTask });
        await addTask(newTask);
        setNewTask({ title: "", description: "", completed: false });
        setOpen(false);
    };

    // const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, checked } = e.target;
    //     setNewTask({ ...newTask, [name]: checked });
    // }

    return (
        <HStack wrap="wrap" gap="4">
            <DialogRoot
                placement={"center"}
                motionPreset="slide-in-bottom"
                open={open}
                onOpenChange={(e) => setOpen(e.open)}
            >
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm"
                        colorScheme="blue"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Agregar Tarea
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Agregar Tarea</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <Stack gap="4">
                            <Field label="Title">
                                <Input
                                    placeholder="Title"
                                    name="title"
                                    value={newTask.title}
                                    onChange={handleChange}
                                />
                            </Field>
                            <Field label="Description">
                                <Input
                                    placeholder="Description"
                                    name="description"
                                    value={newTask.description}
                                    onChange={handleChange}
                                />
                            </Field>
                            <Stack align="flex-start" flex="1">
                                <Text>Completed</Text>
                                <Switch
                                    name="completed"
                                    checked={newTask.completed}
                                    onCheckedChange={(e) => setNewTask({ ...newTask, completed: e.checked })}
                                >
                                    {newTask.completed ? "Yes" : "No"}
                                </Switch>
                                {/* <Checkbox
                                    variant="solid"
                                    colorScheme="blue"
                                    name="completed"
                                    value={newTask.completed.toString()}
                                    inputProps={{
                                        onChange: handleCheckbox,
                                    }}
                                    className="text-blue-500 "
                                    size={"md"}
                                >
                                    {newTask.completed ? "Yes" : "No"}
                                </Checkbox> */}
                            </Stack>
                        </Stack>
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button variant="outline"
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >Cancel</Button>
                        </DialogActionTrigger>
                        <Button onClick={handleSave}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >Save</Button>
                    </DialogFooter>
                    <DialogCloseTrigger />
                </DialogContent>
            </DialogRoot>
        </HStack>
    );
};
