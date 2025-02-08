import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { statuses, Task } from "../api/tasks.data";
import { addTask, updateTask } from "../redux/features/taskSlice";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { CustomSelect } from "./CustomSelect";
import { TextEditor } from "./TextEditor";
import FileDropZone from "./FileDropZone";
import { IoIosArrowDown } from "react-icons/io";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
    setAttachments((prev) => [...prev, ...newAttachments]);
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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modalContent: {
      position: "relative",
      background: "#fff",
      padding: "4rem 0",
      borderRadius: "20px",
      maxWidth: "90%",
    },
    modalBody: {
      gap: "0",
      border: "1px solid #0000001a",
      display: "flex",
      justifyContent: "space-between",
    },
    modalIcon: {
      position: "absolute",
      top: "20px",
      right: "15px",
      cursor: "pointer",
    },
    editMode: {
      padding: "1rem",
      border: "1px solid #0000001a",
    },
    taskTitle: {
      width: "630px",
      height: "38px",
      borderRadius: "8px",
      border: "1px solid #00000021",
      padding: "0 1.2rem",
      background: "#f1f1f15c",
      fontFamily: "Mulish",
      fontSize: "14px",
      fontWeight: 500,
      textAlign: "left",
      marginBottom: "1rem",
    },
    taskInfo: {
      marginTop: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    taskCategoryP: {
      fontFamily: "Mulish",
      fontSize: "12px",
      fontWeight: 600,
      textAlign: "left",
      color: "#00000099",
      marginBottom: "0.7rem",
    },
    taskCategoryOptionsContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    taskCategoryOption: {
      padding: "10px 24px",
      borderRadius: "41px",
      fontFamily: "Mulish",
      fontSize: "10px",
      fontWeight: 700,
      textAlign: "center",
      background: "#ffffff",
      border: "1px solid #00000030",
      color: "#090909",
      cursor: "pointer",
      marginRight: "0.5rem",
    },
    taskCategoryOptionActive: {
      padding: "10px 24px",
      borderRadius: "41px",
      fontFamily: "Mulish",
      fontSize: "10px",
      fontWeight: 700,
      textAlign: "center",
      background: "#7b1984",
      border: "1px solid #00000030",
      color: "#ffffff",
      cursor: "pointer",
      marginRight: "0.5rem",
    },
    taskDueLabel: {
      fontFamily: "Mulish",
      fontSize: "12px",
      fontWeight: 600,
      textAlign: "left",
      color: "#00000099",
      marginBottom: "0.7rem",
      display: "block",
    },
    taskDueInput: {
      display: "block",
      marginBottom: "0.7rem",
      width: "195px",
      height: "32px",
      borderRadius: "8px",
      border: "1px solid #00000021",
      background: "#f1f1f15c",
      color: "#000000",
      fontFamily: "Mulish",
      fontSize: "12px",
      fontWeight: 600,
      textAlign: "left",
      padding: "0 0.7rem",
    },
    taskStatusP: {
      fontFamily: "Mulish",
      fontSize: "12px",
      fontWeight: 600,
      textAlign: "left",
      color: "#00000099",
      marginBottom: "0.7rem",
    },
    taskStatusSelect: {
      padding: "0 0.7rem",
      width: "195px",
      height: "32px",
      borderRadius: "8px",
      background: "#f1f1f15c",
      border: "1px solid #00000021",
      fontFamily: "Mulish",
      fontSize: "12px",
      fontWeight: 600,
      textAlign: "left",
      color: "#000000",
      marginBottom: "0.7rem",
    },
    attachments: {
      marginTop: "1rem",
    },
    attachmentTitle: {
      fontFamily: "Mulish",
      fontSize: "12px",
      fontWeight: 600,
      textAlign: "left",
      color: "#00000099",
      marginBottom: "0.7rem",
    },
    filePreviewGrid: {
      marginTop: "1rem",
    },
    filePreviewImage: {
      position: "relative",
      width: "160px",
      height: "117px",
    },
    filePreviewImg: {
      width: "160px",
      height: "117px",
      borderRadius: "8px",
    },
    filePreviewIcon: {
      position: "absolute",
      top: "-10px",
      right: "-10px",
      width: "25px",
      height: "25px",
      borderRadius: "25px",
      border: "0.3px solid #00000026",
      background: "#fafafa",
      color: "#121212",
      padding: "5px",
      cursor: "pointer",
    },
    actionButtons: {
      display: "flex",
      justifyContent: "end",
      alignItems: "center",
      position: "absolute",
      right: "1rem",
      bottom: "13px",
    },
    cancelButton: {
      padding: "10px 24px",
      borderRadius: "41px",
      border: "1px solid #00000030",
      background: "#ffffff",
      fontFamily: "Mulish",
      fontSize: "14px",
      fontWeight: 700,
      textAlign: "center",
      color: "#090909",
      cursor: "pointer",
      marginLeft: "0.5rem",
    },
    saveButton: {
      padding: "10px 31px",
      borderRadius: "41px",
      background: "#7b1984",
      fontFamily: "Mulish",
      fontSize: "14px",
      fontWeight: 700,
      textAlign: "center",
      border: "none",
      color: "#ffffff",
      cursor: "pointer",
      marginLeft: "0.5rem",
    },
    disabledSaveButton: {
      padding: "10px 24px",
      borderRadius: "41px",
      opacity: 0.5,
      background: "#7b1984",
      fontFamily: "Mulish",
      fontSize: "14px",
      fontWeight: 700,
      textAlign: "center",
      color: "#ffffff",
      cursor: "not-allowed",
      marginLeft: "0.5rem",
    },
    activity: {
      width: "357px",
      height: "422px",
    },
    activityH4: {
      padding: "1rem",
      fontFamily: "Mulish",
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "22.4px",
      textAlign: "left",
      color: "#00000099",
    },
    activities: {
      padding: "1rem",
      height: "100%",
      background: "#f1f1f1",
      zIndex: -1,
    },
    activityItem: {
      marginBottom: "0.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    activityItemFirstP: {
      opacity: 0.8,
      fontFamily: "Mulish",
      fontSize: "10px",
      fontWeight: 400,
      textAlign: "left",
      color: "#1e212a",
    },
    activityItemLastP: {
      opacity: 0.5,
      fontFamily: "Mulish",
      fontSize: "10px",
      fontWeight: 400,
      textAlign: "left",
      color: "#1e212a",
    },
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={{ ...styles.modalContent }} ref={modalRef}>
        <RxCross1 style={styles.modalIcon} onClick={onClose} />
        <div style={styles.modalBody}>
          <div style={styles.editMode}>
            <input
              type="text"
              style={{
                ...styles.taskTitle,
                width: isMobile ? "100%" : "630px",
              }}
              value={taskInput.title}
              onChange={(e) =>
                setTaskInput({ ...taskInput, title: e.target.value })
              }
              placeholder="Task title"
            />
            <TextEditor initialContent={taskInput.description} />
            <div style={styles.taskInfo}>
              <div>
                <p style={styles.taskCategoryP}>Task Category*</p>
                <div style={styles.taskCategoryOptionsContainer}>
                  <p
                    style={
                      taskInput.category === "Work"
                        ? styles.taskCategoryOptionActive
                        : styles.taskCategoryOption
                    }
                    onClick={() =>
                      setTaskInput({ ...taskInput, category: "Work" })
                    }
                  >
                    Work
                  </p>
                  <p
                    style={
                      taskInput.category === "Personal"
                        ? styles.taskCategoryOptionActive
                        : styles.taskCategoryOption
                    }
                    onClick={() =>
                      setTaskInput({ ...taskInput, category: "Personal" })
                    }
                  >
                    Personal
                  </p>
                </div>
              </div>
              <div>
                <label style={styles.taskDueLabel} htmlFor="date">
                  Due on*
                </label>
                <input
                  type="date"
                  id="date"
                  style={styles.taskDueInput}
                  onChange={(e) =>
                    setTaskInput({ ...taskInput, dueDate: e.target.value })
                  }
                  value={taskInput.dueDate}
                  required
                />
              </div>
              <div>
                <p style={styles.taskStatusP}>Task Status*</p>
                <CustomSelect
                  selected={taskInput.status}
                  onSelect={(status) => setTaskInput({ ...taskInput, status })}
                  options={statuses}
                  hideText={true}
                  style={styles.taskStatusSelect}
                >
                  {taskInput.status || "Select Status"}
                  <IoIosArrowDown
                    style={{ width: "12px", height: "12px", opacity: 0.6 }}
                  />
                </CustomSelect>
              </div>
            </div>
            <div style={styles.attachments}>
              <p style={styles.attachmentTitle}>Attachment</p>
              <FileDropZone onFilesAdded={handleFilesAdded} />
              <div style={styles.filePreviewGrid}>
                {attachments.map((attachment, index) => (
                  <div key={index}>
                    {attachment.file.type.startsWith("image/") ? (
                      <div style={styles.filePreviewImage}>
                        <RxCross2
                          style={styles.filePreviewIcon}
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
                          style={styles.filePreviewImg}
                        />
                      </div>
                    ) : (
                      <div>
                        <p>{attachment.file.name}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {!isCreate && (
            <div style={styles.activity}>
              <h4 style={styles.activityH4}>Activity</h4>
              <div style={styles.activities}>
                {taskInput.history.map((activity, index) => (
                  <div key={index} style={styles.activityItem}>
                    <p style={styles.activityItemFirstP}>{activity.details}</p>
                    <p style={styles.activityItemLastP}>
                      {new Date(activity.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={styles.actionButtons}>
          <button style={styles.cancelButton} onClick={onClose}>
            CANCEL
          </button>
          <button
            style={
              isCreate &&
              (!taskInput.title ||
                !taskInput.dueDate ||
                !taskInput.status ||
                !taskInput.category)
                ? styles.disabledSaveButton
                : styles.saveButton
            }
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
