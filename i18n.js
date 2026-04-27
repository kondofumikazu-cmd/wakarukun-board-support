(function () {
  'use strict';

  var SUPPORTED = ['ja', 'en', 'zh-Hans', 'zh-Hant', 'ko'];
  var DEFAULT_LANG = 'ja';
  var STORAGE_KEY = 'wakarukun-support-lang';

  var dict = { index: {}, privacy: {} };

  dict.index.ja = {
    'page.title': '病院・救急 わかるくんボード — サポート',
    'lang.label': '言語',
    'header.title': '病院・救急 わかるくんボード',
    'header.badge': 'サポート',
    'header.subtitle': '聴覚障害・難聴・多言語に対応する医療筆談ボード',
    'about.heading': 'このアプリについて',
    'about.body': '「病院・救急 わかるくんボード」は、聴覚障害・難聴で音声でのやりとりが難しい方、加齢で耳が聞こえにくい高齢の方、日本語が分からない外国人患者さんとの「筆談・指差しコミュニケーション」を、画面で大きく見せて伝えるための医療向けボードです。',
    'env.heading': '動作環境',
    'env.item1': 'iOS 17.0 以上（iPhone / iPad ユニバーサル対応）',
    'env.item2': 'インターネット接続は不要です（オフラインで動作します）',
    'usage.heading': '使い方の概要',
    'usage.item1': 'ホーム画面でカテゴリ（受付・問診・検査・処置 など）をタップします。',
    'usage.item2': '表示されたフレーズの中から伝えたいものをタップすると、画面いっぱいに大きく表示されます。',
    'usage.item3': '右上の歯車アイコンから言語を切り替えられます（16言語に対応）。',
    'usage.item4': '必要に応じて「ふりがな」を表示できます。',
    'pro.heading': 'Pro版（買い切り）について',
    'pro.item1': 'フレーズをお気に入りに登録して上部に固定',
    'pro.item2': 'カテゴリやフレーズを自由に並び替え',
    'pro.item3': '一度購入すれば追加料金なし。サブスクではありません。',
    'restore.heading': '購入を復元するには',
    'restore.item1': '右上の歯車アイコンから「設定」を開きます。',
    'restore.item2': '「購入を復元」をタップします。',
    'restore.item3': 'Apple ID にサインインしていれば、購入履歴から自動的にPro機能が再有効化されます。',
    'restore.note': '機種変更や再インストール時もこの手順で復元できます。',
    'faq.heading': 'よくあるご質問',
    'faq.q1': 'Q. 通信は発生しますか?',
    'faq.a1': 'A. アプリ本体の動作に通信は不要です。App Store による課金処理時のみ Apple のサーバと通信します。',
    'faq.q2': 'Q. 患者さんの情報を保存しますか?',
    'faq.a2': 'A. 一切保存しません。アプリ内に保存されるのは選択した言語、表示設定、フレーズの編集内容、お気に入り、並び順、購入状態のみで、これらはすべてあなたの端末内にのみ保存されます。',
    'faq.q3': 'Q. 16言語の翻訳はどのように行われていますか?',
    'faq.a3': 'A. 標準収録のフレーズは、リリース前に各言語の表現を確認した上であらかじめ収録しています。アプリ内で外部の翻訳APIにアクセスすることはありません。',
    'contact.heading': 'お問い合わせ',
    'contact.body': '不具合のご報告、機能のご要望、その他お問い合わせは下記までお願いいたします。',
    'privacy.heading': 'プライバシーポリシー',
    'privacy.body.before': '本アプリのプライバシーポリシーは ',
    'privacy.link': 'こちら',
    'privacy.body.after': ' をご覧ください。',
    'footer.copyright': '© 2026 Fumikazu Kondo. All rights reserved.'
  };

  dict.privacy.ja = {
    'page.title': '病院・救急 わかるくんボード — プライバシーポリシー',
    'header.title': 'プライバシーポリシー',
    'header.subtitle': '病院・救急 わかるくんボード',
    'header.updated': '最終更新日',
    'header.date': '2026年4月27日',
    'intro': 'Fumikazu Kondo（以下「開発者」）は、iOSアプリ「病院・救急 わかるくんボード」（以下「本アプリ」）における利用者のプライバシー保護を非常に重要なものと考えています。本ポリシーでは、本アプリでの情報の取り扱いについて説明します。',
    's1.heading': '1. 取得する情報',
    's1.body': '<strong>本アプリは、利用者個人を特定できる情報、利用統計、診療情報、患者情報を一切収集・送信しません。</strong>',
    's2.heading': '2. 端末内に保存される情報',
    's2.body': '本アプリは以下の情報を、利用者の端末内にのみ保存します。これらは外部に送信されることはありません。',
    's2.item1': '選択した表示言語',
    's2.item2': 'ふりがな表示などの表示設定',
    's2.item3': 'あらかじめ収録された医療フレーズ、および利用者が編集・追加したフレーズ',
    's2.item4': 'お気に入り登録の有無、お気に入り内の並び順',
    's2.item5': 'カテゴリやフレーズの並び順',
    's2.item6': 'App内課金（Pro機能）の購入状態',
    's3.heading': '3. ネットワーク通信',
    's3.body1': '本アプリ自体の動作に通信は必要ありません。診療現場や救急車内、地下の検査室など、通信環境のない場所でも完全にオフラインで動作します。',
    's3.body2': '例外として、App内課金の購入や購入の復元時のみ、Apple のサーバ（StoreKit）と通信します。これは Apple が運営する標準の決済プラットフォームを利用するものであり、本アプリは決済情報を一切取得しません。',
    's4.heading': '4. 第三者への情報提供',
    's4.body': '本アプリは情報を一切収集しないため、第三者に情報を提供することもありません。広告、解析、トラッキングのためのサードパーティ製ライブラリも使用していません。',
    's5.heading': '5. お子様による利用',
    's5.body': '本アプリは個人情報を一切収集しないため、すべての年齢の方に安全にご利用いただけます。',
    's6.heading': '6. データの削除方法',
    's6.body1': '本アプリをアンインストールすると、端末内に保存されていたすべてのデータ（編集したフレーズ、お気に入り、設定など）は削除されます。',
    's6.body2': 'App内課金の購入履歴は Apple ID に紐づいて Apple のサーバに保管されており、再インストール時に「購入を復元」から再有効化できます。これは本アプリではなく Apple による管理です。',
    's7.heading': '7. ポリシーの改定',
    's7.body': '本ポリシーは必要に応じて改定されることがあります。重要な変更がある場合は、本ページ上で告知します。',
    's8.heading': '8. お問い合わせ',
    's8.body': '本ポリシー、または本アプリの情報の取り扱いに関するお問い合わせは下記までお願いいたします。',
    'back': '← サポートページに戻る',
    'footer.copyright': '© 2026 Fumikazu Kondo. All rights reserved.'
  };

  dict.index.en = {
    'page.title': 'Hospital & Emergency Wakarukun Board — Support',
    'lang.label': 'Language',
    'header.title': 'Hospital & Emergency Wakarukun Board',
    'header.badge': 'Support',
    'header.subtitle': 'A medical writing board for the deaf and hard of hearing, with multi-language support',
    'about.heading': 'About this app',
    'about.body': 'Hospital & Emergency Wakarukun Board is a medical communication board designed to help healthcare staff communicate with people who are deaf, hard of hearing, elderly with hearing difficulties, or foreign patients who do not understand Japanese. It enlarges written and pointing-based communication on screen so it can be clearly seen and understood.',
    'env.heading': 'System requirements',
    'env.item1': 'iOS 17.0 or later (universal app for iPhone / iPad)',
    'env.item2': 'No internet connection required (works fully offline)',
    'usage.heading': 'How to use',
    'usage.item1': 'Tap a category on the home screen (Reception, Interview, Examination, Treatment, etc.).',
    'usage.item2': 'Tap any phrase to display it full-screen at a large size.',
    'usage.item3': 'Switch languages from the gear icon in the top right (16 languages supported).',
    'usage.item4': 'Furigana (reading aids over kanji) can be shown when needed.',
    'pro.heading': 'About the Pro version (one-time purchase)',
    'pro.item1': 'Mark phrases as favorites and pin them to the top',
    'pro.item2': 'Freely reorder categories and phrases',
    'pro.item3': 'No additional fees once purchased. This is not a subscription.',
    'restore.heading': 'How to restore a purchase',
    'restore.item1': 'Open Settings from the gear icon in the top right.',
    'restore.item2': 'Tap "Restore Purchases".',
    'restore.item3': 'If you are signed in with your Apple ID, the Pro features will be re-enabled automatically based on your purchase history.',
    'restore.note': 'You can use this same procedure when changing devices or reinstalling the app.',
    'faq.heading': 'Frequently asked questions',
    'faq.q1': 'Q. Does the app use any network communication?',
    'faq.a1': 'A. No network connection is required for the app itself. Communication with Apple servers occurs only during App Store payment processing.',
    'faq.q2': 'Q. Does the app save any patient information?',
    'faq.a2': 'A. None whatsoever. The only data stored in the app is your selected language, display settings, edited phrases, favorites, sort order, and purchase status — and all of this is kept only on your device.',
    'faq.q3': 'Q. How were the translations for the 16 languages produced?',
    'faq.a3': 'A. The built-in phrases were prepared in advance, with each language reviewed before release. The app does not access any external translation API at runtime.',
    'contact.heading': 'Contact',
    'contact.body': 'Please use the address below to report bugs, request features, or for any other inquiries.',
    'privacy.heading': 'Privacy policy',
    'privacy.body.before': 'You can read the privacy policy for this app ',
    'privacy.link': 'here',
    'privacy.body.after': '.',
    'footer.copyright': '© 2026 Fumikazu Kondo. All rights reserved.'
  };

  dict.privacy.en = {
    'page.title': 'Hospital & Emergency Wakarukun Board — Privacy Policy',
    'header.title': 'Privacy Policy',
    'header.subtitle': 'Hospital & Emergency Wakarukun Board',
    'header.updated': 'Last updated',
    'header.date': 'April 27, 2026',
    'intro': 'Fumikazu Kondo ("the developer") considers the protection of user privacy to be of utmost importance in the iOS app "Hospital & Emergency Wakarukun Board" ("the app"). This policy describes how information is handled in the app.',
    's1.heading': '1. Information collected',
    's1.body': '<strong>The app does not collect or transmit any personally identifiable information, usage statistics, medical records, or patient information.</strong>',
    's2.heading': '2. Information stored on your device',
    's2.body': 'The app stores the following information only on the user’s device. None of it is transmitted externally.',
    's2.item1': 'Selected display language',
    's2.item2': 'Display settings such as showing furigana',
    's2.item3': 'Built-in medical phrases, plus any phrases the user has edited or added',
    's2.item4': 'Favorite status and the order of favorited items',
    's2.item5': 'The order of categories and phrases',
    's2.item6': 'In-app purchase (Pro feature) status',
    's3.heading': '3. Network communication',
    's3.body1': 'The app itself does not require any network connection. It works fully offline, including in clinics, ambulances, basement examination rooms, or anywhere without connectivity.',
    's3.body2': 'As an exception, communication with Apple servers (StoreKit) occurs only when making or restoring an in-app purchase. This uses Apple’s standard payment platform; the app does not obtain any payment information.',
    's4.heading': '4. Sharing with third parties',
    's4.body': 'Because the app does not collect any information, it does not share any information with third parties. It also does not use any third-party libraries for advertising, analytics, or tracking.',
    's5.heading': '5. Use by children',
    's5.body': 'Because the app does not collect any personal information, it can be used safely by people of all ages.',
    's6.heading': '6. Deleting your data',
    's6.body1': 'Uninstalling the app deletes all data stored on your device (edited phrases, favorites, settings, and so on).',
    's6.body2': 'In-app purchase history is tied to your Apple ID and stored on Apple’s servers. It can be re-enabled with "Restore Purchases" upon reinstallation. This is managed by Apple, not by the app.',
    's7.heading': '7. Changes to this policy',
    's7.body': 'This policy may be revised as needed. Important changes will be announced on this page.',
    's8.heading': '8. Contact',
    's8.body': 'For inquiries about this policy or how the app handles information, please contact us at:',
    'back': '← Back to support page',
    'footer.copyright': '© 2026 Fumikazu Kondo. All rights reserved.'
  };

  dict.index['zh-Hans'] = {
    'page.title': '医院・急救 Wakarukun Board — 支持',
    'lang.label': '语言',
    'header.title': '医院・急救 Wakarukun Board',
    'header.badge': '支持',
    'header.subtitle': '面向听障、重听及多语言场景的医疗笔谈板',
    'about.heading': '关于本应用',
    'about.body': '"医院・急救 Wakarukun Board" 是一款面向医疗场景的沟通板，专为难以通过语音交流的听障、重听人士、因年龄增长而听力下降的高龄者，以及不懂日语的外国患者设计。它将笔谈与指点式沟通在屏幕上以大字体呈现，便于清晰传达。',
    'env.heading': '运行环境',
    'env.item1': 'iOS 17.0 或更高版本（iPhone / iPad 通用）',
    'env.item2': '无需互联网连接（可完全离线运行）',
    'usage.heading': '使用方法概览',
    'usage.item1': '在主屏幕上点选类别（接待、问诊、检查、处置等）。',
    'usage.item2': '从显示的短语中点选要传达的内容，即可全屏放大显示。',
    'usage.item3': '可通过右上角的齿轮图标切换语言（支持 16 种语言）。',
    'usage.item4': '可根据需要显示振假名（汉字注音）。',
    'pro.heading': '关于 Pro 版（一次性购买）',
    'pro.item1': '将短语收藏并固定到顶部',
    'pro.item2': '自由排序类别与短语',
    'pro.item3': '一次购买，无需追加费用。并非订阅制。',
    'restore.heading': '如何恢复购买',
    'restore.item1': '通过右上角的齿轮图标打开"设置"。',
    'restore.item2': '点击"恢复购买"。',
    'restore.item3': '只要已登录 Apple ID，即可根据购买记录自动重新启用 Pro 功能。',
    'restore.note': '更换设备或重新安装时也可使用此步骤恢复。',
    'faq.heading': '常见问题',
    'faq.q1': 'Q. 是否会产生网络通信？',
    'faq.a1': 'A. 应用本身的运行无需联网。仅在 App Store 进行付款处理时会与 Apple 服务器通信。',
    'faq.q2': 'Q. 会保存患者的信息吗？',
    'faq.a2': 'A. 完全不会保存。应用内仅存储所选语言、显示设置、编辑过的短语、收藏内容、排序及购买状态，且这些数据仅保存在您的设备本地。',
    'faq.q3': 'Q. 16 种语言的翻译是如何完成的？',
    'faq.a3': 'A. 内置短语在发布前已对各语言表达进行了核对并预先收录。应用运行时不会调用任何外部翻译 API。',
    'contact.heading': '联系方式',
    'contact.body': '若需报告故障、提出功能建议或其他咨询，请通过下方邮箱联系。',
    'privacy.heading': '隐私政策',
    'privacy.body.before': '本应用的隐私政策请参见 ',
    'privacy.link': '此处',
    'privacy.body.after': '。',
    'footer.copyright': '© 2026 Fumikazu Kondo. 保留所有权利。'
  };

  dict.privacy['zh-Hans'] = {
    'page.title': '医院・急救 Wakarukun Board — 隐私政策',
    'header.title': '隐私政策',
    'header.subtitle': '医院・急救 Wakarukun Board',
    'header.updated': '最后更新日期',
    'header.date': '2026 年 4 月 27 日',
    'intro': 'Fumikazu Kondo（以下称"开发者"）非常重视 iOS 应用 "医院・急救 Wakarukun Board"（以下称"本应用"）中用户隐私的保护。本政策说明本应用对信息的处理方式。',
    's1.heading': '1. 收集的信息',
    's1.body': '<strong>本应用不会收集或发送任何可识别个人身份的信息、使用统计、诊疗信息或患者信息。</strong>',
    's2.heading': '2. 保存在设备内的信息',
    's2.body': '本应用仅在用户设备本地保存以下信息。这些信息不会被发送至外部。',
    's2.item1': '所选的显示语言',
    's2.item2': '显示振假名等显示设置',
    's2.item3': '内置医疗短语，以及用户编辑或添加的短语',
    's2.item4': '是否已收藏，以及收藏内的排序',
    's2.item5': '类别与短语的排序',
    's2.item6': '应用内购买（Pro 功能）的购买状态',
    's3.heading': '3. 网络通信',
    's3.body1': '本应用本身的运行无需联网。即使在诊疗现场、救护车内或地下检查室等无网络环境下，也可完全离线运行。',
    's3.body2': '作为例外，仅在进行应用内购买或恢复购买时会与 Apple 服务器（StoreKit）通信。这使用的是 Apple 提供的标准支付平台，本应用不会获取任何支付信息。',
    's4.heading': '4. 向第三方提供信息',
    's4.body': '由于本应用不收集任何信息，因此也不会向第三方提供信息。本应用未使用任何用于广告、分析或追踪的第三方库。',
    's5.heading': '5. 儿童使用',
    's5.body': '由于本应用不收集任何个人信息，所有年龄段的用户均可安全使用。',
    's6.heading': '6. 数据删除方法',
    's6.body1': '卸载本应用后，保存在设备本地的所有数据（已编辑的短语、收藏、设置等）将被删除。',
    's6.body2': '应用内购买记录与 Apple ID 绑定，保存在 Apple 服务器上，重新安装时可通过"恢复购买"重新启用。该部分由 Apple 管理，与本应用无关。',
    's7.heading': '7. 政策的修订',
    's7.body': '本政策可能根据需要进行修订。如有重要变更，将在本页面上公告。',
    's8.heading': '8. 联系方式',
    's8.body': '如对本政策或本应用对信息的处理方式有任何咨询，请通过下方邮箱联系。',
    'back': '← 返回支持页',
    'footer.copyright': '© 2026 Fumikazu Kondo. 保留所有权利。'
  };

  dict.index['zh-Hant'] = {
    'page.title': '醫院・急救 Wakarukun Board — 支援',
    'lang.label': '語言',
    'header.title': '醫院・急救 Wakarukun Board',
    'header.badge': '支援',
    'header.subtitle': '為聽障、重聽及多語言情境提供協助的醫療筆談板',
    'about.heading': '關於本應用程式',
    'about.body': '「醫院・急救 Wakarukun Board」是一款醫療用溝通板，專為難以以口語交流的聽障、重聽人士、因年齡而聽力衰退的長者，以及不諳日語的外籍患者所設計。透過螢幕將筆談與指認式溝通放大顯示，讓對話更清晰易懂。',
    'env.heading': '系統需求',
    'env.item1': 'iOS 17.0 或以上版本（iPhone / iPad 通用）',
    'env.item2': '無需網際網路連線（可完全離線運作）',
    'usage.heading': '使用說明',
    'usage.item1': '在主畫面上點選類別（接待、問診、檢查、處置等）。',
    'usage.item2': '從顯示的語句中點選欲傳達的內容，即可滿版放大顯示。',
    'usage.item3': '可從右上角的齒輪圖示切換語言（支援 16 種語言）。',
    'usage.item4': '可視需要顯示振假名（漢字注音）。',
    'pro.heading': '關於 Pro 版（買斷制）',
    'pro.item1': '將語句加入最愛並釘選於上方',
    'pro.item2': '自由排序類別與語句',
    'pro.item3': '一次購買，無需後續費用。並非訂閱制。',
    'restore.heading': '如何還原購買',
    'restore.item1': '從右上角的齒輪圖示開啟「設定」。',
    'restore.item2': '點選「還原購買項目」。',
    'restore.item3': '只要已登入 Apple ID，即可依購買紀錄自動重新啟用 Pro 功能。',
    'restore.note': '更換裝置或重新安裝時，亦可依此步驟還原。',
    'faq.heading': '常見問題',
    'faq.q1': 'Q. 應用程式會進行網路通訊嗎？',
    'faq.a1': 'A. 應用程式本身的運作不需要連線。僅在 App Store 處理付款時會與 Apple 伺服器通訊。',
    'faq.q2': 'Q. 會儲存患者的資訊嗎？',
    'faq.a2': 'A. 完全不會儲存。應用程式內僅儲存所選語言、顯示設定、編輯過的語句、最愛、排序與購買狀態，且這些資料皆僅保存在您的裝置本機。',
    'faq.q3': 'Q. 16 種語言的翻譯是如何製作的？',
    'faq.a3': 'A. 內建語句已於釋出前針對各語言進行確認並事先收錄。應用程式執行時並未呼叫任何外部翻譯 API。',
    'contact.heading': '聯絡方式',
    'contact.body': '如需回報問題、提出功能需求或其他諮詢，請透過下方電子郵件聯絡。',
    'privacy.heading': '隱私權政策',
    'privacy.body.before': '本應用程式的隱私權政策請參閱 ',
    'privacy.link': '此處',
    'privacy.body.after': '。',
    'footer.copyright': '© 2026 Fumikazu Kondo. 版權所有。'
  };

  dict.privacy['zh-Hant'] = {
    'page.title': '醫院・急救 Wakarukun Board — 隱私權政策',
    'header.title': '隱私權政策',
    'header.subtitle': '醫院・急救 Wakarukun Board',
    'header.updated': '最後更新日期',
    'header.date': '2026 年 4 月 27 日',
    'intro': 'Fumikazu Kondo（以下稱「開發者」）對於 iOS 應用程式「醫院・急救 Wakarukun Board」（以下稱「本應用程式」）中使用者的隱私保護極為重視。本政策說明本應用程式對於資訊的處理方式。',
    's1.heading': '1. 蒐集的資訊',
    's1.body': '<strong>本應用程式不會蒐集或傳送任何可識別個人身分的資訊、使用統計、診療資訊或患者資訊。</strong>',
    's2.heading': '2. 儲存於裝置內的資訊',
    's2.body': '本應用程式僅將下列資訊儲存於使用者裝置本機。這些資訊不會被傳送至外部。',
    's2.item1': '所選的顯示語言',
    's2.item2': '顯示振假名等顯示設定',
    's2.item3': '內建醫療語句，以及使用者編輯或新增的語句',
    's2.item4': '是否加入最愛，以及最愛內的排序',
    's2.item5': '類別與語句的排序',
    's2.item6': '應用程式內購買（Pro 功能）的購買狀態',
    's3.heading': '3. 網路通訊',
    's3.body1': '本應用程式本身的運作不需要連線。即使在診療現場、救護車內或地下檢查室等無網路環境，也能完全離線運作。',
    's3.body2': '例外情形為：僅在進行應用程式內購買或還原購買時，會與 Apple 伺服器（StoreKit）通訊。這使用的是 Apple 所提供的標準支付平台，本應用程式不會取得任何付款資訊。',
    's4.heading': '4. 對第三方的資訊提供',
    's4.body': '由於本應用程式不蒐集任何資訊，因此也不會向第三方提供資訊。本應用程式未使用任何用於廣告、分析或追蹤的第三方程式庫。',
    's5.heading': '5. 兒童使用',
    's5.body': '由於本應用程式不蒐集任何個人資訊，因此各年齡層皆可安心使用。',
    's6.heading': '6. 資料刪除方式',
    's6.body1': '解除安裝本應用程式後，儲存於裝置本機的所有資料（編輯過的語句、最愛、設定等）皆會被刪除。',
    's6.body2': '應用程式內購買紀錄與 Apple ID 綁定，儲存於 Apple 伺服器上，重新安裝時可透過「還原購買項目」重新啟用。此部分由 Apple 管理，並非由本應用程式管理。',
    's7.heading': '7. 政策的修訂',
    's7.body': '本政策得視需要進行修訂。如有重要變更，將於本頁面上公告。',
    's8.heading': '8. 聯絡方式',
    's8.body': '如對本政策或本應用程式對於資訊處理方式有任何洽詢，請透過下方電子郵件聯絡。',
    'back': '← 返回支援頁面',
    'footer.copyright': '© 2026 Fumikazu Kondo. 版權所有。'
  };

  dict.index.ko = {
    'page.title': '병원・응급 Wakarukun Board — 지원',
    'lang.label': '언어',
    'header.title': '병원・응급 Wakarukun Board',
    'header.badge': '지원',
    'header.subtitle': '청각장애・난청・다국어에 대응하는 의료용 필담 보드',
    'about.heading': '앱 소개',
    'about.body': '"병원・응급 Wakarukun Board"는 음성 대화가 어려운 청각장애・난청 환자, 노화로 청력이 약해진 고령 환자, 일본어를 모르는 외국인 환자와의 "필담・손가락 가리키기 커뮤니케이션"을 화면에 크게 표시해 전달하기 위한 의료용 보드입니다.',
    'env.heading': '동작 환경',
    'env.item1': 'iOS 17.0 이상 (iPhone / iPad 유니버설 대응)',
    'env.item2': '인터넷 연결이 필요하지 않습니다 (오프라인에서 동작합니다)',
    'usage.heading': '사용 방법 개요',
    'usage.item1': '홈 화면에서 카테고리(접수・문진・검사・처치 등)를 탭합니다.',
    'usage.item2': '표시된 문구 중 전달하고 싶은 항목을 탭하면 화면 가득 크게 표시됩니다.',
    'usage.item3': '오른쪽 위의 톱니바퀴 아이콘에서 언어를 전환할 수 있습니다 (16개 언어 대응).',
    'usage.item4': '필요에 따라 "후리가나"를 표시할 수 있습니다.',
    'pro.heading': 'Pro 버전(일회성 구매)에 대하여',
    'pro.item1': '문구를 즐겨찾기로 등록해 상단에 고정',
    'pro.item2': '카테고리와 문구를 자유롭게 정렬',
    'pro.item3': '한 번 구매하면 추가 요금이 없습니다. 구독제가 아닙니다.',
    'restore.heading': '구매를 복원하려면',
    'restore.item1': '오른쪽 위의 톱니바퀴 아이콘에서 "설정"을 엽니다.',
    'restore.item2': '"구매 복원"을 탭합니다.',
    'restore.item3': 'Apple ID로 로그인되어 있다면 구매 내역을 통해 Pro 기능이 자동으로 다시 활성화됩니다.',
    'restore.note': '기기 변경이나 재설치 시에도 동일한 절차로 복원할 수 있습니다.',
    'faq.heading': '자주 묻는 질문',
    'faq.q1': 'Q. 통신이 발생하나요?',
    'faq.a1': 'A. 앱 자체의 동작에는 통신이 필요하지 않습니다. App Store의 결제 처리 시에만 Apple 서버와 통신합니다.',
    'faq.q2': 'Q. 환자의 정보를 저장하나요?',
    'faq.a2': 'A. 일절 저장하지 않습니다. 앱 내에 저장되는 것은 선택한 언어, 표시 설정, 문구의 편집 내용, 즐겨찾기, 정렬 순서, 구매 상태뿐이며, 모두 사용자의 단말기 내에만 저장됩니다.',
    'faq.q3': 'Q. 16개 언어 번역은 어떻게 이루어졌나요?',
    'faq.a3': 'A. 기본 수록된 문구는 출시 전에 각 언어 표현을 확인한 뒤 미리 수록한 것입니다. 앱 실행 중에 외부 번역 API에 접근하지 않습니다.',
    'contact.heading': '문의',
    'contact.body': '오류 신고, 기능 요청, 기타 문의는 아래로 연락 주시기 바랍니다.',
    'privacy.heading': '개인정보 처리방침',
    'privacy.body.before': '본 앱의 개인정보 처리방침은 ',
    'privacy.link': '여기',
    'privacy.body.after': '에서 확인하실 수 있습니다.',
    'footer.copyright': '© 2026 Fumikazu Kondo. All rights reserved.'
  };

  dict.privacy.ko = {
    'page.title': '병원・응급 Wakarukun Board — 개인정보 처리방침',
    'header.title': '개인정보 처리방침',
    'header.subtitle': '병원・응급 Wakarukun Board',
    'header.updated': '최종 업데이트',
    'header.date': '2026년 4월 27일',
    'intro': 'Fumikazu Kondo(이하 "개발자")는 iOS 앱 "병원・응급 Wakarukun Board"(이하 "본 앱")에서 사용자의 프라이버시 보호를 매우 중요하게 생각합니다. 본 방침은 본 앱에서의 정보 취급 방식에 대해 설명합니다.',
    's1.heading': '1. 수집하는 정보',
    's1.body': '<strong>본 앱은 사용자 개인을 식별할 수 있는 정보, 이용 통계, 진료 정보, 환자 정보를 일절 수집・전송하지 않습니다.</strong>',
    's2.heading': '2. 단말기 내에 저장되는 정보',
    's2.body': '본 앱은 다음 정보를 사용자 단말기 내에만 저장합니다. 이들은 외부로 전송되지 않습니다.',
    's2.item1': '선택한 표시 언어',
    's2.item2': '후리가나 표시 등 표시 설정',
    's2.item3': '기본 수록된 의료 문구 및 사용자가 편집・추가한 문구',
    's2.item4': '즐겨찾기 등록 여부 및 즐겨찾기 내 정렬 순서',
    's2.item5': '카테고리 및 문구의 정렬 순서',
    's2.item6': '앱 내 구매(Pro 기능)의 구매 상태',
    's3.heading': '3. 네트워크 통신',
    's3.body1': '본 앱 자체의 동작에는 통신이 필요하지 않습니다. 진료 현장이나 구급차 내, 지하 검사실 등 통신 환경이 없는 장소에서도 완전히 오프라인으로 동작합니다.',
    's3.body2': '예외적으로, 앱 내 구매나 구매 복원 시에만 Apple 서버(StoreKit)와 통신합니다. 이는 Apple이 운영하는 표준 결제 플랫폼을 이용하는 것이며, 본 앱은 결제 정보를 일절 취득하지 않습니다.',
    's4.heading': '4. 제3자에 대한 정보 제공',
    's4.body': '본 앱은 정보를 일절 수집하지 않으므로, 제3자에게 정보를 제공하는 일도 없습니다. 광고, 분석, 추적을 위한 서드파티 라이브러리도 사용하지 않습니다.',
    's5.heading': '5. 어린이의 이용',
    's5.body': '본 앱은 개인정보를 일절 수집하지 않으므로 모든 연령대가 안전하게 이용할 수 있습니다.',
    's6.heading': '6. 데이터 삭제 방법',
    's6.body1': '본 앱을 삭제하면 단말기 내에 저장되어 있던 모든 데이터(편집한 문구, 즐겨찾기, 설정 등)가 삭제됩니다.',
    's6.body2': '앱 내 구매 내역은 Apple ID에 연결되어 Apple 서버에 보관되며, 재설치 시 "구매 복원"을 통해 다시 활성화할 수 있습니다. 이는 본 앱이 아닌 Apple에 의해 관리됩니다.',
    's7.heading': '7. 방침의 개정',
    's7.body': '본 방침은 필요에 따라 개정될 수 있습니다. 중요한 변경이 있을 경우 본 페이지에서 공지합니다.',
    's8.heading': '8. 문의',
    's8.body': '본 방침 또는 본 앱의 정보 취급에 관한 문의는 아래로 연락 주시기 바랍니다.',
    'back': '← 지원 페이지로 돌아가기',
    'footer.copyright': '© 2026 Fumikazu Kondo. All rights reserved.'
  };


  function detectPage() {
    return /privacy/i.test(location.pathname) ? 'privacy' : 'index';
  }

  function normalizeBrowserLang(raw) {
    if (!raw) return null;
    var lower = String(raw).toLowerCase();
    if (lower.indexOf('zh') === 0) {
      if (lower.indexOf('tw') > -1 || lower.indexOf('hk') > -1 || lower.indexOf('mo') > -1 || lower.indexOf('hant') > -1) return 'zh-Hant';
      return 'zh-Hans';
    }
    if (lower.indexOf('en') === 0) return 'en';
    if (lower.indexOf('ko') === 0) return 'ko';
    if (lower.indexOf('ja') === 0) return 'ja';
    return null;
  }

  function detectInitialLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    var browser = normalizeBrowserLang(navigator.language || navigator.userLanguage);
    if (browser && SUPPORTED.indexOf(browser) !== -1) return browser;
    return DEFAULT_LANG;
  }

  function applyLang(lang) {
    var page = detectPage();
    var pack = (dict[page] && dict[page][lang]) || dict[page][DEFAULT_LANG] || {};
    document.documentElement.lang = lang;
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      if (Object.prototype.hasOwnProperty.call(pack, key)) {
        nodes[i].innerHTML = pack[key];
      }
    }
    var sel = document.getElementById('lang-select');
    if (sel) sel.value = lang;
  }

  function init() {
    var lang = detectInitialLang();
    applyLang(lang);
    var sel = document.getElementById('lang-select');
    if (sel) {
      sel.addEventListener('change', function (e) {
        var v = e.target.value;
        if (SUPPORTED.indexOf(v) === -1) return;
        try { localStorage.setItem(STORAGE_KEY, v); } catch (err) {}
        applyLang(v);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
