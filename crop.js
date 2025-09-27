
fetch("crop.json")
  .then(response => response.json())
  .then(cropData => {
    const commonList = document.getElementById("common-crops");
    const rareList = document.getElementById("rare-crops");
    const searchInput = document.getElementById("searchInput");
    const filterSelect = document.getElementById("filterSelect");

    function renderCrops() {
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

      addItems(cropData.common, commonList, "common");
      addItems(cropData.rare, rareList, "rare");
    }

    searchInput.addEventListener("input", renderCrops);
    filterSelect.addEventListener("change", renderCrops);

    renderCrops();
  })
  .catch(error => console.error("Error loading crops:", error));
