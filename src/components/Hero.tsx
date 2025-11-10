import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

declare const THREE: any;

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || typeof THREE === "undefined") return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Add OrbitControls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.minDistance = 3;
    controls.maxDistance = 10;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00d9ff, 2, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xb366ff, 2, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Create geometric shapes
    const shapes: any[] = [];

    // Torus
    const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x00d9ff,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x00d9ff,
      emissiveIntensity: 0.5,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-2, 0, 0);
    scene.add(torus);
    shapes.push({ mesh: torus, speed: { x: 0.002, y: 0.003 } });

    // Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(0.8, 0);
    const icoMaterial = new THREE.MeshStandardMaterial({
      color: 0xb366ff,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0xb366ff,
      emissiveIntensity: 0.5,
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.position.set(2, 1, 0);
    scene.add(icosahedron);
    shapes.push({ mesh: icosahedron, speed: { x: 0.003, y: 0.002 } });

    // Octahedron
    const octaGeometry = new THREE.OctahedronGeometry(0.6, 0);
    const octaMaterial = new THREE.MeshStandardMaterial({
      color: 0xff4d8f,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0xff4d8f,
      emissiveIntensity: 0.5,
    });
    const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
    octahedron.position.set(0, -1.5, 0);
    scene.add(octahedron);
    shapes.push({ mesh: octahedron, speed: { x: 0.001, y: 0.004 } });

    // Box
    const boxGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffaa,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x00ffaa,
      emissiveIntensity: 0.5,
    });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(1.5, -1, -1);
    scene.add(box);
    shapes.push({ mesh: box, speed: { x: 0.004, y: 0.001 } });

    // Raycaster for hover detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      mouse.x = mouseRef.current.x;
      mouse.y = mouseRef.current.y;
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(shapes.map(s => s.mesh));
      
      if (intersects.length > 0) {
        const object = intersects[0].object as any;
        // Add click animation
        object.userData.clicked = true;
        setTimeout(() => {
          object.userData.clicked = false;
        }, 500);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update controls
      controls.update();

      // Check for hover
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(shapes.map(s => s.mesh));
      
      // Rotate and animate shapes
      shapes.forEach(({ mesh, speed }) => {
        mesh.rotation.x += speed.x;
        mesh.rotation.y += speed.y;
        
        const isHovered = intersects.some(i => i.object === mesh);
        const isClicked = mesh.userData.clicked;
        
        // Spring-like scale animation
        const targetScale = isClicked ? 1.5 : isHovered ? 1.2 : 1;
        mesh.scale.x += (targetScale - mesh.scale.x) * 0.1;
        mesh.scale.y += (targetScale - mesh.scale.y) * 0.1;
        mesh.scale.z += (targetScale - mesh.scale.z) * 0.1;
        
        // Enhanced glow on hover
        const targetEmissive = isClicked ? 0.8 : isHovered ? 0.7 : 0.5;
        mesh.material.emissiveIntensity += (targetEmissive - mesh.material.emissiveIntensity) * 0.1;
      });

      // Animate lights
      pointLight1.position.x = Math.sin(Date.now() * 0.001) * 3;
      pointLight1.position.y = Math.cos(Date.now() * 0.001) * 3;
      pointLight2.position.x = Math.cos(Date.now() * 0.001) * 3;
      pointLight2.position.y = Math.sin(Date.now() * 0.001) * 3;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s" }}
      />
      
      <div className="relative z-10 text-center px-4 animate-slide-up">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient">
          Full-Stack Developer
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 font-light">
          Crafting immersive digital experiences
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToAbout}
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform glow-primary"
          >
            Explore My Work
          </button>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full border-gradient text-foreground font-semibold hover:scale-105 transition-transform"
          >
            Get In Touch
          </a>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Scroll to about section"
      >
        <ChevronDown className="w-8 h-8 text-primary" />
      </button>
    </section>
  );
};
