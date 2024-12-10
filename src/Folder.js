import React, { useState } from "react";
import File from "./File";
import { FaFolder, FaFolderOpen } from "react-icons/fa";

const Folder = ({ data, setData, name, path }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => setIsOpen(!isOpen);

  const isFolder = (item) => typeof item === "object" && !Array.isArray(item);

  // Helper to update data immutably
  const updateDataAtPath = (data, path, callback) => {
    if (path.length === 0) {
      return callback(data);
    }
    const [currentKey, ...restPath] = path;
    return {
      ...data,
      [currentKey]: updateDataAtPath(data[currentKey], restPath, callback),
    };
  };

  // Add File
  const addFile = () => {
    const fileName = prompt("Enter new file name:");
    if (fileName) {
      const updatedData = updateDataAtPath(data, path, (currentNode) => {
        if (Array.isArray(currentNode)) {
          return [...currentNode, fileName];
        }
        alert("Cannot add a file to a non-folder node.");
        return currentNode;
      });
      setData(updatedData);
    }
  };

  // Add Folder
  const addFolder = () => {
    const folderName = prompt("Enter new folder name:");
    if (folderName) {
      const updatedData = updateDataAtPath(data, path, (currentNode) => {
        if (isFolder(currentNode)) {
          // Initialize the folder with an empty array (ready for files)
          return {
            ...currentNode,
            [folderName]: [],
          };
        }
        alert("Cannot add a folder to a file node.");
        return currentNode;
      });
      setData(updatedData);
    }
  };

  // Delete Item
  const deleteItem = () => {
    const updatedData = updateDataAtPath(
      data,
      path.slice(0, -1),
      (parentNode) => {
        const keyToDelete = path[path.length - 1];
        if (isFolder(parentNode)) {
          const { [keyToDelete]: _, ...rest } = parentNode;
          return rest;
        }
        alert("Invalid delete operation.");
        return parentNode;
      }
    );
    setData(updatedData);
  };

  // Edit Item
  const editItem = () => {
    const newName = prompt("Enter new name for the item:", name);
    if (newName && newName !== name) {
      const updatedData = updateDataAtPath(
        data,
        path.slice(0, -1),
        (parentNode) => {
          const keyToEdit = path[path.length - 1];
          const reorderedParent = Object.keys(parentNode).reduce((acc, key) => {
            if (key === keyToEdit) {
              acc[newName] = parentNode[key]; // Assign the new name to the same value
            } else {
              acc[key] = parentNode[key];
            }
            return acc;
          }, {});
          return reorderedParent;
        }
      );
      setData(updatedData);
    }
  };

  const currentData =
    path.length === 0
      ? data
      : path.reduce((current, key) => current[key], data);

  return (
    <div style={{ marginLeft: path.length * 20 }}>
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        <span onClick={toggleFolder}>
          {isOpen ? (
            <FaFolderOpen style={{ color: "#FFD700", marginRight: "5px" }} />
          ) : (
            <FaFolder style={{ color: "#FFD700", marginRight: "5px" }} />
          )}
          {name}
        </span>
        {name !== "Root" && (
          <>
            <button onClick={editItem} style={{ marginLeft: "10px" }}>
              ✏️ Edit
            </button>
            <button onClick={addFile} style={{ marginLeft: "5px" }}>
              + File
            </button>
            <button onClick={addFolder} style={{ marginLeft: "5px" }}>
              + Folder
            </button>
            <button onClick={deleteItem} style={{ marginLeft: "5px" }}>
              🗑️
            </button>
          </>
        )}
      </div>
      {isOpen &&
        (isFolder(currentData)
          ? Object.keys(currentData).map((key) => (
              <Folder
                key={key}
                data={data}
                setData={setData}
                name={key}
                path={[...path, key]}
              />
            ))
          : currentData.map((file, index) => (
              <File
                key={index}
                name={file}
                path={[...path, index]}
                data={data}
                setData={setData}
              />
            )))}
    </div>
  );
};

export default Folder;
