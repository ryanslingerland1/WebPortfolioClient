import React, { useState, useEffect } from 'react';
import './index.css';
import ryan from './Portraits/Portrait-23.png';

import blogList from '/Users/ryanslingerland/Documents/Brock/Github/WebPortfolioClient/src/json/blogs.json';
import devList from '/Users/ryanslingerland/Documents/Brock/Github/WebPortfolioClient/src/json/dev.json';
import gallery from '/Users/ryanslingerland/Documents/Brock/Github/WebPortfolioClient/src/json/gallery.json';
import videoList from '/Users/ryanslingerland/Documents/Brock/Github/WebPortfolioClient/src/json/videos.json';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedDev, setSelectedDev] = useState(null);
  const [siteVisits, setSiteVisits] = useState(0);

  useEffect(() => {
    document.body.classList.toggle('home', activeSection === 'home');
    if (activeSection === 'home') {
      loadSiteVisits();
    }
  }, [activeSection]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 'blog' || section === 'vidProjects' || section === 'devProjects') {
      setSelectedBlog(null);
      setSelectedVideo(null);
      setSelectedDev(null);
    }
  };

  const handleBlogClick = (blog) => {
    window.location.href = blog.blogLink;
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleDevClick = (dev) => {
    window.location.href = dev.devLink;
  };

  const getThumbnailUrl = (videoLink) => {
    const videoId = videoLink.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/);
    return videoId ? `https://img.youtube.com/vi/${videoId[1]}/0.jpg` : null;
  };

  const replacePhotoSize = (photoLink) => {
    return photoLink.replace('WebsitePhotosSmall', 'WebsitePhotosLarge');
  };

  const getThumbnailBlog = (blogLink) => {
    const lastSlashIndex = blogLink.lastIndexOf('/');
    console.log(lastSlashIndex);
    const baseLink = blogLink.substring(0, lastSlashIndex);
    console.log(baseLink);
    return `${baseLink}/thumbnail.jpg`;
  };

  const getThumbnailDev = (devLink) => {
    const lastSlashIndex = devLink.lastIndexOf('/');
    console.log(lastSlashIndex);
    const baseLink = devLink.substring(0, lastSlashIndex);
    console.log(baseLink);
    return `${baseLink}/thumbnail.jpg`;
  };

  const handleVidBackgroundClick = () => {
    setSelectedVideo(null);
  };

  const loadSiteVisits = () => {
    const visits = 0;
    setSiteVisits(visits);
  };

  return (
    <div className="App">
      {/* NAVBAR */}
      <header className="App-header">
        <nav>
          <a href="#home" onClick={() => handleSectionChange('home')}>Home</a>
          <a href="#devProjects" onClick={() => handleSectionChange('devProjects')}>Development Projects</a>
          <a href="#vidProjects" onClick={() => handleSectionChange('vidProjects')}>Video Projects</a>
          <a href="#blog" onClick={() => handleSectionChange('blog')}>Blog</a>
        </nav>
      </header>

      {/* HOME */}
      {activeSection === 'home' && (
        <section id="home" className="section">
          <div className="home-container-1">
            <div className="ryanPng">
              <img src={ryan} alt="fireSpot" />
            </div>
            <div className="home-main">
              <h2 className="home-name">Ryan Slingerland</h2>
              <p className="home-text">
                Welcome to my portfolio! I'm Ryan Slingerland, a 19-year-old Computer Science student. I am a passionate developer dedicated to creating innovative digital solutions. With a strong foundation in web technologies and a knack for problem-solving, I thrive on turning ideas into reality through clean, efficient code.
                <br /><br />
                Beyond programming, I have a keen interest in video production, where storytelling meets technical prowess. Off-screen, you might find me on the volleyball court, enjoying the blend of strategy and teamwork.
                <br /><br />
                Explore my projects and let's connect to discuss how we can bring your next idea to life!
              </p>
            </div>
          </div>
          <hr className='home-hr-1'></hr>
          <hr className='home-hr-2'></hr>

          {!selectedPhoto ? (
            <div className='gallery-div'>
              <ul className="gallery-list">
                {gallery.slice().reverse().map((photo, index) => (
                  <li key={index}>
                    <button className="gallery-button" onClick={() => handlePhotoClick(photo)}>
                      <div className="gallery-thumbnail">
                        <img src={photo.photoLink} alt={photo.photoTitle} />
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="gallery-content" onClick={() => setSelectedPhoto(null)}>
              <p><strong>{selectedPhoto.photoTitle}</strong></p>
              <img src={replacePhotoSize(selectedPhoto.photoLink)} alt={selectedPhoto.photoTitle} />
              <p>(click image to go back)</p>
            </div>
          )}

          <hr className='home-hr-2'></hr>
          <div className='home-container-2'>
            <div className='paragraph-1'>
              <p>
                Ryan Slingerland /
                <a href="mailto:ryanjslingerland@gmail.com">ryanjslingerland@gmail.com</a> /
                <a href="https://www.linkedin.com/in/ryanslingerland/"> LinkedIn</a> /
                <a href="https://github.com/ryanslingerland1"> Github</a> /
                <a href="https://www.instagram.com/ryan__slingerland/"> Instagram</a> /
                <a href="https://www.youtube.com/@ryanslingerland"> YouTube</a>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* BLOG */}
      {activeSection === 'blog' && (
        <section id="blog" className="section">
          <div className="blog-text-div">
            <p className="blog-text">
              Welcome to my blog! This is where I share stories and ideas from my experience in coding, 
              development, and video production. Whether I’m working on a cool project, discovering new tech, 
              or just having fun with video editing, I’m excited to share it all with you. 
              Thanks for stopping by—grab a drink, get comfy, and enjoy the ride!
              <br /><br />
              PS - THIS PART OF THE SITE IS CURRENTLY UNDER CONSTRUCTION.
            </p>
          </div>
            <hr></hr>
            <div className='blog-list-div'>
              <ul className="blog-list">
              {blogList.slice().reverse().map((blog, index) => (
                <li key={index}>
                  <button className="video-button" onClick={() => handleBlogClick(blog)}>
                    <div className="cropped-thumbnail">
                      <img src={getThumbnailBlog(blog.blogLink)} alt={blog.blogTitle} />
                    </div>
                    <div className="video-title">{blog.blogTitle}</div>
                  </button>
                </li>
              ))}
              </ul>
            </div>
        </section>
      )}

      {/* VIDEO PROJECTS */}
      {activeSection === 'vidProjects' && (
        <section id="vidProjects" className="section">
          <div className="blog-text-div">
            <p className="blog-text">
            Welcome to my video projects page! Here, you'll get a glimpse into my passion for capturing life's moments on film. Whether it's documenting my travel adventures, creating engaging content, or filming unforgettable wedding days, I love bringing stories to life through video. Dive in and explore my work, and join me on this visual journey!
            </p>
          </div>
          <hr></hr>
          {!selectedVideo ? (
            <div className='vidProjects-list-div'>
              <ul className="vidProjects-list">
               {videoList.slice().reverse().map((video, index) => (
                <li key={index}>
                  <button className="video-button" onClick={() => handleVideoClick(video)}>
                    <div className="cropped-thumbnail">
                      <img src={getThumbnailUrl(video.videoLink)} alt={video.videoTitle} />
                    </div>
                    <div className="video-title">{video.videoTitle}</div>
                  </button>
                </li>
              ))}
              </ul>
            </div>
          ) : (
            <div className="video-content" onClick={handleVidBackgroundClick}>
              <h3>{selectedVideo.videoTitle}</h3>
              <p>{selectedVideo.videoContent}</p>
              <iframe width="960" height="540" src={selectedVideo.videoLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          )}
        </section>
      )}

      {/* DEV PROJECTS */}
      {activeSection === 'devProjects' && (
        <section id="blog" className="section">
          <div className="blog-text-div">
            <p className="blog-text">
              Welcome to my development projects page! Here, you'll find a collection of my work showcasing my technical programming skills in Java, including 2D arrays, doubly linked lists, binary search, and exception handling. I also work with Python on projects involving GPIO libraries, robotics, physical sensors, and the Twitter API. Additionally, I have experience with React.js and web frameworks like Spring Boot, Vaadin, HTML, CSS, and JavaScript. Dive in and see what I've been building!
              <br /><br />
              PS - THIS PART OF THE SITE IS CURRENTLY UNDER CONSTRUCTION.
            </p>
          </div>
          <hr></hr>
            <div className='blog-list-div'>
              <ul className="blog-list">
              {devList.slice().reverse().map((dev, index) => (
                <li key={index}>
                  <button className="video-button" onClick={() => handleDevClick(dev)}>
                    <div className="cropped-thumbnail">
                      <img src={getThumbnailDev(dev.devLink)} alt={dev.devTitle} />
                    </div>
                    <div className="video-title">{dev.devTitle}</div>
                  </button>
                </li>
                ))}
              </ul>
            </div>
        </section>
      )}
    </div>
  );
}

export default App;
