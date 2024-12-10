import React from "react";
import { FaFile, FaFileImage, FaFileVideo, FaFileAlt } from "react-icons/fa";

const File = ({ name, path, data, setData }) => {
  // Determine the file icon based on file extension
  const getFileIcon = (fileName) => {
    if (fileName.endsWith(".jpg") || fileName.endsWith(".png")) {
      return <FaFileImage style={{ color: "#00BFFF", marginRight: "5px" }} />;
    } else if (fileName.endsWith(".mp4") || fileName.endsWith(".mkv")) {
      return <FaFileVideo style={{ color: "#FF6347", marginRight: "5px" }} />;
    } else if (fileName.endsWith(".txt") || fileName.endsWith(".doc")) {
      return <FaFileAlt style={{ color: "#4682B4", marginRight: "5px" }} />;
    }
    return <FaFile style={{ marginRight: "5px" }} />;
  };

  const editFile = () => {
    const newName = prompt("Enter new name for the file:", name);
    if (newName && newName !== name) {
      const updatedData = path
        .slice(0, -1)
        .reduce((current, key) => current[key], { ...data });
      const fileIndex = path[path.length - 1];
      updatedData[fileIndex] = newName;
      setData({ ...data });
    }
  };

  const deleteFile = () => {
    const updatedData = path
      .slice(0, -1)
      .reduce((current, key) => current[key], { ...data });
    const fileIndex = path[path.length - 1];
    updatedData.splice(fileIndex, 1);
    setData({ ...data });
  };

  return (
    <div className="file-container">
      {getFileIcon(name)} <span className="file-name">{name}</span>
      <button onClick={editFile} className="btn-edit">
        ✏️ Edit
      </button>
      <button onClick={deleteFile} className="btn-delete">
        🗑️ Delete
      </button>
    </div>
  );
};

export default File;
