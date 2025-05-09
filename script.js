document.addEventListener('DOMContentLoaded', function() {
    const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR_pXRvdzbuFgLL4upSR8pFOcglKVHLpxVoOLXSopswlDpzg2eNgl4WtziV1hnpHwn3CuWtimsTf-0W/pub?gid=536909118&single=true&output=csv";
    
    fetch(sheetURL)
        .then(response => response.text())
        .then(csvData => {
            const orders = parseCSV(csvData);
            loadOrdersToTable(orders);
        })
        .catch(error => console.error('Error loading CSV data:', error));

    function parseCSV(data) {
        const rows = data.split("\n");
        return rows.slice(1).map(row => {
            const [name, phone, address, products, total, status] = row.split(",");
            return { name, phone, address, products, total, status };
        });
    }

    function loadOrdersToTable(orders) {
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

