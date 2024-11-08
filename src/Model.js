import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const DURATION = 10

const Model = ({ setTargetColor, setIsPlaying, isPlaying, isButtonVisible, setIsButtonVisible }) => {
  // const modelUrl = 'https://raw.githubusercontent.com/amelchabah/glb2/f1a17b628af0f25452eefa687309645075600521/scene2.glb';

  const modelUrl = 'https://raw.githubusercontent.com/amelchabah/glb2/87042d64a047dad9c122a5becf0bbeadc1cf9545/scene3.glb';
  const gltf = useLoader(GLTFLoader, modelUrl, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    loader.setDRACOLoader(dracoLoader);
  });


  const currentTexture = useRef()
  const scene = gltf.scenes[0];
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouse = useRef(new THREE.Vector2());
  const tvVideo = useMemo(() => document.createElement('video'), []);
  const videosMap = useMemo(() => new Map(), []);
  // const tvScreen = scene.getObjectByName("SCREEN001");

  const tvScreen = useMemo(() => {
    const tvScreen = scene.getObjectByName("SCREEN001");
    return tvScreen
  }, [scene]);
  const videosPaths = [
    '/PolitiqueTV.mp4',
    '/EcologieTV.mp4',
    '/MusiqueTV.mp4',
    '/GeopolitiqueTV.mp4',
    '/SportTV.mp4'
  ]
  const tvVideos = useMemo(() => {

    const videos = [
      '/PolitiqueTV.mp4',
      '/EcologieTV.mp4',
      '/MusiqueTV.mp4',
      '/GeopolitiqueTV.mp4',
      '/SportTV.mp4'
    ]

    for (const video of videos) {
      const videoEl = document.createElement('video');
      videoEl.src = video;
      const videoTexture = new THREE.VideoTexture(videoEl);
      videoTexture.flipY = false

      videosMap.set(video, videoTexture)
    }

    const textures = videos.map((src) => {
      const tvVideo = document.createElement('video')
      tvVideo.src = src;
      tvVideo.loop = true;
      tvVideo.muted = false;
      tvVideo.autoplay = true;
      tvVideo.crossOrigin = 'anonymous';
      videosMap.set(src, new THREE.VideoTexture(tvVideo));
      //tvVideo.play().catch(console.error);

      // Crée une texture vidéo et l'applique à l'écran de la TV
      const tvVideoTexture = new THREE.VideoTexture(tvVideo);
      tvVideoTexture.minFilter = THREE.LinearFilter;
      tvVideoTexture.magFilter = THREE.LinearFilter;
      tvVideoTexture.flipY = false;
      tvVideoTexture.wrapS = THREE.MirroredRepeatWrapping;
      tvVideoTexture.repeat.x = -1;
      return tvVideoTexture
    })

    // tvScreen.material = new THREE.MeshBasicMaterial({ map: tvVideoTexture });

    return textures
  }, []);

  const progressPosition = useRef(0)
  const { camera, gl } = useThree();

  function updateTVVideo(index, progressWidth) {
    const texture = tvVideos[index]
    currentTexture.current = texture
    tvScreen.material = new THREE.MeshBasicMaterial({ map: texture });
    tvScreen.material.needsUpdate = true;
    texture.image.play()
  }

  useEffect(() => {
    const progress = document.querySelector('.progress');
    const clickableBar = document.querySelector('.clickable-bar');

    // Initialize videos and textures
    const videos = {
      "Cadre1": { src: '/Rendu - Poster Politique.mp4' },
      "Cadre2": { src: '/PosterEcologie.mp4' },
      "Cadre3": { src: '/PosterMusique.mp4' },
      "Cadre4": { src: '/PosterGeopolitique.mp4' },
      "Cadre5": { src: '/PosterSport.mp4' }
    };

    Object.keys(videos).forEach((key) => {
      const video = document.createElement('video');
      video.src = videos[key].src;
      video.loop = false;
      video.muted = true;
      video.crossOrigin = 'anonymous';
      // video.play().catch(console.error);
      videos[key].video = video;
      videos[key].texture = new THREE.VideoTexture(video);
      videos[key].texture.minFilter = THREE.LinearFilter;
      videos[key].texture.magFilter = THREE.LinearFilter;
      videos[key].texture.wrapS = THREE.RepeatWrapping;
      videos[key].texture.repeat.x = -1;
    });

    // Assign video textures to frames
    scene.traverse((node) => {
      if (videos[node.name]) {
        node.children[1].material = new THREE.MeshStandardMaterial({ map: videos[node.name].texture });
      }

      if (node.name === "TV_Glass002") {
        node.visible = false;
      }

      const tvScreen = scene.getObjectByName("SCREEN001");

      if (tvScreen) {

        // texture is tvsample.mp4
        //const tvVideo = document.createElement('video');
        tvVideo.src = '/tvsample.mp4';
        tvVideo.loop = true;
        tvVideo.muted = true;
        tvVideo.autoplay = true;
        tvVideo.play().catch(console.error);
        tvVideo.crossOrigin = 'anonymous';

        const tvVideoTexture = new THREE.VideoTexture(tvVideo);
        tvVideoTexture.minFilter = THREE.LinearFilter;
        tvVideoTexture.magFilter = THREE.LinearFilter;
        tvVideoTexture.flipY = false;
        tvVideoTexture.wrapS = THREE.MirroredRepeatWrapping;
        tvVideoTexture.repeat.x = -1;

        tvScreen.material = new THREE.MeshBasicMaterial({ map: tvVideoTexture });

      }
    });

    const handlePointerEnter = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse.current, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const firstIntersect = intersects[0].object;

        if (firstIntersect.name === "Cube012_1" || firstIntersect.name === "Cube022_1" || firstIntersect.name === "Cube016_1" || firstIntersect.name === "Cube023_1" || firstIntersect.name === "Cube024_1") {
          document.body.style.cursor = 'pointer';
        } else {
          document.body.style.cursor = 'auto';
        }

        let cadres = ["Cube012_1", "Cube022_1", "Cube016_1", "Cube023_1", "Cube024_1"];
        let cadresVideos = ["Cadre1", "Cadre2", "Cadre3", "Cadre4", "Cadre5"];

        for (let i = 0; i < cadres.length; i++) {
          if (firstIntersect.name === cadres[i]) {
            videos[cadresVideos[i]].texture.image.play();
          } else {
            videos[cadresVideos[i]].texture.image.pause();
          }
        }
      }
    };

    const handlePlayTVVideo = (event) => {

      // quand cette fonction est lancée, passe l'état de isButtonVisible a true
      setIsButtonVisible(true)

      setIsPlaying(!isPlaying);
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse.current, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const firstIntersect = intersects[0].object;
        let cadres = ["Cube012_1", "Cube022_1", "Cube016_1", "Cube023_1", "Cube024_1"];
        let tvVideos = ['/PolitiqueTV.mp4', '/EcologieTV.mp4', '/MusiqueTV.mp4', '/GeopolitiqueTV.mp4', '/SportTV.mp4'];
        let colors = [0xffffff, 0x0000ff, 0x00ff00, 0xff0000, 0xffff00];
        let percentages = [0, 20, 40, 60, 80];

        for (let i = 0; i < cadres.length; i++) {
          if (firstIntersect.name === cadres[i]) {
            console.log(tvVideos[i])
            const clickableBar = document.querySelector('.clickable-bar');
            const clickableBarWidth = clickableBar.offsetWidth;
            progressPosition.current = clickableBarWidth * (percentages[i] / 100);

            const texture = videosMap.get(tvVideos[i])
            texture.flipY = false;
            texture.source.data.currentTime = 0;
            texture.source.data.play()

            tvScreen.material.map.source.data.pause()
            tvScreen.material = new THREE.MeshBasicMaterial({ map: texture });
            setTargetColor(new THREE.Color(colors[i]));
          }
        }
      }
    };
    // Add event listener to the canvas
    const canvas = gl.domElement;
    canvas.addEventListener('pointermove', handlePointerEnter);
    canvas.addEventListener('click', handlePlayTVVideo);

    // Cleanup event listener on unmount
    return () => {
      canvas.removeEventListener('pointermove', handlePointerEnter);
      canvas.removeEventListener('click', handlePlayTVVideo);
    };

  }, [gltf, scene, raycaster, camera, gl.domElement, setTargetColor, tvVideos]);


  useEffect(() => {
    isPlaying ? tvVideo.play() : tvVideo.pause();
    isPlaying ? tvScreen.material.map.source.data.play() : tvScreen.material.map.source.data.pause()
  }, [isPlaying, tvVideo]);

  useFrame(() => {
    const clickableBar = document.querySelector('.clickable-bar');
    const progress = document.querySelector('.progress');

    if (isPlaying) {
      progressPosition.current += 0.5
    }

    const clickableBarWidth = clickableBar.offsetWidth;
    const progressPercentage = (progressPosition.current / clickableBarWidth) * 100;

    if (progressPercentage >= 100) {
      tvScreen.material.map.source.data.pause()
    }
    progress.style.width = `${progressPercentage}%`;

    // if (progressPercentage between 0 and 20) => updateTVVideo(0, progressWidth)
    // if (progressPercentage >= 0.1 && progressPercentage < 20) {
    //   updateTVVideo(0, progressPercentage)
    //   // set target color to white
    // } else if (progressPercentage >= 20 && progressPercentage < 40) {
    //   updateTVVideo(1, progressPercentage)
    // } else if (progressPercentage >= 40 && progressPercentage < 60) {
    //   updateTVVideo(2, progressPercentage)
    // }
    // else if (progressPercentage >= 60 && progressPercentage < 80) {
    //   updateTVVideo(3, progressPercentage)
    // }
    // else if (progressPercentage >= 80 && progressPercentage < 100) {
    //   updateTVVideo(4, progressPercentage)
    // }

  })

  return <primitive object={scene} position={[11, -2, 0]} />;
};

const CameraController = () => {
  const { camera } = useThree();
  const cameraRef = useRef({ x: 0, y: 0, z: 0 });

  const handleMouseMove = (event) => {
    const z = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 - 1;
    cameraRef.current = { z, y };
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    camera.position.y += (cameraRef.current.y * 0.2 - camera.position.y) * 0.05;
    camera.position.z += (cameraRef.current.z * -0.2 - camera.position.z) * 0.05;
  });

  return null;
};

const Scene = () => {
  const [ambientLightColor, setAmbientLightColor] = useState(new THREE.Color(0xFFFFFF));
  const [targetColor, setTargetColor] = useState(new THREE.Color('white'));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      ambientLightColor.lerp(targetColor, 0.05);
      setAmbientLightColor(ambientLightColor.clone());
    }, 16); // Approx. 60 FPS (16 ms)

    return () => clearInterval(interval);
  }, [ambientLightColor, targetColor]);

  // onhover of image, opacity info box to 1
  useEffect(() => {
    const info = document.querySelector('.info');
    const infoBox = document.querySelector('.info-box');

    info.addEventListener('mouseover', () => {
      infoBox.style.opacity = '1';
    }
    );

    info.addEventListener('mouseout', () => {
      infoBox.style.opacity = '0';
    }
    );

  }, []);

  const onClick = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      <div className='clickable-bar'>
        <div className='progress-bar'>
          <div className='progress' />
        </div>
      </div>

      <div className='controls'>
        {
          isButtonVisible && (
            <button onClick={onClick}>
              {
                isPlaying ? (
                  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 47.607 47.607">
                    <g>
                      <path d="M17.991,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C4.729,2.969,7.698,0,11.36,0
		l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z"/>
                      <path d="M42.877,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631
		C29.616,2.969,32.585,0,36.246,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z"/>
                    </g>
                  </svg>
                ) : (
                  <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M852.727563 392.447107C956.997809 458.473635 956.941389 565.559517 852.727563 631.55032L281.888889 993.019655C177.618644 1059.046186 93.090909 1016.054114 93.090909 897.137364L93.090909 126.860063C93.090909 7.879206 177.675064-35.013033 281.888889 30.977769L852.727563 392.447107 852.727563 392.447107Z" /></svg>

                )
              }
            </button>
          )
        }
      </div>
      <div className='frameoverlay'>
        <div className='overlaytop'>
          <h1>2024TV</h1>
          <svg className='info' height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path className="ytp-svg-fill" d="M18,8 C12.47,8 8,12.47 8,18 C8,23.52 12.47,28 18,28 C23.52,28 28,23.52 28,18 C28,12.47 23.52,8 18,8 L18,8 Z M17,16 L19,16 L19,24 L17,24 L17,16 Z M17,12 L19,12 L19,14 L17,14 L17,12 Z" id="ytp-id-14"></path></svg>
          <div className='info-box'>
            <p>Hover posters and click on them to switch channels</p>
          </div>
        </div>
        <div className='overlaybottom'></div>
      </div>

      <Canvas camera={{ position: [16, -1, 0], fov: 30 }}>
        <ambientLight intensity={1} color={ambientLightColor} />
        <directionalLight position={[50, 90, 10]} intensity={1.5} />
        <Suspense fallback={null}>
          <Model setTargetColor={setTargetColor} setIsPlaying={setIsPlaying} isPlaying={isPlaying} isButtonVisible={isButtonVisible} setIsButtonVisible={setIsButtonVisible} />
        </Suspense>
        <CameraController />
      </Canvas>
    </>
  );

};

export default Scene;
