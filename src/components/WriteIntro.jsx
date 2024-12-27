<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const WriteIntro = () => {
  const location = useLocation();
  const { matches } = location.state || { matches: [] };
  const [generatedIntro, setGeneratedIntro] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const pdfRef = useRef();

  const templates = {
    classic: {
      style: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        lineHeight: '1.5',
      },
      title: '클래식 스타일',
    },
    modern: {
      style: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '14px',
        lineHeight: '1.8',
        color: '#333',
      },
      title: '모던 스타일',
    },
  };

  useEffect(() => {
    const generateIntro = () => {
      if (!matches || matches.length === 0) return;

      const intro = matches
        .map(
          (match) =>
            `문항: ${match.question}\n` +
            `상황: ${match.selectedExperience?.situation || 'N/A'}\n` +
            `업무: ${match.selectedExperience?.task || 'N/A'}\n` +
            `수행: ${match.selectedExperience?.action || 'N/A'}\n` +
            `결과: ${match.selectedExperience?.result || 'N/A'}\n`
        )
        .join('\n\n');
      setGeneratedIntro(intro);
    };

    generateIntro();
  }, [matches]);

  const handleSavePDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);
    pdf.save('자기소개서.pdf');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>자기소개서 작성</h1>
      <select
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}
      >
        {Object.keys(templates).map((key) => (
          <option key={key} value={key}>
            {templates[key].title}
          </option>
        ))}
      </select>
      <div
        ref={pdfRef}
        style={{
          ...templates[selectedTemplate].style,
          background: '#fff',
          padding: '10px',
          border: '1px solid #ddd',
        }}
      >
        <textarea
          value={generatedIntro}
          onChange={(e) => setGeneratedIntro(e.target.value)}
          style={{ width: '100%', height: '400px', fontSize: '16px' }}
        />
      </div>
      <button
        onClick={handleSavePDF}
        style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}
      >
        PDF 저장
      </button>
    </div>
  );
};

export default WriteIntro;
=======
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const WriteIntro = () => {
  const location = useLocation();
  const { matches } = location.state || { matches: [] };
  const [generatedIntro, setGeneratedIntro] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const pdfRef = useRef();

  const templates = {
    classic: {
      style: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        lineHeight: '1.5',
      },
      title: '클래식 스타일',
    },
    modern: {
      style: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '14px',
        lineHeight: '1.8',
        color: '#333',
      },
      title: '모던 스타일',
    },
  };

  useEffect(() => {
    const generateIntro = () => {
      if (!matches || matches.length === 0) return;

      const intro = matches
        .map(
          (match) =>
            `문항: ${match.question}\n` +
            `상황: ${match.selectedExperience?.situation || 'N/A'}\n` +
            `업무: ${match.selectedExperience?.task || 'N/A'}\n` +
            `수행: ${match.selectedExperience?.action || 'N/A'}\n` +
            `결과: ${match.selectedExperience?.result || 'N/A'}\n`
        )
        .join('\n\n');
      setGeneratedIntro(intro);
    };

    generateIntro();
  }, [matches]);

  const handleSavePDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);
    pdf.save('자기소개서.pdf');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>자기소개서 작성</h1>
      <select
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}
      >
        {Object.keys(templates).map((key) => (
          <option key={key} value={key}>
            {templates[key].title}
          </option>
        ))}
      </select>
      <div
        ref={pdfRef}
        style={{
          ...templates[selectedTemplate].style,
          background: '#fff',
          padding: '10px',
          border: '1px solid #ddd',
        }}
      >
        <textarea
          value={generatedIntro}
          onChange={(e) => setGeneratedIntro(e.target.value)}
          style={{ width: '100%', height: '400px', fontSize: '16px' }}
        />
      </div>
      <button
        onClick={handleSavePDF}
        style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}
      >
        PDF 저장
      </button>
    </div>
  );
};

export default WriteIntro;
>>>>>>> e239cb1365f6363289fe6e893960ac49962a6fc4
