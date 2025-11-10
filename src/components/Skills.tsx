import { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

declare const THREE: any;

export const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const skills = [
    { name: "HTML5", color: 0xe34c26, category: "Frontend" },
    { name: "CSS3", color: 0x264de4, category: "Frontend" },
    { name: "JavaScript", color: 0xf7df1e, category: "Frontend" },
    { name: "React", color: 0x61dafb, category: "Frontend" },
    { name: "Node.js", color: 0x339933, category: "Backend" },
    { name: "TypeScript", color: 0x3178c6, category: "Frontend" },
    { name: "MongoDB", color: 0x47a248, category: "Database" },
    { name: "PostgreSQL", color: 0x336791, category: "Database" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !isVisible || typeof THREE === "undefined") return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 12;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create tech-specific 3D icons in a circular layout
    const skillMeshes: any[] = [];
    const radius = 5;
    
    skills.forEach((skill, index) => {
      const angle = (index / skills.length) * Math.PI * 2;
      let geometry;
      let mesh;
      
      // Create technology-specific 3D icons
      switch (skill.name) {
        case "HTML5":
          // Orange shield shape
          const shieldShape = new THREE.Shape();
          shieldShape.moveTo(0, 0.8);
          shieldShape.lineTo(0.6, 0.8);
          shieldShape.lineTo(0.5, -0.8);
          shieldShape.lineTo(0, -1);
          shieldShape.lineTo(-0.5, -0.8);
          shieldShape.lineTo(-0.6, 0.8);
          shieldShape.closePath();
          const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05 };
          geometry = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
          break;
          
        case "CSS3":
          // Blue shield shape (similar to HTML5 but different proportions)
          const cssShape = new THREE.Shape();
          cssShape.moveTo(0, 0.8);
          cssShape.lineTo(0.65, 0.8);
          cssShape.lineTo(0.55, -0.8);
          cssShape.lineTo(0, -1);
          cssShape.lineTo(-0.55, -0.8);
          cssShape.lineTo(-0.65, 0.8);
          cssShape.closePath();
          geometry = new THREE.ExtrudeGeometry(cssShape, { depth: 0.3, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05 });
          break;
          
        case "JavaScript":
          // Yellow cube with beveled edges
          geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
          break;
          
        case "React":
          // Cyan atom structure with orbits
          const atomGroup = new THREE.Group();
          
          // Central sphere
          const coreGeo = new THREE.SphereGeometry(0.2, 16, 16);
          const coreMat = new THREE.MeshStandardMaterial({
            color: skill.color,
            metalness: 0.8,
            roughness: 0.2,
            emissive: skill.color,
            emissiveIntensity: 0.5,
          });
          const core = new THREE.Mesh(coreGeo, coreMat);
          atomGroup.add(core);
          
          // Three orbital rings
          for (let i = 0; i < 3; i++) {
            const ringGeo = new THREE.TorusGeometry(0.8, 0.05, 16, 100);
            const ringMat = new THREE.MeshStandardMaterial({
              color: skill.color,
              metalness: 0.6,
              roughness: 0.3,
              emissive: skill.color,
              emissiveIntensity: 0.3,
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = (i * Math.PI) / 3;
            ring.rotation.y = (i * Math.PI) / 6;
            atomGroup.add(ring);
          }
          
          mesh = atomGroup;
          break;
          
        case "Node.js":
          // Green hexagon
          const hexShape = new THREE.Shape();
          for (let i = 0; i < 6; i++) {
            const hexAngle = (i / 6) * Math.PI * 2;
            const x = Math.cos(hexAngle) * 0.7;
            const y = Math.sin(hexAngle) * 0.7;
            if (i === 0) hexShape.moveTo(x, y);
            else hexShape.lineTo(x, y);
          }
          hexShape.closePath();
          geometry = new THREE.ExtrudeGeometry(hexShape, { depth: 0.4, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05 });
          break;
          
        case "TypeScript":
          // Blue cube (similar to JS but will have different color)
          geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
          break;
          
        case "MongoDB":
          // Green leaf/petal shape
          const leafShape = new THREE.Shape();
          leafShape.moveTo(0, 1);
          leafShape.bezierCurveTo(0.4, 0.6, 0.5, 0.2, 0.3, -0.5);
          leafShape.bezierCurveTo(0.2, -0.8, 0, -1, 0, -1);
          leafShape.bezierCurveTo(0, -1, -0.2, -0.8, -0.3, -0.5);
          leafShape.bezierCurveTo(-0.5, 0.2, -0.4, 0.6, 0, 1);
          geometry = new THREE.ExtrudeGeometry(leafShape, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03 });
          break;
          
        case "PostgreSQL":
          // Blue elephant head approximation (cylinder with sphere)
          const elephantGroup = new THREE.Group();
          
          // Body (cylinder)
          const bodyGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.8, 32);
          const bodyMat = new THREE.MeshStandardMaterial({
            color: skill.color,
            metalness: 0.6,
            roughness: 0.3,
            emissive: skill.color,
            emissiveIntensity: 0.3,
          });
          const body = new THREE.Mesh(bodyGeo, bodyMat);
          elephantGroup.add(body);
          
          // Head (sphere)
          const headGeo = new THREE.SphereGeometry(0.35, 32, 32);
          const head = new THREE.Mesh(headGeo, bodyMat);
          head.position.y = 0.6;
          elephantGroup.add(head);
          
          mesh = elephantGroup;
          break;
          
        default:
          geometry = new THREE.OctahedronGeometry(0.8);
      }
      
      // Create mesh if not already created (for grouped objects)
      if (!mesh) {
        const material = new THREE.MeshStandardMaterial({
          color: skill.color,
          metalness: 0.6,
          roughness: 0.2,
          emissive: skill.color,
          emissiveIntensity: 0.3,
        });
        mesh = new THREE.Mesh(geometry, material);
      }
      
      // Position in circle
      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.y = Math.sin(angle) * radius;
      mesh.position.z = Math.sin(angle * 2) * 0.5;
      mesh.userData = { 
        skill: skill.name,
        originalPosition: { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z },
        baseRotation: { x: 0, y: 0 }
      };
      
      scene.add(mesh);
      skillMeshes.push(mesh);
    });

    // Raycaster for hover detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(skillMeshes, true); // true for recursive (groups)

      let hoveredName = null;
      skillMeshes.forEach((mesh) => {
        const isIntersected = intersects.some((i) => {
          // Check if the intersected object is the mesh itself or a child
          let obj: any = i.object;
          while (obj) {
            if (obj === mesh) return true;
            obj = obj.parent;
          }
          return false;
        });
        
        if (isIntersected) {
          hoveredName = mesh.userData.skill;
        }
        
        const targetScale = isIntersected ? 1.5 : 1;
        const targetEmissive = isIntersected ? 0.8 : 0.3;
        
        // Spring-like easing
        mesh.scale.lerp(
          new THREE.Vector3(targetScale, targetScale, targetScale),
          0.15
        );
        
        // Update emissive for groups or single meshes
        if (mesh.type === 'Group') {
          mesh.children.forEach((child: any) => {
            if (child.material) {
              child.material.emissiveIntensity = THREE.MathUtils.lerp(
                child.material.emissiveIntensity,
                targetEmissive,
                0.15
              );
            }
          });
        } else if (mesh.material) {
          mesh.material.emissiveIntensity = THREE.MathUtils.lerp(
            mesh.material.emissiveIntensity,
            targetEmissive,
            0.15
          );
        }
        
        // Parallax effect - follow cursor
        const parallaxStrength = 0.3;
        const targetX = mesh.userData.originalPosition.x + mouse.x * parallaxStrength;
        const targetY = mesh.userData.originalPosition.y + mouse.y * parallaxStrength;
        mesh.position.x += (targetX - mesh.position.x) * 0.05;
        mesh.position.y += (targetY - mesh.position.y) * 0.05;
      });
      
      setHoveredSkill(hoveredName);
    };

    if (canvasRef.current) {
      canvasRef.current.addEventListener("mousemove", handleMouseMove);
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      if (!isPaused) {
        skillMeshes.forEach((mesh, index) => {
          // Rotate individual meshes or groups
          if (mesh.type === 'Group') {
            mesh.rotation.y += 0.01;
            // Rotate children for complex animations (like React atom)
            mesh.children.forEach((child: any, i: number) => {
              if (i > 0) { // Skip the core sphere
                child.rotation.x += 0.005;
                child.rotation.z += 0.005;
              }
            });
          } else {
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
          }
          
          // Gentle floating animation
          const floatOffset = Math.sin(Date.now() * 0.001 + index) * 0.01;
          mesh.position.z = mesh.userData.originalPosition.z + floatOffset;
          
          // Pulsing glow effect
          const pulseIntensity = Math.sin(Date.now() * 0.002 + index) * 0.05;
          
          // Handle both single meshes and groups
          if (mesh.type === 'Group') {
            mesh.children.forEach((child: any) => {
              if (child.material) {
                child.material.emissiveIntensity = Math.max(
                  0.3,
                  child.material.emissiveIntensity + pulseIntensity * 0.1
                );
              }
            });
          } else if (mesh.material) {
            mesh.material.emissiveIntensity = Math.max(
              0.3,
              mesh.material.emissiveIntensity + pulseIntensity * 0.1
            );
          }
        });

        // Rotate entire group slowly
        scene.rotation.y += 0.003;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousemove", handleMouseMove);
      }
      renderer.dispose();
    };
  }, [isVisible, isPaused]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div className="max-w-6xl w-full">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gradient text-center">
            Skills & Technologies
          </h2>
          
          <div className="flex justify-center items-center gap-4 mb-8">
            <p className="text-center text-muted-foreground text-lg">
              Hover over the 3D icons to interact • Drag to rotate view
            </p>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-4 py-2 rounded-full bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30 transition-all glow-primary"
            >
              {isPaused ? "▶ Resume" : "⏸ Pause"}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl blur-3xl" />
            <canvas
              ref={canvasRef}
              className="w-full h-[500px] rounded-2xl border-gradient cursor-grab active:cursor-grabbing"
            />
            {hoveredSkill && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="text-4xl font-bold text-gradient animate-pulse">
                  {hoveredSkill}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`text-center p-4 rounded-lg border-gradient transition-all duration-300 ${
                  hoveredSkill === skill.name 
                    ? 'scale-110 glow-primary bg-primary/10' 
                    : 'hover:scale-105'
                }`}
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <div className={`font-semibold ${hoveredSkill === skill.name ? 'text-gradient' : ''}`}>
                  {skill.name}
                </div>
                <div className="text-sm text-muted-foreground">{skill.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
