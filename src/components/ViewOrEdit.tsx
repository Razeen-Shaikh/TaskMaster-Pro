import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { statuses, Task } from "../api/tasks.data";
import { addTask, updateTask } from "../redux/features/taskSlice";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { CustomSelect } from "./CustomSelect";
import { TextEditor } from "./TextEditor";
import FileDropZone from "./FileDropZone";
import { IoIosArrowDown } from "react-icons/io";

import "../assets/styles/ViewOrEdit.css";
import { formatDisplayDate } from "../utils/helper";

interface ViewOrEditProps {
  task?: Task;
  onClose: () => void;
  isCreate?: boolean;
}

interface FileWithPreview {
  file: File;
  preview: string;
}

export const ViewOrEdit: React.FC<ViewOrEditProps> = ({
  task = {
    title: "",
    description: "",
    category: "",
    dueDate: "",
    tags: [],
    attachments: [],
    status: "",
    history: [],
    priority: "",
    id: "",
    createdDate: "",
    updatedDate: "",
  },
  onClose,
  isCreate = false,
}) => {
  const dispatch = useDispatch();
  const [attachments, setAttachments] = useState<FileWithPreview[]>(
    task.attachments.map((attachment) => ({
      file: new File([], attachment),
      preview: URL.createObjectURL(new File([], attachment)),
    }))
  );
  const [taskInput, setTaskInput] = useState<Task>({ ...task });

  const modalRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    if (isCreate) {
      dispatch(addTask(taskInput));
    } else {
      dispatch(updateTask(taskInput));
    }

    onClose();
  };

  const handleFilesAdded = (newFiles: File[]) => {
    const newAttachments = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setAttachments((prev) => {
      const updated = [...prev, ...newAttachments];
      setTaskInput({
        ...taskInput,
        attachments: updated.map((a) => a.file.name),
      });
      return updated;
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput({ ...taskInput, title: e.target.value });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    return () => {
      attachments.forEach((attachment) => {
        URL.revokeObjectURL(attachment.preview);
      });
    };
  }, [attachments]);

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <RxCross1 className="modal-icon" onClick={onClose} />
        <div className="flex-row justify-between modal-body">
          <div className="edit-mode">
            <input
              type="text"
              className="task-title"
              value={taskInput.title}
              onChange={handleTitleChange}
              placeholder="Task title"
            />

            <TextEditor
              initialContent={taskInput.description}
              onChange={(newContent: string) =>
                setTaskInput({ ...taskInput, description: newContent })
              }
            />

            <div className="task-info flex-row align-center justify-between">
              <div className="task-category">
                <p>Task Category*</p>
                <div className="task-category-options flex-row align-center justify-center">
                  <p
                    className={`cursor-pointer ${
                      taskInput.category === "Work" ? "active" : ""
                    }`}
                    onClick={() =>
                      setTaskInput({ ...taskInput, category: "Work" })
                    }
                  >
                    Work
                  </p>
                  <p
                    className={`cursor-pointer ${
                      taskInput.category === "Personal" ? "active" : ""
                    }`}
                    onClick={() =>
                      setTaskInput({ ...taskInput, category: "Personal" })
                    }
                  >
                    Personal
                  </p>
                </div>
              </div>
              <div className="task-due">
                <label htmlFor="date">Due on*</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  onChange={(e) =>
                    setTaskInput({ ...taskInput, dueDate: e.target.value })
                  }
                  value={taskInput.dueDate}
                  required
                />
              </div>
              <div className="task-status">
                <p>Task Status*</p>
                <CustomSelect
                  selected={taskInput.status}
                  onSelect={(status) => setTaskInput({ ...taskInput, status })}
                  options={statuses}
                  hideText={true}
                  className="task-status-select flex-row align-center justify-between"
                >
                  {taskInput.status || "Select Status"}
                  <IoIosArrowDown
                    style={{ width: "12px", height: "12px", opacity: 0.6 }}
                  />
                </CustomSelect>
              </div>
            </div>
            <div className="attachments">
              <p className="attachment-title">Attachment</p>
              <FileDropZone onFilesAdded={handleFilesAdded} />
              <div className="file-preview-grid">
                {attachments.map((attachment, index) => (
                  <div key={index} className="file-preview-item">
                    {attachment.file.type.startsWith("image/") ? (
                      <div className="file-preview-image">
                        <RxCross2
                          className="file-preview-icon"
                          onClick={() => {
                            URL.revokeObjectURL(attachment.preview);
                            setAttachments(
                              attachments.filter((_, i) => i !== index)
                            );
                          }}
                        />
                        <img
                          src={attachment.preview}
                          alt={attachment.file.name}
                          className="file-preview-img"
                        />
                      </div>
                    ) : (
                      <div className="file-preview-nonimage">
                        <p>{attachment.file.name}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {!isCreate && (
            <div className="activity">
              <h4>Activity</h4>
              <div className="activities">
                {taskInput.history.map((activity, index) => (
                  <div
                    className="activity-item flex-row align-center justify-between"
                    key={index}
                  >
                    <p>{activity.details}</p>
                    <p>{formatDisplayDate(new Date(activity.date))}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="action-buttons">
          <button className="cancel-button cursor-pointer" onClick={onClose}>
            CANCEL
          </button>
          <button
            className="save-button cursor-pointer"
            disabled={
              isCreate &&
              (!taskInput.title ||
                !taskInput.dueDate ||
                !taskInput.status ||
                !taskInput.category)
            }
            onClick={handleSave}
          >
            {isCreate ? "CREATE" : "UPDATE"}
          </button>
        </div>
      </div>
    </div>
  );
};
