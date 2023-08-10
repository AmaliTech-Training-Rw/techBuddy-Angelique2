// import React, { Component } from 'react';
// import { CloudinaryContext, Image, Video } from 'cloudinary-react';
// import axios from 'axios';

// class UploadComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       uploadedImage: '',
//       uploadedVideo: '',
//       selectedImage: null,
//       selectedVideo: null,
//     };
//   }

//   handleImageUpload = async () => {
//     if (this.state.selectedImage) {
//       const formData = new FormData();
//       formData.append('file', this.state.selectedImage);
//       formData.append('upload_preset', 'my_upload_preset'); // Replace with your Cloudinary upload preset

//       try {
//         const response = await axios.post(
//           'https://api.cloudinary.com/v1_1/dqtlfgnmh/image/upload', // Replace with your Cloudinary cloud name
//           formData
//         );

//         this.setState({ uploadedImage: response.data.secure_url });
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         if (error.response) {
//           console.error('Cloudinary Response:', error.response.data);
//         }
//       }
//     }
//   };

//   handleVideoUpload = async () => {
//     if (this.state.selectedVideo) {
//       const formData = new FormData();
//       formData.append('file', this.state.selectedVideo);
//       formData.append('upload_preset', 'my_upload_preset'); // Replace with your Cloudinary upload preset

//       try {
//         const response = await axios.post(
//           'https://api.cloudinary.com/v1_1/dqtlfgnmh/video/upload', // Replace with your Cloudinary cloud name
//           formData
//         );

//         this.setState({ uploadedVideo: response.data.secure_url });
//       } catch (error) {
//         console.error('Error uploading video:', error);
//       }
//     }
//   };

//   handleImageInputChange = (event) => {
//     this.setState({ selectedImage: event.target.files[0] });
//   };

//   handleVideoInputChange = (event) => {
//     this.setState({ selectedVideo: event.target.files[0] });
//   };

//   render() {
//     return (
//       <div>
//         <h2>Image Upload</h2>
//         <input type="file" accept="image/*" onChange={this.handleImageInputChange} />
//         <button onClick={this.handleImageUpload}>Upload Image</button>

//         {this.state.uploadedImage && (
//           <div>
//             <h3>Uploaded Image:</h3>
//             <Image cloudName="dqtlfgnmh" publicId={this.state.uploadedImage} />
//           </div>
//         )}

//         <h2>Video Upload</h2>
//         <input type="file" accept="video/*" onChange={this.handleVideoInputChange} />
//         <button onClick={this.handleVideoUpload}>Upload Video</button>

//         {this.state.uploadedVideo && (
//           <div>
//             <h3>Uploaded Video:</h3>
//             <Video cloudName="dqtlfgnmh" publicId={this.state.uploadedVideo} />
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// const App = () => (
//   <CloudinaryContext cloudName="dqtlfgnmh"> {/* Replace with your Cloudinary cloud name */}
//     <UploadComponent />
//   </CloudinaryContext>
// );

// export default App;
