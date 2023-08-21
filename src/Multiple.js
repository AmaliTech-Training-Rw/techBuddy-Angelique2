import React, { useState, useContext} from 'react';
import { CloudinaryContext, Image, Video } from 'cloudinary-react';
import axios from "axios"
import { AuthContext } from './AuthProvider';

const UploadComponent = () => {

  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [error, setError] = useState("")
  const { user, login } = useContext(AuthContext);
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [loginMessage, setloginMessage] = useState("");

  const [loginState, setLoginState] = useState({
    email: "",
    password: ""
  })

  const handleFormChange = (e) => {
    e.preventDefault()
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value
    })
  }




  const handleImagesUpload = async () => {
    const imageArray = Array.from(selectedImages);

    const uploadPromises = imageArray.map(async (image) => {
      if (!image) {
        return null;
      }

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

    const uploadedImages = await Promise.all(uploadPromises.filter(url => url !== null));
    setUploadedImages(uploadedImages);
  };

  const handleVideosUpload = async () => {
    const videoArray = Array.from(selectedVideos);

    const maxVideoSize = 1024 * 1024 * 100;
    const maxVideoDurationInSeconds = 120;

    const uploadPromises = videoArray.map(async (video) => {
      if (!video) {
        return null;
      }

      if (video.size > maxVideoSize) {
        console.error('Video too large:', video);
        return null;
      }

      if (video.duration > maxVideoDurationInSeconds) {
        console.error('Video too long:', video);
        return null;
      }

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

    const uploadedVideos = await Promise.all(uploadPromises.filter(url => url !== null));
    setUploadedVideos(uploadedVideos);
  };

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.substring(url.lastIndexOf('/') + 1);
    link.target = '_blank';
    link.click();
  };

  const handleImageInputChange = (event) => {
    setSelectedImages(event.target.files);
  };

  const handleVideoInputChange = (event) => {
    setSelectedVideos(event.target.files);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', {
        email: e.target.email.value,
        password: e.target.password.value
      });

      if (response.status === 201) {
        setRegistrationMessage('User registered successfully');
      }

    } catch (error) {
      console.log(error)
      setError(error?.response?.data?.message)
    }

  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(loginState)

    } catch (error) {
      console.log(error)
      setError(error?.response?.data?.message)
    }

  }
  return (
    <div>
      {user ? (
        <div>
          <div>
            <h2>Image Upload</h2>
            <input type="file" accept="image/*" onChange={handleImageInputChange} multiple />
            <button onClick={handleImagesUpload}>Upload Images</button>
          </div>

          {uploadedImages.length > 0 && (
            <div>
              <h3>Uploaded Images:</h3>
              <div className="file-list">
                {uploadedImages.map((url, index) => (
                  <div key={index} className="file-item">
                    <Image cloudName="dqtlfgnmh" publicId={url} width="100" height="100" />
                    <button onClick={() => handleDownload(url)}>Download</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2>Video Upload</h2>
            <input type="file" accept="video/*" onChange={handleVideoInputChange} multiple />
            <button onClick={handleVideosUpload}>Upload Videos</button>
          </div>

          {uploadedVideos.length > 0 && (
            <div>
              <h3>Uploaded Videos:</h3>
              <div className="file-list">
                {uploadedVideos.map((url, index) => (
                  <div key={index} className="file-item">
                    <Video cloudName="dqtlfgnmh" publicId={url} controls width="300" height="200" />
                    <button onClick={() => handleDownload(url)}>Download</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>Please log in or register to upload and download files.</p>
          <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>

              <input type="email" name="email" placeholder="Email" required onChange={handleFormChange} />
              <input type="password" name="password" placeholder="Password" required onChange={handleFormChange} />
              <button type="submit">Login</button>
            </form>
            {loginMessage && <p>{loginMessage}</p>}
          </div>
          <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              {
                error &&
                <div style={{ color: "red", padding: '4px', border: "1px solid red" }}>
                  {error}
                </div>
              }
              <input type="email" name="email" placeholder="Email" required onChange={handleFormChange} />
              <input type="password" name="password" placeholder="Password" required onChange={handleFormChange} />
              <button type="submit">Register</button>
            </form>
            {registrationMessage && <p>{registrationMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => (
  <CloudinaryContext cloudName="dqtlfgnmh">
    <UploadComponent />
  </CloudinaryContext>
);

export default App;
