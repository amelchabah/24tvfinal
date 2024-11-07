import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const Model = ({ setTargetColor }) => {
  const modelUrl = 'https://raw.githubusercontent.com/amelchabah/glbfile/3e7a1b4dc4fb3f1f72d649cbade7ad3206d2f21a/untitled1.glb';
  const gltf = useLoader(GLTFLoader, modelUrl, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    loader.setDRACOLoader(dracoLoader);
  });

  const scene = gltf.scenes[0];
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouse = useRef(new THREE.Vector2());

  const { camera, gl } = useThree();


  useEffect(() => {
    const progress = document.querySelector('.progress');
    const clickableBar = document.querySelector('.clickable-bar');



    clickableBar.addEventListener('click', (event) => {
      const clickPosition = event.clientX;
      const clickableBarWidth = clickableBar.offsetWidth;
      const progressPercentage = (clickPosition / clickableBarWidth) * 100;

      if (progressPercentage >= 0 && progressPercentage <= 10) {
        progress.style.width = '0%';
        // change tv screen to cadre1 video

        tvVideo.src = '/PolitiqueTV.mp4';
        tvVideo.loop = true;
        tvVideo.muted = false;
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
      } else if (progressPercentage > 10 && progressPercentage <= 30) {
        progress.style.width = '20%';

        tvVideo.src = '/SportTV.mp4';
        tvVideo.loop = true;
        tvVideo.muted = false;
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

      } else if (progressPercentage > 30 && progressPercentage <= 50) {
        progress.style.width = '40%';

        tvVideo.src = '/MusiqueTV.mp4';
        tvVideo.loop = true;
        tvVideo.muted = false;
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

      } else if (progressPercentage > 50 && progressPercentage <= 70) {
        progress.style.width = '60%';

        tvVideo.src = '/EcologieTV.mp4';
        tvVideo.loop = true;
        tvVideo.muted = false;
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
      } else if (progressPercentage > 70 && progressPercentage <= 90) {
        progress.style.width = '80%';

        tvVideo.src = '/GeopolitiqueTV.mp4';
        tvVideo.loop = true;
        tvVideo.muted = false;
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

      } else {
        progress.style.width = '100%';
      }
    }
    );



    // Initialize videos and textures
    const videos = {
      "Cadre1": { src: '/PolitiqueTV.mp4' },
      "Cadre2": { src: '/SportTV.mp4' },
      "Cadre3": { src: '/MusiqueTV.mp4' },
      "Cadre4": { src: '/EcologieTV.mp4' },
      "Cadre5": { src: '/GeopolitiqueTV.mp4' }
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
        const texture = new THREE.TextureLoader().load('/cat.jpg');
        tvScreen.material = new THREE.MeshBasicMaterial({ map: texture });
        tvScreen.material.map.flipY = false;
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
    const tvScreen = scene.getObjectByName("SCREEN001");
    const tvVideo = document.createElement('video');

    const handlePlayTVVideo = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse.current, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const firstIntersect = intersects[0].object;

        let cadres = ["Cube012_1", "Cube022_1", "Cube016_1", "Cube023_1", "Cube024_1"];
        let tvVideos = ["/PolitiqueTV.mp4", "/SportTV.mp4", "/MusiqueTV.mp4", "/EcologieTV.mp4", "/GeopolitiqueTV.mp4"];
        let colors = [0xffff00, 0xff0000, 0x00ff00, 0x0000ff, 0xff00ff];

        for (let i = 0; i < cadres.length; i++) {
          if (firstIntersect.name === cadres[i]) {

            tvVideo.src = tvVideos[i];
            tvVideo.loop = true;
            tvVideo.muted = false;
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

            setTargetColor(new THREE.Color(colors[i]));
          }
        }
      }
    }

    // Add event listener to the canvas
    const canvas = gl.domElement;
    canvas.addEventListener('pointermove', handlePointerEnter);
    canvas.addEventListener('click', handlePlayTVVideo);

    // Cleanup event listener on unmount
    return () => {
      canvas.removeEventListener('pointermove', handlePointerEnter);
      canvas.removeEventListener('click', handlePlayTVVideo);
    };
  }, [gltf, scene, raycaster, camera, gl.domElement, setTargetColor]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      ambientLightColor.lerp(targetColor, 0.05);
      setAmbientLightColor(ambientLightColor.clone());

    }, 16); // Approx. 60 FPS (16 ms)

    return () => clearInterval(interval);
  }, [ambientLightColor, targetColor]);

  return (
    <>
      <div className='clickable-bar'>
        <div className='progress-bar'>
          <div className='progress' />
        </div>
      </div>

      <div className='frameoverlay'>
        <div className='overlaytop'></div>
        <div className='overlaybottom'></div>
      </div>

      <Canvas camera={{ position: [16, -1, 0], fov: 38 }}>
        <ambientLight intensity={0.9} color={ambientLightColor} />
        <directionalLight position={[50, 30, 50]} intensity={1} />
        <Suspense fallback={null}>
          <Model setTargetColor={setTargetColor} />
        </Suspense>
        <CameraController />
      </Canvas>
    </>
  );

};

export default Scene;
