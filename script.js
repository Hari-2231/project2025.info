document.addEventListener('DOMContentLoaded', function(){
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header nav');

  menuToggle.addEventListener('click', function(){
    nav.classList.toggle('active')
  });


   const designForm = document.getElementById('designForm');
    const resultsSection = document.getElementById('results');
      const foundationResult = document.getElementById('foundation-result');
      const structuralResult = document.getElementById('structural-result');
      const materialResult = document.getElementById('material-result');
     const disasterResult = document.getElementById('disaster-result');
      const sustainabilityResult = document.getElementById('sustainability-result');
  const visualizationContainer = document.getElementById('visualization-container');

   designForm.addEventListener('submit', function(event){
      event.preventDefault();

      const landSlope = document.getElementById('landSlope').value;
      const soilType = document.getElementById('soilType').value;
      const materialPreferences = document.getElementById('materialPreferences').value;
       const otherPreferences = document.getElementById('otherPreferences').value;


  // ** Placeholder logic - Replace with your design algorithm.**
      const generatedDesign = generateDesign(landSlope, soilType, materialPreferences, otherPreferences);
      foundationResult.textContent = generatedDesign.foundation;
      structuralResult.textContent = generatedDesign.structuralDesign;
      materialResult.textContent = generatedDesign.materials;
      disasterResult.textContent = generatedDesign.disasterMitigation;
       sustainabilityResult.textContent = generatedDesign.sustainability;

     // ** Placeholder for the 3D visualization **
     render3DModel(generatedDesign.modelData, visualizationContainer);

     resultsSection.style.display = 'block';


 });

// Placeholder -  Implement your design logic
  function generateDesign(landSlope, soilType, materialPreferences, otherPreferences){
      // ** Design logic based on the input**
     let foundationType, structuralDesign, materials, disasterMitigation, sustainability;

       if (soilType === "clay") {
          foundationType = "Deep Foundation Recommended";
      } else if (soilType === "sandy") {
          foundationType = "Shallow Foundation with Reinforcement Recommended";
      } else if (soilType === "loam"){
           foundationType = "Shallow Foundation Recommended";
      }else if(soilType === "gravel"){
           foundationType = "Deep Foundation may be considered";
      }else{
          foundationType = "Check Soil Report";
      }

       structuralDesign = "Reinforced Concrete Structure Recommended" ;
       materials = materialPreferences || "Eco-friendly and locally available materials";
      disasterMitigation = "Retaining Walls & Proper Drainage Systems";
      sustainability = "Solar Panels and Rainwater harvesting";


     return {
         foundation: foundationType,
         structuralDesign: structuralDesign,
          materials: materials,
         disasterMitigation: disasterMitigation,
         sustainability: sustainability,
           modelData : {
             cubeSize: 10,
            color: '#3498db',
          }
      };

  }


 function render3DModel(modelData, container){

      container.innerHTML = ''; //Clears any prev models
       const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
         renderer.setSize(container.clientWidth, container.clientHeight);
         container.appendChild(renderer.domElement);

         const geometry = new THREE.BoxGeometry(modelData.cubeSize, modelData.cubeSize, modelData.cubeSize);
         const material = new THREE.MeshBasicMaterial({ color: modelData.color });
          const cube = new THREE.Mesh(geometry, material);
         scene.add(cube);

          camera.position.z = 50;

     function animate() {
              requestAnimationFrame(animate);
             cube.rotation.x += 0.01;
             cube.rotation.y += 0.01;
             renderer.render(scene, camera);
         }
         animate();

}
});