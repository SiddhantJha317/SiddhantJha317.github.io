// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Create number cube
const cubeSize = 2;
const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add numbers to cube faces
const loader = new THREE.TextureLoader();
const createNumberTexture = (number) => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.font = '64px Orbitron';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(number, 64, 64);
    return new THREE.CanvasTexture(canvas);
};

const numbers = ['0', '1', 'AI', 'ML', 'NLP', 'CV'];
numbers.forEach((number, index) => {
    const texture = createNumberTexture(number);
    const faceMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.7 });
    cube.material[index] = faceMaterial;
});

cube.material = new THREE.MeshFaceMaterial(cube.material);

camera.position.z = 5;

// Animation
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// GSAP animation for text
gsap.from('.content h1', {opacity: 0, y: 50, duration: 1, delay: 0.5});
gsap.from('.content h2', {opacity: 0, y: 50, duration: 1, delay: 0.8});
gsap.from('.about', {opacity: 0, y: 50, duration: 1, delay: 1.1});
gsap.from('.projects', {opacity: 0, y: 50, duration: 1, delay: 1.4});
gsap.from('.publications', {opacity: 0, y: 50, duration: 1, delay: 1.7});
gsap.from('.hobbies', {opacity: 0, y: 50, duration: 1, delay: 2.0});
gsap.from('nav a', {opacity: 0, y: -20, duration: 0.5, stagger: 0.1, delay: 2.3});

// Animation for project and publication boxes
gsap.from('.project-box, .publication-box', {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.projects',
        start: 'top 80%',
    },
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});