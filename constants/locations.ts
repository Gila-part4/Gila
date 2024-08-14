type CitiesLocation = { latitude: number; longitude: number };

type CiteisDetail = { state: string; location: CitiesLocation };

type Cities = {
  id: number;
  list: CiteisDetail[];
};
interface Locations {
  [key: string]: Cities;
}

const LOCATIONS: Locations = {
  서울특별시: {
    id: 1,
    list: [
      { state: '종로구', location: { latitude: 37.5703, longitude: 126.9791 } },
      { state: '중구', location: { latitude: 37.5636, longitude: 126.9976 } },
      { state: '용산구', location: { latitude: 37.5326, longitude: 126.99 } },
      { state: '성동구', location: { latitude: 37.5503, longitude: 127.039 } },
      { state: '광진구', location: { latitude: 37.5482, longitude: 127.0724 } },
      { state: '동대문구', location: { latitude: 37.5746, longitude: 127.0098 } },
      { state: '중랑구', location: { latitude: 37.6061, longitude: 127.0922 } },
      { state: '성북구', location: { latitude: 37.5891, longitude: 127.0104 } },
      { state: '강북구', location: { latitude: 37.6378, longitude: 127.0265 } },
      { state: '도봉구', location: { latitude: 37.6553, longitude: 127.0338 } },
      { state: '노원구', location: { latitude: 37.6565, longitude: 127.0773 } },
      { state: '은평구', location: { latitude: 37.6062, longitude: 126.9298 } },
      { state: '서대문구', location: { latitude: 37.5789, longitude: 126.9358 } },
      { state: '마포구', location: { latitude: 37.5663, longitude: 126.9006 } },
      { state: '양천구', location: { latitude: 37.5161, longitude: 126.8656 } },
      { state: '강서구', location: { latitude: 37.5514, longitude: 126.8499 } },
      { state: '구로구', location: { latitude: 37.5041, longitude: 126.8874 } },
      { state: '금천구', location: { latitude: 37.4599, longitude: 126.8997 } },
      { state: '영등포구', location: { latitude: 37.5264, longitude: 126.9277 } },
      { state: '동작구', location: { latitude: 37.5047, longitude: 126.9404 } },
      { state: '관악구', location: { latitude: 37.4786, longitude: 126.9517 } },
      { state: '서초구', location: { latitude: 37.4836, longitude: 127.032 } },
      { state: '강남구', location: { latitude: 37.4979, longitude: 127.0276 } },
      { state: '송파구', location: { latitude: 37.5146, longitude: 127.1068 } },
      { state: '강동구', location: { latitude: 37.5301, longitude: 127.1238 } },
    ],
  },
  부산광역시: {
    id: 2,
    list: [
      { state: '중구', location: { latitude: 35.1153, longitude: 129.0403 } },
      { state: '서구', location: { latitude: 35.104, longitude: 129.0169 } },
      { state: '동구', location: { latitude: 35.1067, longitude: 129.0408 } },
      { state: '영도구', location: { latitude: 35.0665, longitude: 129.058 } },
      { state: '부산진구', location: { latitude: 35.1642, longitude: 129.0595 } },
      { state: '동래구', location: { latitude: 35.2326, longitude: 129.0802 } },
      { state: '남구', location: { latitude: 35.1374, longitude: 129.0957 } },
      { state: '북구', location: { latitude: 35.1992, longitude: 129.0177 } },
      { state: '해운대구', location: { latitude: 35.1658, longitude: 129.1604 } },
      { state: '사하구', location: { latitude: 35.1085, longitude: 128.9846 } },
      { state: '금정구', location: { latitude: 35.2292, longitude: 129.0795 } },
      { state: '강서구', location: { latitude: 35.167, longitude: 128.9491 } },
      { state: '연제구', location: { latitude: 35.1727, longitude: 129.0811 } },
      { state: '수영구', location: { latitude: 35.1608, longitude: 129.1202 } },
      { state: '사상구', location: { latitude: 35.1458, longitude: 128.9784 } },
      { state: '기장군', location: { latitude: 35.2324, longitude: 129.2189 } },
    ],
  },
  대구광역시: {
    id: 3,
    list: [
      { state: '중구', location: { latitude: 35.8673, longitude: 128.591 } },
      { state: '동구', location: { latitude: 35.8765, longitude: 128.6121 } },
      { state: '서구', location: { latitude: 35.8687, longitude: 128.55 } },
      { state: '남구', location: { latitude: 35.8314, longitude: 128.6007 } },
      { state: '북구', location: { latitude: 35.894, longitude: 128.5964 } },
      { state: '수성구', location: { latitude: 35.855, longitude: 128.6208 } },
      { state: '달서구', location: { latitude: 35.8296, longitude: 128.5935 } },
      { state: '달성군', location: { latitude: 35.7341, longitude: 128.5788 } },
      { state: '군위군', location: { latitude: 36.1468, longitude: 128.7795 } },
    ],
  },
  인천광역시: {
    id: 4,
    list: [
      { state: '중구', location: { latitude: 37.4733, longitude: 126.63 } },
      { state: '동구', location: { latitude: 37.4777, longitude: 126.623 } },
      { state: '미추홀구', location: { latitude: 37.484, longitude: 126.6522 } },
      { state: '연수구', location: { latitude: 37.4499, longitude: 126.6847 } },
      { state: '남동구', location: { latitude: 37.4457, longitude: 126.7358 } },
      { state: '부평구', location: { latitude: 37.5034, longitude: 126.7272 } },
      { state: '계양구', location: { latitude: 37.5385, longitude: 126.731 } },
      { state: '서구', location: { latitude: 37.5234, longitude: 126.6418 } },
      { state: '강화군', location: { latitude: 37.7081, longitude: 126.4896 } },
      { state: '옹진군', location: { latitude: 37.3881, longitude: 126.6251 } },
    ],
  },
  광주광역시: {
    id: 5,
    list: [
      { state: '동구', location: { latitude: 35.1555, longitude: 126.9194 } }, // 광주 동구청
      { state: '서구', location: { latitude: 35.1491, longitude: 126.9128 } }, // 광주 서구청
      { state: '남구', location: { latitude: 35.1334, longitude: 126.9273 } }, // 광주 남구청
      { state: '북구', location: { latitude: 35.1866, longitude: 126.915 } }, // 광주 북구청
      { state: '광산구', location: { latitude: 35.2105, longitude: 126.8512 } },
    ],
  },
  대전광역시: {
    id: 6,
    list: [
      { state: '서구', location: { latitude: 36.3521, longitude: 127.3845 } }, // 대전 서구청
      { state: '중구', location: { latitude: 36.3208, longitude: 127.4224 } }, // 대전 중구청
      { state: '동구', location: { latitude: 36.3303, longitude: 127.4269 } }, // 대전 동구청
      { state: '대덕구', location: { latitude: 36.3744, longitude: 127.4263 } }, // 대전 대덕구청
      { state: '유성구', location: { latitude: 36.3871, longitude: 127.3604 } },
    ],
  },
  울산광역시: {
    id: 7,
    list: [
      { state: '중구', location: { latitude: 35.5531, longitude: 129.3103 } }, // 울산 중구청
      { state: '남구', location: { latitude: 35.5378, longitude: 129.3165 } }, // 울산 남구청
      { state: '동구', location: { latitude: 35.5644, longitude: 129.4061 } }, // 울산 동구청
      { state: '북구', location: { latitude: 35.59, longitude: 129.3169 } }, // 울산 북구청
      { state: '울주군', location: { latitude: 35.594, longitude: 129.2155 } },
    ],
  },
  세종특별자치시: { id: 10, list: [] },
  경기도: {
    id: 11,
    list: [
      { state: '수원시', location: { latitude: 37.2636, longitude: 127.0286 } }, // 수원시청
      { state: '용인시', location: { latitude: 37.2416, longitude: 127.1786 } }, // 용인시청
      { state: '고양시', location: { latitude: 37.6681, longitude: 126.8215 } }, // 고양시청
      { state: '화성시', location: { latitude: 37.2035, longitude: 126.835 } }, // 화성시청
      { state: '성남시', location: { latitude: 37.4387, longitude: 127.1377 } }, // 성남시청
      { state: '부천시', location: { latitude: 37.5012, longitude: 126.7684 } }, // 부천시청
      { state: '남양주시', location: { latitude: 37.6364, longitude: 127.2164 } }, // 남양주시청
      { state: '안산시', location: { latitude: 37.3211, longitude: 126.831 } }, // 안산시청
      { state: '평택시', location: { latitude: 36.9986, longitude: 127.1076 } }, // 평택시청
      { state: '안양시', location: { latitude: 37.3946, longitude: 126.9302 } }, // 안양시청
      { state: '시흥시', location: { latitude: 37.3914, longitude: 126.8064 } }, // 시흥시청
      { state: '파주시', location: { latitude: 37.7672, longitude: 126.7792 } }, // 파주시청
      { state: '김포시', location: { latitude: 37.6173, longitude: 126.7312 } }, // 김포시청
      { state: '의정부시', location: { latitude: 37.7385, longitude: 127.0324 } }, // 의정부시청
      { state: '광주시', location: { latitude: 37.4023, longitude: 127.2708 } }, // 광주시청
      { state: '하남시', location: { latitude: 37.542, longitude: 127.2072 } }, // 하남시청
      { state: '광명시', location: { latitude: 37.321, longitude: 126.9305 } }, // 광명시청
      { state: '군포시', location: { latitude: 37.3594, longitude: 126.927 } }, // 군포시청
      { state: '양주시', location: { latitude: 37.7485, longitude: 127.0402 } }, // 양주시청
      { state: '오산시', location: { latitude: 37.1537, longitude: 127.0687 } }, // 오산시청
      { state: '이천시', location: { latitude: 37.2744, longitude: 127.4217 } }, // 이천시청
      { state: '안성시', location: { latitude: 36.9976, longitude: 127.2744 } }, // 안성시청
      { state: '구리시', location: { latitude: 37.6003, longitude: 127.1297 } }, // 구리시청
      { state: '의왕시', location: { latitude: 37.3462, longitude: 126.9917 } }, // 의왕시청
      { state: '포천시', location: { latitude: 37.8981, longitude: 127.1994 } }, // 포천시청
      { state: '양평군', location: { latitude: 37.4908, longitude: 127.4875 } }, // 양평군청
      { state: '여주시', location: { latitude: 37.2935, longitude: 127.635 } }, // 여주시청
      { state: '동두천시', location: { latitude: 37.9046, longitude: 127.0608 } }, // 동두천시청
      { state: '과천시', location: { latitude: 37.4297, longitude: 126.989 } }, // 과천시청
      { state: '가평군', location: { latitude: 37.8348, longitude: 127.5088 } }, // 가평군청
      { state: '연천군', location: { latitude: 38.084, longitude: 127.177 } }, // 연천군청
    ],
  },
  강원도: {
    id: 12,
    list: [
      { state: '춘천시', location: { latitude: 37.8804, longitude: 127.7263 } }, // 춘천시청
      { state: '원주시', location: { latitude: 37.3428, longitude: 127.9212 } }, // 원주시청
      { state: '강릉시', location: { latitude: 37.7515, longitude: 128.876 } }, // 강릉시청
      { state: '동해시', location: { latitude: 37.5186, longitude: 129.1114 } }, // 동해시청
      { state: '태백시', location: { latitude: 37.1596, longitude: 128.9873 } }, // 태백시청
      { state: '속초시', location: { latitude: 38.2071, longitude: 128.5912 } }, // 속초시청
      { state: '삼척시', location: { latitude: 36.976, longitude: 129.1654 } }, // 삼척시청
      { state: '홍천군', location: { latitude: 37.7356, longitude: 127.9973 } }, // 홍천군청
      { state: '횡성군', location: { latitude: 37.4605, longitude: 128.2177 } }, // 횡성군청
      { state: '영월군', location: { latitude: 37.2714, longitude: 128.4585 } }, // 영월군청
      { state: '평창군', location: { latitude: 37.3677, longitude: 128.3942 } }, // 평창군청
      { state: '정선군', location: { latitude: 37.316, longitude: 128.6467 } }, // 정선군청
      { state: '철원군', location: { latitude: 38.2154, longitude: 127.2989 } }, // 철원군청
      { state: '화천군', location: { latitude: 38.092, longitude: 127.6623 } }, // 화천군청
      { state: '양구군', location: { latitude: 38.1034, longitude: 127.945 } }, // 양구군청
      { state: '인제군', location: { latitude: 38.0956, longitude: 128.1855 } }, // 인제군청
      { state: '고성군', location: { latitude: 38.3974, longitude: 128.1667 } }, // 고성군청
      { state: '양양군', location: { latitude: 38.0671, longitude: 128.6081 } }, // 양양군청
    ],
  },
  충청북도: {
    id: 13,
    list: [
      { state: '청주시', location: { latitude: 36.6358, longitude: 127.4892 } }, // 청주시청
      { state: '충주시', location: { latitude: 36.986, longitude: 127.9294 } }, // 충주시청
      { state: '제천시', location: { latitude: 36.9941, longitude: 128.2006 } }, // 제천시청
      { state: '보은군', location: { latitude: 36.4263, longitude: 127.6885 } }, // 보은군청
      { state: '옥천군', location: { latitude: 36.1721, longitude: 127.5635 } }, // 옥천군청
      { state: '영동군', location: { latitude: 36.1022, longitude: 127.7781 } }, // 영동군청
      { state: '증평군', location: { latitude: 36.7117, longitude: 127.4874 } }, // 증평군청
      { state: '진천군', location: { latitude: 36.8044, longitude: 127.4333 } }, // 진천군청
      { state: '괴산군', location: { latitude: 36.7202, longitude: 127.8954 } }, // 괴산군청
      { state: '음성군', location: { latitude: 36.7616, longitude: 127.6135 } }, // 음성군청
      { state: '단양군', location: { latitude: 36.9747, longitude: 128.417 } }, // 단양군청
    ],
  },
  충청남도: {
    id: 14,
    list: [
      { state: '천안시', location: { latitude: 36.8092, longitude: 127.1134 } }, // 천안시청
      { state: '공주시', location: { latitude: 36.4568, longitude: 127.1112 } }, // 공주시청
      { state: '보령시', location: { latitude: 36.2978, longitude: 126.6061 } }, // 보령시청
      { state: '아산시', location: { latitude: 36.7954, longitude: 127.0033 } }, // 아산시청
      { state: '서산시', location: { latitude: 36.7828, longitude: 126.4512 } }, // 서산시청
      { state: '논산시', location: { latitude: 36.1991, longitude: 127.1175 } }, // 논산시청
      { state: '계룡시', location: { latitude: 36.3068, longitude: 127.291 } }, // 계룡시청
      { state: '당진시', location: { latitude: 36.7028, longitude: 126.6074 } }, // 당진시청
      { state: '금산군', location: { latitude: 36.1393, longitude: 127.4375 } }, // 금산군청
      { state: '부여군', location: { latitude: 36.3004, longitude: 126.9343 } }, // 부여군청
      { state: '서천군', location: { latitude: 36.0751, longitude: 126.7162 } }, // 서천군청
      { state: '청양군', location: { latitude: 36.4478, longitude: 126.8156 } }, // 청양군청
      { state: '홍성군', location: { latitude: 36.6396, longitude: 126.6711 } }, // 홍성군청
      { state: '예산군', location: { latitude: 36.6858, longitude: 126.8312 } }, // 예산군청
      { state: '태안군', location: { latitude: 36.7604, longitude: 126.2954 } }, // 태안군청
    ],
  },
  경상북도: {
    id: 15,
    list: [
      { state: '포항시', location: { latitude: 36.0194, longitude: 129.3431 } }, // 포항시청
      { state: '경주시', location: { latitude: 35.8468, longitude: 129.2276 } }, // 경주시청
      { state: '김천시', location: { latitude: 36.138, longitude: 128.1141 } }, // 김천시청
      { state: '안동시', location: { latitude: 36.5664, longitude: 128.723 } }, // 안동시청
      { state: '구미시', location: { latitude: 36.1138, longitude: 128.3296 } }, // 구미시청
      { state: '영주시', location: { latitude: 36.8052, longitude: 128.6078 } }, // 영주시청
      { state: '영천시', location: { latitude: 35.976, longitude: 128.9203 } }, // 영천시청
      { state: '상주시', location: { latitude: 36.4178, longitude: 128.1614 } }, // 상주시청
      { state: '문경시', location: { latitude: 36.5926, longitude: 128.1835 } }, // 문경시청
      { state: '경산시', location: { latitude: 35.8278, longitude: 128.7483 } }, // 경산시청
      { state: '의성군', location: { latitude: 36.3591, longitude: 128.5691 } }, // 의성군청
      { state: '청송군', location: { latitude: 36.4022, longitude: 129.1153 } }, // 청송군청
      { state: '영양군', location: { latitude: 36.5785, longitude: 129.0824 } }, // 영양군청
      { state: '영덕군', location: { latitude: 36.4186, longitude: 129.4391 } }, // 영덕군청
      { state: '청도군', location: { latitude: 35.7856, longitude: 128.7417 } }, // 청도군청
      { state: '고령군', location: { latitude: 35.7514, longitude: 128.3081 } }, // 고령군청
      { state: '성주군', location: { latitude: 35.831, longitude: 128.2504 } }, // 성주군청
      { state: '칠곡군', location: { latitude: 35.9507, longitude: 128.6111 } }, // 칠곡군청
      { state: '예천군', location: { latitude: 36.6675, longitude: 128.3725 } }, // 예천군청
      { state: '봉화군', location: { latitude: 36.86, longitude: 128.6893 } }, // 봉화군청
      { state: '울진군', location: { latitude: 36.9875, longitude: 129.4245 } }, // 울진군청
      { state: '울릉군', location: { latitude: 37.4843, longitude: 130.8558 } }, // 울릉군청
    ],
  },
  경상남도: {
    id: 16,
    list: [
      { state: '창원시', location: { latitude: 35.2275, longitude: 128.6824 } }, // 창원시청
      { state: '진주시', location: { latitude: 35.1734, longitude: 128.106 } }, // 진주시청
      { state: '통영시', location: { latitude: 34.8491, longitude: 128.4334 } }, // 통영시청
      { state: '사천시', location: { latitude: 35.0396, longitude: 128.11 } }, // 사천시청
      { state: '김해시', location: { latitude: 35.2327, longitude: 128.8824 } }, // 김해시청
      { state: '밀양시', location: { latitude: 35.4894, longitude: 128.7467 } }, // 밀양시청
      { state: '거제시', location: { latitude: 34.888, longitude: 128.6202 } }, // 거제시청
      { state: '양산시', location: { latitude: 35.337, longitude: 129.0206 } }, // 양산시청
      { state: '의령군', location: { latitude: 35.4835, longitude: 128.2364 } }, // 의령군청
      { state: '함안군', location: { latitude: 35.2431, longitude: 128.5037 } }, // 함안군청
      { state: '창녕군', location: { latitude: 35.3572, longitude: 128.4571 } }, // 창녕군청
      { state: '고성군', location: { latitude: 34.9636, longitude: 128.5353 } }, // 고성군청
      { state: '남해군', location: { latitude: 34.8273, longitude: 128.0856 } }, // 남해군청
      { state: '하동군', location: { latitude: 35.2044, longitude: 127.7468 } }, // 하동군청
      { state: '산청군', location: { latitude: 35.4775, longitude: 127.9898 } }, // 산청군청
      { state: '함양군', location: { latitude: 35.4433, longitude: 127.6936 } }, // 함양군청
      { state: '거창군', location: { latitude: 35.6261, longitude: 127.9657 } }, // 거창군청
      { state: '합천군', location: { latitude: 35.5686, longitude: 128.1595 } }, // 합천군청
    ],
  },
  전라북도: {
    id: 17,
    list: [
      { state: '전주시', location: { latitude: 35.8244, longitude: 127.148 } }, // 전주시청
      { state: '군산시', location: { latitude: 35.9648, longitude: 126.7357 } }, // 군산시청
      { state: '익산시', location: { latitude: 35.9436, longitude: 126.9641 } }, // 익산시청
      { state: '정읍시', location: { latitude: 35.5684, longitude: 126.7497 } }, // 정읍시청
      { state: '남원시', location: { latitude: 35.3874, longitude: 127.4386 } }, // 남원시청
      { state: '김제시', location: { latitude: 35.8226, longitude: 126.8944 } }, // 김제시청
      { state: '완주군', location: { latitude: 35.8252, longitude: 127.2138 } }, // 완주군청
      { state: '진안군', location: { latitude: 35.7621, longitude: 127.3277 } }, // 진안군청
      { state: '무주군', location: { latitude: 36.0512, longitude: 127.4103 } }, // 무주군청
      { state: '장수군', location: { latitude: 35.6808, longitude: 127.2847 } }, // 장수군청
      { state: '임실군', location: { latitude: 35.6392, longitude: 127.2763 } }, // 임실군청
      { state: '순창군', location: { latitude: 35.4277, longitude: 127.2288 } }, // 순창군청
      { state: '고창군', location: { latitude: 35.4163, longitude: 126.7152 } }, // 고창군청
      { state: '부안군', location: { latitude: 35.7432, longitude: 126.7555 } }, // 부안군청
    ],
  },
  전라남도: {
    id: 18,
    list: [
      { state: '목포시', location: { latitude: 34.8108, longitude: 126.3976 } }, // 목포시청
      { state: '여수시', location: { latitude: 34.7604, longitude: 127.6628 } }, // 여수시청
      { state: '순천시', location: { latitude: 34.9604, longitude: 127.4913 } }, // 순천시청
      { state: '나주시', location: { latitude: 35.0183, longitude: 126.7177 } }, // 나주시청
      { state: '광양시', location: { latitude: 34.9548, longitude: 127.7028 } }, // 광양시청
      { state: '담양군', location: { latitude: 35.3354, longitude: 126.9874 } }, // 담양군청
      { state: '곡성군', location: { latitude: 35.3368, longitude: 127.2776 } }, // 곡성군청
      { state: '구례군', location: { latitude: 35.2665, longitude: 127.4892 } }, // 구례군청
      { state: '고흥군', location: { latitude: 34.6547, longitude: 127.447 } }, // 고흥군청
      { state: '보성군', location: { latitude: 34.8263, longitude: 127.086 } }, // 보성군청
      { state: '화순군', location: { latitude: 35.2757, longitude: 127.7378 } }, // 화순군청
      { state: '장흥군', location: { latitude: 34.7215, longitude: 126.9308 } }, // 장흥군청
      { state: '강진군', location: { latitude: 34.614, longitude: 126.9464 } }, // 강진군청
      { state: '해남군', location: { latitude: 34.5723, longitude: 126.6053 } }, // 해남군청
      { state: '영암군', location: { latitude: 34.6474, longitude: 126.7212 } }, // 영암군청
      { state: '무안군', location: { latitude: 34.9782, longitude: 126.606 } }, // 무안군청
      { state: '함평군', location: { latitude: 35.0162, longitude: 126.4512 } }, // 함평군청
      { state: '영광군', location: { latitude: 35.2331, longitude: 126.4576 } }, // 영광군청
      { state: '장성군', location: { latitude: 35.2998, longitude: 126.9695 } }, // 장성군청
      { state: '완도군', location: { latitude: 34.2987, longitude: 126.7582 } }, // 완도군청
      { state: '진도군', location: { latitude: 34.4811, longitude: 126.1905 } }, // 진도군청
      { state: '신안군', location: { latitude: 34.8964, longitude: 126.2797 } }, // 신안군청
    ],
  },
  제주특별자치도: {
    id: 19,
    list: [
      { state: '제주시', location: { latitude: 33.4996, longitude: 126.5312 } }, // 제주시청
      { state: '서귀포시', location: { latitude: 33.2544, longitude: 126.5608 } }, // 서귀포시청
    ],
  },
};

export default LOCATIONS;
