import { useState, useRef, useCallback } from "react";

export default function App() {
  const [tasks, setTasks] = useState([
    "Walk the dog",
    "Water the plants",
    "Wash the dishes",
  ]);
  const taskInputRef = useRef();

  const handleAddTask = useCallback(() => {
    const taskText = taskInputRef.current.value;
    setTasks((prevTasks) => [...prevTasks, taskText]);
  }, [setTasks]);

  const handleRemoveTask = useCallback(
    (taskIndex) => {
      setTasks((prevTasks) => {
        // const prevTasks_ = [...prevTasks];
        // prevTasks_.splice(taskIndex, 1);
        // return prevTasks_;
        // return [
        //   ...prevTasks.slice(0, taskIndex),
        //   ...prevTasks.slice(taskIndex + 1),
        // ];
        return prevTasks.filter(
          (_, taskIndex_) => taskIndex_ !== taskIndex
        );
      });
    },
    [setTasks]
  );

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          ref={taskInputRef}
          type="text"
          placeholder="Add your task"
        />
        <div>
          <button onClick={handleAddTask}>Submit</button>
        </div>
      </div>
      <ul>
        {tasks.map((task, taskIndex) => (
          <li key={taskIndex + task}>
            <span>{task}</span>
            <button onClick={() => handleRemoveTask(taskIndex)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
j;
