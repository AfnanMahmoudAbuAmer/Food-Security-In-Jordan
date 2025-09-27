        // Agricultural GDP data for Jordan (2018-2023)
        const gdpData = [
            { year: 2018, agriGDP: 1250, contribution: 2.94 },
            { year: 2019, agriGDP: 1285, contribution: 2.97 },
            { year: 2020, agriGDP: 1310, contribution: 3.13 },
            { year: 2021, agriGDP: 1355, contribution: 3.07 },
            { year: 2022, agriGDP: 1405, contribution: 3.03 },
            { year: 2023, agriGDP: 1450, contribution: 3.05 }
        ];

        // DOM elements
        const chartTypeSelect = document.getElementById('chartType');
        const applyChartBtn = document.getElementById('applyChart');
        
        let gdpChart;

        // Event listeners
        applyChartBtn.addEventListener('click', changeChartType);
        
        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            createGDPChart('line');
        });

        function changeChartType() {
            const selectedType = chartTypeSelect.value;
            createGDPChart(selectedType);
        }

        function createGDPChart(type) {
            const ctx = document.getElementById('gdpChart').getContext('2d');
            


            if (gdpChart) {
                gdpChart.destroy();
            }
            
            const years = gdpData.map(item => item.year);
            const contributions = gdpData.map(item => item.contribution);
            
            gdpChart = new Chart(ctx, {
                type: type,
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Contribution to GDP (%)',
                        data: contributions,
                        borderColor: 'rgb(54, 162, 235)',
                        backgroundColor: type === 'bar' ? 'rgba(54, 162, 235, 0.7)' : 'rgba(54, 162, 235, 0.1)',
                        borderWidth: 2,
                        fill: type === 'line'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Agricultural Sector Contribution to GDP (%)'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: 'Contribution (%)'
                            },
                            min: 2.8,
                            max: 3.2
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Year'
                            }
                        }
                    }
                }
            });
        }

        