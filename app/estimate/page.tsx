'use client';

import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import MobileLayout from '../components/MobileLayout';

const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 20;
`;

const ProgressContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
`;

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const StepCount = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const StepTitle = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
`;

const ProgressBar = styled.div`
  height: 0.25rem;
  background-color: #f3f4f6;
  border-radius: 9999px;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 0.25rem;
  background-color: var(--primary-color);
  border-radius: 9999px;
  transition: width 300ms;
  width: ${(props) => props.progress}%;
`;

const CurrentEstimateContainer = styled.div`
  background-color: white;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f3f4f6;
`;

const CurrentEstimateInner = styled.div`
  background-color: var(--primary-bg);
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CurrentEstimateTitle = styled.div`
  font-size: 0.875rem;
  color: var(--primary-color);
`;

const CurrentEstimateAmount = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--primary-color);
`;

const Content = styled.div<{ $showResult?: boolean }>`
  padding: 1rem;
  min-height: calc(100vh - 200px);
  // margin-top: 10rem;
`;

const StepHeader = styled.div`
  margin-bottom: 1.25rem;
`;

const StepTitle2 = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #111827;
`;

const StepDescription = styled.p`
  color: #4b5563;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 1.125rem;
  &:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 0 1px var(--primary-color);
  }
`;

const InputUnit = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`;

const InputNote = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const OptionButton = styled.button<{ selected: boolean }>`
  width: 100%;
  border: 1px solid ${(props) => (props.selected ? 'var(--primary-color)' : '#E5E7EB')};
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: left;
  transition: all 150ms;
  background-color: ${(props) => (props.selected ? 'var(--primary-bg)' : 'transparent')};
  color: ${(props) => (props.selected ? 'var(--primary-color)' : '#111827')};
  &:hover {
    border-color: ${(props) => (props.selected ? 'var(--primary-color)' : 'var(--primary-light)')};
  }
`;

const OptionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const OptionTitle = styled.span`
  font-weight: 500;
  font-size: 1rem;
`;

const OptionPrice = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const OptionDescription = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  padding-bottom: 2rem;
`;

const InteriorCard = styled.div<{ selected: boolean }>`
  aspect-ratio: 1;
  border: 1px solid ${(props) => (props.selected ? 'var(--primary-color)' : '#E5E7EB')};
  overflow: hidden;
  cursor: pointer;
  transition: all 150ms;

  &:hover {
    border-color: var(--primary-color);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 70%;
  background-color: #f3f4f6;
`;

const CardContent = styled.div`
  padding: 0.5rem;
`;

const CardTitle = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
  color: #111827;
  margin-bottom: 0.25rem;
`;

const CardPrice = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 100px;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  z-index: 10;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Button = styled.button<{ $primary?: boolean; disabled?: boolean }>`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  ${(props) =>
    props.$primary
      ? `
    background-color: var(--primary-color);
    color: white;
    &:hover {
      background-color: var(--primary-dark);
    }
  `
      : `
    background-color: var(--secondary-color);
    color: white;
    &:hover {
      background-color: var(--secondary-dark);
    }
  `}
  ${(props) =>
    props.disabled &&
    `
    opacity: 0.5;
    cursor: not-allowed;
  `}
`;

const EstimateResultContainer = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 2rem;
  margin-bottom: 3.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const EstimateResultTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #111827;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
`;

const EstimateResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const EstimateItemLabel = styled.span`
  color: #4b5563;
  font-weight: 500;
`;

const EstimateItemValue = styled.span`
  font-weight: 600;
  color: #111827;
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.25rem 0;
  margin-top: 1.5rem;
  border-top: 2px solid #e5e7eb;
  background-color: var(--primary-bg);
  margin: 1.5rem -2rem -2rem -2rem;
  padding: 1.5rem 2rem;
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
`;

const TotalLabel = styled.span`
  font-weight: bold;
  font-size: 1.25rem;
  color: var(--primary-color);
`;

const TotalValue = styled.span`
  font-weight: bold;
  font-size: 1.25rem;
  color: var(--primary-color);
`;

const EQUIPMENT_GRADES = [
  {
    id: 'basic',
    name: '보급형',
    description: '기본적인 카페 운영에 필요한 장비',
    price: 15000000,
    equipments: ['espresso_basic', 'grinder_basic', 'ice_basic', 'refrigerator_basic', 'water_basic'],
  },
  {
    id: 'standard',
    name: '일반형',
    description: '안정적인 품질의 장비 구성',
    price: 25000000,
    equipments: ['espresso_standard', 'grinder_standard', 'ice_standard', 'refrigerator_standard', 'water_standard'],
  },
  {
    id: 'premium',
    name: '고급형',
    description: '프리미엄 품질의 장비 구성',
    price: 35000000,
    equipments: ['espresso_premium', 'grinder_premium', 'ice_premium', 'refrigerator_premium', 'water_premium'],
  },
];

const EQUIPMENT_TYPES = [
  { id: 'espresso_basic', name: '에스프레소 머신', description: '기본형 에스프레소 머신', price: 8000000 },
  { id: 'espresso_standard', name: '에스프레소 머신', description: '중급형 에스프레소 머신', price: 15000000 },
  { id: 'espresso_premium', name: '에스프레소 머신', description: '프리미엄 에스프레소 머신', price: 28000000 },
  { id: 'grinder_basic', name: '그라인더', description: '기본형 원두 분쇄기', price: 800000 },
  { id: 'grinder_standard', name: '그라인더', description: '중급형 원두 분쇄기', price: 1500000 },
  { id: 'grinder_premium', name: '그라인더', description: '프리미엄 원두 분쇄기', price: 3000000 },
  { id: 'ice_basic', name: '제빙기', description: '기본형 각얼음 제조기', price: 800000 },
  { id: 'ice_standard', name: '제빙기', description: '중급형 각얼음 제조기', price: 1500000 },
  { id: 'ice_premium', name: '제빙기', description: '프리미엄 각얼음 제조기', price: 2500000 },
  { id: 'refrigerator_basic', name: '냉장쇼케이스', description: '기본형 디저트 진열장', price: 1200000 },
  { id: 'refrigerator_standard', name: '냉장쇼케이스', description: '중급형 디저트 진열장', price: 2500000 },
  { id: 'refrigerator_premium', name: '냉장쇼케이스', description: '프리미엄 디저트 진열장', price: 4000000 },
  { id: 'water_basic', name: '온수기', description: '기본형 온수 공급기', price: 500000 },
  { id: 'water_standard', name: '온수기', description: '중급형 온수 공급기', price: 1000000 },
  { id: 'water_premium', name: '온수기', description: '프리미엄 온수 공급기', price: 1500000 },
];

const ToggleButton = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  padding: 0.75rem;
  background-color: ${(props) => (props.$isOpen ? 'var(--primary-bg)' : 'white')};
  border: 1px solid ${(props) => (props.$isOpen ? 'var(--primary-color)' : '#E5E7EB')};
  border-radius: 0.75rem;
  color: ${(props) => (props.$isOpen ? 'var(--primary-color)' : '#111827')};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 150ms;

  &:hover {
    border-color: var(--primary-color);
  }
`;

const ToggleIcon = styled.span<{ $isOpen: boolean }>`
  transform: ${(props) => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  transition: transform 150ms;
`;

interface EstimateStep {
  id: number;
  title: string;
  description: string;
}

interface EstimateData {
  budget: number;
  size: number;
  interiorType: string;
  menuTypes: string[];
  equipments: string[];
  beanTypes: string[];
}

const ESTIMATE_STEPS: EstimateStep[] = [
  {
    id: 1,
    title: '예산 설정',
    description: '창업 예산을 설정해주세요',
  },
  {
    id: 2,
    title: '평형 선택',
    description: '카페 공간의 크기를 선택해주세요',
  },
  {
    id: 3,
    title: '인테리어 스타일',
    description: '원하시는 인테리어 스타일을 선택해주세요',
  },
  {
    id: 4,
    title: '메뉴 구성',
    description: '제공하실 메뉴를 선택해주세요',
  },
  {
    id: 5,
    title: '장비 선택',
    description: '필요한 카페 장비를 선택해주세요',
  },
  {
    id: 6,
    title: '원두 선택',
    description: '사용하실 원두를 선택해주세요',
  },
];

const INTERIOR_TYPES = [
  { id: 'modern', name: '모던', description: '깔끔하고 심플한 디자인', price: 500000 },
  { id: 'industrial', name: '인더스트리얼', description: '세련된 공장형 감성', price: 600000 },
  { id: 'natural', name: '내추럴', description: '따뜻한 자연 친화적', price: 550000 },
  { id: 'vintage', name: '빈티지', description: '클래식한 복고풍', price: 580000 },
  { id: 'minimal', name: '미니멀', description: '극도로 심플한 디자인', price: 450000 },
];

const MENU_TYPES = [
  { id: 'coffee', name: '커피', description: '에스프레소 베이스 음료', price: 1000000 },
  { id: 'beverage', name: '음료', description: '에이드, 차 등 기타 음료', price: 800000 },
  { id: 'bakery', name: '베이커리', description: '빵, 케이크 등', price: 2000000 },
  { id: 'brunch', name: '브런치', description: '샌드위치, 파스타 등', price: 2500000 },
  { id: 'dessert', name: '디저트', description: '쿠키, 마카롱 등', price: 1500000 },
];

const BEAN_TYPES = [
  { id: 'blend', name: '블렌드', description: '균형잡힌 맛', price: 25000 },
  { id: 'single_origin', name: '싱글 오리진', description: '원산지별 특색', price: 30000 },
  { id: 'specialty', name: '스페셜티', description: '고급 원두', price: 35000 },
];

export default function EstimatePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [estimateData, setEstimateData] = useState<EstimateData>({
    budget: 0,
    size: 0,
    interiorType: '',
    menuTypes: [],
    equipments: [],
    beanTypes: [],
  });
  const [interiorTypes, setInteriorTypes] = useState(INTERIOR_TYPES);
  const [loading, setLoading] = useState(false);
  const [showDetailedEquipment, setShowDetailedEquipment] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<string>('');

  const handleNext = () => {
    if (currentStep < ESTIMATE_STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (showResult) {
      setShowResult(false);
      setCurrentStep(1);
      setEstimateData({
        budget: 0,
        size: 0,
        interiorType: '',
        menuTypes: [],
        equipments: [],
        beanTypes: [],
      });
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const loadMoreInteriors = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const newItems = [...INTERIOR_TYPES].map((item, index) => ({
        ...item,
        id: `${item.id}_${interiorTypes.length + index}`,
      }));
      setInteriorTypes([...interiorTypes, ...newItems]);
      setLoading(false);
    }, 1000);
  }, [interiorTypes]);

  useEffect(() => {
    const handleScroll = () => {
      if (currentStep !== 3) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollHeight - scrollTop <= clientHeight * 1.5 && !loading) {
        loadMoreInteriors();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentStep, loading, interiorTypes, loadMoreInteriors]);

  const calculateEstimate = () => {
    let total = 0;

    // 인테리어 비용 계산
    const selectedInterior = INTERIOR_TYPES.find((type) => type.id === estimateData.interiorType);
    const interiorCost = selectedInterior ? selectedInterior.price * estimateData.size : 0;

    // 메뉴 관련 비용 계산
    const menuCost = MENU_TYPES.filter((type) => estimateData.menuTypes.includes(type.id)).reduce((sum, type) => sum + type.price, 0);

    // 장비 비용 계산
    const equipmentCost = EQUIPMENT_TYPES.filter((type) => estimateData.equipments.includes(type.id)).reduce((sum, type) => sum + type.price, 0);

    // 원두 초기 비용 계산 (1개월 기준, 하루 1kg 사용 가정)
    const beanMonthlyCost = BEAN_TYPES.filter((type) => estimateData.beanTypes.includes(type.id)).reduce((sum, type) => sum + type.price * 30, 0);

    total = interiorCost + menuCost + equipmentCost + beanMonthlyCost;

    return {
      interiorCost,
      menuCost,
      equipmentCost,
      beanMonthlyCost,
      total,
    };
  };

  const handleGradeSelect = (gradeId: string) => {
    setSelectedGrade(gradeId);
    const grade = EQUIPMENT_GRADES.find((g) => g.id === gradeId);
    if (grade) {
      setEstimateData((prev) => ({
        ...prev,
        equipments: grade.equipments,
      }));
    }
  };

  return (
    <MobileLayout showHomeBar={true}>
      <StickyHeader>
        <ProgressContainer>
          <ProgressHeader>
            <StepCount>{showResult ? '견적 결과' : `${currentStep} / ${ESTIMATE_STEPS.length} 단계`}</StepCount>
            <StepTitle>{showResult ? '최종 견적서' : ESTIMATE_STEPS[currentStep - 1].title}</StepTitle>
          </ProgressHeader>
          <ProgressBar>
            <ProgressFill progress={showResult ? 100 : (currentStep / ESTIMATE_STEPS.length) * 100} />
          </ProgressBar>
        </ProgressContainer>

        {!showResult && (
          <CurrentEstimateContainer>
            <CurrentEstimateInner>
              <CurrentEstimateTitle>현재 견적 합계</CurrentEstimateTitle>
              <CurrentEstimateAmount>{calculateEstimate().total.toLocaleString()}원</CurrentEstimateAmount>
            </CurrentEstimateInner>
          </CurrentEstimateContainer>
        )}
      </StickyHeader>

      <Content $showResult={showResult}>
        {!showResult ? (
          <>
            <StepHeader>
              <StepTitle2>{ESTIMATE_STEPS[currentStep - 1].title}</StepTitle2>
              <StepDescription>{ESTIMATE_STEPS[currentStep - 1].description}</StepDescription>
            </StepHeader>

            {currentStep === 1 && (
              <div>
                <InputContainer>
                  <Input type="number" placeholder="예산을 입력해주세요" value={estimateData.budget || ''} onChange={(e) => setEstimateData({ ...estimateData, budget: Number(e.target.value) })} />
                  <InputUnit>만원</InputUnit>
                </InputContainer>
                <InputNote>* 인테리어, 설비, 기타 비용이 모두 포함된 금액입니다.</InputNote>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <InputContainer>
                  <Input type="number" placeholder="평형을 입력해주세요" value={estimateData.size || ''} onChange={(e) => setEstimateData({ ...estimateData, size: Number(e.target.value) })} />
                  <InputUnit>평</InputUnit>
                </InputContainer>
                <InputNote>* 실평수 기준으로 입력해주세요.</InputNote>
              </div>
            )}

            {currentStep === 3 && (
              <GridContainer>
                {interiorTypes.map((type) => (
                  <InteriorCard key={type.id} selected={estimateData.interiorType === type.id} onClick={() => setEstimateData({ ...estimateData, interiorType: type.id })}>
                    <ImagePlaceholder />
                    <CardContent>
                      <CardTitle>{type.name}</CardTitle>
                      <CardPrice>{type.price.toLocaleString()}원/평</CardPrice>
                    </CardContent>
                  </InteriorCard>
                ))}
                {loading && <div>로딩 중...</div>}
              </GridContainer>
            )}

            {currentStep === 4 && (
              <div>
                {MENU_TYPES.map((type) => (
                  <OptionButton
                    key={type.id}
                    selected={estimateData.menuTypes.includes(type.id)}
                    onClick={() =>
                      setEstimateData({
                        ...estimateData,
                        menuTypes: estimateData.menuTypes.includes(type.id) ? estimateData.menuTypes.filter((id) => id !== type.id) : [...estimateData.menuTypes, type.id],
                      })
                    }
                  >
                    <OptionHeader>
                      <OptionTitle>{type.name}</OptionTitle>
                      <OptionPrice>초기 비용 {type.price.toLocaleString()}원</OptionPrice>
                    </OptionHeader>
                    <OptionDescription>{type.description}</OptionDescription>
                  </OptionButton>
                ))}
              </div>
            )}

            {currentStep === 5 && (
              <div>
                {!showDetailedEquipment ? (
                  <>
                    {EQUIPMENT_GRADES.map((grade) => (
                      <OptionButton key={grade.id} selected={selectedGrade === grade.id} onClick={() => handleGradeSelect(grade.id)}>
                        <OptionHeader>
                          <OptionTitle>{grade.name}</OptionTitle>
                          <OptionPrice>{grade.price.toLocaleString()}원</OptionPrice>
                        </OptionHeader>
                        <OptionDescription>{grade.description}</OptionDescription>
                      </OptionButton>
                    ))}
                    <ToggleButton $isOpen={showDetailedEquipment} onClick={() => setShowDetailedEquipment(true)}>
                      장비 상세 선택하기
                      <ToggleIcon $isOpen={showDetailedEquipment}>▼</ToggleIcon>
                    </ToggleButton>
                  </>
                ) : (
                  <>
                    <ToggleButton $isOpen={showDetailedEquipment} onClick={() => setShowDetailedEquipment(false)}>
                      장비 등급 선택으로 돌아가기
                      <ToggleIcon $isOpen={showDetailedEquipment}>▼</ToggleIcon>
                    </ToggleButton>
                    {EQUIPMENT_TYPES.map((type) => (
                      <OptionButton
                        key={type.id}
                        selected={estimateData.equipments.includes(type.id)}
                        onClick={() =>
                          setEstimateData({
                            ...estimateData,
                            equipments: estimateData.equipments.includes(type.id) ? estimateData.equipments.filter((id) => id !== type.id) : [...estimateData.equipments, type.id],
                          })
                        }
                      >
                        <OptionHeader>
                          <OptionTitle>{type.name}</OptionTitle>
                          <OptionPrice>{type.price.toLocaleString()}원</OptionPrice>
                        </OptionHeader>
                        <OptionDescription>{type.description}</OptionDescription>
                      </OptionButton>
                    ))}
                  </>
                )}
              </div>
            )}

            {currentStep === 6 && (
              <div>
                {BEAN_TYPES.map((type) => (
                  <OptionButton
                    key={type.id}
                    selected={estimateData.beanTypes.includes(type.id)}
                    onClick={() =>
                      setEstimateData({
                        ...estimateData,
                        beanTypes: estimateData.beanTypes.includes(type.id) ? estimateData.beanTypes.filter((id) => id !== type.id) : [...estimateData.beanTypes, type.id],
                      })
                    }
                  >
                    <OptionHeader>
                      <OptionTitle>{type.name}</OptionTitle>
                      <OptionPrice>{type.price.toLocaleString()}원/kg</OptionPrice>
                    </OptionHeader>
                    <OptionDescription>{type.description}</OptionDescription>
                  </OptionButton>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <EstimateResultContainer>
              <EstimateResultTitle>카페 창업 견적서</EstimateResultTitle>

              <EstimateResultItem>
                <EstimateItemLabel>공간 크기</EstimateItemLabel>
                <EstimateItemValue>{estimateData.size}평</EstimateItemValue>
              </EstimateResultItem>
              <EstimateResultItem>
                <EstimateItemLabel>예상 예산</EstimateItemLabel>
                <EstimateItemValue>{estimateData.budget.toLocaleString()}만원</EstimateItemValue>
              </EstimateResultItem>

              <EstimateResultTitle style={{ marginTop: '2rem' }}>인테리어</EstimateResultTitle>
              {estimateData.interiorType && (
                <EstimateResultItem>
                  <EstimateItemLabel>
                    {INTERIOR_TYPES.find((type) => type.id === estimateData.interiorType)?.name} 스타일
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>{INTERIOR_TYPES.find((type) => type.id === estimateData.interiorType)?.description}</div>
                  </EstimateItemLabel>
                  <EstimateItemValue>
                    <div>{INTERIOR_TYPES.find((type) => type.id === estimateData.interiorType)?.price.toLocaleString()}원/평</div>
                    <div style={{ color: '#6b7280', marginTop: '0.25rem' }}>총 {calculateEstimate().interiorCost.toLocaleString()}원</div>
                  </EstimateItemValue>
                </EstimateResultItem>
              )}

              <EstimateResultTitle style={{ marginTop: '2rem' }}>선택한 메뉴</EstimateResultTitle>
              {estimateData.menuTypes.map((menuId) => {
                const menu = MENU_TYPES.find((type) => type.id === menuId);
                return (
                  menu && (
                    <EstimateResultItem key={menu.id}>
                      <EstimateItemLabel>
                        {menu.name}
                        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>{menu.description}</div>
                      </EstimateItemLabel>
                      <EstimateItemValue>{menu.price.toLocaleString()}원</EstimateItemValue>
                    </EstimateResultItem>
                  )
                );
              })}
              {estimateData.menuTypes.length > 0 && (
                <EstimateResultItem style={{ backgroundColor: 'var(--primary-bg)', padding: '0.75rem', borderRadius: '0.5rem', marginTop: '0.5rem' }}>
                  <EstimateItemLabel>메뉴 초기 비용 합계</EstimateItemLabel>
                  <EstimateItemValue>{calculateEstimate().menuCost.toLocaleString()}원</EstimateItemValue>
                </EstimateResultItem>
              )}

              <EstimateResultTitle style={{ marginTop: '2rem' }}>선택한 장비</EstimateResultTitle>
              {estimateData.equipments.map((equipmentId) => {
                const equipment = EQUIPMENT_TYPES.find((type) => type.id === equipmentId);
                return (
                  equipment && (
                    <EstimateResultItem key={equipment.id}>
                      <EstimateItemLabel>
                        {equipment.name}
                        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>{equipment.description}</div>
                      </EstimateItemLabel>
                      <EstimateItemValue>{equipment.price.toLocaleString()}원</EstimateItemValue>
                    </EstimateResultItem>
                  )
                );
              })}
              {estimateData.equipments.length > 0 && (
                <EstimateResultItem style={{ backgroundColor: 'var(--primary-bg)', padding: '0.75rem', borderRadius: '0.5rem', marginTop: '0.5rem' }}>
                  <EstimateItemLabel>장비 구매 비용 합계</EstimateItemLabel>
                  <EstimateItemValue>{calculateEstimate().equipmentCost.toLocaleString()}원</EstimateItemValue>
                </EstimateResultItem>
              )}

              <EstimateResultTitle style={{ marginTop: '2rem' }}>선택한 원두</EstimateResultTitle>
              {estimateData.beanTypes.map((beanId) => {
                const bean = BEAN_TYPES.find((type) => type.id === beanId);
                return (
                  bean && (
                    <EstimateResultItem key={bean.id}>
                      <EstimateItemLabel>
                        {bean.name}
                        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>{bean.description}</div>
                      </EstimateItemLabel>
                      <EstimateItemValue>
                        <div>{bean.price.toLocaleString()}원/kg</div>
                        <div style={{ color: '#6b7280', marginTop: '0.25rem' }}>월 {(bean.price * 30).toLocaleString()}원</div>
                      </EstimateItemValue>
                    </EstimateResultItem>
                  )
                );
              })}
              {estimateData.beanTypes.length > 0 && (
                <EstimateResultItem style={{ backgroundColor: 'var(--primary-bg)', padding: '0.75rem', borderRadius: '0.5rem', marginTop: '0.5rem' }}>
                  <EstimateItemLabel>원두 월 사용 비용 합계</EstimateItemLabel>
                  <EstimateItemValue>{calculateEstimate().beanMonthlyCost.toLocaleString()}원</EstimateItemValue>
                </EstimateResultItem>
              )}

              <TotalAmount>
                <TotalLabel>총 예상 비용</TotalLabel>
                <TotalValue>{calculateEstimate().total.toLocaleString()}원</TotalValue>
              </TotalAmount>
            </EstimateResultContainer>
          </>
        )}
      </Content>

      <ButtonContainer>
        <ButtonGroup>
          <Button onClick={handlePrev} disabled={currentStep === 1}>
            {showResult ? '다시 설정하기' : '이전'}
          </Button>
          {!showResult && (
            <Button $primary onClick={handleNext}>
              {currentStep === ESTIMATE_STEPS.length ? '견적서 확인' : '다음'}
            </Button>
          )}
        </ButtonGroup>
      </ButtonContainer>
    </MobileLayout>
  );
}
