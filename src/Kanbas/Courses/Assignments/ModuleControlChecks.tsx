import React from 'react';
import { FaTrash } from 'react-icons/fa';
import DeleteModal from './DeleteModal';
import GreenCheckmark from './GreenCheckmark';
import { IoEllipsisVertical } from 'react-icons/io5';

interface ModuleControlChecksProps {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
}

const ModuleControlChecks: React.FC<ModuleControlChecksProps> = ({ assignmentId, deleteAssignment }) => {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      <FaTrash className="text-danger me-2 mb-1" data-bs-toggle="modal" data-bs-target={`#deleteConfirmationModal-${assignmentId}`} />
      <DeleteModal assignmentId={assignmentId} deleteAssignment={deleteAssignment} />
    </div>
  );
};

export default ModuleControlChecks;
