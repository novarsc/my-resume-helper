import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Calendar from './components/Calendar';
import Modal from './components/Modal';
import UploadResume from './components/UploadResume'; // 이력서 업로드 페이지 추가
import QuestionMatch from './components/QuestionMatch'; // 자기소개서 매칭 페이지 추가
import WriteIntro from './components/WriteIntro'; // 자기소개서 작성 페이지 추가

const App = () => {
  // 선택된 기업 상태 관리
  const [selectedCompany, setSelectedCompany] = useState(null);

  // 관심 기업 상태 관리
  const [favorites, setFavorites] = useState([]);

  // 더미 기업 데이터
  const companies = [
    {
      name: '삼성전자',
      position: '소프트웨어 엔지니어',
      deadline: '2024-12-31',
      description: '삼성전자는 글로벌 IT 기업으로 혁신적인 제품과 기술을 제공합니다.',
    },
    {
      name: '네이버',
      position: '프론트엔드 개발자',
      deadline: '2024-12-25',
      description: '네이버는 한국을 대표하는 검색 엔진 기업으로 다양한 IT 서비스를 제공합니다.',
    },
    {
      name: '카카오',
      position: '백엔드 엔지니어',
      deadline: '2024-12-28',
      description: '카카오는 메신저와 다양한 플랫폼 서비스를 통해 혁신을 주도하는 IT 기업입니다.',
    },
    {
      name: 'LG전자',
      position: '백엔드 엔지니어',
      deadline: '2024-12-28',
      description: 'LG전자는 메신저와 다양한 플랫폼 서비스를 통해 혁신을 주도하는 IT 기업입니다.',
    },
  ];

  // 기업명을 클릭했을 때 모달 열기
  const handleCompanyClick = (companyName) => {
    const company = companies.find((comp) => comp.name === companyName);
    setSelectedCompany(company || null);
  };

  // 관심 기업 추가/제거
  const toggleFavorite = (companyName) => {
    const company = companies.find((comp) => comp.name === companyName);
    if (!company) return;

    if (favorites.some((fav) => fav.name === company.name)) {
      // 관심 기업 제거
      setFavorites(favorites.filter((fav) => fav.name !== company.name));
    } else {
      // 관심 기업 추가
      setFavorites([...favorites, company]);
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedCompany(null);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* 캘린더와 관심 기업 리스트를 렌더링 */}
              <Calendar
                onCompanyClick={handleCompanyClick}
                onToggleFavorite={toggleFavorite}
                favorites={favorites}
              />
              {selectedCompany && (
                <Modal onClose={closeModal} company={selectedCompany} />
              )}
              {/* 관심 기업 리스트 */}
              <div className="favorites">
                 <h3>관심 기업</h3>
                <ul>
                  {favorites.length > 0 ? (
                    favorites.map((company, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleCompanyClick(company.name)}
                        >
                          {company.name}
                        </button>
                      </li>
                    ))
                  ) : (
                    <p>아직 관심 기업이 없습니다.</p>
                  )}
                </ul>
              </div>
            </>
          }
        />
        <Route path="/about" element={<h1>서비스 소개</h1>} />
        <Route path="/write-intro" element={<WriteIntro />} />
        <Route path="/login" element={<h1>로그인 페이지</h1>} />
        <Route path="/upload-resume" element={<UploadResume />} /> {/* 이력서 업로드 페이지 라우트 추가 */}
        <Route
          path="/match-questions"
          element={
            <QuestionMatch
              questions={[
                '어려움을 극복한 경험을 서술하세요.',
                '팀워크를 발휘했던 사례를 서술하세요.',
              ]}
              starData={[
                {
                  situation: '프로젝트 납기를 앞두고 팀원이 부족했던 상황.',
                  task: '팀을 재조직하고 역할을 재분배.',
                  action: '직접적으로 부족한 부분을 보완하고 효율적인 커뮤니케이션을 통해 문제 해결.',
                  result: '프로젝트를 납기일 내 성공적으로 완료.',
                },
                {
                  situation: '신규 제품 개발 시 중요한 기술 문제가 발생.',
                  task: '기술적 해결책을 연구하고 제안.',
                  action: '문제 해결을 위한 회의 주재 및 솔루션 개발.',
                  result: '제품을 성공적으로 출시.',
                },
              ]} // 테스트 데이터
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
