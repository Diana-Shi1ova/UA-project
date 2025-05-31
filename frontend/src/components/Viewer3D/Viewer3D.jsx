import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import './Viewer3D.css';

function Controls() {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    controls.current = new OrbitControls(camera, gl.domElement);
    return () => controls.current.dispose();
  }, [camera, gl]);

  return null;
}

function Model({ url, transform }) {
  const gltf = useLoader(GLTFLoader, url);
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.set(...transform.position);
      modelRef.current.rotation.y = transform.rotationY;
      modelRef.current.scale.set(transform.scale, transform.scale, transform.scale);
    }
  });

  return <primitive ref={modelRef} object={gltf.scene} />;
}

export default function Viewer3D({ modelUrl }) {
  const [transform, setTransform] = useState({
    position: [0, 0, 0],
    rotationY: 0,
    scale: 1,
  });

  const move = (dir) => {
    setTransform((prev) => {
      const [x, y, z] = prev.position;
      if (dir === 'up') return { ...prev, position: [x, y + 0.1, z] };
      if (dir === 'down') return { ...prev, position: [x, y - 0.1, z] };
      return prev;
    });
  };

  const rotate = () =>
    setTransform((prev) => ({ ...prev, rotationY: prev.rotationY + Math.PI / 8 }));

  const zoomIn = () =>
    setTransform((prev) => ({ ...prev, scale: Math.min(prev.scale + 0.1, 5) }));

  const zoomOut = () =>
    setTransform((prev) => ({ ...prev, scale: Math.max(prev.scale - 0.1, 0.1) }));

  const reset = () =>
    setTransform({ position: [0, 0, 0], rotationY: 0, scale: 1 });

  return (
    <div className='viewer-3d' 
        style={{ position: 'relative' }}
        role="region"
        aria-label='Visor 3D' 
        tabIndex="0"
    >
      <Canvas camera={{ position: [0, 0, 5] }} style={{ height: '400px', width: '100%' }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} />
        <Controls />
        <Model url={modelUrl} transform={transform} />
      </Canvas>

      {/* Кнопки управления */}
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '8px',
        borderRadius: '6px'
      }}>
        <button type='button' onClick={zoomIn}>➕ Увеличить</button>
        <button type='button' onClick={zoomOut}>➖ Уменьшить</button>
        <button type='button' onClick={rotate}>↻ Повернуть</button>
        <button type='button' onClick={() => move('up')}>⬆ Вверх</button>
        <button type='button' onClick={() => move('down')}>⬇ Вниз</button>
        <button type='button' onClick={reset}>🔄 Сброс</button>
      </div>
    </div>
  );
}


/*Para probar*/