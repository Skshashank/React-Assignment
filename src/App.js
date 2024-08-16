import { useState, useEffect } from "react";
import "./App.css";
import { Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import PrimarySearchAppBar from "./components/Search";
import SyncIcon from "@mui/icons-material/Sync";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";

function App() {
  const [widget, setWidget] = useState({ title: "", text: "" });
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // search
  const [openWidget, setOpenWidget] = useState(false);
  const [open, setOpen] = useState(false);
  const [CategoryName, setCategoryName] = useState();
  const [section, setSection] = useState("");
  const [title, setTitle] = useState([]);

  useEffect(() => {
    setFilteredData(data); // Initialize filteredData with all categories and widgets
  }, [data]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  function handleSubmit() {
    setData([...data, { CategoryName: CategoryName, widget: [] }]);
    setOpen(false);
  }

  function handleWidget() {
    setTitle([...title, widget.title]);
    const categoryIndex = data.findIndex((el) => el.CategoryName === section);
    if (categoryIndex !== -1) {
      const updatedData = [...data];
      updatedData[categoryIndex].widget = [
        ...updatedData[categoryIndex].widget,
        { text: widget.title, detail: widget.text },
      ];
      setData(updatedData);
    }
    setOpenWidget(false);
  }

  function handleDeleteWidget(categoryName, widgetIndex) {
    const categoryIndex = data.findIndex(
      (el) => el.CategoryName === categoryName
    );
    if (categoryIndex !== -1) {
      const updatedData = [...data];
      updatedData[categoryIndex].widget.splice(widgetIndex, 1);
      setData(updatedData);
    }
  }

  function handleDeleteCategory(categoryIndex) {
    const updatedData = [...data];
    updatedData.splice(categoryIndex, 1);
    setData(updatedData);
  }

  return (
    <div
      style={{
        padding: "0px 0px",
        backgroundColor: "#EDF2FA",
        height: "100vh",
      }}
    >
      <div>
        <PrimarySearchAppBar
          title={title}
          data={data}
          setFilteredData={setFilteredData}
        />
      </div>
      <div
        style={{
          marginTop: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "auto",
            }}
          >
            <h4
              style={{
                marginLeft: "20px",
                fontSize: "1.75rem",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Dashboard
            </h4>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                backgroundColor: "white",
                color: "black",
                border: "1px solid #ccc",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#007bff",
                  borderColor: "#007bff",
                },
              }}
            >
              Add Category <AddIcon />
            </Button>
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                backgroundColor: "white",
                color: "black",
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginLeft: "20px",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#007bff",
                  borderColor: "#007bff",
                },
              }}
            >
              <SyncIcon />
            </Button>
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                backgroundColor: "white",
                color: "black",
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginLeft: "20px",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#007bff",
                  borderColor: "#007bff",
                },
              }}
            >
              <MoreVertIcon />
            </Button>
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                backgroundColor: "white",
                color: "black",
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginLeft: "20px",
                marginRight: "20px",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#007bff",
                  borderColor: "#007bff",
                },
              }}
            >
              <AccessTimeFilledIcon />
              <Divider
                orientation="vertical"
                flexItem
                style={{ color: "black", margin: "0 6px" }}
              />
              Last 2 Days
              <KeyboardArrowDownIcon sx={{ marginLeft: "2px" }} />
            </Button>
          </div>
        </div>
      </div>

      <Grid container>
        {filteredData?.map((el, categoryIndex) => (
          <Grid
            item
            md={12}
            sx={{
              marginBottom: "10px",
              padding: "20px",
              marginLeft: "16px",
              marginRight: "16px",
            }}
            key={categoryIndex}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1
                style={{ color: "black", fontWeight: "bold", fontSize: "22px" }}
              >
                {el.CategoryName}
              </h1>
              <Button
                variant="contained"
                style={{
                  padding: "2px",
                  backgroundColor: "#F9F9F9",
                  color: "black",
                  margin: "5px",
                }}
                onClick={() => handleDeleteCategory(categoryIndex)}
              >
                X
              </Button>
            </div>
            <Grid container spacing={2}>
              {el?.widget?.map((e, widgetIndex) => (
                <Grid item md={4} key={widgetIndex}>
                  <Item
                    style={{
                      padding: "10px 10px",
                      width: "full",
                      height: "200px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h1
                        style={{
                          textAlign: "left",
                          color: "black",
                          fontWeight: "bold",
                          fontFamily: "sans-serif",
                        }}
                      >
                        {e.text}
                      </h1>
                      <Button
                        variant="contained"
                        style={{
                          padding: "2px",
                          backgroundColor: "#F9F9F9",
                          color: "black",
                          margin: "5px",
                        }}
                        onClick={() =>
                          handleDeleteWidget(el.CategoryName, widgetIndex)
                        }
                      >
                        X
                      </Button>
                    </div>
                    <p
                      style={{
                        textAlign: "left",
                        color: "black",
                        fontFamily: "sans-serif",
                        padding: "10px",
                      }}
                    >
                      {e.detail}
                    </p>
                  </Item>
                </Grid>
              ))}
              <Grid
                item
                md={4}
                onClick={() => {
                  setOpenWidget(true);
                  setSection(el?.CategoryName);
                }}
              >
                <Item
                  style={{ padding: "5rem", width: "full", height: "200px" }}
                >
                  <button style={{ fontSize: "1.5rem" }}>+ Add Widget</button>
                </Item>
              </Grid>
            </Grid>
          </Grid>
        ))}

        {/* Dialog for adding a category */}
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          PaperProps={{
            component: "form",
          }}
        >
          <DialogTitle>Add Category Name</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add Category, please enter Category Name here.
            </DialogContentText>
            <TextField
              autoFocus
              required
              id="name"
              label="Category Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setCategoryName(e?.target?.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleSubmit();
              }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for adding a widget */}
        <Dialog
          open={openWidget}
          onClose={() => {
            setOpenWidget(false);
          }}
          PaperProps={{
            component: "form",
          }}
        >
          <DialogTitle>Add Widget</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add Widget, please fill in the details.
            </DialogContentText>
            <TextField
              autoFocus
              required
              id="name"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setWidget({ ...widget, title: e?.target?.value });
              }}
            />
            <textarea
              onChange={(e) => {
                setWidget({ ...widget, text: e?.target?.value });
              }}
              style={{
                border: "1px solid black",
                width: "550px",
                margin: "20px 0px",
              }}
              placeholder="Please enter the text"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenWidget(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleWidget();
              }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
}

export default App;
