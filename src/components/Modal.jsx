import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';

const Modal = ({ onClose, company }) => {
  const [closing, setClosing] = useState(false); // 닫기 애니메이션 상태
  const navigate = useNavigate();

  // ESC 키 입력으로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 닫기 애니메이션 처리
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 300); // 애니메이션 시간과 일치
  };

  // 지원하기 버튼 클릭 시 이력서 업로드 페이지로 이동
  const handleApplyClick = () => {
    navigate('/upload-resume', { state: { companyName: company?.name } });
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className={`modal-content ${closing ? 'fade-out' : ''}`}
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭은 닫히지 않음
      >
        {/* 모달 헤더 */}
        <div className="modal-header">
          <h2>{company?.name || '기업 정보'}</h2>
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>

        {/* 모달 본문 */}
        <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <div className="modal-section">
            <h3>상세 정보</h3>
            <p><strong>회사 설명:</strong> {company?.description || '정보 없음'}</p>
            <p><strong>위치:</strong> {company?.location || '정보 없음'}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum
              vestibulum. Cras venenatis euismod malesuada. Morbi volutpat purus non arcu venenatis, eget congue 
              dui pretium. Duis vulputate est eu libero sodales, nec sagittis ligula aliquam. Suspendisse potenti.
              Pellentesque tincidunt sapien ac risus tincidunt, eu consequat eros congue. Proin interdum nulla ac
              placerat vehicula. Quisque sodales dolor vel orci tincidunt, nec venenatis lectus aliquet. Aenean 
              accumsan mauris euismod, convallis sem sit amet, bibendum turpis. Nulla et consequat lacus. Aliquam
              erat volutpat.
            </p>
          </div>
          <div className="modal-section">
            <h3>채용 일정</h3>
            <p>{company?.recruitmentSchedule || '정보 없음'}</p>
          </div>
          <div className="modal-section">
            <h3>채용 직무 및 자기소개서 문항</h3>
            <ul>
              {company?.jobPositions?.map((job, idx) => (
                <li key={idx}>
                  <strong>{job.position}:</strong> {job.questions.join(', ')}
                </li>
              )) || <p>정보 없음</p>}
            </ul>
          </div>
          <div className="modal-section">
            <h3>채용 공고</h3>
            <a
              href={company?.jobPostingLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              {company?.jobPostingLink ? '채용 공고 보기' : '채용 공고 없음'}
            </a>
          </div>
        </div>

        {/* 모달 푸터 */}
        <div className="modal-footer">
          <button className="action-btn" onClick={handleApplyClick}>지원하기</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
