import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vDist;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float r = length(pos.xy);
    float angle = atan(pos.y, pos.x);
    float wave = sin(r * 3.0 - uTime * 2.0) * cos(angle * 8.0 + uTime) * 0.15;
    pos.z += wave;
    pos.xy *= 1.0 + sin(uTime * 0.5 + r * 2.0) * 0.05;
    vDist = r;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying vec2 vUv;
  varying float vDist;

  void main() {
    float pulse = sin(vDist * 4.0 - uTime * 3.0) * 0.5 + 0.5;
    vec3 color = mix(uColor1, uColor2, pulse);
    float alpha = (1.0 - vDist) * 0.6 + 0.2;
    alpha *= smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x);
    gl_FragColor = vec4(color, alpha);
  }
`

export default function MandalaGlow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 3.5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const uniforms = {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#3b82f6') },
      uColor2: { value: new THREE.Color('#a855f7') },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const group = new THREE.Group()
    const ringCount = 8
    const tubeRadius = window.innerWidth < 768 ? 0.008 : 0.012

    for (let i = 0; i < ringCount; i++) {
      const radius = 0.4 + i * 0.25
      const segments = 128
      const geometry = new THREE.TorusGeometry(radius, tubeRadius, 16, segments)
      const mesh = new THREE.Mesh(geometry, material)
      mesh.rotation.x = Math.PI / 2
      mesh.rotation.z = (i / ringCount) * Math.PI * 0.3
      group.add(mesh)
    }

    // Add connecting lines between rings
    const lineMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    for (let axis = 0; axis < 8; axis++) {
      const angle = (axis / 8) * Math.PI * 2
      const points: THREE.Vector3[] = []
      for (let r = 0.4; r <= 2.2; r += 0.05) {
        const wave = Math.sin(r * 3.0) * 0.1
        points.push(new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, wave))
      }
      const curve = new THREE.CatmullRomCurve3(points)
      const tubeGeo = new THREE.TubeGeometry(curve, 64, tubeRadius * 0.6, 8, false)
      const tube = new THREE.Mesh(tubeGeo, lineMaterial)
      group.add(tube)
    }

    scene.add(group)

    let time = 0
    const animate = () => {
      time += 0.002
      uniforms.uTime.value = time
      group.rotation.z += 0.003
      group.rotation.y = Math.sin(time * 0.5) * 0.1
      renderer.render(scene, camera)
      frameRef.current = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      camera.position.z = width < 768 ? 5 : 3.5
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameRef.current)
      renderer.dispose()
      material.dispose()
      lineMaterial.dispose()
      group.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose()
        }
      })
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
