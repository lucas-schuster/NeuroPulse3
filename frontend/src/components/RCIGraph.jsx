import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
Chart.register(BarElement, CategoryScale, LinearScale);

const RCIGraph = ({ data }) => {
  const labels = Object.keys(data);
  const values = Object.values(data).map(e => parseFloat(e.rci));

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Gráfico RCI por Escala</h2>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: 'RCI',
              data: values,
              backgroundColor: values.map(v =>
                Math.abs(v) >= 1.96 ? '#10B981' : '#F59E0B'
              )
            }
          ]
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              min: -5,
              max: 5,
              ticks: {
                stepSize: 1
              },
              title: {
                display: true,
                text: 'RCI'
              }
            }
          }
        }}
      />
      <p className="text-sm mt-2 text-gray-600">
        RCI > 1.96 ou < -1.96 indica mudança confiável.
      </p>
    </div>
  );
};

export default RCIGraph;

