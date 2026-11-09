import type { Config, Context } from "@netlify/edge-functions";

// 링네트 일일 & 월간 인텔리전스 JSON 데이터
const NEWS_DATA = {
  daily: [
    {
      date: "2026-11-09",
      displayDate: "2026. 11. 09 (월)",
      isToday: true,
      headlines: [
        {
          tag: "🔥 벤더 지각변동",
          timeBadge: "3시간 전 (오늘 05:40)",
          title: "아리스타, AI 이더넷 열풍에 분기 매출 +58% 폭증",
          summary: "빅테크(MS, Meta 등)가 고가 폐쇄형 인피니밴드에서 탈피, 아리스타 800G 이더넷 채택을 가속화하며 AI 매출 목표치를 70억 달러로 상향했습니다.",
          source: "Barchart · Reuters",
          timestamp: "2026-11-09 05:40"
        },
        {
          tag: "🚀 차세대 광학 표준",
          timeBadge: "5시간 전 (오늘 03:15)",
          title: "시스코-엔비디아, 초고밀도 'USFP' 규격 공동 발표",
          summary: "OCP Summit에서 레인당 400Gbps로 대역폭 밀도를 4배 끌어올리는 차세대 초소형 광학 인터페이스 USFP를 공동 공개했습니다.",
          source: "CRN · Cisco News",
          timestamp: "2026-11-09 03:15"
        },
        {
          tag: "🛡️ 공공 보안 기회",
          timeBadge: "8시간 전 (어제 23:50)",
          title: "국정원 망분리 폐지 고시 & 제로트러스트 스위치",
          summary: "20년 만의 물리적 망분리 의무 폐지가 고시되며 데이터 3등급제(C·S·O) 및 제로트러스트 마이크로 세그멘테이션 스위치 발주가 급증하고 있습니다.",
          source: "보안뉴스 · 지디넷코리아",
          timestamp: "2026-11-08 23:50"
        }
      ],
      sections: {
        vendor: [
          {
            title: "아리스타(Arista), 실적 서프라이즈 & AI 매출 목표 70억 달러로 상향",
            timeBadge: "3시간 전 (오늘 05:40)",
            source: "Barchart · SDxCentral",
            content: "아리스타가 분기 매출 36.6억 달러(YoY +58% 폭증)를 기록했습니다. MS, 메타 등 초대형 클라우드 사업자들이 고비용의 인피니밴드 대신 아리스타의 초고속 이더넷 스위치를 대거 선택하고 있습니다. 또한 인수한 VeloCloud SD-WAN을 CloudVision에 통합 완료하여 엔터프라이즈 캠퍼스 및 지사 네트워크 영역까지 시스코의 카탈리스트 시장을 강하게 압박하고 있습니다.",
            tags: ["Arista 7060X6", "VeloCloud SD-WAN", "800G Ethernet"]
          },
          {
            title: "HPE-주니퍼 합병($14B) 완료 후 시너지 공세 가속",
            timeBadge: "7시간 전 (오늘 01:20)",
            source: "TechTarget · Futuriom",
            content: "HPE가 주니퍼 인수를 마무리하고 라미 라힘 전 주니퍼 CEO 총괄하에 통합 네트워킹 부문을 본격 가동했습니다. Aruba Central과 Juniper Mist AI의 마이크로서비스 클라우드 아키텍처를 공유하는 '듀얼 플랫폼' 전략을 통해 유무선 LAN부터 AI 데이터센터 코어 라우팅까지 포괄하는 '시스코 대체재 1순위' 위치를 확고히 굳히고 있습니다.",
            tags: ["Mist AIOps", "Aruba Central"]
          }
        ],
        partner: [
          {
            title: "🏆 링네트(Ringnet), 국내 NI 업계 최고 수준 영업수익성 입증",
            timeBadge: "11시간 전 (어제 21:00)",
            source: "금융감독원 전자공시",
            isHighlight: true,
            content: "링네트는 연결 매출 1,831억 원(YoY +12%), 영업이익 143억 원(YoY +5%)을 달성했습니다. 특히 하반기 GPU 인프라 및 AI 데이터센터 네트워크 납품 집중으로 4분기 분기 영업이익이 74% 급증했습니다. 업계 최고 수준의 현금흐름과 AA- 신용등급을 바탕으로 대형 엔터프라이즈 프로젝트 수주에서 유리한 고지를 유지하고 있습니다.",
            tags: ["링네트 실적", "AA- 신용등급", "AIDC 수주"]
          },
          {
            title: "오파스넷 (Opasnet) - 스플렁크 연계 고마진 관제 수주 확대",
            timeBadge: "14시간 전 (어제 18:30)",
            source: "언론사 종합",
            content: "매출 2,333억 원(YoY +20.9%), 영업이익 140억 원을 기록하며 약진했습니다. 시스코 인프라 기반 위에 스플렁크(Splunk) 및 AIOps 관제 소프트웨어 패키지 결합 판매를 통해 마진율을 끌어올리고 있습니다.",
            tags: ["오파스넷", "Splunk 관제"]
          },
          {
            title: "에스넷시스템 (Snet) - 풀스택 GPU 인프라 패키지 드라이브",
            timeBadge: "16시간 전 (어제 16:15)",
            source: "IT Daily",
            content: "연결 매출 4,500억 원대로 엔비디아 파트너십 및 자회사 굿어스데이터와 협력하여 제조·금융권 타깃 GPU 서버-네트워크-스토리지 풀스택 수주에 드라이브를 걸고 있습니다.",
            tags: ["에스넷", "굿어스데이터"]
          }
        ],
        tech: [
          {
            title: "브로드컴·오픈AI·MS, 무손실 이더넷 규격 'MRC' 전격 발표",
            timeBadge: "4시간 전 (오늘 04:10)",
            source: "Broadcom Blog · The Register",
            content: "브로드컴이 OpenAI, Microsoft, Nvidia, AMD와 공동으로 차세대 RoCEv2 개선 규격인 MRC(Multi-path Reliable Connections)를 오픈소스로 공개했습니다. 대규모 AI 학습 시 필연적으로 발생하는 패킷 드롭과 트래픽 병목을 하드웨어 레벨에서 지능적으로 다중 경로 분산 처리하는 기술로, 초고속 이더넷이 인피니밴드를 완전히 대체하는 기폭제가 될 전망입니다.",
            tags: ["RoCEv2 MRC", "Tomahawk 6", "UEC 표준화"]
          },
          {
            title: "시스코 Silicon One G300 (102.4Tbps) & 랙스케일 풀스택 전략",
            timeBadge: "6시간 전 (오늘 02:00)",
            source: "Packet Pushers · ZDNet",
            content: "시스코는 TSMC 3나노 공정 기반의 자체 스위치 칩 Silicon One G300을 내세워 브로드컴의 독점 시장을 정조준하고 있습니다. 트래픽 폭증 시 마이크로초 단위의 충격 흡수(자동 복구) 기능을 장착하였으며, 슈퍼마이크로 등과 협력해 액체냉각 및 Nexus Dashboard가 포함된 풀스택 AI 랙 솔루션으로 승부하고 있습니다.",
            tags: ["Silicon One G300", "USFP 400G Lane"]
          }
        ],
        bid: [
          {
            title: "국정원 '국가 망 보안체계(N2SF)' 시행: 마이크로 세그멘테이션 스위치 필수",
            timeBadge: "8시간 전 (어제 23:50)",
            source: "보안뉴스 · 전자신문",
            content: "획일적 물리적 망분리 폐지와 함께 기관 정보를 기밀(C), 민감(S), 공개(O)로 차등 분류하는 N2SF 체계가 안착하면서, 내부 트래픽의 횡적 이동을 원천 차단하는 제로트러스트(Zero Trust) 및 마이크로 세그멘테이션 지원 L3 스위치 및 차세대 보안 장비 수요가 폭증하고 있습니다.",
            tags: ["N2SF", "제로트러스트", "마이크로 세그멘테이션"]
          },
          {
            title: "시스코 엣지/SD-WAN 고위험 취약점 긴급 패치 권고 (영업 포인트)",
            timeBadge: "10시간 전 (어제 22:10)",
            source: "CISA · KISA 보호나라",
            content: "CISA 및 KISA에서 시스코 SD-WAN 및 주요 네트워크 엣지 장비의 원격 코드 실행 취약점 패치를 긴급 권고했습니다. 링네트 기존 납품 고객사(공공·금융)를 대상으로 무상 펌웨어 점검 및 FMC(Firewall Management Center) 고도화 제안을 선제적으로 진행할 수 있는 최적의 영업 타이밍입니다.",
            tags: ["CISA 권고", "FMC 점검", "보안 제안"]
          }
        ]
      }
    }
  ],
  monthly: [
    {
      month: "2026-11",
      displayMonth: "2026년 11월 (진행중 누적 결산)",
      status: "실시간 누적 중",
      theme: "AI 이더넷의 인피니밴드 역전 & 국정원 N2SF 망분리 폐지 시행",
      keySummary: "11월은 AI 데이터센터에서 개방형 이더넷(UEC)이 인피니밴드 점유율을 본격 잠식하고, 국내 공공 시장에서는 20년 만의 물리적 망분리 폐지로 제로트러스트 스위치 수주전이 폭발한 결정적 분기점입니다."
    }
  ]
};

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const dateQuery = url.searchParams.get("date");
  const monthQuery = url.searchParams.get("month");

  let payload = NEWS_DATA;

  // ?date=YYYY-MM-DD 필터링 지원
  if (dateQuery) {
    const dailyFound = NEWS_DATA.daily.find(d => d.date === dateQuery);
    if (!dailyFound) {
      return new Response(JSON.stringify({ error: "Date not found", date: dateQuery }), {
        status: 404,
        headers: {
          "content-type": "application/json; charset=UTF-8",
          "access-control-allow-origin": "*"
        }
      });
    }
    payload = { daily: [dailyFound], monthly: [] };
  }

  // ?month=YYYY-MM 필터링 지원
  if (monthQuery) {
    const monthFound = NEWS_DATA.monthly.find(m => m.month === monthQuery);
    if (!monthFound) {
      return new Response(JSON.stringify({ error: "Month not found", month: monthQuery }), {
        status: 404,
        headers: {
          "content-type": "application/json; charset=UTF-8",
          "access-control-allow-origin": "*"
        }
      });
    }
    payload = { daily: [], monthly: [monthFound] };
  }

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "access-control-allow-origin": "*",
      "cache-control": "public, s-maxage=60, stale-while-revalidate=300"
    }
  });
};

export const config: Config = {
  path: ["/api/news", "/api/archive"],
  cache: "manual"
};

