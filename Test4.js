
       
        const data = {
            vegetables: [45, 46, 47, 48, 49],
            fruits: [38, 39, 40, 41, 42],
            cereals: [120, 118, 115, 112, 110],
            olives: [85, 87, 90, 92, 95],
            greenhouses: [15, 16, 17, 18, 20],
            organic: [5, 5.5, 6, 7, 8]
        };
        
        const years = [2020, 2021, 2022, 2023, 2024];
        const labels = ["Vegetables", "Fruits", "Cereals", "Olives", "Greenhouses", "Organic"];
        const colors = ['#36a2eb', '#ff6384', '#4bc0c0', '#ffcd56', '#9966ff', '#c9cbcf'];
        
        
        const ctx = document.getElementById('areaChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Average Area (1000 hectares)',
                    data: [
                        data.vegetables.reduce((a, b) => a + b, 0) / data.vegetables.length,
                        data.fruits.reduce((a, b) => a + b, 0) / data.fruits.length,
                        data.cereals.reduce((a, b) => a + b, 0) / data.cereals.length,
                        data.olives.reduce((a, b) => a + b, 0) / data.olives.length,
                        data.greenhouses.reduce((a, b) => a + b, 0) / data.greenhouses.length,
                        data.organic.reduce((a, b) => a + b, 0) / data.organic.length
                    ],
                    backgroundColor: colors
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Average Cultivated Area by Type (2020-2024)'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Area (1000 hectares)'
                        }
                    }
                }
            }
        });

        
