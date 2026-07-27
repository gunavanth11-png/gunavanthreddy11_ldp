const tableContainer = document.getElementById("tableContainer");
const menuContainer = document.getElementById("menuContainer");
const tableSearch = document.getElementById("tableSearch");
const menuSearch = document.getElementById("menuSearch");
const popup = document.getElementById("popup");
const tableName = document.getElementById("tableName");
const orderContainer = document.getElementById("orderContainer");
const totalBill = document.getElementById("totalBill");
const billBtn = document.getElementById("billBtn");
const closeBtn = document.getElementById("closeBtn");

tableSearch.addEventListener("input", () => {

    const value = tableSearch.value.toLowerCase();

    const result = tables.filter((table) => {
        return table.name.toLowerCase().includes(value);
    });

    displayTables(result);

});

menuSearch.addEventListener("input", () => {

    const value = menuSearch.value.toLowerCase();

    const result = menuItems.filter((item) => {

        return (
            item.name.toLowerCase().includes(value) ||
            item.category.toLowerCase().includes(value)
        );

    });

    displayMenu(result);

});

billBtn.addEventListener("click", () => {

    alert("Bill Generated Successfully!");

    selectedTable.orders = [];
    popup.style.display = "none";

    displayTables(tables);

});

closeBtn.addEventListener("click", () => {

    popup.style.display = "none";

});

displayTables(tables);
displayMenu(menuItems);