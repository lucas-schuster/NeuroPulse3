import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import RCIGraph from './RCIGraph';

const FullReportPDF = ({ sessions, rcis }) => {
  const pdfRef = useRef();

  const exportPDF = async () => {
    const canvas = await html2canvas(pdfRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('relatorio_neuropulse.pdf');
  };

  return (
    <>
      <button
        onClick={exportPDF}
        className="bg-blue-700 text-white px-4 py-2 rounded my-4"
      >
        Baixar PDF Completo
      </button>

      <div ref={pdfRef} className="bg-white p-6 rounded shadow text-sm">
        <h2 className="text-xl font-bold mb-4">Relatório de Avaliação</h2>
        <table className="table-auto w-full mb-6 text-left border">
          <thead className="bg-gray-200">
            <tr>
              <th>Escala</th>
              <th>Total</th>
              <th>Classificação</th>
              <th>Percentil</th>
              <th>RCI</th>
              <th>Confiável?</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(sess => (
              <tr key={sess.sessionId} className="border-t">
                <td>{sess.scale}</td>
                <td>{sess.analise.total}</td>
                <td>{sess.analise.classificacao}</td>
                <td>{sess.stats?.percentil ?? '-'}</td>
                <td>{rcis[sess.scale]?.rci ?? '-'}</td>
                <td>{rcis[sess.scale]?.confiavel ? 'Sim' : 'Não'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <RCIGraph data={rcis} />
      </div>
    </>
  );
};

export default FullReportPDF;

