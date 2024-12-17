import * as THREE from 'three';

// Create the scene
const scene = new THREE.Scene();

// Load the background texture
const loader = new THREE.TextureLoader();
loader.load('/wallpaper-for-the-nursery.jpg', function(texture) {
    scene.background = texture;
});

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(geometry, material);
const cubeTextureLoader = new THREE.TextureLoader();
cubeTextureLoader.load('/gift-wrap-texture-1.jpg', function(texture) {
    material.map = texture;
    material.needsUpdate = true;
});
scene.add(cube);

// Create the lid
const lidGeometry = new THREE.BoxGeometry(2, 0.2, 2);
const lidMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Set initial color to white
const lid = new THREE.Mesh(lidGeometry, lidMaterial);
lid.position.y = 1.1;
const lidTextureLoader = new THREE.TextureLoader();
lidTextureLoader.load('/gift-wrap-texture-1.jpg', function(texture) {
    lidMaterial.map = texture;
    lidMaterial.needsUpdate = true;
});
scene.add(lid);

// Create the gift bow using multiple torus geometries to resemble a tied bow
const bowMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

// Create the loops of the bow
const loopGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
const loop1 = new THREE.Mesh(loopGeometry, bowMaterial);
loop1.rotation.x = Math.PI / 2;
loop1.position.set(0.5, 1.5, 0);

const loop2 = new THREE.Mesh(loopGeometry, bowMaterial);
loop2.rotation.x = Math.PI / 2;
loop2.position.set(-0.5, 1.5, 0);

// Create the knot of the bow
const knotGeometry = new THREE.SphereGeometry(0.2, 16, 16);
const knot = new THREE.Mesh(knotGeometry, bowMaterial);
knot.position.set(0, 1.5, 0);

// Add the loops and knot to the scene
scene.add(loop1);
scene.add(loop2);
scene.add(knot);

// Set the camera position
camera.position.z = 5;

// Animation function
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    lid.rotation.y += 0.01;
    loop1.rotation.y += 0.01;
    loop1.rotation.x += 0.01;
    loop2.rotation.y += 0.01;
    loop2.rotation.x += 0.01;
    knot.rotation.y += 0.01;
    renderer.render(scene, camera);
}

// Start the animation
animate();
