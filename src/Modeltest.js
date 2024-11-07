import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const Model = () => {
  // const gltf = useLoader(GLTFLoader, '/untitled1.glb', (loader) => {
  // https://github.com/amelchabah/glbfile/blob/3e7a1b4dc4fb3f1f72d649cbade7ad3206d2f21a/untitled1.glb

  const modelUrl = 'https://raw.githubusercontent.com/amelchabah/glbfile/3e7a1b4dc4fb3f1f72d649cbade7ad3206d2f21a/untitled1.glb';  // Correct raw URL
  const gltf = useLoader(GLTFLoader, modelUrl, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    loader.setDRACOLoader(dracoLoader);
  });

  // const gltf = useLoader(GLTFLoader, modelUrl);



  const scene = gltf.scenes[0];
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouse = useRef(new THREE.Vector2());

  // Extract camera and gl (renderer) from useThree at the top level of the component
  const { camera, gl } = useThree();

  useEffect(() => {
    // Initialize videos and textures
    const videos = {
      "Cadre1": { src: 'posterpolitique.mp4' },
      "Cadre2": { src: 'Sport.mp4' },
      "Cadre3": { src: 'example.mp4' },
      "Cadre4": { src: 'example2.mp4' },
      "Cadre5": { src: 'example3.mp4' },
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

      // const tvScreen = scene.getObjectByName("SCREEN001");
      // console.log(tvScreen);
      // if (tvScreen) {
      //   const tvVideo = document.createElement('video');
      //   tvVideo.src = '/Sport.mp4';
      //   tvVideo.loop = true;
      //   tvVideo.muted = true;
      //   tvVideo.autoplay = true;
      //   tvVideo.crossOrigin = 'anonymous';

      //   const tvVideoTexture = new THREE.VideoTexture(tvVideo);
      //   tvVideoTexture.minFilter = THREE.LinearFilter;
      //   tvVideoTexture.magFilter = THREE.LinearFilter;
      //   // tvVideoTexture.flipY = false;
      //   tvVideoTexture.wrapS = THREE.RepeatWrapping;
      //   tvVideoTexture.repeat.x = -1;

      //   tvScreen.material = new THREE.MeshBasicMaterial({ map: tvVideoTexture });         
      // }
    });

    // Raycaster to detect clicks on frames
    const handlePointerEnter = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse.current, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const firstIntersect = intersects[0].object;

        if (firstIntersect.name === "Cube012_1") {
          videos["Cadre1"].texture.image.play();
        } else {
          videos["Cadre1"].texture.image.pause();
        }

        if (firstIntersect.name === "Cube022_1") {
          videos["Cadre2"].texture.image.play();
        } else {
          videos["Cadre2"].texture.image.pause();
        }

        if (firstIntersect.name === "Cube016_1") {
          videos["Cadre3"].texture.image.play();
        } else {
          videos["Cadre3"].texture.image.pause();
        }

        if (firstIntersect.name === "Cube023_1") {
          videos["Cadre4"].texture.image.play();
        } else {
          videos["Cadre4"].texture.image.pause();
        }

        if (firstIntersect.name === "Cube024_1") {
          videos["Cadre5"].texture.image.play();
        } else {
          videos["Cadre5"].texture.image.pause();
        }


      }
    };


    const handlePlayTVVideo = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse.current, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const firstIntersect = intersects[0].object;

        if (firstIntersect.name === "Cube012_1") {
          const tvScreen = scene.getObjectByName("SCREEN001");
          const tvVideo = document.createElement('video');

          tvVideo.src = '/posterpolitique.mp4';
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

        if (firstIntersect.name === "Cube022_1") {
          const tvScreen = scene.getObjectByName("SCREEN001");
          const tvVideo = document.createElement('video');

          tvVideo.src = '/Sport.mp4';
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

        if (firstIntersect.name === "Cube016_1") {
          const tvScreen = scene.getObjectByName("SCREEN001");
          const tvVideo = document.createElement('video');

          tvVideo.src = '/example.mp4';
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

        if (firstIntersect.name === "Cube023_1") {
          const tvScreen = scene.getObjectByName("SCREEN001");
          const tvVideo = document.createElement('video');

          tvVideo.src = '/example2.mp4';
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

        if (firstIntersect.name === "Cube024_1") {
          const tvScreen = scene.getObjectByName("SCREEN001");
          const tvVideo = document.createElement('video');

          tvVideo.src = '/example3.mp4';
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
  }, [gltf, scene, raycaster, camera, gl.domElement]);

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

const Scene = () => (
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

    <Canvas camera={{ position: [16, -1, 0], fov: 40 }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[50, 30, 50]} intensity={1} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <CameraController />
    </Canvas>
  </>
);

export default Scene;
