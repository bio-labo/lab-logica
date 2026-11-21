// ラボ・ロジカ（LAB LOGICA）追加全実験データ（＋36実験・＋6器具・＋36クイズ → 合計69実験）

(function () {
  const chem = SUBJECTS_DATA.find((s) => s.id === 'chem');
  const bio = SUBJECTS_DATA.find((s) => s.id === 'bio');
  const phys = SUBJECTS_DATA.find((s) => s.id === 'phys');

  // =====================================
  // 化学：追加15実験
  // =====================================
  chem.units.unshift({
    id: 'chem_basic',
    name: '<ruby>化<rt>か</rt>学<rt>がく</rt>基<rt>き</rt>礎<rt>そ</rt></ruby>（分離・溶液調製）',
    experiments: [
      {
        id: 'chem_separation',
        name: '<ruby>混<rt>こん</rt>合<rt>ごう</rt>物<rt>ぶつ</rt></ruby>の<ruby>分<rt>ぶん</rt>離<rt>り</rt></ruby>（蒸留・再結晶・昇華）',
        summary: '沸点差・溶解度差・昇華性など物質の性質の違いを利用して混合物を分ける実験。',
        playable: true,
        simType: 'step_lab',
        simConfig: {
          guide: '4つの代表的な分離操作を順番に試して、どんな物質に使うか確認しよう！',
          stages: [
            { label: '🌡️ 蒸留（海水から純水を得る）', visual: '💧♨️', bg: 'rgba(56,189,248,0.45)', text: '沸点の違いを利用！リービッヒ冷却器で冷やして純粋な水を集めます（冷却水は下→上！）。' },
            { label: '❄️ 再結晶（KNO3とNaClの分離）', visual: '💎', bg: 'rgba(186,230,253,0.5)', text: '温度による溶解度差を利用！高温で溶かして冷やすと KNO3 の結晶が析出！' },
            { label: '🟣 昇華法（ヨウ素の精製）', visual: '💨✨', bg: 'rgba(168,85,247,0.45)', text: '固体から直接気体になるヨウ素やナフタレンを温めて冷やし、純粋な結晶を得る！' },
            { label: '🧪 抽出（ヨウ素水＋ヘキサン）', visual: '🟠🟣', bg: 'rgba(244,114,182,0.45)', text: '溶媒への溶けやすさの違いを利用！ヨウ素は上のヘキサン層へ移動して赤紫色に！' }
          ]
        },
        equipmentIds: ['beaker', 'separatory_funnel'],
        youtubeQuery: '高校化学 混合物の分離 蒸留 再結晶 昇華',
        points: [
          'リービッヒ冷却器の冷却水は必ず「下から入れて上から出す」（気泡を残さず満水にするため）！',
          '沸騰石は突沸を防ぐため、加熱「前」に入れる！'
        ],
        steps: [
          { icon: '♨️', title: 'ステップ1：蒸留・分留', desc: '沸点の違いを利用して液体を気化・冷却し、純物質を取り出します。' },
          { icon: '💎', title: 'ステップ2：再結晶・昇華', desc: '溶解度差や昇華性を利用して純粋な結晶を分離します。' }
        ]
      },
      {
        id: 'chem_molarity',
        name: 'モル<ruby>濃<rt>のう</rt>度<rt>ど</rt></ruby>の<ruby>溶<rt>よう</rt>液<rt>えき</rt>調<rt>ちょう</rt>製<rt>せい</rt></ruby>',
        summary: 'メスフラスコと電子天秤・ホールピペットを使って正確な濃度の水溶液を作る実験。',
        playable: true,
        simType: 'step_lab',
        simConfig: {
          guide: '正確な 0.10 mol/L の水溶液を作る手順を順番に進めよう！',
          stages: [
            { label: '⚖️ 溶質を量り取りビーカーで少量の水に溶かす', visual: '🥛', bg: 'rgba(226,232,240,0.45)', text: '直接メスフラスコで溶かさず、まずビーカーで溶かして室温まで冷まします。' },
            { label: '🏺 メスフラスコへ移し、共洗い液もすべて入れる', visual: '💧', bg: 'rgba(186,230,253,0.45)', text: 'ビーカーについた溶質も純水ですすいで一滴残らずメスフラスコへ移します！' },
            { label: '📏 標線（メニスカス）まで純水を加えて振り混ぜる', visual: '✅✨', bg: 'rgba(34,197,94,0.45)', text: '駒込ピペットで標線ぴったりに合わせ、栓をして上下に振り混ぜて完成！' }
          ]
        },
        equipmentIds: ['volumetric_flask', 'beaker', 'pipette'],
        youtubeQuery: '高校化学 メスフラスコ 溶液調製 実験',
        points: [
          'メスフラスコは純水で濡れていてもOK（共洗いNG・加熱乾燥NG）！',
          '最後は駒込ピペットで目線の高さから「メニスカスの底」を標線に合わせる！'
        ],
        steps: [
          { icon: '🥛', title: 'ステップ1：ビーカーで溶解', desc: '溶質を少量の純水に完全に溶かします。' },
          { icon: '🏺', title: 'ステップ2：標線に合わせる', desc: 'メスフラスコに移して純水を加え、標線ぴったりに合わせます。' }
        ]
      }
    ]
  });

  const chemTheory = chem.units.find((u) => u.id === 'chem_theory');
  chemTheory.experiments.push(
    {
      id: 'chem_redox_titration',
      name: '<ruby>酸<rt>さん</rt>化<rt>か</rt>還<rt>かん</rt>元<rt>げん</rt>滴<rt>てき</rt>定<rt>てい</rt></ruby>（KMnO4）',
      summary: 'シュウ酸水溶液に過マンガン酸カリウム水溶液を滴下し、赤紫色が消えなくなる終点を見極める実験。',
      playable: true,
      simType: 'step_lab',
      simConfig: {
        guide: '硫酸酸性のシュウ酸水溶液に KMnO4 を滴下して、終点の色変化を確認しよう！',
        stages: [
          { label: '🧪 シュウ酸＋希硫酸を約60℃に温める', visual: '🌡️', bg: 'rgba(226,232,240,0.4)', text: '反応を速めるため軽く温めます（硫酸を使うのは酸化還元に関与しないため）。' },
          { label: '🟣 KMnO4（赤紫色）を滴下していく', visual: '💧', bg: 'rgba(216,180,254,0.35)', text: '入れた瞬間は赤紫色ですが、Mn2+ に還元されてすぐ「無色」に消えます！' },
          { label: '🩷 薄い赤紫色が消えずに残った！（終点）', visual: '✨🩷', bg: 'rgba(244,114,182,0.55)', text: '指示薬なしでも、微かな赤紫色が30秒消えなくなったら滴定終了！' }
        ]
      },
      equipmentIds: ['burette', 'conical_flask'],
      youtubeQuery: '高校化学 酸化還元滴定 過マンガン酸カリウム 実験',
      points: [
        'KMnO4 自身が赤紫色→無色に変化するため、他の指示薬が不要！',
        '酸性化に「塩酸（HCl）」を使うと Cl- が酸化されて Cl2 になるためNG！必ず「希硫酸」を使う！'
      ],
      steps: [
        { icon: '🌡️', title: 'ステップ1：硫酸酸性・加温', desc: 'シュウ酸に希硫酸を加えて約60℃に温めます。' },
        { icon: '🩷', title: 'ステップ2：終点の判定', desc: 'KMnO4 の薄い赤紫色が消えなくなったら終了です！' }
      ]
    },
    {
      id: 'chem_heat_neutral',
      name: '<ruby>中<rt>ちゅう</rt>和<rt>わ</rt>熱<rt>ねつ</rt></ruby>の<ruby>測<rt>そく</rt>定<rt>てい</rt></ruby>',
      summary: '発泡スチロール容器の中で強酸と強塩基を混ぜ、温度上昇から中和熱（約56.5 kJ/mol）を求める実験。',
      playable: true,
      simType: 'slider_lab',
      simConfig: {
        guide: '混ぜる塩酸と水酸化ナトリウムのモル数を増やして、発生熱量と温度上昇を確認しよう！',
        label: '反応した H+ と OH- の物質量（mol）',
        min: 0.05,
        max: 0.25,
        initial: 0.05,
        unit: 'mol',
        targetCheck: (v) => v >= 0.2,
        describe: (v) => {
          const q = (v * 56.5).toFixed(2);
          const dt = (v * 56.5 / 0.42).toFixed(1);
          return { bg: 'rgba(251, 146, 60, 0.45)', icon: '🌡️🔥', status: `発生熱量 Q = ${q} kJ（温度上昇 ΔT ≈ +${dt}℃）※1molあたり常に約56.5 kJ！` };
        }
      },
      equipmentIds: ['calorimeter'],
      youtubeQuery: '高校化学 中和熱の測定 実験',
      points: [
        '強酸＋強塩基の中和熱は、種類によらず水 1mol あたり約 56.5 kJ！',
        '熱が外に逃げないよう断熱性の高い発泡スチロール容器を使う。'
      ],
      steps: [
        { icon: '🥤', title: 'ステップ1：断熱容器で混合', desc: '塩酸とNaOH水溶液を混ぜて素早く温度変化を記録します。' },
        { icon: '🧮', title: 'ステップ2：Q = mcΔT で算出', desc: '温度上昇から熱量を計算し、生成した水の物質量で割ります。' }
      ]
    },
    {
      id: 'chem_lead_battery',
      name: '<ruby>鉛<rt>なまり</rt>蓄<rt>ちく</rt>電<rt>でん</rt>池<rt>ち</rt></ruby>の放電と充電',
      summary: '鉛板と酸化鉛(IV)板を希硫酸に入れ、豆電球を点灯（放電）させたあと外部電源で充電する実験。',
      playable: true,
      simType: 'step_lab',
      simConfig: {
        guide: '「放電」と「充電」で両極の質量や希硫酸の濃度がどう変化するか確認しよう！',
        stages: [
          { label: '💡 放電（Pb と PbO2 を導線でつなぐ）', visual: '💡✨', bg: 'rgba(250,204,21,0.45)', text: '約2Vで点灯！両極ともに白色の硫酸鉛(II) PbSO4 に変わり質量が増加！希硫酸は薄くなる。' },
          { label: '🔌 充電（外部電源を逆向きにつなぐ）', visual: '🔋⚡', bg: 'rgba(56,189,248,0.45)', text: '逆反応が起きて元の Pb と PbO2 に戻り、希硫酸の濃度も回復！繰り返し使える二次電池！' }
        ]
      },
      equipmentIds: ['beaker', 'power_supply'],
      youtubeQuery: '高校化学 鉛蓄電池 実験',
      points: [
        '放電すると両極（負極 Pb、正極 PbO2）ともに「PbSO4」になり質量が増加する！',
        '放電で H2SO4 が消費され H2O が生じるため、電解液の密度・濃度が低下する。'
      ],
      steps: [
        { icon: '💡', title: 'ステップ1：放電', desc: '負極・正極ともにPbSO4になり、起電力約2.1Vで電流が流れます。' },
        { icon: '🔋', title: 'ステップ2：充電', desc: '外部電源から逆向きに電流を流すと元の電極と希硫酸に再生します。' }
      ]
    },
    {
      id: 'chem_nacl_elec',
      name: 'NaCl水溶液の<ruby>電<rt>でん</rt>気<rt>き</rt>分<rt>ぶん</rt>解<rt>かい</rt></ruby>（陽イオン交換膜法）',
      summary: '食塩水を電気分解して塩素・水素・水酸化ナトリウムを工業的に作る仕組みを確かめる実験。',
      playable: true,
      simType: 'step_lab',
      simConfig: {
        guide: '陽イオン交換膜で仕切った食塩水に電流を流して、両極の生成物を確認しよう！',
        stages: [
          { label: '⚡ 陽極（＋）の反応を見る', visual: '🟨🫧', bg: 'rgba(250,204,21,0.45)', text: '塩化物イオン Cl- が電子を奪われ、黄緑色の「塩素（Cl2）」が発生！' },
          { label: '⚡ 陰極（－）の反応を見る', visual: '🫧🔵', bg: 'rgba(56,189,248,0.45)', text: '水が還元されて「水素（H2）」が発生！陰極室に高純度の NaOH 水溶液が生成！' }
        ]
      },
      equipmentIds: ['power_supply', 'beaker'],
      youtubeQuery: '高校化学 塩化ナトリウム水溶液 電気分解 陽イオン交換膜法',
      points: [
        '陽極：2Cl- → Cl2 + 2e-（塩素発生）',
        '陰極：2H2O + 2e- → H2 + 2OH-（水素発生＆塩基性化）、Na+ が交換膜を通って陰極室へ移動！'
      ],
      steps: [
        { icon: '🟨', title: 'ステップ1：陽極でCl2', desc: 'Cl-が酸化されて塩素ガスが発生します。' },
        { icon: '🔵', title: 'ステップ2：陰極でH2とNaOH', desc: '水素が発生し、陰極室に水酸化ナトリウムが得られます。' }
      ]
    },
    {
      id: 'chem_reaction_rate',
      name: '<ruby>反<rt>はん</rt>応<rt>のう</rt>速<rt>そく</rt>度<rt>ど</rt></ruby>と温度・触媒',
      summary: '過酸化水素の分解反応で、温度や触媒（MnO2）の有無による反応速度の違いを調べる実験。',
      playable: true,
      simType: 'slider_lab',
      simConfig: {
        guide: '反応温度を上げて、単位時間あたりの酸素発生速度がどう変化するか観察しよう！',
        label: '反応温度（℃）',
        min: 10,
        max: 60,
        initial: 20,
        unit: '℃',
        targetCheck: (v) => v >= 50,
        describe: (v) => {
          const rate = Math.pow(2, (v - 20) / 10).toFixed(1);
          return { bg: 'rgba(56, 189, 248, 0.45)', icon: v >= 45 ? '🫧🫧🫧' : '🫧', status: `20℃の約 ${rate} 倍の速さで酸素が発生！（一般に温度が10℃上がると反応速度は約2〜3倍！）` };
        }
      },
      equipmentIds: ['test_tube', 'water_bath'],
      youtubeQuery: '高校化学 反応速度 温度 触媒 実験',
      points: [
        '温度を上げると活性化エネルギー以上の運動エネルギーを持つ分子が増え、反応速度が急増！',
        '触媒は「活性化エネルギー」を下げるが、反応熱（ΔH）は変えない！'
      ],
      steps: [
        { icon: '🌡️', title: 'ステップ1：温度を上げる', desc: '10℃上げるごとに反応速度が約2倍以上速くなります。' },
        { icon: '⚡', title: 'ステップ2：触媒の効果', desc: 'MnO2を加えると活性化エネルギーが下がり常温でも激しく分解します。' }
      ]
    }
  );

  const chemInorg = chem.units.find((u) => u.id === 'chem_inorg');
  chemInorg.experiments.push(
    {
      id: 'chem_systematic',
      name: '金属イオンの<ruby>系<rt>けい</rt>統<rt>とう</rt>分<rt>ぶん</rt>離<rt>り</rt></ruby>（混合液）',
      summary: 'Ag+, Pb2+, Cu2+, Fe3+, Al3+, Zn2+, Ca2+ が混ざった液から、試薬を順に加えて1つずつ分離する実験。',
      playable: true,
      simType: 'step_lab',
      simConfig: {
        guide: '混合溶液から沈殿と濾過を繰り返し、5段階で全イオンを完全に分け切ろう！',
        stages: [
          { label: '① 塩酸（HCl）を加える', visual: '⚪', bg: 'rgba(226,232,240,0.5)', text: 'AgCl・PbCl2 が白色沈殿！（熱湯でPbCl2だけ溶かして分離）' },
          { label: '② 濾液（酸性）に H2S を通じる', visual: '⚫', bg: 'rgba(51,65,85,0.75)', text: 'CuS が黒色沈殿として分離！' },
          { label: '③ 煮沸してH2S追い出し→HNO3で酸化→NH3水過剰', visual: '🟫⚪', bg: 'rgba(180,83,9,0.5)', text: 'Fe(OH)3(赤褐)・Al(OH)3(白) が沈殿！Zn2+ は錯イオンで濾液へ！' },
          { label: '④ 濾液（塩基性）に H2S を通じる', visual: '⚪✨', bg: 'rgba(241,245,249,0.65)', text: 'ZnS が白色沈殿として分離！残った濾液に (NH4)2CO3 で CaCO3(白) を分離して完了！' }
        ]
      },
      equipmentIds: ['test_tube', 'beaker', 'pipette'],
      youtubeQuery: '高校化学 金属イオンの系統分離 実験',
      points: [
        '手順の順番（HCl → H2S(酸性) → 煮沸&酸化&NH3水過剰 → H2S(塩基性) → (NH4)2CO3）をそのまま覚えよう！',
        '手順③で「H2Sを煮沸で追い出し、HNO3でFe2+をFe3+に酸化する」理由が超頻出！'
      ],
      steps: [
        { icon: '1️⃣', title: 'ステップ1：HClでAg+, Pb2+分離', desc: '塩化物沈殿を作って濾過します。' },
        { icon: '2️⃣', title: 'ステップ2：酸性H2SでCu2+分離', desc: '酸性条件下でCuSを沈殿させます。' },
        { icon: '3️⃣', title: 'ステップ3：NH3過剰でFe3+, Al3+分離', desc: '水酸化物沈殿を作り、Zn2+は錯イオンとして濾液に残します。' }
      ]
    },
    {
      id: 'chem_iron_detect',
      name: '鉄イオン（Fe2+・Fe3+）の<ruby>検<rt>けん</rt>出<rt>しゅつ</rt></ruby>',
      summary: 'ヘキサシアニド鉄酸カリウムやチオシアン酸カリウムを使って Fe2+ と Fe3+ を鋭敏に見分ける実験。',
      playable: true,
      simType: 'step_lab',
      simConfig: {
        guide: 'Fe2+ と Fe3+ の見分けに使う3つの有名な試薬を試そう！',
        stages: [
          { label: '🔵 Fe2+ ＋ K3[Fe(CN)6]（赤血塩）', visual: '🔵', bg: 'rgba(29,78,216,0.75)', text: '濃青色沈殿（ターンブル青）が生成！Fe2+ 特有の検出反応！' },
          { label: '🔵 Fe3+ ＋ K4[Fe(CN)6]（黄血塩）', visual: '🔵', bg: 'rgba(30,64,175,0.8)', text: '濃青色沈殿（ベルリン青 / プルシアンブルー）が生成！Fe3+ の検出反応！' },
          { label: '🩸 Fe3+ ＋ KSCN（チオシアン酸カリウム）', visual: '🩸', bg: 'rgba(185,28,28,0.8)', text: '鮮やかな「血赤色」の溶液に！沈殿ではなく錯イオン [Fe(SCN)]2+ の色！' }
        ]
      },
      equipmentIds: ['test_tube', 'pipette'],
      youtubeQuery: '高校化学 Fe2+ Fe3+ 検出 KSCN ベルリン青',
      points: [
        'Fe2+ は「3価のシアン錯塩」と濃青色沈殿、Fe3+ は「2価のシアン錯塩」と濃青色沈殿！',
        'Fe3+ ＋ KSCN → 血赤色「溶液」（沈殿ではない！）。'
      ],
      steps: [
        { icon: '🔵', title: 'ステップ1：濃青色沈殿', desc: '鉄イオンの価数が違う組合せ（2+と3価、3+と2価）で濃青色沈殿ができます。' },
        { icon: '🩸', title: 'ステップ2：KSCNで血赤色', desc: 'Fe3+にKSCNを加えると鮮やかな血赤色溶液になります。' }
      ]
    }
  );

  const chemOrg = chem.units.find((u) => u.id === 'chem_org');
  chemOrg.experiments.push(
    {
      id: 'chem_elemental',
      name: '有機化合物の<ruby>元<rt>げん</rt>素<rt>そ</rt>分<rt>ぶん</rt>析<rt>せき</rt></ruby>',
      summary: '酸化銅(II)とともに有機物を完全燃焼させ、生じたH2OとCO2を吸収管で捕集して組成式を決める実験。',
      playable: true,
      simType: 'step_lab',
      simConfig: {
        guide: '燃焼ガスを通す2つの吸収管の「順番」と色変化を確認しよう！',
        stages: [
          { label: '🔥 酸化銅(II) CuO とともに加熱して完全燃焼', visual: '🔥', bg: 'rgba(239,68,68,0.4)', text: '試料中の C は CO2 に、H は H2O に完全に変わります。' },
          { label: '💧 ① 塩化カルシウム管（H2Oを吸収）', visual: '🔵', bg: 'rgba(56,189,248,0.45)', text: '先に H2O を吸収！（※無水硫酸銅(II)を置くと白→青に変わる）' },
          { label: '🫧 ② ソーダ石灰管（CO2を吸収）', visual: '⚪', bg: 'rgba(226,232,240,0.55)', text: '次に CO2 を吸収！もし逆にするとソーダ石灰がH2Oも吸ってしまうので順番絶対厳守！' }
        ]
      },
      equipmentIds: ['gas_burner', 'test_tube'],
      youtubeQuery: '高校化学 元素分析 塩化カルシウム ソーダ石灰',
      points: [
        '必ず「① 塩化カルシウム（H2O吸収）→ ② ソーダ石灰（CO2吸収）」の順！',
        '酸素 O の質量は直接測れないため、「元の試料質量 － (Cの質量 ＋ Hの質量)」で求める！'
      ],
      steps: [
        { icon: '🔥', title: 'ステップ1：完全燃焼', desc: 'CuOを触媒兼酸素供給源としてCO2とH2Oにします。' },
        { icon: '📏', title: 'ステップ2：質量増加を測定', desc: 'CaCl2管でH2O、ソーダ石灰管でCO2の質量を測ります。' }
      ]
    },
    {
      id: 'chem_alcohol_ox',
      name: 'アルコールの<ruby>酸<rt>さん</rt>化<rt>か</rt></ruby>（1級・2級・3級）',
      summary: '赤熱した銅線や二クロム酸カリウムでアルコールを酸化し、級数による生成物の違いを確かめる実験。',
      playable: true,
      simType: 'step_lab',
      simConfig: {
        guide: '1級・2級・3級アルコールが酸化されると何に変わるか試そう！',
        stages: [
          { label: '1️⃣ 第1級アルコール（エタノール）を酸化', visual: '🍏➡️🍶', bg: 'rgba(74,222,128,0.5)', text: 'まず「アルデヒド（アセトアルデヒド）」になり、さらに酸化すると「カルボン酸（酢酸）」になる！' },
          { label: '2️⃣ 第2級アルコール（2-プロパノール）を酸化', visual: '🧪', bg: 'rgba(56,189,248,0.5)', text: '「ケトン（アセトン）」になってストップ！' },
          { label: '3️⃣ 第3級アルコール（2-メチル-2-プロパノール）', visual: '❌', bg: 'rgba(203,213,225,0.45)', text: 'Cに直結したHがないため、穏やかな条件では「酸化されない」！' }
        ]
      },
      equipmentIds: ['test_tube', 'gas_burner'],
      youtubeQuery: '高校化学 アルコールの酸化 銅線 実験',
      points: [
        '第1級 → アルデヒド → カルボン酸 ／ 第2級 → ケトン ／ 第3級 → 酸化されない！',
        '酸化剤 K2Cr2O7(橙赤) を使うと、還元されて Cr3+(緑色) に変色する。'
      ],
      steps: [
        { icon: '1️⃣', title: 'ステップ1：第1級', desc: '2段階でカルボン酸まで酸化されます。' },
        { icon: '2️⃣', title: 'ステップ2：第2級・第3級', desc: '2級はケトンで止まり、3級は酸化されません。' }
      ]
    },
    {
      id: 'chem_phenol',
      name: 'フェノール<ruby>類<rt>るい</rt></ruby>の<ruby>検<rt>けん</rt>出<rt>しゅつ</rt></ruby>（FeCl3・臭素水）',
      summary: 'フェノール水溶液に塩化鉄(III)水溶液や臭素水を加えて、特有の呈色と沈殿を確認する実験。',
      playable: true,
      simType: 'step_lab',
      simConfig: {
        guide: 'フェノールを確実に検出する2つの定番反応を試そう！',
        stages: [
          { label: '🟣 塩化鉄(III) FeCl3 水溶液を加える', visual: '🟣', bg: 'rgba(126,34,206,0.65)', text: '青紫色〜赤紫色に呈色！フェノール性ヒドロキシ基（ベンゼン環直結 -OH）の証拠！' },
          { label: '⚪ 臭素水（赤褐色）を加える', visual: '⚪', bg: 'rgba(241,245,249,0.75)', text: '臭素水の赤褐色が消え、2,4,6-トリブロモフェノールの「白色沈殿」が生成！' }
        ]
      },
      equipmentIds: ['test_tube', 'pipette'],
      youtubeQuery: '高校化学 フェノール 塩化鉄 臭素水 実験',
      points: [
        'FeCl3 による青紫色呈色は「フェノール類（サリチル酸含む）」の決定的証拠！',
        '炭酸（H2CO3）より弱い酸なので、炭酸水素ナトリウム（NaHCO3）とは反応しない！'
      ],
      steps: [
        { icon: '🟣', title: 'ステップ1：FeCl3呈色', desc: 'フェノール性OHがあると青〜赤紫色に変化します。' },
        { icon: '⚪', title: 'ステップ2：臭素水と白色沈殿', desc: 'オルト・パラ位にBrが3つ置換した白色沈殿ができます。' }
      ]
    },
    {
      id: 'chem_aromatic_sep',
      name: '<ruby>芳<rt>ほう</rt>香<rt>こう</rt>族<rt>ぞく</rt></ruby>化合物の<ruby>分<rt>ぶん</rt>離<rt>り</rt></ruby>（分液漏斗）',
      summary: 'アニリン・安息香酸・フェノール・ニトロベンゼンの混合エーテル溶液を酸・塩基の強弱で順番に分ける実験。',
      playable: true,
      simType: 'step_lab',
      simConfig: {
        guide: '分液漏斗を使って、4つの芳香族化合物を水層とエーテル層に順番に振り分けよう！',
        stages: [
          { label: '① 希塩酸（HCl）を加えて振る', visual: '🧪', bg: 'rgba(186,230,253,0.45)', text: '塩基性の「アニリン」だけが塩になって水層へ移動！分離完了！' },
          { label: '② 炭酸水素ナトリウム（NaHCO3）を加えて振る', visual: '🫧', bg: 'rgba(134,239,172,0.45)', text: '強い酸の「安息香酸」だけが塩になって水層へ移動！（フェノールは弱酸なので反応せず残る！）' },
          { label: '③ 水酸化ナトリウム（NaOH）を加えて振る', visual: '✨', bg: 'rgba(253,224,71,0.45)', text: '弱酸の「フェノール」が塩になって水層へ！残ったエーテル層が中性の「ニトロベンゼン」！' }
        ]
      },
      equipmentIds: ['separatory_funnel', 'beaker'],
      youtubeQuery: '高校化学 芳香族化合物の分離 分液漏斗',
      points: [
        '酸の強さ：カルボン酸（安息香酸）＞ 炭酸（H2CO3）＞ フェノール！',
        'この強弱の差を使うため、②でNaHCO3、③でNaOHの順に加えるのが絶対ルール！'
      ],
      steps: [
        { icon: '1️⃣', title: 'ステップ1：HClで塩基を分離', desc: 'アニリンを塩酸塩にして水層へ移します。' },
        { icon: '2️⃣', title: 'ステップ2：NaHCO3とNaOH', desc: '酸の強さの差を利用して安息香酸とフェノールを別々に分けます。' }
      ]
    },
    {
      id: 'chem_sugar',
      name: '<ruby>糖<rt>とう</rt>類<rt>るい</rt></ruby>の還元性とデンプンの<ruby>加<rt>か</rt>水<rt>すい</rt>分<rt>ぶん</rt>解<rt>かい</rt></ruby>',
      summary: '単糖・二糖の還元性の違いと、デンプンを酸で加水分解したときのヨウ素反応の変化を調べる実験。',
      playable: true,
      simType: 'step_lab',
      simConfig: {
        guide: 'スクロースが還元性を持たないことや、デンプン分解後の変化を確かめよう！',
        stages: [
          { label: '🍯 グルコース・マルトース＋フェーリング液加熱', visual: '🧱', bg: 'rgba(220,38,38,0.6)', text: '還元性があるため、Cu2O の赤色沈殿が生じた！' },
          { label: '🍬 スクロース（ショ糖）＋フェーリング液加熱', visual: '🔵', bg: 'rgba(56,189,248,0.55)', text: '還元性がないため青いまま！（希硫酸で加水分解するとグルコース＋フルクトースになり還元性復活！）' },
          { label: '🥔 デンプンを希硫酸で加熱後、ヨウ素液を加える', visual: '🟤➡️⚪', bg: 'rgba(254,240,138,0.5)', text: '最初は青紫色だったのが、分解が進むと赤紫色→無色（ヨウ素反応陰性）に！' }
        ]
      },
      equipmentIds: ['test_tube', 'water_bath'],
      youtubeQuery: '高校化学 糖類 還元性 デンプン 加水分解 実験',
      points: [
        'スクロース（ショ糖）は二糖類の中で唯一「還元性なし」！',
        '加水分解後の溶液にフェーリング液を使うときは、必ず先に NaOH で中和してから行う！'
      ],
      steps: [
        { icon: '🧱', title: 'ステップ1：還元性の有無', desc: 'スクロース以外はすべて還元性を示します。' },
        { icon: '🥔', title: 'ステップ2：デンプンの分解', desc: 'ヨウ素デンプン反応の青紫色が徐々に消えていきます。' }
      ]
    }
  );

  const chemPolymer = chem.units.find((u) => u.id === 'chem_polymer');
  chemPolymer.experiments.push({
    id: 'chem_soap',
    name: 'セッケンの合成（<ruby>け<rt>け</rt>ん<rt>ん</rt>化<rt>か</rt></ruby>）と<ruby>塩<rt>えん</rt>析<rt>せき</rt></ruby>',
    summary: '植物油（油脂）に水酸化ナトリウムとエタノールを加えて加熱し、飽和食塩水でセッケンを取り出す実験。',
    playable: true,
    simType: 'step_lab',
    simConfig: {
      guide: '油脂をけん化して、飽和食塩水でセッケンを析出（塩析）させよう！',
      stages: [
        { label: '🛢️ 油脂＋NaOH水溶液＋エタノールを加熱', visual: '♨️', bg: 'rgba(254,240,138,0.5)', text: 'エタノールは油と水を混ざりやすくするために加えます！けん化が進みセッケンが生成！' },
        { label: '🧂 飽和食塩水（NaCl）に注ぐ（塩析）', visual: '🧼✨', bg: 'rgba(241,245,249,0.75)', text: '水への溶解度が下がり、白い固体のセッケン（R-COONa）が上部に浮かび上がった！' }
      ]
    },
    equipmentIds: ['beaker', 'water_bath'],
    youtubeQuery: '高校化学 セッケン けん化 塩析 実験',
    points: [
      'エタノールを加える理由：水と油を均一に混ぜて反応を速めるため！',
      'セッケン水溶液は弱塩基性を示し、硬水（Ca2+, Mg2+）では不溶性の沈殿ができて泡立たない！'
    ],
    steps: [
      { icon: '♨️', title: 'ステップ1：けん化', desc: '油脂を強塩基で加水分解して脂肪酸ナトリウムにします。' },
      { icon: '🧼', title: 'ステップ2：塩析', desc: '飽和食塩水に注いでセッケンを固体として析出させます。' }
    ]
  });

  // =====================================
  // 生物：追加10実験
  // =====================================
  const bioCell = bio.units.find((u) => u.id === 'bio_cell');
  bioCell.experiments.push(
    {
      id: 'bio_micrometer',
      name: 'ミクロメーターによる<ruby>細<rt>さい</rt>胞<rt>ぼう</rt></ruby>サイズ測定',
      summary: '対物ミクロメーター（1目盛り10μm）と接眼ミクロメーターの目盛りを重ねて、実際の細胞の長さを測る実験。',
      playable: true,
      simType: 'slider_lab',
      simConfig: {
        guide: '倍率（接眼1目盛りあたりの長さ）を確認して、15目盛り分の細胞の大きさを計算しよう！',
        label: '対物1目盛り(10μm)と一致する接眼目盛り数（10〜20）',
        min: 2,
        max: 10,
        initial: 4,
        unit: '目盛り（対物4目盛り＝40μm に対し）',
        targetCheck: (v) => v === 8,
        describe: (v) => {
          const perUnit = (40 / v).toFixed(1);
          const cellSize = (perUnit * 15).toFixed(0);
          return {
            bg: 'rgba(134, 239, 172, 0.45)',
            icon: '📏🔬',
            status: `接眼1目盛り ＝ ${perUnit} μm！細胞が15目盛りなら大きさは ${cellSize} μm！（※倍率を変えたら再測定必須！）`
          };
        }
      },
      equipmentIds: ['microscope'],
      youtubeQuery: '高校生物 ミクロメーター 使い方 計算',
      points: [
        '対物ミクロメーターの1目盛りは倍率に関係なく常に「10 μm（0.01 mm）」！',
        '対物レンズの倍率を変えると「接眼ミクロメーター1目盛りが表す長さ」も変わるため、必ず計り直す！'
      ],
      steps: [
        { icon: '📏', title: 'ステップ1：1目盛りの値を求める', desc: '対物と接眼の目盛りが重なる2点を探し、割り算で1目盛りを求めます。' },
        { icon: '🔬', title: 'ステップ2：細胞を測る', desc: 'プレパラートに替え、細胞が接眼何目盛り分か数えて掛け算します。' }
      ]
    },
    {
      id: 'bio_streaming',
      name: 'オオカナダモの<ruby>原<rt>げん</rt>形<rt>けい</rt>質<rt>しつ</rt>流<rt>りゅう</rt>動<rt>どう</rt></ruby>',
      summary: '生きているオオカナダモの葉を顕微鏡で覗き、葉緑体が細胞内を一方向に流れる様子を観察する実験。',
      playable: true,
      simType: 'slider_lab',
      simConfig: {
        guide: '水温・光の条件を変えて、葉緑体の動く速さ（原形質流動）がどう変わるか観察しよう！',
        label: '水温（℃）',
        min: 5,
        max: 40,
        initial: 15,
        unit: '℃',
        targetCheck: (v) => v >= 28,
        describe: (v) => {
          if (v < 12) return { bg: 'rgba(186,230,253,0.45)', icon: '🌿🐢', status: '冷たくて動きがとてもゆっくり…' };
          if (v <= 32) return { bg: 'rgba(74,222,128,0.55)', icon: '🌿💨', status: '葉緑体が液胞の周りをグルグル活発に流れている！（原形質流動：ATPとミオシン・アクチン繊維による運動！）' };
          return { bg: 'rgba(251,191,36,0.4)', icon: '🌿⚠️', status: '高水温でタンパク質が傷み動きが鈍くなってきた…' };
        }
      },
      equipmentIds: ['microscope'],
      youtubeQuery: '高校生物 オオカナダモ 原形質流動 観察',
      points: [
        '葉緑体自身が泳ぐのではなく、モータータンパク質（ミオシン）とアクチンフィラメントが細胞質を動かしている！',
        '生きている細胞でしか見られず、適切な温度（25〜30℃）や光で活発になる。'
      ],
      steps: [
        { icon: '🌿', title: 'ステップ1：葉をセット', desc: '若い葉を水でマウントし、中肋（中央）付近の細胞を観察します。' },
        { icon: '🔄', title: 'ステップ2：葉緑体の移動', desc: '細胞壁に沿って一方向に流れる様子が確認できます。' }
      ]
    },
    {
      id: 'bio_amylase',
      name: 'アミラーゼによるデンプン<ruby>分<rt>ぶん</rt>解<rt>かい</rt></ruby>',
      summary: 'だ液（アミラーゼ）をデンプン溶液に加え、ヨウ素液とベネジクト液で分解を確かめる実験。',
      playable: true,
      simType: 'step_lab',
      simConfig: {
        guide: 'デンプン＋だ液を37℃で保温したあと、2種類の試薬で分解されたかテストしよう！',
        stages: [
          { label: '🌡️ 37℃で10分間保温（比較：氷水・煮沸）', visual: '🧪', bg: 'rgba(254,240,138,0.45)', text: '37℃の試験管だけアミラーゼが活発に働き、デンプンがマルトース（麦芽糖）へ分解された！' },
          { label: '🟣 ヨウ素液を加える', visual: '🟤', bg: 'rgba(180,83,9,0.4)', text: '青紫色にならない（茶褐色のまま）＝デンプンがなくなった証拠！' },
          { label: '🧱 ベネジクト液を加えて加熱する', visual: '🧱', bg: 'rgba(220,38,38,0.55)', text: '赤褐色沈殿（Cu2O）が出た！還元糖（マルトース）が生じた決定的証拠！' }
        ]
      },
      equipmentIds: ['test_tube', 'water_bath'],
      youtubeQuery: '高校生物 アミラーゼ ヨウ素液 ベネジクト液 実験',
      points: [
        'ヨウ素反応が「陰性」＋ベネジクト反応が「陽性（加熱必須！）」なら分解成功！',
        'ベネジクト液は必ず「加熱（沸騰石入りで軽く煮沸）」しないと赤褐色にならない！'
      ],
      steps: [
        { icon: '🟤', title: 'ステップ1：ヨウ素液', desc: '分解されていれば青紫色にならず茶褐色のままです。' },
        { icon: '🧱', title: 'ステップ2：ベネジクト液＋加熱', desc: '生じたマルトースにより赤褐色沈殿ができます。' }
      ]
    }
  );

  const bioGene = bio.units.find((u) => u.id === 'bio_gene');
  bioGene.experiments.push(
    {
      id: 'bio_salivary',
      name: 'だ<ruby>腺<rt>せん</rt></ruby><ruby>染<rt>せん</rt>色<rt>しょく</rt>体<rt>たい</rt></ruby>とパフの観察',
      summary: 'ユスリカやショウジョウバエ幼虫のだ腺を取り出し、巨大な染色体と膨らみ（パフ）を観察する実験。',
      playable: true,
      simType: 'step_lab',
      simConfig: {
        guide: 'だ腺染色体の特徴と「パフ」の正体をステップで確認しよう！',
        stages: [
          { label: '🪱 ユスリカ幼虫の頭部から「だ腺」を取り出す', visual: '🔬', bg: 'rgba(186,230,253,0.45)', text: 'DNA複製を1000回ほど繰り返して分裂しない「多糸染色体（巨大染色体）」がある！' },
          { label: '🔴 酢酸カーミン等で染色して観察', visual: '🧬🔴', bg: 'rgba(244,114,182,0.5)', text: '横縞（バンド）と、ほどけて膨らんだ「パフ」が見える！パフでは盛んに「mRNAの転写」が行われている！' }
        ]
      },
      equipmentIds: ['microscope'],
      youtubeQuery: '高校生物 だ腺染色体 パフ ユスリカ 観察',
      points: [
        'だ腺染色体は核分裂を伴わずDNA複製だけを繰り返したため、通常の約100倍太く光学顕微鏡でも見やすい！',
        '膨らんだ部分「パフ」は、特定の遺伝子が活性化して「転写（mRNA合成）」している場所！'
      ],
      steps: [
        { icon: '🪱', title: 'ステップ1：だ腺の摘出', desc: '幼虫の頭と胴の間から透明な一対のだ腺を取り出します。' },
        { icon: '🧬', title: 'ステップ2：パフの観察', desc: '染色体がほどけて膨らんだパフは、盛んに転写中の証拠です。' }
      ]
    },
    {
      id: 'bio_electrophoresis',
      name: 'DNAの<ruby>電<rt>でん</rt>気<rt>き</rt>泳<rt>えい</rt>動<rt>どう</rt></ruby>とPCR法',
      summary: '制限酵素で切断したDNAをゲルの中で電気的に移動させ、長さごとに分離・比較する実験。',
      playable: true,
      simType: 'step_lab',
      simConfig: {
        guide: '負（－）に帯電したDNAに電圧をかけて、長さごとに分かれる様子を見よう！',
        stages: [
          { label: '🧬 ゲルの穴（ウェル）にDNAを入れる', visual: '🧫', bg: 'rgba(226,232,240,0.45)', text: 'DNAはリン酸基により「負（－）の電荷」を帯びています。' },
          { label: '⚡ 電源ON（－極から＋極へ向けて移動！）', visual: '⚡📊', bg: 'rgba(56,189,248,0.45)', text: '短いDNA断片ほどゲルの網目をすり抜けやすく「速く遠く（＋極側）まで移動」し、バンドに分かれた！' }
        ]
      },
      equipmentIds: ['electrophoresis_box', 'power_supply'],
      youtubeQuery: '高校生物 DNA 電気泳動 PCR 実験',
      points: [
        'DNAはリン酸基のため負（－）に帯電 → 必ず「＋極側」へ移動する！',
        '短いDNA断片ほど速く遠くへ移動し、長い断片は手前に残る！'
      ],
      steps: [
        { icon: '🧫', title: 'ステップ1：サンプル注入', desc: 'アガロースゲルのくぼみにDNA断片を入れます。' },
        { icon: '⚡', title: 'ステップ2：サイズ分離', desc: '＋極側へ移動させ、紫外線等でバンドの位置を確認します。' }
      ]
    },
    {
      id: 'bio_gfp',
      name: '大腸菌の<ruby>形<rt>けい</rt>質<rt>しつ</rt>転<rt>てん</rt>換<rt>かん</rt></ruby>（GFP）',
      summary: 'オワンクラゲの緑色蛍光タンパク質（GFP）遺伝子を含むプラスミドを大腸菌に取り込ませる実験。',
      playable: true,
      simType: 'step_lab',
      simConfig: {
        guide: 'プラスミド導入から抗生物質（アンピシリン）培地での選別までを体験しよう！',
        stages: [
          { label: '🦠 CaCl2処理＋ヒートショック（42℃）で導入', visual: '🧪', bg: 'rgba(186,230,253,0.45)', text: '一時的に細胞膜に隙間ができ、GFP＆アンピシリン耐性遺伝子をもつプラスミドが入った！' },
          { label: '🧫 アンピシリン入り培地で培養→紫外線照射！', visual: '🟢✨', bg: 'rgba(34,197,94,0.65)', text: '形質転換した大腸菌だけが生き残り、UVを当てると緑色にピカッと光った！' }
        ]
      },
      equipmentIds: ['pipette', 'water_bath'],
      youtubeQuery: '高校生物 大腸菌 形質転換 GFP 実験',
      points: [
        '選択マーカー（アンピシリン耐性遺伝子）を使うことで、プラスミドを取り込んだ菌だけを選別できる！',
        'アラビノースなどの誘導物質があるとプロモーターが働き GFP が発現する。'
      ],
      steps: [
        { icon: '🧪', title: 'ステップ1：ヒートショック', desc: '氷冷と42℃加熱でプラスミドを菌体内に入れます。' },
        { icon: '🟢', title: 'ステップ2：選択培地で発光', desc: '生き残ったコロニーにUVを当てると緑色に光ります！' }
      ]
    }
  );

  bio.units.push({
    id: 'bio_body',
    name: '<ruby>発<rt>はっ</rt>生<rt>せい</rt></ruby>・<ruby>体<rt>たい</rt>内<rt>ない</rt>環<rt>かん</rt>境<rt>きょう</rt></ruby>・<ruby>生<rt>せい</rt>態<rt>たい</rt></ruby>',
    experiments: [
      {
        id: 'bio_seaurchin',
        name: 'ウニの<ruby>受<rt>じゅ</rt>精<rt>せい</rt></ruby>と<ruby>初<rt>しょ</rt>期<rt>き</rt>発<rt>はっ</rt>生<rt>せい</rt></ruby>',
        summary: 'ウニの卵に精子を加えて受精膜が上がる瞬間から、卵割・胞胚・原腸胚までの発生を観察する実験。',
        playable: true,
        simType: 'step_lab',
        simConfig: {
          guide: '受精から原腸胚までの劇的な変化を順番に観察しよう！',
          stages: [
            { label: '🥚 卵に精子を加える（受精膜の形成）', visual: '⭕✨', bg: 'rgba(254,240,138,0.45)', text: '1匹の精子が侵入した瞬間、卵の表面に「受精膜」が上がり他の精子の侵入（多精）をブロック！' },
            { label: '➗ 卵割（2細胞→4細胞→桑実胚→胞胚）', visual: '🫧', bg: 'rgba(186,230,253,0.45)', text: '細胞は成長せず分割だけが進むため、1個あたりの細胞はどんどん小さくなる（等割）！' },
            { label: '🌀 胞胚→原腸胚（陥入・原口の形成）', visual: '🟢', bg: 'rgba(74,222,128,0.5)', text: '植物極側が内側に陥入して原腸ができ、ウニの場合は「原口」が将来の肛門になる！' }
          ]
        },
        equipmentIds: ['microscope', 'pipette'],
        youtubeQuery: '高校生物 ウニ 受精 発生 観察',
        points: [
          'ウニの卵割は「等割」（カエルは動物極側が小さく割れる「不等割」）。',
          '受精膜の形成は「多精拒否」の仕組み！'
        ],
        steps: [
          { icon: '⭕', title: 'ステップ1：受精膜の形成', desc: '先体反応・表層反応により受精膜が持ち上がります。' },
          { icon: '🌀', title: 'ステップ2：卵割と原腸陥入', desc: '桑実胚・胞胚を経て、原腸が陥入していきます。' }
        ]
      },
      {
        id: 'bio_blood',
        name: '<ruby>血<rt>けっ</rt>液<rt>えき</rt></ruby>の観察・<ruby>凝<rt>ぎょう</rt>固<rt>こ</rt></ruby>とABO判定',
        summary: '血液凝固の仕組み（フィブリン網・Ca2+の必要性）と、抗A・抗B血清によるABO式血液型判定を学ぶ実験。',
        playable: true,
        simType: 'step_lab',
        simConfig: {
          guide: '血液凝固の条件と、ABO式血液型（凝集反応）の判定ルールを体験しよう！',
          stages: [
            { label: '🩸 血液にシュウ酸ナトリウム（Ca2+除去）を加える', visual: '💧', bg: 'rgba(239,68,68,0.45)', text: 'Ca2+ が奪われるとプロトロンビン→トロンビンになれず、血液が固まらない！' },
            { label: '🕸️ Ca2+ ありで放置（フィブリン形成）', visual: '🕸️', bg: 'rgba(185,28,28,0.65)', text: '繊維状の「フィブリン」が網を作り、赤血球を絡め取って血ぺい（血餅）が完成！' },
            { label: '🔬 抗A血清だけで凝集（抗Bでは凝集せず）', visual: '🅰️', bg: 'rgba(250,204,21,0.45)', text: '赤血球表面に凝集原Aだけがある＝「A型」と判定！（両方凝集＝AB型、両方なし＝O型）' }
          ]
        },
        equipmentIds: ['microscope', 'pipette'],
        youtubeQuery: '高校生物 血液凝固 ABO式血液型 実験',
        points: [
          '血液凝固は「フィブリノーゲン → フィブリン」の酵素反応で、Ca2+ が必須！',
          '「凝固（血餅＋血清）」と「凝集（抗原抗体反応による赤血球の塊）」を混同しないよう注意！'
        ],
        steps: [
          { icon: '🕸️', title: 'ステップ1：血液凝固', desc: 'トロンビンの働きでフィブリン網が形成されます。' },
          { icon: '🅰️', title: 'ステップ2：ABO血液型判定', desc: '抗A血清・抗B血清との凝集の有無で判定します。' }
        ]
      },
      {
        id: 'bio_blindspot',
        name: '<ruby>盲<rt>もう</rt>斑<rt>はん</rt></ruby>（マリオット盲点）の実験',
        summary: '片目で十字を見つめながら黒丸を動かすと、視神経が集まる盲斑に像が映って急に消える現象を確かめる実験。',
        playable: true,
        simType: 'step_lab',
        simConfig: {
          guide: '右目・左目の網膜における「盲斑」の仕組みを体験しよう！',
          stages: [
            { label: '👁️ 左目を閉じて右目で「＋」を見つめ、右の「●」を遠ざける', visual: '➕　　　⚫', bg: 'rgba(186,230,253,0.45)', text: 'ある距離になると突然「●」が消えた！網膜の「盲斑（視細胞がない場所）」に像が結ばれたため！' },
            { label: '🧠 なぜ普段は穴が空いて見えないの？', visual: '🧠✨', bg: 'rgba(134,239,172,0.5)', text: 'もう片方の目が補い、脳が周囲の色や模様で自然に補完しているからです！' }
          ]
        },
        equipmentIds: ['stopwatch'],
        youtubeQuery: '高校生物 盲斑 マリオット盲点 実験',
        points: [
          '盲斑（視神経乳頭）は視神経が束になって眼球から出ていく部分で、錐体細胞も桿体細胞も存在しない！',
          '中心部（黄斑）には色を見分ける「錐体細胞」が多く集中している。'
        ],
        steps: [
          { icon: '👁️', title: 'ステップ1：像が消える距離', desc: '盲斑に像が重なると視覚情報が送られなくなります。' },
          { icon: '🧠', title: 'ステップ2：脳の補完', desc: '盲斑の位置は周囲と同じ背景として脳が補っています。' }
        ]
      },
      {
        id: 'bio_quadrat',
        name: 'コドラート法による<ruby>植<rt>しょく</rt>生<rt>せい</rt></ruby>調査',
        summary: '1m四方などの枠（コドラート）を地面に置き、被度や頻度からその地域の優占種を調べる生態調査。',
        playable: true,
        simType: 'step_lab',
        simConfig: {
          guide: 'コドラート（方形枠）を設置して植物の被度・頻度を記録する流れを体験しよう！',
          stages: [
            { label: '🔲 調査地に 1m×1m のコドラートを設置する', visual: '🔲🌿', bg: 'rgba(74,222,128,0.4)', text: '均一な植生エリアを選び、ランダムまたは一定間隔で枠を複数配置します。' },
            { label: '📊 優占度（被度・頻度）を計算する', visual: '📈', bg: 'rgba(186,230,253,0.45)', text: '最も広い面積を占め（被度大）、どの枠にもよく出る（頻度大）種が「優占種」に決定！' }
          ]
        },
        equipmentIds: ['stopwatch'],
        youtubeQuery: '高校生物 コドラート法 植生調査',
        points: [
          '最小面積：枠を少しずつ広げても出現種数がほぼ増えなくなる面積。',
          '優占種はその群集の環境や構造を最も強く支配している植物種！'
        ],
        steps: [
          { icon: '🔲', title: 'ステップ1：枠の配置', desc: '方形枠を置いて中の植物種と面積を記録します。' },
          { icon: '📊', title: 'ステップ2：優占種の決定', desc: '被度や頻度をもとに優占種を特定します。' }
        ]
      }
    ]
  });

  // =====================================
  // 物理：追加11実験
  // =====================================
  const physMech = phys.units.find((u) => u.id === 'phys_mech');
  physMech.experiments.push(
    {
      id: 'phys_monkey',
      name: 'モンキーハンティング（<ruby>放<rt>ほう</rt>物<rt>ぶつ</rt>運<rt>うん</rt>動<rt>どう</rt></ruby>）',
      summary: '銃口をサルに向けたまま弾を撃つと同時にサルが木から落ちても、必ず空中で命中することを確かめる実験。',
      playable: true,
      simType: 'step_lab',
      simConfig: {
        guide: '「等速直線運動＋自由落下」の合成と、サルの自由落下の関係を検証しよう！',
        stages: [
          { label: '🎯 発射と同時にサルが落下開始（初速どんな速さでもOK！）', visual: '🐒💨', bg: 'rgba(186,230,253,0.45)', text: '弾もサルも同じ重力加速度 g で下向きに落下するため、同じ時刻には同じ距離 1/2 gt² だけ下に落ちる！' },
          { label: '💥 必ず空中で命中！！', visual: '🎯✨', bg: 'rgba(74,222,128,0.55)', text: 'つまり「重力がなかった場合の直線軌道」から、弾もサルも常に同じだけ下にズレるため必ず当たる！' }
        ]
      },
      equipmentIds: ['stopwatch'],
      youtubeQuery: '高校物理 モンキーハンティング 実験',
      points: [
        '水平方向は「等速直線運動」、鉛直方向は弾もサルも共通の加速度 g の運動！',
        '弾の初速が速いほど「高い位置」で命中し、遅いほど「低い位置」で命中する（地面に落ちる前なら必ず当たる！）。'
      ],
      steps: [
        { icon: '🎯', title: 'ステップ1：同時スタート', desc: '弾の発射と同時にサルが自由落下を始めます。' },
        { icon: '💥', title: 'ステップ2：同一鉛直落下', desc: '1/2 gt² の落下分が完全に一致するため必ず命中します。' }
      ]
    },
    {
      id: 'phys_friction',
      name: '<ruby>静<rt>せい</rt>止<rt>し</rt>摩<rt>ま</rt>擦<rt>さつ</rt>角<rt>かく</rt></ruby>と摩擦係数の測定',
      summary: '板の上に物体を置いて徐々に傾け、滑り始める瞬間の角度 θ から静止摩擦係数 μ = tanθ を求める実験。',
      playable: true,
      simType: 'slider_lab',
      simConfig: {
        guide: '板の角度 θ を上げて、物体がちょうど滑り出す「静止摩擦角（例：31°付近）」を見つけよう！',
        label: '板の傾き θ（度）',
        min: 0,
        max: 45,
        initial: 10,
        unit: '°',
        targetCheck: (v) => v >= 31,
        describe: (v) => {
          const tanVal = Math.tan((v * Math.PI) / 180).toFixed(2);
          if (v < 31) return { bg: 'rgba(186,230,253,0.45)', icon: '📦', status: `まだ止まっている（静止摩擦力 ＝ mg sinθ、tanθ = ${tanVal}）` };
          if (v === 31) return { bg: 'rgba(250,204,21,0.55)', icon: '📦⚡', status: `【ちょうど滑り出す瞬間！】静止摩擦角 θ0 = 31° → 静止摩擦係数 μ = tan31° ≈ ${tanVal}！` };
          return { bg: 'rgba(239,68,68,0.4)', icon: '📦💨', status: `滑り落ちた！（今は動摩擦力 μ'mg cosθ が働いている）` };
        }
      },
      equipmentIds: ['stopwatch'],
      youtubeQuery: '高校物理 静止摩擦角 摩擦係数 実験',
      points: [
        '滑り始める瞬間のつり合い：mg sinθ0 = μ・mg cosθ0 → 質量 m や重力 g に関係なく μ = tanθ0！',
        '一般に 静止摩擦係数 μ ＞ 動摩擦係数 μ\'！'
      ],
      steps: [
        { icon: '📐', title: 'ステップ1：板を傾ける', desc: '角度を増やすと下向きの重力成分 mg sinθ が大きくなります。' },
        { icon: '📦', title: 'ステップ2：μ = tanθ0', desc: '滑り出す瞬間の角度の正接がそのまま静止摩擦係数になります。' }
      ]
    },
    {
      id: 'phys_spring',
      name: 'フックの法則と<ruby>ば<rt>ば</rt>ね<rt>ね</rt>振<rt>ふ</rt>り子<rt>こ</rt></ruby>の周期',
      summary: 'ばねにおもりをつるして伸びからばね定数 k を求め、振動周期 T = 2π√(m/k) を確かめる実験。',
      playable: true,
      simType: 'slider_lab',
      simConfig: {
        guide: 'おもりの質量 m（kg）を変えて、ばね振り子の周期 T がどう変化するか確かめよう！',
        label: 'おもりの質量 m（kg）',
        min: 0.1,
        max: 1.0,
        initial: 0.2,
        unit: 'kg',
        targetCheck: (v) => v >= 0.8,
        describe: (v) => {
          const k = 10; // 10 N/m
          const T = (2 * Math.PI * Math.sqrt(v / k)).toFixed(2);
          return {
            bg: 'rgba(134,239,172,0.45)',
            icon: '🌀',
            status: `ばね定数 k=10 N/m のとき、周期 T = ${T} 秒！（単振り子と違い、質量 m に依存し重力 g には無関係！）`
          };
        }
      },
      equipmentIds: ['stopwatch'],
      youtubeQuery: '高校物理 ばね振り子 周期 フックの法則 実験',
      points: [
        'ばね振り子の周期 T = 2π√(m / k)：おもりが重いほど周期は長く、ばねが硬い(k大)ほど短い！',
        '重力加速度 g に依存しないため、月面やエレベーター内でも周期は同じ！'
      ],
      steps: [
        { icon: '📏', title: 'ステップ1：k を求める', desc: 'F = kx（フックの法則）からばね定数 k を測定します。' },
        { icon: '🌀', title: 'ステップ2：単振動の周期', desc: '縦に揺らして10往復の時間を測り、2π√(m/k) と一致することを確かめます。' }
      ]
    }
  );

  phys.units.push({
    id: 'phys_thermo',
    name: '<ruby>熱<rt>ねつ</rt>力<rt>りき</rt>学<rt>がく</rt></ruby>（比熱・気体の法則）',
    experiments: [
      {
        id: 'phys_heat_cap',
        name: '<ruby>水<rt>みず</rt>熱<rt>ねつ</rt>量<rt>りょう</rt>計<rt>けい</rt></ruby>による金属の<ruby>比<rt>ひ</rt>熱<rt>ねつ</rt></ruby>測定',
        summary: '熱湯で100℃に熱した金属球を冷たい水に入れ、熱平衡後の温度から金属の比熱を求める実験。',
        playable: true,
        simType: 'step_lab',
        simConfig: {
          guide: '熱量保存の法則（高温物体が失った熱 ＝ 低温物体が得た熱）を体験しよう！',
          stages: [
            { label: '♨️ 金属球（100g）を沸騰水で 100℃ に温める', visual: '🔴♨️', bg: 'rgba(239,68,68,0.45)', text: '金属球の温度は 100℃ になりました。' },
            { label: '🥤 水熱量計（20℃の水100g）へ素早く投入！', visual: '🌡️✨', bg: 'rgba(56,189,248,0.45)', text: '全体の温度が 27.3℃ で一定（熱平衡）になった！計算すると比熱 c ≈ 0.45 J/(g・K) → 鉄と判明！' }
          ]
        },
        equipmentIds: ['calorimeter', 'water_bath'],
        youtubeQuery: '高校物理 比熱の測定 水熱量計 実験',
        points: [
          '熱量保存則：m金・c金・(100 - t) ＝ (m水・c水 ＋ C容器)・(t - 20)',
          '容器の「熱容量 C」を忘れないことが入試計算の最大ポイント！'
        ],
        steps: [
          { icon: '🔴', title: 'ステップ1：金属を加熱', desc: '100℃の熱湯中で金属球の温度を均一にします。' },
          { icon: '🌡️', title: 'ステップ2：熱平衡温度の測定', desc: '冷水に投入し、かき混ぜて最高温度（熱平衡）を読み取ります。' }
        ]
      },
      {
        id: 'phys_boyle',
        name: 'ボイル・シャルルの<ruby>法<rt>ほう</rt>則<rt>そく</rt></ruby>',
        summary: '気体を閉じ込めた注射器のピストンを押し引きして、体積 V と圧力 P の反比例（PV=一定）を確かめる実験。',
        playable: true,
        simType: 'slider_lab',
        simConfig: {
          guide: '温度一定のまま注射器の体積 V（mL）を半分（20mL → 10mL）にして、圧力 P が2倍になるか確かめよう！',
          label: '注射器内の体積 V（mL）',
          min: 10,
          max: 40,
          initial: 20,
          unit: 'mL',
          targetCheck: (v) => v <= 10,
          describe: (v) => {
            const p = (2000 / v).toFixed(0);
            return {
              bg: 'rgba(56,189,248,0.45)',
              icon: '💉',
              status: `圧力 P = ${p} hPa（PV = 20000 一定！体積を半分にすると圧力はちょうど2倍になる＝ボイルの法則）`
            };
          }
        },
        equipmentIds: ['syringe_gauge'],
        youtubeQuery: '高校物理 ボイルの法則 注射器 実験',
        points: [
          'ボイル・シャルルの法則：PV / T ＝ 一定（温度 T は必ず絶対温度 [K] ＝ ℃ + 273 を使う！）',
          'グラフで P - V は反比例の双曲線、P - 1/V は原点を通る直線になる！'
        ],
        steps: [
          { icon: '💉', title: 'ステップ1：体積を変える', desc: 'ゆっくり押して温度が上がらないようにしながら体積を変えます。' },
          { icon: '📊', title: 'ステップ2：PV = 一定', desc: '圧力計の値と体積の積が常に一定になることを確認します。' }
        ]
      }
    ]
  });

  const physWave = phys.units.find((u) => u.id === 'phys_wave');
  physWave.experiments.push(
    {
      id: 'phys_melde',
      name: '弦の<ruby>定<rt>てい</rt>常<rt>じょう</rt>波<rt>は</rt></ruby>（メルデの実験）',
      summary: 'おんさにつないだ糸に張力をかけて振動させ、腹の数（1個・2個・3個…）と張力の関係を調べる実験。',
      playable: true,
      simType: 'slider_lab',
      simConfig: {
        guide: '糸を引くおもり（張力 S）を調整して、綺麗な定常波の腹（1〜3個）を作ってみよう！',
        label: '糸の張力 S（N）',
        min: 1,
        max: 9,
        initial: 4,
        unit: 'N',
        targetCheck: (v) => v === 1 || v === 9,
        describe: (v) => {
          if (v === 9) return { bg: 'rgba(74,222,128,0.5)', icon: '〰️', status: '【基本振動：腹 1個】張力が強く波の速さ v=√(S/ρ) が最大！' };
          if (v === 4) return { bg: 'rgba(56,189,248,0.5)', icon: '〰️〰️', status: '【2倍振動：腹 2個】張力を 1/4（4N）にすると波長が半分になり腹が2個に！' };
          if (v === 1) return { bg: 'rgba(250,204,21,0.5)', icon: '〰️〰️〰️', status: '【3倍振動：腹 3個】張力を 1/9（1N）にすると腹が3個になった！' };
          return { bg: 'rgba(203,213,225,0.4)', icon: '〰️❌', status: '共振条件からズレて定常波が乱れている（1N・4N・9Nに合わせてみよう！）' };
        }
      },
      equipmentIds: ['tuning_fork'],
      youtubeQuery: '高校物理 メルデの実験 弦の定常波',
      points: [
        '弦を伝わる波の速さ：v = √(S / ρ)（張力 S の平方根に比例、線密度 ρ に反比例）！',
        '固有振動数 fn = n / (2l) × √(S / ρ)'
      ],
      steps: [
        { icon: '〰️', title: 'ステップ1：張力を変える', desc: 'おもりの数を変えて張力 S を調整します。' },
        { icon: '✨', title: 'ステップ2：定常波の成立', desc: '両端が節となる美しい定常波が現れます。' }
      ]
    },
    {
      id: 'phys_beats',
      name: 'うなりの観察（2つのおんさ）',
      summary: '振動数がわずかに違う2つのおんさを同時に鳴らし、「ウォン、ウォン」と周期的に強弱するうなりを聴く実験。',
      playable: true,
      simType: 'slider_lab',
      simConfig: {
        guide: 'おんさBの振動数（f1=440Hz に対して）を変えて、1秒間のうなりの回数 f = |f1 - f2| を確かめよう！',
        label: 'おんさBの振動数 f2（Hz）',
        min: 435,
        max: 446,
        initial: 442,
        unit: 'Hz',
        targetCheck: (v) => v === 440,
        describe: (v) => {
          const beats = Math.abs(440 - v);
          if (beats === 0) return { bg: 'rgba(74,222,128,0.5)', icon: '🔔✨', status: '【共鳴・うなり 0回！】f1 = f2 = 440Hz で完全に同じ音になった！（チューニング完了）' };
          return { bg: 'rgba(250,204,21,0.45)', icon: '〰️🔊', status: `1秒間に ${beats} 回のうなり（|440 - ${v}| = ${beats} Hz）！周期は ${(1 / beats).toFixed(2)} 秒！` };
        }
      },
      equipmentIds: ['tuning_fork'],
      youtubeQuery: '高校物理 うなり おんさ 実験',
      points: [
        '1秒間のうなりの回数：f = |f1 - f2|',
        'うなりを聴きながら楽器の調律（チューニング）を行うのはこの原理！'
      ],
      steps: [
        { icon: '🔔', title: 'ステップ1：2つを同時に鳴らす', desc: 'わずかに振動数が違うと音が周期的に大きくなったり小さくなったりします。' },
        { icon: '⚖️', title: 'ステップ2：振動数を一致させる', desc: 'うなりが消えたとき、2つの振動数は完全に等しくなります。' }
      ]
    },
    {
      id: 'phys_refraction',
      name: '光の<ruby>屈<rt>くっ</rt>折<rt>せつ</rt></ruby>と<ruby>全<rt>ぜん</rt>反<rt>はん</rt>射<rt>しゃ</rt></ruby>',
      summary: '半円形ガラスの中から空気中へ光を出したとき、入射角を大きくするとある角度で全反射する現象を調べる実験。',
      playable: true,
      simType: 'slider_lab',
      simConfig: {
        guide: 'ガラス（屈折率 n=1.5）から空気へ光を出す入射角 θ を上げて、「全反射（臨界角約42°）」を起こそう！',
        label: 'ガラス内からの入射角 θ（度）',
        min: 0,
        max: 70,
        initial: 20,
        unit: '°',
        targetCheck: (v) => v >= 42,
        describe: (v) => {
          if (v < 42) return { bg: 'rgba(186,230,253,0.45)', icon: '🔦↗️', status: '屈折光が空気中へ出ている！（一部は反射光）' };
          if (v === 42) return { bg: 'rgba(250,204,21,0.5)', icon: '🔦➡️', status: '【臨界角！】屈折角がちょうど 90° になり境界面スレスレを進む！' };
          return { bg: 'rgba(168,85,247,0.5)', icon: '🔦🪞', status: '【全反射発生！！】光は一切外へ出ず 100% 反射する！（光ファイバーの原理！）' };
        }
      },
      equipmentIds: ['convex_lens'],
      youtubeQuery: '高校物理 全反射 臨界角 半円形ガラス 実験',
      points: [
        '全反射は必ず「屈折率が大きい媒質（ガラス・水）→ 小さい媒質（空気）」へ進むときにしか起きない！',
        '臨界角 θc の条件：n sinθc = 1 × sin90° → sinθc = 1 / n'
      ],
      steps: [
        { icon: '🔦', title: 'ステップ1：入射角を増やす', desc: '空気側へ折れ曲がる屈折角がどんどん大きくなります。' },
        { icon: '🪞', title: 'ステップ2：臨界角を超えて全反射', desc: '屈折角が90°を超えるとすべて境界面で反射します。' }
      ]
    }
  );

  const physEm = phys.units.find((u) => u.id === 'phys_em');
  physEm.experiments.push(
    {
      id: 'phys_ohm_bulb',
      name: '豆電球の<ruby>非<rt>ひ</rt></ruby>オーム<ruby>抵<rt>てい</rt>抗<rt>こう</rt></ruby>特性',
      summary: '豆電球にかける電圧を上げていき、フィラメントの温度上昇により抵抗値が変化する（I-Vグラフが曲がる）実験。',
      playable: true,
      simType: 'slider_lab',
      simConfig: {
        guide: '電圧 V を上げて、電流 I の増え方（抵抗 R = V/I の変化）を確かめよう！',
        label: '電圧 V（V）',
        min: 0,
        max: 6,
        initial: 1,
        unit: 'V',
        targetCheck: (v) => v >= 5,
        describe: (v) => {
          if (v === 0) return { bg: 'rgba(30,41,59,0.5)', icon: '🌑', status: '電流 0 A（消灯）' };
          const i = (Math.sqrt(v) * 0.15).toFixed(2);
          const r = (v / i).toFixed(1);
          return {
            bg: v >= 4 ? 'rgba(250,204,21,0.55)' : 'rgba(251,191,36,0.35)',
            icon: v >= 4 ? '💡✨' : '💡',
            status: `電流 I ≈ ${i} A → 抵抗 R = ${r} Ω（温度が上がり金属の抵抗が大きくなっている！）`
          };
        }
      },
      equipmentIds: ['power_supply', 'galvanometer'],
      youtubeQuery: '高校物理 非オーム抵抗 豆電球 I-V特性',
      points: [
        '金属は温度が上昇すると原子の熱振動が激しくなり、自由電子が邪魔されて「抵抗が大きくなる」！',
        'そのため I-V グラフは直線にならず、上向きに寝てくる曲線になる。'
      ],
      steps: [
        { icon: '💡', title: 'ステップ1：電圧を上げる', desc: '電圧を上げるとフィラメントが赤熱し温度が急上昇します。' },
        { icon: '📈', title: 'ステップ2：抵抗の増大', desc: 'I-V曲線の傾きが小さくなり、抵抗値が大きくなったとわかります。' }
      ]
    },
    {
      id: 'phys_fleming',
      name: '電流が<ruby>磁<rt>じ</rt>場<rt>ば</rt></ruby>から受ける力（フレミングの左手）',
      summary: 'U字磁石の間に吊るしたアルミ棒（ブランコ）に電流を流し、力の向きを確かめる実験。',
      playable: true,
      simType: 'step_lab',
      simConfig: {
        guide: '電流の向きや磁石の極（N・S）を逆にして、ブランコの動く向きを確かめよう！',
        stages: [
          { label: '⚡ 電流を奥→手前、磁場を下→上にセット', visual: '➡️🧲', bg: 'rgba(56,189,248,0.45)', text: 'フレミング左手の法則（中指：電流、人差し指：磁場、親指：力）により、ブランコが右へ大きく振れた！' },
          { label: '🔄 電流の向きだけを逆にする', visual: '⬅️🧲', bg: 'rgba(250,204,21,0.45)', text: '力の向きも逆になり、今度は左へ振れた！（F = I B l）' }
        ]
      },
      equipmentIds: ['power_supply'],
      youtubeQuery: '高校物理 フレミング左手の法則 ブランコ 実験',
      points: [
        '力の大きさ：F = I B l（磁場と電流が垂直なとき最大、平行なときは 0）！',
        '電磁誘導（発電）の「向き」は右手、電流が受ける「力」は左手（FBI）！'
      ],
      steps: [
        { icon: '🖐️', title: 'ステップ1：左手で向きを確認', desc: '中指(電)・人差し指(磁)・親指(力)を互いに垂直にします。' },
        { icon: '🔄', title: 'ステップ2：電流・磁場の反転', desc: 'どちらか一方を逆にすると、力の向きも逆転します。' }
      ]
    }
  );

  const physAtom = phys.units.find((u) => u.id === 'phys_atom');
  physAtom.experiments.push({
    id: 'phys_cloud_chamber',
    name: '<ruby>霧<rt>きり</rt>箱<rt>ばこ</rt></ruby>による<ruby>放<rt>ほう</rt>射<rt>しゃ</rt>線<rt>せん</rt></ruby>の飛跡観察',
    summary: 'エタノール過飽和蒸気の中を通過する放射線の通り道に白い霧の筋（飛行機雲のような飛跡）を見る実験。',
    playable: true,
    simType: 'step_lab',
    simConfig: {
      guide: 'ドライアイスで冷やした霧箱の中に線源を入れて、α線・β線・γ線の飛跡の違いを見比べよう！',
      stages: [
        { label: '🔴 α線（ヘリウム原子核 He^2+）の飛跡を見る', visual: '➖✨', bg: 'rgba(239,68,68,0.4)', text: '太くてまっすぐで短い飛跡！電離作用が非常に強く、空気中で数cm進むとすぐ止まる！' },
        { label: '🔵 β線（高速の電子 e-）の飛跡を見る', visual: '〰️✨', bg: 'rgba(56,189,248,0.4)', text: '細くて長く、空気分子に弾かれてジグザグに曲がった飛跡！' },
        { label: '🟣 γ線（電磁波）の特徴を見る', visual: '⚡', bg: 'rgba(168,85,247,0.4)', text: '電離作用が弱く直接の飛跡はほぼ見えないが、透過力が極めて強い！' }
      ]
    },
    equipmentIds: ['cloud_chamber'],
    youtubeQuery: '高校物理 霧箱 放射線 飛跡 実験',
    points: [
      '電離作用の強さ：α線 ＞ β線 ＞ γ線 ／ 透過力の強さ：γ線 ＞ β線 ＞ α線（ちょうど逆！）',
      'α線は紙1枚で止まり、β線は薄い金属板、γ線は厚い鉛やコンクリートが必要。'
    ],
    steps: [
      { icon: '🧊', title: 'ステップ1：過飽和状態を作る', desc: '箱の底をドライアイスで冷やし、エタノール蒸気を過飽和にします。' },
      { icon: '✨', title: 'ステップ2：飛跡の比較', desc: '太く短いα線と、細く曲がったβ線の飛跡を観察します。' }
    ]
  });

  // =====================================
  // 追加器具（6種）
  // =====================================
  EQUIPMENT_MASTER.push(
    { id: 'volumetric_flask', name: 'メスフラスコ', ruby: 'メスフラスコ', icon: '🏺', short: '正確な体積・濃度の溶液を調製する首の長いフラスコ', detail: '中に純水が残っていてもOKですが、正確な体積が変わるため加熱乾燥や共洗いは厳禁です。' },
    { id: 'separatory_funnel', name: '分液漏斗', ruby: '<ruby>分<rt>ぶん</rt>液<rt>えき</rt><rt>漏<rt>ろう</rt>斗<rt>と</rt></ruby>', icon: '🧪', short: '混ざらない2層の液体をコックで分離する器具', detail: '振るときはガス圧を抜くため、必ずコックを上に向けてガス抜きをします。' },
    { id: 'calorimeter', name: '簡易熱量計', ruby: '<ruby>簡<rt>かん</rt>易<rt>い</rt><rt>熱<rt>ねつ</rt>量<rt>りょう</rt>計<rt>けい</rt></ruby>', icon: '🥤', short: '発泡スチロール等で熱の出入りを防ぎ温度を測る容器', detail: '中和熱や比熱の測定で、熱が外へ逃げないように断熱して使います。' },
    { id: 'electrophoresis_box', name: '電気泳動装置', ruby: '<ruby>電<rt>でん</rt>気<rt>き</rt><rt>泳<rt>えい</rt>動<rt>どう</rt></ruby>装置', icon: '🧫', short: 'ゲルに電圧をかけてDNAやタンパク質を分離する装置', detail: '負に帯電したDNAを＋極側へ移動させ、分子量の違いによって分離します。' },
    { id: 'syringe_gauge', name: '注射器と圧力計', ruby: '<ruby>注<rt>ちゅう</rt>射<rt>しゃ</rt>器<rt>き</rt></ruby>と圧力計', icon: '💉', short: '閉じ込めた気体の体積と圧力を同時に測るセット', detail: 'ピストンをゆっくり動かすことで、温度変化を防ぎながらボイルの法則を確かめられます。' },
    { id: 'cloud_chamber', name: '霧箱', ruby: '<ruby>霧<rt>きり</rt>箱<rt>ばこ</rt></ruby>', icon: '🧊', short: '過飽和蒸気で放射線の飛跡を可視化する装置', detail: '放射線が生み出したイオンを核にしてアルコール蒸気が凝結し、白い筋になって見えます。' }
  );

  // =====================================
  // 追加クイズ（36問）
  // =====================================
  QUIZ_MASTER.push(
    { id: 'q_sep', expId: 'chem_separation', question: '蒸留で使うリービッヒ冷却器の冷却水は、どちらから入れてどちらから出す？', options: ['上から入れて下から出す', '下から入れて上から出す', 'どちらでも同じ'], answer: 1, explanation: '下から入れて上から出すことで、冷却管の中を気泡なく水で満たすことができます！' },
    { id: 'q_mol', expId: 'chem_molarity', question: 'メスフラスコを使って溶液を調製するとき、絶対にしてはいけない操作は？', options: ['使用前に純水ですすぐ', '標線近くで駒込ピペットを使う', '加熱乾燥させる（または共洗いする）'], answer: 2, explanation: '加熱するとガラスが膨張・変形して正確な体積が狂うため加熱乾燥はNGです！' },
    { id: 'q_redox', expId: 'chem_redox_titration', question: '過マンガン酸カリウムによる酸化還元滴定で、酸性化に「塩酸」を使えない理由は？', options: ['Cl- が酸化されて有毒な塩素 Cl2 が発生するため', '色が変わらなくなるため', '沈殿ができてしまうため'], answer: 0, explanation: 'KMnO4 の強い酸化力で Cl- まで酸化されてしまい正確な滴定ができなくなります。必ず希硫酸を使います！' },
    { id: 'q_hneut', expId: 'chem_heat_neutral', question: '希塩酸と水酸化ナトリウム水溶液の中和熱（水1mol生成あたり）はおよそ何kJ？', options: ['約 12 kJ', '約 56.5 kJ', '約 286 kJ'], answer: 1, explanation: '強酸＋強塩基の中和熱は、種類によらず水 1mol あたり約 56.5 kJ です！' },
    { id: 'q_lead', expId: 'chem_lead_battery', question: '鉛蓄電池が「放電」すると、負極（Pb）と正極（PbO2）の質量はどう変化する？', options: ['どちらも減少する', 'どちらも増加する（PbSO4になる）', '負極だけ減少し正極は増加する'], answer: 1, explanation: '放電すると両極ともに SO4^2- と結びついて PbSO4 になるため、両方とも質量が増加します！' },
    { id: 'q_nacl', expId: 'chem_nacl_elec', question: 'NaCl水溶液を陽イオン交換膜法で電気分解したとき、高純度の NaOH が生成するのはどっちの極側？', options: ['陽極（＋）側', '陰極（－）側', '交換膜の真ん中'], answer: 1, explanation: '陰極でH2が発生してOH-が残り、そこへ陽極側からNa+が移動してくるため陰極室にNaOHができます！' },
    { id: 'q_rate', expId: 'chem_reaction_rate', question: '触媒を加えたとき、反応速度が速くなる正しい理由は？', options: ['反応熱 ΔH が大きくなるから', '活性化エネルギーが小さくなるから', '生成物のエネルギーが上がるから'], answer: 1, explanation: '触媒は別の反応経路を通ることで活性化エネルギーの壁を低くします（反応熱は不変）！' },
    { id: 'q_sys', expId: 'chem_systematic', question: '系統分離で、H2Sを通じたあとに「煮沸してから濃硝酸を加える」理由は？', options: ['H2Sを追い出し、Fe2+をFe3+に酸化するため', 'CuSを溶かすため', 'pHを14にするため'], answer: 0, explanation: '次のNH3水で確実に Fe(OH)3 の赤褐色沈殿として落とすため、H2S除去とFe2+→Fe3+の酸化を行います！' },
    { id: 'q_iron', expId: 'chem_iron_detect', question: 'Fe3+ 水溶液にチオシアン酸カリウム（KSCN）水溶液を加えたときの変化は？', options: ['濃青色沈殿ができる', '血赤色の溶液になる', '白色沈殿ができる'], answer: 1, explanation: 'Fe3+ の検出に使う KSCN は沈殿ではなく「血赤色の溶液」になります！' },
    { id: 'q_elem', expId: 'chem_elemental', question: '有機物の元素分析で、燃焼ガスを通す2つの吸収管の正しい順番は？', options: ['①ソーダ石灰管 → ②塩化カルシウム管', '①塩化カルシウム管 → ②ソーダ石灰管', '順番はどちらでもよい'], answer: 1, explanation: 'ソーダ石灰はCO2だけでなくH2Oも吸ってしまうため、必ず先に塩化カルシウム管でH2Oを吸収します！' },
    { id: 'q_alcox', expId: 'chem_alcohol_ox', question: '次のうち、二クロム酸カリウムなどで穏やかに酸化すると「ケトン」を生じるのはどれ？', options: ['第1級アルコール', '第2級アルコール', '第3級アルコール'], answer: 1, explanation: '第1級はアルデヒド→カルボン酸、第2級はケトン、第3級は酸化されません！' },
    { id: 'q_phen', expId: 'chem_phenol', question: 'フェノール性ヒドロキシ基（-OH）を検出するために使う、青〜赤紫色に呈色する試薬は？', options: ['塩化鉄(III)（FeCl3）水溶液', 'ヨウ素液', 'フェーリング液'], answer: 0, explanation: 'FeCl3 水溶液を加えると青紫色〜赤紫色に呈色します！' },
    { id: 'q_arom', expId: 'chem_aromatic_sep', question: '安息香酸・フェノール・アニリン・ニトロベンゼンの分離で、安息香酸だけを水層に移す試薬は？', options: ['希塩酸（HCl）', '炭酸水素ナトリウム（NaHCO3）水溶液', '水酸化ナトリウム（NaOH）水溶液'], answer: 1, explanation: 'NaHCO3 はカルボン酸（安息香酸）とは反応しますが、弱酸のフェノールとは反応しないため完璧に分けられます！' },
    { id: 'q_sugar', expId: 'chem_sugar', question: '次の二糖類のうち、フェーリング反応を示さない（還元性がない）ものはどれ？', options: ['マルトース（麦芽糖）', 'ラクトース（乳糖）', 'スクロース（ショ糖）'], answer: 2, explanation: 'スクロースは還元基どうしが結合しているため、二糖類で唯一還元性を持ちません！' },
    { id: 'q_soap', expId: 'chem_soap', question: 'セッケンの合成（けん化）において、反応液に「エタノール」を加える一番の目的は？', options: ['良い香りをつけるため', '水酸化ナトリウムと油脂を均一に混ぜるため', '塩析を起こすため'], answer: 1, explanation: '油と水が混ざりにくいので、両方に馴染むエタノールを加えて反応を速めます！' },
    { id: 'q_micro', expId: 'bio_micrometer', question: '顕微鏡の対物レンズを10倍から40倍に変えたとき、変化するのはどれ？', options: ['対物ミクロメーターの1目盛りの長さ（10μm）', '接眼ミクロメーターの1目盛りが表す長さ', '細胞そのものの実際の大きさ'], answer: 1, explanation: '対物1目盛りは常に10μmですが、接眼1目盛りが示す長さは倍率で変わるため必ず計算し直します！' },
    { id: 'q_stream', expId: 'bio_streaming', question: 'オオカナダモの細胞内で、葉緑体が一定の向きに動いて見える現象を何という？', options: ['原形質分離', '原形質流動', '能動輸送'], answer: 1, explanation: '細胞骨格（アクチンフィラメント）とミオシンの働きで細胞質が流れる「原形質流動」です！' },
    { id: 'q_amy', expId: 'bio_amylase', question: 'だ液（アミラーゼ）でデンプンを分解した液に「ベネジクト液」を加えて結果をみる際に必須の操作は？', options: ['氷水で冷やす', '加熱（軽く煮沸）する', '暗所に一晩置く'], answer: 1, explanation: 'ベネジクト液は加熱しないと赤褐色沈殿（Cu2O）を生じません！' },
    { id: 'q_saliv', expId: 'bio_salivary', question: 'ユスリカ幼虫のだ腺染色体に見られる、膨らんでほどけた部分「パフ」では何が盛んに行われている？', options: ['DNAの複製', 'mRNAの転写', '細胞分裂'], answer: 1, explanation: 'パフでは特定の遺伝子が活性化し、mRNAの転写が盛んに行われています！' },
    { id: 'q_elec_bio', expId: 'bio_electrophoresis', question: 'DNAの電気泳動を行うと、DNA断片はどちらの電極側へ移動する？', options: ['＋極側（短い断片ほど遠くへ移動）', '－極側（長い断片ほど遠くへ移動）', '移動しない'], answer: 0, explanation: 'DNAは負（－）の電荷を持つため＋極へ引かれ、短い断片ほどゲルの網目を速く通り抜けます！' },
    { id: 'q_gfp', expId: 'bio_gfp', question: '大腸菌の形質転換実験で、培地に「アンピシリン（抗生物質）」を入れておく理由は？', options: ['菌を早く増やすため', 'プラスミドを取り込んだ大腸菌だけを選別するため', '緑色に光らせるため'], answer: 1, explanation: 'アンピシリン耐性遺伝子を持つプラスミドが入った菌だけが生き残るようにするためです！' },
    { id: 'q_urchin', expId: 'bio_seaurchin', question: 'ウニの受精直後に卵の表面に「受精膜」が形成される最大の意義は？', options: ['栄養を蓄えるため', '複数の精子が侵入する（多精）のを防ぐため', '卵割を止めるため'], answer: 1, explanation: '1匹目の精子が侵入したあと他の精子が入れないようにする「多精拒否」の働きです！' },
    { id: 'q_blood', expId: 'bio_blood', question: '血液凝固反応において、血漿中のフィブリノーゲンが変化してできる網状の物質は？', options: ['トロンビン', 'フィブリン', 'ヘモグロビン'], answer: 1, explanation: '酵素トロンビンの働きでフィブリノーゲンが繊維状の「フィブリン」になり血球を絡め取ります！' },
    { id: 'q_blind', expId: 'bio_blindspot', question: '眼球の網膜にある「盲斑（もうはん）」に像が結ばれると見えない理由は？', options: ['レンズが曇っているから', '視神経が束になって出ていく部分で視細胞がないから', '錐体細胞が多すぎるから'], answer: 1, explanation: '視神経乳頭とも呼ばれ、錐体・桿体どちらの視細胞も存在しないため光を感じません！' },
    { id: 'q_quad', expId: 'bio_quadrat', question: 'コドラート法による植生調査で、その群集の中で最も優占度が高い種を何という？', options: ['先駆種', '優占種', '固有種'], answer: 1, explanation: '被度や頻度から算出される優占度が最も高い種を「優占種」と呼びます！' },
    { id: 'q_monk', expId: 'phys_monkey', question: 'モンキーハンティングで、弾の初速を「半分」にしたら（地面に落ちる前なら）どうなる？', options: ['サルの上を通り過ぎる', 'それでも必ず命中する（当たる高さは低くなる）', 'サルの下を通り過ぎる'], answer: 1, explanation: '同じ時刻における重力落下分 1/2 gt² が弾もサルも同じなので、当たる位置が低くなるだけで必ず命中します！' },
    { id: 'q_fric', expId: 'phys_friction', question: '傾きを上げていく板の上の物体が、角度 θ0 でちょうど滑り出した。静止摩擦係数 μ は？', options: ['sinθ0', 'cosθ0', 'tanθ0'], answer: 2, explanation: 'mg sinθ0 = μ mg cosθ0 より、μ = tanθ0 となります！' },
    { id: 'q_spri', expId: 'phys_spring', question: 'ばね振り子を地球上から月面（重力が1/6）へ持っていったとき、振動周期 T はどうなる？', options: ['√6 倍になる', '1/√6 倍になる', '変わらない'], answer: 2, explanation: 'ばね振り子の周期 T = 2π√(m/k) には重力加速度 g が含まれないため変化しません！' },
    { id: 'q_hcap', expId: 'phys_heat_cap', question: '水熱量計で金属の比熱を測定するとき、金属が失った熱量と等しくなるのは？', options: ['水が得た熱量だけ', '水が得た熱量 ＋ 熱量計容器が得た熱量', '金属の熱容量だけ'], answer: 1, explanation: '水だけでなく熱量計の容器自身も温まるため、容器の熱容量（CΔT）も必ず足します！' },
    { id: 'q_boyle', expId: 'phys_boyle', question: '温度一定のとき、注射器に閉じ込めた気体の体積を 1/3 にすると圧力は何倍になる？', options: ['1/3 倍', '3 倍', '9 倍'], answer: 1, explanation: 'ボイルの法則 PV = 一定 より、体積が 1/3 なら圧力は 3 倍になります！' },
    { id: 'q_melde', expId: 'phys_melde', question: 'メルデの実験で、おんさの振動数を変えずに弦の張力だけを「4倍」にすると、弦を伝わる波の速さは？', options: ['2 倍になる', '4 倍になる', '1/2 倍になる'], answer: 0, explanation: '速さ v = √(S/ρ) なので、張力 S を 4倍にすると速さは √4 = 2倍になります！' },
    { id: 'q_beats', expId: 'phys_beats', question: '440 Hz のおんさと 443 Hz のおんさを同時に鳴らすと、1秒間に何回のうなりが聞こえる？', options: ['1 回', '3 回', '6 回'], answer: 1, explanation: 'うなり回数 f = |f1 - f2| = |440 - 443| = 3 回/秒 です！' },
    { id: 'q_refr', expId: 'phys_refraction', question: '光が「空気中からガラス」へ斜めに入射するとき、全反射は起きる？', options: ['入射角が大きいと起きる', '絶対に起きない', '赤い光だけ起きる'], answer: 1, explanation: '全反射は必ず「屈折率が大きい媒質 → 小さい媒質」へ進むときにしか起きません！' },
    { id: 'q_bulb', expId: 'phys_ohm_bulb', question: '豆電球にかける電圧を上げてフィラメントが高温になると、電気抵抗値はどう変化する？', options: ['小さくなる', '大きくなる', 'ずっと一定'], answer: 1, explanation: '金属フィラメントは高温になると熱振動が激しくなり、抵抗値が大きくなります！' },
    { id: 'q_flem', expId: 'phys_fleming', question: '電流が磁場から受ける力の向きを調べる「フレミングの左手の法則」で、親指が表すのは？', options: ['電流の向き', '磁場の向き', '力の向き'], answer: 2, explanation: '親指＝力（F）、人差し指＝磁場（B）、中指＝電流（I）です（電・磁・力）！' },
    { id: 'q_cloud', expId: 'phys_cloud_chamber', question: '霧箱の中で、太くてまっすぐ・短い飛跡を残す（電離作用が最も強い）放射線は？', options: ['α線', 'β線', 'γ線'], answer: 0, explanation: 'α線（He^2+）は質量と電荷が大きいため電離作用が最強で、太く短い飛跡を残します！' }
  );
})();
