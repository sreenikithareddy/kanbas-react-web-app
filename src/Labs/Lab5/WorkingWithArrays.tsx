import React, { useState, useEffect } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function WorkingWithArrays() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo>({
    id: 1,
    title: "Task 1",
    description: "This is task 1",
    completed: false,
  });
  const [todoId, setTodoId] = useState("1");
  const API = `${REMOTE_SERVER}/lab5/todos`;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(API);
        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [API]);

  const fetchTodoById = async (id: string) => {
    try {
      const response = await fetch(`${API}/${id}`);
      const data: Todo = await response.json();
      setTodo(data);
    } catch (error) {
      console.error("Error fetching todo by ID:", error);
    }
  };

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? "Completed" : "Not Completed"}
          </li>
        ))}
      </ul>
      <hr />
      <h4>Retrieving an Item from an Array by ID</h4>
      <input
        id="wd-todo-id"
        value={todoId}
        className="form-control w-50"
        onChange={(e) => setTodoId(e.target.value)}
      />
      <button
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        onClick={() => fetchTodoById(todoId)}
      >
        Get Todo by ID
      </button>
      <hr />
      {todo && (
        <div>
          <h5>Todo Details:</h5>
          <p>ID: {todo.id}</p>
          <p>Title: {todo.title}</p>
          <p>Description: {todo.description}</p>
          <p>Completed: {todo.completed ? "Yes" : "No"}</p>
        </div>
      )}
      <hr />
      <h3>Filtering Array Items</h3>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />
      <h3>Creating new Items in an Array</h3>
      <a
        id="wd-create-todo"
        className="btn btn-primary"
        href={`${API}/create`}
      >
        Create Todo
      </a>
      <hr />
      <h3>Deleting from an Array</h3>
      <input
        value={todoId}
        className="form-control w-50"
        onChange={(e) => setTodoId(e.target.value)}
      />
      <a
        id="wd-delete-todo"
        className="btn btn-primary float-end"
        href={`${API}/${todoId}/delete`}
      >
        Delete Todo with ID = {todoId}
      </a>
      <hr />
      <h3>Updating an Item in an Array</h3>
      <input
        value={todo.id}
        className="form-control w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value) })}
      />
      <input
        value={todo.title}
        className="form-control w-50 float-start"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <a
        href={`${API}/${todo.id}/title/${todo.title}`}
        className="btn btn-primary float-end"
      >
        Update Todo
      </a>
      <br />
      <br />
      <hr />
      <h3>Updating Todo Description and Completed Status</h3>
      <input
        value={todo.description}
        className="form-control w-50 float-start"
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <a
        href={`${API}/${todo.id}/description/${todo.description}`}
        className="btn btn-primary float-end"
      >
        Update Description
      </a>
      <br />
      <br />
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
      />
      <a
        href={`${API}/${todo.id}/completed/${todo.completed}`}
        className="btn btn-primary float-end"
      >
        Update Completed
      </a>
      <br />
      <br />
      <hr />
    </div>
  );
}
