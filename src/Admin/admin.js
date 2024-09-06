import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './admin.css';

const socket = io.connect('http://localhost:3001');

function Admin() {
  // State variables
  const [password, setPassword] = useState('');
  const [activeSection, setActiveSection] = useState('login');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogList, setBlogList] = useState([]);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogLink, setBlogLink] = useState('');
  const [videoList, setVideoList] = useState([]);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoContent, setVideoContent] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [devList, setDevList] = useState([]);
  const [devTitle, setDevTitle] = useState('');

  const [photoTitle, setPhotoTitle] = useState('');
  const [photoLink, setPhotoLink] = useState('');
  const [galleryList, setGalleryList] = useState([]);

  const [devLink, setDevLink] = useState('');
  const [devGitLink, setDevGitLink] = useState('');
  const [devSiteLink, setDevSiteLink] = useState('');
  const [image, setImage] = useState(null);

  // Handlers
  const handleClick = () => {
    axios.post('http://localhost:3001/image-upload', image)
      .then(res => {
        console.log('Axios response: ', res);
      });
  };

  const handleFileInput = () => {
    console.log('handleFileInput working!');
  };

  const getFileInfo = (e) => {
    console.log('File info working!');
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append('my-image-file', e.target.files[0], e.target.files[0].name);
    setImage(formData);
  };

  const postVideo = () => {
    socket.emit('postVideo', {
      videoTitle,
      videoContent,
      videoLink,
    });
  };

  const postPhoto = () => {
    socket.emit('postPhoto', {
      photoTitle,
      photoLink,
    });
  };

  const postBlog = () => {
    axios.post('http://localhost:3001/image-upload', image)
      .then(res => {
        console.log('Axios response: ', res);
        socket.emit('postBlog', {
          blogTitle,
          blogLink
        });
      });
  };

  const postDev = () => {
    socket.emit('postDev', {
      devTitle,
      devLink
    });
  };

  useEffect(() => {
    socket.on('adminReturn', (boolean) => {
      setActiveSection(boolean);
    });
  }, []);

  const handlePassword = () => {
    socket.emit('adminCheck', password);
  };

  const makeBlog = () => {
    setActiveSection('makeBlog');
  };

  const deleteBlog = () => {
    setActiveSection('deleteBlog');
    socket.emit('loadBlogPosts');
  };

  const deleteVideo = () => {
    setActiveSection('deleteVideo');
    socket.emit('loadVideoList');
  };

  const makeVideo = () => {
    setActiveSection('makeVideo');
  };

  const makePhoto = () => {
    setActiveSection('makePhoto');
    socket.emit('loadGalleryList');
  };


  const deletePhoto = () => {
    setActiveSection('deletePhoto');
    socket.emit('loadGalleryList');
  };

  const makeDev = () => {
    setActiveSection('makeDev');
  };

  const back = () => {
    setActiveSection('back');
  };

  const deleteDev = () => {
    setActiveSection('deleteDev');
    socket.emit('loadDevList');
  };

  useEffect(() => {
    socket.on('blogPostsReturn', (blogsList) => {
      setBlogList(blogsList);
      console.log(blogsList);
    });

    socket.on('galleryListReturn', (galleryList) => {
      setGalleryList(galleryList);
      console.log(galleryList);
    });

    socket.on('videoListReturn', (videoList) => {
      setVideoList(videoList);
      console.log(videoList);
    });

    socket.on('devListReturn', (devList) => {
      setDevList(devList);
      console.log(devList);
    });
  }, []);

  const handleBlogDelete = (blog) => {
    socket.emit('blogDelete', blog);
  };


  const handlePhotoDelete = (photo) => {
    socket.emit('photoDelete', photo);
  };


  const handleVideoDelete = (video) => {
    socket.emit('videoDelete', video);
  };

  const handleDevDelete = (dev) => {
    socket.emit('devDelete', dev);
  };

  return (
    <div className="Admin">
      {activeSection === 'login' && (
        <div className="Admin__login">
          <input
            type='text'
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button onClick={handlePassword}>Login</button>
        </div>
      )}
      {(activeSection === 'admin' || activeSection === 'back') && (
        <div className="Admin__section">
          <h3>Welcome Ryan Slingerland</h3>
          <button onClick={makeBlog}>Make Blog</button>
          <button onClick={deleteBlog}>Delete Blog</button>
          <button onClick={makeVideo}>Make Video</button>
          <button onClick={deleteVideo}>Delete Video</button>
          <button onClick={makeDev}>Make Dev</button>
          <button onClick={deleteDev}>Delete Dev</button>

          <button onClick={makePhoto}>Post Photo</button>
          <button onClick={deletePhoto}>Delete Photo</button>
          {/* <button onClick={handleClick}>Upload!</button> */}
        </div>
      )}
      {activeSection === 'notAdmin' && (
        <div className="Admin__error">
          <h3>Incorrect admin password - if you are not Ryan Slingerland, please leave.</h3>
        </div>
      )}
      {activeSection === 'makeBlog' && (
        <div className="Admin__form">
          <h3>Make Blog</h3>
          <input
            type='text'
            placeholder="Blog Title"
            value={blogTitle}
            onChange={(event) => setBlogTitle(event.target.value)}
          />
          <input
            type='text'
            placeholder="Github Link"
            value={blogLink}
            onChange={(event) => setBlogLink(event.target.value)}
          />
          {/* <input type="file" onChange={getFileInfo}></input> */}
          <button onClick={back}>Back</button>
          <button onClick={postBlog}>Post</button>
        </div>
      )}
      {activeSection === 'deleteBlog' && (
        <div className="Admin__delete">
          <h3>Delete Blog</h3>
          <ul className="Admin__list blog-list">
            {blogList.map((blog, index) => (
              <li key={index}>
                <button onClick={() => handleBlogDelete(blog)}>{blog.blogTitle}</button>
              </li>
            ))}
          </ul>
          <button onClick={back}>Back</button>
        </div>
      )}
      {activeSection === 'makeVideo' && (
        <div className="Admin__form">
          <h3>Make Video</h3>
          <input
            type='text'
            placeholder="Title"
            value={videoTitle}
            onChange={(event) => setVideoTitle(event.target.value)}
          />
          <input
            type='text'
            placeholder="Content"
            value={videoContent}
            onChange={(event) => setVideoContent(event.target.value)}
          />
          <input
            type='text'
            placeholder="Link"
            value={videoLink}
            onChange={(event) => setVideoLink(event.target.value)}
          />
          <button onClick={back}>Back</button>
          <button onClick={postVideo}>Post</button>
        </div>
      )}
      {activeSection === 'deleteVideo' && (
        <div className="Admin__delete">
          <h3>Delete Video</h3>
          <ul className="Admin__list video-list">
            {videoList.map((video, index) => (
              <li key={index}>
                <button onClick={() => handleVideoDelete(video)}>{video.videoTitle}</button>
              </li>
            ))}
          </ul>
          <button onClick={back}>Back</button>
        </div>
      )}
      {activeSection === 'makeDev' && (
        <div className="Admin__form">
          <h3>Make Dev</h3>
          <input
            type='text'
            placeholder="Title"
            value={devTitle}
            onChange={(event) => setDevTitle(event.target.value)}
          />
          <input
            type='text'
            placeholder="Github Link"
            value={devLink}
            onChange={(event) => setDevLink(event.target.value)}
          />
          <button onClick={back}>Back</button>
          <button onClick={postDev}>Post</button>
        </div>
      )}
      {activeSection === 'deleteDev' && (
        <div className="Admin__delete">
          <h3>Delete Dev</h3>
          <ul className="Admin__list video-list">
            {devList.map((dev, index) => (
              <li key={index}>
                <button onClick={() => handleDevDelete(dev)}>{dev.devTitle}</button>
              </li>
            ))}
          </ul>
          <button onClick={back}>Back</button>
        </div>
      )}



      {activeSection === 'makePhoto' && (
        <div className="Admin__form">
          <h3>Make Photo</h3>
          <input
            type='text'
            placeholder="Photo Title"
            value={photoTitle}
            onChange={(event) => setPhotoTitle(event.target.value)}
          />
          <input
            type='text'
            placeholder="Github Photo Link"
            value={photoLink}
            onChange={(event) => setPhotoLink(event.target.value)}
          />
          {/* <input type="file" onChange={getFileInfo}></input> */}
          <button onClick={back}>Back</button>
          <button onClick={postPhoto}>Post</button>
        </div>
      )}
      {activeSection === 'deletePhoto' && (
        <div className="Admin__delete">
          <h3>Delete Photo</h3>
          <ul className="Admin__list blog-list">
            {galleryList.map((photo, index) => (
              <li key={index}>
                <button onClick={() => handlePhotoDelete(photo)}>{photo.photoTitle}</button>
              </li>
            ))}
          </ul>
          <button onClick={back}>Back</button>
        </div>
      )}
    </div>
  );
}

export default Admin;