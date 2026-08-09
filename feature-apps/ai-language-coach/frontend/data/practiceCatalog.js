const SCENARIO_LABELS = {
  greetings: '问候',
  restaurant: '餐厅',
  shopping: '购物',
  directions: '问路',
  travel: '旅行',
  daily: '日常',
}

const LANGUAGE_LABELS = {
  de: 'Deutsch',
  ja: '日本語',
  fr: 'Français',
  ko: '한국어',
  ru: 'Русский',
  es: 'Español',
  en: 'English',
}

const CONTENT = {
  de: {
    greetings: {
      slots: ['Anna', 'Lukas', 'Maria', 'Paul', 'Sophie', 'Noah', 'Emma', 'Ben', 'Lena', 'Max'],
      lines: [
        'Guten Morgen, ich heiße {slot}.',
        'Schön, Sie heute kennenzulernen.',
        'Wie geht es Ihnen an diesem Morgen?',
        'Willkommen in unserem kleinen Team.',
        'Darf ich Ihnen meinen Kollegen vorstellen?',
        'Vielen Dank, dass Sie gekommen sind.',
        'Wir sehen uns später beim Kaffee.',
        'Ich freue mich auf unser Gespräch.',
        'Einen schönen Tag noch und bis bald.',
      ],
    },
    restaurant: {
      slots: ['die Speisekarte', 'ein Wasser', 'einen Kaffee', 'eine Suppe', 'die Rechnung', 'ein vegetarisches Gericht', 'einen Tisch für zwei', 'eine Empfehlung', 'ein mildes Gericht', 'einen Tee'],
      lines: [
        'Könnte ich bitte {slot} haben?',
        'Wir haben eine Reservierung für zwei Personen.',
        'Was können Sie heute empfehlen?',
        'Ich hätte gern etwas Vegetarisches.',
        'Bitte machen Sie das Gericht nicht zu scharf.',
        'Kann ich noch ein Glas Wasser bekommen?',
        'Die Rechnung bitte, wenn es passt.',
        'Kann ich den Rest mitnehmen?',
        'War dieser Tisch bereits reserviert?',
      ],
    },
    shopping: {
      slots: ['diese Jacke', 'diese Tasche', 'dieses Hemd', 'diesen Schal', 'diese Hose', 'diesen Pullover', 'diese Mütze', 'diesen Artikel', 'dieses Paar Schuhe', 'diesen Mantel'],
      lines: [
        'Wie viel kostet {slot}?',
        'Haben Sie das in einer anderen Größe?',
        'Kann ich das bitte anprobieren?',
        'Ich bezahle lieber mit Karte.',
        'Gibt es heute einen Rabatt?',
        'Könnte ich eine Quittung bekommen?',
        'Ich schaue mich nur kurz um.',
        'Das ist mir leider etwas zu teuer.',
        'Kann ich den Artikel später umtauschen?',
      ],
    },
    directions: {
      slots: ['den Bahnhof', 'die U-Bahn-Station', 'die Haltestelle', 'das Hotel', 'die Apotheke', 'den Ausgang', 'das Zentrum', 'die Straße', 'den Eingang', 'die Touristeninformation'],
      lines: [
        'Entschuldigung, wo finde ich {slot}?',
        'Muss ich hier links oder rechts gehen?',
        'Gehen Sie bitte zwei Straßen geradeaus.',
        'Ist das weit von hier?',
        'Welchen Ausgang soll ich nehmen?',
        'Die Haltestelle ist gleich an der Ecke.',
        'Können Sie es mir auf der Karte zeigen?',
        'Welcher Bus fährt ins Zentrum?',
        'Wie lange dauert der Weg zu Fuß?',
      ],
    },
    travel: {
      slots: ['meinen Flug', 'mein Hotelzimmer', 'meine Buchung', 'mein Ticket', 'meinen Sitzplatz', 'meinen Anschlusszug', 'meinen Mietwagen', 'meine Tour', 'meinen Shuttle', 'meine Reservierung'],
      lines: [
        'Ich möchte {slot} bestätigen.',
        'Wo ist das Gate für diesen Flug?',
        'Ich habe eine Buchung in diesem Hotel.',
        'Mein Gepäck ist leider nicht angekommen.',
        'Ich brauche ein Ticket zum Hauptbahnhof.',
        'Hat der Flug Verspätung?',
        'Können Sie mir ein Taxi rufen?',
        'Wo ist die Passkontrolle?',
        'Kann ich meinen Sitzplatz ändern?',
      ],
    },
    daily: {
      slots: ['meinen Plan', 'meinen Kalender', 'meine Arbeit', 'mein Abendessen', 'meinen Anruf', 'meine Einkaufsliste', 'mein Zimmer', 'mein Training', 'meine Hausaufgaben', 'meinen Termin'],
      lines: [
        'Heute überprüfe ich {slot}.',
        'Ich muss zuerst meine Arbeit erledigen.',
        'Lass uns kurz spazieren gehen.',
        'Ich möchte dreißig Minuten lernen.',
        'Ruf mich bitte später an.',
        'Ich koche heute Abend zu Hause.',
        'Wir sollten das Zimmer aufräumen.',
        'Wie ist das Wetter draußen?',
        'Ich bin gerade auf dem Weg nach Hause.',
      ],
    },
  },
  ja: {
    greetings: {
      slots: ['田中', '佐藤', '鈴木', '高橋', '山本', '中村', '小林', '加藤', '吉田', '山田'],
      lines: [
        'おはようございます、{slot}です。',
        '今日はお会いできてうれしいです。',
        '今朝のご気分はいかがですか。',
        '私たちのチームへようこそ。',
        'こちらは私の同僚です。',
        '来てくださってありがとうございます。',
        'あとでコーヒーを飲みましょう。',
        'お話しできるのを楽しみにしています。',
        'よい一日をお過ごしください。',
      ],
    },
    restaurant: {
      slots: ['メニュー', '水', '席', '味噌汁', 'お会計', 'コーヒー', '野菜', '辛さ控えめ', 'おすすめ', '予約'],
      lines: [
        '{slot}をお願いします。',
        '二人で予約しています。',
        '今日のおすすめは何ですか。',
        '野菜の料理はありますか。',
        '辛さは控えめにできますか。',
        'お水をもう一杯いただけますか。',
        'お会計をお願いします。',
        '残りを持ち帰れますか。',
        'この席は予約されていますか。',
      ],
    },
    shopping: {
      slots: ['ジャケット', 'バッグ', 'シャツ', 'スカーフ', 'ズボン', 'セーター', '帽子', '商品', '靴', 'コート'],
      lines: [
        'この{slot}はいくらですか。',
        '別のサイズはありますか。',
        '試着してもいいですか。',
        'カードで払います。',
        '今日は割引がありますか。',
        'レシートをください。',
        '少し見ているだけです。',
        'ちょっと高いですね。',
        '合わなかったら返品できますか。',
      ],
    },
    directions: {
      slots: ['駅', '地下鉄の駅', '停留所', 'ホテル', '薬局', '出口', '中心部', '入口', '観光案内所', 'トイレ'],
      lines: [
        'すみません、最寄りの{slot}はどこですか。',
        'ここを左ですか、右ですか。',
        'まっすぐ二つ目の通りまで行ってください。',
        'ここから遠いですか。',
        'どの出口を使えばいいですか。',
        '停留所は角の近くです。',
        '地図で見せてもらえますか。',
        '中心部へ行くバスはどれですか。',
        '歩くとどのくらいかかりますか。',
      ],
    },
    travel: {
      slots: ['便', 'ホテル', '予約', 'チケット', '座席', '乗り継ぎ列車', 'レンタカー', 'ツアー', 'シャトルバス', '部屋'],
      lines: [
        '{slot}の確認をしたいです。',
        'この便のゲートはどこですか。',
        'このホテルを予約しています。',
        '荷物がまだ届いていません。',
        '中央駅までのチケットを一枚ください。',
        '飛行機は遅れていますか。',
        'タクシーを呼んでもらえますか。',
        '入国審査はどこですか。',
        '座席を変更できますか。',
      ],
    },
    daily: {
      slots: ['計画', '予定', '仕事', '買い物リスト', 'メール', 'メモ', '宿題', '予約', '予算', '練習内容'],
      lines: [
        '今日は{slot}を見直します。',
        'まず仕事を終わらせます。',
        '少し散歩しましょう。',
        '三十分勉強したいです。',
        'あとで電話してください。',
        '今夜は家で夕食を作ります。',
        '今日は部屋を片づけましょう。',
        '外の天気はどうですか。',
        '今、家に向かっています。',
      ],
    },
  },
  fr: {
    greetings: {
      slots: ['Marie', 'Lucas', 'Camille', 'Hugo', 'Sophie', 'Noah', 'Emma', 'Louis', 'Léa', 'Jules'],
      lines: [
        'Bonjour, je m appelle {slot}.',
        'Je suis ravi de vous rencontrer aujourd hui.',
        'Comment allez-vous ce matin?',
        'Bienvenue dans notre équipe.',
        'Je vous présente ma collègue.',
        'Merci beaucoup d être venu.',
        'On se retrouve plus tard pour un café.',
        'Je suis content de parler avec vous.',
        'Bonne journée et à bientôt.',
      ],
    },
    restaurant: {
      slots: ['le menu', 'un verre d eau', 'un café', 'une soupe', 'l addition', 'un plat végétarien', 'une table pour deux', 'une recommandation', 'un plat doux', 'un thé'],
      lines: [
        'Pourrais-je avoir {slot}, s il vous plaît?',
        'Nous avons une réservation pour deux personnes.',
        'Qu est-ce que vous recommandez aujourd hui?',
        'Avez-vous un plat végétarien?',
        'Pouvez-vous le faire pas trop épicé?',
        'Je peux avoir encore un verre d eau?',
        'L addition, s il vous plaît.',
        'Puis-je emporter le reste?',
        'Cette table est-elle réservée?',
      ],
    },
    shopping: {
      slots: ['cette veste', 'ce sac', 'cette chemise', 'cette écharpe', 'ce pantalon', 'ce pull', 'ce chapeau', 'cet article', 'cette paire de chaussures', 'ce manteau'],
      lines: [
        'Combien coûte {slot}?',
        'Vous avez une autre taille?',
        'Puis-je l essayer?',
        'Je vais payer par carte.',
        'Y a-t-il une réduction aujourd hui?',
        'Je peux avoir un ticket?',
        'Je regarde seulement, merci.',
        'C est un peu trop cher pour moi.',
        'Puis-je le retourner si ça ne va pas?',
      ],
    },
    directions: {
      slots: ['la gare', 'la station de métro', 'l arrêt de bus', 'l hôtel', 'la pharmacie', 'la sortie', 'le centre', 'cette rue', 'l entrée', 'l office de tourisme'],
      lines: [
        'Excusez-moi, où puis-je trouver {slot}?',
        'Je dois tourner à gauche ou à droite ici?',
        'Allez tout droit pendant deux rues.',
        'C est loin d ici?',
        'Quelle sortie dois-je prendre?',
        'L arrêt est juste au coin.',
        'Pouvez-vous me montrer sur la carte?',
        'Quel bus va au centre?',
        'Combien de temps faut-il à pied?',
      ],
    },
    travel: {
      slots: ['mon vol', 'ma chambre d hôtel', 'ma réservation', 'mon billet', 'mon siège', 'ma correspondance', 'ma voiture de location', 'mon excursion', 'ma navette', 'mon transfert'],
      lines: [
        'Je voudrais confirmer {slot}.',
        'Où est la porte pour ce vol?',
        'J ai une réservation dans cet hôtel.',
        'Mon bagage n est pas arrivé.',
        'Un billet pour la gare centrale, s il vous plaît.',
        'Le vol est-il en retard?',
        'Pouvez-vous appeler un taxi?',
        'Où est le contrôle des passeports?',
        'Puis-je changer de siège?',
      ],
    },
    daily: {
      slots: ['mon plan', 'mon agenda', 'mon travail', 'ma liste de courses', 'mes emails', 'mes notes', 'mes devoirs', 'ma réservation', 'mon budget', 'mon programme d entraînement'],
      lines: [
        'Aujourd hui, je vais revoir {slot}.',
        'Je dois finir mon travail d abord.',
        'Allons faire une petite promenade.',
        'Je veux étudier trente minutes.',
        'Appelle-moi plus tard, s il te plaît.',
        'Je vais préparer le dîner à la maison.',
        'On devrait ranger la chambre aujourd hui.',
        'Quel temps fait-il dehors?',
        'Je rentre à la maison maintenant.',
      ],
    },
  },
  ko: {
    greetings: {
      slots: ['민수', '지훈', '서연', '하준', '지민', '도윤', '수아', '유진', '현우', '나연'],
      lines: [
        '안녕하세요, 저는 {slot}입니다.',
        '오늘 만나서 반갑습니다.',
        '오늘 아침 기분이 어떠세요?',
        '우리 팀에 오신 것을 환영합니다.',
        '제 동료를 소개해 드릴게요.',
        '와 주셔서 정말 감사합니다.',
        '나중에 커피 한잔해요.',
        '이야기 나눌 수 있어서 기쁩니다.',
        '좋은 하루 보내세요.',
      ],
    },
    restaurant: {
      slots: ['메뉴', '물', '자리', '국', '계산서', '커피', '채식', '덜 맵게', '추천', '예약'],
      lines: [
        '{slot} 좀 주시겠어요?',
        '두 명으로 예약했습니다.',
        '오늘 추천 메뉴가 뭐예요?',
        '채식 메뉴가 있나요?',
        '덜 맵게 해 주실 수 있나요?',
        '물 한 잔 더 받을 수 있을까요?',
        '계산서 부탁드립니다.',
        '남은 음식 포장할 수 있나요?',
        '이 자리는 예약석인가요?',
      ],
    },
    shopping: {
      slots: ['재킷', '가방', '셔츠', '스카프', '바지', '스웨터', '모자', '상품', '신발', '코트'],
      lines: [
        '이 {slot}은 얼마예요?',
        '다른 사이즈가 있나요?',
        '입어 봐도 될까요?',
        '카드로 결제할게요.',
        '오늘 할인하나요?',
        '영수증 받을 수 있을까요?',
        '그냥 둘러보는 중이에요.',
        '저한테는 조금 비싸요.',
        '맞지 않으면 반품할 수 있나요?',
      ],
    },
    directions: {
      slots: ['역', '지하철역', '정류장', '호텔', '약국', '출구', '시내', '입구', '관광 안내소', '화장실'],
      lines: [
        '실례합니다, 가장 가까운 {slot}이 어디예요?',
        '여기서 왼쪽인가요, 오른쪽인가요?',
        '두 블록만 곧장 가세요.',
        '여기서 먼가요?',
        '어느 출구로 나가야 하나요?',
        '정류장은 모퉁이 근처에 있어요.',
        '지도에서 보여 주실 수 있나요?',
        '시내로 가는 버스가 몇 번이에요?',
        '걸어서 얼마나 걸리나요?',
      ],
    },
    travel: {
      slots: ['항공편', '호텔 방', '예약', '표', '좌석', '연결 열차', '렌터카', '투어', '셔틀버스', '공항 픽업'],
      lines: [
        '{slot} 확인을 하고 싶어요.',
        '이 비행기의 게이트가 어디인가요?',
        '이 호텔에 예약했습니다.',
        '제 짐이 아직 도착하지 않았어요.',
        '중앙역까지 표 한 장 주세요.',
        '비행기가 지연됐나요?',
        '택시를 불러 주실 수 있나요?',
        '여권 심사는 어디인가요?',
        '좌석을 바꿀 수 있을까요?',
      ],
    },
    daily: {
      slots: ['계획', '일정', '일', '장보기 목록', '이메일', '메모', '숙제', '예약', '예산', '연습 내용'],
      lines: [
        '오늘은 {slot}을 다시 확인할 거예요.',
        '먼저 일을 끝내야 해요.',
        '잠깐 산책하러 가요.',
        '삼십 분 동안 공부하고 싶어요.',
        '나중에 전화해 주세요.',
        '오늘 저녁은 집에서 만들 거예요.',
        '오늘 방을 청소해야 해요.',
        '밖에 날씨가 어때요?',
        '지금 집에 가는 중이에요.',
      ],
    },
  },
  ru: {
    greetings: {
      slots: ['Анна', 'Иван', 'Мария', 'Павел', 'София', 'Никита', 'Елена', 'Артем', 'Ольга', 'Максим'],
      lines: [
        'Здравствуйте, меня зовут {slot}.',
        'Очень приятно познакомиться сегодня.',
        'Как вы себя чувствуете этим утром?',
        'Добро пожаловать в нашу команду.',
        'Позвольте представить моего коллегу.',
        'Спасибо, что пришли сегодня.',
        'Увидимся позже за кофе.',
        'Я рад поговорить с вами.',
        'Хорошего дня и до встречи.',
      ],
    },
    restaurant: {
      slots: ['меню', 'стакан воды', 'кофе', 'суп', 'счет', 'овощное блюдо', 'столик на двоих', 'рекомендацию', 'неострое блюдо', 'чай'],
      lines: [
        'Можно, пожалуйста, {slot}?',
        'У нас бронь на двух человек.',
        'Что вы сегодня рекомендуете?',
        'У вас есть овощное блюдо?',
        'Можно сделать не очень остро?',
        'Можно еще стакан воды?',
        'Счет, пожалуйста.',
        'Можно взять остатки с собой?',
        'Этот столик уже забронирован?',
      ],
    },
    shopping: {
      slots: ['эта куртка', 'эта сумка', 'эта рубашка', 'этот шарф', 'эти брюки', 'этот свитер', 'эта шапка', 'этот товар', 'эта пара обуви', 'это пальто'],
      lines: [
        'Сколько стоит {slot}?',
        'У вас есть другой размер?',
        'Можно это примерить?',
        'Я оплачу картой.',
        'Сегодня есть скидка?',
        'Можно чек, пожалуйста?',
        'Я просто смотрю, спасибо.',
        'Для меня это немного дорого.',
        'Можно вернуть, если не подойдет?',
      ],
    },
    directions: {
      slots: ['вокзал', 'станцию метро', 'остановку', 'отель', 'аптеку', 'выход', 'центр', 'эту улицу', 'вход', 'туристический офис'],
      lines: [
        'Извините, где найти {slot}?',
        'Мне идти налево или направо?',
        'Идите прямо два квартала.',
        'Это далеко отсюда?',
        'Какой выход мне нужен?',
        'Остановка находится за углом.',
        'Можете показать на карте?',
        'Какой автобус идет в центр?',
        'Сколько идти пешком?',
      ],
    },
    travel: {
      slots: ['мой рейс', 'номер в отеле', 'мою бронь', 'мой билет', 'мое место', 'пересадку', 'аренду машины', 'тур', 'трансфер', 'регистрацию'],
      lines: [
        'Я хочу подтвердить {slot}.',
        'Где выход на этот рейс?',
        'У меня бронь в этом отеле.',
        'Мой багаж еще не пришел.',
        'Один билет до центрального вокзала, пожалуйста.',
        'Рейс задерживается?',
        'Можете вызвать такси?',
        'Где паспортный контроль?',
        'Можно поменять место?',
      ],
    },
    daily: {
      slots: ['план', 'расписание', 'работу', 'список покупок', 'письма', 'заметки', 'домашнее задание', 'бронь', 'бюджет', 'тренировку'],
      lines: [
        'Сегодня я проверю {slot}.',
        'Сначала мне нужно закончить работу.',
        'Давай немного прогуляемся.',
        'Я хочу заниматься тридцать минут.',
        'Позвони мне позже, пожалуйста.',
        'Сегодня я приготовлю ужин дома.',
        'Нам нужно убрать комнату.',
        'Какая погода на улице?',
        'Я сейчас еду домой.',
      ],
    },
  },
  es: {
    greetings: {
      slots: ['Ana', 'Luis', 'María', 'Pablo', 'Sofía', 'Diego', 'Lucía', 'Carlos', 'Elena', 'Mateo'],
      lines: [
        'Buenos días, me llamo {slot}.',
        'Me alegra conocerte hoy.',
        '¿Cómo estás esta mañana?',
        'Bienvenido a nuestro equipo.',
        'Te presento a mi colega.',
        'Muchas gracias por venir.',
        'Nos vemos más tarde para tomar café.',
        'Me alegra poder hablar contigo.',
        'Que tengas un buen día.',
      ],
    },
    restaurant: {
      slots: ['el menú', 'un vaso de agua', 'un café', 'una sopa', 'la cuenta', 'un plato vegetariano', 'una mesa para dos', 'una recomendación', 'un plato poco picante', 'un té'],
      lines: [
        '¿Me trae {slot}, por favor?',
        'Tenemos una reserva para dos personas.',
        '¿Qué recomienda hoy?',
        '¿Tiene algún plato vegetariano?',
        '¿Puede hacerlo poco picante?',
        '¿Me puede traer otro vaso de agua?',
        'La cuenta, por favor.',
        '¿Puedo llevarme lo que queda?',
        '¿Esta mesa está reservada?',
      ],
    },
    shopping: {
      slots: ['esta chaqueta', 'este bolso', 'esta camisa', 'esta bufanda', 'estos pantalones', 'este suéter', 'este sombrero', 'este artículo', 'este par de zapatos', 'este abrigo'],
      lines: [
        '¿Cuánto cuesta {slot}?',
        '¿Tiene otra talla?',
        '¿Puedo probármelo?',
        'Voy a pagar con tarjeta.',
        '¿Hay descuento hoy?',
        '¿Me da un recibo, por favor?',
        'Solo estoy mirando, gracias.',
        'Es un poco caro para mí.',
        '¿Puedo devolverlo si no me queda bien?',
      ],
    },
    directions: {
      slots: ['la estación', 'la estación de metro', 'la parada', 'el hotel', 'la farmacia', 'la salida', 'el centro', 'esta calle', 'la entrada', 'la oficina de turismo'],
      lines: [
        'Disculpe, ¿dónde puedo encontrar {slot}?',
        '¿Debo girar a la izquierda o a la derecha?',
        'Siga recto dos calles.',
        '¿Está lejos de aquí?',
        '¿Qué salida debo tomar?',
        'La parada está en la esquina.',
        '¿Puede mostrarme en el mapa?',
        '¿Qué autobús va al centro?',
        '¿Cuánto se tarda caminando?',
      ],
    },
    travel: {
      slots: ['mi vuelo', 'mi habitación de hotel', 'mi reserva', 'mi billete', 'mi asiento', 'mi conexión', 'mi coche de alquiler', 'mi excursión', 'mi traslado', 'mi registro'],
      lines: [
        'Quisiera confirmar {slot}.',
        '¿Dónde está la puerta de este vuelo?',
        'Tengo una reserva en este hotel.',
        'Mi equipaje no ha llegado.',
        'Un billete a la estación central, por favor.',
        '¿El vuelo está retrasado?',
        '¿Puede llamar un taxi?',
        '¿Dónde está el control de pasaportes?',
        '¿Puedo cambiar mi asiento?',
      ],
    },
    daily: {
      slots: ['mi plan', 'mi horario', 'mi trabajo', 'mi lista de compras', 'mis correos', 'mis notas', 'mi tarea', 'mi reserva', 'mi presupuesto', 'mi práctica'],
      lines: [
        'Hoy voy a revisar {slot}.',
        'Primero tengo que terminar mi trabajo.',
        'Vamos a dar un paseo corto.',
        'Quiero estudiar treinta minutos.',
        'Llámame más tarde, por favor.',
        'Hoy voy a cocinar en casa.',
        'Deberíamos ordenar la habitación.',
        '¿Qué tiempo hace afuera?',
        'Estoy de camino a casa.',
      ],
    },
  },
  en: {
    greetings: {
      slots: ['Alex', 'Mia', 'Noah', 'Emma', 'Liam', 'Olivia', 'Ben', 'Ava', 'Leo', 'Sofia'],
      lines: [
        'Good morning, my name is {slot}.',
        'It is nice to meet you today.',
        'How are you feeling this morning?',
        'Welcome to our team.',
        'Let me introduce my colleague.',
        'Thank you very much for coming.',
        'Let us meet later for coffee.',
        'I am glad we can talk today.',
        'Have a good day and see you soon.',
      ],
    },
    restaurant: {
      slots: ['the menu', 'a glass of water', 'a coffee', 'a soup', 'the bill', 'a vegetarian dish', 'a table for two', 'a recommendation', 'a mild dish', 'a tea'],
      lines: [
        'Could I have {slot}, please?',
        'We have a reservation for two people.',
        'What do you recommend today?',
        'Do you have a vegetarian dish?',
        'Could you make it not too spicy?',
        'May I have another glass of water?',
        'Could we get the bill, please?',
        'Can I take the rest to go?',
        'Is this table already reserved?',
      ],
    },
    shopping: {
      slots: ['this jacket', 'this bag', 'this shirt', 'this scarf', 'these pants', 'this sweater', 'this hat', 'this item', 'this pair of shoes', 'this coat'],
      lines: [
        'How much does {slot} cost?',
        'Do you have another size?',
        'Can I try this on?',
        'I will pay by card.',
        'Is there a discount today?',
        'Could I have a receipt, please?',
        'I am just looking, thank you.',
        'This is a little too expensive for me.',
        'Can I return it if it does not fit?',
      ],
    },
    directions: {
      slots: ['the station', 'the subway station', 'the bus stop', 'the hotel', 'the pharmacy', 'the exit', 'downtown', 'this street', 'the entrance', 'the tourist office'],
      lines: [
        'Excuse me, where can I find {slot}?',
        'Should I turn left or right here?',
        'Please go straight for two blocks.',
        'Is it far from here?',
        'Which exit should I take?',
        'The bus stop is near the corner.',
        'Can you show me on the map?',
        'Which bus goes downtown?',
        'How long does it take to walk there?',
      ],
    },
    travel: {
      slots: ['my flight', 'my hotel room', 'my booking', 'my ticket', 'my seat', 'my connection', 'my rental car', 'my tour', 'my shuttle', 'my reservation'],
      lines: [
        'I would like to confirm {slot}.',
        'Where is the gate for this flight?',
        'I have a booking at this hotel.',
        'My luggage has not arrived.',
        'One ticket to the central station, please.',
        'Is the flight delayed?',
        'Could you call a taxi for me?',
        'Where is passport control?',
        'Can I change my seat, please?',
      ],
    },
    daily: {
      slots: ['plan', 'schedule', 'work', 'shopping list', 'emails', 'notes', 'homework', 'booking', 'budget', 'practice'],
      lines: [
        'Today I will review my {slot}.',
        'I need to finish my work first.',
        'Let us go for a short walk.',
        'I want to study for thirty minutes.',
        'Please call me later.',
        'I will cook dinner at home.',
        'We should clean the room today.',
        'How is the weather outside?',
        'I am on my way home.',
      ],
    },
  },
}

const LEVELS = ['A1', 'A1+', 'A2']
const VARIATIONS = [
  '先听一遍，再慢速跟读。',
  '遮住句子后凭记忆说一次。',
  '替换关键词，生成自己的句子。',
  '用这句话回答一个真实问题。',
  '把语气改得更礼貌。',
  '用自然节奏快速说一遍。',
]

const SUPPLEMENTAL_LINES = {
  de: {
    greetings: ['Guten Abend, schön, Sie zu sehen.', 'Ich wünsche Ihnen einen angenehmen Tag.'],
    restaurant: ['Ich hätte gern einen Platz am Fenster.', 'Könnten Sie mir bitte die Tageskarte bringen?'],
    shopping: ['Kann ich mit dem Handy bezahlen?', 'Ich suche ein Geschenk für meine Schwester.'],
    directions: ['Ist der Eingang auf der linken Seite?', 'Komme ich von hier zu Fuß dorthin?'],
    travel: ['Wann beginnt das Boarding?', 'Ich habe meinen Anschluss verpasst.'],
    daily: ['Ich schreibe mir die wichtigsten Aufgaben auf.', 'Nach der Arbeit mache ich eine kurze Pause.'],
  },
  ja: {
    greetings: ['こんばんは、お会いできてうれしいです。', 'よい一日をお過ごしください。'],
    restaurant: ['窓側の席をお願いします。', '今日のランチメニューを見せてください。'],
    shopping: ['スマホで支払えますか。', '妹へのプレゼントを探しています。'],
    directions: ['入口は左側にありますか。', 'ここから歩いて行けますか。'],
    travel: ['搭乗は何時に始まりますか。', '乗り継ぎに間に合いませんでした。'],
    daily: ['大事な用事をメモします。', '仕事のあとで少し休みます。'],
  },
  fr: {
    greetings: ['Bonsoir, je suis content de vous voir.', 'Je vous souhaite une bonne journée.'],
    restaurant: ['Je voudrais une table près de la fenêtre.', 'Pourriez-vous m apporter le menu du jour?'],
    shopping: ['Puis-je payer avec mon téléphone?', 'Je cherche un cadeau pour ma soeur.'],
    directions: ['L entrée est-elle sur la gauche?', 'Puis-je y aller à pied depuis ici?'],
    travel: ['À quelle heure commence l embarquement?', 'J ai manqué ma correspondance.'],
    daily: ['Je note les tâches les plus importantes.', 'Après le travail, je fais une courte pause.'],
  },
  ko: {
    greetings: ['안녕하세요, 만나서 반갑습니다.', '좋은 하루 보내세요.'],
    restaurant: ['창가 자리로 부탁드립니다.', '오늘의 메뉴를 보여 주시겠어요?'],
    shopping: ['휴대폰으로 결제할 수 있나요?', '여동생 선물을 찾고 있어요.'],
    directions: ['입구가 왼쪽에 있나요?', '여기서 걸어서 갈 수 있나요?'],
    travel: ['탑승은 몇 시에 시작하나요?', '환승편을 놓쳤어요.'],
    daily: ['중요한 일을 메모해 둡니다.', '퇴근 후에 잠깐 쉽니다.'],
  },
  ru: {
    greetings: ['Добрый вечер, рад вас видеть.', 'Желаю вам хорошего дня.'],
    restaurant: ['Я бы хотел столик у окна.', 'Принесите, пожалуйста, меню дня.'],
    shopping: ['Можно оплатить телефоном?', 'Я ищу подарок для сестры.'],
    directions: ['Вход находится слева?', 'Можно дойти туда пешком отсюда?'],
    travel: ['Когда начинается посадка?', 'Я опоздал на пересадку.'],
    daily: ['Я записываю самые важные дела.', 'После работы я сделаю короткий перерыв.'],
  },
  es: {
    greetings: ['Buenas tardes, me alegra verte.', 'Que tengas un buen día.'],
    restaurant: ['Quisiera una mesa junto a la ventana.', '¿Me trae el menú del día, por favor?'],
    shopping: ['¿Puedo pagar con el móvil?', 'Estoy buscando un regalo para mi hermana.'],
    directions: ['¿La entrada está a la izquierda?', '¿Puedo ir caminando desde aquí?'],
    travel: ['¿A qué hora empieza el embarque?', 'Perdí mi conexión.'],
    daily: ['Anoto las tareas más importantes.', 'Después del trabajo tomo un descanso corto.'],
  },
  en: {
    greetings: ['Good evening, it is nice to see you.', 'I hope you have a pleasant day.'],
    restaurant: ['I would like a table by the window.', 'Could you bring me the daily menu, please?'],
    shopping: ['Can I pay with my phone?', 'I am looking for a gift for my sister.'],
    directions: ['Is the entrance on the left side?', 'Can I walk there from here?'],
    travel: ['When does boarding start?', 'I missed my connection.'],
    daily: ['I write down the most important tasks.', 'After work, I take a short break.'],
  },
}

export function getScenarioCatalog(scenarioKey, language = 'de') {
  const languageContent = CONTENT[language] || CONTENT.de
  const seed = languageContent[scenarioKey] || languageContent.greetings
  const supplementalLines = SUPPLEMENTAL_LINES[language]?.[scenarioKey] || []
  const englishSupplementalLines = SUPPLEMENTAL_LINES.en[scenarioKey] || []
  const items = []

  const lineEntries = [
    ...seed.lines.map((line, lineIndex) => ({ line, lineIndex, supplementalIndex: -1 })),
    ...supplementalLines.map((line, supplementalIndex) => ({
      line,
      lineIndex: seed.lines.length + supplementalIndex,
      supplementalIndex,
    })),
  ]

  lineEntries.forEach(({ line, lineIndex, supplementalIndex }) => {
    const hasSlot = line.includes('{slot}')
    const slots = hasSlot ? seed.slots : ['']

    slots.forEach((slot, slotIndex) => {
      const sentence = hasSlot ? line.replace('{slot}', slot) : line
      const englishSeed = CONTENT.en[scenarioKey] || CONTENT.en.greetings
      const englishLine = supplementalIndex >= 0
        ? englishSupplementalLines[supplementalIndex] || line
        : englishSeed.lines[lineIndex] || line
      const englishSlot = hasSlot
        ? scenarioKey === 'greetings' && lineIndex === 0
          ? slot
          : englishSeed.slots[slotIndex] || slot
        : ''
      const englishTranslation = hasSlot ? englishLine.replace('{slot}', englishSlot) : englishLine
      const variation = VARIATIONS[(lineIndex + slotIndex) % VARIATIONS.length]
      const level = LEVELS[(lineIndex + slotIndex) % LEVELS.length]

      items.push({
        id: `${language}-${scenarioKey}-${String(items.length + 1).padStart(3, '0')}`,
        language,
        languageLabel: LANGUAGE_LABELS[language] || language,
        scenario: scenarioKey,
        scenarioLabel: SCENARIO_LABELS[scenarioKey] || scenarioKey,
        level,
        word: hasSlot ? slot : sentence,
        englishWord: hasSlot ? englishSlot : englishLine,
        phrase: line,
        englishPhrase: englishLine,
        sentence,
        translation: englishTranslation,
        englishTranslation,
        trainingTip: variation,
      })
    })
  })

  return items
}

export function getAllCatalogItems() {
  return Object.keys(CONTENT).flatMap((language) => {
    return Object.keys(SCENARIO_LABELS).flatMap((scenarioKey) => getScenarioCatalog(scenarioKey, language))
  })
}

export function getCatalogStats(language = 'de') {
  const scenarioKeys = Object.keys(SCENARIO_LABELS)
  const perScenario = scenarioKeys.reduce((stats, scenarioKey) => {
    stats[scenarioKey] = getScenarioCatalog(scenarioKey, language).length
    return stats
  }, {})

  return {
    total: getAllCatalogItems().length,
    currentLanguageTotal: Object.values(perScenario).reduce((sum, count) => sum + count, 0),
    languageCount: Object.keys(CONTENT).length,
    perScenario,
  }
}
