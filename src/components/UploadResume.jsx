<<<<<<< HEAD
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UploadResume = () => {
  const location = useLocation();
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 훅
  const { companyName } = location.state;
  const [resumeText, setResumeText] = useState('');
  const [starStructure, setStarStructure] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setResumeText(text);
      processResume(text);
    };
    reader.readAsText(file);
  };

  const processResume = (text) => {
    // STAR 구조로 변환하는 로직
    const starData = [
      { situation: '상황 설명', task: '업무 내용', action: '수행 내용', result: '결과' },
      { situation: '새로운 상황', task: '새로운 업무', action: '새로운 수행', result: '새로운 결과' },
    ];
    setStarStructure(starData);
  };

  const handleNavigateToQuestionMatch = () => {
    navigate('/match-questions', { state: { starData: starStructure } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{companyName} - 이력서 업로드</h1>
      <input type="file" accept=".txt,.pdf,.docx" onChange={handleFileUpload} />
      <div>
        <h2>이력서 내용</h2>
        <textarea
          value={resumeText}
          readOnly
          style={{ width: '100%', height: '200px' }}
        />
      </div>
      <div>
        <h2>STAR 구조</h2>
        {starStructure.map((star, index) => (
          <div key={index}>
            <p>상황: {star.situation}</p>
            <p>업무: {star.task}</p>
            <p>수행: {star.action}</p>
            <p>결과: {star.result}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handleNavigateToQuestionMatch}
        style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}
      >
        자기소개서 문항 매칭으로 이동
      </button>
    </div>
  );
};

export default UploadResume;
=======
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UploadResume = () => {
  const location = useLocation();
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 훅
  const { companyName } = location.state;
  const [resumeText, setResumeText] = useState('');
  const [starStructure, setStarStructure] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setResumeText(text);
      processResume(text);
    };
    reader.readAsText(file);
  };

  const processResume = (text) => {
    // STAR 구조로 변환하는 로직
    const starData = [
      { situation: '상황 설명', task: '업무 내용', action: '수행 내용', result: '결과' },
      { situation: '새로운 상황', task: '새로운 업무', action: '새로운 수행', result: '새로운 결과' },
    ];
    setStarStructure(starData);
  };

  const handleNavigateToQuestionMatch = () => {
    navigate('/match-questions', { state: { starData: starStructure } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{companyName} - 이력서 업로드</h1>
      <input type="file" accept=".txt,.pdf,.docx" onChange={handleFileUpload} />
      <div>
        <h2>이력서 내용</h2>
        <textarea
          value={resumeText}
          readOnly
          style={{ width: '100%', height: '200px' }}
        />
      </div>
      <div>
        <h2>STAR 구조</h2>
        {starStructure.map((star, index) => (
          <div key={index}>
            <p>상황: {star.situation}</p>
            <p>업무: {star.task}</p>
            <p>수행: {star.action}</p>
            <p>결과: {star.result}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handleNavigateToQuestionMatch}
        style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}
      >
        자기소개서 문항 매칭으로 이동
      </button>
    </div>
  );
};

export default UploadResume;
>>>>>>> e239cb1365f6363289fe6e893960ac49962a6fc4
