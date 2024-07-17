import React from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';
import { BsPlus } from 'react-icons/bs';
import GreenCheckmark from './GreenCheckmark';
import { FaTrash } from 'react-icons/fa';
import DeleteModal from './DeleteModal';

interface ModuleControlButtonsProps {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
}

const ModuleControlButtons: React.FC<ModuleControlButtonsProps> = ({ assignmentId, deleteAssignment }) => {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <BsPlus className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
      <FaTrash className="text-danger me-2 mb-1" data-bs-toggle="modal" data-bs-target={`#deleteConfirmationModal-${assignmentId}`} />
      <DeleteModal assignmentId={assignmentId} deleteAssignment={deleteAssignment} />
    </div>
  );
};

export default ModuleControlButtons;
