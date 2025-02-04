document.addEventListener("DOMContentLoaded", () => {
  console.log("Dokumen HTML sudah dimuat dan DOM sudah siap!");

  const slidesData = [
    {
      img: "https://swiperjs.com/demos/images/nature-1.jpg",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "Sunrise Over the Mountains",
      content: "The golden rays of the sun illuminate the peaks, creating a breathtaking view.",
    },
    {
      img: "https://swiperjs.com/demos/images/nature-2.jpg",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "Serene Lake Reflection",
      content: "A tranquil lake mirrors the sky, offering a moment of peace and relaxation.",
    },
    {
      img: "https://swiperjs.com/demos/images/nature-3.jpg",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "Misty Forest Path",
      content: "A foggy morning in the woods, where the path ahead is full of mystery.",
    },
    {
      img: "https://swiperjs.com/demos/images/nature-4.jpg",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "Autumn Leaves in Motion",
      content: "Vibrant fall foliage swirls in the wind, painting the ground with warm colors.",
    },
    {
      img: "https://swiperjs.com/demos/images/nature-5.jpg",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "Ocean Waves at Sunset",
      content: "Waves gently crash against the shore as the sun sets in a blaze of color.",
    },
    {
      img: "https://swiperjs.com/demos/images/nature-4.jpg",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "Autumn Leaves in Motion",
      content: "Vibrant fall foliage swirls in the wind, painting the ground with warm colors.",
    },
    {
      img: "https://swiperjs.com/demos/images/nature-5.jpg",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "Ocean Waves at Sunset",
      content: "Waves gently crash against the shore as the sun sets in a blaze of color.",
    },
  ];

  // Select the wrapper where slides will be inserted
  const swiperWrapper = document.getElementById("swiper-wrapper");

  // slidesData.forEach((slide) => {
  //   const slideElement = document.createElement("div");
  //   slideElement.classList.add("swiper-slide");

  //   const imgElement = document.createElement("img");
  //   imgElement.src = slide.img;

  //   slideElement.appendChild(imgElement);
  //   swiperWrapper.appendChild(slideElement);
  // });

  slidesData.forEach((slide, index) => {
    const slideElement = document.createElement("div");
    slideElement.classList.add("swiper-slide");

    const videoElement = document.createElement("video");
    videoElement.src = slide.video;
    videoElement.preload = "metadata";
    videoElement.autoplay = true; // Enable autoplay
    videoElement.loop = true; // Enable looping
    videoElement.muted = true; // Mute the video
    videoElement.controls = false; // Remove video controls (play/pause, volume, etc.)

    slideElement.appendChild(videoElement);
    swiperWrapper.appendChild(slideElement);
  });

  function getCenterSlide(swiper) {
    // Get the center slide element
    let centerSlide = swiper.slides[swiper.activeIndex];

    // Extract image src or any other content
    let imageSrc = centerSlide.querySelector("img")?.src;

    // Update the title and content
    generateTitleContent(slidesData[swiper.activeIndex].title, slidesData[swiper.activeIndex].content);
    updateActiveNumber(swiper.activeIndex + 1);

    console.log("Center Slide Index:", swiper.activeIndex);
    console.log("Center Slide Image:", imageSrc);
  }

  const swiper = new Swiper(".mySwiper", {
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 2, // Ensure three items are shown
    spaceBetween: 20, // Adjust spacing between slides if needed
    autoplay: {
      delay: 5000, // Auto-slide every 3 seconds
      disableOnInteraction: false, // Keep autoplay after user interaction
    },
    pagination: false,

    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
    on: {
      slideChange: function () {
        updateProgressBar(this);
        getCenterSlide(this);
      },
      slideChangeTransitionEnd: function () {
        document.querySelectorAll(".swiper-slide").forEach((slide) => {
          slide.classList.remove("active-slide");
        });

        // Add active-slide class to the current active slide
        document.querySelector(".swiper-slide-active").classList.add("active-slide");
      },
    },
  });

  function updateProgressBar(swiper) {
    let progressBar = document.querySelector(".swiper-progress-bar");

    // Get the actual number of unique slides
    // let totalSlides = swiper.slides.length - swiper.loopedSlides * 2;
    let totalSlides = swiper.slides.length;

    // Ensure realIndex is always within valid range
    let clampedIndex = Math.min(swiper.realIndex, totalSlides - 1);

    // Calculate progress, ensuring it stays between 0% - 100%
    let progress = (clampedIndex / (totalSlides - 1)) * 100;
    progress = Math.min(Math.max(progress, 0), 100); // Clamp between 0 - 100

    progressBar.style.width = `${progress}%`;

    console.log("Progress:", progress);
  }

  // Initialize the progress bar on load
  updateProgressBar(swiper);

  function generateTitleContent(title, content) {
    const titleContent = document.getElementById("title-content");
    titleContent.innerHTML = `
        <div class="title-wrapper">
          <h2>${title}</h2>
          <p>${content}</p>
        </div
        `;
  }

  function updateActiveNumber(number) {
    const activeNumber = document.getElementById("active-number");
    activeNumber.textContent = `${number}`;
  }
});
