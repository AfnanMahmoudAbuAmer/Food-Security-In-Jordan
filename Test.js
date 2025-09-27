const agricultureData = [
    { year: 2020, type: "vegetables", area: 45000, production: 850000, value: 170000000 },
    { year: 2020, type: "fruits", area: 38000, production: 420000, value: 150000000 },
    { year: 2020, type: "cereals", area: 120000, production: 180000, value: 45000000 },
    { year: 2020, type: "olives", area: 85000, production: 150000, value: 90000000 },
    { year: 2020, type: "greenhouses", area: 15000, production: 280000, value: 120000000 },
    { year: 2020, type: "organic", area: 5000, production: 35000, value: 25000000 },
    
    { year: 2021, type: "vegetables", area: 46000, production: 870000, value: 175000000 },
    { year: 2021, type: "fruits", area: 39000, production: 430000, value: 155000000 },
    { year: 2021, type: "cereals", area: 118000, production: 175000, value: 44000000 },
    { year: 2021, type: "olives", area: 87000, production: 155000, value: 95000000 },
    { year: 2021, type: "greenhouses", area: 16000, production: 300000, value: 130000000 },
    { year: 2021, type: "organic", area: 5500, production: 40000, value: 28000000 },
    
    { year: 2022, type: "vegetables", area: 47000, production: 890000, value: 180000000 },
    { year: 2022, type: "fruits", area: 40000, production: 450000, value: 160000000 },
    { year: 2022, type: "cereals", area: 115000, production: 170000, value: 43000000 },
    { year: 2022, type: "olives", area: 90000, production: 160000, value: 100000000 },
    { year: 2022, type: "greenhouses", area: 17000, production: 320000, value: 140000000 },
    { year: 2022, type: "organic", area: 6000, production: 45000, value: 32000000 },
    
    { year: 2023, type: "vegetables", area: 48000, production: 920000, value: 185000000 },
    { year: 2023, type: "fruits", area: 41000, production: 470000, value: 165000000 },
    { year: 2023, type: "cereals", area: 112000, production: 165000, value: 42000000 },
    { year: 2023, type: "olives", area: 92000, production: 165000, value: 105000000 },
    { year: 2023, type: "greenhouses", area: 18000, production: 350000, value: 150000000 },
    { year: 2023, type: "organic", area: 7000, production: 50000, value: 35000000 },
    
    { year: 2024, type: "vegetables", area: 49000, production: 950000, value: 190000000 },
    { year: 2024, type: "fruits", area: 42000, production: 490000, value: 170000000 },
    { year: 2024, type: "cereals", area: 110000, production: 160000, value: 40000000 },
    { year: 2024, type: "olives", area: 95000, production: 170000, value: 110000000 },
    { year: 2024, type: "greenhouses", area: 20000, production: 380000, value: 160000000 },
    { year: 2024, type: "organic", area: 8000, production: 55000, value: 40000000 }
];

const typeLabels = {
    vegetables: "Vegetable Farming",
    fruits: "Fruit Farming",
    cereals: "Cereal Farming",
    olives: "Olive Farming",
    greenhouses: "Greenhouse Farming",
    organic: "Organic Farming"
};


const yearFilter = document.getElementById('yearFilter');
const applyFilterBtn = document.getElementById('applyFilter');
const resetFilterBtn = document.getElementById('resetFilter');
const saveChartBtn = document.getElementById('saveChart');
let productionChart;


applyFilterBtn.addEventListener('click', applyFilters);
resetFilterBtn.addEventListener('click', resetFilters);
saveChartBtn.addEventListener('click', saveChart);


document.addEventListener('DOMContentLoaded', function() {
    createProductionChart(agricultureData);
});


function applyFilters() {
    const selectedYear = yearFilter.value;
    let filteredData = agricultureData;
    
    if (selectedYear !== 'all') {
        filteredData = filteredData.filter(item => item.year == selectedYear);
    }
    
    updateProductionChart(filteredData);
}


function resetFilters() {
    yearFilter.value = 'all';
    updateProductionChart(agricultureData);
}


function saveChart() {
    const chartCanvas = document.getElementById('productionChart');
    const imageURL = chartCanvas.toDataURL('image/png');
    
    const downloadLink = document.createElement('a');
    downloadLink.href = imageURL;
    downloadLink.download = 'jordan-agriculture-chart.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


function createProductionChart(data) {
    const productionCtx = document.getElementById('productionChart').getContext('2d');
    const aggregatedData = aggregateDataByType(data);
    
    productionChart = new Chart(productionCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(aggregatedData).map(type => typeLabels[type]),
            datasets: [{
                label: 'Production Quantity (tons)',
                data: Object.values(aggregatedData).map(item => item.production),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(255, 205, 86, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(201, 203, 207, 0.7)'
                ],
                borderColor: [
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Distribution of Agricultural Production by Type'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const value = context.raw;
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${value.toLocaleString()} tons (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}


function updateProductionChart(data) {
    const aggregatedData = aggregateDataByType(data);
    
    productionChart.data.labels = Object.keys(aggregatedData).map(type => typeLabels[type]);
    productionChart.data.datasets[0].data = Object.values(aggregatedData).map(item => item.production);
    productionChart.update();
}


function aggregateDataByType(data) {
    const aggregated = {};
    
    data.forEach(item => {
        if (!aggregated[item.type]) {
            aggregated[item.type] = { area: 0, production: 0, value: 0 };
        }
        aggregated[item.type].area += item.area;
        aggregated[item.type].production += item.production;
        aggregated[item.type].value += item.value;
    });
    
    return aggregated;
}

