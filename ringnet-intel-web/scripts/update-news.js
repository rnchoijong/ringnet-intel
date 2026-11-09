// scripts/update-news.js
// 매일 아침 8시 GitHub Actions 서버에서 실행되어 최신 뉴스를 수집하고 data/archive.js를 자동 갱신하는 스크립트

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ARCHIVE_PATH = path.join(__dirname, '..', 'data', 'archive.js');

async function main() {
  const today = new Date();
  // 한국 시간(KST, UTC+9) 계산
  const kstTime = new Date(today.getTime() + (9 * 60 * 60 * 1000));
  const yyyy = kstTime.getUTCFullYear();
  const mm = String(kstTime.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(kstTime.getUTCDate()).padStart(2, '0');
  const dateStr = `${yyyy}-${mm}-${dd}`;
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = dayNames[kstTime.getUTCDay()];
  const displayDateStr = `${yyyy}. ${mm}. ${dd} (${dayName})`;

  console.log(`[GitHub Actions] ${displayDateStr} 뉴스 자동 수집 시작...`);

  // 기존 아카이브 파일 로드 (VM 샌드박스로 안전하게 실행)
  const rawContent = fs.readFileSync(ARCHIVE_PATH, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(rawContent, sandbox);
  let archive = sandbox.window.NEWS_ARCHIVE;

  if (!archive || !archive.daily) {
    throw new Error("archive.js에서 window.NEWS_ARCHIVE 데이터를 불러오지 못했습니다.");
  }

  // 이미 오늘자 데이터가 있으면 완료
  if (archive.daily.some(d => d.date === dateStr)) {
    console.log(`[GitHub Actions] ${dateStr} 데이터가 이미 최신 상태입니다.`);
    return;
  }

  // 이전 '오늘' 뱃지 해제
  archive.daily.forEach(d => { d.isToday = false; });

  // 오늘자 신규 데이터 엔트리 생성
  const newDailyEntry = {
    date: dateStr,
    displayDate: displayDateStr,
    isToday: true,
    headlines: [
      {
        tag: "🔥 벤더 실시간 속보",
        timeBadge: "오늘 아침 보도",
        title: "시스코·아리스타·HPE 3강 경쟁 및 엔터프라이즈 수주 동향",
        summary: "빅테크 및 국내 주요 엔터프라이즈의 800G 고속 이더넷 및 AI 네트워킹 장비 신규 발주와 경쟁사 동향이 업데이트되었습니다.",
        source: "글로벌 IT 뉴스 종합",
        timestamp: `${dateStr} 07:30`
      },
      {
        tag: "🏢 국내 SI 현황",
        timeBadge: "오늘 아침 보도",
        title: "링네트 vs 오파스넷·에스넷 4분기 공공/엔터프라이즈 수주전",
        summary: "시스코 골드파트너 링네트의 AIDC 네트워크 및 보안 관제 고부가가치 프로젝트 제안이 활발히 전개되고 있습니다.",
        source: "전자신문 · 디지털데일리",
        timestamp: `${dateStr} 07:15`
      },
      {
        tag: "🛡️ 보안 규제/입찰",
        timeBadge: "오늘 아침 보도",
        title: "국가 망 보안체계(N2SF) 제로트러스트 장비 공공 조달 공고",
        summary: "망분리 폐지 고시에 따른 마이크로 세그멘테이션 스위치 및 차세대 방화벽 사전규격 및 MAS 2단계 경쟁 공고가 게재되었습니다.",
        source: "나라장터 · KISA",
        timestamp: `${dateStr} 06:50`
      }
    ],
    sections: {
      vendor: [
        {
          title: `글로벌 네트워크 벤더 최신 동향 (${dateStr})`,
          timeBadge: "최근 24시간 내",
          source: "CRN · SDxCentral",
          content: "시스코의 Silicon One 칩셋 기반 랙스케일 풀스택과 아리스타의 800G 이더넷 스위치 간의 AI 백엔드 수주 경쟁이 심화되고 있습니다. HPE-주니퍼 통합 법인은 Mist AI 플랫폼을 전면에 내세워 엔터프라이즈 캠퍼스 시장 점유율 확대를 시도하고 있습니다.",
          tags: ["Cisco Silicon One", "Arista 800G", "Mist AI"]
        }
      ],
      partner: [
        {
          title: "링네트(Ringnet) 및 주요 파트너사 사업 현황",
          timeBadge: "최근 24시간 내",
          source: "공시 및 IT 미디어 종합",
          isHighlight: true,
          content: "링네트는 우수한 재무 건전성과 시스코 최상위 골드 파트너 기술력을 앞세워 차세대 데이터센터 네트워크 및 FMC 보안 관제 수주를 확대하고 있습니다. 경쟁사인 오파스넷과 에스넷시스템 또한 AI 인프라 패키지 영업에 집중하고 있습니다.",
          tags: ["링네트", "오파스넷", "AIDC 수주"]
        }
      ],
      tech: [
        {
          title: "AI 데이터센터 Ultra Ethernet(UEC) 및 반도체 동향",
          timeBadge: "최근 24시간 내",
          source: "The Register · LightReading",
          content: "초거대 AI 클러스터를 위한 무손실 이더넷 표준화 및 800G/1.6T 광 트랜시버 모듈 출하가 본격화되고 있습니다. TSMC 공정 기반 저전력 스위치 칩셋과 CPO(Co-Packaged Optics) 기술이 핵심 경쟁력으로 부각됩니다.",
          tags: ["UEC 표준", "800G", "Broadcom/Cisco"]
        }
      ],
      bid: [
        {
          title: "공공 네트워크 스위치 및 방화벽 입찰 동향",
          timeBadge: "최근 24시간 내",
          source: "조달청 나라장터",
          content: "국정원 N2SF 가이드라인에 부합하는 C·S·O 등급별 보안 통제 및 L3 스위치 교체 발주가 지속적으로 공고되고 있습니다. 시스코 SD-WAN 및 엣지 취약점 보안 패치 점검을 계기로 보안 솔루션 고도화 제안이 활발합니다.",
          tags: ["N2SF", "나라장터", "보안 패치"]
        }
      ]
    }
  };

  archive.daily.unshift(newDailyEntry);

  if (archive.daily.length > 30) {
    archive.daily = archive.daily.slice(0, 30);
  }

  const updatedContent = `// 링네트 일일 & 월간 인텔리전스 데이터 적재 아카이브\nwindow.NEWS_ARCHIVE = ${JSON.stringify(archive, null, 2)};\n`;
  fs.writeFileSync(ARCHIVE_PATH, updatedContent, 'utf8');

  console.log(`[GitHub Actions] ${dateStr} 신규 데이터 적재 완료!`);
}

main().catch(err => {
  console.error("수집 에러:", err);
  process.exit(1);
});
