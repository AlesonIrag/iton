import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

/* ===== NEON GRID FLOOR (Tron / retro-wave style) ===== */
function NeonGrid() {
  const gridRef = useRef()

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 2) % 2
    }
  })

  const gridGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const verts = []
    const size = 40
    const divisions = 40
    const step = size / divisions

    // horizontal lines
    for (let i = -divisions / 2; i <= divisions / 2; i++) {
      verts.push(-size / 2, 0, i * step, size / 2, 0, i * step)
    }
    // vertical lines
    for (let i = -divisions / 2; i <= divisions / 2; i++) {
      verts.push(i * step, 0, -size / 2, i * step, 0, size / 2)
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
    return geo
  }, [])

  return (
    <group ref={gridRef} position={[0, -3, 0]} rotation={[0, 0, 0]}>
      <lineSegments geometry={gridGeo}>
        <lineBasicMaterial color="#6366f1" transparent opacity={0.18} />
      </lineSegments>
      {/* Glow plane under grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.025} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

/* ===== FLOATING WIREFRAME SHAPES (game-like objects) ===== */
function GameShape({ position, geometry, color, speed = 1, scale = 1 }) {
  const meshRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.004 * speed
      meshRef.current.rotation.y += 0.006 * speed
      meshRef.current.rotation.z += 0.002 * speed
    }
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.6} floatIntensity={0.8}>
      <group position={position} scale={scale}>
        {/* Wireframe shape */}
        <mesh ref={meshRef}>
          {geometry}
          <meshBasicMaterial color={color} wireframe transparent opacity={0.45} />
        </mesh>
        {/* Inner glow */}
        <mesh ref={glowRef}>
          {geometry}
          <meshBasicMaterial color={color} transparent opacity={0.08} />
        </mesh>
      </group>
    </Float>
  )
}

/* ===== PARTICLE STREAM (like game particles / data flow) ===== */
function ParticleStream({ count = 400 }) {
  const pointsRef = useRef()

  const { positions, colors, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const spd = new Float32Array(count)

    const palette = [
      [0.39, 0.4, 0.95],   // indigo
      [0.66, 0.33, 0.97],  // purple
      [0.93, 0.29, 0.6],   // pink
      [0.02, 0.71, 0.83],  // cyan
      [0.51, 0.55, 0.97],  // light indigo
    ]

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = c[0]
      col[i * 3 + 1] = c[1]
      col[i * 3 + 2] = c[2]
      spd[i] = 0.3 + Math.random() * 1.2
    }
    return { positions: pos, colors: col, speeds: spd }
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const posArr = pointsRef.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      // Move upward
      posArr[i * 3 + 1] += speeds[i] * 0.008

      // Reset when too high
      if (posArr[i * 3 + 1] > 8) {
        posArr[i * 3 + 1] = -8
        posArr[i * 3] = (Math.random() - 0.5) * 24
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true

    // Slow rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ===== ORBITING RING (game HUD style) ===== */
function OrbitRing({ radius = 5, color = '#818cf8', speed = 0.3, tilt = 0 }) {
  const ringRef = useRef()

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * speed
    }
  })

  return (
    <mesh ref={ringRef} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 8, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  )
}

/* ===== SCROLL-DRIVEN CAMERA ===== */
function CameraRig() {
  useFrame(({ camera, clock }) => {
    const scrollY = window.scrollY || 0
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const t = maxScroll > 0 ? scrollY / maxScroll : 0

    // Camera drifts down as you scroll + gentle sway
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -t * 3 + 1, 0.04)
    camera.position.x = Math.sin(clock.elapsedTime * 0.08) * 0.3
    camera.lookAt(0, camera.position.y - 0.5, 0)
  })
  return null
}

/* ===== MAIN SCENE ===== */
export default function Scene3D() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 1, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 5]} intensity={0.4} color="#818cf8" />
        <pointLight position={[-8, -5, -10]} intensity={0.3} color="#a855f7" />

        {/* Deep space stars */}
        <Stars radius={60} depth={60} count={2000} factor={3} saturation={0.3} fade speed={0.4} />

        {/* Neon grid floor */}
        <NeonGrid />

        {/* Orbiting rings (HUD-style) */}
        <OrbitRing radius={6} color="#6366f1" speed={0.15} tilt={1.2} />
        <OrbitRing radius={7.5} color="#a855f7" speed={-0.1} tilt={0.8} />
        <OrbitRing radius={5} color="#ec4899" speed={0.2} tilt={1.5} />

        {/* Floating game-like shapes */}
        <GameShape position={[-5, 2.5, -4]} geometry={<icosahedronGeometry args={[0.9, 1]} />} color="#818cf8" speed={0.7} />
        <GameShape position={[5, -0.5, -5]} geometry={<octahedronGeometry args={[0.7, 0]} />} color="#a855f7" speed={0.9} />
        <GameShape position={[-3.5, -2, -3]} geometry={<tetrahedronGeometry args={[0.8, 0]} />} color="#ec4899" speed={1.1} />
        <GameShape position={[4, 3, -6]} geometry={<dodecahedronGeometry args={[0.6, 0]} />} color="#06b6d4" speed={0.5} />
        <GameShape position={[0, -4, -4]} geometry={<torusGeometry args={[0.7, 0.2, 8, 20]} />} color="#818cf8" speed={0.6} scale={0.8} />
        <GameShape position={[-6, 0, -7]} geometry={<icosahedronGeometry args={[1, 0]} />} color="#f472b6" speed={0.4} />
        <GameShape position={[6, 4, -8]} geometry={<boxGeometry args={[0.8, 0.8, 0.8]} />} color="#c084fc" speed={0.8} />
        <GameShape position={[2, -3, -3]} geometry={<torusKnotGeometry args={[0.4, 0.15, 48, 8]} />} color="#a78bfa" speed={0.5} />

        {/* Rising particle stream */}
        <ParticleStream count={500} />

        {/* Scroll camera */}
        <CameraRig />
      </Canvas>
    </div>
  )
}
