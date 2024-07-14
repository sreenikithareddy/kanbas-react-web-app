import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState(null);
  const [title, setTitle] = useState("");
  const [module, setModule] = useState(null);
  const [moduleName, setModuleName] = useState("");
  const [newModuleName, setNewModuleName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newScore, setNewScore] = useState("");
  const [completed, setCompleted] = useState(false);

  const fetchAssignment = async () => {
    try {
      const response = await fetch(`${REMOTE_SERVER}/lab5/assignment`);
      const data = await response.json();
      setAssignment(data);
    } catch (error) {
      console.error("Error fetching assignment:", error);
    }
  };

  const fetchTitle = async () => {
    try {
      const response = await fetch(`${REMOTE_SERVER}/lab5/assignment/title`);
      const data = await response.json();
      setTitle(data);
    } catch (error) {
      console.error("Error fetching title:", error);
    }
  };

  const fetchModule = async () => {
    try {
      const response = await fetch(`${REMOTE_SERVER}/lab5/module`);
      const data = await response.json();
      setModule(data);
    } catch (error) {
      console.error("Error fetching module:", error);
    }
  };

  const fetchModuleName = async () => {
    try {
      const response = await fetch(`${REMOTE_SERVER}/lab5/module/name`);
      const data = await response.json();
      setModuleName(data);
    } catch (error) {
      console.error("Error fetching module name:", error);
    }
  };

  const updateModuleName = async () => {
    try {
      const response = await fetch(`${REMOTE_SERVER}/lab5/module/name`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newModuleName }),
      });
      const data = await response.json();
      setModuleName(data);
      setNewModuleName(""); // Clear the input field after updating
    } catch (error) {
      console.error("Error updating module name:", error);
    }
  };

  const updateDescription = async () => {
    try {
      const response = await fetch(`${REMOTE_SERVER}/lab5/module/description`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: newDescription }),
      });
      const data = await response.json();
      setModule((prev) => ({ ...prev, description: data }));
    } catch (error) {
      console.error("Error updating module description:", error);
    }
  };

  const updateScore = async () => {
    try {
      const response = await fetch(`${REMOTE_SERVER}/lab5/assignment/score`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score: newScore }),
      });
      const data = await response.json();
      setAssignment((prev) => ({ ...prev, score: data }));
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  const updateCompleted = async () => {
    try {
      const response = await fetch(`${REMOTE_SERVER}/lab5/assignment/completed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });
      const data = await response.json();
      setAssignment((prev) => ({ ...prev, completed: data }));
    } catch (error) {
      console.error("Error updating completed status:", error);
    }
  };

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <button id="wd-retrieve-assignments" className="btn btn-primary" onClick={fetchAssignment}>
        Get Assignment
      </button>
      <button id="wd-retrieve-title" className="btn btn-secondary" onClick={fetchTitle}>
        Get Title
      </button>
      <button id="wd-retrieve-module" className="btn btn-success" onClick={fetchModule}>
        Get Module
      </button>
      <button id="wd-retrieve-module-name" className="btn btn-warning" onClick={fetchModuleName}>
        Get Module Name
      </button>
      <hr />
      {assignment && (
        <div>
          <h5>Assignment Details:</h5>
          <p>ID: {assignment.id}</p>
          <p>Title: {assignment.title}</p>
          <p>Description: {assignment.description}</p>
          <p>Due: {assignment.due}</p>
          <p>Completed: {assignment.completed ? "Yes" : "No"}</p>
          <p>Score: {assignment.score}</p>
        </div>
      )}
      {title && (
        <div>
          <h5>Assignment Title:</h5>
          <p>{title}</p>
        </div>
      )}
      {module && (
        <div>
          <h5>Module Details:</h5>
          <p>ID: {module.id}</p>
          <p>Name: {module.name}</p>
          <p>Description: {module.description}</p>
          <p>Course: {module.course}</p>
        </div>
      )}
      {moduleName && (
        <div>
          <h5>Module Name:</h5>
          <p>{moduleName}</p>
        </div>
      )}
      <hr />
      <h4>Edit Module</h4>
      <input
        id="wd-new-module-name"
        className="form-control mb-2"
        value={newModuleName}
        onChange={(e) => setNewModuleName(e.target.value)}
        placeholder="New Module Name"
      />
      <button id="wd-update-module-name" className="btn btn-info" onClick={updateModuleName}>
        Update Module Name
      </button>
      <input
        id="wd-new-description"
        className="form-control mb-2"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder="New Module Description"
      />
      <button id="wd-update-description" className="btn btn-info" onClick={updateDescription}>
        Update Description
      </button>
      <hr />
      <h4>Edit Assignment</h4>
      <input
        id="wd-new-score"
        className="form-control mb-2"
        value={newScore}
        onChange={(e) => setNewScore(e.target.value)}
        placeholder="New Score"
        type="number"
      />
      <button id="wd-update-score" className="btn btn-info" onClick={updateScore}>
        Update Score
      </button>
      <div className="form-check">
        <input
          id="wd-completed"
          className="form-check-input"
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="wd-completed">
          Completed
        </label>
      </div>
      <button id="wd-update-completed" className="btn btn-info" onClick={updateCompleted}>
        Update Completed
      </button>
    </div>
  );
}
