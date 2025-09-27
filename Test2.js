          const agricultureData = [
            { year: 2020, type: "vegetables", area: 45000 },
            { year: 2020, type: "fruits", area: 38000 },
            { year: 2020, type: "cereals", area: 120000 },
            { year: 2020, type: "olives", area: 85000 },
            { year: 2020, type: "greenhouses", area: 15000 },
            { year: 2020, type: "organic", area: 5000 },
            
            { year: 2021, type: "vegetables", area: 46000 },
            { year: 2021, type: "fruits", area: 39000 },
            { year: 2021, type: "cereals", area: 118000 },
            { year: 2021, type: "olives", area: 87000 },
            { year: 2021, type: "greenhouses", area: 16000 },
            { year: 2021, type: "organic", area: 5500 },
            
            { year: 2022, type: "vegetables", area: 47000 },
            { year: 2022, type: "fruits", area: 40000 },
            { year: 2022, type: "cereals", area: 115000 },
            { year: 2022, type: "olives", area: 90000 },
            { year: 2022, type: "greenhouses", area: 17000 },
            { year: 2022, type: "organic", area: 6000 },
            
            { year: 2023, type: "vegetables", area: 48000 },
            { year: 2023, type: "fruits", area: 41000 },
            { year: 2023, type: "cereals", area: 112000 },
            { year: 2023, type: "olives", area: 92000 },
            { year: 2023, type: "greenhouses", area: 18000 },
            { year: 2023, type: "organic", area: 7000 },
            
            { year: 2024, type: "vegetables", area: 49000 },
            { year: 2024, type: "fruits", area: 42000 },
            { year: 2024, type: "cereals", area: 110000 },
            { year: 2024, type: "olives", area: 95000 },
            { year: 2024, type: "greenhouses", area: 20000 },
            { year: 2024, type: "organic", area: 8000 }
        ];

        // Agriculture type labels in English
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
        let areaChart;

        applyFilterBtn.addEventListener('click', applyFilters);
        resetFilterBtn.addEventListener('click', resetFilters);

        document.addEventListener('DOMContentLoaded', function() {
            createAreaChart(agricultureData);
        });

        function applyFilters() {
            const selectedYear = yearFilter.value;
            let filteredData = agricultureData;
            
            if (selectedYear !== 'all') {
                filteredData = filteredData.filter(item => item.year == selectedYear);
            }
            
            updateAreaChart(filteredData);
        }

        function resetFilters() {
            yearFilter.value = 'all';
            updateAreaChart(agricultureData);
        }

        function createAreaChart(data) {
            const areaCtx = document.getElementById('areaChart').getContext('2d');
            const aggregatedData = aggregateDataByType(data);
            
            areaChart = new Chart(areaCtx, {
                type: 'bar',
                data: {
                    labels: Object.keys(aggregatedData).map(type => typeLabels[type]),
                    datasets: [{
                        label: 'Cultivated Area (hectares)',
                        data: Object.values(aggregatedData).map(item => item.area),
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
                            text: 'Distribution of Cultivated Areas by Agriculture Type'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Area (hectares)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Agriculture Type'
                            }
                        }
                    }
                }
            });
        }

        function updateAreaChart(data) {
            const aggregatedData = aggregateDataByType(data);
            
            areaChart.data.labels = Object.keys(aggregatedData).map(type => typeLabels[type]);
            areaChart.data.datasets[0].data = Object.values(aggregatedData).map(item => item.area);
            areaChart.update();
        }

        function aggregateDataByType(data) {
            const aggregated = {};
            
            data.forEach(item => {
                if (!aggregated[item.type]) {
                    aggregated[item.type] = { area: 0 };
                }
                aggregated[item.type].area += item.area;
            });
            
            return aggregated;
        }
        