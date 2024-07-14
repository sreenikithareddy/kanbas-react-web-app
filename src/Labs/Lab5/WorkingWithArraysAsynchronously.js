import React, { useState, useEffect } from "react";
import { FaTrash, FaPlusCircle, FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import * as client from "./client";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchTodos = async () => {
    try {
      const todos = await client.fetchTodos();
      setTodos(todos);
    } catch (error) {
      setErrorMessage("Error fetching todos.");
    }
  };

  const removeTodo = async (todo) => {
    try {
      await client.removeTodo(todo);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await client.deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const createTodo = async () => {
    try {
      const newTodo = await client.createTodo();
      setTodos([...todos, newTodo]);
    } catch (error) {
      setErrorMessage("Error creating new todo.");
    }
  };

  const postTodo = async () => {
    try {
      const newTodo = await client.postTodo({ title: "New Posted Todo", completed: false });
      setTodos([...todos, newTodo]);
    } catch (error) {
      setErrorMessage("Error posting new todo.");
    }
  };

  const editTodo = (todo) => {
    const updatedTodos = todos.map((t) => (t.id === todo.id ? { ...todo, editing: true } : t));
    setTodos(updatedTodos);
  };

  const updateTodo = async (todo) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      {errorMessage && (
        <div id="wd-todo-error-message" className="alert alert-danger mb-2 mt-2">
          {errorMessage}
        </div>
      )}
      <h4>
        Todos
        <FaPlusCircle onClick={createTodo} className="text-success float-end fs-3" id="wd-create-todo" />
        <FaPlusCircle onClick={postTodo} className="text-primary float-end fs-3 me-3" id="wd-post-todo" />
      </h4>
      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <FaEdit onClick={() => editTodo(todo)} className="text-primary float-end me-2 mt-1" />
            <FaTrash onClick={() => removeTodo(todo)} className="text-danger float-end mt-1" id="wd-remove-todo" />
            <TiDelete onClick={() => deleteTodo(todo.id)} className="text-danger float-end me-2 fs-3" id="wd-delete-todo" />
            <input
              type="checkbox"
              defaultChecked={todo.completed}
              className="form-check-input me-2 float-start"
              onChange={(e) => updateTodo({ ...todo, completed: e.target.checked })}
            />
            {!todo.editing ? (
              todo.title
            ) : (
              <input
                className="form-control w-50 float-start"
                defaultValue={todo.title}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({ ...todo, editing: false });
                  }
                }}
                onChange={(e) => updateTodo({ ...todo, title: e.target.value })}
              />
            )}
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}
