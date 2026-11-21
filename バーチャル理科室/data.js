// ラボ・ロジカ（LAB LOGICA）全教科・全実験マスターデータ（33実験・16器具・33クイズ）

const SUBJECTS_DATA = [
  {
    id: 'chem',
    name: '化学',
    ruby: '<ruby>化<rt>か</rt>学<rt>がく</rt></ruby>',
    icon: '🧪',
    desc: '物質の性質・反応・色の変化を実験しよう！',
    units: [
      {
        id: 'chem_theory',
        name: '<ruby>理<rt>り</rt>論<rt>ろん</rt>化<rt>か</rt>学<rt>がく</rt></ruby>（酸塩基・電池・平衡）',
        experiments: [
          {
            id: 'chem_neutral',
            name: '<ruby>中<rt>ちゅう</rt>和<rt>わ</rt>滴<rt>てき</rt>定<rt>てい</rt></ruby>（BTB溶液）',
            summary: '塩酸に水酸化ナトリウム水溶液を少しずつ加え、液性の変化を観察する実験。',
            playable: true,
            simType: 'neutralization',
            equipmentIds: ['burette', 'conical_flask', 'pipette'],
            youtubeQuery: '高校化学 中和滴定 実験',
            points: [
              '酸性(黄) → 中性(緑) → 塩基性(青) に一瞬で切り替わる瞬間（中和点）を見極める！',
              'ビュレットは共洗い、コニカルビーカーは純水ですすぐ（共洗いNG）のがテスト頻出！'
            ],
            steps: [
              { icon: '🧪', title: 'ステップ1：準備と指示薬', desc: 'コニカルビーカーに塩酸を入れ、BTB溶液を数滴加えると「黄色（酸性）」になります。' },
              { icon: '💧', title: 'ステップ2：NaOHを滴下', desc: 'ビュレットから水酸化ナトリウム水溶液を少しずつ落とすと H+ が中和されます。' },
              { icon: '🟢', title: 'ステップ3：中和点（緑色）', desc: 'H+ と OH- の数がちょうど等しくなった瞬間、溶液が「緑色（中性）」になります！' },
              { icon: '🔵', title: 'ステップ4：塩基性（青色）', desc: 'さらに1滴多く入れると OH- が余り、「青色（塩基性）」に変化します。' }
            ]
          },
          {
            id: 'chem_daniell',
            name: 'ダニエル<ruby>電<rt>でん</rt>池<rt>ち</rt></ruby>の起電反応',
            summary: '亜鉛板と銅板、素焼き板を使って電流が流れる仕組みを確かめる実験。',
            playable: true,
            simType: 'step_lab',
            simConfig: {
              guide: '電極をつないでスイッチを入れ、亜鉛板と銅板の変化を観察しよう！',
              stages: [
                { label: '🔌 電極を導線でつなぐ', visual: '🔋', bg: 'rgba(56,189,248,0.35)', text: '硫酸亜鉛水溶液にZn板、硫酸銅水溶液にCu板をセット！' },
                { label: '⚡ スイッチON（放電開始）', visual: '💡✨', bg: 'rgba(34,197,94,0.4)', text: '豆電球が点灯！負極(Zn)が溶け出し、正極(Cu)に赤い銅が析出！' },
                { label: '🔍 素焼き板の役割を確認', visual: '🧱', bg: 'rgba(250,204,21,0.35)', text: 'SO4^2- が素焼き板を通過して両液の電気的中性を保っています！' }
              ]
            },
            equipmentIds: ['beaker', 'porous_plate'],
            youtubeQuery: '高校化学 ダニエル電池 実験',
            points: [
              'イオン化傾向が大きい Zn が負極（溶けて電子を出す）、Cu が正極（Cu2+が電子を受け取る）。',
              '素焼き板は2つの水溶液が混ざるのを防ぎつつ、イオンだけを通す役割！'
            ],
            steps: [
              { icon: '🔋', title: 'ステップ1：2つの水溶液', desc: 'ZnSO4水溶液に亜鉛板、CuSO4水溶液に銅板を差し込み、素焼き板で仕切ります。' },
              { icon: '⚡', title: 'ステップ2：電子の流れ', desc: 'Zn が Zn2+ になって溶け、電子が導線を通って銅板へ向かいます。' },
              { icon: '🟠', title: 'ステップ3：銅の析出', desc: '銅板の表面で Cu2+ が電子を受け取り、赤い銅が析出します。' }
            ]
          },
          {
            id: 'chem_electrolysis',
            name: '硫酸銅(II)水溶液の<ruby>電<rt>でん</rt>気<rt>き</rt>分<rt>ぶん</rt>解<rt>かい</rt></ruby>',
            summary: '白金電極でCuSO4水溶液を電気分解し、両極の変化を観察する実験。',
            playable: true,
            simType: 'step_lab',
            simConfig: {
              guide: '電源装置をONにして、陽極と陰極で起こる反応を順に観察しよう！',
              stages: [
                { label: '🔌 白金電極をセット', visual: '🧪', bg: 'rgba(56,189,248,0.55)', text: '青色の硫酸銅(II)水溶液に白金電極を2本差し込みました。' },
                { label: '⚡ 電源ON（陰極に注目）', visual: '🟠', bg: 'rgba(56,189,248,0.35)', text: '陰極（－）では Cu2+ が電子を受け取り、赤褐色の銅（Cu）が析出！' },
                { label: '🫧 陽極に注目', visual: '🫧', bg: 'rgba(186,230,253,0.35)', text: '陽極（＋）では水が酸化されて「酸素（O2）」の泡が発生し、液色は薄くなる！' }
              ]
            },
            equipmentIds: ['beaker', 'power_supply'],
            youtubeQuery: '高校化学 電気分解 硫酸銅 実験',
            points: [
              '陰極：Cu2+ + 2e- → Cu（銅が析出）',
              '陽極（白金・炭素電極）：2H2O → O2 + 4H+ + 4e-（酸素発生＆酸性に傾く）'
            ],
            steps: [
              { icon: '🔌', title: 'ステップ1：通電開始', desc: '直流電源装置をつないで電流を流します。' },
              { icon: '🟠', title: 'ステップ2：陰極に銅が析出', desc: '陰極の表面が赤く色づき、水溶液の青色はだんだん薄くなります。' },
              { icon: '🫧', title: 'ステップ3：陽極から酸素', desc: '陽極からは酸素の泡が発生し、水溶液は酸性になります。' }
            ]
          },
          {
            id: 'chem_equilibrium',
            name: 'ルシャトリエの<ruby>平<rt>へい</rt>衡<rt>こう</rt>移<rt>い</rt>動<rt>どう</rt></ruby>',
            summary: 'NO2（赤褐色）と N2O4（無色）の混合気体を冷やしたり温めたりして平衡移動を見る実験。',
            playable: true,
            simType: 'slider_lab',
            simConfig: {
              guide: '温度スライダーを「氷水（低温）」〜「お湯（高温）」に動かして色の変化を観察しよう！',
              label: '温度（℃）',
              min: 0,
              max: 80,
              initial: 25,
              unit: '℃',
              targetCheck: (v) => v <= 5 || v >= 70,
              describe: (v) => {
                if (v <= 15) return { bg: 'rgba(254, 215, 170, 0.35)', icon: '❄️', status: '色が薄くなった！（無色の N2O4 が増加＝発熱方向へ移動）' };
                if (v >= 55) return { bg: 'rgba(154, 52, 18, 0.78)', icon: '🔥', status: '濃い赤褐色になった！（NO2 が増加＝吸熱方向へ移動）' };
                return { bg: 'rgba(234, 88, 12, 0.5)', icon: '🌡️', status: '室温（赤褐色の NO2 と無色の N2O4 が平衡状態）' };
              }
            },
            equipmentIds: ['test_tube', 'water_bath'],
            youtubeQuery: '高校化学 ルシャトリエ NO2 N2O4 実験',
            points: [
              '2NO2（赤褐色） ⇌ N2O4（無色）＋ Q kJ（右向きが発熱反応）',
              '温めると吸熱方向（左：NO2増・濃くなる）、冷やすと発熱方向（右：N2O4増・薄くなる）！'
            ],
            steps: [
              { icon: '🌡️', title: 'ステップ1：室温のフラスコ', desc: '2NO2 ⇌ N2O4 の平衡状態で、薄い赤褐色をしています。' },
              { icon: '❄️', title: 'ステップ2：氷水で冷やす', desc: '温度を下げると発熱反応が進み、無色の N2O4 が増えて色が薄くなります！' },
              { icon: '🔥', title: 'ステップ3：お湯で温める', desc: '温度を上げると吸熱反応が進み、赤褐色の NO2 が増えて色が濃くなります！' }
            ]
          },
          {
            id: 'chem_colloid',
            name: 'コロイドの<ruby>透<rt>とう</rt>析<rt>せき</rt></ruby>・チンダル・<ruby>凝<rt>ぎょう</rt>析<rt>せき</rt></ruby>',
            summary: '水酸化鉄(III)コロイドに光を当てたり、少量の電解質を加えて凝析を起こす実験。',
            playable: true,
            simType: 'step_lab',
            simConfig: {
              guide: 'チンダル現象、透析、凝析の3つのコロイド特有の現象を順番に体験しよう！',
              stages: [
                { label: '🔦 レーザー光を当てる（チンダル現象）', visual: '🔦✨', bg: 'rgba(180,83,9,0.55)', text: '光の通り道がくっきり光った！コロイド粒子が光を散乱しています。' },
                { label: '🧻 セロハン袋で透析する', visual: '💧', bg: 'rgba(180,83,9,0.5)', text: '小さなイオンだけが外に出て、大きなコロイド粒子は袋の中に残った！' },
                { label: '🧂 電解質を少量加える（凝析）', visual: '🧱', bg: 'rgba(120,53,15,0.75)', text: '少量の電解質で電気的反発が消え、コロイドが沈殿（凝析）した！' }
              ]
            },
            equipmentIds: ['beaker', 'pipette'],
            youtubeQuery: '高校化学 コロイド チンダル現象 凝析 実験',
            points: [
              '疎水コロイド（Fe(OH)3など）は「少量」の電解質で沈殿（凝析）する。',
              '透析では半透膜（セロハンなど）を使い、分子やイオンだけを取り除ける。'
            ],
            steps: [
              { icon: '🔦', title: 'ステップ1：チンダル現象', desc: 'コロイド溶液に強い光を当てると、粒子が光を散乱して光の道筋が見えます。' },
              { icon: '🧻', title: 'ステップ2：透析', desc: '半透膜の袋に入れて純水に浸すと、不要なイオンだけが外へ流れ出ます。' },
              { icon: '🧂', title: 'ステップ3：凝析', desc: '疎水コロイドに少量の電解質を加えると沈殿します。' }
            ]
          }
        ]
      },
      {
        id: 'chem_inorg',
        name: '<ruby>無<rt>む</rt>機<rt>き</rt>化<rt>か</rt>学<rt>がく</rt></ruby>（イオン・気体・炎色）',
        experiments: [
          {
            id: 'chem_flame',
            name: '<ruby>炎<rt>えん</rt>色<rt>しょく</rt>反<rt>はん</rt>応<rt>のう</rt></ruby>',
            summary: '金属元素を含む水溶液を炎の中に入れて、特有の美しい炎の色を観察する実験。',
            playable: true,
            simType: 'flame',
            equipmentIds: ['platinum_loop', 'gas_burner'],
            youtubeQuery: '高校化学 炎色反応 実験',
            points: [
              '語呂合わせ：「リアカー無きK村、動力借りるとするもくれない馬力」',
              'Li(赤)、Na(黄)、K(赤紫)、Cu(青緑)、Ca(橙赤)、Ba(黄緑) をしっかり覚えよう！'
            ],
            steps: [
              { icon: '🧼', title: 'ステップ1：白金耳の洗浄', desc: '白金耳を濃塩酸で洗い、ガスバーナーで空焼きします。' },
              { icon: '💧', title: 'ステップ2：試料をつける', desc: '調べたい金属イオンの水溶液を先端につけます。' },
              { icon: '🔥', title: 'ステップ3：外炎に入れる', desc: '青い炎に入れると元素ごとに決まった色に発光します！' }
            ]
          },
          {
            id: 'chem_precip',
            name: '<ruby>金<rt>きん</rt>属<rt>ぞく</rt>イオンの<rt>沈<rt>ちん</rt>殿<rt>でん</rt></ruby>と<ruby>錯<rt>さく</rt></ruby>イオン',
            summary: 'Ag+・Cu2+・Fe3+ に試薬を加えて、沈殿の色や再溶解（錯イオン）を確かめる実験。',
            playable: true,
            simType: 'precipitate',
            equipmentIds: ['test_tube', 'pipette'],
            youtubeQuery: '高校化学 金属イオン 沈殿 実験',
            points: [
              'Ag+ は NH3水過剰で無色に溶け、Cu2+ は深青色の錯イオンになって溶ける！',
              'Fe3+ の赤褐色沈殿 Fe(OH)3 は、NH3水過剰でも溶けない！'
            ],
            steps: [
              { icon: '🧪', title: 'ステップ1：金属イオンを用意', desc: '試験管に金属イオン水溶液を入れます。' },
              { icon: '💧', title: 'ステップ2：少量のアンモニア水', desc: '特有の色をした水酸化物や酸化物の沈殿ができます。' },
              { icon: '✨', title: 'ステップ3：過剰に加える', desc: 'Ag+ や Cu2+ は錯イオンを作って再び溶けます！' }
            ]
          },
          {
            id: 'chem_gas',
            name: '<ruby>気<rt>き</rt>体<rt>たい</rt>の<rt>発<rt>はっ</rt>生<rt>せい</rt>と<rt>捕<rt>ほ</rt>集<rt>しゅう</rt>法<rt>ほう</rt></ruby>',
            summary: 'アンモニア・塩素・水素・酸素などの発生法と、水に溶けやすさ・密度による捕集法を確かめる実験。',
            playable: true,
            simType: 'step_lab',
            simConfig: {
              guide: '代表的な気体の発生と捕集法を順番に確認しよう！',
              stages: [
                { label: '⬆️ アンモニア（NH4Cl＋Ca(OH)2 加熱）', visual: '💨⬆️', bg: 'rgba(244,114,182,0.35)', text: '水に極めてよく溶け、空気より軽いため「上方置換法」で集める！' },
                { label: '⬇️ 塩素（MnO2＋濃塩酸 加熱）', visual: '🟨⬇️', bg: 'rgba(250,204,21,0.45)', text: '黄緑色の有毒気体！水に少し溶けて空気より重いため「下方置換法」で集める！' },
                { label: '🫧 水素・酸素（水上置換）', visual: '🫧', bg: 'rgba(56,189,248,0.45)', text: '水に溶けにくいため、純度よく集められる「水上置換法」を使う！' }
              ]
            },
            equipmentIds: ['test_tube', 'gas_burner'],
            youtubeQuery: '高校化学 気体の発生 捕集法 実験',
            points: [
              '上方置換＝アンモニアのみ！',
              '濃硫酸で乾燥できない気体＝NH3（酸と塩基で中和）、H2S（酸化還元）。'
            ],
            steps: [
              { icon: '⬆️', title: 'ステップ1：上方置換（NH3）', desc: '空気より軽く水に溶けやすいアンモニアは上方置換で集めます。' },
              { icon: '⬇️', title: 'ステップ2：下方置換（Cl2・HCl）', desc: '水に溶けやすく空気より重い気体は下方置換で集めます。' },
              { icon: '🫧', title: 'ステップ3：水上置換（H2・O2）', desc: '水に溶けにくい気体は水上置換で純度よく捕集します。' }
            ]
          },
          {
            id: 'chem_halogen',
            name: 'ハロゲンの<ruby>酸<rt>さん</rt>化<rt>か</rt>力<rt>りょく</rt></ruby>比較',
            summary: '塩素水・臭素水・ヨウ素水とハロゲン化物イオンの反応から酸化力の強弱を確かめる実験。',
            playable: true,
            simType: 'step_lab',
            simConfig: {
              guide: 'KBr水溶液とKI水溶液に塩素水を加えて、酸化力の強さ（Cl2 ＞ Br2 ＞ I2）を確かめよう！',
              stages: [
                { label: '🧪 KBr(無色) に 塩素水(Cl2) を加える', visual: '🟠', bg: 'rgba(249,115,22,0.55)', text: 'Br2 が遊離して赤褐色になった！（Cl2 は Br2 より酸化力が強い）' },
                { label: '🧪 KI(無色) に 臭素水(Br2) を加える', visual: '🟣', bg: 'rgba(126,34,206,0.55)', text: 'I2 が遊離し、ヘキサン層が赤紫色に！（Br2 は I2 より酸化力が強い）' },
                { label: '❌ NaCl に ヨウ素水(I2) を加える', visual: '⚪', bg: 'rgba(226,232,240,0.45)', text: '反応しない！酸化力は F2 ＞ Cl2 ＞ Br2 ＞ I2 の順です。' }
              ]
            },
            equipmentIds: ['test_tube', 'pipette'],
            youtubeQuery: '高校化学 ハロゲン 酸化力 実験',
            points: [
              '酸化力の強さ：F2 ＞ Cl2 ＞ Br2 ＞ I2（周期表の上ほど強い！）',
              '強い単体が弱いイオンから電子を奪って単体を追い出す。'
            ],
            steps: [
              { icon: '🟠', title: 'ステップ1：Cl2 ＋ 2Br-', desc: '塩素水を加えると臭素（Br2）が遊離して赤褐色になります。' },
              { icon: '🟣', title: 'ステップ2：Br2 ＋ 2I-', desc: '臭素水を加えるとヨウ素（I2）が遊離し、デンプンで青紫色・ヘキサンで赤紫色になります。' }
            ]
          }
        ]
      },
      {
        id: 'chem_org',
        name: '<ruby>有<rt>ゆう</rt>機<rt>き</rt>化<rt>か</rt>学<rt>がく</rt></ruby>',
        experiments: [
          {
            id: 'chem_silver',
            name: '<ruby>銀<rt>ぎん</rt>鏡<rt>きょう</rt>反<rt>はん</rt>応<rt>のう</rt></ruby>・フェーリング反応',
            summary: 'アルデヒドの還元性を利用し、試験管の内側に銀の鏡をつくる実験。',
            playable: true,
            simType: 'step_lab',
            simConfig: {
              guide: 'アンモニア性硝酸銀水溶液にアルデヒドを入れて湯浴で温めよう！',
              stages: [
                { label: '🧪 アンモニア性硝酸銀を作る', visual: '💧', bg: 'rgba(226,232,240,0.45)', text: '硝酸銀にアンモニア水を適量加えて無色透明の錯イオンにします。' },
                { label: '🌡️ アルデヒドを入れて湯浴で温める', visual: '✨🪞', bg: 'rgba(148,163,184,0.75)', text: '試験管の壁にピカピカの「銀鏡（Ag）」が析出！還元性の証拠です！' },
                { label: '🔴 フェーリング液で比較実験', visual: '🧱', bg: 'rgba(220,38,38,0.65)', text: 'フェーリング液を温めると、酸化銅(I) Cu2O の「赤色沈殿」が生じる！' }
              ]
            },
            equipmentIds: ['test_tube', 'water_bath'],
            youtubeQuery: '高校化学 銀鏡反応 実験',
            points: [
              'アルデヒド基（-CHO）やギ酸（HCOOH）が還元性を示す！',
              '銀鏡反応＝銀(Ag)析出、フェーリング反応＝Cu2O(赤色沈殿)。'
            ],
            steps: [
              { icon: '🧪', title: 'ステップ1：試薬の調整', desc: '硝酸銀水溶液にアンモニア水を加え、一度できた沈殿を溶かします。' },
              { icon: '🪞', title: 'ステップ2：銀鏡の析出', desc: 'アルデヒドを加えてお湯で温めると試験管が鏡のようになります！' }
            ]
          },
          {
            id: 'chem_ester',
            name: 'エステルの<ruby>合<rt>ごう</rt>成<rt>せい</rt></ruby>（酢酸エチル）',
            summary: '酢酸とエタノールに濃硫酸を加えて加熱し、甘い香りのエステルを合成する実験。',
            playable: true,
            simType: 'step_lab',
            simConfig: {
              guide: '濃硫酸（触媒・脱水剤）を加えて温め、甘い香りのエステルを取り出そう！',
              stages: [
                { label: '💧 酢酸＋エタノール＋濃硫酸を混ぜる', visual: '🧪', bg: 'rgba(226,232,240,0.4)', text: '濃硫酸は反応を速める触媒＆水を奪う脱水剤として入れます。' },
                { label: '🌡️ 湯浴で温める', visual: '🍏✨', bg: 'rgba(254,240,138,0.5)', text: 'フルーツのような甘い香り（酢酸エチル）が発生！' },
                { label: '🌊 水（飽和NaCl水）に注ぐ', visual: '🫧', bg: 'rgba(186,230,253,0.45)', text: '水に溶けにくく軽い酢酸エチルが、上の層に油のように分離した！' }
              ]
            },
            equipmentIds: ['test_tube', 'water_bath', 'pipette'],
            youtubeQuery: '高校化学 エステル化 酢酸エチル 実験',
            points: [
              'カルボン酸 ＋ アルコール ⇌ エステル ＋ 水（可逆反応）',
              'エステルは水より軽く、水に溶けにくいので上層に分離する！'
            ],
            steps: [
              { icon: '🧪', title: 'ステップ1：混合', desc: '酢酸・エタノール・濃硫酸を試験管に入れます。' },
              { icon: '🍏', title: 'ステップ2：加熱と分離', desc: '湯浴で温めると甘い香りの酢酸エチルが生じ、水の上層に浮かびます。' }
            ]
          },
          {
            id: 'chem_iodoform',
            name: 'ヨードホルム<ruby>反<rt>はん</rt>応<rt>のう</rt></ruby>',
            summary: '特定の構造を持つアルコールやケトンにヨウ素とNaOHを加えて黄色沈殿をつくる実験。',
            playable: true,
            simType: 'step_lab',
            simConfig: {
              guide: 'エタノールとメタノールを比較して、ヨードホルム（CHI3）の黄色沈殿ができるか確かめよう！',
              stages: [
                { label: '🧪 エタノール ＋ I2 ＋ NaOH(温める)', visual: '🟡', bg: 'rgba(250,204,21,0.65)', text: '特異臭のある「黄色沈殿（CHI3：ヨードホルム）」が発生！' },
                { label: '🧪 アセトン ＋ I2 ＋ NaOH(温める)', visual: '🟡', bg: 'rgba(250,204,21,0.65)', text: 'アセチル基（CH3-CO-）があるのでこちらも黄色沈殿！' },
                { label: '🧪 メタノール ＋ I2 ＋ NaOH(温める)', visual: '⚪', bg: 'rgba(226,232,240,0.4)', text: 'CH3-CH(OH)- 構造がないため反応せず無色のまま！' }
              ]
            },
            equipmentIds: ['test_tube', 'water_bath'],
            youtubeQuery: '高校化学 ヨードホルム反応 実験',
            points: [
              '陽性になるのは「CH3-CO-」または「CH3-CH(OH)-」を持つ物質だけ！',
              'エタノール・アセトアルデヒド・アセトン・2-プロパノールは陽性！'
            ],
            steps: [
              { icon: '🧪', title: 'ステップ1：試薬を加える', desc: '試料にヨウ素と水酸化ナトリウム水溶液を加えます。' },
              { icon: '🟡', title: 'ステップ2：黄色沈殿', desc: '特有の構造があればヨードホルム（CHI3）の黄色沈殿ができます。' }
            ]
          },
          {
            id: 'chem_azo',
            name: 'アニリンの<ruby>ジ<rt>じ</rt>ア<rt>あ</rt>ゾ<rt>ぞ</rt>化<rt>か</rt></ruby>とカップリング',
            summary: 'アニリンを氷冷しながらジアゾ化し、鮮やかな赤橙色のアゾ染料を合成する実験。',
            playable: true,
            simType: 'step_lab',
            simConfig: {
              guide: '温度管理（5℃以下）に気をつけながらアゾ染料を合成しよう！',
              stages: [
                { label: '❄️ アニリン塩酸塩＋NaNO2を5℃以下で反応', visual: '🧊', bg: 'rgba(186,230,253,0.45)', text: '塩化ベンゼンジアゾニウム（無色）ができた！※温めるとN2が出て分解するので氷冷必須！' },
                { label: '🎨 ナトリウムフェノキシド（または2-ナフトール）を混合', visual: '🔴🟠', bg: 'rgba(234,88,12,0.75)', text: '鮮やかな赤橙色の「アゾ染料（-N=N-）」が一瞬で生成した！' }
              ]
            },
            equipmentIds: ['test_tube', 'beaker'],
            youtubeQuery: '高校化学 ジアゾ化 カップリング 実験',
            points: [
              'ジアゾ化は必ず「氷冷（5℃以下）」で行う！（室温だとフェノールに分解）',
              'アゾ基（-N=N-）が鮮やかな色の原因！'
            ],
            steps: [
              { icon: '🧊', title: 'ステップ1：氷冷してジアゾ化', desc: '5℃以下に冷やしながら塩化ベンゼンジアゾニウムを作ります。' },
              { icon: '🎨', title: 'ステップ2：カップリング', desc: 'ナトリウムフェノキシドなどを加えると赤橙色のアゾ染料ができます！' }
            ]
          }
        ]
      },
      {
        id: 'chem_polymer',
        name: '<ruby>高<rt>こう</rt>分<rt>ぶん</rt>子<rt>し</rt>化<rt>か</rt>合<rt>ごう</rt>物<rt>ぶつ</rt></ruby>',
        experiments: [
          {
            id: 'chem_protein',
            name: 'タンパク質の<ruby>検<rt>けん</rt>出<rt>しゅつ</rt>反<rt>はん</rt>応<rt>のう</rt></ruby>',
            summary: '卵白水溶液に様々な試薬を加え、ビウレット・キサントプロテイン・ニンヒドリン反応を確かめる実験。',
            playable: true,
            simType: 'step_lab',
            simConfig: {
              guide: '3つの有名な呈色反応を試して、何色に変わるか確認しよう！',
              stages: [
                { label: '🟣 ビウレット反応（NaOH＋CuSO4）', visual: '🟣', bg: 'rgba(168,85,247,0.65)', text: '赤紫色になった！ペプチド結合が2個以上ある（トリペプチド以上）証拠！' },
                { label: '🟠 キサントプロテイン反応（濃HNO3加熱→NH3）', visual: '🟡➡️🟠', bg: 'rgba(249,115,22,0.65)', text: '黄色→アンモニア水で橙黄色に！ベンゼン環をもつアミノ酸の証拠！' },
                { label: '🔵 ニンヒドリン反応（ニンヒドリン＋加熱）', visual: '🔵🟣', bg: 'rgba(99,102,241,0.65)', text: '青紫色になった！アミノ基（-NH2）をもつアミノ酸・タンパク質の証拠！' }
              ]
            },
            equipmentIds: ['test_tube', 'pipette'],
            youtubeQuery: '高校化学 タンパク質 検出反応 実験',
            points: [
              'ビウレット＝赤紫（トリペプチド以上）、キサント＝黄→橙（ベンゼン環）、ニンヒドリン＝青紫（アミノ基）。',
              'システイン（Sを含む）はNaOHと酢酸鉛(II)で黒色沈殿（PbS）を生じる。'
            ],
            steps: [
              { icon: '🟣', title: 'ステップ1：ビウレット反応', desc: '塩基性でCuSO4を加えると赤紫色になります。' },
              { icon: '🟠', title: 'ステップ2：キサントプロテイン反応', desc: '濃硝酸で黄色、さらに塩基性にして橙黄色になります。' }
            ]
          },
          {
            id: 'chem_nylon',
            name: 'ナイロン66の<ruby>界<rt>かい</rt>面<rt>めん</rt>重<rt>じゅう</rt>縮<rt>しゅく</rt>合<rt>ごう</rt></ruby>',
            summary: '混ざり合わない2つの液体（水層と有機層）の境界面からナイロン糸を引き上げる実験。',
            playable: true,
            simType: 'step_lab',
            simConfig: {
              guide: '2つの溶液を静かに重ねて、境界面にできた膜をピンセットで引き上げよう！',
              stages: [
                { label: '🧪 ヘキサメチレンジアミン水溶液を入れる', visual: '💧', bg: 'rgba(186,230,253,0.45)', text: '下層に水溶性のヘキサメチレンジアミン（＋NaOH）を用意。' },
                { label: '🌊 アジピン酸ジクロリドの有機溶液を注ぐ', visual: '🎞️', bg: 'rgba(226,232,240,0.55)', text: '2層の境界面（界面）に白いナイロンの膜ができた！' },
                { label: '🥢 ピンセットで引き上げる！', visual: '🧵✨', bg: 'rgba(191,219,254,0.6)', text: '境界面で次々と重合が起こり、長いナイロン66の糸がどんどん巻き取れる！' }
              ]
            },
            equipmentIds: ['beaker'],
            youtubeQuery: '高校化学 ナイロン66 界面重縮合 実験',
            points: [
              'C6個のアミン ＋ C6個のジカルボン酸塩化物 → ナイロン66（アミド結合）！',
              '加熱不要・室温で2液の境界面から連続で糸を作れるのが特徴。'
            ],
            steps: [
              { icon: '🧪', title: 'ステップ1：2層を作る', desc: '水層と有機層を静かに重ねます。' },
              { icon: '🧵', title: 'ステップ2：糸を巻き取る', desc: '界面にできた薄膜をつまんで引き上げると連続して糸ができます。' }
            ]
          }
        ]
      }
    ]
  },

  // =====================================
  // 生物（Biology）
  // =====================================
  {
    id: 'bio',
    name: '生物',
    ruby: '<ruby>生<rt>せい</rt>物<rt>ぶつ</rt></ruby>',
    icon: '🔬',
    desc: '顕微鏡や細胞・代謝のミクロな世界を観察しよう！',
    units: [
      {
        id: 'bio_cell',
        name: '<ruby>細<rt>さい</rt>胞<rt>ぼう</rt></ruby>と<ruby>代<rt>たい</rt>謝<rt>しゃ</rt></ruby>',
        experiments: [
          {
            id: 'bio_mitosis',
            name: 'タマネギの<ruby>体<rt>たい</rt>細<rt>さい</rt>胞<rt>ぼう</rt>分<rt>ぶん</rt>裂<rt>れつ</rt></ruby>観察',
            summary: 'タマネギの根の先端を処理し、顕微鏡の倍率とピントを合わせて染色体を観察する実験。',
            playable: true,
            simType: 'microscope',
            equipmentIds: ['microscope', 'pipette'],
            youtubeQuery: '高校生物 体細胞分裂 観察 実験',
            points: [
              '手順：「固定（エタノール＋酢酸）」→「解離（希塩酸）」→「染色（酢酸オルセイン）」→「押しつぶし」',
              '観察は低倍率（全体を探す）→ 高倍率（細かい部分を観察）の順！'
            ],
            steps: [
              { icon: '🧅', title: 'ステップ1：固定と解離', desc: '固定液で細胞を殺して状態を保ち、希塩酸で細胞どうしを離れやすくします。' },
              { icon: '🔴', title: 'ステップ2：染色と押しつぶし', desc: '酢酸オルセインで核や染色体を赤く染め、垂直に押しつぶします。' },
              { icon: '🔬', title: 'ステップ3：顕微鏡で観察', desc: '低倍率から高倍率へ切り替え、ピントを合わせて染色体を観察します！' }
            ]
          },
          {
            id: 'bio_plasmolysis',
            name: 'オオカナダモの<ruby>原<rt>げん</rt>形<rt>けい</rt>質<rt>しつ</rt>分<rt>ぶん</rt>離<rt>り</rt></ruby>',
            summary: '外液のスクロース濃度を変えて、植物細胞の細胞膜が細胞壁から離れる様子を観察する実験。',
            playable: true,
            simType: 'slider_lab',
            simConfig: {
              guide: '外液のスクロース濃度（％）を上げて、原形質分離が起こる様子を観察しよう！',
              label: '外液のスクロース濃度（％）',
              min: 0,
              max: 20,
              initial: 2,
              unit: '%',
              targetCheck: (v) => v >= 15,
              describe: (v) => {
                if (v < 6) return { bg: 'rgba(134, 239, 172, 0.55)', icon: '🟩', status: '膨圧でパンパン！（低張液：水が細胞内へ流入）' };
                if (v < 11) return { bg: 'rgba(167, 243, 208, 0.45)', icon: '🌿', status: '限界原形質分離付近（細胞内外の浸透圧がほぼ等しい）' };
                return { bg: 'rgba(254, 240, 138, 0.5)', icon: '🤏', status: '縮んだ！（高張液：水が外に出て細胞膜が細胞壁から離れる＝原形質分離！）' };
              }
            },
            equipmentIds: ['microscope', 'pipette'],
            youtubeQuery: '高校生物 原形質分離 オオカナダモ 実験',
            points: [
              '動物細胞（赤血球など）は細胞壁がないため、低張液では「破裂（溶血）」する。',
              '植物細胞は丈夫な「細胞壁」があるため破裂せず、高張液で「原形質分離」を起こす！'
            ],
            steps: [
              { icon: '🌿', title: 'ステップ1：通常状態', desc: '水の中では細胞膜が細胞壁にぴったり押し付けられています。' },
              { icon: '💧', title: 'ステップ2：濃いスクロース液', desc: '細胞から水が奪われて細胞膜が縮み、細胞壁から離れます（原形質分離）。' }
            ]
          },
          {
            id: 'bio_catalase',
            name: 'カタラーゼの<ruby>酵<rt>こう</rt>素<rt>そ</rt></ruby>実験',
            summary: '肝臓片（カタラーゼ）と過酸化水素水の反応から、酵素の温度特性を調べる実験。',
            playable: true,
            simType: 'slider_lab',
            simConfig: {
              guide: '反応温度スライダーを動かして、最も泡（酸素）がたくさん出る最適温度と失活温度を見つけよう！',
              label: '反応温度（℃）',
              min: 0,
              max: 90,
              initial: 10,
              unit: '℃',
              targetCheck: (v) => v >= 75,
              describe: (v) => {
                if (v < 20) return { bg: 'rgba(186, 230, 253, 0.4)', icon: '🫧', status: '反応ゆっくり（低温のため分子運動が小さい）' };
                if (v <= 45) return { bg: 'rgba(74, 222, 128, 0.55)', icon: '🫧🫧🫧', status: '激しく酸素発生！！（最適温度：35〜40℃付近）' };
                if (v < 65) return { bg: 'rgba(251, 191, 36, 0.45)', icon: '🫧', status: '反応が弱まってきた（高温で立体構造が崩れ始めている）' };
                return { bg: 'rgba(239, 68, 68, 0.35)', icon: '❌', status: '反応停止！（60〜70℃以上でタンパク質が変性し「失活」した！）' };
              }
            },
            equipmentIds: ['test_tube', 'water_bath'],
            youtubeQuery: '高校生物 カタラーゼ 過酸化水素 実験',
            points: [
              '酵素はタンパク質でできているため、高温で変性して「失活」する。',
              '無機触媒（二酸化マンガン MnO2）は煮沸しても失活しない！'
            ],
            steps: [
              { icon: '🧪', title: 'ステップ1：低温〜最適温度', desc: '35〜40℃付近で酵素カタラーゼの働きが最大になります。' },
              { icon: '🔥', title: 'ステップ2：高温で失活', desc: '煮沸するとタンパク質が変性し、過酸化水素を分解できなくなります。' }
            ]
          },
          {
            id: 'bio_ferment',
            name: '酵母菌のアルコール<ruby>発<rt>はっ</rt>酵<rt>こう</rt></ruby>',
            summary: 'キューネ発酵管を使い、無酸素条件下で酵母菌がグルコースからCO2とエタノールを作る実験。',
            playable: true,
            simType: 'step_lab',
            simConfig: {
              guide: 'キューネ発酵管に酵母菌とグルコース液を入れ、発生する気体の正体を確かめよう！',
              stages: [
                { label: '🧪 酵母菌＋グルコース液を盲管部に満たす', visual: '🧪', bg: 'rgba(254,240,138,0.45)', text: '酸素を遮断した状態で35℃くらいに保温します。' },
                { label: '🫧 気体が溜まってきた！', visual: '🫧⬆️', bg: 'rgba(253,224,71,0.55)', text: '盲管部の上にどんどん気体が溜まった！' },
                { label: '💧 水酸化ナトリウム(NaOH)を加えて振る', visual: '✨', bg: 'rgba(134,239,172,0.55)', text: '気体がすべて吸収された！発生した気体は「二酸化炭素（CO2）」と確定！' }
              ]
            },
            equipmentIds: ['fermentation_tube', 'pipette'],
            youtubeQuery: '高校生物 キューネ発酵管 アルコール発酵 実験',
            points: [
              'アルコール発酵：C6H12O6 → 2C2H5OH ＋ 2CO2 ＋ 2ATP',
              'NaOH水溶液で気体が吸収される＝CO2、残った液のにおい＝エタノール！'
            ],
            steps: [
              { icon: '🧪', title: 'ステップ1：発酵開始', desc: 'キューネ発酵管に酵母菌液とグルコースを入れて温めます。' },
              { icon: '🫧', title: 'ステップ2：CO2の確認', desc: '溜まった気体はNaOH水溶液に完全に吸収されます。' }
            ]
          }
        ]
      },
      {
        id: 'bio_gene',
        name: '<ruby>遺<rt>い</rt>伝<rt>でん</rt></ruby>・<ruby>分<rt>ぶん</rt>子<rt>し</rt></ruby>',
        experiments: [
          {
            id: 'bio_dna',
            name: 'ブロッコリーからのDNA<ruby>抽<rt>ちゅう</rt>出<rt>しゅつ</rt></ruby>',
            summary: '台所用洗剤と食塩、冷エタノールを使って植物の細胞からDNAを目に見える形で取り出す実験。',
            playable: true,
            simType: 'step_lab',
            simConfig: {
              guide: '3つのステップで、ブロッコリーの花芽から白い糸状のDNAを取り出そう！',
              stages: [
                { label: '🥣 ブロッコリーをすりつぶし、洗剤＋食塩水を加える', visual: '🥦', bg: 'rgba(74,222,128,0.45)', text: '洗剤が「細胞膜・核膜（脂質）」を溶かし、食塩水がDNAを溶けやすくします！' },
                { label: '🧻 ろ過して緑の液を取り出す', visual: '🧪', bg: 'rgba(34,197,94,0.45)', text: '細胞のかすを取り除き、DNAが溶けたろ液を得ました。' },
                { label: '🧊 冷やしたエタノールを静かに注ぐ', visual: '🧬✨', bg: 'rgba(186,230,253,0.5)', text: 'DNAはエタノールに溶けないため、境界面に白い綿・糸状のDNAが浮かび上がった！' }
              ]
            },
            equipmentIds: ['beaker', 'pipette'],
            youtubeQuery: '高校生物 DNA抽出 ブロッコリー 実験',
            points: [
              '台所用洗剤（界面活性剤）の役割：細胞膜や核膜の脂質二重層を破壊する！',
              '冷エタノールの役割：DNAを水に溶けた状態から析出させる（DNAはエタノールに不溶）。'
            ],
            steps: [
              { icon: '🥦', title: 'ステップ1：膜の破壊', desc: '洗剤で細胞膜と核膜を溶かしてDNAを溶液中に出します。' },
              { icon: '🧬', title: 'ステップ2：エタノールで析出', desc: '冷エタノールを静かに注ぐと白い糸状のDNAが現れます！' }
            ]
          }
        ]
      },
      {
        id: 'bio_plant',
        name: '<ruby>植<rt>しょく</rt>物<rt>ぶつ</rt></ruby>の<ruby>環<rt>かん</rt>境<rt>きょう</rt>応<rt>おう</rt>答<rt>とう</rt></ruby>・<ruby>生<rt>せい</rt>態<rt>たい</rt></ruby>',
        experiments: [
          {
            id: 'bio_chromato',
            name: '<ruby>光<rt>こう</rt>合<rt>ごう</rt>成<rt>せい</rt>色<rt>しき</rt>素<rt>そ</rt></ruby>のクロマトグラフィー',
            summary: 'ホウレンソウの葉から抽出した色素を、展開液を用いて4種類の色素に分離する実験。',
            playable: true,
            simType: 'step_lab',
            simConfig: {
              guide: 'ろ紙の原点に色素をつけ、展開液に浸して色素が分離する順番を確認しよう！',
              stages: [
                { label: '🌿 原点に色素をつけて乾かす', visual: '📄', bg: 'rgba(134,239,172,0.4)', text: 'ろ紙の下から2cmの位置に、ホウレンソウの濃い緑色の色素を線状に塗りました。' },
                { label: '💧 展開液に浸して上昇させる', visual: '⬆️', bg: 'rgba(186,230,253,0.4)', text: '展開液がろ紙を吸い上がり、色素を溶かしながら上へ移動しています！' },
                { label: '🌈 4色に分離完了！（上から確認）', visual: '🟠🟡🟢🩵', bg: 'rgba(254,249,195,0.6)', text: '上から「カロテン(橙) → キサントフィル(黄) → クロロフィルa(青緑) → クロロフィルb(黄緑)」に分かれた！' }
              ]
            },
            equipmentIds: ['chromato_jar'],
            youtubeQuery: '高校生物 ペーパークロマトグラフィー 光合成色素 実験',
            points: [
              '移動しやすい順（上→下）：カロテン ＞ キサントフィル ＞ クロロフィルa ＞ クロロフィルb',
              '色素の「展開液への溶けやすさ」と「ろ紙への吸着しやすさ」の差で分離される！'
            ],
            steps: [
              { icon: '🌿', title: 'ステップ1：原点に塗布', desc: 'ろ紙の下端に抽出液を何度も塗って乾かします。' },
              { icon: '🌈', title: 'ステップ2：4色に分離', desc: '展開液に浸すと、移動速度の違いで4つの色素が帯状に分かれます！' }
            ]
          },
          {
            id: 'bio_stomata',
            name: '<ruby>気<rt>き</rt>孔<rt>こう</rt></ruby>の<ruby>開<rt>かい</rt>閉<rt>へい</rt></ruby>と<ruby>蒸<rt>じょう</rt>散<rt>さん</rt></ruby>の観察',
            summary: '葉の裏側の表皮をはぎ取り、2つの孔辺細胞がつくる気孔の開閉を観察する実験。',
            playable: true,
            simType: 'step_lab',
            simConfig: {
              guide: '光や水分条件を変えたときの「孔辺細胞」と「気孔」の動きを確認しよう！',
              stages: [
                { label: '☀️ 光を当てる（K+が孔辺細胞に流入）', visual: '👄✨', bg: 'rgba(134,239,172,0.5)', text: '水が流入して孔辺細胞が膨らみ、外側に反り返って「気孔が開いた」！' },
                { label: '🌵 乾燥状態（アブシシン酸が働く）', visual: '😑', bg: 'rgba(253,230,138,0.5)', text: '水が抜けて孔辺細胞がしぼみ、「気孔が閉じた」！蒸散を防いでいます。' }
              ]
            },
            equipmentIds: ['microscope'],
            youtubeQuery: '高校生物 気孔 孔辺細胞 観察 実験',
            points: [
              '気孔は「孔辺細胞」の吸水（膨圧上昇）で開き、脱水で閉じる。',
              '乾燥ストレス時は植物ホルモン「アブシシン酸」が気孔を閉じる！'
            ],
            steps: [
              { icon: '☀️', title: 'ステップ1：光照射で開く', desc: '光合成やK+の流入で浸透圧が上がり、吸水して気孔が開きます。' },
              { icon: '🌵', title: 'ステップ2：乾燥で閉じる', desc: 'アブシシン酸の働きでK+と水が流出し、気孔が閉じます。' }
            ]
          },
          {
            id: 'bio_photosynth',
            name: '光の強さと<ruby>光<rt>こう</rt>合<rt>ごう</rt>成<rt>せい</rt></ruby>速度',
            summary: 'オオカナダモに当てる光の強さを変え、発生する酸素の気泡数から補償点・光飽和点を調べる実験。',
            playable: true,
            simType: 'slider_lab',
            simConfig: {
              guide: 'ライトの強さを調整して、「補償点」と「光飽和点」の違いを体感しよう！',
              label: '光の強さ（相対値）',
              min: 0,
              max: 100,
              initial: 0,
              unit: '%',
              targetCheck: (v) => v >= 80,
              describe: (v) => {
                if (v < 15) return { bg: 'rgba(30, 41, 59, 0.5)', icon: '🌑', status: '呼吸のみ（CO2を吸収せず放出している）' };
                if (v <= 25) return { bg: 'rgba(250, 204, 21, 0.4)', icon: '⚖️', status: '【補償点】光合成速度 ＝ 呼吸速度（見かけのCO2吸収量 0！）' };
                if (v < 75) return { bg: 'rgba(74, 222, 128, 0.5)', icon: '🫧🫧', status: '光が強いほど酸素の泡が増えている！（光が限定要因）' };
                return { bg: 'rgba(16, 185, 129, 0.65)', icon: '🫧🫧🫧', status: '【光飽和点】これ以上光を強くしても光合成速度は頭打ち！' };
              }
            },
            equipmentIds: ['beaker'],
            youtubeQuery: '高校生物 光合成速度 オオカナダモ 実験',
            points: [
              '補償点：見かけの光合成速度が0（真の光合成速度＝呼吸速度）になる光の強さ。',
              '陰生植物は陽生植物よりも「補償点」「光飽和点」が低い！'
            ],
            steps: [
              { icon: '⚖️', title: 'ステップ1：補償点', desc: '光合成で出すO2と呼吸で使うO2が釣り合う点です。' },
              { icon: '☀️', title: 'ステップ2：光飽和点', desc: '十分強い光ではCO2濃度や温度が律速になり速度が一定になります。' }
            ]
          }
        ]
      }
    ]
  },

  // =====================================
  // 物理（Physics）
  // =====================================
  {
    id: 'phys',
    name: '物理',
    ruby: '<ruby>物<rt>ぶつ</rt>理<rt>り</rt></ruby>',
    icon: '⚡',
    desc: '力学・音・光・電気と磁石の法則を体感しよう！',
    units: [
      {
        id: 'phys_mech',
        name: '<ruby>力<rt>りき</rt>学<rt>がく</rt></ruby>（運動・振り子・衝突）',
        experiments: [
          {
            id: 'phys_cart',
            name: '<ruby>記<rt>き</rt>録<rt>ろく</rt></ruby>タイマーと<ruby>力<rt>りき</rt>学<rt>がく</rt>台<rt>だい</rt>車<rt>しゃ</rt></ruby>',
            summary: '斜面を下る台車に記録テープをつけ、打点の間隔から加速度を求める実験。',
            playable: true,
            simType: 'slider_lab',
            simConfig: {
              guide: '斜面の角度（°）を変えて、台車の加速度 a ＝ g sinθ の変化を確かめよう！',
              label: '斜面の角度 θ（度）',
              min: 5,
              max: 45,
              initial: 15,
              unit: '°',
              targetCheck: (v) => v >= 30,
              describe: (v) => {
                const a = (9.8 * Math.sin((v * Math.PI) / 180)).toFixed(2);
                return {
                  bg: 'rgba(251, 191, 36, 0.35)',
                  icon: '🛒💨',
                  status: `加速度 a = ${a} m/s²（打点間隔が毎回同じ割合で広がっていく＝等加速度直線運動！）`
                };
              }
            },
            equipmentIds: ['recording_timer'],
            youtubeQuery: '高校物理 記録タイマー 力学台車 実験',
            points: [
              '50Hz地域は1打点 0.02秒（5打点ごとに切ると 0.1秒間隔）、60Hz地域は 1/60秒。',
              'テープの長さを並べたグラフの傾きが「加速度 a」になる！'
            ],
            steps: [
              { icon: '🛒', title: 'ステップ1：斜面を下る', desc: '台車を離すと重力成分 mgsinθ によって等加速度直線運動します。' },
              { icon: '📏', title: 'ステップ2：テープの解析', desc: '0.1秒ごとのテープ長が一定の割合で増えることから加速度を求めます。' }
            ]
          },
          {
            id: 'phys_pendulum',
            name: '<ruby>単<rt>たん</rt>振<rt>ふ</rt>り子<rt>こ</rt></ruby>の<ruby>周<rt>しゅう</rt>期<rt>き</rt></ruby>測定',
            summary: '糸の長さやおもりの重さを変えて、振り子が1往復する時間（周期）を測る実験。',
            playable: true,
            simType: 'slider_lab',
            simConfig: {
              guide: '糸の長さ l を変えて、周期 T = 2π√(l/g) がどう変わるか確かめよう（4倍の長さで周期は2倍！）。',
              label: '糸の長さ l（m）',
              min: 0.25,
              max: 2.0,
              initial: 1.0,
              unit: 'm',
              targetCheck: (v) => v >= 1.5,
              describe: (v) => {
                const t = (2 * Math.PI * Math.sqrt(v / 9.8)).toFixed(2);
                return {
                  bg: 'rgba(186, 230, 253, 0.4)',
                  icon: '🕰️',
                  status: `周期 T = ${t} 秒（※おもりの質量や振れ角が小さいときは関係なく、糸の長さ l のみで決まる！）`
                };
              }
            },
            equipmentIds: ['stopwatch'],
            youtubeQuery: '高校物理 単振り子 周期 実験',
            points: [
              '周期 T = 2π√(l / g) ：おもりの「質量」には無関係！',
              '糸の長さ l を4倍にすると、周期 T は 2倍になる！'
            ],
            steps: [
              { icon: '🕰️', title: 'ステップ1：10往復を測る', desc: '測定誤差を減らすため10往復の時間を測って10で割ります。' },
              { icon: '📏', title: 'ステップ2：長さとの関係', desc: '糸が長いほど周期が長くなり、√l に比例します。' }
            ]
          },
          {
            id: 'phys_collision',
            name: '2台車の<ruby>衝<rt>しょう</rt>突<rt>とつ</rt></ruby>と<ruby>運<rt>うん</rt>動<rt>どう</rt>量<rt>りょう</rt></ruby>保存',
            summary: '同じ質量の台車どうしを衝突（弾性衝突・合体）させて運動量の和が変わらないことを確かめる実験。',
            playable: true,
            simType: 'step_lab',
            simConfig: {
              guide: '台車Aを走らせて静止している台車Bにぶつけ、衝突後の動きを観察しよう！',
              stages: [
                { label: '🛒 同じ質量の台車を「弾性衝突」させる', visual: '💥🛒➡️', bg: 'rgba(56,189,248,0.35)', text: '台車Aはピタッと止まり、台車Bが元のAと同じ速さで走り出した！（運動量とエネルギーが完全保存！）' },
                { label: '🧲 マジックテープで「合体（完全非弾性衝突）」させる', visual: '🛒➕🛒➡️', bg: 'rgba(251,191,36,0.4)', text: '質量が2倍になったため、速さは元の 1/2 になった！運動量の和 mv は保存している！' }
              ]
            },
            equipmentIds: ['recording_timer'],
            youtubeQuery: '高校物理 運動量保存則 台車 衝突 実験',
            points: [
              '外力が働かなければ、衝突の前後で「運動量の和（m1v1 + m2v2）」は常に保存！',
              '合体（e=0）では運動エネルギーの一部が熱や音に変わって減少する。'
            ],
            steps: [
              { icon: '💥', title: 'ステップ1：弾性衝突', desc: '同質量なら衝突した台車が止まり、もう一方に速度がそのまま移ります。' },
              { icon: '🧲', title: 'ステップ2：合体', desc: '合体すると質量が2倍になり、速度は半分になります。' }
            ]
          }
        ]
      },
      {
        id: 'phys_wave',
        name: '<ruby>波<rt>は</rt>動<rt>どう</rt></ruby>（音と光）',
        experiments: [
          {
            id: 'phys_resonance',
            name: '<ruby>気<rt>き</rt>柱<rt>ちゅう</rt>の<rt>共<rt>きょう</rt>鳴<rt>めい</rt></ruby>実験',
            summary: '音叉を鳴らして管内の水面を上下させ、音が大きく響く共鳴点から音速を求める実験。',
            playable: true,
            simType: 'resonance',
            equipmentIds: ['tuning_fork'],
            youtubeQuery: '高校物理 気柱共鳴 実験',
            points: [
              '閉管では水面が「節」、管口付近が「腹」になる！',
              '1回目と2回目の共鳴位置の差（l2 - l1）がちょうど半波長（λ/2）になる！'
            ],
            steps: [
              { icon: '🔔', title: 'ステップ1：おんさを鳴らす', desc: '一定振動数のおんさをガラス管の口に近づけます。' },
              { icon: '💧', title: 'ステップ2：水面を下げる', desc: '特定の深さで「ボォォン！」と大きく共鳴し、差から波長が求まります。' }
            ]
          },
          {
            id: 'phys_young',
            name: 'ヤングの<ruby>干<rt>かん</rt>渉<rt>しょう</rt></ruby>実験（二重スリット）',
            summary: 'レーザー光を2つのスリットに通し、スクリーンにできる光の明暗（干渉縞）を観察する実験。',
            playable: true,
            simType: 'slider_lab',
            simConfig: {
              guide: '光の波長 λ（青〜赤）を変えて、明線の間隔 Δx = Lλ/d がどう変わるか確認しよう！',
              label: '光の波長 λ（nm）',
              min: 400,
              max: 700,
              initial: 550,
              unit: 'nm',
              targetCheck: (v) => v >= 650,
              describe: (v) => {
                const color = v < 480 ? '青紫' : v < 570 ? '緑' : '赤';
                const bg = v < 480 ? 'rgba(99,102,241,0.5)' : v < 570 ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.55)';
                return {
                  bg,
                  icon: '🌈',
                  status: `${color}色の干渉縞！波長 λ が長い（赤色に近い）ほど、明線の間隔 Δx は広くなる！`
                };
              }
            },
            equipmentIds: ['slit_plate'],
            youtubeQuery: '高校物理 ヤングの実験 干渉縞',
            points: [
              '明線の間隔：Δx = Lλ / d（波長 λ や距離 L が大きいほど広く、スリット間隔 d が広いほど狭い！）',
              '光が波の性質（回折と干渉）を持つことを証明した歴史的実験！'
            ],
            steps: [
              { icon: '🔦', title: 'ステップ1：二重スリット通過', desc: '2つのスリットから出た光が波として広がり重なり合います。' },
              { icon: '📊', title: 'ステップ2：等間隔の干渉縞', desc: '強め合う場所に明るい縞、弱め合う場所に暗い縞が並びます。' }
            ]
          },
          {
            id: 'phys_lens',
            name: '<ruby>凸<rt>とつ</rt>レ<rt>れ</rt>ン<rt>ん</rt>ズ</ruby>の<ruby>結<rt>けつ</rt>像<rt>ぞう</rt></ruby>（実像と虚像）',
            summary: 'ろうそく（物体）を凸レンズに近づけたり遠ざけたりして、実像と虚像のでき方を調べる実験。',
            playable: true,
            simType: 'slider_lab',
            simConfig: {
              guide: '物体距離 a（焦点距離 f = 20cm）を動かして、2f の位置や f より内側で像がどう変わるか確かめよう！',
              label: 'レンズから物体までの距離 a（cm）',
              min: 5,
              max: 60,
              initial: 45,
              unit: 'cm',
              targetCheck: (v) => v <= 15,
              describe: (v) => {
                if (v > 40) return { bg: 'rgba(186,230,253,0.45)', icon: '🕯️⬇️', status: 'スクリーンに【縮小された倒立実像】が映った！（カメラと同じ）' };
                if (v === 40) return { bg: 'rgba(134,239,172,0.45)', icon: '🕯️⬇️', status: 'a=2f！物体と【同じ大きさの倒立実像】ができた！' };
                if (v > 20) return { bg: 'rgba(254,240,138,0.45)', icon: '🕯️⬇️', status: 'スクリーンに【拡大された倒立実像】が映った！（プロジェクターと同じ）' };
                if (v === 20) return { bg: 'rgba(203,213,225,0.45)', icon: '💨', status: 'a=f（焦点上）！光が平行になり【像はできない】！' };
                return { bg: 'rgba(244,114,182,0.45)', icon: '🔍🕯️⬆️', status: 'fより内側！レンズ越しに【拡大された正立虚像】が見える！（虫眼鏡と同じ）' };
              }
            },
            equipmentIds: ['convex_lens'],
            youtubeQuery: '高校物理 凸レンズ 実像 虚像 実験',
            points: [
              'レンズの公式：1/a + 1/b = 1/f（虚像のときは b < 0）',
              '実像は「倒立」でスクリーンに映る、虚像は「正立」でレンズを通して直接見る！'
            ],
            steps: [
              { icon: '🕯️', title: 'ステップ1：焦点の外側', desc: '反対側のスクリーンに上下左右逆さまの「倒立実像」が映ります。' },
              { icon: '🔍', title: 'ステップ2：焦点の内側', desc: '虫眼鏡のように大きな「正立虚像」が見えます。' }
            ]
          }
        ]
      },
      {
        id: 'phys_em',
        name: '<ruby>電<rt>でん</rt>磁<rt>じ</rt>気<rt>き</rt></ruby>',
        experiments: [
          {
            id: 'phys_induction',
            name: '<ruby>電<rt>でん</rt>磁<rt>じ</rt>誘<rt>ゆう</rt>導<rt>どう</rt></ruby>（コイルと磁石）',
            summary: 'コイルに棒磁石を出し入れして、誘導電流の向きと大きさを検流計で確かめる実験。',
            playable: true,
            simType: 'induction',
            equipmentIds: ['galvanometer'],
            youtubeQuery: '高校物理 電磁誘導 コイル 実験',
            points: [
              'レンツの法則：コイルは「磁束の変化を妨げる向き」に誘導電流を流す！',
              '磁石を止めると磁束変化がゼロになるため、電流も 0 になる！'
            ],
            steps: [
              { icon: '🧲', title: 'ステップ1：N極を近づける', desc: '反発するように上側がN極になる向きに電流が流れます。' },
              { icon: '⏸️', title: 'ステップ2：磁石を止める', desc: '磁場の変化が止まると電流はゼロになります。' }
            ]
          },
          {
            id: 'phys_bridge',
            name: 'ホイートストンブリッジ<ruby>回<rt>かい</rt>路<rt>ろ</rt></ruby>',
            summary: '抵抗ダイヤルを調整して検流計の針を0にし、未知抵抗 Rx の値を正確に求める実験。',
            playable: true,
            simType: 'slider_lab',
            simConfig: {
              guide: '可変抵抗 R3 を調整して、検流計の電流が 0（平衡条件 R1×R4 = R2×R3）になる値を見つけよう！（R1=10Ω, R2=20Ω, Rx=40Ω）',
              label: '可変抵抗 R3（Ω）',
              min: 5,
              max: 40,
              initial: 10,
              unit: 'Ω',
              targetCheck: (v) => v === 20,
              describe: (v) => {
                const diff = v - 20;
                if (diff === 0) return { bg: 'rgba(34,197,94,0.55)', icon: '🎯⚡', status: '【検流計 0A 達成！】R1×Rx = R2×R3 (10×40 = 20×20) で平衡！Rx=40Ωと判明！' };
                return {
                  bg: 'rgba(251,191,36,0.35)',
                  icon: '🧭',
                  status: `検流計に電流が流れている（ズレ：${diff > 0 ? '+' : ''}${diff}Ω）→ 20Ω に合わせてみよう！`
                };
              }
            },
            equipmentIds: ['galvanometer', 'power_supply'],
            youtubeQuery: '高校物理 ホイートストンブリッジ 実験',
            points: [
              '検流計に電流が流れないとき、向かい合う抵抗の積が等しい（R1・R4 = R2・R3）！',
              '電流が流れない状態を使う「零位法」なので高精度に測定できる。'
            ],
            steps: [
              { icon: '🧭', title: 'ステップ1：抵抗の調整', desc: '検流計の針がちょうど中央（0）になるように可変抵抗を回します。' },
              { icon: '🧮', title: 'ステップ2：未知抵抗の算出', desc: 'たすき掛けの積が等しい式から未知抵抗を求めます。' }
            ]
          },
          {
            id: 'phys_capacitor',
            name: 'コンデンサーの<ruby>充<rt>じゅう</rt>放<rt>ほう</rt>電<rt>でん</rt></ruby>',
            summary: '大容量コンデンサーを充電したあと豆電球やLEDにつなぎ、時間経過による電流・電圧の変化を見る実験。',
            playable: true,
            simType: 'step_lab',
            simConfig: {
              guide: 'スイッチを切り替えて、コンデンサーの充電と放電の動きを体験しよう！',
              stages: [
                { label: '🔋 スイッチを電源側へ（充電開始）', visual: '⚡🔋', bg: 'rgba(56,189,248,0.45)', text: '最初は大きな充電電流が流れ、電圧が上がると電流は0に近づいて充電完了！' },
                { label: '💡 スイッチを豆電球側へ（放電開始）', visual: '💡✨', bg: 'rgba(250,204,21,0.55)', text: '豆電球がパッと明るく光ったあと、電荷が減るにつれてゆっくり暗くなって消えた！' }
              ]
            },
            equipmentIds: ['power_supply'],
            youtubeQuery: '高校物理 コンデンサー 充放電 実験',
            points: [
              '充電完了時、コンデンサーの極板間電圧は電源電圧と等しくなり電流は0になる！',
              '静電エネルギー U = 1/2 CV² で蓄えられる。'
            ],
            steps: [
              { icon: '🔋', title: 'ステップ1：充電', desc: '電源から電荷が運ばれ、極板間に電圧が生じます。' },
              { icon: '💡', title: 'ステップ2：放電', desc: '溜まった電荷が流れ出し、豆電球が光りながら徐々に消えます。' }
            ]
          }
        ]
      },
      {
        id: 'phys_atom',
        name: '<ruby>原<rt>げん</rt>子<rt>し</rt></ruby>',
        experiments: [
          {
            id: 'phys_photoelec',
            name: '<ruby>光<rt>こう</rt>電<rt>でん</rt>効<rt>こう</rt>果<rt>か</rt></ruby>の実験',
            summary: '金属板に当てる光の振動数（色）を変えて、光電子が飛び出すかどうかを検証する実験。',
            playable: true,
            simType: 'slider_lab',
            simConfig: {
              guide: '光の振動数（波長）を赤色→緑色→紫外線へと上げて、電子が飛び出す限界振動数を見つけよう！',
              label: '光の振動数（×10¹⁴ Hz）',
              min: 4,
              max: 12,
              initial: 5,
              unit: '×10¹⁴ Hz',
              targetCheck: (v) => v >= 9,
              describe: (v) => {
                if (v < 8) return { bg: 'rgba(239, 68, 68, 0.35)', icon: '🔴❌', status: '光電子は飛び出さない！（どんなに光を強くしても振動数が足りないと 0！）' };
                return { bg: 'rgba(168, 85, 247, 0.55)', icon: '🟣⚡', status: '紫外線到達！光電子が飛び出した！（限界振動数 ν0 を超えた証拠！）' };
              }
            },
            equipmentIds: ['power_supply'],
            youtubeQuery: '高校物理 光電効果 実験',
            points: [
              '光は粒子（光子）の性質を持ち、1個のエネルギーは hν（プランク定数×振動数）！',
              '振動数が限界振動数 ν0 より小さいと、いくら強い光を当てても光電子は出ない！'
            ],
            steps: [
              { icon: '🔴', title: 'ステップ1：赤い光を当てる', desc: '限界振動数より低いため、電子は1個も飛び出しません。' },
              { icon: '🟣', title: 'ステップ2：紫外線を当てる', desc: '仕事関数 W 以上のエネルギーを持つ光子がぶつかり、光電子が飛び出します！' }
            ]
          }
        ]
      }
    ]
  }
];

const EQUIPMENT_MASTER = [
  { id: 'burette', name: 'ビュレット', ruby: 'ビュレット', icon: '📏', short: '滴下量を0.1mL単位で正確に測れるガラス管', detail: 'コックをひねって1滴ずつ落とせます。使用前に中に入れる水溶液で「共洗い」するのが鉄則です。' },
  { id: 'conical_flask', name: 'コニカルビーカー', ruby: 'コニカルビーカー', icon: '🧪', short: '口がすぼまって振り混ぜやすいビーカー', detail: '中和滴定で下に置いて使います。振り混ぜても飛び散りにくい形。純水ですすぎます（共洗いNG）。' },
  { id: 'pipette', name: '駒込ピペット', ruby: '<ruby>駒<rt>こま</rt>込<rt>ごめ</rt></ruby>ピペット', icon: '💧', short: '少量の液体を吸い取って1滴ずつ加える道具', detail: 'ゴム球をつまんで吸い上げます。ゴム球に液が入らないよう立てて持ちます。' },
  { id: 'platinum_loop', name: '白金耳', ruby: '<ruby>白<rt>はっ</rt>金<rt>きん</rt>耳<rt>みみ</rt></ruby>', icon: '🪄', short: '炎色反応で試料をつける耐熱性の高い金属線', detail: '使う前に濃塩酸で洗って空焼きすることで、前の金属の色が残らないようにします。' },
  { id: 'gas_burner', name: 'ガスバーナー', ruby: 'ガスバーナー', icon: '🔥', short: '空気量を調整して高温の青い炎を作る加熱器具', detail: '下がガス調節ねじ、上が空気調節ねじ。空気を混ぜた青い外炎が一番高温です。' },
  { id: 'test_tube', name: '試験管', ruby: '<ruby>試<rt>し</rt>験<rt>けん</rt>管<rt>かん</rt></ruby>', icon: '🧪', short: '少量の試薬を混ぜて反応や沈殿を観察する管', detail: '振るときは横に軽く振ります。加熱時は口を絶対に人の方へ向けません。' },
  { id: 'beaker', name: 'ビーカー', ruby: 'ビーカー', icon: '🥛', short: '液体を入れたり混ぜたりする基本的なガラス容器', detail: '注ぎ口がついています。目盛りはあくまで目安で、正確な計量には使いません。' },
  { id: 'water_bath', name: '湯浴（ウォーターバス）', ruby: '<ruby>湯<rt>ゆ</rt>浴<rt>よく</rt></ruby>装置', icon: '♨️', short: 'お湯や氷水を使って穏やかに温度を保つ装置', detail: '引火しやすい有機溶媒（エタノール等）を直接火にかけず安全に温めるときに必須です。' },
  { id: 'porous_plate', name: '素焼き板', ruby: '<ruby>素<rt>す</rt>焼<rt>や</rt>き</ruby>板', icon: '🧱', short: '小さな穴が空いていてイオンだけを通す仕切り板', detail: 'ダニエル電池などで2種類の水溶液がすぐ混ざるのを防ぎつつ、電気的中性を保つためにイオンを通します。' },
  { id: 'power_supply', name: '直流電源装置', ruby: '<ruby>直<rt>ちょく</rt>流<rt>りゅう</rt></ruby>電源装置', icon: '🔋', short: '電気分解や電気回路に一定の電圧・電流を流す装置', detail: '＋極と－極を正しくつなぎ、電圧をゼロからゆっくり上げて使用します。' },
  { id: 'microscope', name: '光学顕微鏡', ruby: '<ruby>光<rt>こう</rt>学<rt>がく</rt><rt>顕<rt>けん</rt>微<rt>び</rt>鏡<rt>きょう</rt></ruby>', icon: '🔬', short: 'レンズでミクロな細胞を拡大して観察する装置', detail: '最初は低倍率で探し、中央に合わせてから高倍率に変えてピントを微調整します。' },
  { id: 'fermentation_tube', name: 'キューネ発酵管', ruby: 'キューネ<ruby>発<rt>はっ</rt>酵<rt>こう</rt>管<rt>かん</rt></ruby>', icon: '🧪', short: '無酸素状態で発酵による気体発生を測る管', detail: '上の閉じた部分（盲管部）に酵母菌と糖を入れ、発生したCO2の体積を目盛りで読めます。' },
  { id: 'chromato_jar', name: '展開容器とろ紙', ruby: '<ruby>展<rt>てん</rt>開<rt>かい</rt></ruby>容器・ろ紙', icon: '🌈', short: '物質の移動速度の差で色素を分離するセット', detail: '原点が展開液に浸からないようにセットし、蓋をして溶媒の蒸発を防ぎながら上昇させます。' },
  { id: 'recording_timer', name: '記録タイマー', ruby: '<ruby>記<rt>き</rt>録<rt>ろく</rt></ruby>タイマー', icon: '⏱️', short: '一定時間ごとにテープへ点を打ち運動を記録する装置', detail: '50Hzでは1秒間に50回、60Hzでは60回打点します。5打点または6打点ごとに切ってグラフにします。' },
  { id: 'stopwatch', name: 'ストップウォッチ', ruby: 'ストップウォッチ', icon: '⏱️', short: '振り子の周期など経過時間を精密に測る計器', detail: '振り子の測定では、1往復ではなく10往復の時間を測って10で割ることで誤差を減らします。' },
  { id: 'slit_plate', name: '二重スリット板', ruby: '<ruby>二<rt>に</rt>重<rt>じゅう</rt></ruby>スリット板', icon: '🎞️', short: 'ごく狭い2本のすき間から光を回折・干渉させる板', detail: 'ヤングの実験で光の波の性質（干渉縞）を観察するために使います。' },
  { id: 'convex_lens', name: '凸レンズ', ruby: '<ruby>凸<rt>とつ</rt></ruby>レンズ', icon: '🔍', short: '平行光線を焦点に集め、実像や虚像をつくるレンズ', detail: '焦点距離 f に対して物体が外側なら倒立実像、内側なら正立虚像ができます。' },
  { id: 'tuning_fork', name: 'おんさ・共鳴管', ruby: 'おんさ・<ruby>共<rt>きょう</rt>鳴<rt>めい</rt>管<rt>かん</rt></ruby>', icon: '🔔', short: '一定振動数の音を出す器具と水柱のガラス管', detail: '水面を上下させて共鳴する位置を測ることで、空気中の音速を求められます。' },
  { id: 'galvanometer', name: 'コイルと検流計', ruby: 'コイルと<ruby>検<rt>けん</rt>流<rt>りゅう</rt>計<rt>けい</rt></ruby>', icon: '🧭', short: '微小な電流の向きと大きさを測るメーター', detail: '針が中央（0）にあり、電流の向きによって左右どちらにも振れるのが特徴です。' }
];

const QUIZ_MASTER = [
  { id: 'q_neutral', expId: 'chem_neutral', question: '中和滴定で、塩酸を入れるコニカルビーカーを洗うときに使ってはいけない方法はどれ？', options: ['使用する塩酸で「共洗い」する', '純水ですすぐ', '洗ったあと水滴が少し残ったまま使う'], answer: 0, explanation: 'コニカルビーカーを共洗いすると H+ の物質量が増えてしまい、正確な滴定ができません！' },
  { id: 'q_daniell', expId: 'chem_daniell', question: 'ダニエル電池で、素焼き板の主な役割はどれ？', options: ['2液がすぐ混ざるのを防ぎつつ、イオンを通過させる', '電子を素焼き板の中だけに通す', '亜鉛板を溶けなくする'], answer: 0, explanation: '2つの水溶液を分けながら SO4^2- などのイオンを通して電気的中性を保ちます。' },
  { id: 'q_elec', expId: 'chem_electrolysis', question: '白金電極で硫酸銅(II)水溶液を電気分解したとき、陽極（＋）から発生する気体は？', options: ['水素（H2）', '酸素（O2）', '二酸化硫黄（SO2）'], answer: 1, explanation: '陽極では水が酸化されて酸素（O2）が発生し、溶液は酸性になります！' },
  { id: 'q_equil', expId: 'chem_equilibrium', question: '2NO2(赤褐色) ⇌ N2O4(無色) の平衡で、試験管を氷水で冷やすと色はどうなる？', options: ['濃くなる', '薄くなる（無色に近づく）', '変わらない'], answer: 1, explanation: '右向きが発熱反応なので、冷やすと発熱方向（無色の N2O4 側）へ平衡が移動します！' },
  { id: 'q_colloid', expId: 'chem_colloid', question: '疎水コロイドに「少量の電解質」を加えたときに沈殿する現象を何という？', options: ['塩析', '凝析', '透析'], answer: 1, explanation: '少量の電解質で沈殿するのが「凝析」、多量の電解質で沈殿するのが親水コロイドの「塩析」です！' },
  { id: 'q_flame', expId: 'chem_flame', question: '炎色反応で「銅（Cu）」が含まれるときの炎の色は？', options: ['赤色', '青緑色', '黄色'], answer: 1, explanation: '銅（Cu）は美しい青緑色になります！（リアカー無きK村…の「くれない＝Cu青緑」も要注意）' },
  { id: 'q_precip', expId: 'chem_precip', question: 'Cu2+ 水溶液にアンモニア水を過剰に加えると何色の溶液になる？', options: ['深青色', '赤褐色', '無色透明'], answer: 0, explanation: '[Cu(NH3)4]2+ という深青色の錯イオンになって溶けます！' },
  { id: 'q_gas', expId: 'chem_gas', question: '高校化学で習う気体のうち、「上方置換法」で集める代表的な気体は？', options: ['塩素（Cl2）', 'アンモニア（NH3）', '二酸化炭素（CO2）'], answer: 1, explanation: '水に極めてよく溶け、空気より軽いアンモニアは上方置換で集めます！' },
  { id: 'q_halo', expId: 'chem_halogen', question: 'ハロゲン単体の酸化力が強い順番として正しいのは？', options: ['I2 ＞ Br2 ＞ Cl2', 'Cl2 ＞ Br2 ＞ I2', 'Br2 ＞ Cl2 ＞ I2'], answer: 1, explanation: '周期表の上にある元素ほど電子を奪う力（酸化力）が強くなります！' },
  { id: 'q_silver', expId: 'chem_silver', question: 'フェーリング液をアルデヒドと温めたときにできる赤色沈殿の正体は？', options: ['Cu（単体の銅）', 'Cu2O（酸化銅(I)）', 'Ag（銀）'], answer: 1, explanation: 'フェーリング反応では酸化銅(I) Cu2O の赤色沈殿が生じます！' },
  { id: 'q_ester', expId: 'chem_ester', question: '酢酸エチルの合成で「濃硫酸」を加える理由に含まれないものは？', options: ['反応を速める触媒にするため', '水を奪って反応を右に進めるため', '甘い香りをつける香料にするため'], answer: 2, explanation: '濃硫酸は触媒と脱水剤の役割です。甘い香りは生成した酢酸エチルそのものです！' },
  { id: 'q_iodo', expId: 'chem_iodoform', question: '次のうち、ヨードホルム反応で黄色沈殿を生じ「ない」ものはどれ？', options: ['エタノール', 'メタノール', 'アセトン'], answer: 1, explanation: 'メタノールは CH3-CO- も CH3-CH(OH)- も持たないため陰性です！' },
  { id: 'q_azo', expId: 'chem_azo', question: 'アニリンをジアゾ化するときに「5℃以下に氷冷」する理由は？', options: ['室温だとN2を放出してフェノールに分解するため', '凍らせて固体にするため', '色を青くするため'], answer: 0, explanation: 'ジアゾニウム塩は熱に不安定で、温めると窒素を出してフェノールに変わってしまいます！' },
  { id: 'q_prot', expId: 'chem_protein', question: 'タンパク質に濃硝酸を加えて熱し、さらにアンモニア水を加えると橙黄色になる反応は？', options: ['ビウレット反応', 'キサントプロテイン反応', 'ニンヒドリン反応'], answer: 1, explanation: 'ベンゼン環がニトロ化されて黄色→橙黄色になる「キサントプロテイン反応」です！' },
  { id: 'q_nylon', expId: 'chem_nylon', question: 'ナイロン66の合成で、2種類の液体の境界面で室温のまま反応が進む方法を何という？', options: ['付加重合', '界面重縮合', '開環重合'], answer: 1, explanation: '2層の境界面（界面）でHClが脱離しながら縮合するため「界面重縮合」と呼びます！' },
  { id: 'q_mitosis', expId: 'bio_mitosis', question: 'タマネギの体細胞分裂観察で、希塩酸で温める「解離」の一番の目的は？', options: ['細胞どうしの接着をゆるめて1層に広げやすくするため', '染色体を赤く染めるため', '分裂を加速させるため'], answer: 0, explanation: 'ペクチンを溶かして細胞をほぐし、押しつぶしたときに1層に広がるようにします！' },
  { id: 'q_plasmo', expId: 'bio_plasmolysis', question: '植物細胞を濃いスクロース水溶液に浸すと細胞膜が細胞壁から離れる現象を何という？', options: ['溶血', '原形質分離', '原形質流動'], answer: 1, explanation: '水が細胞外へ抜けて細胞膜が縮む「原形質分離」が起こります！' },
  { id: 'q_cat', expId: 'bio_catalase', question: '肝臓片を煮沸してから過酸化水素水に入れても泡が出ない理由は？', options: ['酵素カタラーゼが熱で変性して失活したから', '過酸化水素が蒸発したから', '肝臓の細胞壁が溶けたから'], answer: 0, explanation: '酵素はタンパク質なので、高温で立体構造が壊れて働きを失います（失活）！' },
  { id: 'q_ferm', expId: 'bio_ferment', question: 'キューネ発酵管で発生した気体に NaOH 水溶液を加えて振ると気体が消えた。この気体は？', options: ['酸素（O2）', '二酸化炭素（CO2）', '水素（H2）'], answer: 1, explanation: 'アルカリ性の NaOH 水溶液に吸収されることから二酸化炭素（CO2）とわかります！' },
  { id: 'q_dna', expId: 'bio_dna', question: 'DNA抽出実験で「台所用洗剤」を加える一番の理由は？', options: ['DNAに色をつけるため', '細胞膜や核膜（脂質）を破壊してDNAを外に出すため', '雑菌を殺すため'], answer: 1, explanation: '界面活性剤の働きで脂質二重層からなる細胞膜と核膜を溶かします！' },
  { id: 'q_chro', expId: 'bio_chromato', question: '光合成色素のペーパークロマトグラフィーで、最も上の位置まで移動する色素は？', options: ['クロロフィルb', 'カロテン', 'キサントフィル'], answer: 1, explanation: '上から カロテン → キサントフィル → クロロフィルa → クロロフィルb の順に分かれます！' },
  { id: 'q_stom', expId: 'bio_stomata', question: '乾燥ストレス時に気孔を閉じる働きをする植物ホルモンは？', options: ['オーキシン', 'アブシシン酸', 'ジベレリン'], answer: 1, explanation: 'アブシシン酸が孔辺細胞に働いてK+と水を流し出し、気孔を閉じます！' },
  { id: 'q_photo', expId: 'bio_photosynth', question: '見かけの光合成速度が0（真の光合成速度＝呼吸速度）になる光の強さを何という？', options: ['光飽和点', '補償点', '臨界点'], answer: 1, explanation: 'CO2の吸収と放出がちょうど釣り合う「補償点」です！' },
  { id: 'q_cart', expId: 'phys_cart', question: '50Hzの交流電源を使う記録タイマーで、5打点ごとにテープを切ると1本は何秒分？', options: ['0.05秒', '0.10秒', '0.20秒'], answer: 1, explanation: '1秒間に50打点＝1打点0.02秒なので、5打点で 0.02×5＝0.10秒 になります！' },
  { id: 'q_pend', expId: 'phys_pendulum', question: '単振り子のおもりの重さ（質量）を4倍にすると、周期はどうなる？', options: ['2倍になる', '4倍になる', '変わらない'], answer: 2, explanation: '周期 T = 2π√(l/g) には質量 m が含まれないため、重さを変えても周期は変わりません！' },
  { id: 'q_coll', expId: 'phys_collision', question: '同じ質量の台車どうしが合体（完全非弾性衝突）したとき、衝突後の速さは元の何倍？', options: ['1/2 倍', '1/4 倍', '同じ'], answer: 0, explanation: '運動量保存 mv = (m+m)V より、V = v/2（半分）になります！' },
  { id: 'q_res', expId: 'phys_resonance', question: '気柱の共鳴実験で、1回目と2回目の共鳴位置の差 l2 - l1 は波長 λ の何倍？', options: ['λ / 4 倍', 'λ / 2 倍', 'λ 倍'], answer: 1, explanation: '節から次の節までの距離＝半波長（λ/2）になります！' },
  { id: 'q_young', expId: 'phys_young', question: 'ヤングの実験で、赤い光から青い光（波長が短い）に変えると明線の間隔 Δx はどうなる？', options: ['広くなる', '狭くなる', '変わらない'], answer: 1, explanation: 'Δx = Lλ/d より、波長 λ が短くなると間隔 Δx も狭くなります！' },
  { id: 'q_lens', expId: 'phys_lens', question: '凸レンズの焦点距離 f より「内側」に物体を置いたときに見える像は？', options: ['倒立実像', '正立虚像', '像はできない'], answer: 1, explanation: '虫眼鏡の原理と同じで、拡大された「正立虚像」が見えます！' },
  { id: 'q_ind', expId: 'phys_induction', question: 'コイルの中で磁石を「完全に静止」させると、検流計の針はどうなる？', options: ['ずっと振れたまま', '0に戻る', '逆向きに振れる'], answer: 1, explanation: '磁束が変化しなくなると誘導起電力が 0 になり、電流は止まります！' },
  { id: 'q_bridge', expId: 'phys_bridge', question: 'ホイートストンブリッジ回路で検流計に電流が流れないとき、成り立つ式は？', options: ['R1 + R4 = R2 + R3', 'R1 × R4 = R2 × R3', 'R1 / R4 = R2 / R3'], answer: 1, explanation: '向かい合う抵抗の積（たすき掛け）が等しくなります！' },
  { id: 'q_cap', expId: 'phys_capacitor', question: 'コンデンサーの充電が完全に終わった直後、回路を流れる電流はどうなる？', options: ['最大の電流が流れ続ける', '0 になる', '逆向きに流れる'], answer: 1, explanation: '極板の電圧が電源電圧と等しくなるとそれ以上電荷が移動できず、電流は 0 になります！' },
  { id: 'q_pho', expId: 'phys_photoelec', question: '限界振動数より低い光を金属板に当てたとき、光の「強さ」を100倍にしたら光電子は出る？', options: ['たくさん出る', '1個も出ない', '少しだけ出る'], answer: 1, explanation: '光子1個のエネルギー hν が仕事関数 W 未満なら、光量をいくら増やしても1個も飛び出しません！' }
];
