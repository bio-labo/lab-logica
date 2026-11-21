// ラボ・ロジカ（LAB LOGICA）アプリケーション本体

const STORAGE_KEY = 'lab_logica_state_v1';

const defaultState = {
  completedExps: [],
  quizCleared: [],
  settings: {
    sound: true,
    ruby: true,
    fontSize: 'normal', // 'normal' | 'large'
    guide: true,
    theme: 'light' // 'light' | 'dark'
  }
};

let appState = loadState();
let currentSubject = null;
let currentUnit = null;
let currentExp = null;
let pvRafId = null;
let pvPlaying = false;
let pvElapsed = 0; // seconds (0..16)
let pvLastTimestamp = 0;
const PV_DURATION = 16;
let audioCtx = null;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaultState);
    const parsed = JSON.parse(raw);
    return {
      completedExps: Array.isArray(parsed.completedExps) ? parsed.completedExps : [],
      quizCleared: Array.isArray(parsed.quizCleared) ? parsed.quizCleared : [],
      settings: { ...defaultState.settings, ...(parsed.settings || {}) }
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch {
    // ignore storage errors
  }
}

// Web Audio API 効果音ジェネレーター（外部音声ファイル不要）
function playSound(type) {
  if (!appState.settings.sound) return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.06);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.start(now);
      osc.stop(now + 0.07);
    } else if (type === 'drop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(340, now + 0.1);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
      osc.start(now);
      osc.stop(now + 0.11);
    } else if (type === 'success' || type === 'unlock') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.09); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.18); // G5
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(175, now + 0.12);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch {
    // ignore audio errors
  }
}

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2800);
}

function getAllExperiments() {
  const list = [];
  SUBJECTS_DATA.forEach((subj) => {
    subj.units.forEach((unit) => {
      unit.experiments.forEach((exp) => list.push({ subj, unit, exp }));
    });
  });
  return list;
}

function getUnlockedEquipmentIds() {
  const ids = new Set();
  getAllExperiments().forEach(({ exp }) => {
    if (appState.completedExps.includes(exp.id)) {
      (exp.equipmentIds || []).forEach((id) => ids.add(id));
    }
  });
  return ids;
}

function completeExperiment(exp) {
  const isNew = !appState.completedExps.includes(exp.id);
  if (isNew) {
    appState.completedExps.push(exp.id);
    saveState();
    playSound('unlock');
    showToast('🎉 実験クリア！器具図鑑＆クイズが解放されました！');
  } else {
    playSound('success');
    showToast('✅ 実験を記録しました！');
  }
  updateTitleProgress();
}

function applySettings() {
  const s = appState.settings;
  const root = document.documentElement;
  root.setAttribute('data-theme', s.theme);
  root.setAttribute('data-fontsize', s.fontSize);
  root.setAttribute('data-ruby', s.ruby ? 'on' : 'off');

  // Top bar quick buttons
  document.getElementById('btn-quick-ruby').textContent = `あ ふりがな: ${s.ruby ? 'ON' : 'OFF'}`;
  document.getElementById('btn-quick-font').textContent = `🔍 文字: ${s.fontSize === 'large' ? '大きめ' : '標準'}`;
  document.getElementById('btn-quick-theme').textContent = s.theme === 'dark' ? '🌙 ダーク' : '☀️ ライト';
  document.getElementById('btn-quick-sound').textContent = s.sound ? '🔊 音ON' : '🔇 音OFF';

  // Settings tab buttons
  const setSound = document.getElementById('set-sound');
  setSound.textContent = s.sound ? 'ON' : 'OFF';
  setSound.classList.toggle('on', s.sound);

  const setRuby = document.getElementById('set-ruby');
  setRuby.textContent = s.ruby ? 'ON' : 'OFF';
  setRuby.classList.toggle('on', s.ruby);

  const setFont = document.getElementById('set-font');
  setFont.textContent = s.fontSize === 'large' ? '大きめ' : '標準';
  setFont.classList.toggle('on', s.fontSize === 'large');

  const setGuide = document.getElementById('set-guide');
  setGuide.textContent = s.guide ? 'ON' : 'OFF';
  setGuide.classList.toggle('on', s.guide);

  const setTheme = document.getElementById('set-theme');
  setTheme.textContent = s.theme === 'dark' ? 'ダーク' : 'ライト';
  setTheme.classList.toggle('on', s.theme === 'dark');

  const banner = document.getElementById('sim-guide-banner');
  if (banner) {
    banner.style.display = s.guide ? 'flex' : 'none';
  }
}

function updateTitleProgress() {
  const totalExps = getAllExperiments().length;
  const doneExps = appState.completedExps.length;
  const unlockedEquips = getUnlockedEquipmentIds().size;
  const totalEquips = EQUIPMENT_MASTER.length;
  document.getElementById('title-progress').textContent =
    `体験済み実験：${doneExps} / ${totalExps} ｜ 解放器具：${unlockedEquips} / ${totalEquips}`;
}

function showScreen(screenId) {
  stopPvVideo();
  if (typeof SimCanvas !== 'undefined') SimCanvas.stop();
  document.querySelectorAll('.screen').forEach((el) => el.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 教科選択画面を描画
function renderSubjects() {
  const grid = document.getElementById('subject-grid');
  grid.innerHTML = '';

  SUBJECTS_DATA.forEach((subj) => {
    const exps = [];
    subj.units.forEach((u) => u.experiments.forEach((e) => exps.push(e)));
    const doneCount = exps.filter((e) => appState.completedExps.includes(e.id)).length;

    const btn = document.createElement('button');
    btn.className = `subject-card ${subj.id}`;
    btn.innerHTML = `
      <div class="subject-icon">${subj.icon}</div>
      <h3 class="subject-name">${subj.ruby}</h3>
      <p class="subject-desc">${subj.desc}</p>
      <div class="subject-stat">体験済み：${doneCount} / ${exps.length}</div>
    `;
    btn.addEventListener('click', () => {
      playSound('click');
      currentSubject = subj;
      renderUnits(subj);
      showScreen('screen-units');
    });
    grid.appendChild(btn);
  });
}

// 単元選択画面を描画（教科 → 単元）
function renderUnits(subj) {
  document.getElementById('units-heading').innerHTML = `${subj.icon} ${subj.ruby}の単元をえらぼう`;
  const container = document.getElementById('units-container');
  container.innerHTML = '';

  subj.units.forEach((unit) => {
    const doneCount = unit.experiments.filter((e) => appState.completedExps.includes(e.id)).length;
    const btn = document.createElement('button');
    btn.className = 'unit-card';
    btn.innerHTML = `
      <div style="font-size:1.8em;">📂</div>
      <h3 class="subject-name" style="font-size:1.15em;">${unit.name}</h3>
      <div class="subject-stat">実験数：${unit.experiments.length}（体験済み：${doneCount}）</div>
    `;
    btn.addEventListener('click', () => {
      playSound('click');
      currentUnit = unit;
      renderExperiments(subj, unit);
      showScreen('screen-experiments');
    });
    container.appendChild(btn);
  });
}

// 実験選択画面を描画（単元 → 実験）
function renderExperiments(subj, unit) {
  document.getElementById('experiments-heading').innerHTML = `${subj.icon} ${unit.name}`;
  const container = document.getElementById('experiments-container');
  container.innerHTML = '';

  unit.experiments.forEach((exp) => {
    const isDone = appState.completedExps.includes(exp.id);
    const badgeHtml = isDone
      ? `<span class="badge badge-done">✅ 体験済み</span>`
      : exp.playable
      ? `<span class="badge badge-playable">🧪 実験体験OK</span>`
      : `<span class="badge badge-plan">🎬 動画先行公開</span>`;

    const card = document.createElement('div');
    card.className = 'exp-card';
    card.innerHTML = `
      <div class="exp-card-top">
        <h4 class="exp-name">${exp.name}</h4>
        ${badgeHtml}
      </div>
      <p class="exp-summary">${exp.summary}</p>
      <div class="exp-actions">
        <button class="action-btn sim" ${exp.playable ? '' : 'disabled'}>
          🧪 ${exp.playable ? '実際に実験する' : '体験版準備中'}
        </button>
        <button class="action-btn video">🎬 動画を視聴する</button>
      </div>
    `;

    const simBtn = card.querySelector('.action-btn.sim');
    if (exp.playable) {
      simBtn.addEventListener('click', () => {
        playSound('click');
        openSimulation(exp);
      });
    }

    card.querySelector('.action-btn.video').addEventListener('click', () => {
      playSound('click');
      openVideo(exp);
    });

    container.appendChild(card);
  });
}

// ==========================================
// 実験シミュレーションエンジン
// ==========================================
function openSimulation(exp) {
  currentExp = exp;
  document.getElementById('sim-heading').innerHTML = `🧪 ${exp.name}`;
  const pointBox = document.getElementById('sim-point-box');
  pointBox.style.display = 'block';
  pointBox.innerHTML = `<strong>📌 ポイント：</strong>${exp.points[0]}`;

  showScreen('screen-sim');

  if (exp.simType === 'neutralization') initNeutralizationSim(exp);
  else if (exp.simType === 'flame') initFlameSim(exp);
  else if (exp.simType === 'precipitate') initPrecipitateSim(exp);
  else if (exp.simType === 'microscope') initMicroscopeSim(exp);
  else if (exp.simType === 'resonance') initResonanceSim(exp);
  else if (exp.simType === 'induction') initInductionSim(exp);
  else if (exp.simType === 'step_lab') initStepLabSim(exp);
  else if (exp.simType === 'slider_lab') initSliderLabSim(exp);
}

// 7. 汎用ステップ体験型シミュレーター（60fps Canvasアニメーション連動）
function initStepLabSim(exp) {
  const cfg = exp.simConfig;
  const stages = cfg.stages || [];
  let activeIdx = -1;
  const visited = new Set();
  let completed = false;

  const stageEl = document.getElementById('sim-stage');
  const readout = document.getElementById('sim-readout');
  const controls = document.getElementById('sim-controls');

  setGuide(cfg.guide || '下の操作ボタンを順番に試して反応を確かめよう！');

  stageEl.innerHTML = `
    <canvas id="sim-anim-canvas" width="320" height="190" style="width:100%; max-width:360px; border-radius:14px; border:2px solid var(--border-color); background:#0f172a;"></canvas>
    <div id="step-status-text" style="font-weight:900; text-align:center; max-width:540px;">下のボタンを押して実験操作を行おう！</div>
  `;

  SimCanvas.start('sim-anim-canvas', (ctx, W, H, t) => {
    const curr = activeIdx >= 0 ? stages[activeIdx] : null;
    SimCanvas.drawStepScene(exp.id, ctx, W, H, t, activeIdx, curr);
  });

  function renderControls() {
    const curr = activeIdx >= 0 ? stages[activeIdx] : null;
    const stText = document.getElementById('step-status-text');
    if (stText) {
      stText.textContent = curr ? curr.text : '下のボタンを押して実験操作を行おう！';
    }

    readout.innerHTML = `<div class="readout-chip">確認済みステップ：${visited.size} / ${stages.length}</div>`;

    controls.innerHTML = '';
    stages.forEach((st, idx) => {
      const b = document.createElement('button');
      b.className = `lab-btn ${activeIdx === idx ? 'success' : ''}`;
      b.textContent = `${visited.has(idx) ? '✅ ' : ''}${st.label}`;
      b.onclick = () => {
        playSound('drop');
        activeIdx = idx;
        visited.add(idx);
        if (visited.size >= stages.length && !completed) {
          completed = true;
          completeExperiment(exp);
        }
        renderControls();
      };
      controls.appendChild(b);
    });
  }

  renderControls();
}

// 8. 汎用スライダー調整型シミュレーター（60fps Canvasアニメーション連動）
function initSliderLabSim(exp) {
  const cfg = exp.simConfig;
  let val = cfg.initial;
  let completed = false;

  const stageEl = document.getElementById('sim-stage');
  const readout = document.getElementById('sim-readout');
  const controls = document.getElementById('sim-controls');

  setGuide(cfg.guide || 'スライダーを動かして数値と現象の変化を観察しよう！');

  const stepAttr = Number.isInteger(cfg.min) && Number.isInteger(cfg.max) ? '1' : '0.05';

  stageEl.innerHTML = `
    <canvas id="sim-anim-canvas" width="320" height="190" style="width:100%; max-width:360px; border-radius:14px; border:2px solid var(--border-color); background:#0f172a;"></canvas>
    <div id="sl-status" style="font-weight:900; text-align:center; max-width:560px;"></div>
    <div style="width:100%; max-width:340px;">
      <label style="font-weight:800; display:block; margin-bottom:4px;">${cfg.label}：</label>
      <input type="range" id="sl-input" min="${cfg.min}" max="${cfg.max}" step="${stepAttr}" value="${val}" style="width:100%;">
    </div>
  `;

  controls.innerHTML = '';

  SimCanvas.start('sim-anim-canvas', (ctx, W, H, t) => {
    SimCanvas.drawSliderScene(exp.id, ctx, W, H, t, val);
  });

  function update() {
    const info = cfg.describe(val);
    const stEl = document.getElementById('sl-status');
    if (stEl) {
      stEl.textContent = info.status;
    }
    readout.innerHTML = `<div class="readout-chip">${cfg.label}：${val} ${cfg.unit}</div>`;

    if (cfg.targetCheck && cfg.targetCheck(val) && !completed) {
      completed = true;
      completeExperiment(exp);
    }
  }

  document.getElementById('sl-input').addEventListener('input', (e) => {
    val = Number(e.target.value);
    update();
  });

  update();
}

function setGuide(text) {
  document.getElementById('sim-guide-text').textContent = text;
}

// 1. 中和滴定シミュレーター
function initNeutralizationSim(exp) {
  let btbAdded = false;
  let naohDrops = 0; // 10 drops = exact neutral (pH 7)
  let completed = false;

  const stage = document.getElementById('sim-stage');
  const readout = document.getElementById('sim-readout');
  const controls = document.getElementById('sim-controls');

  function render() {
    let liquidColor = 'rgba(226, 232, 240, 0.55)'; // 無色透明
    let stateLabel = '無色透明（BTB未投入）';
    let phVal = '1.0';

    if (btbAdded) {
      if (naohDrops < 10) {
        liquidColor = '#facc15'; // 黄色
        stateLabel = '🟡 黄色（酸性）';
        phVal = (1.0 + naohDrops * 0.45).toFixed(1);
      } else if (naohDrops === 10) {
        liquidColor = '#22c55e'; // 緑色
        stateLabel = '🟢 緑色（ちょうど中性・中和点！）';
        phVal = '7.0';
      } else {
        liquidColor = '#2563eb'; // 青色
        stateLabel = '🔵 青色（塩基性）';
        phVal = Math.min(13.0, 9.5 + (naohDrops - 10) * 0.5).toFixed(1);
      }
    }

    const heightPct = 35 + Math.min(naohDrops * 2.5, 45);
    stage.innerHTML = `
      <div style="font-size:0.9em; font-weight:800; color:var(--text-sub);">ビュレットから NaOH を滴下</div>
      <div style="font-size:1.5em;">💧</div>
      <div class="beaker-wrap">
        <div class="beaker-liquid" style="height:${heightPct}%; background-color:${liquidColor};"></div>
      </div>
      <div style="font-weight:900; font-size:1.1em;">${stateLabel}</div>
    `;

    readout.innerHTML = `
      <div class="readout-chip">滴下量：${naohDrops} mL</div>
      <div class="readout-chip">pH：${phVal}</div>
    `;

    controls.innerHTML = '';

    if (!btbAdded) {
      setGuide('まずは「BTB溶液を入れる」を押して指示薬を加えよう！');
      const btnBtb = document.createElement('button');
      btnBtb.className = 'lab-btn';
      btnBtb.textContent = '💧 BTB溶液を入れる';
      btnBtb.onclick = () => {
        playSound('drop');
        btbAdded = true;
        render();
      };
      controls.appendChild(btnBtb);
    } else {
      if (naohDrops < 10) {
        setGuide('水酸化ナトリウム（NaOH）を1mLずつ滴下して、緑色（中和点）を目指そう！');
      } else if (naohDrops === 10) {
        setGuide('バッチリ！緑色（中和点）になりました！そのまま完了するか、さらに足して変化も見よう！');
        if (!completed) {
          completed = true;
          completeExperiment(exp);
        }
      } else {
        setGuide('OH-が余って青色（塩基性）になりました！リセットして何度でも試せます。');
      }

      const btnDrop = document.createElement('button');
      btnDrop.className = 'lab-btn';
      btnDrop.textContent = '💧 NaOHを 1mL 滴下';
      btnDrop.onclick = () => {
        playSound('drop');
        naohDrops++;
        render();
      };
      controls.appendChild(btnDrop);
    }

    const btnReset = document.createElement('button');
    btnReset.className = 'lab-btn secondary';
    btnReset.textContent = '🔄 やり直す';
    btnReset.onclick = () => {
      playSound('click');
      btbAdded = false;
      naohDrops = 0;
      render();
    };
    controls.appendChild(btnReset);
  }

  render();
}

// 2. 炎色反応シミュレーター
function initFlameSim(exp) {
  const elements = [
    { key: 'Li', name: 'Li（リチウム）', color: '#ef4444', label: '🔴 赤色（深赤色）' },
    { key: 'Na', name: 'Na（ナトリウム）', color: '#facc15', label: '🟡 黄色' },
    { key: 'K', name: 'K（カリウム）', color: '#c084fc', label: '🟣 赤紫色（淡紫）' },
    { key: 'Cu', name: 'Cu（銅）', color: '#10b981', label: '🟢 青緑色' },
    { key: 'Ca', name: 'Ca（カルシウム）', color: '#fb923c', label: '🟠 橙赤色' },
    { key: 'Ba', name: 'Ba（バリウム）', color: '#a3e635', label: '💚 黄緑色' }
  ];

  let tested = new Set();
  let currentElem = null;

  const stage = document.getElementById('sim-stage');
  const readout = document.getElementById('sim-readout');
  const controls = document.getElementById('sim-controls');

  function render() {
    const flameStyle = currentElem
      ? `background: radial-gradient(circle at bottom, #ffffff, ${currentElem.color} 55%, transparent 95%); filter: drop-shadow(0 0 18px ${currentElem.color});`
      : '';

    stage.innerHTML = `
      <div class="flame-burner" style="height:120px;">
        <div class="flame-cone" style="${flameStyle}"></div>
      </div>
      <div style="width:70px; height:14px; background:#475569; border-radius:4px;"></div>
      <div style="font-weight:900; font-size:1.15em;">
        ${currentElem ? `${currentElem.name} → ${currentElem.label}` : '元の青い炎（外炎）'}
      </div>
    `;

    readout.innerHTML = `
      <div class="readout-chip">確認した元素：${tested.size} / ${elements.length}</div>
    `;

    setGuide(
      tested.size >= 3
        ? 'いろいろな炎色反応を確認できました！残りの元素も試してみよう！'
        : '下の金属イオンボタンを押して、ガスバーナーの炎に近づけよう（3種類以上で実験クリア！）'
    );

    controls.innerHTML = '';
    elements.forEach((el) => {
      const b = document.createElement('button');
      b.className = 'lab-btn';
      b.style.background = el.key === currentElem?.key ? '#0f172a' : '';
      b.textContent = `${tested.has(el.key) ? '✅ ' : '🔥 '}${el.name}`;
      b.onclick = () => {
        playSound('drop');
        currentElem = el;
        tested.add(el.key);
        if (tested.size === 3) {
          completeExperiment(exp);
        }
        render();
      };
      controls.appendChild(b);
    });
  }

  render();
}

// 3. 金属イオン沈殿・錯イオン・系統分離フルシミュレーター（9イオン×9試薬）
function initPrecipitateSim(exp) {
  const ions = {
    Ag: { name: 'Ag+', label: 'Ag+（銀）', baseColor: 'rgba(226,232,240,0.4)' },
    Pb: { name: 'Pb2+', label: 'Pb2+（鉛II）', baseColor: 'rgba(226,232,240,0.4)' },
    Cu: { name: 'Cu2+', label: 'Cu2+（銅II）', baseColor: 'rgba(56,189,248,0.45)' },
    Fe2: { name: 'Fe2+', label: 'Fe2+（鉄II）', baseColor: 'rgba(134,239,172,0.45)' },
    Fe3: { name: 'Fe3+', label: 'Fe3+（鉄III）', baseColor: 'rgba(251,191,36,0.5)' },
    Al: { name: 'Al3+', label: 'Al3+（アルミニウム）', baseColor: 'rgba(226,232,240,0.4)' },
    Zn: { name: 'Zn2+', label: 'Zn2+（亜鉛）', baseColor: 'rgba(226,232,240,0.4)' },
    Ba: { name: 'Ba2+', label: 'Ba2+（バリウム）', baseColor: 'rgba(226,232,240,0.4)' },
    Ca: { name: 'Ca2+', label: 'Ca2+（カルシウム）', baseColor: 'rgba(226,232,240,0.4)' }
  };

  const reagents = [
    { id: 'hcl', label: '💧 塩酸（Cl-）' },
    { id: 'naoh_s', label: '💧 NaOH（少量）' },
    { id: 'naoh_ex', label: '🌊 NaOH（過剰）' },
    { id: 'nh3_s', label: '💧 NH3水（少量）' },
    { id: 'nh3_ex', label: '🌊 NH3水（過剰）' },
    { id: 'h2s_acid', label: '🫧 H2S（酸性）' },
    { id: 'h2s_base', label: '🫧 H2S（塩基性）' },
    { id: 'so4', label: '💧 希硫酸（SO4^2-）' },
    { id: 'cro4', label: '🟡 K2CrO4（CrO4^2-）' }
  ];

  // 反応マトリクス：{ precipC, precipH, liq, desc }
  const P_WHITE = '#f8fafc';
  const P_BLACK = '#1e293b';
  const P_BROWN = '#854d0e';
  const P_REDBROWN = '#9a3412';
  const P_BLUEWHITE = '#38bdf8';
  const P_GREENWHITE = '#86efac';
  const P_YELLOW = '#facc15';

  const reactions = {
    Ag: {
      hcl: { c: P_WHITE, desc: '⚪ 白色沈殿（AgCl）※希硝酸に溶けないが、NH3水に溶ける！' },
      naoh_s: { c: P_BROWN, desc: '🟤 褐色沈殿（酸化銀 Ag2O）※AgOHが不安定ですぐ分解' },
      naoh_ex: { c: P_BROWN, desc: '🟤 褐色沈殿のまま（両性ではないので過剰NaOHに不溶）' },
      nh3_s: { c: P_BROWN, desc: '🟤 褐色沈殿（Ag2O）ができた！' },
      nh3_ex: { c: null, liq: 'rgba(226,232,240,0.25)', desc: '✨ 無色透明に再溶解！（錯イオン [Ag(NH3)2]+）' },
      h2s_acid: { c: P_BLACK, desc: '⚫ 黒色沈殿（Ag2S）※酸性でも沈殿！' },
      h2s_base: { c: P_BLACK, desc: '⚫ 黒色沈殿（Ag2S）' },
      so4: { c: null, desc: '変化なし（Ag2SO4は少溶だが希硫酸では通常沈殿しない）' },
      cro4: { c: P_REDBROWN, desc: '🟫 赤褐色沈殿（Ag2CrO4：クロム酸銀）！' }
    },
    Pb: {
      hcl: { c: P_WHITE, desc: '⚪ 白色沈殿（PbCl2）※「熱湯」には溶けるのがポイント！' },
      naoh_s: { c: P_WHITE, desc: '⚪ 白色沈殿（Pb(OH)2）' },
      naoh_ex: { c: null, liq: 'rgba(226,232,240,0.25)', desc: '✨ 無色透明に再溶解！（両性水酸化物 → [Pb(OH)4]2-）' },
      nh3_s: { c: P_WHITE, desc: '⚪ 白色沈殿（Pb(OH)2）' },
      nh3_ex: { c: P_WHITE, desc: '⚪ 白色沈殿のまま（Pb2+はNH3錯イオンを作らない！）' },
      h2s_acid: { c: P_BLACK, desc: '⚫ 黒色沈殿（PbS）※酸性でも沈殿！' },
      h2s_base: { c: P_BLACK, desc: '⚫ 黒色沈殿（PbS）' },
      so4: { c: P_WHITE, desc: '⚪ 白色沈殿（PbSO4）' },
      cro4: { c: P_YELLOW, desc: '🟡 黄色沈殿（PbCrO4：クロム酸鉛）！' }
    },
    Cu: {
      hcl: { c: null, desc: '変化なし（青い溶液のまま）' },
      naoh_s: { c: P_BLUEWHITE, desc: '🩵 青白色沈殿（Cu(OH)2）' },
      naoh_ex: { c: P_BLUEWHITE, desc: '🩵 青白色沈殿のまま（過剰NaOHに溶けない）' },
      nh3_s: { c: P_BLUEWHITE, desc: '🩵 青白色沈殿（Cu(OH)2）' },
      nh3_ex: { c: null, liq: '#1e3a8a', desc: '🔵 「深青色」に再溶解！（錯イオン [Cu(NH3)4]2+）' },
      h2s_acid: { c: P_BLACK, desc: '⚫ 黒色沈殿（CuS）※酸性でも沈殿！' },
      h2s_base: { c: P_BLACK, desc: '⚫ 黒色沈殿（CuS）' },
      so4: { c: null, desc: '変化なし（青色溶液のまま）' },
      cro4: { c: null, desc: '試験頻出の難溶性クロム酸塩ではない（変化なし扱い）' }
    },
    Fe2: {
      hcl: { c: null, desc: '変化なし（淡緑色溶液のまま）' },
      naoh_s: { c: P_GREENWHITE, desc: '🥬 緑白色沈殿（Fe(OH)2）※空気中で酸化すると赤褐色へ' },
      naoh_ex: { c: P_GREENWHITE, desc: '🥬 緑白色沈殿のまま（過剰NaOHに不溶）' },
      nh3_s: { c: P_GREENWHITE, desc: '🥬 緑白色沈殿（Fe(OH)2）' },
      nh3_ex: { c: P_GREENWHITE, desc: '🥬 緑白色沈殿のまま（NH3過剰に不溶）' },
      h2s_acid: { c: null, desc: '❌ 沈殿しない！（イオン化傾向が比較的大きいため酸性では溶ける）' },
      h2s_base: { c: P_BLACK, desc: '⚫ 黒色沈殿（FeS）※塩基性なら沈殿する！' },
      so4: { c: null, desc: '変化なし' },
      cro4: { c: null, desc: '変化なし' }
    },
    Fe3: {
      hcl: { c: null, desc: '変化なし（黄褐色溶液のまま）' },
      naoh_s: { c: P_REDBROWN, desc: '🟫 赤褐色沈殿（Fe(OH)3）' },
      naoh_ex: { c: P_REDBROWN, desc: '🟫 赤褐色沈殿のまま（過剰NaOHに不溶）' },
      nh3_s: { c: P_REDBROWN, desc: '🟫 赤褐色沈殿（Fe(OH)3）' },
      nh3_ex: { c: P_REDBROWN, desc: '🟫 赤褐色沈殿のまま（NH3過剰に不溶）' },
      h2s_acid: { c: P_WHITE, desc: '⚪ 硫化物は沈殿しないが、Fe3+が還元され単体の硫黄 S（白濁）が析出！' },
      h2s_base: { c: P_BLACK, desc: '⚫ 黒色沈殿（FeS / Fe2S3）' },
      so4: { c: null, desc: '変化なし' },
      cro4: { c: null, desc: '変化なし' }
    },
    Al: {
      hcl: { c: null, desc: '変化なし' },
      naoh_s: { c: P_WHITE, desc: '⚪ 白色ゲル状沈殿（Al(OH)3）' },
      naoh_ex: { c: null, liq: 'rgba(226,232,240,0.25)', desc: '✨ 無色透明に再溶解！（両性水酸化物 → [Al(OH)4]-）' },
      nh3_s: { c: P_WHITE, desc: '⚪ 白色ゲル状沈殿（Al(OH)3）' },
      nh3_ex: { c: P_WHITE, desc: '⚪ 白色沈殿のまま！（Al3+はNH3錯イオンを作らない！）' },
      h2s_acid: { c: null, desc: '❌ 沈殿しない！' },
      h2s_base: { c: P_WHITE, desc: '⚪ 硫化物ではなく白色沈殿 Al(OH)3 が生じる！' },
      so4: { c: null, desc: '変化なし' },
      cro4: { c: null, desc: '変化なし' }
    },
    Zn: {
      hcl: { c: null, desc: '変化なし' },
      naoh_s: { c: P_WHITE, desc: '⚪ 白色沈殿（Zn(OH)2）' },
      naoh_ex: { c: null, liq: 'rgba(226,232,240,0.25)', desc: '✨ 無色透明に再溶解！（両性水酸化物 → [Zn(OH)4]2-）' },
      nh3_s: { c: P_WHITE, desc: '⚪ 白色沈殿（Zn(OH)2）' },
      nh3_ex: { c: null, liq: 'rgba(226,232,240,0.25)', desc: '✨ 無色透明に再溶解！（錯イオン [Zn(NH3)4]2+）' },
      h2s_acid: { c: null, desc: '❌ 酸性では沈殿しない！（Zn2+は塩基性で沈殿）' },
      h2s_base: { c: P_WHITE, desc: '⚪ 珍しい「白色」の硫化物沈殿（ZnS）！！' },
      so4: { c: null, desc: '変化なし' },
      cro4: { c: null, desc: '変化なし' }
    },
    Ba: {
      hcl: { c: null, desc: '変化なし' },
      naoh_s: { c: null, desc: '❌ 沈殿しない！（アルカリ土類金属の水酸化物は強塩基で水溶性）' },
      naoh_ex: { c: null, desc: '❌ 沈殿しない！' },
      nh3_s: { c: null, desc: '❌ 沈殿しない！' },
      nh3_ex: { c: null, desc: '❌ 沈殿しない！' },
      h2s_acid: { c: null, desc: '❌ 沈殿しない！' },
      h2s_base: { c: null, desc: '❌ 沈殿しない！' },
      so4: { c: P_WHITE, desc: '⚪ 白色沈殿（BaSO4）※酸にも溶けない超安定沈殿！' },
      cro4: { c: P_YELLOW, desc: '🟡 黄色沈殿（BaCrO4）！' }
    },
    Ca: {
      hcl: { c: null, desc: '変化なし' },
      naoh_s: { c: null, desc: '❌ ほぼ沈殿しない（高濃度ではCa(OH)2が少し白濁）' },
      naoh_ex: { c: null, desc: '❌ ほぼ沈殿しない' },
      nh3_s: { c: null, desc: '❌ 沈殿しない！' },
      nh3_ex: { c: null, desc: '❌ 沈殿しない！' },
      h2s_acid: { c: null, desc: '❌ 沈殿しない！' },
      h2s_base: { c: null, desc: '❌ 沈殿しない！' },
      so4: { c: P_WHITE, desc: '⚪ 白色沈殿（CaSO4）' },
      cro4: { c: null, desc: '❌ CaCrO4は水に溶けるため沈殿しない！（Ba2+との見分けに使える）' }
    }
  };

  let selectedIon = 'Cu';
  let selectedReagent = null;
  const testedCombos = new Set();
  let completed = false;

  const stage = document.getElementById('sim-stage');
  const readout = document.getElementById('sim-readout');
  const controls = document.getElementById('sim-controls');

  function render() {
    const ionObj = ions[selectedIon];
    const rxn = selectedReagent ? reactions[selectedIon][selectedReagent] : null;
    const liqColor = rxn && rxn.liq ? rxn.liq : ionObj.baseColor;
    const precipH = rxn && rxn.c ? '34px' : '0px';
    const precipC = rxn && rxn.c ? rxn.c : 'transparent';
    const desc = rxn ? rxn.desc : `${ionObj.label} の水溶液（下の試薬を選んで加えよう！）`;

    stage.innerHTML = `
      <div class="beaker-wrap">
        <div class="beaker-liquid" style="height:65%; background-color:${liqColor};">
          <div class="precipitate-layer" style="height:${precipH}; background-color:${precipC};"></div>
        </div>
      </div>
      <div style="font-weight:900; text-align:center; max-width:560px;">${desc}</div>
    `;

    readout.innerHTML = `
      <div class="readout-chip">選択イオン：${ionObj.label}</div>
      <div class="readout-chip">試した組み合わせ：${testedCombos.size} 通り</div>
    `;

    setGuide(
      testedCombos.size >= 5
        ? 'いろいろな沈殿＆再溶解パターンを試せました！他のイオン・試薬も自由に検証しよう！'
        : '①上の段で「金属イオン」を選び、②下の段で「試薬」を加えて反応を見よう（5通り以上でクリア！）'
    );

    controls.innerHTML = '';

    // 1. Ion Buttons Row
    const ionLabel = document.createElement('div');
    ionLabel.style.cssText = 'width:100%; font-weight:800; font-size:0.88em; text-align:center; color:var(--text-sub);';
    ionLabel.textContent = '① 調べる金属イオンをえらぶ：';
    controls.appendChild(ionLabel);

    Object.keys(ions).forEach((k) => {
      const b = document.createElement('button');
      b.className = `lab-btn ${selectedIon === k ? 'success' : 'secondary'}`;
      b.style.padding = '8px 12px';
      b.style.fontSize = '0.88em';
      b.textContent = ions[k].label;
      b.onclick = () => {
        playSound('click');
        selectedIon = k;
        selectedReagent = null;
        render();
      };
      controls.appendChild(b);
    });

    // 2. Reagent Buttons Row
    const regLabel = document.createElement('div');
    regLabel.style.cssText = 'width:100%; font-weight:800; font-size:0.88em; text-align:center; color:var(--text-sub); margin-top:6px;';
    regLabel.textContent = '② 加える試薬をえらぶ：';
    controls.appendChild(regLabel);

    reagents.forEach((rg) => {
      const b = document.createElement('button');
      b.className = 'lab-btn';
      b.style.padding = '9px 12px';
      b.style.fontSize = '0.88em';
      if (selectedReagent === rg.id) b.style.outline = '3px solid #f59e0b';
      b.textContent = rg.label;
      b.onclick = () => {
        playSound('drop');
        selectedReagent = rg.id;
        testedCombos.add(`${selectedIon}_${rg.id}`);
        if (testedCombos.size >= 5 && !completed) {
          completed = true;
          completeExperiment(exp);
        }
        render();
      };
      controls.appendChild(b);
    });
  }

  render();
}

// 4. 顕微鏡（体細胞分裂）シミュレーター
function initMicroscopeSim(exp) {
  let zoom = 100; // 100 or 400
  let focus = 20; // target is 75
  let completed = false;

  const stage = document.getElementById('sim-stage');
  const readout = document.getElementById('sim-readout');
  const controls = document.getElementById('sim-controls');

  function updateVisualOnly() {
    const blurAmt = Math.abs(focus - 75) * 0.16;
    const scaleVal = zoom === 400 ? 1.55 : 1.0;
    const cells = document.getElementById('micro-cells');
    if (cells) {
      cells.style.filter = `blur(${blurAmt.toFixed(1)}px)`;
      cells.style.transform = `scale(${scaleVal})`;
    }
    const isSharp = Math.abs(focus - 75) <= 6;
    const msg = document.getElementById('micro-status');
    if (msg) {
      msg.textContent = isSharp && zoom === 400
        ? '✨ クッキリ見える！中期・後期の染色体がはっきり観察できた！'
        : isSharp
        ? '👌 ピントが合った！次は「高倍率（400倍）」にしてみよう！'
        : '🔍 スライダーを動かしてピントを合わせよう（ぼやけています）';
    }
    readout.innerHTML = `
      <div class="readout-chip">倍率：${zoom}倍</div>
      <div class="readout-chip">ピント：${isSharp ? '良好' : '調整中'}</div>
    `;
    if (isSharp && zoom === 400 && !completed) {
      completed = true;
      completeExperiment(exp);
    }
  }

  stage.innerHTML = `
    <div class="microscope-view">
      <div class="microscope-cells" id="micro-cells">🧬🔴🦠<br>🔴🧬🧫</div>
    </div>
    <div id="micro-status" style="font-weight:900; text-align:center;"></div>
    <div style="width:100%; max-width:300px;">
      <label style="font-weight:800; display:block; margin-bottom:4px;">ピント調整ねじ：</label>
      <input type="range" id="focus-slider" min="0" max="100" value="${focus}" style="width:100%;">
    </div>
  `;

  controls.innerHTML = '';
  const btnLow = document.createElement('button');
  btnLow.className = 'lab-btn';
  btnLow.textContent = '🔎 低倍率（100倍）';
  btnLow.onclick = () => { playSound('click'); zoom = 100; updateVisualOnly(); };

  const btnHigh = document.createElement('button');
  btnHigh.className = 'lab-btn success';
  btnHigh.textContent = '🔬 高倍率（400倍）';
  btnHigh.onclick = () => { playSound('click'); zoom = 400; updateVisualOnly(); };

  controls.appendChild(btnLow);
  controls.appendChild(btnHigh);

  document.getElementById('focus-slider').addEventListener('input', (e) => {
    focus = Number(e.target.value);
    updateVisualOnly();
  });

  setGuide('まずピント調整スライダーでくっきりさせて、高倍率（400倍）で染色体を観察しよう！');
  updateVisualOnly();
}

// 5. 気柱の共鳴シミュレーター
function initResonanceSim(exp) {
  let depth = 10; // cm (Resonance at 18cm and 54cm)
  let found1 = false;
  let found2 = false;
  let completed = false;

  const stage = document.getElementById('sim-stage');
  const readout = document.getElementById('sim-readout');
  const controls = document.getElementById('sim-controls');

  function update() {
    const near1 = Math.abs(depth - 18) <= 2;
    const near2 = Math.abs(depth - 54) <= 2;
    const isRes = near1 || near2;
    if (near1) found1 = true;
    if (near2) found2 = true;

    const tube = document.getElementById('res-water');
    if (tube) {
      tube.style.height = `${Math.max(10, 100 - depth)}%`;
    }
    const label = document.getElementById('res-label');
    if (label) {
      label.textContent = isRes
        ? '🔊 ボォォォン！！大きく共鳴した！（定常波発生！）'
        : '〰️ 小さな音...（水面を動かして共鳴点を探そう）';
      label.style.color = isRes ? '#16a34a' : '';
    }
    readout.innerHTML = `
      <div class="readout-chip">水面までの深さ：${depth} cm</div>
      <div class="readout-chip">発見した共鳴点：${(found1 ? 1 : 0) + (found2 ? 1 : 0)} / 2</div>
    `;

    if (found1 && found2 && !completed) {
      completed = true;
      completeExperiment(exp);
    }
  }

  stage.innerHTML = `
    <div style="font-size:2em;">🔔</div>
    <div class="beaker-wrap" style="width:70px; height:160px;">
      <div class="beaker-liquid" id="res-water" style="background:#38bdf8; height:90%;"></div>
    </div>
    <div id="res-label" style="font-weight:900; text-align:center;"></div>
    <div style="width:100%; max-width:320px;">
      <label style="font-weight:800; display:block; margin-bottom:4px;">水面の位置（10cm 〜 65cm）：</label>
      <input type="range" id="res-slider" min="10" max="65" value="${depth}" style="width:100%;">
    </div>
  `;

  controls.innerHTML = '';
  document.getElementById('res-slider').addEventListener('input', (e) => {
    depth = Number(e.target.value);
    if (Math.abs(depth - 18) <= 2 || Math.abs(depth - 54) <= 2) {
      playSound('drop');
    }
    update();
  });

  setGuide('スライダーで水面を上下させて、2か所の共鳴する深さ（約18cm と 約54cm）を見つけよう！');
  update();
}

// 6. 電磁誘導シミュレーター
function initInductionSim(exp) {
  let stepsDone = 0;
  let completed = false;

  const stage = document.getElementById('sim-stage');
  const readout = document.getElementById('sim-readout');
  const controls = document.getElementById('sim-controls');

  function triggerMove(dirLabel, angle, bulbOn) {
    stepsDone++;
    const needle = document.getElementById('galv-needle');
    const bulb = document.getElementById('ind-bulb');
    const status = document.getElementById('ind-status');

    if (needle) needle.style.transform = `rotate(${angle}deg)`;
    if (bulb) bulb.textContent = bulbOn ? '💡✨' : '🌑';
    if (status) status.textContent = dirLabel;

    if (bulbOn) {
      playSound('drop');
      setTimeout(() => {
        if (needle) needle.style.transform = 'rotate(0deg)';
        if (bulb) bulb.textContent = '🌑';
      }, 900);
    } else {
      playSound('click');
    }

    if (stepsDone >= 3 && !completed) {
      completed = true;
      completeExperiment(exp);
    }
    readout.innerHTML = `<div class="readout-chip">実験操作回数：${stepsDone} 回</div>`;
  }

  stage.innerHTML = `
    <div style="display:flex; align-items:center; gap:24px; flex-wrap:wrap; justify-content:center;">
      <div style="text-align:center;">
        <div style="font-size:2.4em;">🧲🌀</div>
        <div style="font-weight:800;">コイルと棒磁石</div>
      </div>
      <div style="text-align:center;">
        <div style="width:90px; height:90px; border-radius:50%; border:4px solid #334155; background:#fff; position:relative; display:flex; align-items:center; justify-content:center;">
          <div id="galv-needle" style="width:4px; height:36px; background:#dc2626; transform-origin:bottom center; transition:transform 0.25s ease; position:absolute; bottom:45px;"></div>
        </div>
        <div style="font-weight:800;">検流計</div>
      </div>
      <div style="text-align:center;">
        <div id="ind-bulb" style="font-size:2.4em;">🌑</div>
        <div style="font-weight:800;">豆電球</div>
      </div>
    </div>
    <div id="ind-status" style="font-weight:900; text-align:center;">ボタンを押して磁石を動かそう！</div>
  `;

  readout.innerHTML = `<div class="readout-chip">実験操作回数：0 回</div>`;
  setGuide('N極を「近づける」「止める」「引き抜く」の3パターンを試してみよう！');

  controls.innerHTML = '';
  const actions = [
    { label: '➡️ N極を近づける', msg: '⚡ 右向きに誘導電流が流れた！', angle: 42, on: true },
    { label: '⏸️ 磁石を止める', msg: '⏸️ 磁束が変化しないので電流 0！', angle: 0, on: false },
    { label: '⬅️ N極を素早く引き抜く', msg: '⚡⚡ 左向きに強い誘導電流が流れた！', angle: -55, on: true }
  ];

  actions.forEach((act) => {
    const b = document.createElement('button');
    b.className = 'lab-btn';
    b.textContent = act.label;
    b.onclick = () => triggerMove(act.msg, act.angle, act.on);
    controls.appendChild(b);
  });
}

// ==========================================
// 動画視聴画面（PV風60fps Canvasアニメ＋オンライン検索）
// ==========================================
function stripRubyHtml(html) {
  return html.replace(/<rt>.*?<\/rt>/g, '').replace(/<[^>]+>/g, '');
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = Array.from(text);
  let line = '';
  let currY = y;
  for (let i = 0; i < chars.length; i++) {
    const testLine = line + chars[i];
    if (ctx.measureText(testLine).width > maxWidth && i > 0) {
      ctx.fillText(line, x, currY);
      line = chars[i];
      currY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) ctx.fillText(line, x, currY);
}

function stopPvVideo() {
  pvPlaying = false;
  if (pvRafId) {
    cancelAnimationFrame(pvRafId);
    pvRafId = null;
  }
  const btn = document.getElementById('btn-pv-play');
  if (btn) btn.textContent = '▶ 再生';
}

function startPvVideo() {
  if (pvPlaying) return;
  pvPlaying = true;
  pvLastTimestamp = performance.now();
  const btn = document.getElementById('btn-pv-play');
  if (btn) btn.textContent = '⏸ 一時停止';

  function loop(now) {
    if (!pvPlaying) return;
    const dt = (now - pvLastTimestamp) / 1000;
    pvLastTimestamp = now;
    pvElapsed += dt;
    if (pvElapsed >= PV_DURATION) {
      pvElapsed = 0; // ループ再生
    }
    drawPvFrame(pvElapsed);
    pvRafId = requestAnimationFrame(loop);
  }
  pvRafId = requestAnimationFrame(loop);
}

function openVideo(exp) {
  currentExp = exp;
  pvElapsed = 0;
  stopPvVideo();

  document.getElementById('video-heading').innerHTML = `🎬 ${exp.name}`;
  const ptsList = document.getElementById('video-points-list');
  ptsList.innerHTML = exp.points.map((p) => `<li>${p}</li>`).join('');

  const ytBtn = document.getElementById('btn-youtube-search');
  ytBtn.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(exp.youtubeQuery)}`;

  document.getElementById('vtab-offline').classList.add('active');
  document.getElementById('vtab-online').classList.remove('active');
  document.getElementById('video-offline-pane').style.display = 'block';
  document.getElementById('video-online-pane').style.display = 'none';

  showScreen('screen-video');
  startPvVideo();
}

function drawPvFrame(t) {
  const canvas = document.getElementById('pv-canvas');
  if (!canvas || !currentExp) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const progress = Math.min(1, t / PV_DURATION);

  // Progress UI update
  const fill = document.getElementById('video-progress-fill');
  if (fill) fill.style.width = `${(progress * 100).toFixed(1)}%`;
  const timeEl = document.getElementById('pv-time-label');
  if (timeEl) {
    const sec = Math.floor(t);
    timeEl.textContent = `00:${String(sec).padStart(2, '0')} / 00:${PV_DURATION}`;
  }

  // 1. Background gradient (PV style)
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#0f172a');
  bg.addColorStop(1, '#1e293b');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Floating subtle science particles
  ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
  for (let i = 0; i < 8; i++) {
    const px = ((i * 97 + t * 24) % (W + 40)) - 20;
    const py = 50 + Math.sin(t * 1.5 + i) * 35 + (i % 3) * 85;
    ctx.beginPath();
    ctx.arc(px, py, 8 + (i % 3) * 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Determine current step
  const steps = currentExp.steps || [];
  const stepCount = Math.max(1, steps.length);
  const stepDur = PV_DURATION / stepCount;
  const stepIdx = Math.min(stepCount - 1, Math.floor(t / stepDur));
  const stepLocalT = (t % stepDur) / stepDur; // 0..1
  const st = steps[stepIdx] || { icon: '🧪', title: currentExp.name, desc: currentExp.summary };

  // Top Header Pill
  ctx.fillStyle = '#3b82f6';
  ctx.beginPath();
  ctx.roundRect(22, 18, 220, 30, 15);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText(`LAB LOGICA｜STEP ${stepIdx + 1}/${stepCount}`, 36, 38);

  // Title
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText(stripRubyHtml(currentExp.name), 24, 78);

  // 3. Left Visual Stage (Animated Experiment Graphics)
  ctx.save();
  ctx.translate(150, 215);
  drawPvVisualGraphic(ctx, currentExp.simType, t, progress);
  ctx.restore();

  // 4. Right Caption Card (Smooth slide-in per step)
  const slideOffset = Math.max(0, 1 - stepLocalT * 5) * 24;
  const cardX = 290 + slideOffset;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.strokeStyle = 'rgba(96, 165, 250, 0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(cardX, 105, 325, 210, 16);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText(`${st.icon} ${st.title}`, cardX + 18, 140);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '16px sans-serif';
  wrapCanvasText(ctx, st.desc, cardX + 18, 178, 288, 26);

  // Bottom Step Dots
  for (let i = 0; i < stepCount; i++) {
    ctx.fillStyle = i === stepIdx ? '#38bdf8' : 'rgba(255,255,255,0.25)';
    ctx.beginPath();
    ctx.arc(W / 2 - ((stepCount - 1) * 18) / 2 + i * 18, H - 18, i === stepIdx ? 6 : 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPvVisualGraphic(ctx, simType, t, progress) {
  if (simType === 'neutralization') {
    // Beaker + dripping drops + color shift Yellow -> Green -> Blue
    const color = progress < 0.55 ? '#facc15' : progress < 0.75 ? '#22c55e' : '#3b82f6';
    const dropY = -100 + ((t * 140) % 90);
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(0, dropY, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = color;
    ctx.fillRect(-52, 5, 104, 65);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 4;
    ctx.strokeRect(-55, -35, 110, 108);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(progress < 0.55 ? '酸性(黄)' : progress < 0.75 ? '中和点(緑)' : '塩基性(青)', 0, 96);
    ctx.textAlign = 'left';
  } else if (simType === 'flame') {
    const colors = ['#ef4444', '#facc15', '#c084fc', '#10b981'];
    const labels = ['Li (赤)', 'Na (黄)', 'K (赤紫)', 'Cu (青緑)'];
    const idx = Math.floor(t / 4) % colors.length;
    const flicker = Math.sin(t * 18) * 4;

    ctx.fillStyle = colors[idx];
    ctx.beginPath();
    ctx.moveTo(0, -85 + flicker);
    ctx.quadraticCurveTo(36, -10, 0, 45);
    ctx.quadraticCurveTo(-36, -10, 0, -85 + flicker);
    ctx.fill();

    ctx.fillStyle = '#64748b';
    ctx.fillRect(-28, 45, 56, 20);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(labels[idx], 0, 92);
    ctx.textAlign = 'left';
  } else if (simType === 'resonance') {
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 4;
    ctx.strokeRect(-35, -80, 70, 150);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
    ctx.fillRect(-33, 10, 66, 58);

    // Standing wave
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let y = -80; y <= 10; y += 3) {
      const amp = Math.sin(((y + 80) / 90) * Math.PI * 1.5) * 22 * Math.sin(t * 10);
      if (y === -80) ctx.moveTo(amp, y);
      else ctx.lineTo(amp, y);
    }
    ctx.stroke();
  } else if (simType === 'induction') {
    const mx = Math.sin(t * 3) * 45;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 5;
    for (let i = -2; i <= 2; i++) {
      ctx.strokeRect(-45 + i * 10, -35, 10, 70);
    }
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(mx - 20, -16, 40, 32);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('N', mx, 5);
    ctx.fillText('誘導電流 ⚡', 0, 82);
    ctx.textAlign = 'left';
  } else {
    // Generic animated bubbling beaker for biology/other experiments
    ctx.fillStyle = 'rgba(52, 211, 153, 0.65)';
    ctx.fillRect(-50, -5, 100, 75);
    for (let i = 0; i < 5; i++) {
      const by = 60 - ((t * 50 + i * 18) % 60);
      const bx = -30 + i * 15;
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.beginPath();
      ctx.arc(bx, by, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 4;
    ctx.strokeRect(-53, -40, 106, 112);
  }
}

// ==========================================
// メニュー画面（器具図鑑・実験クイズ・設定）
// ==========================================
function renderEquipment() {
  const grid = document.getElementById('equip-grid');
  grid.innerHTML = '';
  const unlockedIds = getUnlockedEquipmentIds();

  EQUIPMENT_MASTER.forEach((eq) => {
    const isUnlocked = unlockedIds.has(eq.id);
    const card = document.createElement('div');
    card.className = `equip-card ${isUnlocked ? '' : 'locked'}`;
    if (isUnlocked) {
      card.innerHTML = `
        <div style="font-size:2em;">${eq.icon}</div>
        <div style="font-weight:900; font-size:1.1em;">${eq.ruby}</div>
        <div style="font-size:0.86em; font-weight:700; color:var(--primary);">${eq.short}</div>
        <div style="font-size:0.86em; color:var(--text-sub);">${eq.detail}</div>
      `;
    } else {
      card.innerHTML = `
        <div style="font-size:2em;">🔒</div>
        <div style="font-weight:900;">？？？</div>
        <div style="font-size:0.85em; color:var(--text-sub);">この器具を使う実験を体験または動画視聴すると解放されます！</div>
      `;
    }
    grid.appendChild(card);
  });
}

function renderQuiz() {
  const area = document.getElementById('quiz-area');
  const unlockedQuizzes = QUIZ_MASTER.filter((q) => appState.completedExps.includes(q.expId));

  if (unlockedQuizzes.length === 0) {
    area.innerHTML = `
      <div class="quiz-card" style="text-align:center;">
        <div style="font-size:2.5em;">🔒</div>
        <h3>まだ解放されたクイズがありません</h3>
        <p style="color:var(--text-sub);">「教科選択」から実験を1つ体験（または動画視聴）すると、その実験のクイズに挑戦できるようになります！</p>
      </div>
    `;
    return;
  }

  let qIndex = 0;
  function showQuestion() {
    const q = unlockedQuizzes[qIndex];
    const isCleared = appState.quizCleared.includes(q.id);
    area.innerHTML = `
      <div class="quiz-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span class="badge badge-playable">問題 ${qIndex + 1} / ${unlockedQuizzes.length}</span>
          ${isCleared ? '<span class="badge badge-done">✅ 正解済み</span>' : ''}
        </div>
        <h3 style="margin-top:4px;">${q.question}</h3>
        <div class="quiz-options" id="quiz-opts"></div>
        <div id="quiz-feedback" style="margin-top:14px; display:none;"></div>
      </div>
    `;

    const optsEl = document.getElementById('quiz-opts');
    q.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = `${idx + 1}. ${optText}`;
      btn.onclick = () => {
        const allBtns = optsEl.querySelectorAll('button');
        allBtns.forEach((b) => (b.disabled = true));

        const fb = document.getElementById('quiz-feedback');
        fb.style.display = 'block';

        if (idx === q.answer) {
          btn.classList.add('correct');
          playSound('success');
          if (!appState.quizCleared.includes(q.id)) {
            appState.quizCleared.push(q.id);
            saveState();
          }
          fb.innerHTML = `
            <div class="point-box" style="border-color:#16a34a;">
              <strong>⭕ 大正解！</strong><br>${q.explanation}
            </div>
          `;
        } else {
          btn.classList.add('wrong');
          allBtns[q.answer].classList.add('correct');
          playSound('wrong');
          fb.innerHTML = `
            <div class="point-box" style="border-color:#dc2626;">
              <strong>❌ おしい！正解は ${q.answer + 1} 番です</strong><br>${q.explanation}
            </div>
          `;
        }

        if (unlockedQuizzes.length > 1) {
          const nextBtn = document.createElement('button');
          nextBtn.className = 'lab-btn';
          nextBtn.style.marginTop = '12px';
          nextBtn.textContent = '次のクイズへ ▶';
          nextBtn.onclick = () => {
            playSound('click');
            qIndex = (qIndex + 1) % unlockedQuizzes.length;
            showQuestion();
          };
          fb.appendChild(nextBtn);
        }
      };
      optsEl.appendChild(btn);
    });
  }

  showQuestion();
}

// ==========================================
// イベント登録・初期化
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  applySettings();
  updateTitleProgress();

  // Title buttons
  document.getElementById('btn-go-subjects').addEventListener('click', () => {
    playSound('click');
    renderSubjects();
    showScreen('screen-subjects');
  });

  document.getElementById('btn-go-menu').addEventListener('click', () => {
    playSound('click');
    renderEquipment();
    renderQuiz();
    showScreen('screen-menu');
  });

  document.getElementById('btn-home').addEventListener('click', () => {
    playSound('click');
    updateTitleProgress();
    showScreen('screen-title');
  });

  document.querySelectorAll('.back-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      playSound('click');
      const target = btn.getAttribute('data-back');
      if (target === 'screen-title') updateTitleProgress();
      if (target === 'screen-units' && currentSubject) renderUnits(currentSubject);
      if (target === 'screen-experiments' && currentSubject && currentUnit) {
        renderExperiments(currentSubject, currentUnit);
      }
      if (target === 'screen-subjects') renderSubjects();
      showScreen(target);
    });
  });

  // Video Tabs & PV Canvas Player Controls
  document.getElementById('vtab-offline').addEventListener('click', () => {
    playSound('click');
    document.getElementById('vtab-offline').classList.add('active');
    document.getElementById('vtab-online').classList.remove('active');
    document.getElementById('video-offline-pane').style.display = 'block';
    document.getElementById('video-online-pane').style.display = 'none';
    startPvVideo();
  });

  document.getElementById('vtab-online').addEventListener('click', () => {
    playSound('click');
    stopPvVideo();
    document.getElementById('vtab-online').classList.add('active');
    document.getElementById('vtab-offline').classList.remove('active');
    document.getElementById('video-online-pane').style.display = 'block';
    document.getElementById('video-offline-pane').style.display = 'none';
  });

  document.getElementById('btn-pv-play').addEventListener('click', () => {
    playSound('click');
    if (pvPlaying) stopPvVideo();
    else startPvVideo();
  });

  document.getElementById('btn-pv-restart').addEventListener('click', () => {
    playSound('click');
    pvElapsed = 0;
    drawPvFrame(0);
    startPvVideo();
  });

  document.getElementById('video-progress-wrap').addEventListener('click', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    pvElapsed = ratio * PV_DURATION;
    drawPvFrame(pvElapsed);
  });

  document.getElementById('btn-video-complete').addEventListener('click', () => {
    if (currentExp) {
      completeExperiment(currentExp);
    }
  });

  // Menu Tabs
  document.querySelectorAll('.menu-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      playSound('click');
      document.querySelectorAll('.menu-tab-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-mtab');
      document.querySelectorAll('.mtab-pane').forEach((p) => (p.style.display = 'none'));
      document.getElementById(`mtab-${tab}`).style.display = 'block';
      if (tab === 'equip') renderEquipment();
      if (tab === 'quiz') renderQuiz();
    });
  });

  // Quick & Menu Settings
  function toggleSetting(key, valA, valB) {
    appState.settings[key] = appState.settings[key] === valA ? valB : valA;
    saveState();
    applySettings();
    playSound('click');
  }

  document.getElementById('btn-quick-ruby').addEventListener('click', () => toggleSetting('ruby', true, false));
  document.getElementById('set-ruby').addEventListener('click', () => toggleSetting('ruby', true, false));

  document.getElementById('btn-quick-font').addEventListener('click', () => toggleSetting('fontSize', 'normal', 'large'));
  document.getElementById('set-font').addEventListener('click', () => toggleSetting('fontSize', 'normal', 'large'));

  document.getElementById('btn-quick-theme').addEventListener('click', () => toggleSetting('theme', 'light', 'dark'));
  document.getElementById('set-theme').addEventListener('click', () => toggleSetting('theme', 'light', 'dark'));

  document.getElementById('btn-quick-sound').addEventListener('click', () => toggleSetting('sound', true, false));
  document.getElementById('set-sound').addEventListener('click', () => toggleSetting('sound', true, false));

  document.getElementById('set-guide').addEventListener('click', () => toggleSetting('guide', true, false));

  document.getElementById('btn-reset-data').addEventListener('click', () => {
    appState.completedExps = [];
    appState.quizCleared = [];
    saveState();
    playSound('click');
    updateTitleProgress();
    renderEquipment();
    renderQuiz();
    showToast('🗑️ 進行データをリセットしました');
  });
});
