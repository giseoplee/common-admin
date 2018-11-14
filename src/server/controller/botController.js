const express = require('express');
const util = require('util');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const _ = require('lodash');
const router = express.Router();

const { respondJson, respondOnError } = require('../utils/respond');
const { botModel } = require('../model');
const resultCode = require('../utils/resultCode');
const { parameterFormCheck, getUrl } = require('../utils/common');

const controllerName = 'Bots';

router.use((req, res, next) => {

    console.log(util.format('[Logger]::[Controller]::[%sController]::[Access Ip %s]::[Access Time %s]',
                                controllerName,
                                req.ip,
                                moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
                            ));
    go(
      req.body || req.params || req.query,
      parameterFormCheck,
      //f => f(authRq[getUrl(req.originalUrl)]),
      result => result
      ? next()
      : respondOnError(res, resultCode.incorrectParamForm, {desc: "incorrect parameter form"})
    );
});

router.post('/getbot', async (req, res) => {
    const {id} = req.body;

    const data = {
        user_id: id
    };

    try{
        await go(
            data,
            options => botModel.find({where: options}),
            result => !!result? respondJson(res, resultCode.success, { bot_list: result }):respondJson(res, resultCode.error, null)
        );
    }
    catch(error){respondOnError(res, resultCode.error, error.message);}
});

router.post('/getJson', async (req, res) => {
    let testJson = {
        "utterance" : {
            "welcome": ["안녕", "하이", "헬로", "ㅎㅇ", "ㅎ2", "누구니", "누구야", "너누기여"],
            "scenario_01_0": ["이름", "누구야", "이름뭐야"],
            "scenario_01_1": ["뭐해", "뭐하고 있어"],
            "scenario_02_0": ["가격상담", "가격", "AS", "A/S", "반품"],
            "scenario_03_0": ["TOP 3", "인기 상품", "인기"],
            "scenario_03_10": ["특가", "오늘의 특가", "특가 검색"]
        },
        "intent": {
            "welcome": { 
                "type": ["text"],
                "text": "안녕하세요! 저는 문의를 담당하는 문봇입니다. 문의하실 내용을 입력해주세요!"
            },
            "fallback": {
                "type": ["textRandom"],
                "text": [
                    "무슨 말씀을 하시는지 모르겠어요",
                    "다시 한번 말씀해주시겠어요?",
                    "롸?"
                ]
            },
            "scenario_01_0": {
                "type": ["text"],
                "text": "문봇이라고"
            },
            "scenario_01_1": {
                "type": ["textRandom"],
                "text": [
                    "저는 가격, A/S, 반품 등의 문의를 담당 중이에요!",
                    "롯데 백화점 내 입점 품목들의 가격 상담 및 반품, A/S를 담당하고 있습니다:)",
                    "가격, A/S, 반품 문의를 원하시면 상담해드릴게요!"
                ]
            },
            "scenario_02_0": {
                "type": ["confirm", "text", "button"],
                "text": "문의하실 내용이 [${params[0]}]에 대한 내용이 맞으신가요?",
                "button": [
                    {
                        "key": "option_01",
                        "value": "예"
                    },
                    {
                        "key": "option_02",
                        "value": "아니오"
                    }
                ]
            },
            "scenario_02_1": {
                "type": ["text"],
                "text": "성함을 입력해주세요!"
            },
            "scenario_02_2": {
                "type": ["text"],
                "text": "전화번호를 입력해주세요!"
            },
            "scenario_02_3": {
                "type": ["text"],
                "text": "통신사가 어디신가요?"
            },
            "scenario_02_4": {
                "type": ["confirm", "text", "button"],
                "text": "이름 : [${params[0]}]\n연락처 : [${params[1]}]\n통신사 : [${params[2]}]\n\n위와 같은 정보가 맞나요?",
                "button": [
                    {
                        "key": "option_01",
                        "value": "네 맞아요!"
                    },
                    {
                        "key": "option_02",
                        "value": "아니요! 다시 입력할래요"
                    },
                    {
                        "key": "option_03",
                        "value": "홈으로 돌아가기"
                    }
                ]
            },
            "scenario_02_5": {
                "type": ["text", "webLink"],
                "text": "확인되었습니다:) 링크를 걸어드릴게요!",
                "web_link_url": "http://www.naver.com"
            },
            "scenario_03_0": {
                "type": ["text", "button"],
                "text": "지금 가장 잘팔리는 상품 검색을 시작합니다.\n대분류를 선택해주세요!",
                "button": [
                    {
                        "key": "option_01",
                        "value": "스낵·과자"
                    },
                    {
                        "key": "option_02",
                        "value": "음료"
                    },
                    {
                        "key": "option_03",
                        "value": "육류"
                    },
                    {
                        "key": "option_04",
                        "value": "홈으로 돌아가기"
                    }
                ]
            },
            "scenario_03_1": {
                "type": ["text", "button"],
                "text": "스낵·과자 소분류를 선택해 주세요!",
                "button": [
                    {
                        "key": "option_01",
                        "value": "초코류"
                    },
                    {
                        "key": "option_02",
                        "value": "파이류"
                    },
                    {
                        "key": "option_03",
                        "value": "대분류 다시 선택하기"
                    }
                ]
            },
            "scenario_03_2": {
                "type": ["text", "button"],
                "text": "음료 소분류를 선택해 주세요!",
                "button": [
                    {
                        "key": "option_01",
                        "value": "탄산음료"
                    },
                    {
                        "key": "option_02",
                        "value": "과일음료"
                    },
                    {
                        "key": "option_03",
                        "value": "대분류 다시 선택하기"
                    }
                ]
            },
            "scenario_03_3": {
                "type": ["text", "button"],
                "text": "주류 소분류를 선택해 주세요!",
                "button": [
                    {
                        "key": "option_01",
                        "value": "맥주"
                    },
                    {
                        "key": "option_02",
                        "value": "소주"
                    },
                    {
                        "key": "option_03",
                        "value": "대분류 다시 선택하기"
                    }
                ]
            },
            "scenario_03_4": {
                "type": ["text"],
                "text": ["롯데 마트 [${params[0]}] > [${params[1]}] 의 BEST 3입니다.", "1. 가나 초콜릿\n2. 킷캣 초콜릿\n3. 허쉬 초콜릿 밀크"]
            },
            "scenario_03_5": {
                "type": ["text"],
                "text": ["롯데 마트 [${params[0]}] > [${params[1]}] 의 BEST 3입니다.", "1. 초코 파이\n2. 후렌치 파이\n3. 찰떡 파이"]
            },
            "scenario_03_6": {
                "type": ["text"],
                "text": ["롯데 마트 [${params[0]}] > [${params[1]}] 의 BEST 3입니다.", "1. 칠성 사이다\n2. 코카 콜라\n3. 트레비 자몽"]
            },
            "scenario_03_7": {
                "type": ["text"],
                "text": ["롯데 마트 [${params[0]}] > [${params[1]}] 의 BEST 3입니다.", "1. 아침에 주스 오렌지\n2. 갈아만든 배\n3. 제주 감귤 주스"]
            },
            "scenario_03_8": {
                "type": ["text"],
                "text": ["롯데 마트 [${params[0]}] > [${params[1]}] 의 BEST 3입니다.", "1. 클라우드\n2. 카스 라이트\n3. 하이트"]
            },
            "scenario_03_9": {
                "type": ["text"],
                "text": ["롯데 마트 [${params[0]}] > [${params[1]}] 의 BEST 3입니다.", "1. 처음처럼\n2. 참이슬 후레쉬\n3. 좋은데이"]
            },
            "scenario_03_10": {
                "type": ["text"],
                "text": ["오늘의 특가 검색을 시작합니다. 찾고 싶은 제품을 입력하세요!"]
            },
            "scenario_03_11": {
                "type": ["textRandom"],
                "text": ["[${params[0]}]의 특가는 450원입니다.", "아쉽네요! [${params[0]}]은(는) 특가 상품이 아닙니다ㅠㅠ"]
            }
        },
        "intent_functions_parameter": {
            "scenario_02_0": ["content"],
            "scenario_02_4": ["scenario_02_1", "scenario_02_2", "scenario_02_3"],
            "scenario_03_4": ["scenario_03_0", "scenario_03_1"],
            "scenario_03_5": ["scenario_03_0", "scenario_03_1"],
            "scenario_03_6": ["scenario_03_0", "scenario_03_2"],
            "scenario_03_7": ["scenario_03_0", "scenario_03_2"],
            "scenario_03_8": ["scenario_03_0", "scenario_03_3"],
            "scenario_03_9": ["scenario_03_0", "scenario_03_3"],
            "scenario_03_11": ["scenario_03_10"]
        },
        "scenarios": {
            "scenario_01": {
                "name": "문봇 소개",
                "head": ["0", "1"],
                "list": {
                    "0": {
                        "name": "이름",
                        "prev": null,
                        "next": null
                    },
                    "1": {
                        "name": "역할",
                        "prev": null,
                        "next": null
                    }
                }
            },
            "scenario_02": {
                "name": "상담",
                "head": ["0"],
                "list": {
                    "0": {
                        "name": "상담 종류",
                        "prev": null,
                        "next": {
                            "option_01": "scenario_02_1", 
                            "option_02": "welcome"
                        }
                    },
                    "1": {
                        "name": "이름",
                        "prev": {
                            "scenario_02_0_option_01": "scenario_02_0",
                            "scenario_02_5_option_02": "scenario_02_5"
                        },
                        "next": {
                            "content": "scenario_02_2"
                        }
                    },
                    "2": {
                        "name": "핸드폰번호",
                        "prev": {
                            "scenario_02_1_content": "scenario_02_1"
                        },
                        "next": {
                            "content": "scenario_02_3"
                        }
                    },
                    "3": {
                        "name": "통신사",
                        "prev": {
                            "scenario_02_2_content": "scenario_02_2"
                        },
                        "next": {
                            "content": "scenario_02_4"
                        }
                    },
                    "4": {
                        "name": "최종 확인",
                        "prev": {
                            "scenario_02_3_content": "scenario_02_3"
                        },
                        "next": {
                            "option_01": "scenario_02_5",
                            "option_02": "scenario_02_1",
                            "option_03": "welcome"
                        }
                    },
                    "5": {
                        "name": "결과",
                        "prev": {
                            "scenario_02_4_option_01": "scenario_02_4"
                        },
                        "next": null
                    }
                }
            },
            "scenario_03": {
                "name": "상품 정보 시나리오",
                "head": ["0", "10"],
                "list": {
                    "0": {
                        "name": "인기 제품 목록",
                        "prev": {
                            "scenario_03_1_option_03": "scenario_03_1",
                            "scenario_03_2_option_03": "scenario_03_2",
                            "scenario_03_3_option_03": "scenario_03_3"
                        },
                        "next": {
                            "option_01": "scenario_03_1",
                            "option_02": "scenario_03_2",
                            "option_03": "scenario_03_3",
                            "option_04": "welcome"
                        }
                    },
                    "1": {
                        "name": "스낵·과자",
                        "prev": {
                            "scenario_03_0_option_01": "scenario_03_0"
                        },
                        "next": {
                            "option_01": "scenario_03_4",
                            "option_02": "scenario_03_5",
                            "option_03": "scenario_03_0"
                        }
                    },
                    "2": {
                        "name": "음료",
                        "prev": {
                            "scenario_03_0_option_02": "scenario_03_0"
                        },
                        "next": {
                            "option_01": "scenario_03_6",
                            "option_02": "scenario_03_7",
                            "option_03": "scenario_03_0"
                        }
                    },
                    "3": {
                        "name": "주류",
                        "prev": {
                            "scenario_03_0_option_03": "scenario_03_0"
                        },
                        "next": {
                            "option_01": "scenario_03_8",
                            "option_02": "scenario_03_9",
                            "option_03": "scenario_03_0"
                        }
                    },
                    "4": {
                        "name": "스낵·과자 - 초코",
                        "prev": {
                            "scenario_03_1_option_01": "scenario_03_1"
                        },
                        "next": null
                    },
                    "5": {
                        "name": "스낵·과자 - 파이",
                        "prev": {
                            "scenario_03_1_option_02": "scenario_03_1"
                        },
                        "next": null
                    },
                    "6": {
                        "name": "음료 - 탄산음료",
                        "prev": {
                            "scenario_03_2_option_01": "scenario_03_2"
                        },
                        "next": null
                    },
                    "7": {
                        "name": "음료 - 과일음료",
                        "prev": {
                            "scenario_03_2_option_02": "scenario_03_2"
                        },
                        "next": null
                    },
                    "8": {
                        "name": "주류 - 맥주",
                        "prev": {
                            "scenario_03_3_option_01": "scenario_03_3"
                        },
                        "next": null
                    },
                    "9": {
                        "name": "주류 - 소주",
                        "prev": {
                            "scenario_03_3_option_02": "scenario_03_3"
                        },
                        "next": null
                    },
                    "10": {
                        "name": "오늘의 특가",
                        "prev": null,
                        "next": {
                            "content": "scenario_03_11"
                        }
                    },
                    "11": {
                        "name": "특가 검색",
                        "prev": {
                            "scenario_03_10_content": "scenario_03_10"
                        },
                        "next": null
                    }
                }
            }
        }
    };

    try{
        await go(
            testJson,
            jsonData => !!jsonData? respondJson(res, resultCode.success, { data: jsonData }):respondJson(res, resultCode.error, null)
        );
    }
    catch(error){respondOnError(res, resultCode.error, error.message);}
});
module.exports = router;