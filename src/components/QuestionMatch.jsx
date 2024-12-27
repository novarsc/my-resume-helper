<<<<<<< HEAD
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QuestionMatch = ({ questions, starData }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [matches, setMatches] = useState(
    questions.map((question) => ({
      question,
      selectedExperience: null,
    }))
  );

  const handleExperienceSelect = (questionIndex, experience) => {
    setMatches((prevMatches) =>
      prevMatches.map((match, index) =>
        index === questionIndex
          ? { ...match, selectedExperience: experience }
          : match
      )
    );
  };

  const handleSave = () => {
    console.log('매칭 결과:', matches);
    alert('매칭 결과가 저장되었습니다!');
  };

  const handleNavigateToWriteIntro = () => {
    navigate('/write-intro', { state: { matches } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>자기소개서 문항 매칭</h1>
      <div>
        {matches.map((match, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3>{match.question}</h3>
            <select
              onChange={(e) =>
                handleExperienceSelect(index, JSON.parse(e.target.value))
              }
              value={JSON.stringify(match.selectedExperience) || ''}
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            >
              <option value="">경험 선택</option>
              {starData.map((experience, idx) => (
                <option key={idx} value={JSON.stringify(experience)}>
                  {experience.situation} - {experience.result}
                </option>
              ))}
            </select>
            {match.selectedExperience && (
              <div style={{ marginTop: '10px' }}>
                <strong>선택된 경험:</strong>
                <p>
                  <strong>상황:</strong> {match.selectedExperience.situation}
                </p>
                <p>
                  <strong>업무:</strong> {match.selectedExperience.task}
                </p>
                <p>
                  <strong>수행:</strong> {match.selectedExperience.action}
                </p>
                <p>
                  <strong>결과:</strong> {match.selectedExperience.result}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleSave} style={{ padding: '10px 20px', fontSize: '16px', marginRight: '10px' }}>
        매칭 저장
      </button>
      <button onClick={handleNavigateToWriteIntro} style={{ padding: '10px 20px', fontSize: '16px' }}>
        자기소개서 쓰기
      </button>
    </div>
  );
};

export default QuestionMatch;
=======
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QuestionMatch = ({ questions, starData }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [matches, setMatches] = useState(
    questions.map((question) => ({
      question,
      selectedExperience: null,
    }))
  );

  const handleExperienceSelect = (questionIndex, experience) => {
    setMatches((prevMatches) =>
      prevMatches.map((match, index) =>
        index === questionIndex
          ? { ...match, selectedExperience: experience }
          : match
      )
    );
  };

  const handleSave = () => {
    console.log('매칭 결과:', matches);
    alert('매칭 결과가 저장되었습니다!');
  };

  const handleNavigateToWriteIntro = () => {
    navigate('/write-intro', { state: { matches } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>자기소개서 문항 매칭</h1>
      <div>
        {matches.map((match, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3>{match.question}</h3>
            <select
              onChange={(e) =>
                handleExperienceSelect(index, JSON.parse(e.target.value))
              }
              value={JSON.stringify(match.selectedExperience) || ''}
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            >
              <option value="">경험 선택</option>
              {starData.map((experience, idx) => (
                <option key={idx} value={JSON.stringify(experience)}>
                  {experience.situation} - {experience.result}
                </option>
              ))}
            </select>
            {match.selectedExperience && (
              <div style={{ marginTop: '10px' }}>
                <strong>선택된 경험:</strong>
                <p>
                  <strong>상황:</strong> {match.selectedExperience.situation}
                </p>
                <p>
                  <strong>업무:</strong> {match.selectedExperience.task}
                </p>
                <p>
                  <strong>수행:</strong> {match.selectedExperience.action}
                </p>
                <p>
                  <strong>결과:</strong> {match.selectedExperience.result}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleSave} style={{ padding: '10px 20px', fontSize: '16px', marginRight: '10px' }}>
        매칭 저장
      </button>
      <button onClick={handleNavigateToWriteIntro} style={{ padding: '10px 20px', fontSize: '16px' }}>
        자기소개서 쓰기
      </button>
    </div>
  );
};

export default QuestionMatch;
>>>>>>> e239cb1365f6363289fe6e893960ac49962a6fc4
