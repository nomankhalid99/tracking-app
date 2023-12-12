import React, { useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import { Container, Grid, Typography } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDoubleArrow } from "react-icons/md";

const MainSection = ({ mediaType, onUpload, mediaList, onSelectImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayCount, setDisplayCount] = useState(6);
  const [selectedImageData, setSelectedImageData] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    } else {
      alert("Please select a file to upload.");
    }
  };

  const handleImageClick = (selectedImage) => {
    onSelectImage(selectedImage);

    setSelectedImageData(selectedImage);
  };

  const handleLoadMoreClick = () => {
    setDisplayCount((prevCount) => prevCount + 6);
  };

  const handleDownloadClick = () => {
    const jsonData = JSON.stringify(selectedImageData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "image_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="main-section">
      <Typography variant="h3" textAlign="center" paddingY={3}>
        Image Tracking App
      </Typography>
      <hr />
      <Container>
        <Grid container mt={3} spacing={2}>
          <Grid
          textAlign='right' 
            item
            padding={3}
            borderRadius={2}
            xs={8}
            bgcolor="rgb(15, 41, 66)"
          >
            <div
              style={{
                border: "2px dotted white",
                display: "flex",
                backgroundColor: "rgb(11, 26, 39)",
                borderRadius: "8px",
                color: "white",
                flexDirection: "column",
                alignItems: "center",
                padding: "30px",
                justifyContent: "center",
              }}
            >
                <FaCloudUploadAlt color="aqua" fontSize='30px' />
              <Typography variant="h6" fontWeight="bolder">
                Try this Model
              </Typography>
              <label htmlFor="imageInput" className="custom-file-upload">
                Upload {mediaType === "images" ? "Image" : "Video"}
                <Input
                  type="file"
                  id="imageInput"
                  className="input"
                  onClick={handleUploadClick}
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <Grid container spacing={2} bgcolor="rgb(15, 41, 66)" mt={2}>
              {mediaList.slice(0, displayCount).map((media, index) => (
                <Grid
                  item
                  xs={6}
                  sm={2}
                  key={index}
                  onClick={() => handleImageClick(media)}
                  style={{ cursor: "pointer" }}
                >
                  <div>
                    {mediaType === "images" ? (
                      <img
                        src={media.urls.regular}
                        alt={media.alt_description}
                        style={{ width: "100%", height: "150px" }}
                      />
                    ) : (
                      <video width="100%" height="auto" controls>
                        <source src={media.urls.small} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </Grid>
              ))}
            </Grid>
            {mediaList.length > displayCount && (
              <Button
                style={{ marginTop: "10px" }}
                onClick={handleLoadMoreClick}
                className="btn3"
                endIcon={<MdDoubleArrow />
            }
              >
                Load More
              </Button>
            )}
          </Grid>
          <Grid item xs={4} >
            {selectedImageData && (
              <div>
                <Paper
                  elevation={3}
                  style={{
                    paddingLeft: "20px",
                    maxHeight: "65vh",
                    overflowY: "auto",
                    backgroundColor: "rgb(11, 26, 39)",
                    color: "white",
                  }}
                >
                  <Typography variant="h5">Selected Image JSON</Typography>
                  <pre style={{ whiteSpace: "pre-wrap" }}>
                    {JSON.stringify(selectedImageData, null, 2)}
                  </pre>
                </Paper>
                <Button
                  style={{
                    marginTop: "10px",
                    marginBottom: "30px",
                  }}
                  onClick={handleDownloadClick}
                  className="btn2"
                >
                  Download JSON
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MainSection;
