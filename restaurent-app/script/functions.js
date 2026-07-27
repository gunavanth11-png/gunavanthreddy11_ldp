const displayTables = (tableList) => {

    tableContainer.innerHTML = "";

    tableList.forEach((table) => {

        const card = document.createElement("div");
        card.className = "table-card";

        let total = 0;

        table.orders.forEach((item) => {
            total += item.price * item.quantity;
        });

        card.innerHTML = `
            <h3>${table.name}</h3>
            <p>Items : ${table.orders.length}</p>
            <p>Total : ₹${total}</p>
        `;

        card.addEventListener("click", () => {
            showOrders(table);
        });

        card.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        card.addEventListener("drop", (event) => {
            event.preventDefault();

            const itemName = event.dataTransfer.getData("text");

            addOrder(table, itemName);
        });

        tableContainer.appendChild(card);

    });

};

const displayMenu = (menuList) => {

    menuContainer.innerHTML = "";

    menuList.forEach((item) => {

        const card = document.createElement("div");
        card.className = "menu-card";
        card.draggable = true;

        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <p>${item.category}</p>
        `;

        card.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text", item.name);
        });

        menuContainer.appendChild(card);

    });

};

const addOrder = (table, itemName) => {

    const menuItem = menuItems.find(
        item => item.name === itemName
    );

    const existingItem = table.orders.find(
        item => item.name === itemName
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        table.orders.push({
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1
        });
    }

    displayTables(tables);

};

const showOrders = (table) => {

    selectedTable = table;

    popup.style.display = "block";

    tableName.textContent = table.name;

    orderContainer.innerHTML = "";

    table.orders.forEach((item) => {

        const div = document.createElement("div");

        div.className = "order-item";

        div.innerHTML = `
            <p>${item.name}</p>
            <p>Price : ₹${item.price}</p>
            <p>Quantity : ${item.quantity}</p>

            <div class="order-buttons">
                <button onclick="increaseQuantity('${item.name}')">+</button>
                <button onclick="decreaseQuantity('${item.name}')">-</button>
                <button onclick="deleteItem('${item.name}')">Delete</button>
            </div>
        `;

        orderContainer.appendChild(div);

    });

    calculateTotal();

};

const increaseQuantity = (itemName) => {

    selectedTable.orders.forEach((item) => {
        if (item.name === itemName) {
            item.quantity++;
        }
    });

    showOrders(selectedTable);
    displayTables(tables);

};

const decreaseQuantity = (itemName) => {

    selectedTable.orders.forEach((item) => {
        if (item.name === itemName && item.quantity > 0) {
            item.quantity--;
        }
    });

    showOrders(selectedTable);
    displayTables(tables);

};

const deleteItem = (itemName) => {

    selectedTable.orders = selectedTable.orders.filter(
        item => item.name !== itemName
    );

    showOrders(selectedTable);
    displayTables(tables);

};

const calculateTotal = () => {

    let total = 0;

    selectedTable.orders.forEach((item) => {
        total += item.price * item.quantity;
    });

    totalBill.textContent = "Total : ₹" + total;

};