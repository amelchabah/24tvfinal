import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

function BedroomScene() {
  const { scene, nodes } = useGLTF('/models/amel.glb');

  useEffect(() => {
    console.log(scene, nodes); // Vérifie que le fichier est bien chargé et accessible
  }, [scene, nodes]);


  //     // if (node.name.includes('Cadre001')) {
    // const texture = materialsMap.get(node.name);

    // console.log(node.children[1].material)
    // const mat = new THREE.MeshStandardMaterial().copy(node.children[1].material);
    // node.children[1].material = mat
    // }



        // node.children[1].position.z = -0.3500807571411133;


    // scene.traverse((node) => {
    //   if (node.name === "Cadre1") {
    //     node.children[1].material = new THREE.MeshStandardMaterial({ map: videoPosterPolitique });
    //   }

    //   if (node.name === "Cadre2") {
    //     node.children[1].material = new THREE.MeshStandardMaterial({ map: videoPosterSport });
    //   }

    //   if (node.name === "Cadre3") {
    //     node.children[1].material = new THREE.MeshStandardMaterial({ map: videoPosterSport });
    //   }

    //   if (node.name === "Cadre4") {
    //     node.children[1].material = new THREE.MeshStandardMaterial({ map: videoPosterSport });
    //   }

    //   if (node.name === "Cadre5") {
    //     node.children[1].material = new THREE.MeshStandardMaterial({ map: videoPosterSport });
    //   }
    // });

  return (
    <primitive
      object={scene}
      position={[0, -1, 0]}
      scale={[2, 2, 2]}
      rotation={[0, Math.PI, 0]}
    />
  );
}

useGLTF.preload('/models/amel.glb');
export default BedroomScene;
