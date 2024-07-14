import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from 'react-icons/bs';
import modulesData from '../../Database/modules.json';
import './style.css';

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const [modules, setModules] = useState<any[]>(modulesData);
  const [moduleName, setModuleName] = useState("");

  const courseModules = modules.filter((module) => module.course === cid);

  const addModule = () => {
    setModules([...modules, { _id: new Date().getTime().toString(), name: moduleName, course: cid, lessons: [] }]);
    setModuleName("");
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter((module) => module._id !== moduleId));
  };

  const editModule = (moduleId: string) => {
    setModules(modules.map((module) => 
      module._id === moduleId ? { ...module, editing: true } : module
    ));
  };

  const updateModule = (moduleId: string, name: string) => {
    setModules(modules.map((module) => 
      module._id === moduleId ? { ...module, name, editing: false } : module
    ));
  };

  console.log('Course ID:', cid);
  console.log('Filtered Modules:', courseModules);

  return (
    <div className="wd-modules">
      <ModulesControls addModule={addModule} setModuleName={setModuleName} moduleName={moduleName} /><br /><br /><br /><br />
      <ul className="list-group rounded-0">
        {courseModules.map((module: any) => (
          <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && <span className="flex-grow-1">{module.name}</span>}
              {module.editing && (
                <input
                  className="form-control w-50 d-inline-block"
                  value={module.name}
                  onChange={(e) => updateModule(module._id, e.target.value)}
                  onBlur={() => updateModule(module._id, module.name)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      updateModule(module._id, module.name);
                    }
                  }}
                />
              )}
              <ModuleControlButtons 
                moduleId={module._id} 
                deleteModule={deleteModule} 
                editModule={editModule} 
              />
            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    <LessonControlButtons />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

