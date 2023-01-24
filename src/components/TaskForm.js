import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

import { addTask, editTask } from "../features/tasks/taskSlice";

function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    if (id) {
      const task = tasks.find((task) => task.id === id);
      setTask(task);
    }
  }, [id, tasks]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      dispatch(editTask(task));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
      <label htmlFor="title" className="block text-xs font-bold mb-2">Task:</label>
      <input
        id="title"
        type="text"
        name="title"
        placeholder="title"
        onChange={handleChange}
        defaultValue={task.title}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />

      <label htmlFor="description" className="block text-xs font-bold mb-2">Description:</label>
      <textarea
        id="description"
        name="description"
        onChange={handleChange}
        placeholder="description"
        defaultValue={task.description}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      ></textarea>

      <button type="submit" className="bg-indigo-600 px-2 py-1">Save</button>
    </form>
  );
}

export default TaskForm;
