import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';
import Admin from './Admin/admin';
// import ryan from'./Portraits/Portrait-26.png';
import ryan from'./Portraits/Portrait-23.png';
import drone1 from'./drone.jpeg';
import drone2 from'./drone2.jpeg';
import drone3 from'./drone3.jpeg';


// import Lottie from 'lottie-react';
// import animationBlog from './Animation2.json';
// import animation404 from './404Animation.json';
// import axios from 'axios';


const socket = io.connect("http://localhost:3001");

function App() {
  //useState to change the screen (basically runs the nav bar)
  const [activeSection, setActiveSection] = useState('home');

  //useState to store the list of blogs while loading the blog page
  const [blogList, setBlogList] = useState([]);

  //useState to store the one blog clicked on
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedDev, setSelectedDev] = useState(null);

  const [videoList, setVideoList] = useState([]);

  const [devList, setDevList] = useState([]);

  const [galleryList, setGalleryList] = useState([]);

  const [selectedBlogHtml, setSelectedBlogHtml] = useState('');

  const [siteVisits, setSiteVisits] = useState(0);


  //CONST HANDLING
  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 'blog' || section === 'vidProjects' || section === 'devProjects') {
      setSelectedBlog(null); // Reset selected blog when navigating to blog section
      setSelectedVideo(null); // Reset selected video when navigating to video section
      setSelectedDev(null); // Reset selected dev when navigating to dev section
    }
  };

  const handleBlogClick = (blog) => {
    // setSelectedBlog(blog);
    // console.log(selectedBlog);
    window.location.href = blog.blogLink;
  };

  const handleBlogBackgroundClick = () => {
    if (selectedBlog) {
      setSelectedBlog(null); // Deselect the blog when clicking on the background
    }
  };

  const handleDevBackgroundClick = () => {
    if (selectedDev) {
      setSelectedDev(null); // Deselect the blog when clicking on the background
    }
  };

  const handleVidBackgroundClick = () => {
    if (selectedVideo) {
      setSelectedVideo(null); // Deselect the blog when clicking on the background
    }
  };


  const handlePhotoBackgroundClick = () => {
    if (selectedPhoto) {
      setSelectedPhoto(null); // Deselect the blog when clicking on the background
    }
  };

  


  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };


  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    console.log(selectedVideo);
  };

  const handleDevClick = (dev) => {
    // setSelectedDev(dev);
    // console.log(selectedDev);
    window.location.href = dev.devLink;
  };

  const getVideoId = (url) => {
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/);
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  const getThumbnailUrl = (videoLink) => {
    const videoId = getVideoId(videoLink);
    return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : null;
  };


  
  const getThumbnailBlog = (blogLink) => {
    console.log(blogLink);
    const lastSlashIndex = blogLink.lastIndexOf('/');
    console.log(lastSlashIndex);
    const baseLink = blogLink.substring(0, lastSlashIndex);
    console.log(baseLink);
    return `${baseLink}/thumbnail.jpg`;
  };

  const getThumbnailDev = (devLink) => {
    console.log(devLink);
    const lastSlashIndex = devLink.lastIndexOf('/');
    console.log(lastSlashIndex);
    const baseLink = devLink.substring(0, lastSlashIndex);
    console.log(baseLink);
    return `${baseLink}/thumbnail.jpg`;
  };

  
  //EFFECTS - socket.on and socket.emit

  useEffect(() => {
    document.body.classList.toggle('home', activeSection === 'home');
    if (activeSection === 'home') {
      socket.emit('loadBlogPosts');
      socket.emit('loadGallery');
      socket.emit('loadSiteVisits');
    }
  }, [activeSection]);

  useEffect(() => {
    socket.on('returnSiteVisits', (siteVisits) => {
      setSiteVisits(siteVisits);
      console.log(siteVisits);
    });
  }, [activeSection]);

  useEffect(() => {
    document.body.classList.toggle('home', activeSection === 'home');
    if (activeSection === 'blog') {
      socket.emit('loadBlogPosts');
    }
  }, [activeSection]);

  useEffect(() => {
    document.body.classList.toggle('home', activeSection === 'home');
    if (activeSection === 'vidProjects') {
      socket.emit('loadVideoList');
    }
  }, [activeSection]);

  useEffect(() => {
    document.body.classList.toggle('home', activeSection === 'home');
    if (activeSection === 'devProjects') {
      socket.emit('loadDevList');
    }
  }, [activeSection]);

  useEffect(() => {
    socket.on('blogPostsReturn', (blogsList) => {
      setBlogList(blogsList);
      console.log(blogsList);
    });
  }, []);


  useEffect(() => {
    socket.on('galleryReturn', (galleryList) => {
      setGalleryList(galleryList);
      console.log(galleryList);
    });
  }, []);


  useEffect(() => {
    socket.on('videoListReturn', (videoList) => {
      setVideoList(videoList);
      console.log(videoList);
    });
  }, []);

  useEffect(() => {
    socket.on('devListReturn', (devList) => {
      setDevList(devList);
      console.log(devList);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  //html return
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

          <div>
          {/* <h4 className="lifesMotto">To see the world, things dangerous to come to, to see behind walls, to draw closer, to find each other, and to feel, that is the purpose of life</h4> */}
          </div>
        
          {!selectedPhoto ? (
            <div className='gallery-div'>
              <ul className="gallery-list">
               {galleryList.slice().reverse().map((photo, index) => (
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
            <div className="gallery-content" onClick={handlePhotoBackgroundClick}>
              <h3>{selectedPhoto.photoTitle}</h3>
              <img src={selectedPhoto.photoLink}/>
            </div>
          )}



          <div className='home-container-2'>
            <div className='home-counter'>
              <p> <strong>Site Visits: </strong>{siteVisits}</p>
            </div>
            <div className='paragraph-1'>
              <h1>This is not a normal portfolio.</h1>
              <p>
                What makes this website so special, you ask? Welll justtt holldddd up, I’m getting there.
                <br></br>
                <br></br>
                First off, this isn’t just a static HTML page. It features a fully functional back-end server setup, designed to provide the front end with a modular design. This means the site can be updated and expanded without needing to be officially rebuilt or re-uploaded to a hosting provider.
                <br></br>
                <br></br>
                For instance, on a statically hosted site, any new update must be repackaged and pushed to the hosting service for changes to take effect. However, with my site, a quick login through the admin portal grants access to various options for adding or removing content.
                <br></br>
                <br></br>
                Despite this taking 20x longer to create, there were two main reasons for the extra effort:
            
              </p>
              <ol>
                <li>To enable the addition of new projects and videos more regularly without needing to program each update into the site (this will save me so much effort over time).</li>
                <li>Because it’s freaking awesome.</li>
              </ol>
            </div>
          </div>
          <hr className='home-hr-2'></hr>
          <div className="home-container-3">
            <div className='paragraph-2'>
              <h1>Modulation with react.js and socket.io.</h1>
              <p>The admin portal of this site is a powerful tool that allows seamless communication with the server, enabling dynamic updates that are instantly reflected to all users. Here's how it works:</p>
    
              <h4>Adding New Content</h4>
              <p>The admin portal provides options to add various types of content:</p>
              <ul>
                  <li>Development Projects</li>
                  <li>Video Projects</li>
                  <li>Blogs</li>
              </ul>
              <p>Upon selecting a content type, you'll be prompted to enter specific details, such as:</p>
              <ul>
                  <li>Title</li>
                  <li>Content (if applicable)</li>
                  <li>Link (GitHub Pages for development projects/blogs, YouTube for video projects)</li>
              </ul>
              <p>The GitHub link typically points to a static HTML page that hosts the actual blog or project. This setup allows for easy integration of GitHub-hosted projects into the site without needing to update the site’s codebase.</p>
              
              <h4>Data Processing and Storage</h4>
              <p>Once the data is entered, it is sent to the server and stored in a JSON file, each entry tagged with a unique ID. This method ensures all content is centrally managed and easily retrievable.</p>
              
              <h4>Client-Side Data Display</h4>
              <p>When users load the site, a request is made to retrieve the data from the JSON file on the server. The received data is processed and displayed on the site. For each GitHub or YouTube link, the corresponding thumbnail image is fetched and displayed, providing a visual preview.</p>
              <p>This system ensures that updates are:</p>
              <ul>
                  <li><strong>Real-Time</strong>: Changes made through the admin portal are immediately visible to all users.</li>
                  <li><strong>Efficient</strong>: Projects and content can be added without redeploying the entire site.</li>
              </ul>
              <p>The combination of React.js and Socket.IO makes this possible, creating a dynamic and modular site that is both user-friendly and easy to maintain.</p>
            </div>
            <div className='drone-stack'>
              <img className='home-drone' src={drone1} alt="fireSpot" />
              <img className='home-drone' src={drone2} alt="fireSpot" />
              <img className='home-drone' src={drone3} alt="fireSpot" />
            </div>
          </div>
          <div className="admin-button">
              <p>Ryan Slingerland / ryanjslingerland@gmail.com / <button onClick={() => handleSectionChange('admin')}>admin</button></p>
          </div>
          <hr className='home-hr-2'></hr>
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
              PS - if you want to know how I made the site you are on right now, you can click the first blog down below.
              <br /><br />
              Contact Information:
              <br />
              ryanjslingerland@gmail.com
              <br />
              www.instagram.com/ryan__slingerland
              {/* <a className='links' href="https://instagram.com/ryan__slingerland">My Instagram</a>
              <br />
              <a className='links' href="https://github.com/ryanslingerland1">My Github</a> */}
              <br />
              www.github.com/ryanslingerland1
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

      {/* ADMIN */}
      {activeSection === 'admin' && (
        <Admin socket={socket} />
      )}
    </div>
  );
}

export default App;
