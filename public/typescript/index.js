/*
  Human
  homepage: <https://github.com/vladmandic/human>
*/

import*as c from"../../dist/human.esm.js";var w={async:!1,modelBasePath:"../../models",filter:{enabled:!0,equalization:!1,flip:!1},face:{enabled:!0,detector:{rotation:!1},mesh:{enabled:!0},attention:{enabled:!1},iris:{enabled:!0},description:{enabled:!0},emotion:{enabled:!0}},body:{enabled:!0},hand:{enabled:!0},object:{enabled:!1},gesture:{enabled:!0}},e=new c.Human(w);e.env.perfadd=!1;e.draw.options.font='small-caps 18px "Lato"';e.draw.options.lineHeight=20;var t={video:document.getElementById("video"),canvas:document.getElementById("canvas"),log:document.getElementById("log"),fps:document.getElementById("status"),perf:document.getElementById("performance")},n={detect:0,draw:0,tensors:0,start:0},o={detectFPS:0,drawFPS:0,frames:0,averageMs:0},i=(...a)=>{t.log.innerText+=a.join(" ")+`
`,console.log(...a)},r=a=>t.fps.innerText=a,b=a=>t.perf.innerText="tensors:"+e.tf.memory().numTensors.toString()+" | performance: "+JSON.stringify(a).replace(/"|{|}/g,"").replace(/,/g," | ");async function h(){r("โหลดกล้อง...");let a={audio:!1,video:{facingMode:"user",resizeMode:"none",width:{ideal:document.body.clientWidth},height:{ideal:document.body.clientHeight}}},d=await navigator.mediaDevices.getUserMedia(a),f=new Promise(p=>{t.video.onloadeddata=()=>p(!0)});t.video.srcObject=d,t.video.play(),await f,t.canvas.width=t.video.videoWidth,t.canvas.height=t.video.videoHeight;let s=d.getVideoTracks()[0],v=s.getCapabilities?s.getCapabilities():"",g=s.getSettings?s.getSettings():"",u=s.getConstraints?s.getConstraints():"";i("video:",t.video.videoWidth,t.video.videoHeight,s.label,{stream:d,track:s,settings:g,constraints:u,capabilities:v}),t.canvas.onclick=()=>{t.video.paused?t.video.play():t.video.pause()}}async function l(){if(!t.video.paused){n.start===0&&(n.start=e.now()),await e.detect(t.video);let a=e.tf.memory().numTensors;a-n.tensors!==0&&i("allocated tensors:",a-n.tensors),n.tensors=a,o.detectFPS=Math.round(1e3*1e3/(e.now()-n.detect))/1e3,o.frames++,o.averageMs=Math.round(1e3*(e.now()-n.start)/o.frames)/1e3,o.frames%100===0&&!t.video.paused&&i("performance",{...o,tensors:n.tensors})}n.detect=e.now(),requestAnimationFrame(l)}async function m(){if(!t.video.paused){let d=e.next(e.result);e.config.filter.flip?e.draw.canvas(d.canvas,t.canvas):e.draw.canvas(t.video,t.canvas),await e.draw.all(t.canvas,d),b(d.performance)}let a=e.now();o.drawFPS=Math.round(1e3*1e3/(a-n.draw))/1e3,n.draw=a,r(t.video.paused?"พักหน้าจอ":`fps: ${o.detectFPS.toFixed(1).padStart(5," ")} detect | ${o.drawFPS.toFixed(1).padStart(5," ")} draw`),setTimeout(m,30)}async function M(){i("human version:",e.version,"| tfjs version:",e.tf.version["tfjs-core"]),i("platform:",e.env.platform,"| agent:",e.env.agent),r("กำลังโหลด..."),await e.load(),i("backend:",e.tf.getBackend(),"| available:",e.env.backends),i("models stats:",e.getModelStats()),i("models loaded:",Object.values(e.models).filter(a=>a!==null).length),r("กำลังเริ่มต้น..."),await e.warmup(),await h(),await l(),await m()}window.onload=M;
//# sourceMappingURL=index.js.map
