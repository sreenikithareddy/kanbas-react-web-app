import React from 'react';
import { FaPlus } from 'react-icons/fa';
import ModuleEditor from './ModuleEditor';

interface ModulesControlsProps {
  moduleName: string;
  setModuleName: (name: string) => void;
  addModule: () => void;
}

export default function ModulesControls({ moduleName, setModuleName, addModule }: ModulesControlsProps) {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <button
        className="btn btn-lg btn-danger me-1 float-end"
        data-bs-toggle="modal"
        data-bs-target="#wd-add-module-dialog"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: '1px' }} />
        Module
      </button>
      <ModuleEditor
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}
