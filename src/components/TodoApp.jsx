import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // FOR ADD ITEMS
  const handleAddItem = () => {
    if (currentTask.trim() !== "") {
      if (editMode) {
        const updatedTasks = tasks.map((task, index) =>
          index === editIndex ? currentTask : task
        );
        setTasks(updatedTasks);
        setEditMode(false);
        setEditIndex(null);
      } else {
        setTasks([...tasks, currentTask]);
      }
      setCurrentTask("");
    }
  };

  // FOR EDIT ITEMS
  const handleEditItem = (index) => {
    setCurrentTask(tasks[index]);
    setEditMode(true);
    setEditIndex(index);
  };

  // FOR DELETE ITEMS
  const handleDeleteItem = (index) => {
    const filteredTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(filteredTasks);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        {/* HEADER */}
        <Typography variant="h4" gutterBottom>
          To-Do List ✅
        </Typography>
        {/* INPUT FUILED */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter an Item...."
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
        />
        {/* ADD BUTTON */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddItem}
          style={{ marginTop: "10px" }}
          fullWidth
        >
          {editMode ? "Update Item" : "Add Items"}
        </Button>
        {/* TO-DO LIST ITEMS*/}
        <List style={{ marginTop: "20px" }}>
          {tasks.map((task, index) => (
            <ListItem
              key={index}
              style={{
                backgroundColor: "#f5f5f5",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <ListItemText primary={task} />
              {/* EDIT BTN ICON */}
              <IconButton color="primary" onClick={() => handleEditItem(index)}>
                <Edit />
              </IconButton>
              {/* DELETE BTN ICON */}
              <IconButton
                color="secondary"
                onClick={() => handleDeleteItem(index)}
              >
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default TodoApp;
