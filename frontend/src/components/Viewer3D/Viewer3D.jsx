import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import './Viewer3D.css';
import Button from '../Button/Button';
import ButtonX from '../ButtonX/ButtonX';

import { forwardRef, useImperativeHandle } from 'react';

const Controls = forwardRef((props, ref) => {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    controls.current = new OrbitControls(camera, gl.domElement);
    controls.current.enableDamping = true;
    controls.current.dampingFactor = 0.1;
    controls.current.rotateSpeed = 0.5;

    return () => controls.current.dispose();
  }, [camera, gl]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      controls.current.reset();
    },
  }));

  return null;
});

/*function Controls() {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    controls.current = new OrbitControls(camera, gl.domElement);
    return () => controls.current.dispose();
  }, [camera, gl]);

  return null;
}*/

function Model({ url, transform }) {
  const gltf = useLoader(GLTFLoader, url);
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.set(...transform.position);
      modelRef.current.rotation.y = transform.rotationY;
      modelRef.current.scale.set(transform.scale, transform.scale, transform.scale);
    }
  }, [transform]);

  return <primitive ref={modelRef} object={gltf.scene} />;
}

export default function Viewer3D({ modelUrl }) {
  const [transform, setTransform] = useState({
    position: [0, 0, 0],
    rotationY: 0,
    scale: 1,
  });

  const [hide, setHide] = useState(true);
  const controlsRef = useRef();

  const hideButtons = () => {
    if(hide){
      // Mostrar
      document.querySelector('.botones-3d').classList.remove('botones-3d-hidden');
      document.querySelector('.options').classList.add('options-hidden');
    }
    else{
      document.querySelector('.botones-3d').classList.add('botones-3d-hidden');
      document.querySelector('.options').classList.remove('options-hidden');
    }
    setHide(!hide);
  }

  const move = (dir) => {
    setTransform((prev) => {
      const [x, y, z] = prev.position;
      if (dir === 'up') return { ...prev, position: [x, y + 0.1, z] };
      if (dir === 'down') return { ...prev, position: [x, y - 0.1, z] };
      if (dir === 'left') return { ...prev, position: [x - 0.1, y, z] };
      if (dir === 'right') return { ...prev, position: [x + 0.1, y, z] };
      return prev;
    });
  };

  const rotate = () =>
    setTransform((prev) => ({ ...prev, rotationY: prev.rotationY + Math.PI / 8 }));

  const rotateClock = () =>
    setTransform((prev) => ({ ...prev, rotationY: prev.rotationY - Math.PI / 8 }));

  const zoomIn = () =>
    setTransform((prev) => ({ ...prev, scale: Math.min(prev.scale + 0.1, 5) }));

  const zoomOut = () =>
    setTransform((prev) => ({ ...prev, scale: Math.max(prev.scale - 0.1, 0.1) }));

  /*const reset = () =>
    setTransform({ position: [0, 0, 0], rotationY: 0, scale: 1 });*/
  const reset = () => {
    setTransform({ position: [0, 0, 0], rotationY: 0, scale: 1 });
    controlsRef.current?.reset();
  };

  return (
    <div className='viewer-3d' 
        role="region"
        aria-label='Visor 3D' 
        tabIndex="0"
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} />
        <Controls ref={controlsRef}/>
        <Model url={modelUrl} transform={transform} />
      </Canvas>

      <Button ariaLabel='Mostrar opciones' buttonClass='options' icon='FaEllipsisV' buttonFunction={hideButtons} buttonColor='secondary'></Button>
      <div className='botones-3d botones-3d-hidden'>
        <ButtonX icon='FaTimes' buttonFunction={hideButtons}></ButtonX>
        <div className='buttons-row'>
          <Button ariaLabel='Aumentar' icon='FaPlus' buttonFunction={zoomIn}></Button>
          <Button ariaLabel='Disminuir' icon='FaMinus' buttonFunction={zoomOut}></Button>
        </div>
        
        <div className='buttons-row'>
          <Button ariaLabel='Rotar en sentido antihorario' icon='FaUndo' buttonFunction={rotate}></Button>
          <Button ariaLabel='Rotar en sentido horario' icon='FaRedo' buttonFunction={rotateClock}></Button>
        </div>

        <div className='buttons-row'>
          <Button ariaLabel='Izquierda' icon='FaArrowLeft' buttonFunction={() => move('left')}></Button>
          <div>
            <Button ariaLabel='Arriba' icon='FaArrowUp' buttonFunction={() => move('up')}></Button>
            <Button ariaLabel='Abajo' icon='FaArrowDown' buttonFunction={() => move('down')}></Button>
          </div>
          <Button ariaLabel='Derecha' icon='FaArrowRight' buttonFunction={() => move('right')}></Button>
        </div>

        <Button ariaLabel='Reestablecer' icon='FaSync' buttonFunction={reset}></Button>
      </div>
    </div>
  );
}

/*Para probar: https://modelviewer.dev/shared-assets/models/Astronaut.glb*/