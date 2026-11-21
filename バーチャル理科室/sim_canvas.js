// ラボ・ロジカ（LAB LOGICA）全実験・60fps Canvasアニメーションエンジン

const SimCanvas = (function () {
  let rafId = null;

  function stop() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function start(canvasId, drawFn) {
    stop();
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const t0 = performance.now();

    function loop(now) {
      if (!document.getElementById(canvasId)) {
        rafId = null;
        return;
      }
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawFn(ctx, canvas.width, canvas.height, t);
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);
  }

  // スライダー系実験の専用Canvas描画ディスパッチャ
  function drawSliderScene(expId, ctx, W, H, t, val) {
    // 背景
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, W, H);

    if (expId === 'phys_lens') {
      // 凸レンズの光線作図（f = 20cm, scale: 1cm = 3.2px, center at W/2)
      const cx = W / 2;
      const cy = H / 2 + 10;
      const fPx = 20 * 3.2;
      const aPx = val * 3.2;
      const objX = cx - aPx;
      const objH = 42;

      // 光軸
      ctx.strokeStyle = 'rgba(148,163,184,0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(10, cy);
      ctx.lineTo(W - 10, cy);
      ctx.stroke();

      // 凸レンズ
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 10, 72, 0, 0, Math.PI * 2);
      ctx.stroke();

      // 焦点 F, 2F マーカー
      [cx - fPx, cx + fPx, cx - 2 * fPx, cx + 2 * fPx].forEach((fx, idx) => {
        ctx.fillStyle = idx < 2 ? '#fbbf24' : '#94a3b8';
        ctx.beginPath();
        ctx.arc(fx, cy, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '11px sans-serif';
        ctx.fillText(idx < 2 ? 'F' : '2F', fx - 6, cy + 16);
      });

      // 物体（ろうそく）
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(objX, cy);
      ctx.lineTo(objX, cy - objH);
      ctx.stroke();
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(objX, cy - objH - 5, 5, 0, Math.PI * 2);
      ctx.fill();

      // 結像位置 b (1/a + 1/b = 1/f)
      if (Math.abs(val - 20) > 0.5) {
        const bCm = (val * 20) / (val - 20);
        const bPx = bCm * 3.2;
        const imgX = cx + bPx;
        const mag = -bCm / val; // negative = inverted
        const imgTopY = cy - objH * mag;

        // 光線1: 平行 → 焦点F
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.85)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(objX, cy - objH);
        ctx.lineTo(cx, cy - objH);
        ctx.lineTo(imgX, imgTopY);
        ctx.stroke();

        // 光線2: レンズ中心直進
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.85)';
        ctx.beginPath();
        ctx.moveTo(objX, cy - objH);
        ctx.lineTo(imgX, imgTopY);
        ctx.stroke();

        // 像の描画（虚像なら点線）
        ctx.save();
        if (bCm < 0) ctx.setLineDash([5, 4]);
        ctx.strokeStyle = bCm < 0 ? '#f472b6' : '#38bdf8';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(imgX, cy);
        ctx.lineTo(imgX, imgTopY);
        ctx.stroke();
        ctx.restore();
      }
      return;
    }

    if (expId === 'phys_young') {
      // ヤングの干渉縞（波長 val nm に応じた色と縞間隔）
      const hue = Math.max(0, Math.min(270, ((700 - val) / 300) * 260));
      const color = `hsl(${hue}, 90%, 60%)`;
      const spacing = (val / 550) * 26;

      // 左側：二重スリットと波紋
      ctx.fillStyle = '#475569';
      ctx.fillRect(90, 10, 8, 55);
      ctx.fillRect(90, 85, 8, 30);
      ctx.fillRect(90, 135, 8, 55);

      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      for (let r = (t * 45) % 24; r < 180; r += 24) {
        ctx.beginPath();
        ctx.arc(94, 75, r, -Math.PI / 2.5, Math.PI / 2.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(94, 125, r, -Math.PI / 2.5, Math.PI / 2.5);
        ctx.stroke();
      }

      // 右側スクリーン：干渉縞
      for (let y = 10; y < H - 10; y += 2) {
        const intensity = Math.pow(Math.cos(((y - H / 2) / spacing) * Math.PI), 2);
        ctx.fillStyle = `hsla(${hue}, 95%, 55%, ${intensity.toFixed(2)})`;
        ctx.fillRect(W - 75, y, 50, 2);
      }
      ctx.strokeStyle = '#94a3b8';
      ctx.strokeRect(W - 75, 10, 50, H - 20);
      return;
    }

    if (expId === 'phys_refraction') {
      // 半円形ガラスと全反射
      const cx = W / 2;
      const cy = H / 2 + 10;
      const rad = (val * Math.PI) / 180;

      // 下側ガラス半円
      ctx.fillStyle = 'rgba(56, 189, 248, 0.28)';
      ctx.beginPath();
      ctx.arc(cx, cy, 78, 0, Math.PI);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 法線
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#94a3b8';
      ctx.beginPath();
      ctx.moveTo(cx, 15);
      ctx.lineTo(cx, H - 15);
      ctx.stroke();
      ctx.setLineDash([]);

      // 入射光（ガラス内左下から中心へ）
      const ix = cx - Math.sin(rad) * 95;
      const iy = cy + Math.cos(rad) * 95;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(ix, iy);
      ctx.lineTo(cx, cy);
      ctx.stroke();

      // 反射光（ガラス内右下へ）
      const rx = cx + Math.sin(rad) * 95;
      const ry = cy + Math.cos(rad) * 95;
      ctx.strokeStyle = val >= 42 ? '#ef4444' : 'rgba(239,68,68,0.4)';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(rx, ry);
      ctx.stroke();

      // 屈折光（空気中へ：1.5 * sin(i) < 1 のとき）
      const sinR = 1.5 * Math.sin(rad);
      if (sinR <= 1) {
        const rRad = Math.asin(sinR);
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.sin(rRad) * 95, cy - Math.cos(rRad) * 95);
        ctx.stroke();
      }
      return;
    }

    if (expId === 'phys_pendulum') {
      // 単振り子のリアルタイム振動
      const cx = W / 2;
      const topY = 18;
      const lenPx = 45 + val * 55;
      const T = 2 * Math.PI * Math.sqrt(val / 9.8);
      const angle = 0.45 * Math.sin((2 * Math.PI * t) / T);
      const bx = cx + Math.sin(angle) * lenPx;
      const by = topY + Math.cos(angle) * lenPx;

      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 40, topY);
      ctx.lineTo(cx + 40, topY);
      ctx.moveTo(cx, topY);
      ctx.lineTo(bx, by);
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(bx, by, 14, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    if (expId === 'phys_spring') {
      // ばね振り子のリアルタイム単振動
      const cx = W / 2;
      const topY = 15;
      const T = 2 * Math.PI * Math.sqrt(val / 10);
      const disp = 28 * Math.sin((2 * Math.PI * t) / T);
      const endY = 95 + val * 25 + disp;

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx, topY);
      const coils = 10;
      for (let i = 1; i <= coils; i++) {
        const y = topY + ((endY - topY) * i) / coils;
        const x = cx + (i % 2 === 0 ? -12 : 12);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(cx, endY);
      ctx.stroke();

      const size = 18 + val * 14;
      ctx.fillStyle = '#34d399';
      ctx.fillRect(cx - size / 2, endY, size, size);
      return;
    }

    if (expId === 'phys_melde') {
      // メルデの実験：弦の定常波（1N→3腹, 4N→2腹, 9N→1腹）
      const n = val === 9 ? 1 : val === 4 ? 2 : val === 1 ? 3 : 2.3;
      const cy = H / 2;
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 30; x <= W - 30; x += 3) {
        const norm = (x - 30) / (W - 60);
        const y = cy + Math.sin(norm * Math.PI * n) * 45 * Math.sin(t * 14);
        if (x === 30) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      return;
    }

    if (expId === 'phys_beats') {
      // うなり波形
      const diff = Math.abs(440 - val);
      const cy = H / 2;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 20; x <= W - 20; x += 2) {
        const phase = (x - 20) * 0.12 - t * 6;
        const env = Math.cos(((x - 20) * 0.015 * diff) - t * diff * 1.5);
        const y = cy + Math.sin(phase) * env * 52;
        if (x === 20) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      return;
    }

    if (expId === 'phys_cart') {
      // 斜面を下る台車と打点テープ
      const rad = (val * Math.PI) / 180;
      const cycle = (t * 0.7) % 1;
      const dist = cycle * cycle * 190;

      ctx.save();
      ctx.translate(60, 45);
      ctx.rotate(rad);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, 30);
      ctx.lineTo(240, 30);
      ctx.stroke();

      // 台車
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(dist, 4, 36, 20);
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(dist + 8, 26, 5, 0, Math.PI * 2);
      ctx.arc(dist + 28, 26, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    if (expId === 'phys_friction') {
      const rad = (val * Math.PI) / 180;
      const slide = val >= 31 ? ((t * 90) % 120) : 0;
      ctx.save();
      ctx.translate(W / 2 - 80, H - 35);
      ctx.rotate(-rad);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(0, 0, 190, 10);
      ctx.fillStyle = val >= 31 ? '#ef4444' : '#38bdf8';
      ctx.fillRect(110 - slide, -26, 32, 26);
      ctx.restore();
      return;
    }

    if (expId === 'phys_boyle') {
      // 注射器と跳ね回る気体分子
      const len = 45 + val * 4.5;
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 3;
      ctx.strokeRect(60, 55, 220, 80);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(60 + len, 57, 14, 76);

      // 分子
      ctx.fillStyle = '#38bdf8';
      for (let i = 0; i < 12; i++) {
        const px = 68 + ((Math.abs(Math.sin(t * 2.5 + i * 1.7))) * (len - 14));
        const py = 66 + ((Math.abs(Math.cos(t * 3.1 + i * 2.3))) * 58);
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      return;
    }

    if (expId === 'phys_photoelec') {
      // 光電効果：光子と飛び出す光電子
      const hue = val >= 9 ? 280 : val >= 7 ? 130 : 0;
      ctx.fillStyle = '#64748b';
      ctx.fillRect(70, 35, 16, 120);

      // 入射光子
      for (let i = 0; i < 3; i++) {
        const p = (t * 1.4 + i * 0.33) % 1;
        const x = 180 - p * 95;
        const y = 60 + i * 35;
        ctx.strokeStyle = `hsl(${hue}, 95%, 60%)`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 飛び出す光電子
      if (val >= 8) {
        ctx.fillStyle = '#38bdf8';
        for (let i = 0; i < 4; i++) {
          const p = (t * 1.8 + i * 0.25) % 1;
          const x = 88 + p * 180;
          const y = 55 + i * 25 + Math.sin(t * 5 + i) * 5;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      return;
    }

    if (expId === 'bio_streaming') {
      // 原形質流動：葉緑体が細胞内をグルグル周回
      const speed = val < 12 ? 0.4 : val <= 32 ? 2.2 : 0.7;
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 5;
      ctx.strokeRect(65, 30, W - 130, H - 60);

      ctx.fillStyle = 'rgba(186,230,253,0.2)';
      ctx.fillRect(100, 58, W - 200, H - 116);

      ctx.fillStyle = '#4ade80';
      for (let i = 0; i < 8; i++) {
        const ang = t * speed + (i * Math.PI * 2) / 8;
        const cx = W / 2 + Math.cos(ang) * 95;
        const cy = H / 2 + Math.sin(ang) * 48;
        ctx.beginPath();
        ctx.ellipse(cx, cy, 10, 6, ang, 0, Math.PI * 2);
        ctx.fill();
      }
      return;
    }

    if (expId === 'bio_plasmolysis') {
      // 原形質分離：細胞壁は固定、中の細胞膜が縮む
      const shrink = Math.max(0, (val - 5) * 2.2);
      ctx.strokeStyle = '#16a34a';
      ctx.lineWidth = 5;
      ctx.strokeRect(85, 35, W - 170, H - 70);

      ctx.fillStyle = 'rgba(74, 222, 128, 0.45)';
      ctx.strokeStyle = '#86efac';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(90 + shrink, 40 + shrink * 0.7, W - 180 - shrink * 2, H - 80 - shrink * 1.4, 24);
      ctx.fill();
      ctx.stroke();
      return;
    }

    // 汎用スライダーアニメ（温度・光量・気泡・反応速度）
    ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.fillRect(W / 2 - 55, 55, 110, 105);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 4;
    ctx.strokeRect(W / 2 - 58, 35, 116, 128);

    const bubbleCount = Math.min(12, Math.max(2, Math.floor(val / 8)));
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    for (let i = 0; i < bubbleCount; i++) {
      const bx = W / 2 - 40 + ((i * 23) % 80);
      const by = 150 - ((t * (45 + val * 0.5) + i * 19) % 90);
      ctx.beginPath();
      ctx.arc(bx, by, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ステップ実験用の60fps Canvas描画（モンキーハンティング、霧箱、電気泳動、電池、クロマト等）
  function drawStepScene(expId, ctx, W, H, t, activeIdx, currStage) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, W, H);

    if (expId === 'phys_monkey') {
      // モンキーハンティング：放物線弾道＋サルの自由落下
      const cycle = (t * 0.55) % 1;
      const sx = 40;
      const sy = H - 30;
      const mx = W - 65;
      const myStart = 35;

      // 狙いの点線
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(148,163,184,0.45)';
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(mx, myStart);
      ctx.stroke();
      ctx.setLineDash([]);

      // 弾とサルの位置（同じ 1/2 gt^2 で落下）
      const bx = sx + (mx - sx) * cycle;
      const straightY = sy + (myStart - sy) * cycle;
      const drop = cycle * cycle * 95;
      const by = straightY + drop;
      const my = myStart + drop;

      // 弾の軌跡
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(bx, by, 6, 0, Math.PI * 2);
      ctx.fill();

      // サル
      ctx.font = '24px sans-serif';
      ctx.fillText('🐒', mx - 12, my + 8);
      if (cycle > 0.92) {
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('💥 命中！', mx - 42, my - 14);
      }
      return;
    }

    if (expId === 'phys_cloud_chamber') {
      // 霧箱の放射線飛跡
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 20, W - 40, H - 40);
      const showAlpha = activeIdx === 0 || activeIdx < 0;
      const showBeta = activeIdx === 1;

      for (let i = 0; i < 4; i++) {
        const prog = (t * 1.1 + i * 0.25) % 1;
        ctx.strokeStyle = `rgba(255,255,255,${(1 - prog).toFixed(2)})`;
        if (showAlpha) {
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(45, H / 2 + (i - 1.5) * 18);
          ctx.lineTo(45 + prog * 90, H / 2 + (i - 1.5) * 24);
          ctx.stroke();
        } else if (showBeta) {
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(45, 50 + i * 25);
          ctx.quadraticCurveTo(140, 20 + i * 40, 45 + prog * 230, 70 + i * 20);
          ctx.stroke();
        }
      }
      return;
    }

    if (expId === 'bio_chromato') {
      // クロマトグラフィー：4色分離アニメーション
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(W / 2 - 35, 20, 70, H - 40);
      const prog = activeIdx >= 2 ? 1 : activeIdx === 1 ? (t * 0.4) % 1 : 0.05;
      const bands = [
        { c: '#fb923c', dist: 120 },
        { c: '#facc15', dist: 95 },
        { c: '#10b981', dist: 65 },
        { c: '#84cc16', dist: 42 }
      ];
      bands.forEach((b) => {
        ctx.fillStyle = b.c;
        ctx.fillRect(W / 2 - 28, H - 38 - b.dist * prog, 56, 10);
      });
      return;
    }

    if (expId === 'bio_electrophoresis') {
      // DNA電気泳動（－極→＋極）
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(35, 25, W - 70, H - 50);
      const prog = activeIdx >= 1 ? Math.min(1, (t * 0.35) % 1.2) : 0;
      const speeds = [190, 130, 80];
      speeds.forEach((sp, i) => {
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(60 + sp * prog, 50 + i * 38, 12, 22);
      });
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('－', 16, H / 2);
      ctx.fillText('＋', W - 28, H / 2);
      return;
    }

    // その他すべてのステップ実験：滑らかなビーカー＆液体波＆気泡＆アイコン演出
    const liqColor = currStage ? currStage.bg : 'rgba(56, 189, 248, 0.35)';
    ctx.fillStyle = liqColor;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 56, 82);
    for (let x = W / 2 - 56; x <= W / 2 + 56; x += 4) {
      const wy = 82 + Math.sin(x * 0.08 + t * 4) * 3;
      ctx.lineTo(x, wy);
    }
    ctx.lineTo(W / 2 + 56, 162);
    ctx.lineTo(W / 2 - 56, 162);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 4;
    ctx.strokeRect(W / 2 - 58, 36, 116, 128);

    // 上昇する気泡パーティクル
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    for (let i = 0; i < 6; i++) {
      const bx = W / 2 - 38 + i * 15;
      const by = 152 - ((t * 48 + i * 17) % 66);
      ctx.beginPath();
      ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.font = '32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(currStage ? currStage.visual : '🧪', W / 2, 128);
    ctx.textAlign = 'left';
  }

  return { start, stop, drawSliderScene, drawStepScene };
})();
