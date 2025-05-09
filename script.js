document.addEventListener('DOMContentLoaded', function() {
    const sheetId = '1vR_pXRvdzbuFgLL4upSR8pFOcglKVHLpxVoOLXSopswlDpzg2eNgl4WtziV1hnpHwn3CuWtimsTf-0W';  // ID вашего листа
    const apiKey = 'YOUR_GOOGLE_API_KEY';  // Ваш API ключ

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            const orders = parseData(rows);
            loadOrdersToTable(orders);
        })
        .catch(error => console.error('Error loading Google Sheets data:', error));

    // Преобразование данных в формат объектов
    function parseData(rows) {
        const headers = rows[0]; // Заголовки
        return rows.slice(1).map(row => {
            const [name, phone, address, products, total, status] = row;
            return {
                name: name || '',
                phone: phone || '',
                address: address || '',
                products: products || '',
                total: total || '',
                status: status || ''
            };
        });
    }

    // Заполнение таблицы данными
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
