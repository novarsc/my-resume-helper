import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Calendar.css';

const Calendar = ({ onCompanyClick, onToggleFavorite, favorites }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // 서치바 입력값 추가
  const [suggestions, setSuggestions] = useState([]); // 자동완성 목록 추가
  const [activeSuggestion, setActiveSuggestion] = useState(-1); // 활성화된 제안 인덱스
  const [selectedCompany, setSelectedCompany] = useState(null); // 선택된 기업 상태
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // API에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/calendar-data'); // 실제 API 경로로 수정
        const data = await response.json();
        setCalendarData(data);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
        setCalendarData([
          { date: '2024-12-22', companies: ['삼성전자', '네이버', '카카오'] },
          { date: '2024-12-23', companies: ['LG전자', '현대자동차'] },
          { date: '2024-12-25', companies: ['SK하이닉스', 'CJ ENM'] },
        ]);
      }
    };

    fetchData();
  }, [currentDate]);

  // 로컬 시간대 형식으로 날짜 변환 함수
  const formatDateToLocal = (date) => {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().split('T')[0];
  };

  // 현재 월의 모든 날짜 가져오기 (빈칸 포함)
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date: formatDateToLocal(date),
        day: date.getDay(),
      });
    }

    return days;
  };

  // 이전/다음 달 이동
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // 날짜 일치 여부 확인 함수
  const isDateMatching = (entryDate, targetDate) => {
    return formatDateToLocal(new Date(entryDate)) === targetDate;
  };

  // 검색어 변경 시 자동완성 목록 업데이트
  useEffect(() => {
    if (searchTerm) {
      const allCompanies = calendarData.flatMap((entry) => entry.companies);
      const filtered = allCompanies.filter((company) =>
        company.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
      setActiveSuggestion(-1); // 검색어 변경 시 활성화된 제안 초기화
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, calendarData]);

  // 검색어에 맞는 데이터 필터링
  const filteredCalendarData = calendarData.map((entry) => ({
    ...entry,
    companies: entry.companies.filter((company) => company.includes(searchTerm)),
  }));

  const daysInMonth = getDaysInMonth();

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveSuggestion((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setActiveSuggestion((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      if (activeSuggestion >= 0) {
        setSearchTerm(suggestions[activeSuggestion]);
      }
      setSuggestions([]); // 선택 후 자동완성 목록 숨기기
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSuggestions([]); // 검색창에 새로 입력 시 자동완성 목록 초기화
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]); // 선택 후 자동완성 목록 숨기기
  };

  const handleInputFocus = () => {
    setSearchTerm('');
    setSuggestions([]); // 검색창에 포커스 시 초기화
  };

  const handleCompanyClick = (companyName) => {
    const selectedEntry = calendarData.find((entry) =>
      entry.companies.includes(companyName)
    );

    const companyDetails = {
      name: companyName,
      description: `${companyName}의 상세 정보입니다.`,
      location: 'Seoul, South Korea',
      recruitmentSchedule: selectedEntry
        ? `${selectedEntry.date} - ${selectedEntry.date}`
        : '정보 없음',
      jobPositions: [
        {
          position: '소프트웨어 엔지니어',
          questions: ['당신의 강점을 설명하세요', '우리 회사에서 이루고 싶은 목표는?'],
        },
        {
          position: '디자인 엔지니어',
          questions: ['포트폴리오에 대한 설명', '디자인에 가장 중요하다고 생각하는 점은?'],
        },
      ],
      jobPostingLink: 'https://example.com/job-posting',
    };

    setSelectedCompany(companyDetails);
  };

  return (
    <div className="calendar">
      {/* 서치바 추가 */}
      <div style={{ marginBottom: '20px', textAlign: 'center', position: 'relative' }}>
        <input
          type="text"
          placeholder="기업명을 입력하세요..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          style={{ padding: '10px', width: '800px', fontSize: '16px' }}
        />
        {suggestions.length > 0 && (
          <ul
            style={{
              listStyleType: 'none',
              padding: '0',
              margin: '0',
              background: 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
              position: 'absolute',
              width: '800px',
              zIndex: '1000',
              maxHeight: '150px',
              overflowY: 'auto',
              top: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'left',
            }}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                style={{
                  padding: '8px 10px',
                  cursor: 'pointer',
                  backgroundColor: index === activeSuggestion ? '#e6e6e6' : 'white',
                }}
                onMouseEnter={() => setActiveSuggestion(index)}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 월 이동 컨트롤 */}
      <div className="calendar-controls">
        <button onClick={handlePrevMonth}>&lt; 이전</button>
        <span>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </span>
        <button onClick={handleNextMonth}>다음 &gt;</button>
      </div>

      {/* 요일 헤더 */}
      <div className="calendar-header">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-header">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 및 기업 정보 */}
      <div className="calendar-body">
        {daysInMonth.map((day, index) =>
          day ? (
            <div
              key={day.date}
              className={`calendar-cell ${
                day.date === formatDateToLocal(new Date()) ? 'today' : ''
              }`}
            >
              {/* 날짜 표시 */}
              <div className="date">{day.date.split('-')[2]}</div>
              {/* 필터링된 기업명과 별표 표시 */}
              <ul className="company-list">
                {filteredCalendarData
                  .find((entry) => isDateMatching(entry.date, day.date))
                  ?.companies.map((company, idx) => (
                    <li key={idx} className="company-item">
                      <span
                        className="company-name"
                        onClick={() => handleCompanyClick(company)}
                      >
                        {company}
                      </span>
                      <button
                        className={`favorite-btn ${
                          favorites.some((fav) => fav.name === company) ? 'active' : ''
                        }`}
                        onClick={() => onToggleFavorite(company)}
                      >
                        ★
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <div key={index} className="calendar-cell empty"></div>
          )
        )}
      </div>

      {selectedCompany && (
        <Modal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
};

export default Calendar;
