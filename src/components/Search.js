import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
// import { Box, Tab } from "@mui/material";
// import { TabContext, TabList, TabPanel } from "@mui/lab";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Button, Grid } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function PrimarySearchAppBar({
  title,
  data,
  setFilteredData,
  filteredData,
  toDeleteData,
  setToDeleteData,
  setCanDelete,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // tab state define
  const [tabNumber, setTabNumber] = useState("1");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  //handle tab function

  const handleTabChange = (event, newValue) => {
    setTabNumber(newValue);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // search configuration

  const [searchVal, setSearchVal] = useState("");
  const handleSearch = (e) => {
    setSearchVal(e.target.value);
    const check = filterTitleArray();
    // console.log(check);
    setFilteredData(check);
  };

  const filterTitleArray = () => {
    const filteredArray = title.filter((val) => val.includes(searchVal));

    return filteredArray;
  };
  const handleSearchChange = (event) => {
    const searchText = event.target.value.toLowerCase();

    const filteredData = data
      .map((category) => ({
        ...category,
        widget: category.widget.filter((widget) =>
          widget.text.toLowerCase().includes(searchText)
        ),
      }))
      .filter((category) => category.widget.length > 0);

    setFilteredData(filteredData);
  };

  const handleCheckBoxChange = (e, categoryName, widgetName) => {
    if (!e.target.value) {
      setToDeleteData([
        ...toDeleteData,
        {
          categoryName: categoryName,
          widgetName: widgetName,
        },
      ]);
    }
  };

  const handleButtonClick = () => {
    // Perform delete operation
    const updatedData = data.map((category) => ({
      ...category,
      widget: category.widget.filter(
        (widget) =>
          !toDeleteData.some(
            (item) =>
              item.categoryName === category.categoryName &&
              item.widgetName === widget.widgetName
          )
      ),
    }));

    setFilteredData(updatedData); // Update filtered data if needed
    setToDeleteData([]); // Clear toDeleteData
    setIsDrawerOpen(false); // Close the drawer
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "white" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color=""
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <div
              style={{
                width: "800px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  backgroundColor: "Navy",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "30px",
                    color: "white",
                  }}
                >
                  Add Widgets
                </div>

                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2, marginLeft: "auto", color: "white" }}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "20px",
                  marginTop: "20px",
                  fontSize: "20px",
                }}
              >
                Personalise your dashboard by adding the following widget
              </div>
              <TabContext value={tabNumber}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleTabChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="Category Tabs"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      overflowX: "auto",
                      width: "100%",
                    }}
                  >
                    {filteredData?.map((el, categoryIndex) => (
                      <Tab
                        label={el.CategoryName}
                        value={categoryIndex}
                        key={`tab-${categoryIndex}`}
                      />
                    ))}
                  </TabList>
                </Box>

                {filteredData?.map((el, categoryIndex) => (
                  <TabPanel
                    key={`panel-${categoryIndex}`}
                    value={categoryIndex}
                  >
                    <FormGroup>
                      {el?.widget?.map((e, widgetIndex) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(e) =>
                                handleCheckBoxChange(
                                  e,
                                  el.categoryName,
                                  e.widgetName
                                )
                              }
                              defaultChecked
                            />
                          }
                          label={e.text}
                          key={`checkbox-${widgetIndex}`}
                          sx={{
                            display: "flex",
                            alignItems: "left",
                            justifyContent: "left",
                            textTransform: "none",
                            backgroundColor: "white",
                            color: "Red",
                            border: "2px solid #ccc",
                            borderRadius: "4px",
                            marginLeft: "8px",
                            marginRight: "8px",
                            marginBottom: "8px",
                            "&:hover": {
                              backgroundColor: "transparent",
                              color: "#007bff",
                              borderColor: "#007bff",
                            },
                          }}
                        />
                      ))}
                    </FormGroup>
                  </TabPanel>
                ))}
              </TabContext>

              <div>
                <div
                  sx={{
                    position: "relative",
                  }}
                >
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
                      position: "absolute",
                      bottom: 16,
                      left: 700,
                      "&:hover": {
                        backgroundColor: "navy",
                        color: "white",
                        borderColor: "#007bff",
                      },
                    }}
                    onClick={handleButtonClick}
                  >
                    Confirm
                  </Button>
                </div>

                <div
                  sx={{
                    width: "100%",
                  }}
                >
                  <Button
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textTransform: "none",
                      backgroundColor: "whte",
                      color: "black",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      position: "absolute",
                      bottom: 16,
                      left: 625,
                      "&:hover": {
                        backgroundColor: "Navy",
                        color: "white",
                        borderColor: "#007bff",
                      },
                    }}
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Drawer>

          <div
            style={{
              display: "flex",
              margin: "20px 10px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                Home
              </Link>
              <Typography
                color="text.primary"
                sx={{ color: (theme) => theme.palette.text.primary }}
              >
                Dashboard V2
              </Typography>
            </Breadcrumbs>
          </div>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          ></Typography>
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "0 10px",
              transition: "border-color 0.3s, box-shadow 0.3s",
              marginLeft: "auto",
              width: "500px",
              "&:hover": {
                borderColor: "#007bff",
                boxShadow: `0 0 0 1px rgba(0, 123, 255, 0.5)`,
              },
            }}
          >
            <div
              style={{
                padding: "0 8px",
                color: "grey",
              }}
            >
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchChange}
              sx={{
                color: "grey",
                "&::placeholder": {
                  color: "grey",
                },
                flex: 1,
                padding: "8px",
                marginLeft: "6px",
              }}
            />
          </Paper>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="black"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="black"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={3}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="black"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
