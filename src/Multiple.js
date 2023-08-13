import React, { Component } from 'react';
import { CloudinaryContext, Image, Video } from 'cloudinary-react';
import axios from 'axios';

class UploadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedImages: [],
      uploadedVideos: [],
      selectedImages: [],
      selectedVideos: [],
    };
  }

  handleImagesUpload = async () => {
    const { selectedImages } = this.state;
    const imageArray = Array.from(selectedImages);

    const uploadPromises = imageArray.map(async (image) => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'my_upload_preset');

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dqtlfgnmh/image/upload',
          formData
        );

        return response.data.secure_url;
      } catch (error) {
        console.error('Error uploading image:', error);
        if (error.response) {
          console.error('Cloudinary Response:', error.response.data);
        }
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    this.setState({ uploadedImages });
  };

  handleVideosUpload = async () => {
    const { selectedVideos } = this.state;
    const videoArray = Array.from(selectedVideos);
    const uploadPromises = videoArray.map(async (video) => {
      const formData = new FormData();
      formData.append('file', video);
      formData.append('upload_preset', 'my_upload_preset'); 

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dqtlfgnmh/video/upload', 
          formData
        );

        return response.data.secure_url;
      } catch (error) {
        console.error('Error uploading video:', error);
        return null;
      }
    });

    const uploadedVideos = await Promise.all(uploadPromises);
    this.setState({ uploadedVideos });
  };
  handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.substring(url.lastIndexOf('/') + 1);
    link.target = '_blank';
    link.click();
  };

  handleImageInputChange = (event) => {
    this.setState({ selectedImages: event.target.files });
  };

  handleVideoInputChange = (event) => {
    this.setState({ selectedVideos: event.target.files });
  };

  render() {
    const { uploadedImages, uploadedVideos } = this.state;

    return (
      <div>
  <div>
    <h2>Image Upload</h2>
    <input type="file" accept="image/*" onChange={this.handleImageInputChange} multiple />
    <button onClick={this.handleImagesUpload}>Upload Images</button>
  </div>

  {uploadedImages.length > 0 && (
    <div>
      <h3>Uploaded Images:</h3>
      <div className="file-list">
        {uploadedImages.map((url, index) => (
          <div key={index} className="file-item">
            <Image cloudName="dqtlfgnmh" publicId={url} width="100" height="100" />
            <button onClick={() => this.handleDownload(url)}>Download</button>
          </div>
        ))}
      </div>
    </div>
  )}

  <div>
    <h2>Video Upload</h2>
    <input type="file" accept="video/*" onChange={this.handleVideoInputChange} multiple />
    <button onClick={this.handleVideosUpload}>Upload Videos</button>
  </div>

  {uploadedVideos.length > 0 && (
    <div>
      <h3>Uploaded Videos:</h3>
      <div className="file-list">
        {uploadedVideos.map((url, index) => (
          <div key={index} className="file-item">
            <Video cloudName="dqtlfgnmh" publicId={url} controls width="300" height="200" />
            <button onClick={() => this.handleDownload(url)}>Download</button>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

    );
  }
}

const App = () => (
  <CloudinaryContext cloudName="dqtlfgnmh">
    <UploadComponent />
  </CloudinaryContext>
);

export default App;
