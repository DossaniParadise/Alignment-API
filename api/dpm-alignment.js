<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Dossani Maintenance</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<style>
:root{
  /* LIGHT MODE — slate/charcoal ink on light surfaces, amber accent preserved */
  --ground:#f1f3f7; --panel:#ffffff; --panel-2:#f5f7fa;
  --line:#dde2ea; --line-soft:#e8ecf2;
  --ink:#1a2230; --ink-mid:#51607a; --ink-dim:#8a96a8;
  --amber:#f59e0b; --amber-deep:#b45309;
  --blue:#2563eb; --green:#059669; --red:#dc2626; --violet:#7c3aed; --cyan:#0891b2;
  --s-open:#dc2626; --s-assigned:#7c3aed; --s-progress:#1e3a8a; --s-waiting:#ea7317;
  --s-finished:#059669; --s-resolved:#047857; --s-closed:#8a96a8;
  --radius:10px; --radius-sm:7px; --shadow:0 8px 26px rgba(40,55,80,.12);
  --mono:'JetBrains Mono',ui-monospace,monospace;
  --disp:'Archivo',system-ui,sans-serif; --body:'Inter',system-ui,sans-serif;
}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;padding:0}
body{background:var(--ground);color:var(--ink);font-family:var(--body);font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased;min-height:100vh}
body::before{content:"";position:fixed;inset:0;z-index:0;pointer-events:none;
  background-image:linear-gradient(var(--line-soft) 1px,transparent 1px),linear-gradient(90deg,var(--line-soft) 1px,transparent 1px);
  background-size:46px 46px;opacity:.6;mask-image:radial-gradient(ellipse 90% 70% at 50% 0%,#000 25%,transparent 100%)}
button{font-family:inherit;cursor:pointer}
input,select,textarea{font-family:inherit}
.hidden{display:none!important}
.mono{font-family:var(--mono)}

/* ===== REFERENCE BADGE SYSTEM (remove later: set SHOW_REF_TAGS=false) ===== */
.reftag{
  position:absolute;top:-7px;left:-7px;z-index:5;
  background:#ff2d7e;color:#fff;font-family:var(--mono);font-weight:700;
  font-size:9px;line-height:1;padding:2px 4px;border-radius:4px;
  pointer-events:none;letter-spacing:.02em;box-shadow:0 1px 3px rgba(0,0,0,.5);
  opacity:.92;white-space:nowrap;
}
[data-reftagged]{position:relative}
body.no-reftags .reftag{display:none}

/* ===== TOPBAR ===== */
.topbar{position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:14px;padding:12px 18px;
  background:rgba(255,255,255,.85);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.brand{display:flex;align-items:center;gap:11px;min-width:0}
.brand-mark{width:34px;height:34px;border-radius:8px;flex-shrink:0;
  background:repeating-linear-gradient(45deg,var(--amber) 0 6px,#fff4dd 6px 12px);border:1px solid var(--amber-deep);position:relative}
.brand-mark::after{content:"";position:absolute;inset:5px;border-radius:3px;background:var(--ground)}
.brand-name{font-family:var(--disp);font-weight:800;font-size:16px;letter-spacing:.02em;line-height:1.05}
.brand-sub{font-family:var(--mono);font-size:10px;color:var(--ink-dim);letter-spacing:.14em;text-transform:uppercase}
.topbar-spacer{flex:1}
.who{display:flex;flex-direction:column;align-items:flex-end;line-height:1.2;text-align:right;min-width:0}
.who-name{font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:42vw}
.who-role{font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--amber)}
.icon-btn{background:var(--panel-2);border:1px solid var(--line);color:var(--ink-mid);width:38px;height:38px;border-radius:9px;font-size:15px;display:grid;place-items:center;transition:.15s}
.icon-btn:hover{border-color:var(--amber);color:var(--amber)}

.wrap{position:relative;z-index:1;max-width:1180px;margin:0 auto;padding:22px 18px 90px}

/* ===== LOGIN ===== */
.login-stage{position:relative;z-index:1;min-height:100vh;display:grid;place-items:center;padding:24px}
.login-card{width:100%;max-width:420px;background:var(--panel);border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow);overflow:hidden}
.login-head{padding:30px 30px 22px;border-bottom:1px solid var(--line-soft);background:radial-gradient(120% 80% at 0% 0%,rgba(255,176,0,.10),transparent 60%)}
.login-mark{width:48px;height:48px;border-radius:11px;margin-bottom:18px;background:repeating-linear-gradient(45deg,var(--amber) 0 8px,#fff4dd 8px 16px);border:1px solid var(--amber-deep);position:relative}
.login-mark::after{content:"";position:absolute;inset:7px;border-radius:4px;background:var(--panel)}
.login-title{font-family:var(--disp);font-weight:900;font-size:26px;letter-spacing:-.01em;line-height:1.05}
.login-tag{color:var(--ink-dim);font-size:13px;margin-top:6px;font-family:var(--mono);letter-spacing:.04em}
.login-body{padding:24px 30px 30px;display:flex;flex-direction:column;gap:16px}
.field{display:flex;flex-direction:column;gap:7px}
.label{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-mid)}
.input{background:var(--panel-2);border:1px solid var(--line);border-radius:9px;padding:13px 14px;color:var(--ink);font-size:15px;width:100%;transition:.15s}
.input:focus{outline:none;border-color:var(--amber);box-shadow:0 0 0 3px rgba(255,176,0,.12)}
.input::placeholder{color:var(--ink-dim)}
.btn{border:1px solid transparent;border-radius:9px;padding:13px 18px;font-weight:600;font-size:15px;display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:.15s;white-space:nowrap;text-decoration:none}
.btn-primary{background:var(--amber);color:#1a1305;border-color:var(--amber-deep);font-weight:700}
.btn-primary:hover{background:#ffbe2e}
.btn-primary:disabled{opacity:.55;cursor:not-allowed}
.btn-ghost{background:var(--panel-2);color:var(--ink);border-color:var(--line)}
.btn-ghost:hover{border-color:var(--amber);color:var(--amber)}
.btn-danger{background:transparent;color:var(--red);border-color:rgba(248,113,113,.4)}
.btn-danger:hover{background:rgba(248,113,113,.12)}
.btn-sm{padding:8px 12px;font-size:13px;border-radius:7px}
.btn-block{width:100%}
.btn-block.fin{background:var(--green);border-color:#047857;color:#fff}
.btn-block.fin:hover{background:#047857}
.login-err{background:rgba(248,113,113,.1);border:1px solid rgba(248,113,113,.35);color:#fca5a5;border-radius:8px;padding:11px 13px;font-size:13px}
.login-foot{font-size:11px;color:var(--ink-dim);text-align:center;font-family:var(--mono);letter-spacing:.06em;padding-top:4px}

/* ===== PAGE HEAD / STATS / FILTERS ===== */
.page-head{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:20px;flex-wrap:wrap}
.page-title{font-family:var(--disp);font-weight:900;font-size:26px;letter-spacing:-.01em;line-height:1.05}
.page-meta{font-family:var(--mono);font-size:11px;color:var(--ink-dim);letter-spacing:.1em;text-transform:uppercase;margin-top:5px}
.head-actions{display:flex;gap:10px;flex-wrap:wrap}
/* ===== STATUS TILES (Open + Closed always; middle 6 expand) ===== */
.tiles-wrap{display:flex;align-items:stretch;gap:8px;margin-bottom:16px}
.tiles-wrap>.tile{flex:1 1 0;min-width:120px}
.tiles-exp{flex:0 0 auto;width:40px;border:2px dashed var(--line);background:var(--panel);border-radius:11px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;transition:.15s;color:var(--ink-dim)}
.tiles-exp:hover{border-color:var(--amber);color:var(--amber)}
.exp-chevs{font-size:15px;font-weight:700;letter-spacing:-1px}
.exp-hint{font-family:var(--mono);font-size:8px;letter-spacing:.1em;text-transform:uppercase;writing-mode:vertical-rl}
.tiles-wrap.expanded .tiles-exp{display:none}
.tiles-mid{display:flex;gap:8px;overflow:hidden;max-width:0;opacity:0;transition:max-width .35s ease,opacity .25s ease}
.tiles-mid>.tile{flex:1 1 0;min-width:118px}
.tiles-wrap.expanded .tiles-mid{max-width:1400px;opacity:1}
.tile{background:var(--panel);border:2px solid var(--line);border-radius:11px;padding:11px 12px;text-align:center;transition:.13s;font-family:inherit;cursor:pointer;border-top:3px solid var(--tc)}
.tile:hover{border-color:var(--tc);transform:translateY(-1px)}
.tile.on{background:var(--tc);border-color:var(--tc)}
.tile-l{font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;color:var(--tc)}
.tile.on .tile-l{color:#fff}
.tile-n{font-family:var(--disp);font-weight:900;font-size:26px;line-height:1.1;color:var(--ink)}
.tile.on .tile-n{color:#fff}
.tile-s{font-size:9.5px;color:var(--ink-dim);margin-top:2px;line-height:1.25}
.tile.on .tile-s{color:rgba(255,255,255,.85)}
.tile.big{transform:scale(1.06);box-shadow:0 6px 20px rgba(40,55,80,.2);z-index:2}
.tile.big .tile-n{font-size:30px}
.board-controls{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px;align-items:center}
.loc-select{max-width:300px;flex:0 1 auto}
.search{flex:1;min-width:160px}
.list-head{font-family:var(--disp);font-weight:800;font-size:18px;margin:0 0 12px}
.list-head .lh-n{color:var(--ink-dim);font-weight:600}
.bulk-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:14px;padding:10px 12px;background:var(--panel);border:1px solid var(--line);border-radius:10px}
.bulk-bar.active{background:#fff7e6;border-color:var(--amber)}
.bulk-all{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:600;cursor:pointer}
.bulk-count{font-family:var(--mono);font-size:12px;color:var(--ink-mid);margin-right:auto}
.row-chk{display:flex;align-items:center;padding-right:4px;cursor:pointer}
.row-chk input{width:18px;height:18px;cursor:pointer}
.row.row-selected{border-color:var(--amber);background:#fff7e6}

/* ===== HORIZONTAL TICKET ROWS ===== */
.rows{display:flex;flex-direction:column;gap:8px}
.row{display:flex;align-items:center;gap:14px;background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:12px 15px;cursor:pointer;transition:.12s}
.row:hover{border-color:var(--ink-dim);box-shadow:var(--shadow)}
.row.tinted{background:color-mix(in srgb,var(--rt) 7%,var(--panel));border-left:3px solid var(--rt)}
.row.tinted:hover{background:color-mix(in srgb,var(--rt) 12%,var(--panel))}
.row.row-prog{background:color-mix(in srgb,var(--blue) 10%,var(--panel));border-color:var(--blue);border-left:4px solid var(--blue)}
.row.row-prog:hover{background:color-mix(in srgb,var(--blue) 16%,var(--panel))}
.row-main{flex:1;min-width:0}
.row-top{display:flex;align-items:center;gap:8px;margin-bottom:2px}
.row-store{font-weight:700;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.row-desc{color:var(--ink-mid);font-size:13.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:4px}
.row-meta{display:flex;align-items:center;gap:7px;font-size:11px;color:var(--ink-dim);flex-wrap:wrap}
.r-id{color:var(--ink-dim);letter-spacing:.03em}
.r-sep{opacity:.5}
.r-pri{font-weight:700;text-transform:uppercase;font-size:10px;letter-spacing:.04em}
.r-pri.n{color:var(--green)}
.r-pri.u{color:#7a5b00;background:#ffd84d;padding:2px 7px;border-radius:4px;font-weight:700}
.r-pri.e{color:#fff;background:var(--red);padding:2px 7px;border-radius:4px;font-weight:700}
.row-right{flex:0 0 auto;display:flex;align-items:center}
.row-assign{display:flex;gap:8px;align-items:center}
.row-sel{padding:9px 11px;font-size:13px;min-width:150px}
.row-status{text-align:right;min-width:90px}
.rs-label{font-family:var(--mono);font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--tc)}
.rs-who{font-size:12px;color:var(--ink);font-weight:600;margin-top:2px}
.rs-meta{font-size:11px;margin-top:3px;color:var(--ink-dim)}
.rs-meta.wait{color:var(--s-waiting);font-weight:600}
.rs-meta.prog{color:var(--s-progress);font-weight:700;font-family:var(--mono)}
/* below-row action bars (assigned/waiting/in-progress) */
.row-wrap{display:flex;flex-direction:column}
.row-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;
  background:#eef4ff;border:1px solid #d6e4ff;border-top:none;border-radius:0 0 10px 10px;
  margin-top:-1px;padding:9px 15px;font-size:13px;color:var(--ink-mid)}
.row-bar b{color:var(--ink)}
.rb-btns{display:flex;gap:7px;flex-wrap:wrap}
.rb-btns .btn.tk-cur{opacity:1;border-color:var(--amber);background:rgba(245,158,11,.12);color:var(--amber-deep);font-weight:700;cursor:default}
.rb-none{font-size:12px;color:var(--ink-dim);font-style:italic}
.row-wrap .row{position:relative;z-index:1}
.row-wrap:has(.row-bar) .row{border-radius:10px 10px 0 0}
.contact-choose{display:flex;flex-direction:column;gap:10px}
.contact-note{font-size:12px;color:var(--ink-dim);background:var(--panel-2);border:1px solid var(--line-soft);border-radius:8px;padding:10px 12px;margin-top:14px}
.sbadge{font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 9px;border-radius:6px;display:inline-flex;align-items:center;gap:5px;white-space:nowrap}
.sbadge .dot{width:6px;height:6px;border-radius:50%;background:currentColor}

.empty{text-align:center;padding:54px 20px;color:var(--ink-dim);border:1px dashed var(--line);border-radius:14px;background:rgba(255,255,255,.01)}
.empty-mark{font-size:34px;margin-bottom:12px;opacity:.5}
.empty h3{font-family:var(--disp);font-weight:700;color:var(--ink-mid);margin:0 0 6px;font-size:18px}
.empty p{margin:0;font-size:14px}

/* manager hub */
.hub{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:24px}
.hub-btn{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:26px 22px;text-align:left;transition:.15s;display:flex;flex-direction:column;gap:8px}
.hub-btn:hover{border-color:var(--amber);transform:translateY(-2px);box-shadow:var(--shadow)}
.hub-btn .hb-ic{font-size:26px;margin-bottom:4px}
.hub-btn .hb-t{font-family:var(--disp);font-weight:800;font-size:17px}
.hub-btn .hb-d{font-size:13px;color:var(--ink-dim);line-height:1.4}
.hub-btn.accent{background:linear-gradient(135deg,rgba(255,176,0,.12),transparent 70%);border-color:var(--amber-deep)}

/* ===== MODAL ===== */
.overlay{position:fixed;inset:0;z-index:60;background:rgba(26,34,48,.45);backdrop-filter:blur(4px);display:flex;align-items:flex-end;justify-content:center;opacity:0;pointer-events:none;transition:.2s}
.overlay.on{opacity:1;pointer-events:auto}
@media(min-width:640px){.overlay{align-items:center;padding:24px}}
.sheet{background:var(--panel);border:1px solid var(--line);width:100%;max-width:560px;max-height:92vh;overflow-y:auto;border-radius:18px 18px 0 0;transform:translateY(20px);transition:.25s}
.overlay.on .sheet{transform:translateY(0)}
@media(min-width:640px){.sheet{border-radius:16px}}
.sheet-head{position:sticky;top:0;z-index:2;background:var(--panel);display:flex;align-items:center;gap:12px;padding:18px 20px;border-bottom:1px solid var(--line-soft)}
.sheet-head h2{font-family:var(--disp);font-weight:800;font-size:19px;margin:0;flex:1}
.sheet-body{padding:20px}
.sheet-foot{position:sticky;bottom:0;background:var(--panel);border-top:1px solid var(--line-soft);padding:14px 20px;display:flex;gap:10px}
.x-btn{background:var(--panel-2);border:1px solid var(--line);color:var(--ink-mid);width:34px;height:34px;border-radius:8px;font-size:16px;display:grid;place-items:center}
.x-btn:hover{color:var(--ink)}
.detail-row{display:flex;justify-content:space-between;gap:14px;padding:11px 0;border-bottom:1px solid var(--line-soft);font-size:14px}
.detail-row .k{color:var(--ink-dim);font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;padding-top:2px}
.detail-row .v{text-align:right;color:var(--ink)}
.detail-desc{background:var(--panel-2);border:1px solid var(--line-soft);border-radius:9px;padding:13px 15px;font-size:14px;color:var(--ink-mid);line-height:1.55;margin:4px 0 16px}
.photo-grid{display:flex;gap:8px;flex-wrap:wrap;margin:6px 0 18px}
.photo-grid img{width:84px;height:84px;border-radius:9px;object-fit:cover;border:1px solid var(--line);cursor:pointer}
.detail-store{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
.gps-btn{flex-shrink:0;text-decoration:none}
.thumb-grid{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 16px}
.thumb{width:72px;height:72px;border-radius:9px;overflow:hidden;border:1px solid var(--line);background:var(--panel-2);display:block;flex-shrink:0}
.thumb img{width:100%;height:100%;object-fit:cover;display:block}
.timeline{margin:6px 0 4px;padding-left:4px}
.tl-item{display:flex;gap:11px;padding:8px 0;font-size:13px}
.tl-dot{width:9px;height:9px;border-radius:50%;background:var(--amber);margin-top:5px;flex-shrink:0;box-shadow:0 0 0 3px rgba(255,176,0,.15)}
.tl-c .tl-act{font-weight:600;color:var(--ink)}
.tl-c .tl-meta{color:var(--ink-dim);font-size:11px;font-family:var(--mono);margin-top:2px}
.tl-c .tl-note{color:var(--ink-mid);font-size:13px;margin-top:3px}
.comments{display:flex;flex-direction:column;gap:9px;margin:4px 0 12px}
.cmt{background:var(--panel-2);border:1px solid var(--line-soft);border-radius:9px;padding:10px 12px}
.cmt-head{display:flex;align-items:baseline;gap:8px;margin-bottom:4px;flex-wrap:wrap}
.cmt-who{font-weight:700;font-size:13px}
.cmt-role{font-family:var(--mono);font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--amber);background:rgba(245,158,11,.12);padding:2px 6px;border-radius:4px}
.cmt-time{font-size:10px;color:var(--ink-dim);margin-left:auto}
.cmt-body{font-size:13.5px;color:var(--ink-mid);line-height:1.5;white-space:pre-wrap;word-break:break-word}
.comment-add{display:flex;flex-direction:column;gap:8px;margin-bottom:8px}
.comment-add .btn{align-self:flex-end}
.section-label{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-dim);margin:20px 0 10px;display:flex;align-items:center;gap:8px}
.section-label .ln{flex:1;height:1px;background:var(--line-soft)}
.status-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;margin-bottom:6px}
.status-opt{border:1px solid var(--line);background:var(--panel-2);border-radius:8px;padding:10px;font-size:12px;font-weight:600;display:flex;align-items:center;gap:7px;transition:.13s;text-align:left}
.status-opt:hover{border-color:var(--ink-dim)}
.status-opt.cur{border-color:var(--amber);background:rgba(255,176,0,.08)}
.status-opt .dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.upload-zone{border:1.5px dashed var(--line);border-radius:11px;padding:18px;text-align:center;color:var(--ink-dim);transition:.15s;cursor:pointer;background:var(--panel-2)}
.other-job{background:var(--panel-2);border:1px solid var(--line);border-radius:10px;padding:12px 14px;border-left:3px solid var(--s-progress)}
.other-job .oj-store{font-weight:700;font-size:14px}
.other-job .oj-desc{font-size:13px;color:var(--ink-mid);margin-top:2px}
.other-job .oj-meta{font-size:11px;color:var(--s-progress);margin-top:6px}
.wait-chips{display:flex;flex-wrap:wrap;gap:8px}
.wait-chip{border:1px solid var(--line);background:var(--panel-2);color:var(--ink-mid);border-radius:999px;padding:9px 14px;font-size:13px;font-weight:600;transition:.13s;min-height:40px}
.wait-chip:hover{border-color:var(--ink-dim)}
.wait-chip.on{border-color:var(--amber);background:rgba(245,158,11,.12);color:var(--amber-deep)}
.upload-zone:hover{border-color:var(--amber);color:var(--amber)}
.upload-zone .uz-ic{font-size:24px;margin-bottom:6px}
.upload-zone .uz-t{font-size:13px;font-weight:600}
.upload-zone .uz-h{font-size:11px;margin-top:3px;font-family:var(--mono)}
.preview-strip{display:flex;gap:7px;flex-wrap:wrap;margin-top:11px}
.preview-strip .pv{position:relative}
.preview-strip img{width:52px;height:52px;border-radius:8px;object-fit:cover;border:1px solid var(--line)}
.preview-strip .pv-x{position:absolute;top:-5px;right:-5px;background:var(--red);color:#fff;border:none;border-radius:50%;width:18px;height:18px;font-size:10px;line-height:1;display:grid;place-items:center}
.preview-strip .pv-spin{position:absolute;inset:0;display:grid;place-items:center;background:rgba(255,255,255,.6);border-radius:8px}
textarea.input{resize:vertical;min-height:90px;line-height:1.5}
select.input{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236b7686' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:36px}
.vrow{display:flex;align-items:center;gap:12px;padding:13px 0;border-bottom:1px solid var(--line-soft)}
.vrow:last-child{border:none}
.vrow .v-name{font-weight:600;flex:1;min-width:0}
.vrow .v-meta{font-size:11px;color:var(--ink-dim);font-family:var(--mono)}

/* ===== VIEW AS ===== */
.va-list{display:flex;flex-direction:column;gap:6px;max-height:48vh;overflow-y:auto}
.va-row{display:flex;align-items:center;gap:12px;padding:11px 13px;background:var(--panel-2);border:1px solid var(--line-soft);border-radius:9px;text-align:left;transition:.12s;font-family:inherit}
.va-row:hover{border-color:var(--amber);background:#fff}
.va-main{display:flex;flex-direction:column;gap:2px;min-width:0}
.va-name{font-weight:600;font-size:14px;color:var(--ink)}
.va-sub{font-size:11px;color:var(--ink-dim);font-family:var(--mono)}
/* simulation frame: shrink the app into a centered, bordered window */
body.simulating{padding-top:54px}
body.simulating #app{
  max-width:880px;margin:14px auto 40px;border:2px solid var(--amber);
  border-radius:16px;overflow:hidden;box-shadow:0 12px 50px rgba(180,83,9,.25);
  position:relative;background:var(--ground);
}
body.simulating .topbar{position:static}
body.simulating .wrap{padding-bottom:40px}
.sim-banner{
  position:fixed;top:0;left:0;right:0;z-index:70;height:46px;
  background:var(--amber);color:#3a2600;display:flex;align-items:center;gap:14px;
  padding:0 16px;box-shadow:0 2px 10px rgba(0,0,0,.15);
}
.sim-tag{font-family:var(--mono);font-size:10px;font-weight:800;letter-spacing:.14em;background:#3a2600;color:var(--amber);padding:4px 8px;border-radius:5px}
.sim-who{display:flex;flex-direction:column;line-height:1.15;flex:1;min-width:0}
.sim-who b{font-size:14px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sim-who span{font-size:10px;font-family:var(--mono);text-transform:uppercase;letter-spacing:.08em;opacity:.8}
.sim-return{background:#3a2600!important;color:var(--amber)!important;border-color:#3a2600!important;flex-shrink:0}
.sim-return:hover{background:#1f1400!important}
@media(max-width:560px){body.simulating #app{margin:10px;border-radius:12px}.sim-who b{font-size:13px}}

.toast{position:fixed;left:50%;bottom:26px;transform:translate(-50%,30px);z-index:80;background:var(--panel-2);border:1px solid var(--line);color:var(--ink);padding:12px 18px;border-radius:10px;font-size:14px;font-weight:500;box-shadow:var(--shadow);opacity:0;transition:.25s;max-width:90vw;display:flex;align-items:center;gap:9px}
.toast.show{opacity:1;transform:translate(-50%,0)}
.toast.ok{border-color:rgba(52,211,153,.4)}
.toast.err{border-color:rgba(248,113,113,.4)}
.fab{position:fixed;right:20px;bottom:22px;z-index:50;background:var(--amber);color:#1a1305;border:1px solid var(--amber-deep);border-radius:14px;padding:14px 18px;font-weight:700;font-size:15px;display:flex;align-items:center;gap:9px;box-shadow:var(--shadow)}
.fab:hover{background:#ffbe2e}
.loader{position:fixed;inset:0;z-index:90;display:grid;place-items:center;background:var(--ground)}
.spin{width:30px;height:30px;border:3px solid var(--line);border-top-color:var(--amber);border-radius:50%;animation:sp .7s linear infinite}
@keyframes sp{to{transform:rotate(360deg)}}
.inline-spin{width:15px;height:15px;border:2px solid rgba(0,0,0,.25);border-top-color:#1a1305;border-radius:50%;animation:sp .7s linear infinite;display:inline-block}
.poll-dot{position:fixed;left:14px;bottom:14px;z-index:50;font-family:var(--mono);font-size:10px;color:var(--ink-dim);display:flex;align-items:center;gap:6px}
.poll-dot .d{width:6px;height:6px;border-radius:50%;background:var(--green)}
.poll-dot.busy .d{background:var(--amber)}
@media(max-width:600px){
  .wrap{padding:16px 12px 88px}
  .page-title{font-size:21px}
  .page-head{gap:10px}
  .hub{grid-template-columns:1fr}
  .detail-row{gap:10px}
  .detail-row .v{max-width:52vw}
  .topbar{gap:8px;padding:10px 12px}
  .brand-sub{display:none}
  .brand-name{font-size:15px}
  .who-name{max-width:30vw;font-size:12px}
  .icon-btn{width:40px;height:40px}
  /* tiles: Open + expander + Closed on top row; middle 6 drop below when expanded */
  .tiles-wrap{flex-wrap:wrap}
  .tiles-wrap>.tile{flex:1 1 38%;min-width:0}
  .tiles-exp{width:auto;flex:1 1 100%;flex-direction:row;padding:8px;order:3}
  .exp-hint{writing-mode:horizontal-tb}
  .tiles-mid{flex:1 1 100%;order:4;max-width:none;max-height:0;flex-wrap:wrap;transition:max-height .35s ease,opacity .25s ease}
  .tiles-mid>.tile{flex:1 1 30%;min-width:0}
  .tiles-wrap.expanded .tiles-mid{max-height:400px}
  .tile-n{font-size:22px}
  /* controls stack */
  .board-controls{flex-direction:column;align-items:stretch}
  .loc-select{max-width:none}
  .search{width:100%}
  /* rows: stack the right side under the main content */
  .row{flex-direction:column;align-items:stretch;gap:9px;padding:12px 13px}
  .row-desc{white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
  .row-right{width:100%}
  .row-assign{width:100%}
  .row-sel{flex:1;min-width:0}
  .row-status{text-align:left;min-width:0}
  /* modal full-width */
  .sheet{max-width:100%}
  .sheet-body{padding:16px}
  .sheet-head{padding:15px 16px}
  .sheet-foot{padding:12px 16px}
  .status-grid{grid-template-columns:1fr 1fr}
  .photo-grid img{width:72px;height:72px}
  .cmt-time{margin-left:0;flex-basis:100%}
  .va-list{max-height:54vh}
  .fab{right:14px;bottom:16px;padding:13px 16px}
  .poll-dot{left:10px;bottom:10px}
  .login-card{max-width:100%}
  /* --- Overwatch management on mobile --- */
  .board-controls{flex-direction:column;align-items:stretch;gap:8px}
  .board-controls>*{width:100%}
  .row-assign{flex-direction:column;align-items:stretch;width:100%;gap:7px}
  .row-sel{width:100%;min-width:0}
  .row-bar{flex-direction:column;align-items:stretch;gap:9px}
  .row-bar .rb-btns{flex-wrap:wrap}
  .row-bar .rb-btns .btn,.row-bar .rb-btns a.btn{flex:1 1 calc(50% - 4px);justify-content:center;min-height:40px}
  .bulk-bar{position:sticky;top:60px;z-index:20}
  .bulk-bar .btn{flex:1 1 auto;min-height:40px}
  .bulk-count{margin-right:0;flex-basis:100%}
  .row-chk input{width:22px;height:22px}
  .rs-label,.rs-who,.rs-meta{text-align:left}
}
@media(max-width:380px){
  .tiles-mid>.tile{flex:1 1 45%}
  .tile-s{display:none}
}
@media(max-width:600px){.input,textarea.input,select.input{font-size:16px}}
@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
</style>
</head>
<body>

<!-- ===================== LOGIN ===================== -->
<div class="login-stage" id="loginStage">
  <div class="login-card">
    <div class="login-head">
      <div class="login-mark"></div>
      <div class="login-title">Maintenance</div>
      <div class="login-tag">Dossani Paradise · dispatch</div>
    </div>
    <div class="login-body">
      <div class="login-err hidden" id="loginErr"></div>
      <div class="field">
        <label class="label" for="emailIn">Work email</label>
        <input class="input" id="emailIn" type="email" autocomplete="username" placeholder="you@dossaniparadise.com" autocapitalize="off" spellcheck="false">
      </div>
      <div class="field">
        <label class="label" for="pwIn">Role password</label>
        <input class="input" id="pwIn" type="password" autocomplete="current-password" placeholder="••••••••">
      </div>
      <button class="btn btn-primary btn-block" id="loginBtn" onclick="doLogin()">Sign in</button>
      <div class="login-foot">Reads live from the alignment master</div>
    </div>
  </div>
</div>

<!-- ===================== APP ===================== -->
<div id="app" class="hidden">
  <div class="topbar" id="topbar">
    <div class="brand">
      <div class="brand-mark"></div>
      <div>
        <div class="brand-name">Maintenance</div>
        <div class="brand-sub" id="brandSub">Dispatch Console</div>
      </div>
    </div>
    <div class="topbar-spacer"></div>
    <div class="who">
      <div class="who-name" id="whoName">—</div>
      <div class="who-role" id="whoRole">—</div>
    </div>
    <button class="icon-btn" id="refreshBtn" title="Refresh now" onclick="manualRefresh()">⟳</button>
    <button class="icon-btn hidden" id="viewAsBtn" title="View as another person" onclick="openViewAs()">👁</button>
    <button class="icon-btn hidden" id="vendorTopBtn" title="Third-party techs" onclick="openVendors()">🏢</button>
    <button class="icon-btn hidden" id="settingsBtn" title="Settings" onclick="openSettings()">⚙</button>
    <button class="icon-btn" title="Sign out" onclick="logout()">⏻</button>
  </div>
  <div class="wrap" id="mainView"></div>
</div>

<div class="poll-dot hidden" id="pollDot"><span class="d"></span><span id="pollTxt">live</span></div>
<div class="toast" id="toast"></div>
<div class="loader hidden" id="loader"><div class="spin"></div></div>

<script>
/* ============================================================
   CONFIG — satellite app. No Firebase SDK. Reads/writes via the
   alignment API. The store location is the immutable anchor for a
   ticket; coach/director/tech are resolved LIVE from the master.
   ============================================================ */
const API_BASE_URL = "https://alignment-api-khaki.vercel.app/api/dpm-alignment";
const APP_WRITE_PASSWORD = "rm123"; // must match ROLES.MAINTENANCE on the API
const IMGBB_API_KEY = "b733862d15744e2bfaa4329d122f4ba0";
const POLL_MS = 20000;
let   SHOW_REF_TAGS = false; // default OFF — toggle with the # button in the top bar

const ROLE_PASSWORDS = {
  admin:"Overwatch@76051", director:"DO@76051", coach:"AC@76051", manager:"Dossani@76051", tech:"Repair@76051",
};
const ADMIN_EMAILS = ["itsupport@dossaniparadise.com","rahim@dossaniparadise.com"];
const TICKETS_NODE = "maintenanceTickets";
const VENDORS_NODE = "maintenanceVendors";

const STATUSES = {
  unassigned:{label:"Unassigned",color:"var(--s-open)"},
  assigned:{label:"Assigned",color:"var(--s-assigned)"},
  dispatched:{label:"Dispatched",color:"var(--blue)"},
  waiting:{label:"Waiting",color:"var(--s-waiting)"},
  in_progress:{label:"In Progress",color:"var(--s-progress)"},
  finished:{label:"Finished",color:"var(--s-finished)"},
  closed:{label:"Closed",color:"var(--s-closed)"},
};
const STATUS_ORDER = ["unassigned","assigned","dispatched","waiting","in_progress","finished","closed"];
// statuses that count as "still active" (not closed)
const ACTIVE_STATUSES = ["unassigned","assigned","dispatched","waiting","in_progress","finished"];
const CATEGORIES = {plumbing:"Plumbing",equipment:"Equipment",hvac:"HVAC",electrical:"Electrical",it:"IT / POS",structural:"Structural",safety:"Safety",other:"Other"};
const CAT_PREFIX = {plumbing:"PLM",equipment:"EQP",hvac:"HVC",electrical:"ELE",it:"IT",structural:"STR",safety:"SAF",other:"GEN"};
const PRIORITIES = {normal:"Normal",urgent:"Urgent",emergency:"Emergency"};
const WAITING_REASONS = ["Awaiting parts","Awaiting third-party tech","Awaiting approval","Awaiting access","Scheduled — future date","Other"];
const ROLE_LABEL = {admin:"Overwatch",director:"Director",coach:"Area Coach",manager:"Store Manager",tech:"Repair Tech"};
const ROLE_PREFIX = {admin:"o",director:"d",coach:"a",tech:"r",manager:"m"};

/* ============================================================ STATE */
let MASTER=null, SESSION=null;
let REPLY_NUMBERS={}; // email(lowercased) -> reply phone number, stored in master
let TICKETS={}, VENDORS={}, RESTAURANTS={};
let curFilter="active", curSearch="", curStore="all", tilesExpanded=false, curAssignee="all";
let selectMode=false, selectedIds={}; // bulk-action selection (finished/closed pages)
let openGroups={};          // storeId -> bool (expanded)
let managerScreen="hub";
let pollTimer=null;

/* ============================================================ API */
async function apiGet(){
  const r=await fetch(API_BASE_URL,{cache:"no-store"});
  if(!r.ok) throw new Error("Could not reach the alignment master");
  return await r.json();
}
async function apiWrite(path,payload){
  const updates={}; updates[path]=payload;
  const r=await fetch(API_BASE_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:APP_WRITE_PASSWORD,updates})});
  if(!r.ok){let m="Write failed";try{m=(await r.json()).error||m}catch(e){}throw new Error(m)}
}
async function refresh(){
  MASTER=await apiGet();
  RESTAURANTS=MASTER.restaurants||{};
  TICKETS=MASTER[TICKETS_NODE]||{};
  VENDORS=MASTER[VENDORS_NODE]||{};
  // reply numbers are stored as contact info on each Overwatch admin record
  REPLY_NUMBERS={};
  Object.values(MASTER.admins||{}).forEach(a=>{
    if(a.email&&a.replyNumber)REPLY_NUMBERS[a.email.toLowerCase()]=a.replyNumber;
  });
}

/* ============================================================ IMGBB */
async function uploadPhoto(file){
  const fd=new FormData();fd.append("image",file);
  const r=await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,{method:"POST",body:fd});
  const j=await r.json();
  if(!j.success)throw new Error(j.error?.message||"Photo upload failed");
  return j.data.url;
}

/* ============================================================ HELPERS */
const $=id=>document.getElementById(id);
// true on phones/tablets where tel:/sms: open native apps
const IS_MOBILE = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.maxTouchPoints>1 && /Mac/.test(navigator.platform));
function telLink(num){return "tel:"+String(num).replace(/[^0-9+]/g,"");}
function smsLink(num,body){return "sms:"+String(num).replace(/[^0-9+]/g,"")+(body?("?&body="+encodeURIComponent(body)):"");}
function mailtoLink(to,subject,body,replyTo){
  // mailto can't set true Reply-To, so we surface it in the body for now
  const params=[]; if(subject)params.push("subject="+encodeURIComponent(subject)); if(body)params.push("body="+encodeURIComponent(body));
  return "mailto:"+to+(params.length?("?"+params.join("&")):"");
}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function escA(s){return String(s??"").replace(/"/g,"&quot;")}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
// Readable per-store, per-category sequential ID, e.g. 23086-PLM-0004.
// No transactions on the API, so we scan existing tickets for the max sequence
// and bump. Caller re-reads fresh right before this to minimize collision window.
function nextShortId(sid,category){
  const digits=String(storeNum(sid)).replace(/\D/g,"")||"00000";
  const pfx=CAT_PREFIX[category]||"GEN";
  const stem=`${digits}-${pfx}-`;
  let max=0;
  Object.values(TICKETS).forEach(t=>{
    if(typeof t.shortId==="string" && t.shortId.startsWith(stem)){
      const n=parseInt(t.shortId.slice(stem.length),10);
      if(!isNaN(n)&&n>max)max=n;
    }
  });
  return stem+String(max+1).padStart(4,"0");
}
function now(){return Date.now()}
function fmtDate(ts){if(!ts)return"—";const d=new Date(ts);return d.toLocaleDateString("en-US",{month:"short",day:"numeric"})+" · "+d.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})}
function timeAgo(ts){if(!ts)return"";const s=Math.floor((now()-ts)/1000);if(s<60)return"just now";const m=Math.floor(s/60);if(m<60)return m+"m ago";const h=Math.floor(m/60);if(h<24)return h+"h ago";return Math.floor(h/24)+"d ago"}
function toast(msg,type="ok"){const t=$("toast");t.textContent=msg;t.className="toast "+type+" show";clearTimeout(t._t);t._t=setTimeout(()=>t.className="toast",2800)}
function showLoader(b){$("loader").classList.toggle("hidden",!b)}

/* ---- store + LIVE relationship lookups (the store is the anchor) ---- */
function store(rid){return RESTAURANTS[rid]||{}}
function storeName(rid){return store(rid).storeName||"Unknown store"}
function storeNum(rid){return store(rid).storeNumber||""}
function storeDirector(rid){const id=store(rid).assignedDirectorId;return (MASTER.directors||{})[id]||null}
function storeCoach(rid){const id=store(rid).assignedAreaCoachId;return (MASTER.areaCoaches||{})[id]||null}
function storeTech(rid){const id=store(rid).assignedRepairTechnicianId;return (MASTER.repairTechnicians||{})[id]||null}
function techName(tid){return (MASTER.repairTechnicians||{})[tid]?.name||null}
function storeManagerName(rid){return store(rid).storeManager||""}
/* ---- GPS link for a store. Coordinates are most precise; if a store has none
   (a handful don't), fall back to its street address, then its name. Returns a
   universal maps URL that opens the native maps/GPS app on phones (Google Maps
   on Android, Apple Maps on iOS) and a map in any browser. */
function storeGeoUrl(rid){
  const s=store(rid);
  const lat=parseFloat(s.latitude), lng=parseFloat(s.longitude);
  if(isFinite(lat)&&isFinite(lng)) return `https://maps.google.com/?q=${lat},${lng}`;
  const q=(s.address||storeName(rid)||"").trim();
  return q?`https://maps.google.com/?q=${encodeURIComponent(q)}`:"";
}

/* ============================================================ LOGIN */
async function doLogin(){
  const email=$("emailIn").value.trim().toLowerCase(), pw=$("pwIn").value, errEl=$("loginErr");
  errEl.classList.add("hidden");
  if(!email||!pw)return showErr("Enter your email and password.");
  const btn=$("loginBtn");btn.disabled=true;btn.innerHTML='<span class="inline-spin"></span> Checking…';
  try{
    await refresh();
    const sess=resolveSession(email,pw);
    if(sess.error){btn.disabled=false;btn.textContent="Sign in";return showErr(sess.error)}
    SESSION=sess; saveSession(email,pw); enterApp();
  }catch(e){showErr(e.message||"Something went wrong.");btn.disabled=false;btn.textContent="Sign in"}
  function showErr(m){errEl.textContent=m;errEl.classList.remove("hidden")}
}
function resolveSession(email,pw){
  const lc=email.toLowerCase(), me=(o,id)=>(o[id]?.email||"").toLowerCase()===lc;
  const admins=MASTER.admins||{};
  if(ADMIN_EMAILS.includes(lc)||Object.keys(admins).some(id=>me(admins,id))){
    if(pw!==ROLE_PASSWORDS.admin)return{error:"That password doesn't match the admin role."};
    const a=Object.values(admins).find(x=>(x.email||"").toLowerCase()===lc);
    return{email:lc,role:"admin",name:a?.name||"Administrator",scope:"all"};
  }
  const dirs=MASTER.directors||{}, dId=Object.keys(dirs).find(id=>me(dirs,id));
  if(dId){if(pw!==ROLE_PASSWORDS.director)return{error:"That password doesn't match the director role."};
    return{email:lc,role:"director",name:dirs[dId].name,scope:"director",refId:dId}}
  const co=MASTER.areaCoaches||{}, cId=Object.keys(co).find(id=>me(co,id));
  if(cId){if(pw!==ROLE_PASSWORDS.coach)return{error:"That password doesn't match the area coach role."};
    return{email:lc,role:"coach",name:co[cId].name,scope:"stores",refField:"assignedAreaCoachId",refId:cId}}
  const te=MASTER.repairTechnicians||{}, tId=Object.keys(te).find(id=>me(te,id));
  if(tId){if(pw!==ROLE_PASSWORDS.tech)return{error:"That password doesn't match the technician role."};
    return{email:lc,role:"tech",name:te[tId].name,scope:"stores",refField:"assignedRepairTechnicianId",refId:tId}}
  const sId=Object.keys(RESTAURANTS).find(r=>(RESTAURANTS[r].email||"").toLowerCase()===lc);
  if(sId){if(pw!==ROLE_PASSWORDS.manager)return{error:"That password doesn't match the store role."};
    return{email:lc,role:"manager",name:RESTAURANTS[sId].storeManager||storeName(sId),scope:"single",storeId:sId}}
  return{error:"We couldn't find that email in the alignment master. Check it's the email on file."};
}

/* ============================================================ VIEW AS (overwatch only)
   Builds an impersonated session for any person using the SAME shape resolveSession
   produces, so the simulated view matches exactly what that person would see.
   REAL_SESSION holds the admin's true session while impersonating. */
let REAL_SESSION=null;
function buildImpersonatedSession(kind,id){
  if(kind==="director"){const d=MASTER.directors[id];return{email:(d.email||"").toLowerCase(),role:"director",name:d.name,scope:"director",refId:id,_sim:true}}
  if(kind==="coach"){const c=MASTER.areaCoaches[id];return{email:(c.email||"").toLowerCase(),role:"coach",name:c.name,scope:"stores",refField:"assignedAreaCoachId",refId:id,_sim:true}}
  if(kind==="tech"){const t=MASTER.repairTechnicians[id];return{email:(t.email||"").toLowerCase(),role:"tech",name:t.name,scope:"stores",refField:"assignedRepairTechnicianId",refId:id,_sim:true}}
  if(kind==="manager"){const s=RESTAURANTS[id];return{email:(s.email||"").toLowerCase(),role:"manager",name:s.storeManager||storeName(id),scope:"single",storeId:id,_sim:true}}
  return null;
}
// flat roster of everyone an admin can view as; managers labeled by store
function viewAsRoster(){
  const list=[];
  Object.entries(MASTER.directors||{}).forEach(([id,d])=>list.push({kind:"director",id,primary:"Director — "+d.name,secondary:"",search:(d.name+" director").toLowerCase(),sortk:"1"+d.name}));
  Object.entries(MASTER.areaCoaches||{}).forEach(([id,c])=>list.push({kind:"coach",id,primary:"Area Coach — "+c.name,secondary:"",search:(c.name+" area coach").toLowerCase(),sortk:"2"+c.name}));
  Object.entries(MASTER.repairTechnicians||{}).forEach(([id,t])=>list.push({kind:"tech",id,primary:"Repair Tech — "+t.name,secondary:"",search:(t.name+" tech").toLowerCase(),sortk:"3"+t.name}));
  Object.keys(RESTAURANTS).forEach(id=>{
    const s=RESTAURANTS[id];
    const mgr=s.storeManager||"—";
    list.push({kind:"manager",id,
      primary:"Manager · "+storeNum(id),
      secondary:storeName(id)+(s.storeManager?(" · "+s.storeManager):""),
      search:[storeNum(id),storeName(id),s.storeManager,"manager store"].filter(Boolean).join(" ").toLowerCase(),
      sortk:"4"+(storeNum(id)||"")});
  });
  // default order: directors, coaches, techs, then managers by store number
  return list.sort((a,b)=>a.sortk.localeCompare(b.sortk,undefined,{numeric:true}));
}
function startViewAs(kind,id){
  const sim=buildImpersonatedSession(kind,id);
  if(!sim){toast("Couldn't load that view","err");return}
  if(!REAL_SESSION)REAL_SESSION=SESSION;       // remember the real admin session once
  SESSION=sim;
  managerScreen="hub";
  openGroups={}; myStoreIds().forEach(s=>openGroups[s]=true);
  document.body.classList.add("simulating");
  enterAppChrome();
  render();
  renderSimBanner();
}
function returnToMyAccount(){
  if(!REAL_SESSION)return;
  SESSION=REAL_SESSION; REAL_SESSION=null;
  document.body.classList.remove("simulating");
  const b=$("simBanner"); if(b)b.remove();
  managerScreen="hub";
  openGroups={}; myStoreIds().forEach(s=>openGroups[s]=true);
  enterAppChrome();
  render();
  toast("Back to your account");
}
function openViewAs(){
  const roster=viewAsRoster();
  const rowHtml=r=>`
    <button class="va-row" data-search="${escA(r.search)}" onclick="closeModal();startViewAs('${r.kind}','${r.id}')">
      <span class="va-main"><span class="va-name">${esc(r.primary)}</span>${r.secondary?`<span class="va-sub">${esc(r.secondary)}</span>`:""}</span>
    </button>`;
  modal(`
    <div class="sheet-head"><h2>View as…</h2><button class="x-btn" onclick="closeModal()">✕</button></div>
    <div class="sheet-body">
      <p style="color:var(--ink-dim);font-size:13px;margin-top:0">Search by store #, name, or manager.</p>
      <input class="input" id="vaSearch" placeholder="Search store #, store name, or name…" oninput="filterViewAs(this.value)" style="margin-bottom:12px">
      <div class="va-list" id="vaList">${roster.map(rowHtml).join("")}</div>
    </div>
    <div class="sheet-foot"><button class="btn btn-ghost btn-block" onclick="closeModal()">Cancel</button></div>`);
}
function filterViewAs(q){
  q=(q||"").toLowerCase().trim();
  document.querySelectorAll("#vaList .va-row").forEach(row=>{
    row.style.display = row.getAttribute("data-search").includes(q) ? "" : "none";
  });
}
function renderSimBanner(){
  let b=$("simBanner");
  if(!b){b=document.createElement("div");b.id="simBanner";document.body.appendChild(b);}
  b.className="sim-banner";
  b.innerHTML=`
    <div class="sim-tag">VIEWING AS</div>
    <div class="sim-who"><b>${esc(SESSION.name)}</b><span>${esc(ROLE_LABEL[SESSION.role])}</span></div>
    <button class="btn btn-primary btn-sm sim-return" onclick="returnToMyAccount()">↩ Return to my account</button>`;
}

/* ============================================================ SCOPING (store-anchored, computed live) */
function myStoreIds(){
  if(!SESSION) return [];
  if(SESSION.scope==="all") return Object.keys(RESTAURANTS);
  if(SESSION.scope==="single") return [SESSION.storeId];
  if(SESSION.scope==="director"){
    // Director sees: stores stamped directly with their id, PLUS every store
    // under any area coach who reports to them (areaCoaches[].assignedDirectorId).
    const myCoaches=Object.keys(MASTER.areaCoaches||{}).filter(cid=>(MASTER.areaCoaches[cid].assignedDirectorId)===SESSION.refId);
    const coachSet=new Set(myCoaches);
    return Object.keys(RESTAURANTS).filter(r=>{
      const s=RESTAURANTS[r];
      return s.assignedDirectorId===SESSION.refId || coachSet.has(s.assignedAreaCoachId);
    });
  }
  // coach/tech: stores whose live assignment field === my id
  return Object.keys(RESTAURANTS).filter(r=>RESTAURANTS[r][SESSION.refField]===SESSION.refId);
}
// Closed tickets vanish from every view EXCEPT overwatch (kept for stats/reports).
// Statuses a tech is ever allowed to see. To keep their world simple, a tech
// only sees work that's been dispatched to them (dispatched/waiting/in_progress)
// plus what they've finished. No unassigned/assigned/closed.
const TECH_VISIBLE_STATUSES=["dispatched","waiting","in_progress","finished"];
function ticketsForStore(sid){
  return Object.keys(TICKETS).map(k=>({_id:k,...TICKETS[k]}))
    .filter(t=>t.storeId===sid)
    .filter(t=>SESSION.role==="admin" || t.status!=="closed")
    .filter(t=>SESSION.role!=="tech" || TECH_VISIBLE_STATUSES.includes(t.status));
}

/* ============================================================ PERMISSIONS */
function canCreate(){return SESSION.role!=="tech"}
function canManageVendors(){return SESSION.role==="admin"}
function canEditContent(){return SESSION.role==="admin"}
function canAssign(){return SESSION.role==="admin"}

/* ============================================================ ENTER / POLL */
function enterAppChrome(){
  $("loginStage").classList.add("hidden");
  $("app").classList.remove("hidden");
  $("whoName").textContent=SESSION.name;
  $("whoRole").textContent=ROLE_LABEL[SESSION.role];
  $("brandSub").textContent=ROLE_LABEL[SESSION.role]+" Console";
  $("vendorTopBtn").classList.toggle("hidden",!canManageVendors());
  // View As is available only to a real (non-simulated) admin
  const realAdmin = (REAL_SESSION?REAL_SESSION:SESSION).role==="admin" && !SESSION._sim;
  $("viewAsBtn").classList.toggle("hidden",!realAdmin);
  $("settingsBtn").classList.toggle("hidden",!realAdmin);
  document.body.classList.toggle("no-reftags",!SHOW_REF_TAGS);
}
function enterApp(){
  enterAppChrome();
  if(SESSION.role==="tech" && (curFilter==="active"||curFilter==="all")) curFilter="dispatched";
  managerScreen="hub";
  myStoreIds().forEach(id=>openGroups[id]=true);
  render();
  startPoll();
}
function logout(){SESSION=null;REAL_SESSION=null;clearSession();stopPoll();location.reload()}
/* ---- session persistence (stay logged in across refresh) ----
   Stores email + role password locally and silently re-resolves against the
   live master on load. We persist the password because identity is verified
   against the master each time; this matches the app's internal-tool model. */
const SESS_KEY="dpm_maint_session";
function saveSession(email,pw){try{localStorage.setItem(SESS_KEY,JSON.stringify({email,pw}))}catch(e){}}
function clearSession(){try{localStorage.removeItem(SESS_KEY)}catch(e){}}
async function tryRestoreSession(){
  let saved;try{saved=JSON.parse(localStorage.getItem(SESS_KEY)||"null")}catch(e){saved=null}
  if(!saved||!saved.email||!saved.pw)return false;
  try{
    await refresh();
    const sess=resolveSession(saved.email,saved.pw);
    if(sess.error){clearSession();return false}
    SESSION=sess;enterApp();return true;
  }catch(e){return false}
}
function startPoll(){stopPoll();pollTimer=setInterval(silentRefresh,POLL_MS);$("pollDot").classList.remove("hidden")}
function stopPoll(){if(pollTimer)clearInterval(pollTimer);pollTimer=null}
async function silentRefresh(){
  const dot=$("pollDot");dot.classList.add("busy");$("pollTxt").textContent="syncing";
  try{await refresh();if(!$("modalOverlay")||!$("modalOverlay").classList.contains("on"))render()}catch(e){}
  dot.classList.remove("busy");$("pollTxt").textContent="live";
}
async function manualRefresh(){const b=$("refreshBtn");b.style.transform="rotate(360deg)";await silentRefresh();setTimeout(()=>b.style.transform="",300);toast("Refreshed")}

/* ============================================================ RENDER ROOT */
function render(){
  const v=$("mainView");
  if(SESSION.role==="manager"&&managerScreen==="hub"){v.innerHTML=renderManagerHub();applyTags();return}
  v.innerHTML=renderBoard();
  applyTags();
}

/* ---- manager hub: single action + their open tickets listed below ---- */
function renderManagerHub(){
  const sid=SESSION.storeId, mine=ticketsForStore(sid);
  const open=mine.filter(t=>ACTIVE_STATUSES.includes(t.status)).sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
  const coach=storeCoach(sid), dir=storeDirector(sid), tech=storeTech(sid);
  const cards=open.length
    ? `<div class="rows">${open.map(ticketRow).join("")}</div>`
    : `<div class="empty" style="padding:40px 20px"><div class="empty-mark">✅</div><h3>No open tickets</h3><p>All clear.</p></div>`;
  return `
    <div class="page-head">
      <div>
        <div class="page-title">${esc(storeName(sid))}</div>
        <div class="page-meta">${esc(SESSION.name)}</div>
      </div>
    </div>
    <div class="sg-people" style="padding:0 0 16px">
      ${dir?`<span><b>Director:</b> ${esc(dir.name)}</span>`:""}
      ${coach?`<span><b>Coach:</b> ${esc(coach.name)}</span>`:""}
      ${tech?`<span><b>Tech:</b> ${esc(tech.name)}</span>`:`<span style="color:var(--ink-dim)">No tech assigned</span>`}
    </div>
    <button class="hub-btn accent" style="width:100%;margin-bottom:22px" onclick="openCreate('${sid}')">
      <div class="hb-ic">📝</div><div class="hb-t">Report new issue</div>
      <div class="hb-d">Open a ticket for your store. Add photos if helpful.</div>
    </button>
    <div class="section-label" style="margin-top:0">Your open tickets · ${open.length}<span class="ln"></span></div>
    ${cards}`;
}

/* ---- board: stores first, then their tickets ---- */
function renderBoard(){
  const storeIds=myStoreIds();
  let allTickets=[];
  storeIds.forEach(sid=>{allTickets=allTickets.concat(ticketsForStore(sid))});
  const cnt=s=>allTickets.filter(t=>t.status===s).length;
  const activeN=allTickets.filter(t=>ACTIVE_STATUSES.includes(t.status)).length;

  let title,meta;
  if(SESSION.role==="tech"){title="My dispatched stores";meta=`${esc(SESSION.name)} · ${storeIds.length} stores · ${allTickets.length} tickets`}
  else if(SESSION.role==="admin"){title="All stores";meta=`${storeIds.length} locations · overwatch`}
  else if(SESSION.role==="manager"){title=storeName(SESSION.storeId);meta="Your store"}
  else{title=ROLE_LABEL[SESSION.role]+" board";meta=`${storeIds.length} stores in your area`}

  // TECH view: only two buckets. "Dispatched" folds in dispatched + waiting +
  // in_progress (everything actively on their plate); "Finished" is its own tab.
  if(SESSION.role==="tech"){
    const dispN=cnt("dispatched")+cnt("waiting")+cnt("in_progress");
    const finN=cnt("finished");
    const techTiles=`
      <div class="tiles-wrap" id="tilesWrap">
        ${tile("dispatched",dispN,"DISPATCHED","On your plate","var(--blue)")}
        ${tile("finished",finN,"FINISHED","Work done","var(--s-finished)")}
      </div>`;
    const techHead=`
      <div class="page-head">
        <div><div class="page-title">${esc(title)}</div><div class="page-meta">${esc(meta)}</div></div>
      </div>
      ${techTiles}
      <div class="board-controls">
        ${storeIds.length>1?`<select class="input loc-select" onchange="curStore=this.value;render()">
          <option value="all"${curStore==="all"?" selected":""}>All stores (${storeIds.length})</option>
          ${storeIds.slice().sort((a,b)=>storeName(a).localeCompare(storeName(b))).map(id=>`<option value="${id}"${curStore===id?" selected":""}>${esc(storeName(id))}</option>`).join("")}
        </select>`:""}
        <input class="input search" placeholder="Search store, issue, ticket #…" value="${escA(curSearch)}" oninput="curSearch=this.value;render()">
      </div>`;
    if(!storeIds.length) return techHead+`<div class="empty"><div class="empty-mark">🏪</div><h3>No stores dispatched to you</h3><p>Managed in the master.</p></div>`;
    let trows=allTickets.slice();
    if(curStore!=="all") trows=trows.filter(t=>t.storeId===curStore);
    trows=applyFilterSearch(trows);
    // In-progress jobs always ride at the top (highlighted blue); then the rest
    // by most-recently-touched. Keeps the active job in the tech's face.
    if(curFilter==="dispatched"){
      trows.sort((a,b)=>{
        const ai=a.status==="in_progress"?0:1, bi=b.status==="in_progress"?0:1;
        if(ai!==bi)return ai-bi;
        return (b.updatedAt||b.createdAt||0)-(a.updatedAt||a.createdAt||0);
      });
    }
    const tlabel = curFilter==="finished" ? "Finished" : "Dispatched";
    const tlistHead=`<div class="list-head">${tlabel} tickets <span class="lh-n">(${trows.length})</span></div>`;
    const tbody = trows.length
      ? `<div class="rows">${trows.map(ticketRow).join("")}</div>`
      : `<div class="empty"><div class="empty-mark">🗂️</div><h3>Nothing here</h3><p>${curSearch?"No tickets match your search.":"No tickets in this view."}</p></div>`;
    return techHead+tlistHead+tbody;
  }

  // Open (yellow) = all not-closed; Closed (grey) always visible.
  // The 6 lifecycle tiles in between expand on hover (desktop) / tap (touch).
  const midTiles=[
    tile("unassigned",cnt("unassigned"),"UNASSIGNED","Needs an owner","var(--s-open)"),
    tile("assigned",cnt("assigned"),"ASSIGNED","Tech chosen","var(--s-assigned)"),
    tile("dispatched",cnt("dispatched"),"DISPATCHED","Sent to tech","var(--blue)"),
    tile("waiting",cnt("waiting"),"WAITING","On hold","var(--s-waiting)"),
    tile("in_progress",cnt("in_progress"),"IN PROGRESS","Being worked","var(--s-progress)"),
    tile("finished",cnt("finished"),"FINISHED","Work done","var(--s-finished)"),
  ].join("");
  // If a middle status is the active filter, keep the strip pinned open so the
  // user can hop between sub-pages without re-expanding (sketch: ( . . . ! . )).
  const MID=["unassigned","assigned","dispatched","waiting","in_progress"].concat(["finished"]);
  const midActive=MID.includes(curFilter);
  if(midActive){tilesExpanded=true;_tilePinned=true;}
  const tilesBlock=`
    <div class="tiles-wrap ${tilesExpanded?"expanded":""}" id="tilesWrap"
         onmouseenter="expandTiles(true)" onmouseleave="expandTiles(false)">
      ${tile("active",activeN,"OPEN","All not closed","var(--amber)")}
      <button class="tiles-exp" onclick="toggleTiles()" title="Show all statuses" aria-label="Show all statuses">
        <span class="exp-chevs">⟨ ⟩</span><span class="exp-hint">statuses</span>
      </button>
      <div class="tiles-mid">${midTiles}</div>
      ${tile("closed",cnt("closed"),"CLOSED","No follow-up","var(--s-closed)")}
    </div>`;

  const head=`
    <div class="page-head">
      <div><div class="page-title">${esc(title)}</div><div class="page-meta">${esc(meta)}</div></div>
      <div class="head-actions">${canCreate()?`<button class="btn btn-primary btn-sm" onclick="openCreate()">＋ New ticket</button>`:""}</div>
    </div>
    ${tilesBlock}
    <div class="board-controls">
      ${storeIds.length>1?`<select class="input loc-select" onchange="curStore=this.value;render()">
        <option value="all"${curStore==="all"?" selected":""}>All stores (${storeIds.length})</option>
        ${storeIds.slice().sort((a,b)=>storeName(a).localeCompare(storeName(b))).map(id=>`<option value="${id}"${curStore===id?" selected":""}>${esc(storeName(id))}</option>`).join("")}
      </select>`:""}
      ${(curFilter==="dispatched"||curFilter==="assigned")?assigneeFilterSelect(allTickets):""}
      <input class="input search" placeholder="Search store, issue, ticket #…" value="${escA(curSearch)}" oninput="curSearch=this.value;render()">
    </div>`;

  if(!storeIds.length) return head+`<div class="empty"><div class="empty-mark">🏪</div><h3>No stores assigned to you</h3><p>Managed in the master.</p></div>`;

  // flat, sorted list of rows (location-filtered)
  let rows=allTickets.slice();
  if(curStore!=="all") rows=rows.filter(t=>t.storeId===curStore);
  rows=applyFilterSearch(rows);
  const label=({active:"Open",all:"All",unassigned:"Unassigned",assigned:"Assigned",dispatched:"Dispatched",waiting:"Waiting",in_progress:"In Progress",finished:"Finished",closed:"Closed"})[curFilter]||"";
  // bulk-action bar — admin only, on the finished & closed pages
  const bulkable = SESSION.role==="admin" && (curFilter==="finished"||curFilter==="closed");
  const visibleIds = rows.map(t=>t._id);
  const selCount = visibleIds.filter(id=>selectedIds[id]).length;
  let bulkBar="";
  if(bulkable){
    if(!selectMode){
      bulkBar=`<div class="bulk-bar">
        <button class="btn btn-ghost btn-sm" onclick="startSelect()">☑ Select</button>
        ${curFilter==="finished"
          ? `<button class="btn btn-primary btn-sm" onclick="confirmBulk('closeAll')">Close out all finished (${rows.length})</button>`
          : `<button class="btn btn-ghost btn-sm" onclick="openReopenAll()">↩ Reopen by date…</button>`}
      </div>`;
    }else{
      const moveBtns = curFilter==="finished"
        ? `<button class="btn btn-primary btn-sm" ${selCount?"":"disabled"} onclick="confirmBulk('closeSel')">Close out (${selCount})</button>`
        : `<button class="btn btn-ghost btn-sm" ${selCount?"":"disabled"} onclick="confirmBulk('toFinished')">→ Finished (${selCount})</button>
           <button class="btn btn-ghost btn-sm" ${selCount?"":"disabled"} onclick="confirmBulk('toUnassigned')">→ Unassigned (${selCount})</button>`;
      bulkBar=`<div class="bulk-bar active">
        <label class="bulk-all"><input type="checkbox" ${selCount===rows.length&&rows.length?"checked":""} onchange="toggleAllVisible(this.checked)"> All</label>
        <span class="bulk-count">${selCount} selected</span>
        ${moveBtns}
        <button class="btn btn-ghost btn-sm" onclick="endSelect()">Cancel</button>
      </div>`;
    }
  }
  const listHead=`<div class="list-head">${esc(label)} tickets <span class="lh-n">(${rows.length})</span></div>${bulkBar}`;
  const body = rows.length
    ? `<div class="rows">${rows.map(ticketRow).join("")}</div>`
    : `<div class="empty"><div class="empty-mark">🗂️</div><h3>Nothing here</h3><p>${curSearch?"No tickets match your search.":"No tickets in this view."}</p></div>`;

  return head+listHead+body+(canCreate()?`<button class="fab" onclick="openCreate()">＋ New</button>`:"");

  function tile(key,n,label,sub,c){
    const on=curFilter===key;
    const big=on&&["unassigned","assigned","dispatched","waiting","in_progress","finished"].includes(key)?" big":"";
    return `<button class="tile ${on?"on":""}${big}" style="--tc:${c}" onclick="pickStatus('${key}')">
      <div class="tile-l">${label}</div><div class="tile-n">${n}</div><div class="tile-s">${sub}</div></button>`;
  }
}
// choosing OPEN or CLOSED unpins the strip; a middle status keeps it open
function pickStatus(key){
  curFilter=key; curAssignee="all"; selectMode=false; selectedIds={};
  if(key==="active"||key==="closed"){_tilePinned=false;tilesExpanded=false;}
  render();
}
// expand the middle status tiles. Hover toggles on desktop; tap (the ⟨ ⟩ button)
// pins it open/closed for touch devices. We avoid re-render to keep the CSS animation.
let _tilePinned=false;
function expandTiles(on){
  if(_tilePinned)return;            // a tap-pin overrides hover
  const w=$("tilesWrap"); if(w)w.classList.toggle("expanded",on);
  tilesExpanded=on;
}
function toggleTiles(){
  _tilePinned=!_tilePinned;
  tilesExpanded=_tilePinned;
  const w=$("tilesWrap"); if(w)w.classList.toggle("expanded",_tilePinned);
}

function applyFilterSearch(list){
  let out=list.slice();
  // Tech "Dispatched" tab is a bucket: dispatched + waiting + in_progress.
  if(SESSION.role==="tech" && curFilter==="dispatched")
    out=out.filter(t=>["dispatched","waiting","in_progress"].includes(t.status));
  else if(curFilter==="active")out=out.filter(t=>ACTIVE_STATUSES.includes(t.status));
  else if(curFilter==="all")out=out.filter(t=>SESSION.role==="admin"?true:t.status!=="closed");
  else out=out.filter(t=>t.status===curFilter);
  if((curFilter==="dispatched"||curFilter==="assigned")&&curAssignee!=="all"){
    out=out.filter(t=>{const w=ticketAssignee(t);return w&&(w.kind+":"+w.id)===curAssignee});
  }
  if(curSearch){const q=curSearch.toLowerCase();
    out=out.filter(t=>(t.description||"").toLowerCase().includes(q)||(CATEGORIES[t.category]||"").toLowerCase().includes(q)||(t.shortId||"").toLowerCase().includes(q)||storeName(t.storeId).toLowerCase().includes(q)||storeNum(t.storeId).toLowerCase().includes(q))}
  out.sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
  return out;
}
// dropdown of the distinct assignees present in the current status, to filter by
function assigneeFilterSelect(allTickets){
  const inStatus=allTickets.filter(t=>t.status===curFilter);
  const seen={};
  inStatus.forEach(t=>{const w=ticketAssignee(t);if(w)seen[w.kind+":"+w.id]=w.name});
  const opts=Object.entries(seen).sort((a,b)=>a[1].localeCompare(b[1]))
    .map(([k,name])=>`<option value="${k}"${curAssignee===k?" selected":""}>${esc(name)}</option>`).join("");
  const lbl=curFilter==="dispatched"?"dispatched to":"assigned to";
  return `<select class="input loc-select" onchange="curAssignee=this.value;render()">
    <option value="all"${curAssignee==="all"?" selected":""}>All (${lbl})</option>${opts}</select>`;
}

// compact horizontal ticket row
// resolve who a ticket is on, with kind + contact info (for the contact drafts)
function ticketAssignee(t){
  if(t.assignedTechId){const x=(MASTER.repairTechnicians||{})[t.assignedTechId];return x?{kind:"tech",id:t.assignedTechId,name:x.name,email:x.email||"",phone:x.phone||""}:null}
  if(t.assignedVendorId){const x=VENDORS[t.assignedVendorId];return x?{kind:"vendor",id:t.assignedVendorId,name:x.name,email:x.email||"",phone:x.phone||""}:null}
  return null;
}
// elapsed since a timestamp as "Xh Ym" (no seconds)
function elapsedHM(ts){
  if(!ts)return"—";
  let mins=Math.floor((now()-ts)/60000);
  if(mins<1)return"just now";
  const h=Math.floor(mins/60), mm=mins%60;
  return (h?h+"h ":"")+mm+"m";
}
function ticketRow(t){
  const st=STATUSES[t.status]||STATUSES.unassigned;
  const cat=CATEGORIES[t.category]||"Other";
  const pri=t.priority||"normal";
  const priClass={normal:"n",urgent:"u",emergency:"e"}[pri]||"n";
  const photoN=(t.photos||[]).length;
  const isAdmin=SESSION.role==="admin";
  const who=ticketAssignee(t);
  // ----- right side -----
  let right;
  if(isAdmin && t.status==="unassigned"){
    right=`<div class="row-assign" onclick="event.stopPropagation()">
      <select class="input row-sel" id="rsel_${t._id}" onchange="if(this.value==='__add__'){this.value='';openVendors();}">
        <option value="">Assign to…</option>
        <optgroup label="In-house techs">${Object.entries(MASTER.repairTechnicians||{}).map(([id,v])=>`<option value="tech:${id}">${esc(v.name)}</option>`).join("")}</optgroup>
        <optgroup label="Third-party techs">${Object.entries(VENDORS).map(([id,v])=>`<option value="vendor:${id}">${esc(v.name)}</option>`).join("")||'<option disabled>None added</option>'}</optgroup>
        <option value="__add__">＋ Add new tech…</option>
      </select>
      <button class="btn btn-primary btn-sm" onclick="rowAssign('${t._id}')">Assign</button>
    </div>`;
  }else{
    let sub="";
    if(who) sub=who.name;
    else if(storeTech(t.storeId)) sub=storeTech(t.storeId).name;
    // status-specific subline
    let extra="";
    if(t.status==="dispatched"&&t.dispatchedAt) extra=`<div class="rs-meta">Dispatched ${fmtDateShort(t.dispatchedAt)}</div>`;
    else if(t.status==="waiting"&&t.waitingReason) extra=`<div class="rs-meta wait">${esc(t.waitingReason)}</div>`;
    else if(t.status==="in_progress"&&t.clockInAt) extra=`<div class="rs-meta prog">⏱ ${elapsedHM(t.clockInAt)}</div>`;
    right=`<div class="row-status" style="--tc:${st.color}">
      <div class="rs-label">${st.label}</div>${sub?`<div class="rs-who">${esc(sub)}</div>`:""}${extra}</div>`;
  }
  // ----- below-row action bars (admin only) -----
  let below="";
  if(isAdmin){
    if(t.status==="assigned" && who){
      below=`<div class="row-bar" onclick="event.stopPropagation()">
        <span>Would you like to contact <b>${esc(who.name)}</b>?</span>
        <div class="rb-btns">${contactBtns(t,who)}
          <button class="btn btn-primary btn-sm" onclick="confirmContact('${t._id}')">Already done</button>
        </div></div>`;
    }else if(t.status==="waiting" && who){
      below=`<div class="row-bar" onclick="event.stopPropagation()">
        <span><b>Waiting:</b> ${esc(t.waitingReason||"reason not set")}</span>
        <div class="rb-btns">${contactBtns(t,who)}</div></div>`;
    }else if(t.status==="in_progress" && who){
      below=`<div class="row-bar" onclick="event.stopPropagation()">
        <span><b>In progress</b> · ${elapsedHM(t.clockInAt)}</span>
        <div class="rb-btns">${contactBtns(t,who)}</div></div>`;
    }else if(t.status==="finished"){
      below=`<div class="row-bar" onclick="event.stopPropagation()">
        <span><b>Finished</b> — ready to close out?</span>
        <div class="rb-btns"><button class="btn btn-primary btn-sm" onclick="setStatus('${t._id}','closed')">Close out</button></div></div>`;
    }else if(t.status==="closed"){
      below=`<div class="row-bar" onclick="event.stopPropagation()">
        <span><b>Closed</b> — reopen to?</span>
        <div class="rb-btns">
          <button class="btn btn-ghost btn-sm" onclick="setStatus('${t._id}','finished')">→ Finished</button>
          <button class="btn btn-ghost btn-sm" onclick="setStatus('${t._id}','unassigned')">→ Unassigned</button>
        </div></div>`;
    }
  }
  // ----- tech per-ticket status bar (Dispatched tab only) -----
  // One tap moves the ticket on our end. Tech only ever toggles between
  // waiting / in progress / finished — current status is shown as active.
  if(SESSION.role==="tech" && curFilter==="dispatched"){
    const b=(target,emoji,labelTxt)=>{
      const isCur=t.status===target;
      const cls=target==="finished"?"btn-primary":"btn-ghost";
      const act=target==="finished"?`openFinish('${t._id}')`:(target==="in_progress"?`techStart('${t._id}')`:`setStatus('${t._id}','${target}')`);
      return `<button class="btn ${cls} btn-sm${isCur?" tk-cur":""}" ${isCur?"disabled":""} onclick="event.stopPropagation();${act}">${emoji} ${labelTxt}${isCur?" ·":""}</button>`;
    };
    below=`<div class="row-bar" onclick="event.stopPropagation()">
      <span><b>Move this job to:</b></span>
      <div class="rb-btns">
        ${b("waiting","⏸","Waiting")}
        ${b("in_progress","▶","In Progress")}
        ${b("finished","✓","Finished")}
      </div></div>`;
  }
  // selection checkbox (select mode, finished/closed pages)
  const showChk = selectMode && (curFilter==="finished"||curFilter==="closed");
  const chk = showChk ? `<label class="row-chk" onclick="event.stopPropagation()"><input type="checkbox" ${selectedIds[t._id]?"checked":""} onchange="toggleSel('${t._id}',this.checked)"></label>` : "";
  const rowClick = showChk ? `toggleSel('${t._id}',!selectedIds['${t._id}'])` : `openTicket('${t._id}')`;
  // On the OPEN page, tint each row subtly with its status color; sub-pages are mono-status already.
  const tint = (curFilter==="active") ? ` style="--rt:${st.color}"` : "";
  const tintClass = (curFilter==="active") ? " tinted" : "";
  const selClass = (showChk && selectedIds[t._id]) ? " row-selected" : "";
  // Tech: an in-progress job is highlighted blue and sits at the top of the list.
  const progClass = (SESSION.role==="tech" && t.status==="in_progress") ? " row-prog" : "";
  return `
    <div class="row-wrap">
    <div class="row${tintClass}${selClass}${progClass}"${tint} onclick="${rowClick}">
      ${chk}
      <div class="row-main">
        <div class="row-top"><span class="row-store">${esc(storeName(t.storeId))}</span></div>
        <div class="row-desc">${esc(t.description||"No description")}</div>
        <div class="row-meta">
          <span class="r-id mono">${esc(t.shortId||t._id.slice(0,6).toUpperCase())}</span>
          <span class="r-pri ${priClass}">${PRIORITIES[pri]||"Normal"}</span>
          <span class="r-sep">·</span><span>${cat}</span>
          <span class="r-sep">·</span><span>${timeAgo(t.createdAt)}</span>
          ${photoN?`<span class="r-sep">·</span><span>📷 ${photoN}</span>`:""}
        </div>
      </div>
      <div class="row-right">${right}</div>
    </div>${below}</div>`;
}
// On a phone: Text / Call / Email open native apps directly (no API).
// On desktop: no buttons — just a hint to use a phone.
function contactBtns(t,who){
  if(!IS_MOBILE){
    return `<span class="rb-none">Open on your phone for contact options</span>`;
  }
  const msg=draftBody(t,who);
  const subj=`Ticket ${t.shortId} · ${storeName(t.storeId)}`;
  let b="";
  if(who.phone){
    b+=`<a class="btn btn-ghost btn-sm" href="${escA(smsLink(who.phone,msg))}">✉ Text</a>`;
    b+=`<a class="btn btn-ghost btn-sm" href="${escA(telLink(who.phone))}">📞 Call</a>`;
  }
  if(who.email){
    const replyTo=SESSION.email;
    b+=`<a class="btn btn-ghost btn-sm" href="${escA(mailtoLink(who.email,subj,msg+"\n\nReply to: "+replyTo,replyTo))}">@ Email</a>`;
  }
  if(!b) b=`<span class="rb-none">No contact info on file</span>`;
  return b;
}
// shared message body (ticket + store + address + photo links + reply-to)
function draftBody(t,who){
  const addr=store(t.storeId).address||"";
  const photos=(t.photos||[]);
  const photoBlock=photos.length?("\n\nPhotos:\n"+photos.join("\n")):"";
  return `Hi ${who.name}, regarding ticket ${t.shortId} at ${storeName(t.storeId)}${addr?(" — "+addr):""}: ${t.description||""}${photoBlock}`;
}
function fmtDateShort(ts){if(!ts)return"";const d=new Date(ts);return d.toLocaleDateString("en-US",{month:"numeric",day:"numeric"})}
// inline assign from a row (admin)
async function rowAssign(id){
  const sel=$("rsel_"+id); if(!sel||!sel.value){toast("Pick someone first","err");return}
  const val=sel.value; let patch,note;
  if(val.startsWith("tech:")){const tid=val.slice(5);patch={assignedTechId:tid,assignedVendorId:null,status:"assigned"};note="🔧 "+(techName(tid)||"tech")}
  else{const vid=val.slice(7);patch={assignedVendorId:vid,assignedTechId:null,status:"assigned"};note="🏢 "+(VENDORS[vid]?.name||"tech")}
  if(await patchTicket(id,patch,{action:"assign",note,toStatus:patch.status}))toast("Assigned · "+note);
}
// Yes, contacted → dispatched (with timestamp)
async function confirmContact(id){
  const who=ticketAssignee(TICKETS[id]);
  if(await patchTicket(id,{status:"dispatched",dispatchedAt:now()},{action:"status",toStatus:"dispatched",note:who?("Contact confirmed: "+who.name):""}))
    toast("Dispatched");
}
async function rowUnassign(id){
  if(await patchTicket(id,{status:"unassigned",assignedTechId:null,assignedVendorId:null},{action:"assign",note:"unassigned (pool)",toStatus:"unassigned"}))
    toast("Back to unassigned");
}

/* ============================================================ MODAL */
let activeModal=null;
function modal(html){
  let o=$("modalOverlay");
  if(!o){o=document.createElement("div");o.id="modalOverlay";o.className="overlay";document.body.appendChild(o);o.addEventListener("click",e=>{if(e.target===o)closeModal()})}
  o.innerHTML=`<div class="sheet">${html}</div>`;
  requestAnimationFrame(()=>{o.classList.add("on");applyTags()});
  activeModal=o;
}
function closeModal(){const o=$("modalOverlay");if(o){o.classList.remove("on");setTimeout(()=>{if(o)o.innerHTML=""},220)}activeModal=null}

/* ============================================================ CREATE */
let draftPhotos=[];
function openCreate(preStore){
  draftPhotos=[];
  let ids = SESSION.role==="manager" ? [SESSION.storeId] : myStoreIds();
  ids.sort((a,b)=>storeName(a).localeCompare(storeName(b)));
  const storeOpts=ids.map(id=>`<option value="${id}"${preStore===id?" selected":""}>${esc(storeName(id))}</option>`).join("");
  const catOpts=Object.entries(CATEGORIES).map(([k,v])=>`<option value="${k}">${v}</option>`).join("");
  const priOpts=Object.entries(PRIORITIES).map(([k,v])=>`<option value="${k}"${k==="normal"?" selected":""}>${v}</option>`).join("");
  modal(`
    <div class="sheet-head"><h2>Report new issue</h2><button class="x-btn" onclick="closeModal()">✕</button></div>
    <div class="sheet-body">
      <div class="field"><label class="label">Store</label>
        <select class="input" id="cStore" ${ids.length===1?"disabled":""}>${storeOpts}</select></div>
      <div style="display:flex;gap:12px;margin-top:14px">
        <div class="field" style="flex:1"><label class="label">Category</label><select class="input" id="cCat">${catOpts}</select></div>
        <div class="field" style="flex:1"><label class="label">Priority</label><select class="input" id="cPri">${priOpts}</select></div>
      </div>
      <div class="field" style="margin-top:14px"><label class="label">What's the issue?</label>
        <textarea class="input" id="cDesc" placeholder="Describe the problem and location."></textarea></div>
      <div class="field" style="margin-top:14px"><label class="label">Photos (optional)</label>
        <div class="upload-zone" onclick="$('cFile').click()"><div class="uz-ic">📷</div><div class="uz-t">Add photos</div><div class="uz-h mono">tap to choose · up to 5</div></div>
        <input type="file" id="cFile" accept="image/*" multiple style="display:none" onchange="addDraftPhotos(this)">
        <div class="preview-strip" id="cPreview"></div></div>
    </div>
    <div class="sheet-foot">
      <button class="btn btn-ghost" style="flex:1" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" style="flex:2" id="cSubmit" onclick="submitTicket()">Create ticket</button>
    </div>`);
  if(preStore&&$("cStore"))$("cStore").value=preStore;
  else if(ids.length===1)$("cStore").value=ids[0];
}
function addDraftPhotos(input){
  [...input.files].slice(0,5-draftPhotos.length).forEach(f=>{
    if(f.size>10*1024*1024){toast("That photo is over 10MB","err");return}
    draftPhotos.push({file:f,localUrl:URL.createObjectURL(f)})});
  input.value="";renderDraftPreview();
}
function renderDraftPreview(){const el=$("cPreview");if(!el)return;
  el.innerHTML=draftPhotos.map((p,i)=>`<div class="pv"><img src="${p.localUrl}" alt=""><button class="pv-x" onclick="draftPhotos.splice(${i},1);renderDraftPreview()">✕</button></div>`).join("");applyTags()}
async function submitTicket(){
  const sid=$("cStore").value, desc=$("cDesc").value.trim();
  if(!desc){toast("Add a short description","err");return}
  const cat=$("cCat").value;
  const btn=$("cSubmit");btn.disabled=true;btn.innerHTML='<span class="inline-spin"></span> Creating…';
  try{
    const urls=[];for(const p of draftPhotos)urls.push(await uploadPhoto(p.file));
    const id=uid();
    // Re-read fresh right before assigning the sequence number to shrink the
    // collision window (no server transaction available).
    await refresh();
    let shortId=nextShortId(sid,cat);
    const taken=new Set(Object.values(TICKETS).map(t=>t.shortId));
    let guard=0;
    while(taken.has(shortId)&&guard++<50){
      const m=shortId.match(/-(\d+)$/);
      shortId=shortId.replace(/-\d+$/,"-"+String(parseInt(m[1],10)+1).padStart(4,"0"));
    }
    // NOTE: ticket stores ONLY storeId as its anchor. No coach/director/tech frozen on it.
    const ticket={
      shortId, storeId:sid,
      category:cat, priority:$("cPri").value, description:desc, photos:urls,
      status:"unassigned", assignedVendorId:null, assignedTechId:null,
      createdBy:SESSION.email, createdByRole:SESSION.role, createdByName:SESSION.name,
      createdAt:now(), updatedAt:now(),
      activity:[{ts:now(),by:SESSION.name,role:SESSION.role,action:"created"}],
      comments:[]
    };
    await apiWrite(`${TICKETS_NODE}/${id}`,ticket);
    await refresh();closeModal();toast("Ticket created · "+shortId);
    if(SESSION.role==="manager")managerScreen="list";
    openGroups[sid]=true;render();
  }catch(e){toast(e.message||"Could not create ticket","err");btn.disabled=false;btn.textContent="Create ticket"}
}

/* ============================================================ DETAIL */
let editPhotos=null;
/* Lazy, memory-light photo thumbnails. Low-end phones choke on full-res images,
   so we render small thumbs with native lazy-loading + async decoding (the
   browser only fetches one when it scrolls into view) and open full-size in a
   new tab on tap. */
function photoThumbs(t){
  const ph=(t.photos||[]);
  if(!ph.length) return "";
  const imgs=ph.map(u=>`<a class="thumb" href="${escA(u)}" target="_blank" rel="noopener"><img src="${escA(u)}" loading="lazy" decoding="async" alt="job photo"></a>`).join("");
  return `<div class="thumb-grid">${imgs}</div>`;
}
function openTicket(id){
  const t={_id:id,...TICKETS[id]};
  const st=STATUSES[t.status]||STATUSES.open;
  const sid=t.storeId;
  const dir=storeDirector(sid), coach=storeCoach(sid), tech=storeTech(sid);
  // assignee: explicit tech dispatch > vendor > store's live tech (default routing)
  let assignee=null;
  if(t.assignedTechId){const n=techName(t.assignedTechId);assignee=n?("🔧 "+n+" (in-house)"):"Tech (removed)"}
  else if(t.assignedVendorId){const v=VENDORS[t.assignedVendorId];assignee=v?("🏢 "+v.name+" (third-party)"):"Tech (removed)"}
  else if(tech)assignee="🔧 "+tech.name+" (store tech)";
  const activity=(t.activity||[]).slice().reverse().map(a=>`
    <div class="tl-item"><div class="tl-dot" style="background:${(STATUSES[a.toStatus]||{}).color||'var(--amber)'}"></div>
      <div class="tl-c"><div class="tl-act">${esc(actionText(a))}</div>
      <div class="tl-meta">${esc(a.by||"")} · ${fmtDate(a.ts)}</div>
      ${a.note?`<div class="tl-note">"${esc(a.note)}"</div>`:""}</div></div>`).join("");
  modal(`
    <div class="sheet-head">
      <h2>#${esc(t.shortId||id.slice(0,6).toUpperCase())}</h2>
      <span class="sbadge" style="color:${st.color};background:${st.color}1a"><span class="dot"></span>${st.label}</span>
      <button class="x-btn" onclick="closeModal()">✕</button>
    </div>
    <div class="sheet-body">
      <div class="detail-store">
        <div style="font-weight:700;font-size:17px">${esc(storeName(sid))}</div>
        ${storeGeoUrl(sid)?`<a class="btn btn-ghost btn-sm gps-btn" href="${escA(storeGeoUrl(sid))}" target="_blank" rel="noopener">📍 Open GPS</a>`:""}
      </div>
      <div class="detail-desc">${esc(t.description||"No description")}</div>
      ${photoThumbs(t)}
      <div class="detail-row"><span class="k">Category</span><span class="v">${CATEGORIES[t.category]||"Other"}</span></div>
      <div class="detail-row"><span class="k">Priority</span><span class="v">${PRIORITIES[t.priority]||"Normal"}</span></div>
      <div class="detail-row"><span class="k">Assigned</span><span class="v">${assignee?esc(assignee):"<span style='color:var(--ink-dim)'>Unassigned</span>"}</span></div>
      <div class="detail-row"><span class="k">Director</span><span class="v">${dir?esc(dir.name):"—"}</span></div>
      <div class="detail-row"><span class="k">Area coach</span><span class="v">${coach?esc(coach.name):"—"}</span></div>
      <div class="detail-row"><span class="k">Reported by</span><span class="v">${esc(t.createdByName||t.createdBy||"—")}</span></div>
      <div class="detail-row"><span class="k">Opened</span><span class="v">${fmtDate(t.createdAt)}</span></div>
      ${t.waitingReason?`<div class="detail-row"><span class="k">Waiting on</span><span class="v">${esc(t.waitingReason)}</span></div>`:""}
      ${ticketControls(t)}
      <div class="section-label">Comments<span class="ln"></span></div>
      <div class="comments" id="commentList">${renderComments(t)}</div>
      <div class="comment-add">
        <textarea class="input" id="cmtInput" placeholder="Add a comment…" style="min-height:64px"></textarea>
        <button class="btn btn-primary btn-sm" id="cmtSend" onclick="addComment('${id}')">Post comment</button>
      </div>
      <div class="section-label">Activity<span class="ln"></span></div>
      <div class="timeline">${activity||'<div style="color:var(--ink-dim);font-size:13px">No activity yet.</div>'}</div>
    </div>
    <div class="sheet-foot"><button class="btn btn-ghost btn-block" onclick="closeModal()">Close</button></div>`);
}
function actionText(a){
  if(a.action==="created")return"Ticket created";
  if(a.action==="status")return`Status → ${(STATUSES[a.toStatus]||{}).label||a.toStatus}`;
  if(a.action==="assign")return`Assigned to ${a.note||"someone"}`;
  if(a.action==="clockin")return"Tech clocked in";
  if(a.action==="clockout")return"Tech clocked out";
  if(a.action==="edit")return"Ticket details edited";
  return a.action;
}
function renderComments(t){
  const list=Array.isArray(t.comments)?t.comments:[];
  if(!list.length)return '<div style="color:var(--ink-dim);font-size:13px;padding:2px 0 6px">No comments yet.</div>';
  return list.slice().sort((a,b)=>a.ts-b.ts).map(c=>`
    <div class="cmt">
      <div class="cmt-head"><span class="cmt-who">${esc(c.by)}</span>
        <span class="cmt-role">${esc(ROLE_LABEL[c.role]||c.role||"")}</span>
        <span class="cmt-time mono">${fmtDate(c.ts)}</span></div>
      <div class="cmt-body">${esc(c.text)}</div>
    </div>`).join("");
}
async function addComment(id){
  const inp=$("cmtInput");if(!inp)return;
  const text=inp.value.trim();
  if(!text){toast("Write something first","err");return}
  const btn=$("cmtSend");btn.disabled=true;btn.innerHTML='<span class="inline-spin"></span>';
  const t=TICKETS[id];
  const comments=Array.isArray(t.comments)?t.comments.slice():[];
  comments.push({id:uid(),by:SESSION.name,role:SESSION.role,email:SESSION.email,text,ts:now()});
  const ok=await patchTicket(id,{comments},null); // comment is its own log; no activity entry needed
  if(ok){toast("Comment posted");openTicket(id)}
  else{btn.disabled=false;btn.textContent="Post comment"}
}
/* ---- who can do what (new lifecycle) ----
   unassigned -> (admin) assign to vendor=assigned, or to in-house tech=dispatched
   waiting     -> rmtech or overwatch
   in_progress -> tech clock-in, or anyone with store access (mgr/coach/dir/admin)
   finished    -> any of those, or tech clock-out
   closed      -> mgr/coach/dir/admin (vanishes from all views except overwatch)
*/
function hasStoreAccess(){return ["manager","coach","director","admin"].includes(SESSION.role)}
function ticketControls(t){
  let h="";const role=SESSION.role, isClosed=t.status==="closed";

  // ADMIN: full assign + status grid + edit + reopen
  if(role==="admin"){
    h+=`<div class="section-label">Assign<span class="ln"></span></div>${assignControls(t)}`;
    h+=`<div class="section-label">Set status<span class="ln"></span></div>${statusGrid(t,STATUS_ORDER)}`;
    h+=`<button class="btn btn-ghost btn-block" style="margin-top:14px" onclick="openEdit('${t._id}')">✎ Edit ticket text / photos</button>`;
    return h;
  }

  if(isClosed) return `<div class="section-label">Closed<span class="ln"></span></div><div style="color:var(--ink-dim);font-size:13px">Closed. Only Overwatch can reopen.</div>`;

  // TECH actions — keep it to one decision: where does this job go next?
  if(role==="tech"){
    const mv=(target,emoji,labelTxt,cls)=>{
      const isCur=t.status===target;
      const act=target==="finished"?`openFinish('${t._id}')`:(target==="in_progress"?`techStart('${t._id}')`:`openWaiting('${t._id}')`);
      return `<button class="btn ${cls} btn-block${isCur?" tk-cur":""}" ${isCur?"disabled":""} onclick="${act}">${emoji} ${labelTxt}${isCur?" · now":""}</button>`;
    };
    h+=`<div class="section-label">Move this job to<span class="ln"></span></div>
      <div style="display:flex;flex-direction:column;gap:9px">
        ${mv("waiting","⏸","Waiting","btn-ghost")}
        ${mv("in_progress","▶","In progress","btn-ghost")}
        ${mv("finished","✓","Finished","btn-primary fin")}
      </div>`;
    return h;
  }

  // STORE-ACCESS people (manager / coach / director): progress, finish, close
  if(hasStoreAccess()){
    h+=`<div class="section-label">Update job<span class="ln"></span></div><div style="display:flex;flex-direction:column;gap:9px">`;
    if(t.status!=="in_progress" && t.status!=="finished")
      h+=`<button class="btn btn-ghost btn-block" onclick="setStatus('${t._id}','in_progress')">▶ Mark in progress</button>`;
    // waiting allowed for overwatch+tech per spec; managers/coaches/directors skip it
    if(t.status!=="finished")
      h+=`<button class="btn btn-primary btn-block fin" onclick="setStatus('${t._id}','finished')">✓ Mark finished</button>`;
    if(role!=="manager")
      h+=`<button class="btn btn-danger btn-block" onclick="setStatus('${t._id}','closed')">✕ Close ticket</button>`;
    h+=`</div>${role!=="manager"?`<div style="font-size:11px;color:var(--ink-dim);margin-top:8px">Closing removes the ticket from all views except Overwatch.</div>`:""}`;
    return h;
  }
  return h;
}
function statusGrid(t,targets){
  return `<div class="status-grid">${targets.map(s=>{const st=STATUSES[s];const cur=t.status===s?"cur":"";
    return `<button class="status-opt ${cur}" onclick="setStatus('${t._id}','${s}')"><span class="dot" style="background:${st.color}"></span>${st.label}${cur?" ·":""}</button>`}).join("")}</div>`;
}
function assignControls(t){
  const vendors=Object.entries(VENDORS);
  const techs=Object.entries(MASTER.repairTechnicians||{});
  const venOpts=vendors.map(([id,v])=>`<option value="vendor:${id}"${t.assignedVendorId===id?" selected":""}>🏢 ${esc(v.name)}</option>`).join("");
  const techOpts=techs.map(([id,v])=>`<option value="tech:${id}"${t.assignedTechId===id?" selected":""}>🔧 ${esc(v.name)}</option>`).join("");
  return `<div style="display:flex;gap:10px">
    <select class="input" id="assignSel">
      <option value="">— Unassigned (pool) —</option>
      <optgroup label="In-house techs">${techOpts||'<option disabled>None</option>'}</optgroup>
      <optgroup label="Third-party vendors → Assigned">${venOpts||'<option disabled>No vendors added</option>'}</optgroup>
    </select>
    <button class="btn btn-primary" onclick="doAssign('${t._id}')">Set</button></div>
    <div style="font-size:11px;color:var(--ink-dim);margin-top:7px">Picking a tech sets the ticket to Assigned</div>`;
}

/* ============================================================ MUTATIONS */
async function patchTicket(id,patch,activityEntry){
  const t=TICKETS[id];if(!t){toast("Ticket not found","err");return}
  const activity=Array.isArray(t.activity)?t.activity.slice():[];
  if(activityEntry)activity.push({ts:now(),by:SESSION.name,role:SESSION.role,...activityEntry});
  const updated={...t,...patch,activity,updatedAt:now()};
  showLoader(true);
  try{await apiWrite(`${TICKETS_NODE}/${id}`,updated);await refresh();showLoader(false);render();return true}
  catch(e){showLoader(false);toast(e.message||"Update failed","err");return false}
}
async function setStatus(id,status){
  if(TICKETS[id].status===status){toast("Already in that status");return}
  if(await patchTicket(id,{status},{action:"status",toStatus:status})){toast(`Status → ${STATUSES[status].label}`);openTicket(id)}
}

/* ============================================================ BULK ACTIONS (admin, finished/closed pages) */
function startSelect(){selectMode=true;selectedIds={};render()}
function endSelect(){selectMode=false;selectedIds={};render()}
function toggleSel(id,on){if(on)selectedIds[id]=true;else delete selectedIds[id];render()}
function toggleAllVisible(on){
  // current visible rows under the active filter+store+search
  const rows=currentVisibleRows();
  selectedIds={}; if(on)rows.forEach(t=>selectedIds[t._id]=true);
  render();
}
function currentVisibleRows(){
  let rows=[]; myStoreIds().forEach(sid=>rows=rows.concat(ticketsForStore(sid)));
  if(curStore!=="all")rows=rows.filter(t=>t.storeId===curStore);
  return applyFilterSearch(rows);
}
// run a status change across many tickets, sequentially, with a progress toast
async function bulkSetStatus(ids,status){
  if(!ids.length){toast("Nothing selected","err");return}
  showLoader(true);
  let done=0,failed=0;
  for(const id of ids){
    const t=TICKETS[id]; if(!t){failed++;continue}
    const activity=Array.isArray(t.activity)?t.activity.slice():[];
    activity.push({ts:now(),by:SESSION.name,role:SESSION.role,action:"status",toStatus:status,note:"bulk"});
    try{await apiWrite(`${TICKETS_NODE}/${id}`,{...t,status,activity,updatedAt:now()});done++;}
    catch(e){failed++;}
    if(done%10===0)$("pollTxt")&&($("pollTxt").textContent=`${done}/${ids.length}`);
  }
  await refresh();showLoader(false);
  selectMode=false;selectedIds={};
  render();
  toast(`${done} moved to ${STATUSES[status].label}${failed?` · ${failed} failed`:""}`);
}
// confirmation wrappers
function confirmBulk(kind){
  const visible=currentVisibleRows();
  const selIds=visible.filter(t=>selectedIds[t._id]).map(t=>t._id);
  let ids,status,msg;
  if(kind==="closeAll"){ids=visible.map(t=>t._id);status="closed";msg=`Close out all ${ids.length} finished tickets?`;}
  else if(kind==="closeSel"){ids=selIds;status="closed";msg=`Close out ${ids.length} selected ticket(s)?`;}
  else if(kind==="toFinished"){ids=selIds;status="finished";msg=`Move ${ids.length} ticket(s) back to Finished?`;}
  else if(kind==="toUnassigned"){ids=selIds;status="unassigned";msg=`Reopen ${ids.length} ticket(s) to Unassigned?`;}
  if(!ids.length){toast("Nothing to do","err");return}
  modal(`<div class="sheet-head"><h2>Are you sure?</h2><button class="x-btn" onclick="closeModal()">✕</button></div>
    <div class="sheet-body"><p style="font-size:15px">${esc(msg)}</p></div>
    <div class="sheet-foot">
      <button class="btn btn-ghost" style="flex:1" onclick="closeModal()">No</button>
      <button class="btn btn-primary" style="flex:1" onclick="closeModal();bulkSetStatus(${JSON.stringify(ids)},'${status}')">Yes</button>
    </div>`);
}
// reopen-all-by-date (closed page) — window picker + second confirm
function openReopenAll(){
  modal(`<div class="sheet-head"><h2>Reopen closed tickets</h2><button class="x-btn" onclick="closeModal()">✕</button></div>
    <div class="sheet-body">
      <p style="color:var(--ink-dim);font-size:13px;margin-top:0">This reopens closed tickets within a time window. Choose how far back, then confirm.</p>
      <div class="field"><label class="label">How far back?</label>
        <select class="input" id="reopenWindow">
          <option value="30">Last month (30 days)</option>
          <option value="120">Last quarter (120 days)</option>
          <option value="365">Last year (365 days)</option>
        </select></div>
      <div class="field" style="margin-top:14px"><label class="label">Reopen to</label>
        <select class="input" id="reopenTarget"><option value="finished">Finished</option><option value="unassigned">Unassigned</option></select></div>
    </div>
    <div class="sheet-foot">
      <button class="btn btn-ghost" style="flex:1" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" style="flex:1" onclick="confirmReopenAll()">Continue</button>
    </div>`);
}
function confirmReopenAll(){
  const days=parseInt($("reopenWindow").value,10), target=$("reopenTarget").value;
  const cutoff=now()-days*86400000;
  // closed tickets whose close happened within the window (use updatedAt as the close time)
  const ids=currentVisibleRows().filter(t=>t.status==="closed" && (t.updatedAt||t.createdAt||0)>=cutoff).map(t=>t._id);
  const winLabel={30:"last 30 days",120:"last 120 days",365:"last year"}[days];
  closeModal();
  if(!ids.length){toast(`No closed tickets in the ${winLabel}`,"err");return}
  modal(`<div class="sheet-head"><h2>Confirm — this is a big change</h2><button class="x-btn" onclick="closeModal()">✕</button></div>
    <div class="sheet-body"><p style="font-size:15px">Reopen <b>${ids.length}</b> tickets closed in the <b>${winLabel}</b> to <b>${STATUSES[target].label}</b>?</p>
      <p style="color:var(--red);font-size:13px">They will return to active boards across the app.</p></div>
    <div class="sheet-foot">
      <button class="btn btn-ghost" style="flex:1" onclick="closeModal()">No, cancel</button>
      <button class="btn btn-danger" style="flex:1" onclick="closeModal();bulkSetStatus(${JSON.stringify(ids)},'${target}')">Yes, reopen ${ids.length}</button>
    </div>`);
}
async function doAssign(id){
  const val=$("assignSel").value;
  let patch,note;
  if(val.startsWith("tech:")){const tid=val.slice(5);patch={assignedTechId:tid,assignedVendorId:null,status:"assigned"};note="🔧 "+(techName(tid)||"tech")}
  else if(val.startsWith("vendor:")){const vid=val.slice(7);patch={assignedVendorId:vid,assignedTechId:null,status:"assigned"};note="🏢 "+(VENDORS[vid]?.name||"tech")}
  else{patch={assignedVendorId:null,assignedTechId:null,status:"unassigned"};note="unassigned (pool)"}
  if(await patchTicket(id,patch,{action:"assign",note,toStatus:patch.status})){toast("Assignment updated");openTicket(id)}
}
async function techClockIn(id){
  techStart(id);
}
/* ---- one-job-in-progress rule (techs) ----
   A tech can only have a single ticket "in progress" at a time. If they try to
   start a second one while another is still running, we stop and ask whether
   they already finished the other job. Saying yes runs the finish-photo flow on
   the OTHER job first, then starts THIS one. Saying no just cancels. */
function otherInProgress(exceptId){
  if(!SESSION||SESSION.role!=="tech")return null;
  const mine=myStoreIds();
  for(const k of Object.keys(TICKETS)){
    const t=TICKETS[k];
    if(k!==exceptId && t.status==="in_progress" && mine.includes(t.storeId)) return {_id:k,...t};
  }
  return null;
}
function techStart(id){
  const other=otherInProgress(id);
  if(!other){doTechStart(id);return}
  const desc=other.description?other.description.slice(0,60)+(other.description.length>60?"…":""):"the other job";
  modal(`<div class="sheet-head"><h2>Finish the other job first?</h2><button class="x-btn" onclick="openTicket('${id}')">✕</button></div>
    <div class="sheet-body">
      <p style="margin:0 0 6px;color:var(--ink-mid);font-size:14px">You already have a job in progress:</p>
      <div class="other-job">
        <div class="oj-store">${esc(storeName(other.storeId))}</div>
        <div class="oj-desc">${esc(desc)}</div>
        <div class="oj-meta mono">⏱ ${elapsedHM(other.clockInAt)}</div>
      </div>
      <p style="margin:14px 0 0;color:var(--ink-mid);font-size:14px">Did you already finish it? We'll get a quick photo, mark it finished, then start this one.</p>
    </div>
    <div class="sheet-foot">
      <button class="btn btn-ghost" style="flex:1" onclick="openTicket('${id}')">Not yet</button>
      <button class="btn btn-primary" style="flex:1" onclick="openFinish('${other._id}',{thenStart:'${id}'})">Yes, finish it</button>
    </div>`);
}
async function doTechStart(id){
  if(TICKETS[id].status==="in_progress"){toast("Already in progress");return}
  const t=TICKETS[id];const patch={status:"in_progress"};
  if(!t.clockInAt)patch.clockInAt=now();
  if(await patchTicket(id,patch,{action:"clockin",toStatus:"in_progress"})){toast("In progress");openTicket(id)}
}
async function techFinish(id){
  if(await patchTicket(id,{status:"finished",finishedAt:now(),clockOutAt:now()},{action:"clockout",toStatus:"finished"})){toast("Clocked out · finished");openTicket(id)}
}

/* ---- finish with a required photo (mobile-first) ----
   Tapping "Finished" anywhere a tech can opens this sheet. One big tap target
   opens the camera straight away on a phone (capture=environment). At least one
   photo is required; on confirm we upload, append to the ticket's photos, and
   mark it finished (preserving the clock-out timestamps). */
let finishPhotos=[];
let finishThenStart=null; // ticket id to put in_progress after this finish (chaining)
function openFinish(id,opts){
  finishPhotos=[];
  finishThenStart=(opts&&opts.thenStart)||null;
  const camAttr = IS_MOBILE ? ' capture="environment"' : '';
  const cancelAct = finishThenStart ? `closeModal()` : `openTicket('${id}')`;
  modal(`<div class="sheet-head"><h2>Finish job</h2><button class="x-btn" onclick="${cancelAct}">✕</button></div>
    <div class="sheet-body">
      <p style="margin:0 0 14px;color:var(--ink-mid);font-size:14px">Add a quick photo of the completed work before you close this out.</p>
      <div class="upload-zone" id="finUz" onclick="$('finFile').click()">
        <div class="uz-ic">📸</div><div class="uz-t">Take a photo</div>
        <div class="uz-h mono">${IS_MOBILE?"opens your camera":"tap to choose a photo"}</div>
      </div>
      <input type="file" id="finFile" accept="image/*"${camAttr} multiple style="display:none" onchange="addFinishPhotos('${id}',this)">
      <div class="preview-strip" id="finPreview"></div>
    </div>
    <div class="sheet-foot">
      <button class="btn btn-ghost" style="flex:1" onclick="${cancelAct}">Cancel</button>
      <button class="btn btn-primary fin" style="flex:1" id="finConfirm" disabled onclick="confirmFinish('${id}')">✓ Mark finished</button>
    </div>`);
}
async function addFinishPhotos(id,input){
  const files=[...input.files].slice(0,5-finishPhotos.length);input.value="";
  const uz=$("finUz");
  for(const f of files){
    if(f.size>10*1024*1024){toast("Photo over 10MB skipped","err");continue}
    const localUrl=URL.createObjectURL(f);
    const ph={localUrl,url:null,uploading:true};finishPhotos.push(ph);renderFinishPreview();
    try{ph.url=await uploadPhoto(f);ph.uploading=false}
    catch(e){finishPhotos=finishPhotos.filter(p=>p!==ph);toast("A photo failed to upload","err")}
    renderFinishPreview();
  }
}
function renderFinishPreview(){
  const el=$("finPreview");if(!el)return;
  el.innerHTML=finishPhotos.map((p,i)=>`<div class="pv">
      <img src="${p.localUrl}" alt="">
      ${p.uploading?`<span class="pv-spin"><span class="inline-spin"></span></span>`:""}
      <button class="pv-x" onclick="finishPhotos.splice(${i},1);renderFinishPreview()">✕</button>
    </div>`).join("");
  const ready=finishPhotos.length>0 && finishPhotos.every(p=>!p.uploading);
  const btn=$("finConfirm");if(btn)btn.disabled=!ready;
  applyTags();
}
async function confirmFinish(id){
  const urls=finishPhotos.filter(p=>p.url).map(p=>p.url);
  if(!urls.length){toast("Add a photo first","err");return}
  const btn=$("finConfirm");if(btn){btn.disabled=true;btn.innerHTML='<span class="inline-spin"></span> Finishing…'}
  const t=TICKETS[id];const photos=(t&&Array.isArray(t.photos)?t.photos.slice():[]).concat(urls);
  const patch={status:"finished",finishedAt:now(),photos};
  if(t&&t.clockInAt&&!t.clockOutAt)patch.clockOutAt=now();
  if(await patchTicket(id,patch,{action:"clockout",toStatus:"finished",note:`Finished with ${urls.length} photo${urls.length>1?"s":""}`})){
    finishPhotos=[];
    const next=finishThenStart;finishThenStart=null;
    if(next){toast("Finished · starting next job");doTechStart(next);}
    else{toast("Finished · photo added");openTicket(id);}
  }else if(btn){btn.disabled=false;btn.innerHTML="✓ Mark finished"}
}
let waitReason=null;
function openWaiting(id){
  waitReason=null;
  const chips=WAITING_REASONS.map(r=>`<button type="button" class="wait-chip" data-r="${escA(r)}" onclick="pickWaitReason(this)">${esc(r)}</button>`).join("");
  modal(`<div class="sheet-head"><h2>What are you waiting on?</h2><button class="x-btn" onclick="openTicket('${id}')">✕</button></div>
    <div class="sheet-body">
      <div class="field"><label class="label">Reason</label>
        <div class="wait-chips" id="wChips">${chips}</div>
      </div>
      <div class="field" style="margin-top:16px"><label class="label">Add a comment</label>
        <textarea class="input" id="wNote" rows="3" placeholder="e.g. part ordered from supplier, ETA Friday"></textarea>
        <div class="uz-h mono" style="margin-top:5px;color:var(--ink-dim)">Posts to the ticket so the store and your coach can see it.</div>
      </div>
    </div>
    <div class="sheet-foot"><button class="btn btn-ghost" style="flex:1" onclick="openTicket('${id}')">Cancel</button>
      <button class="btn btn-primary" style="flex:1" id="wSet" disabled onclick="confirmWaiting('${id}')">⏸ Set to waiting</button></div>`);
}
function pickWaitReason(el){
  waitReason=el.getAttribute("data-r");
  document.querySelectorAll("#wChips .wait-chip").forEach(c=>c.classList.toggle("on",c===el));
  const b=$("wSet");if(b)b.disabled=false;
}
async function confirmWaiting(id){
  if(!waitReason){toast("Pick what you're waiting on","err");return}
  const note=($("wNote").value||"").trim();
  const btn=$("wSet");if(btn){btn.disabled=true;btn.innerHTML='<span class="inline-spin"></span>'}
  const t=TICKETS[id];
  const patch={status:"waiting",waitingReason:waitReason};
  // if the tech wrote something, post it as a real comment on the ticket thread
  if(note){
    const comments=Array.isArray(t.comments)?t.comments.slice():[];
    comments.push({id:uid(),by:SESSION.name,role:SESSION.role,email:SESSION.email,text:`⏸ Waiting — ${waitReason}: ${note}`,ts:now()});
    patch.comments=comments;
  }
  if(await patchTicket(id,patch,{action:"status",toStatus:"waiting",note:note?`${waitReason} — ${note}`:waitReason})){
    toast("Set to waiting");waitReason=null;openTicket(id);
  }else if(btn){btn.disabled=false;btn.innerHTML="⏸ Set to waiting"}
}
function openEdit(id){
  const t=TICKETS[id];editPhotos=(t.photos||[]).slice();
  const catOpts=Object.entries(CATEGORIES).map(([k,v])=>`<option value="${k}"${t.category===k?" selected":""}>${v}</option>`).join("");
  const priOpts=Object.entries(PRIORITIES).map(([k,v])=>`<option value="${k}"${t.priority===k?" selected":""}>${v}</option>`).join("");
  modal(`<div class="sheet-head"><h2>Edit ticket</h2><button class="x-btn" onclick="openTicket('${id}')">✕</button></div>
    <div class="sheet-body">
      <div style="display:flex;gap:12px">
        <div class="field" style="flex:1"><label class="label">Category</label><select class="input" id="eCat">${catOpts}</select></div>
        <div class="field" style="flex:1"><label class="label">Priority</label><select class="input" id="ePri">${priOpts}</select></div></div>
      <div class="field" style="margin-top:14px"><label class="label">Description</label><textarea class="input" id="eDesc">${esc(t.description||"")}</textarea></div>
      <div class="field" style="margin-top:14px"><label class="label">Photos</label>
        <div class="upload-zone" onclick="$('eFile').click()"><div class="uz-ic">📷</div><div class="uz-t">Add photos</div></div>
        <input type="file" id="eFile" accept="image/*" multiple style="display:none" onchange="addEditPhotos(this)">
        <div class="preview-strip" id="ePreview"></div></div>
    </div>
    <div class="sheet-foot"><button class="btn btn-ghost" style="flex:1" onclick="openTicket('${id}')">Cancel</button>
      <button class="btn btn-primary" style="flex:1" id="eSave" onclick="saveEdit('${id}')">Save changes</button></div>`);
  renderEditPreview();
}
function renderEditPreview(){const el=$("ePreview");if(!el)return;
  el.innerHTML=editPhotos.map((u,i)=>`<div class="pv"><img src="${escA(u)}" alt=""><button class="pv-x" onclick="editPhotos.splice(${i},1);renderEditPreview()">✕</button></div>`).join("");applyTags()}
async function addEditPhotos(input){
  const files=[...input.files].slice(0,8-editPhotos.length);input.value="";
  for(const f of files){if(f.size>10*1024*1024){toast("Photo over 10MB skipped","err");continue}
    try{editPhotos.push(await uploadPhoto(f));renderEditPreview()}catch(e){toast("A photo failed to upload","err")}}
}
async function saveEdit(id){
  const btn=$("eSave");btn.disabled=true;btn.innerHTML='<span class="inline-spin"></span> Saving…';
  if(await patchTicket(id,{description:$("eDesc").value.trim(),category:$("eCat").value,priority:$("ePri").value,photos:editPhotos.slice()},{action:"edit"})){toast("Ticket updated");openTicket(id)}
  else{btn.disabled=false;btn.textContent="Save changes"}
}

/* ============================================================ VENDORS */
function openSettings(){
  const adminEmails=[...new Set([...ADMIN_EMAILS,...Object.values(MASTER.admins||{}).map(a=>(a.email||"").toLowerCase()).filter(Boolean)])];
  const rows=adminEmails.map(em=>`
    <div class="field" style="margin-bottom:12px">
      <label class="label">${esc(em)}</label>
      <input class="input reply-in" data-email="${escA(em)}" value="${escA(REPLY_NUMBERS[em]||"")}" placeholder="Reply number, e.g. +18170001234" inputmode="tel">
    </div>`).join("");
  modal(`
    <div class="sheet-head"><h2>Settings</h2><button class="x-btn" onclick="closeModal()">✕</button></div>
    <div class="sheet-body">
      <div class="section-label">Overwatch reply numbers<span class="ln"></span></div>
      <p style="color:var(--ink-dim);font-size:13px;margin-top:0">Saved as contact info on each Overwatch account. When you text or email a tech, replies route back to whoever sent it.</p>
      ${rows}
      <div class="contact-note">Used as the reply-to / callback when SMS (Twilio) and email (SendGrid) are wired up.</div>
    </div>
    <div class="sheet-foot">
      <button class="btn btn-ghost" style="flex:1" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" style="flex:1" id="setSave" onclick="saveSettings()">Save</button>
    </div>`);
}
// find an admin record id by email, or null
function adminIdByEmail(email){
  const lc=(email||"").toLowerCase();
  const admins=MASTER.admins||{};
  return Object.keys(admins).find(id=>(admins[id].email||"").toLowerCase()===lc)||null;
}
async function saveSettings(){
  const inputs=[...document.querySelectorAll(".reply-in")];
  const btn=$("setSave");btn.disabled=true;btn.innerHTML='<span class="inline-spin"></span>';
  try{
    // each reply number is written onto that person's admin record (admins/{id}).
    // create a minimal record if one doesn't exist yet for a fixed admin email.
    for(const i of inputs){
      const email=i.getAttribute("data-email").toLowerCase();
      const num=i.value.trim();
      let id=adminIdByEmail(email);
      if(id){
        const rec={...MASTER.admins[id],replyNumber:num||null};
        await apiWrite(`admins/${id}`,rec);
      }else{
        // no record yet → create one keyed by a generated id
        const newId="adm_"+uid();
        await apiWrite(`admins/${newId}`,{id:newId,email,name:email.split("@")[0],tier:"overwatch",replyNumber:num||null});
      }
    }
    await refresh();toast("Settings saved");closeModal();
  }catch(e){toast(e.message||"Could not save","err");btn.disabled=false;btn.textContent="Save"}
}
function openVendors(){
  const rows=Object.entries(VENDORS).map(([id,v])=>`
    <div class="vrow"><div style="flex:1;min-width:0">
      <div class="v-name">${esc(v.name)}</div>
      <div class="v-meta">${esc([v.category,v.phone,v.email].filter(Boolean).join(" · ")||"No contact on file")}</div></div>
      <button class="btn btn-ghost btn-sm" onclick="editVendor('${id}')">Edit</button>
      <button class="btn btn-danger btn-sm" onclick="removeVendor('${id}')">Remove</button></div>`).join("");
  modal(`<div class="sheet-head"><h2>Third-party techs</h2><button class="x-btn" onclick="closeModal()">✕</button></div>
    <div class="sheet-body">
      <p style="color:var(--ink-dim);font-size:13px;margin-top:0">Outside techs available for assignment.</p>
      <div id="vendorRows">${rows||'<div class="empty" style="padding:34px"><div class="empty-mark">🏢</div><h3>No third-party techs yet</h3><p>Add your first outside techdor below.</p></div>'}</div>
      <button class="btn btn-ghost btn-block" style="margin-top:14px" onclick="editVendor(null)">＋ Add tech</button>
    </div>
    <div class="sheet-foot"><button class="btn btn-ghost btn-block" onclick="closeModal()">Done</button></div>`);
}
function editVendor(id){
  const v=id?VENDORS[id]:{};
  modal(`<div class="sheet-head"><h2>${id?"Edit third-party tech":"Add third-party tech"}</h2><button class="x-btn" onclick="openVendors()">✕</button></div>
    <div class="sheet-body">
      <div class="field"><label class="label">Tech / company name</label><input class="input" id="vName" value="${escA(v.name||"")}" placeholder="e.g. Lone Star HVAC"></div>
      <div class="field" style="margin-top:14px"><label class="label">Category / specialty</label><input class="input" id="vCat" value="${escA(v.category||"")}" placeholder="e.g. Refrigeration, Plumbing"></div>
      <div style="display:flex;gap:12px;margin-top:14px">
        <div class="field" style="flex:1"><label class="label">Phone</label><input class="input" id="vPhone" value="${escA(v.phone||"")}"></div>
        <div class="field" style="flex:1"><label class="label">Email</label><input class="input" id="vEmail" value="${escA(v.email||"")}"></div></div>
    </div>
    <div class="sheet-foot"><button class="btn btn-ghost" style="flex:1" onclick="openVendors()">Cancel</button>
      <button class="btn btn-primary" style="flex:1" id="vSave" onclick="saveVendor('${id||""}')">${id?"Save":"Add vendor"}</button></div>`);
}
async function saveVendor(id){
  const name=$("vName").value.trim();if(!name){toast("Vendor name is required","err");return}
  const vid=id||uid();
  const rec={id:vid,name,category:$("vCat").value.trim(),phone:$("vPhone").value.trim(),email:$("vEmail").value.trim(),updatedAt:now()};
  const btn=$("vSave");btn.disabled=true;btn.innerHTML='<span class="inline-spin"></span>';
  try{await apiWrite(`${VENDORS_NODE}/${vid}`,rec);await refresh();toast(id?"Vendor updated":"Vendor added");openVendors()}
  catch(e){toast(e.message||"Could not save vendor","err");btn.disabled=false;btn.textContent="Save"}
}
async function removeVendor(id){
  if(!confirm("Remove this third-party tech? Their tickets will fall back to the store's tech."))return;
  try{await apiWrite(`${VENDORS_NODE}/${id}`,null);await refresh();toast("Vendor removed");openVendors()}
  catch(e){toast(e.message||"Could not remove vendor","err")}
}

/* ============================================================ REFERENCE TAG SYSTEM
   Always-on corner badges (o/d/a/r/m + number) for pointing at controls.
   STABLE numbering: each logical element gets a number from its signature
   (tag + trimmed text + onclick), stored in a registry per role, so a given
   control keeps the same tag no matter how many tickets are on screen.
   Data-dependent, movable elements (ticket cards and their children, store
   groups, comments, activity, photos) are SKIPPED so numbers never drift.
   Default OFF; toggle with the # button in the top bar.
   ============================================================ */
let tagRegistry={};   // role -> { signature -> number }
let tagCounter={};    // role -> next number
function sigOf(el){
  const tag=el.tagName.toLowerCase();
  const oc=(el.getAttribute&&el.getAttribute("onclick")||"").replace(/['"][^'"]*['"]/g,"·").slice(0,40);
  const id=el.id?("#"+el.id):"";
  let txt=(el.getAttribute&&el.getAttribute("data-label"))||"";
  if(!txt){ // first text node only, trimmed, capped — stable-ish label
    txt=([...el.childNodes].find(n=>n.nodeType===3)?.textContent||"").trim().slice(0,24);
  }
  return `${tag}|${id}|${txt}|${oc}`;
}
// elements whose subtree we never tag (data-driven / movable)
function isSkippable(el){
  return el.classList&&(
    el.classList.contains("store-group")||  // store accordion (varies with stores)
    el.classList.contains("cmt")||          // a comment
    el.classList.contains("tl-item")||      // activity row
    el.classList.contains("photo-grid")||   // photos
    el.classList.contains("thumb-grid")||   // lazy photo thumbnails
    el.classList.contains("tk-photos")||
    el.classList.contains("preview-strip")||
    el.classList.contains("reftag")
  );
}
function applyTags(){
  if(!SESSION) return;
  document.querySelectorAll(".reftag").forEach(n=>n.remove());
  document.querySelectorAll("[data-reftagged]").forEach(n=>n.removeAttribute("data-reftagged"));
  if(!SHOW_REF_TAGS){document.body.classList.add("no-reftags");return}
  document.body.classList.remove("no-reftags");
  const role=SESSION.role, prefix=ROLE_PREFIX[role]||"x";
  if(!tagRegistry[role]){tagRegistry[role]={};tagCounter[role]=0}
  const reg=tagRegistry[role];
  let firstTicketTagged=false; // only the first ticket card gets numbered, for reference
  const roots=[$("topbar"),$("mainView")];
  const ov=$("modalOverlay"); if(ov&&ov.classList.contains("on"))roots.push(ov);
  roots.forEach(root=>{if(root)walk(root)});
  function visible(el){
    if(!(el instanceof HTMLElement))return false;
    if(el.classList&&el.classList.contains("reftag"))return false;
    const r=el.getBoundingClientRect();
    if(r.width<6||r.height<6)return false;
    const cs=getComputedStyle(el);
    if(cs.display==="none"||cs.visibility==="hidden"||cs.opacity==="0")return false;
    return true;
  }
  function tagEl(child,sigKey){
    let num=reg[sigKey];
    if(num===undefined){num=++tagCounter[role];reg[sigKey]=num}
    child.setAttribute("data-reftagged","");
    const tag=document.createElement("span");
    tag.className="reftag";tag.textContent=prefix+num;
    child.appendChild(tag);
  }
  function walk(el){
    [...el.children].forEach(child=>{
      const isTicket=child.classList&&child.classList.contains("tk");
      if(isTicket){
        // tag only the FIRST ticket card so it can be referenced; skip the rest
        if(firstTicketTagged)return;
        firstTicketTagged=true;
        if(visible(child)){tagEl(child,"tk-first");}
        // walk its children with ticket-relative stable keys
        walkTicket(child);
        return;
      }
      if(isSkippable(child))return;
      if(visible(child))tagEl(child,sigOf(child));
      if(child.children&&child.children.length)walk(child);
    });
  }
  // inside the first ticket, key children by class so numbers stay stable
  function walkTicket(el){
    [...el.children].forEach(child=>{
      if(child.classList&&child.classList.contains("reftag"))return;
      if(child.classList&&(child.classList.contains("tk-photos")))return;
      if(visible(child)){
        const cls=(child.className||"").split(" ")[0]||child.tagName.toLowerCase();
        tagEl(child,"tkpart:"+cls);
      }
      if(child.children&&child.children.length)walkTicket(child);
    });
  }
}
function toggleTags(){SHOW_REF_TAGS=!SHOW_REF_TAGS;applyTags();toast(SHOW_REF_TAGS?"Reference tags ON":"Reference tags OFF")}

/* ============================================================ BOOT */
(function init(){
  ["emailIn","pwIn"].forEach(id=>document.getElementById(id).addEventListener("keydown",e=>{if(e.key==="Enter")doLogin()}));
  window.addEventListener("resize",()=>{if(SESSION)applyTags()});
  tryRestoreSession(); // stay logged in across refresh
})();
</script>
</body>
</html>
