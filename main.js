import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    'px.jpg', 'nx.jpg',
    'py.jpg', 'ny.jpg',
    'pz.jpg', 'nz.jpg'
]);

document.body.appendChild(renderer.domElement);

loader.load(
  "/gift_box.glb", // Update the path
  function (gltf) {
    scene.add(gltf.scene);

    // Add these lines to help position and scale the model
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.scale.set(12, 12, 12);
    gltf.scene.rotation.x += 0.4;

    // Add some light to see the model
    const light = new THREE.AmbientLight(0xffffff, 5);
    scene.add(light);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 5;

// Add after scene creation
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isAnimating = false;
let animationStartTime = 0;
const ANIMATION_DURATION = 2000; // 2 seconds

// Add click event listener
window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0 && !isAnimating) {
    isAnimating = true;
    animationStartTime = Date.now();
  }
});

function animate() {
    requestAnimationFrame(animate);

    if (scene.children.length > 0) {
        const giftBox = scene.children[0];
        const time = Date.now() * 0.001;

        if (!isAnimating) {
            // Normal animation
            giftBox.rotation.y += 0.005;
            giftBox.position.y = Math.sin(time) * 0.1;
        } else {
            // Click animation
            const elapsed = Date.now() - animationStartTime;
            const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

            giftBox.rotation.y += 0.3;
            giftBox.scale.set(
                12 * (1 - progress * 0.8),
                12 * (1 - progress * 0.8),
                12 * (1 - progress * 0.8)
            );

            if (progress === 1) {
                scene.remove(giftBox);
                isAnimating = false;

                // Create and add video element
                const video = document.createElement("video");
                video.src = "a600aaf62686404c97009dc36e34bc66.mp4"; // Set your video source here
                video.width = 1080;
                video.height = window.innerHeight;
                video.autoplay = true;
                video.controls = true;
                let canvas = document.querySelector("canvas");
                const ctx = canvas.getContext("webgl2");
                const texture = new THREE.VideoTexture(video);
                const videoMaterial = new THREE.MeshBasicMaterial({ map: texture });
                const videoGeometry = new THREE.PlaneGeometry(4.5, 7);
                const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
                scene.add(videoMesh);
                video.play();
                // canvas.appendChild(video);
                
            }
        }
    }

    renderer.render(scene, camera);
}

animate();
