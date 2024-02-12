import axios from "axios";
import { useState } from "react";
const baseUrl = 'http://localhost:3000';

export function Todo() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState<{ id: number, todo: string }[]>([]);

    const handleState = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val: string = e.target.value;
        setTodo(val);
    };

    const addTodo = async () => {
        if (todo.trim() !== "") {
            const newTodoId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

            setTodos([...todos, { id: newTodoId, todo }]);
            setTodo("");

            try {
                const res = await axios.post(baseUrl, { id: newTodoId, todo });
                console.log(res.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const updateTodo = (index: number) => async () => {
        try {
            const updatedTodo = prompt("Enter the updated todo:");
            if (updatedTodo !== null) {
                const newTodos = [...todos];
                newTodos[index] = { ...newTodos[index], todo: updatedTodo };
                setTodos(newTodos);

                // Send the updated todo to the server
                const res = await axios.put(`${baseUrl}/${todos[index].id}`, { todo: updatedTodo });
                console.log(res.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteTodo = (index: number) => async () => {
        try {
            const newTodos = todos.filter((_, i) => i !== index);
            setTodos(newTodos);

            // Send a request to the server to delete the todo
            const res = await axios.delete(`${baseUrl}/${todos[index].id}`);
            console.log(res.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="flex flex-col h-[60px] w-[100%] items-center justify-center gap-2 mt-5">
                <div className="flex flex-row gap-5 p-5 border-2 border-gray-300 rounded-md justify-center items-center mt-10">
                    <div>
                        <input
                            className="w-[400px] p-[5px] border-2 border-gray-300 rounded-md text-lg"
                            type="text"
                            placeholder="add your todo here"
                            name="todo"
                            value={todo}
                            onChange={handleState}
                        />
                    </div>
                    <div>
                        <button
                            className="bg-gray-300 rounded-md p-[5px] text-lg"
                            onClick={addTodo}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1 mt-12 justify-center items-center">
                {todos.map((item, index) => (
                    <div
                        className="border-2 border-gray-300 p-3 rounded-md m-3 w-[35%] text-center text-white text-lg flex flex-row justify-between items-center"
                        key={index}
                    >
                        {item.todo}
                        <div className="flex justify-between gap-3">
                            <button
                                className="bg-yellow-600 border-2 border-gray-300 p-[5px] rounded-md"
                                onClick={updateTodo(index)}
                            >
                                Update
                            </button>
                            <button
                                className="bg-red-700 border-2 border-gray-300 p-[5px] rounded-md"
                                onClick={deleteTodo(index)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
