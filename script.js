  document.addEventListener("DOMContentLoaded", loadHomePage);

      const allCategoriesUrl =
        "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
      const menuItemsUrl =
        "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";

      function loadHomePage() {
        fetch(allCategoriesUrl)
          .then((response) => response.json())
          .then((categories) => {
            const randomCategory =
              categories[Math.floor(Math.random() * categories.length)]
                .short_name;
            const homeHtml = `
            <div>
              <div class="tile" onclick="loadMenuItems('SP')"><h2>Menu</h2></div>
              <div class="tile" onclick="loadMenuItems('${randomCategory}')"><h2>Specials</h2></div>
              <div class="tile" onclick="window.location.href='https://maps.google.com'"><h2>Map</h2></div>
            </div>`;
            document.getElementById("main-content").innerHTML = homeHtml;
          });
      }

      function loadMenuItems(shortName) {
        fetch(menuItemsUrl + shortName + ".json")
          .then((response) => response.json())
          .then((data) => {
            let html = `<h2>${data.category.name}</h2><ul>`;
            data.menu_items.forEach((item) => {
              html += `<li><strong>${item.name}</strong>: ${item.description}</li>`;
            });
            html +=
              "</ul><br><button onclick='loadHomePage()'>Back to Home</button>";
            document.getElementById("main-content").innerHTML = html;
          });
      }