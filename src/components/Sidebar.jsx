import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";

const Sidebar = ({ mediaType, onMediaTypeChange, selectedImage }) => {
  return (
    <Grid
      container
      direction="column"
      bgcolor="rgb(15, 41, 66)"
      borderRadius={2}
      height="100vh"
      spacing={2}
      alignContent="center"
    >
      <Grid item mt={3}>
        <img
          src={selectedImage ? selectedImage.urls.regular : ""}
          alt={selectedImage ? selectedImage.alt_description : ""}
          style={{ width: "300px", height: "300px", borderRadius: "6px" }}
        />
      </Grid>
      <Grid item>
        <Button
          onClick={() => onMediaTypeChange("images")}
          className="btn"
          fullWidth
          startIcon={<FaImage/>}
        >
          Show Images
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={() => onMediaTypeChange("videos")}
          className="btn"
          fullWidth
          startIcon={<FaVideo/>}
        >
          Show Videos
        </Button>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
