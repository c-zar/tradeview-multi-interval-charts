function D(){}function Z(t,e){for(const n in e)t[n]=e[n];return t}function G(t){return t()}function H(){return Object.create(null)}function $(t){t.forEach(G)}function tt(t){return typeof t=="function"}function gt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function et(t){return Object.keys(t).length===0}function J(t,...e){if(t==null)return D;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function bt(t){let e;return J(t,n=>e=n)(),e}function xt(t,e,n){t.$$.on_destroy.push(J(e,n))}function wt(t,e,n,i){if(t){const r=K(t,e,n,i);return t[0](r)}}function K(t,e,n,i){return t[1]&&i?Z(n.ctx.slice(),t[1](i(e))):n.ctx}function $t(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const u=[],l=Math.max(e.dirty.length,r.length);for(let s=0;s<l;s+=1)u[s]=e.dirty[s]|r[s];return u}return e.dirty|r}return e.dirty}function vt(t,e,n,i,r,u){if(r){const l=K(e,n,i,u);t.p(l,r)}}function kt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}let j=!1;function nt(){j=!0}function it(){j=!1}function rt(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function ct(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let o=0;o<e.length;o++){const f=e[o];f.claim_order!==void 0&&c.push(f)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let c=0;c<e.length;c++){const o=e[c].claim_order,f=(r>0&&e[n[r]].claim_order<=o?r+1:rt(1,r,_=>e[n[_]].claim_order,o))-1;i[c]=n[f]+1;const d=f+1;n[d]=c,r=Math.max(d,r)}const u=[],l=[];let s=e.length-1;for(let c=n[r]+1;c!=0;c=i[c-1]){for(u.push(e[c-1]);s>=c;s--)l.push(e[s]);s--}for(;s>=0;s--)l.push(e[s]);u.reverse(),l.sort((c,o)=>c.claim_order-o.claim_order);for(let c=0,o=0;c<l.length;c++){for(;o<u.length&&l[c].claim_order>=u[o].claim_order;)o++;const f=o<u.length?u[o]:null;t.insertBefore(l[c],f)}}function lt(t,e){if(j){for(ct(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Et(t,e,n){j&&!n?lt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function st(t){t.parentNode.removeChild(t)}function St(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function ot(t){return document.createElement(t)}function ut(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function q(t){return document.createTextNode(t)}function Nt(){return q(" ")}function jt(){return q("")}function At(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Mt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Ct(t,e,n){const i=new Set;for(let r=0;r<t.length;r+=1)t[r].checked&&i.add(t[r].__value);return n||i.delete(e),Array.from(i)}function Tt(t){return t===""?null:+t}function at(t){return Array.from(t.childNodes)}function ft(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function Q(t,e,n,i,r=!1){ft(t);const u=(()=>{for(let l=t.claim_info.last_index;l<t.length;l++){const s=t[l];if(e(s)){const c=n(s);return c===void 0?t.splice(l,1):t[l]=c,r||(t.claim_info.last_index=l),s}}for(let l=t.claim_info.last_index-1;l>=0;l--){const s=t[l];if(e(s)){const c=n(s);return c===void 0?t.splice(l,1):t[l]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=l,s}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function R(t,e,n,i){return Q(t,r=>r.nodeName===e,r=>{const u=[];for(let l=0;l<r.attributes.length;l++){const s=r.attributes[l];n[s.name]||u.push(s.name)}u.forEach(l=>r.removeAttribute(l))},()=>i(e))}function Bt(t,e,n){return R(t,e,n,ot)}function Lt(t,e,n){return R(t,e,n,ut)}function _t(t,e){return Q(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>q(e),!0)}function Ot(t){return _t(t," ")}function Pt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Dt(t,e){t.value=e==null?"":e}function qt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let w;function x(t){w=t}function A(){if(!w)throw new Error("Function called outside component initialization");return w}function zt(t){A().$$.on_mount.push(t)}function Ft(t){A().$$.after_update.push(t)}function Ht(t){A().$$.on_destroy.push(t)}function It(t,e){return A().$$.context.set(t,e),e}const b=[],I=[],S=[],W=[],U=Promise.resolve();let O=!1;function V(){O||(O=!0,U.then(X))}function Wt(){return V(),U}function P(t){S.push(t)}const L=new Set;let E=0;function X(){const t=w;do{for(;E<b.length;){const e=b[E];E++,x(e),dt(e.$$)}for(x(null),b.length=0,E=0;I.length;)I.pop()();for(let e=0;e<S.length;e+=1){const n=S[e];L.has(n)||(L.add(n),n())}S.length=0}while(b.length);for(;W.length;)W.pop()();O=!1,L.clear(),x(t)}function dt(t){if(t.fragment!==null){t.update(),$(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(P)}}const N=new Set;let g;function Gt(){g={r:0,c:[],p:g}}function Jt(){g.r||$(g.c),g=g.p}function Y(t,e){t&&t.i&&(N.delete(t),t.i(e))}function ht(t,e,n,i){if(t&&t.o){if(N.has(t))return;N.add(t),g.c.push(()=>{N.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}}function Kt(t,e){ht(t,1,1,()=>{e.delete(t.key)})}function Qt(t,e,n,i,r,u,l,s,c,o,f,d){let _=t.length,m=u.length,h=_;const M={};for(;h--;)M[t[h].key]=h;const v=[],C=new Map,T=new Map;for(h=m;h--;){const a=d(r,u,h),y=n(a);let p=l.get(y);p?i&&p.p(a,e):(p=o(y,a),p.c()),C.set(y,v[h]=p),y in M&&T.set(y,Math.abs(h-M[y]))}const z=new Set,F=new Set;function B(a){Y(a,1),a.m(s,f),l.set(a.key,a),f=a.first,m--}for(;_&&m;){const a=v[m-1],y=t[_-1],p=a.key,k=y.key;a===y?(f=a.first,_--,m--):C.has(k)?!l.has(p)||z.has(p)?B(a):F.has(k)?_--:T.get(p)>T.get(k)?(F.add(p),B(a)):(z.add(k),_--):(c(y,l),_--)}for(;_--;){const a=t[_];C.has(a.key)||c(a,l)}for(;m;)B(v[m-1]);return v}function Rt(t,e){const n={},i={},r={$$scope:1};let u=t.length;for(;u--;){const l=t[u],s=e[u];if(s){for(const c in l)c in s||(i[c]=1);for(const c in s)r[c]||(n[c]=s[c],r[c]=1);t[u]=s}else for(const c in l)r[c]=1}for(const l in i)l in n||(n[l]=void 0);return n}function Ut(t){return typeof t=="object"&&t!==null?t:{}}function Vt(t){t&&t.c()}function Xt(t,e){t&&t.l(e)}function mt(t,e,n,i){const{fragment:r,on_mount:u,on_destroy:l,after_update:s}=t.$$;r&&r.m(e,n),i||P(()=>{const c=u.map(G).filter(tt);l?l.push(...c):$(c),t.$$.on_mount=[]}),s.forEach(P)}function yt(t,e){const n=t.$$;n.fragment!==null&&($(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function pt(t,e){t.$$.dirty[0]===-1&&(b.push(t),V(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Yt(t,e,n,i,r,u,l,s=[-1]){const c=w;x(t);const o=t.$$={fragment:null,ctx:null,props:u,update:D,not_equal:r,bound:H(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:H(),dirty:s,skip_bound:!1,root:e.target||c.$$.root};l&&l(o.root);let f=!1;if(o.ctx=n?n(t,e.props||{},(d,_,...m)=>{const h=m.length?m[0]:_;return o.ctx&&r(o.ctx[d],o.ctx[d]=h)&&(!o.skip_bound&&o.bound[d]&&o.bound[d](h),f&&pt(t,d)),_}):[],o.update(),f=!0,$(o.before_update),o.fragment=i?i(o.ctx):!1,e.target){if(e.hydrate){nt();const d=at(e.target);o.fragment&&o.fragment.l(d),d.forEach(st)}else o.fragment&&o.fragment.c();e.intro&&Y(t.$$.fragment),mt(t,e.target,e.anchor,e.customElement),it(),X()}x(c)}class Zt{$destroy(){yt(this,1),this.$destroy=D}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!et(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Ut as A,yt as B,Z as C,Wt as D,D as E,wt as F,vt as G,kt as H,$t as I,lt as J,bt as K,Ht as L,Dt as M,At as N,Tt as O,St as P,$ as Q,Qt as R,Zt as S,ut as T,Lt as U,xt as V,Kt as W,Ct as X,at as a,Mt as b,Bt as c,st as d,ot as e,qt as f,Et as g,_t as h,Yt as i,Pt as j,Nt as k,jt as l,Ot as m,Gt as n,ht as o,Jt as p,Y as q,It as r,gt as s,q as t,Ft as u,zt as v,Vt as w,Xt as x,mt as y,Rt as z};