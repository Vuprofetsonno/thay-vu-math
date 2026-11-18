/* Ink geometry shared by canvas, SVG export and regression tests. */
(function(root){'use strict';
const point=(x,y,p=.5)=>({x,y,p});
function segments(ps,smooth=true){if(ps.length<2)return[];if(!smooth||ps.length===2)return ps.slice(1).map((p,i)=>({from:ps[i],to:p}));const out=[];let from=ps[0];for(let i=1;i<ps.length-1;i++){const a=ps[i-1],b=ps[i],c=ps[i+1],u=[b.x-a.x,b.y-a.y],v=[c.x-b.x,c.y-b.y],den=Math.hypot(...u)*Math.hypot(...v),sharp=den>0&&(u[0]*v[0]+u[1]*v[1])/den<.5;if(sharp){out.push({from,to:b});from=b;continue}const end=point((b.x+c.x)/2,(b.y+c.y)/2,(b.p+c.p)/2);out.push({from,control:b,to:end});from=end}out.push({from,to:ps.at(-1)});return out}
function width(size,p,pressure){return size*(pressure?.7+.6*Math.max(0,Math.min(1,Number.isFinite(p)?p:.5)):1)}
function append(ps,p,min=.18){const last=ps.at(-1);if(!last||Math.hypot(last.x-p.x,last.y-p.y)>=min)ps.push(p)}
root.InkCore={segments,width,append};
})(typeof window==='undefined'?globalThis:window);
