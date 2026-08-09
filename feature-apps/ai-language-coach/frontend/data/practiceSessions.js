import { getScenarioCatalog } from './practiceCatalog'

const LANGUAGE_NAMES = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  ja: 'Japanese',
  ko: 'Korean',
  ru: 'Russian',
}

const FALLBACK_SENTENCES = {
  greetings: {
    en: ['Good morning, it is nice to meet you.', '早上好，很高兴认识你。'],
    es: ['Buenos dias, es un placer conocerte.', '早上好，很高兴认识你。'],
    fr: ['Bonjour, je suis ravi de vous rencontrer.', '您好，很高兴见到您。'],
    de: ['Guten Morgen, es freut mich, Sie kennenzulernen.', '早上好，很高兴认识您。'],
    ja: ['おはようございます。お会いできてうれしいです。', '早上好，很高兴见到您。'],
    ko: ['안녕하세요. 만나서 반갑습니다.', '您好，很高兴认识您。'],
    ru: ['Dobroye utro, ochen priyatno poznakomitsya.', '早上好，很高兴认识您。'],
  },
  restaurant: {
    en: ['Could I have the menu, please?', '请给我菜单，好吗？'],
    es: ['Me trae el menu, por favor?', '请给我菜单，好吗？'],
    fr: ['Je voudrais le menu, s il vous plait.', '我想要菜单，谢谢。'],
    de: ['Koennte ich bitte die Speisekarte haben?', '请给我菜单，好吗？'],
    ja: ['メニューをお願いします。', '请给我菜单。'],
    ko: ['메뉴를 주세요.', '请给我菜单。'],
    ru: ['Mozhno menyu, pozhaluysta?', '请给我菜单，好吗？'],
  },
  shopping: {
    en: ['How much does this cost?', '这个多少钱？'],
    es: ['Cuanto cuesta esto?', '这个多少钱？'],
    fr: ['Combien ca coute?', '这个多少钱？'],
    de: ['Wie viel kostet das?', '这个多少钱？'],
    ja: ['これはいくらですか。', '这个多少钱？'],
    ko: ['이것은 얼마예요?', '这个多少钱？'],
    ru: ['Skolko eto stoit?', '这个多少钱？'],
  },
  directions: {
    en: ['Excuse me, where is the nearest station?', '打扰一下，最近的车站在哪里？'],
    es: ['Disculpe, donde esta la estacion mas cercana?', '打扰一下，最近的车站在哪里？'],
    fr: ['Excusez-moi, ou est la gare la plus proche?', '打扰一下，最近的车站在哪里？'],
    de: ['Entschuldigung, wo ist der naechste Bahnhof?', '打扰一下，最近的车站在哪里？'],
    ja: ['すみません、最寄りの駅はどこですか。', '打扰一下，最近的车站在哪里？'],
    ko: ['실례합니다, 가장 가까운 역이 어디예요?', '打扰一下，最近的车站在哪里？'],
    ru: ['Izvinite, gde blizhayshaya stantsiya?', '打扰一下，最近的车站在哪里？'],
  },
  travel: {
    en: ['I would like to check in for my flight.', '我想办理航班值机。'],
    es: ['Quisiera registrarme para mi vuelo.', '我想办理航班值机。'],
    fr: ['Je voudrais m enregistrer pour mon vol.', '我想办理航班值机。'],
    de: ['Ich moechte fuer meinen Flug einchecken.', '我想办理航班值机。'],
    ja: ['飛行機のチェックインをしたいです。', '我想办理航班值机。'],
    ko: ['비행기 체크인을 하고 싶어요.', '我想办理航班值机。'],
    ru: ['Ya hotel by zaregistrirovatsya na moy reys.', '我想办理航班值机。'],
  },
  daily: {
    en: ['Today I will review my plan and take a short walk.', '今天我要复盘计划，然后散步一会儿。'],
    es: ['Hoy voy a revisar mi plan y dar un paseo corto.', '今天我要复盘计划，然后散步一会儿。'],
    fr: ['Aujourd hui, je vais revoir mon plan et faire une petite promenade.', '今天我要复盘计划，然后散步一会儿。'],
    de: ['Heute werde ich meinen Plan pruefen und kurz spazieren gehen.', '今天我要复盘计划，然后散步一会儿。'],
    ja: ['今日は計画を見直して、少し散歩します。', '今天我要复盘计划，然后散步一会儿。'],
    ko: ['오늘은 계획을 다시 보고 잠깐 산책할 거예요.', '今天我要复盘计划，然后散步一会儿。'],
    ru: ['Segodnya ya peresmotryu plan i nemnogo pogulyayu.', '今天我要复盘计划，然后散步一会儿。'],
  },
}

function buildWordTips(sentence) {
  return sentence
    .replace(/[.,!?。？、]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 5)
    .map((word) => ({
      word,
      tip: 'Listen for rhythm, stress, and smooth linking.',
    }))
}

export function createFallbackPracticeSession(language, scenario) {
  const catalogItem = getScenarioCatalog(scenario, language)[0]
  if (catalogItem) {
    return {
      session_id: `static-${language}-${scenario}`,
      sentence: catalogItem.sentence,
      translation: catalogItem.translation,
      englishTranslation: catalogItem.englishTranslation,
      word_tips: buildWordTips(catalogItem.sentence),
      i1_context: {
        language: LANGUAGE_NAMES[language] || language,
        scenario,
        overall_i_label: 'Static i+1',
        difficulty_level: catalogItem.level,
        source: 'Language-specific static catalog',
      },
    }
  }

  const scenarioSet = FALLBACK_SENTENCES[scenario] || FALLBACK_SENTENCES.greetings
  const [sentence, translation] = scenarioSet[language] || scenarioSet.en

  return {
    session_id: `static-${language}-${scenario}`,
    sentence,
    translation,
    word_tips: buildWordTips(sentence),
    i1_context: {
      language: LANGUAGE_NAMES[language] || language,
      scenario,
      overall_i_label: 'Static i+1',
      difficulty_level: 'beginner',
      source: 'Vercel static fallback',
    },
  }
}
