document.addEventListener('DOMContentLoaded', function() {
    const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR_pXRvdzbuFgLL4upSR8pFOcglKVHLpxVoOLXSopswlDpzg2eNgl4WtziV1hnpHwn3CuWtimsTf-0W/pub?gid=536909118&single=true&output=csv";

    // Проверка на регистрацию сервис-воркера
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(function(registration) {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(function(error) {
                console.log('Service Worker registration failed:', error);
            });
    }

    fetch(sheetURL)
        .then(response => response.text())
        .then(csvData => {
            console.log('CSV Data Loaded:', csvData); // Логирование данных CSV
            const orders = parseCSV(csvData);
            loadOrdersToTable(orders);
        })
        .catch(error => console.error('Error loading CSV data:', error));

    function parseCSV(data) {
        const rows = data.split("\n");
        console.log('Parsed Rows:', rows); // Логирование разделенных строк
        return rows.slice(1).map(row => {
            const [name, phone, address, products, total, status] = row.split(",");
            return { name, phone, address, products, total, status };
        });
    }

    function loadOrdersToTable(orders) {
        console.log('Orders:', orders); // Логирование заказов
        const tbody = document.getElementById('orders-body');
        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.name}</td>
                <td>${order.phone}</td>
                <td>${order.address}</td>
                <td>${order.products}</td>
                <td>${order.total}</td>
                <td>${order.status}</td>
            `;
            tbody.appendChild(row);
        });
    }
});
