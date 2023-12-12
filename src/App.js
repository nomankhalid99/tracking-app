import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Grid from "@mui/material/Grid";
import MainSection from "./components/MainSection";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import './App.css';

const theme = createTheme();

function App() {
  const [mediaType, setMediaType] = useState("images");
  const [mediaList, setMediaList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/?client_id=OaUsM2Z3eNH-HLY-Hpx-dMti3mN0Fd-6sReL2QRN-PU&per_page=10`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMediaList(data);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    fetchData();
  }, [mediaType]);

  const handleMediaTypeChange = (type) => {
    setMediaType(type);
  };

  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://your-backend-upload-api.com/upload",
        {
          method: "POST",
          body: formData,
          headers: {},
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const uploadedMedia = await response.json();

      setMediaList((prevMediaList) => [...prevMediaList, uploadedMedia]);

      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);

      alert("Error uploading file. Please try again.");
    }
  };

  const onSelectImage = (selectedImage) => {
    setSelectedImage(selectedImage);
  };


  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Sidebar
            mediaType={mediaType}
            onMediaTypeChange={handleMediaTypeChange}
            mediaList={mediaList}
            selectedImage={selectedImage}
          />
        </Grid>
        <Grid item xs={9}>
          <MainSection
            mediaType={mediaType}
            onUpload={handleUpload}
            mediaList={mediaList}
            onSelectImage={onSelectImage}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
