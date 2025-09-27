
fetch("plant.json")
  .then(response => response.json())
  .then(plantData => {
    const commonList = document.getElementById("common-plant");
    const rareList = document.getElementById("rare-plant");
    const searchInput = document.getElementById("searchInput");
    const filterSelect = document.getElementById("filterSelect");

    function renderPlants() {
      const query = searchInput.value.toLowerCase();
      const filter = filterSelect.value;

      commonList.innerHTML = "";
      rareList.innerHTML = "";

      function addItems(items, list, type) {
        items
          .filter(item => item.toLowerCase().includes(query)) // بحث
          .forEach(item => {
            if (filter === "all" || filter === type) {
              const li = document.createElement("li");
              li.textContent = item;
              list.appendChild(li);
            }
          });
      }

      addItems(plantData.common, commonList, "common");
      addItems(plantData.rare, rareList, "rare");
    }

    searchInput.addEventListener("input", renderPlants);
    filterSelect.addEventListener("change", renderPlants);

    renderPlants();
  })
  .catch(error => console.error("Error loading plants:", error));
