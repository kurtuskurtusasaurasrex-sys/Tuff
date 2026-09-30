(()=>{var o0=Object.defineProperty;var l0=(i,e,t)=>e in i?o0(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var _i=(i,e,t)=>l0(i,typeof e!="symbol"?e+"":e,t);var df=0,kh=1,ff=2;var Cs=1,pf=2,Er=3,On=0,Zt=1,Mn=2,Bn=0,di=1,dn=2,Hh=3,zh=4,mf=5;var Ps=100,gf=101,vf=102,xf=103,_f=104,yf=200,Mf=201,bf=202,Sf=203,Gh=204,Vh=205,Ef=206,wf=207,Tf=208,Af=209,Rf=210,Cf=211,Pf=212,If=213,Lf=214,Bo=0,ko=1,Ho=2,ur=3,zo=4,Go=5,Vo=6,Wo=7,Wh=0,Df=1,Uf=2,ei=0,Oa=1,Ba=2,ka=3,Is=4,Ha=5,za=6,Ga=7;var Xh=300,ts=301,Ls=302,yl=303,Ml=304,Va=306,dr=1e3,oi=1001,Xo=1002,Nt=1003,Nf=1004;var Ds=1005;var rn=1006,bl=1007;var ns=1008;var bn=1009,$h=1010,qh=1011,wr=1012,Sl=1013,ti=1014,kn=1015,on=1016,El=1017,wl=1018,Tr=1020,Yh=35902,Zh=35899,Jh=1021,Kh=1022,Sn=1023,ci=1026,is=1027,Tl=1028,Al=1029,ss=1030,Rl=1031;var Cl=1033,Wa=33776,Xa=33777,$a=33778,qa=33779,Pl=35840,Il=35841,Ll=35842,Dl=35843,Ul=36196,Nl=37492,Fl=37496,Ol=37488,Bl=37489,Ya=37490,kl=37491,Hl=37808,zl=37809,Gl=37810,Vl=37811,Wl=37812,Xl=37813,$l=37814,ql=37815,Yl=37816,Zl=37817,Jl=37818,Kl=37819,jl=37820,Ql=37821,ec=36492,tc=36494,nc=36495,ic=36283,sc=36284,Za=36285,rc=36286;var ra=2300,$o=2301,Fo=2302,wh=2303,Th=2400,Ah=2401,Rh=2402;var Ff=3200;var Ja=0,Of=1,ni="",Vt="srgb",aa="srgb-linear",oa="linear",gt="srgb";var Oo=7680;var Bf=519,kf=512,Hf=513,zf=514,ac=515,Gf=516,Vf=517,oc=518,Wf=519,jh=35044;var Qh="300 es",Zn=2e3,fr=2001;function c0(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function h0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function la(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Xf(){let i=la("canvas");return i.style.display="block",i}var Id={},pr=null;function ca(...i){let e="THREE."+i.shift();pr?pr("log",e,...i):console.log(e,...i)}function $f(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function We(...i){i=$f(i);let e="THREE."+i.shift();if(pr)pr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Xe(...i){i=$f(i);let e="THREE."+i.shift();if(pr)pr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function xs(...i){let e=i.join(" ");e in Id||(Id[e]=!0,We(...i))}function qf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Yf={[Bo]:ko,[Ho]:Vo,[zo]:Wo,[ur]:Go,[ko]:Bo,[Vo]:Ho,[Wo]:zo,[Go]:ur},hi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},cn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ld=1234567,ta=Math.PI/180,_s=180/Math.PI;function li(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(cn[i&255]+cn[i>>8&255]+cn[i>>16&255]+cn[i>>24&255]+"-"+cn[e&255]+cn[e>>8&255]+"-"+cn[e>>16&15|64]+cn[e>>24&255]+"-"+cn[t&63|128]+cn[t>>8&255]+"-"+cn[t>>16&255]+cn[t>>24&255]+cn[n&255]+cn[n>>8&255]+cn[n>>16&255]+cn[n>>24&255]).toLowerCase()}function it(i,e,t){return Math.max(e,Math.min(t,i))}function eu(i,e){return(i%e+e)%e}function u0(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function d0(i,e,t){return i!==e?(t-i)/(e-i):0}function na(i,e,t){return(1-t)*i+t*e}function f0(i,e,t,n){return na(i,e,1-Math.exp(-t*n))}function p0(i,e=1){return e-Math.abs(eu(i,e*2)-e)}function m0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function g0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function v0(i,e){return i+Math.floor(Math.random()*(e-i+1))}function x0(i,e){return i+Math.random()*(e-i)}function _0(i){return i*(.5-Math.random())}function y0(i){i!==void 0&&(Ld=i);let e=Ld+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function M0(i){return i*ta}function b0(i){return i*_s}function S0(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function E0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function w0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function T0(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),d=r((e-n)/2),u=a((e-n)/2),f=r((n-e)/2),p=a((n-e)/2);switch(s){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*p,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*p,o*c);break;case"ZYZ":i.set(l*p,l*f,o*h,o*c);break;default:We("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Yn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function St(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Us={DEG2RAD:ta,RAD2DEG:_s,generateUUID:li,clamp:it,euclideanModulo:eu,mapLinear:u0,inverseLerp:d0,lerp:na,damp:f0,pingpong:p0,smoothstep:m0,smootherstep:g0,randInt:v0,randFloat:x0,randFloatSpread:_0,seededRandom:y0,degToRad:M0,radToDeg:b0,isPowerOfTwo:S0,ceilPowerOfTwo:E0,floorPowerOfTwo:w0,setQuaternionFromProperEuler:T0,normalize:St,denormalize:Yn},au=class au{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(it(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(it(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};au.prototype.isVector2=!0;var ie=au,Fn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],f=r[a+1],p=r[a+2],y=r[a+3];if(d!==y||l!==u||c!==f||h!==p){let m=l*u+c*f+h*p+d*y;m<0&&(u=-u,f=-f,p=-p,y=-y,m=-m);let g=1-o;if(m<.9995){let b=Math.acos(m),T=Math.sin(b);g=Math.sin(g*b)/T,o=Math.sin(o*b)/T,l=l*g+u*o,c=c*g+f*o,h=h*g+p*o,d=d*g+y*o}else{l=l*g+u*o,c=c*g+f*o,h=h*g+p*o,d=d*g+y*o;let b=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=b,c*=b,h*=b,d*=b}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],p=r[a+3];return e[t]=o*p+h*d+l*f-c*u,e[t+1]=l*p+h*u+c*d-o*f,e[t+2]=c*p+h*f+o*u-l*d,e[t+3]=h*p-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),f=l(s/2),p=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"YZX":this._x=u*h*d+c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d-u*f*p;break;case"XZY":this._x=u*h*d-c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d+u*f*p;break;default:We("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(it(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},ou=class ou{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Dd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Dd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(it(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return eh.copy(this).projectOnVector(e),this.sub(eh)}reflect(e){return this.sub(eh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(it(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ou.prototype.isVector3=!0;var P=ou,eh=new P,Dd=new Fn,lu=class lu{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],y=s[0],m=s[3],g=s[6],b=s[1],T=s[4],_=s[7],S=s[2],w=s[5],R=s[8];return r[0]=a*y+o*b+l*S,r[3]=a*m+o*T+l*w,r[6]=a*g+o*_+l*R,r[1]=c*y+h*b+d*S,r[4]=c*m+h*T+d*w,r[7]=c*g+h*_+d*R,r[2]=u*y+f*b+p*S,r[5]=u*m+f*T+p*w,r[8]=u*g+f*_+p*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,p=t*d+n*u+s*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/p;return e[0]=d*y,e[1]=(s*c-h*n)*y,e[2]=(o*n-s*a)*y,e[3]=u*y,e[4]=(h*t-s*l)*y,e[5]=(s*r-o*t)*y,e[6]=f*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return xs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(th.makeScale(e,t)),this}rotate(e){return xs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(th.makeRotation(-e)),this}translate(e,t){return xs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(th.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};lu.prototype.isMatrix3=!0;var Je=lu,th=new Je,Ud=new Je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nd=new Je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function A0(){let i={enabled:!0,workingColorSpace:aa,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===gt&&(s.r=Ti(s.r),s.g=Ti(s.g),s.b=Ti(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===gt&&(s.r=hr(s.r),s.g=hr(s.g),s.b=hr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ni?oa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return xs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return xs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[aa]:{primaries:e,whitePoint:n,transfer:oa,toXYZ:Ud,fromXYZ:Nd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Vt},outputColorSpaceConfig:{drawingBufferColorSpace:Vt}},[Vt]:{primaries:e,whitePoint:n,transfer:gt,toXYZ:Ud,fromXYZ:Nd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Vt}}}),i}var nt=A0();function Ti(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function hr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var $s,qo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{$s===void 0&&($s=la("canvas")),$s.width=e.width,$s.height=e.height;let s=$s.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=$s}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=la("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ti(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ti(t[n]/255)*255):t[n]=Ti(t[n]);return{data:t,width:e.width,height:e.height}}else return We("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},R0=0,mr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:R0++}),this.uuid=li(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(nh(s[a].image)):r.push(nh(s[a]))}else r=nh(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function nh(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?qo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(We("Texture: Unable to serialize Texture."),{})}var C0=0,ih=new P,gn=class i extends hi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=oi,s=oi,r=rn,a=ns,o=Sn,l=bn,c=i.DEFAULT_ANISOTROPY,h=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:C0++}),this.uuid=li(),this.name="",this.source=new mr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ie(0,0),this.repeat=new ie(1,1),this.center=new ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ih).x}get height(){return this.source.getSize(ih).y}get depth(){return this.source.getSize(ih).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){We(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){We(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Xh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case dr:e.x=e.x-Math.floor(e.x);break;case oi:e.x=e.x<0?0:1;break;case Xo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case dr:e.y=e.y-Math.floor(e.y);break;case oi:e.y=e.y<0?0:1;break;case Xo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};gn.DEFAULT_IMAGE=null;gn.DEFAULT_MAPPING=Xh;gn.DEFAULT_ANISOTROPY=1;var cu=class cu{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],p=l[9],y=l[2],m=l[6],g=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-y)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+y)<.1&&Math.abs(p+m)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let T=(c+1)/2,_=(f+1)/2,S=(g+1)/2,w=(h+u)/4,R=(d+y)/4,v=(p+m)/4;return T>_&&T>S?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=w/n,r=R/n):_>S?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=w/s,r=v/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=R/r,s=v/r),this.set(n,s,r,t),this}let b=Math.sqrt((m-p)*(m-p)+(d-y)*(d-y)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(m-p)/b,this.y=(d-y)/b,this.z=(u-h)/b,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this.w=it(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this.w=it(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(it(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};cu.prototype.isVector4=!0;var Dt=cu,Yo=class extends hi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Dt(0,0,e,t),this.scissorTest=!1,this.viewport=new Dt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new gn(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:rn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new mr(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Xt=class extends Yo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ha=class extends gn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Zo=class extends gn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var _l=class _l{constructor(e,t,n,s,r,a,o,l,c,h,d,u,f,p,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,d,u,f,p,y,m)}set(e,t,n,s,r,a,o,l,c,h,d,u,f,p,y,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=d,g[14]=u,g[3]=f,g[7]=p,g[11]=y,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _l().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/qs.setFromMatrixColumn(e,0).length(),r=1/qs.setFromMatrixColumn(e,1).length(),a=1/qs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=a*h,f=a*d,p=o*h,y=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+p*c,t[5]=u-y*c,t[9]=-o*l,t[2]=y-u*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,p=c*h,y=c*d;t[0]=u+y*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-p,t[6]=y+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,p=c*h,y=c*d;t[0]=u-y*o,t[4]=-a*d,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*h,t[9]=y-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*h,f=a*d,p=o*h,y=o*d;t[0]=l*h,t[4]=p*c-f,t[8]=u*c+y,t[1]=l*d,t[5]=y*c+u,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,f=a*c,p=o*l,y=o*c;t[0]=l*h,t[4]=y-u*d,t[8]=p*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+p,t[10]=u-y*d}else if(e.order==="XZY"){let u=a*l,f=a*c,p=o*l,y=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+y,t[5]=a*h,t[9]=f*d-p,t[2]=p*d-f,t[6]=o*h,t[10]=y*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(P0,e,I0)}lookAt(e,t,n){let s=this.elements;return Tn.subVectors(e,t),Tn.lengthSq()===0&&(Tn.z=1),Tn.normalize(),zi.crossVectors(n,Tn),zi.lengthSq()===0&&(Math.abs(n.z)===1?Tn.x+=1e-4:Tn.z+=1e-4,Tn.normalize(),zi.crossVectors(n,Tn)),zi.normalize(),lo.crossVectors(Tn,zi),s[0]=zi.x,s[4]=lo.x,s[8]=Tn.x,s[1]=zi.y,s[5]=lo.y,s[9]=Tn.y,s[2]=zi.z,s[6]=lo.z,s[10]=Tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],y=n[6],m=n[10],g=n[14],b=n[3],T=n[7],_=n[11],S=n[15],w=s[0],R=s[4],v=s[8],E=s[12],C=s[1],I=s[5],F=s[9],k=s[13],D=s[2],B=s[6],X=s[10],W=s[14],se=s[3],$=s[7],j=s[11],te=s[15];return r[0]=a*w+o*C+l*D+c*se,r[4]=a*R+o*I+l*B+c*$,r[8]=a*v+o*F+l*X+c*j,r[12]=a*E+o*k+l*W+c*te,r[1]=h*w+d*C+u*D+f*se,r[5]=h*R+d*I+u*B+f*$,r[9]=h*v+d*F+u*X+f*j,r[13]=h*E+d*k+u*W+f*te,r[2]=p*w+y*C+m*D+g*se,r[6]=p*R+y*I+m*B+g*$,r[10]=p*v+y*F+m*X+g*j,r[14]=p*E+y*k+m*W+g*te,r[3]=b*w+T*C+_*D+S*se,r[7]=b*R+T*I+_*B+S*$,r[11]=b*v+T*F+_*X+S*j,r[15]=b*E+T*k+_*W+S*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],p=e[3],y=e[7],m=e[11],g=e[15],b=l*f-c*u,T=o*f-c*d,_=o*u-l*d,S=a*f-c*h,w=a*u-l*h,R=a*d-o*h;return t*(y*b-m*T+g*_)-n*(p*b-m*S+g*w)+s*(p*T-y*S+g*R)-r*(p*_-y*w+m*R)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],p=e[12],y=e[13],m=e[14],g=e[15],b=t*o-n*a,T=t*l-s*a,_=t*c-r*a,S=n*l-s*o,w=n*c-r*o,R=s*c-r*l,v=h*y-d*p,E=h*m-u*p,C=h*g-f*p,I=d*m-u*y,F=d*g-f*y,k=u*g-f*m,D=b*k-T*F+_*I+S*C-w*E+R*v;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/D;return e[0]=(o*k-l*F+c*I)*B,e[1]=(s*F-n*k-r*I)*B,e[2]=(y*R-m*w+g*S)*B,e[3]=(u*w-d*R-f*S)*B,e[4]=(l*C-a*k-c*E)*B,e[5]=(t*k-s*C+r*E)*B,e[6]=(m*_-p*R-g*T)*B,e[7]=(h*R-u*_+f*T)*B,e[8]=(a*F-o*C+c*v)*B,e[9]=(n*C-t*F-r*v)*B,e[10]=(p*w-y*_+g*b)*B,e[11]=(d*_-h*w-f*b)*B,e[12]=(o*E-a*I-l*v)*B,e[13]=(t*I-n*E+s*v)*B,e[14]=(y*T-p*S-m*b)*B,e[15]=(h*S-d*T+u*b)*B,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,p=r*d,y=a*h,m=a*d,g=o*d,b=l*c,T=l*h,_=l*d,S=n.x,w=n.y,R=n.z;return s[0]=(1-(y+g))*S,s[1]=(f+_)*S,s[2]=(p-T)*S,s[3]=0,s[4]=(f-_)*w,s[5]=(1-(u+g))*w,s[6]=(m+b)*w,s[7]=0,s[8]=(p+T)*R,s[9]=(m-b)*R,s[10]=(1-(u+y))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=qs.set(s[0],s[1],s[2]).length(),o=qs.set(s[4],s[5],s[6]).length(),l=qs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Wn.copy(this);let c=1/a,h=1/o,d=1/l;return Wn.elements[0]*=c,Wn.elements[1]*=c,Wn.elements[2]*=c,Wn.elements[4]*=h,Wn.elements[5]*=h,Wn.elements[6]*=h,Wn.elements[8]*=d,Wn.elements[9]*=d,Wn.elements[10]*=d,t.setFromRotationMatrix(Wn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Zn,l=!1){let c=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s),p,y;if(l)p=r/(a-r),y=a*r/(a-r);else if(o===Zn)p=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===fr)p=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Zn,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),f=-(n+s)/(n-s),p,y;if(l)p=1/(a-r),y=a/(a-r);else if(o===Zn)p=-2/(a-r),y=-(a+r)/(a-r);else if(o===fr)p=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};_l.prototype.isMatrix4=!0;var xt=_l,qs=new P,Wn=new xt,P0=new P(0,0,0),I0=new P(1,1,1),zi=new P,lo=new P,Tn=new P,Fd=new xt,Od=new Fn,Jn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(it(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-it(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(it(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-it(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(it(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-it(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:We("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Fd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Fd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Od.setFromEuler(this),this.setFromQuaternion(Od,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Jn.DEFAULT_ORDER="XYZ";var ua=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},L0=0,Bd=new P,Ys=new Fn,yi=new xt,co=new P,Xr=new P,D0=new P,U0=new Fn,kd=new P(1,0,0),Hd=new P(0,1,0),zd=new P(0,0,1),Gd={type:"added"},N0={type:"removed"},Zs={type:"childadded",child:null},sh={type:"childremoved",child:null},$t=class i extends hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:L0++}),this.uuid=li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new P,t=new Jn,n=new Fn,s=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new xt},normalMatrix:{value:new Je}}),this.matrix=new xt,this.matrixWorld=new xt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ua,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ys.setFromAxisAngle(e,t),this.quaternion.multiply(Ys),this}rotateOnWorldAxis(e,t){return Ys.setFromAxisAngle(e,t),this.quaternion.premultiply(Ys),this}rotateX(e){return this.rotateOnAxis(kd,e)}rotateY(e){return this.rotateOnAxis(Hd,e)}rotateZ(e){return this.rotateOnAxis(zd,e)}translateOnAxis(e,t){return Bd.copy(e).applyQuaternion(this.quaternion),this.position.add(Bd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(kd,e)}translateY(e){return this.translateOnAxis(Hd,e)}translateZ(e){return this.translateOnAxis(zd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?co.copy(e):co.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Xr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yi.lookAt(Xr,co,this.up):yi.lookAt(co,Xr,this.up),this.quaternion.setFromRotationMatrix(yi),s&&(yi.extractRotation(s.matrixWorld),Ys.setFromRotationMatrix(yi),this.quaternion.premultiply(Ys.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Xe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Gd),Zs.child=e,this.dispatchEvent(Zs),Zs.child=null):Xe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(N0),sh.child=e,this.dispatchEvent(sh),sh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yi.multiply(e.parent.matrixWorld)),e.applyMatrix4(yi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Gd),Zs.child=e,this.dispatchEvent(Zs),Zs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xr,e,D0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xr,U0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};$t.DEFAULT_UP=new P(0,1,0);$t.DEFAULT_MATRIX_AUTO_UPDATE=!0;$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Tt=class extends $t{constructor(){super(),this.isGroup=!0,this.type="Group"}},F0={type:"move"},gr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let m=t.getJointPose(y,n),g=this._getHandJoint(c,y);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&u>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(F0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Tt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Zf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gi={h:0,s:0,l:0},ho={h:0,s:0,l:0};function rh(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Se=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,nt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=nt.workingColorSpace){if(e=eu(e,1),t=it(t,0,1),n=it(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=rh(a,r,e+1/3),this.g=rh(a,r,e),this.b=rh(a,r,e-1/3)}return nt.colorSpaceToWorking(this,s),this}setStyle(e,t=Vt){function n(r){r!==void 0&&parseFloat(r)<1&&We("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:We("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);We("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Vt){let n=Zf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):We("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ti(e.r),this.g=Ti(e.g),this.b=Ti(e.b),this}copyLinearToSRGB(e){return this.r=hr(e.r),this.g=hr(e.g),this.b=hr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Vt){return nt.workingToColorSpace(hn.copy(this),e),Math.round(it(hn.r*255,0,255))*65536+Math.round(it(hn.g*255,0,255))*256+Math.round(it(hn.b*255,0,255))}getHexString(e=Vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.workingToColorSpace(hn.copy(this),t);let n=hn.r,s=hn.g,r=hn.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=nt.workingColorSpace){return nt.workingToColorSpace(hn.copy(this),t),e.r=hn.r,e.g=hn.g,e.b=hn.b,e}getStyle(e=Vt){nt.workingToColorSpace(hn.copy(this),e);let t=hn.r,n=hn.g,s=hn.b;return e!==Vt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Gi),this.setHSL(Gi.h+e,Gi.s+t,Gi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Gi),e.getHSL(ho);let n=na(Gi.h,ho.h,t),s=na(Gi.s,ho.s,t),r=na(Gi.l,ho.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},hn=new Se;Se.NAMES=Zf;var da=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Se(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var ys=class extends $t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Jn,this.environmentIntensity=1,this.environmentRotation=new Jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Xn=new P,Mi=new P,ah=new P,bi=new P,Js=new P,Ks=new P,Vd=new P,oh=new P,lh=new P,ch=new P,hh=new Dt,uh=new Dt,dh=new Dt,wi=class i{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Xn.subVectors(e,t),s.cross(Xn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Xn.subVectors(s,t),Mi.subVectors(n,t),ah.subVectors(e,t);let a=Xn.dot(Xn),o=Xn.dot(Mi),l=Xn.dot(ah),c=Mi.dot(Mi),h=Mi.dot(ah),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,p=(a*h-o*l)*u;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,bi)===null?!1:bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,bi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,bi.x),l.addScaledVector(a,bi.y),l.addScaledVector(o,bi.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return hh.setScalar(0),uh.setScalar(0),dh.setScalar(0),hh.fromBufferAttribute(e,t),uh.fromBufferAttribute(e,n),dh.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(hh,r.x),a.addScaledVector(uh,r.y),a.addScaledVector(dh,r.z),a}static isFrontFacing(e,t,n,s){return Xn.subVectors(n,t),Mi.subVectors(e,t),Xn.cross(Mi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xn.subVectors(this.c,this.b),Mi.subVectors(this.a,this.b),Xn.cross(Mi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Js.subVectors(s,n),Ks.subVectors(r,n),oh.subVectors(e,n);let l=Js.dot(oh),c=Ks.dot(oh);if(l<=0&&c<=0)return t.copy(n);lh.subVectors(e,s);let h=Js.dot(lh),d=Ks.dot(lh);if(h>=0&&d<=h)return t.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Js,a);ch.subVectors(e,r);let f=Js.dot(ch),p=Ks.dot(ch);if(p>=0&&f<=p)return t.copy(r);let y=f*c-l*p;if(y<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Ks,o);let m=h*p-f*d;if(m<=0&&d-h>=0&&f-p>=0)return Vd.subVectors(r,s),o=(d-h)/(d-h+(f-p)),t.copy(s).addScaledVector(Vd,o);let g=1/(m+y+u);return a=y*g,o=u*g,t.copy(n).addScaledVector(Js,a).addScaledVector(Ks,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ui=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint($n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint($n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=$n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,$n):$n.fromBufferAttribute(r,a),$n.applyMatrix4(e.matrixWorld),this.expandByPoint($n);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),uo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),uo.copy(n.boundingBox)),uo.applyMatrix4(e.matrixWorld),this.union(uo)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,$n),$n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($r),fo.subVectors(this.max,$r),js.subVectors(e.a,$r),Qs.subVectors(e.b,$r),er.subVectors(e.c,$r),Vi.subVectors(Qs,js),Wi.subVectors(er,Qs),fs.subVectors(js,er);let t=[0,-Vi.z,Vi.y,0,-Wi.z,Wi.y,0,-fs.z,fs.y,Vi.z,0,-Vi.x,Wi.z,0,-Wi.x,fs.z,0,-fs.x,-Vi.y,Vi.x,0,-Wi.y,Wi.x,0,-fs.y,fs.x,0];return!fh(t,js,Qs,er,fo)||(t=[1,0,0,0,1,0,0,0,1],!fh(t,js,Qs,er,fo))?!1:(po.crossVectors(Vi,Wi),t=[po.x,po.y,po.z],fh(t,js,Qs,er,fo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($n).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Si=[new P,new P,new P,new P,new P,new P,new P,new P],$n=new P,uo=new ui,js=new P,Qs=new P,er=new P,Vi=new P,Wi=new P,fs=new P,$r=new P,fo=new P,po=new P,ps=new P;function fh(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ps.fromArray(i,r);let o=s.x*Math.abs(ps.x)+s.y*Math.abs(ps.y)+s.z*Math.abs(ps.z),l=e.dot(ps),c=t.dot(ps),h=n.dot(ps);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Gt=new P,mo=new ie,O0=0,Yt=class extends hi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:O0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=jh,this.updateRanges=[],this.gpuType=kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)mo.fromBufferAttribute(this,t),mo.applyMatrix3(e),this.setXY(t,mo.x,mo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix3(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=St(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array),s=St(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array),s=St(s,this.array),r=St(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var fa=class extends Yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var pa=class extends Yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ct=class extends Yt{constructor(e,t,n){super(new Float32Array(e),t,n)}},B0=new ui,qr=new P,ph=new P,Ai=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):B0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qr.subVectors(e,this.center);let t=qr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(qr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ph.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qr.copy(e.center).add(ph)),this.expandByPoint(qr.copy(e.center).sub(ph))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},k0=0,Nn=new xt,mh=new $t,tr=new P,An=new ui,Yr=new ui,en=new P,Ft=class i extends hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:k0++}),this.uuid=li(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(c0(e)?pa:fa)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Je().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Nn.makeRotationFromQuaternion(e),this.applyMatrix4(Nn),this}rotateX(e){return Nn.makeRotationX(e),this.applyMatrix4(Nn),this}rotateY(e){return Nn.makeRotationY(e),this.applyMatrix4(Nn),this}rotateZ(e){return Nn.makeRotationZ(e),this.applyMatrix4(Nn),this}translate(e,t,n){return Nn.makeTranslation(e,t,n),this.applyMatrix4(Nn),this}scale(e,t,n){return Nn.makeScale(e,t,n),this.applyMatrix4(Nn),this}lookAt(e){return mh.lookAt(e),mh.updateMatrix(),this.applyMatrix4(mh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(tr).negate(),this.translate(tr.x,tr.y,tr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ct(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&We("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ui);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];An.setFromBufferAttribute(r),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,An.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,An.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(An.min),this.boundingBox.expandByPoint(An.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ai);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){let n=this.boundingSphere.center;if(An.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Yr.setFromBufferAttribute(o),this.morphTargetsRelative?(en.addVectors(An.min,Yr.min),An.expandByPoint(en),en.addVectors(An.max,Yr.max),An.expandByPoint(en)):(An.expandByPoint(Yr.min),An.expandByPoint(Yr.max))}An.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)en.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(en));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)en.fromBufferAttribute(o,c),l&&(tr.fromBufferAttribute(e,c),en.add(tr)),s=Math.max(s,n.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Xe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Xe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Yt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new P,l[v]=new P;let c=new P,h=new P,d=new P,u=new ie,f=new ie,p=new ie,y=new P,m=new P;function g(v,E,C){c.fromBufferAttribute(n,v),h.fromBufferAttribute(n,E),d.fromBufferAttribute(n,C),u.fromBufferAttribute(r,v),f.fromBufferAttribute(r,E),p.fromBufferAttribute(r,C),h.sub(c),d.sub(c),f.sub(u),p.sub(u);let I=1/(f.x*p.y-p.x*f.y);isFinite(I)&&(y.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(I),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(I),o[v].add(y),o[E].add(y),o[C].add(y),l[v].add(m),l[E].add(m),l[C].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let v=0,E=b.length;v<E;++v){let C=b[v],I=C.start,F=C.count;for(let k=I,D=I+F;k<D;k+=3)g(e.getX(k+0),e.getX(k+1),e.getX(k+2))}let T=new P,_=new P,S=new P,w=new P;function R(v){S.fromBufferAttribute(s,v),w.copy(S);let E=o[v];T.copy(E),T.sub(S.multiplyScalar(S.dot(E))).normalize(),_.crossVectors(w,E);let I=_.dot(l[v])<0?-1:1;a.setXYZW(v,T.x,T.y,T.z,I)}for(let v=0,E=b.length;v<E;++v){let C=b[v],I=C.start,F=C.count;for(let k=I,D=I+F;k<D;k+=3)R(e.getX(k+0)),R(e.getX(k+1)),R(e.getX(k+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Yt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new P,r=new P,a=new P,o=new P,l=new P,c=new P,h=new P,d=new P;if(e)for(let u=0,f=e.count;u<f;u+=3){let p=e.getX(u+0),y=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)en.fromBufferAttribute(e,t),en.normalize(),e.setXYZ(t,en.x,en.y,en.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,p=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*h;for(let g=0;g<h;g++)u[p++]=c[f++]}return new Yt(u,h,d)}if(this.index===null)return We("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Jo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=jh,this.updateRanges=[],this.version=0,this.uuid=li()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=li()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=li()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},mn=new P,ma=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyMatrix4(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyNormalMatrix(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.transformDirection(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=St(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=St(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=St(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=St(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=St(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Yn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Yn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Yn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Yn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=St(t,this.array),n=St(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=St(t,this.array),n=St(n,this.array),s=St(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=St(t,this.array),n=St(n,this.array),s=St(s,this.array),r=St(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){ca("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Yt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ca("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},gh=new P,H0=new P,z0=new Je,qn=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=gh.subVectors(n,t).cross(H0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(gh),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||z0.getNormalMatrix(e),s=this.coplanarPoint(gh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},G0=0,Kn=class extends hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:G0++}),this.uuid=li(),this.name="",this.type="Material",this.blending=di,this.side=On,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gh,this.blendDst=Vh,this.blendEquation=Ps,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Se(0,0,0),this.blendAlpha=0,this.depthFunc=ur,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Oo,this.stencilZFail=Oo,this.stencilZPass=Oo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){We(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){We(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Se().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new qn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ie().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ie().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ms=class extends Kn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Se(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},nr,Zr=new P,ir=new P,sr=new P,rr=new ie,Jr=new ie,Jf=new xt,go=new P,Kr=new P,vo=new P,Wd=new ie,vh=new ie,Xd=new ie,vr=class extends $t{constructor(e=new Ms){if(super(),this.isSprite=!0,this.type="Sprite",nr===void 0){nr=new Ft;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Jo(t,5);nr.setIndex([0,1,2,0,2,3]),nr.setAttribute("position",new ma(n,3,0,!1)),nr.setAttribute("uv",new ma(n,2,3,!1))}this.geometry=nr,this.material=e,this.center=new ie(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Xe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ir.setFromMatrixScale(this.matrixWorld),Jf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),sr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ir.multiplyScalar(-sr.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;xo(go.set(-.5,-.5,0),sr,a,ir,s,r),xo(Kr.set(.5,-.5,0),sr,a,ir,s,r),xo(vo.set(.5,.5,0),sr,a,ir,s,r),Wd.set(0,0),vh.set(1,0),Xd.set(1,1);let o=e.ray.intersectTriangle(go,Kr,vo,!1,Zr);if(o===null&&(xo(Kr.set(-.5,.5,0),sr,a,ir,s,r),vh.set(0,1),o=e.ray.intersectTriangle(go,vo,Kr,!1,Zr),o===null))return;let l=e.ray.origin.distanceTo(Zr);l<e.near||l>e.far||t.push({distance:l,point:Zr.clone(),uv:wi.getInterpolation(Zr,go,Kr,vo,Wd,vh,Xd,new ie),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function xo(i,e,t,n,s,r){rr.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Jr.x=r*rr.x-s*rr.y,Jr.y=s*rr.x+r*rr.y):Jr.copy(rr),i.copy(e),i.x+=Jr.x,i.y+=Jr.y,i.applyMatrix4(Jf)}var Ei=new P,xh=new P,_o=new P,yo=new P,ga=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ei.copy(this.origin).addScaledVector(this.direction,t),Ei.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){xh.copy(e).add(t).multiplyScalar(.5),_o.copy(t).sub(e).normalize(),yo.copy(this.origin).sub(xh);let r=e.distanceTo(t)*.5,a=-this.direction.dot(_o),o=yo.dot(this.direction),l=-yo.dot(_o),c=yo.lengthSq(),h=Math.abs(1-a*a),d,u,f,p;if(h>0)if(d=a*l-o,u=a*o-l,p=r*h,d>=0)if(u>=-p)if(u<=p){let y=1/h;d*=y,u*=y,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-p?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=p?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(xh).addScaledVector(_o,u),f}intersectSphere(e,t){if(e.radius<0)return null;Ei.subVectors(e.center,this.origin);let n=Ei.dot(this.direction),s=Ei.dot(Ei)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ei)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=e.x-a.x,u=e.y-a.y,f=e.z-a.z,p=t.x-a.x,y=t.y-a.y,m=t.z-a.z,g=n.x-a.x,b=n.y-a.y,T=n.z-a.z,_=Math.abs(l),S=Math.abs(c),w=Math.abs(h),R,v,E,C,I,F,k,D,B,X,W,se;if(_>=S&&_>=w?(E=l,F=d,B=p,se=g,l>=0?(R=c,v=h,C=u,I=f,k=y,D=m,X=b,W=T):(R=h,v=c,C=f,I=u,k=m,D=y,X=T,W=b)):S>=w?(E=c,F=u,B=y,se=b,c>=0?(R=h,v=l,C=f,I=d,k=m,D=p,X=T,W=g):(R=l,v=h,C=d,I=f,k=p,D=m,X=g,W=T)):(E=h,F=f,B=m,se=T,h>=0?(R=l,v=c,C=d,I=u,k=p,D=y,X=g,W=b):(R=c,v=l,C=u,I=d,k=y,D=p,X=b,W=g)),E===0)return null;let $=R/E,j=v/E,te=1/E,Ue=C-$*F,Ce=I-j*F,vt=k-$*B,rt=D-j*B,dt=X-$*se,Z=W-j*se,Q=dt*rt-Z*vt,ye=Ue*Z-Ce*dt,$e=vt*Ce-rt*Ue;if(s){if(Q<0||ye<0||$e<0)return null}else if((Q<0||ye<0||$e<0)&&(Q>0||ye>0||$e>0))return null;let Te=Q+ye+$e;if(Te===0)return null;let Ye=te*(Q*F+ye*B+$e*se);return(Te>0?Ye<0:Ye>0)?null:this.at(Ye/Te,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},un=class extends Kn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.combine=Wh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},$d=new xt,ms=new ga,Mo=new Ai,qd=new P,bo=new P,So=new P,Eo=new P,_h=new P,wo=new P,Yd=new P,To=new P,ue=class extends $t{constructor(e=new Ft,t=new un){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){wo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(_h.fromBufferAttribute(d,e),a?wo.addScaledVector(_h,h):wo.addScaledVector(_h.sub(t),h))}t.add(wo)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Mo.copy(n.boundingSphere),Mo.applyMatrix4(r),ms.copy(e.ray).recast(e.near),!(Mo.containsPoint(ms.origin)===!1&&(ms.intersectSphere(Mo,qd)===null||ms.origin.distanceToSquared(qd)>(e.far-e.near)**2))&&($d.copy(r).invert(),ms.copy(e.ray).applyMatrix4($d),!(n.boundingBox!==null&&ms.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ms)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,y=u.length;p<y;p++){let m=u[p],g=a[m.materialIndex],b=Math.max(m.start,f.start),T=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let _=b,S=T;_<S;_+=3){let w=o.getX(_),R=o.getX(_+1),v=o.getX(_+2);s=Ao(this,g,e,n,c,h,d,w,R,v),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let p=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let m=p,g=y;m<g;m+=3){let b=o.getX(m),T=o.getX(m+1),_=o.getX(m+2);s=Ao(this,a,e,n,c,h,d,b,T,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,y=u.length;p<y;p++){let m=u[p],g=a[m.materialIndex],b=Math.max(m.start,f.start),T=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=b,S=T;_<S;_+=3){let w=_,R=_+1,v=_+2;s=Ao(this,g,e,n,c,h,d,w,R,v),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let p=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let m=p,g=y;m<g;m+=3){let b=m,T=m+1,_=m+2;s=Ao(this,a,e,n,c,h,d,b,T,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function V0(i,e,t,n,s,r,a,o){let l;if(e.side===Zt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===On,o),l===null)return null;To.copy(o),To.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(To);return c<t.near||c>t.far?null:{distance:c,point:To.clone(),object:i}}function Ao(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,bo),i.getVertexPosition(l,So),i.getVertexPosition(c,Eo);let h=V0(i,e,t,n,bo,So,Eo,Yd);if(h){let d=new P;wi.getBarycoord(Yd,bo,So,Eo,d),s&&(h.uv=wi.getInterpolatedAttribute(s,o,l,c,d,new ie)),r&&(h.uv1=wi.getInterpolatedAttribute(r,o,l,c,d,new ie)),a&&(h.normal=wi.getInterpolatedAttribute(a,o,l,c,d,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new P,materialIndex:0};wi.getNormal(bo,So,Eo,u.normal),h.face=u,h.barycoord=d}return h}var bs=class extends gn{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Nt,h=Nt,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var va=class extends Yt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ar=new xt,Zd=new xt,Ro=[],Jd=new ui,W0=new xt,jr=new ue,Qr=new Ai,Ss=class extends ue{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new va(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,W0)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ui),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ar),Jd.copy(e.boundingBox).applyMatrix4(ar),this.boundingBox.union(Jd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ai),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ar),Qr.copy(e.boundingSphere).applyMatrix4(ar),this.boundingSphere.union(Qr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(jr.geometry=this.geometry,jr.material=this.material,jr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qr.copy(this.boundingSphere),Qr.applyMatrix4(n),e.ray.intersectsSphere(Qr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ar),Zd.multiplyMatrices(n,ar),jr.matrixWorld=Zd,jr.raycast(e,Ro);for(let a=0,o=Ro.length;a<o;a++){let l=Ro[a];l.instanceId=r,l.object=this,t.push(l)}Ro.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new va(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new bs(new Float32Array(s*this.count),s,this.count,Tl,kn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},gs=new Ai,X0=new ie(.5,.5),Co=new P,xr=class{constructor(e=new qn,t=new qn,n=new qn,s=new qn,r=new qn,a=new qn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Zn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],p=r[8],y=r[9],m=r[10],g=r[11],b=r[12],T=r[13],_=r[14],S=r[15];if(s[0].setComponents(c-a,f-h,g-p,S-b).normalize(),s[1].setComponents(c+a,f+h,g+p,S+b).normalize(),s[2].setComponents(c+o,f+d,g+y,S+T).normalize(),s[3].setComponents(c-o,f-d,g-y,S-T).normalize(),n)s[4].setComponents(l,u,m,_).normalize(),s[5].setComponents(c-l,f-u,g-m,S-_).normalize();else if(s[4].setComponents(c-l,f-u,g-m,S-_).normalize(),t===Zn)s[5].setComponents(c+l,f+u,g+m,S+_).normalize();else if(t===fr)s[5].setComponents(l,u,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),gs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),gs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(gs)}intersectsSprite(e){gs.center.set(0,0,0);let t=X0.distanceTo(e.center);return gs.radius=.7071067811865476+t,gs.applyMatrix4(e.matrixWorld),this.intersectsSphere(gs)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Co.x=s.normal.x>0?e.max.x:e.min.x,Co.y=s.normal.y>0?e.max.y:e.min.y,Co.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Co)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ko=class extends Kn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Se(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Kd=new xt,Ch=new ga,Po=new Ai,Io=new P,xa=class extends $t{constructor(e=new Ft,t=new Ko){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Po.copy(n.boundingSphere),Po.applyMatrix4(s),Po.radius+=r,e.ray.intersectsSphere(Po)===!1)return;Kd.copy(s).invert(),Ch.copy(e.ray).applyMatrix4(Kd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=u,y=f;p<y;p++){let m=c.getX(p);Io.fromBufferAttribute(d,m),jd(Io,m,l,s,e,t,this)}}else{let u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let p=u,y=f;p<y;p++)Io.fromBufferAttribute(d,p),jd(Io,p,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function jd(i,e,t,n,s,r,a){let o=Ch.distanceSqToPoint(i);if(o<t){let l=new P;Ch.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var _a=class extends gn{constructor(e=[],t=ts,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},$i=class extends gn{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var qi=class extends gn{constructor(e,t,n=ti,s,r,a,o=Nt,l=Nt,c,h=ci,d=1){if(h!==ci&&h!==is)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new mr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},jo=class extends qi{constructor(e,t=ti,n=ts,s,r,a=Nt,o=Nt,l,c=ci){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ya=class extends gn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},jn=class i extends Ft{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,s,a,2),p("x","z","y",1,-1,e,n,-t,s,a,3),p("x","y","z",1,-1,e,t,n,s,r,4),p("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ct(c,3)),this.setAttribute("normal",new ct(h,3)),this.setAttribute("uv",new ct(d,2));function p(y,m,g,b,T,_,S,w,R,v,E){let C=_/R,I=S/v,F=_/2,k=S/2,D=w/2,B=R+1,X=v+1,W=0,se=0,$=new P;for(let j=0;j<X;j++){let te=j*I-k;for(let Ue=0;Ue<B;Ue++){let Ce=Ue*C-F;$[y]=Ce*b,$[m]=te*T,$[g]=D,c.push($.x,$.y,$.z),$[y]=0,$[m]=0,$[g]=w>0?1:-1,h.push($.x,$.y,$.z),d.push(Ue/R),d.push(1-j/v),W+=1}}for(let j=0;j<v;j++)for(let te=0;te<R;te++){let Ue=u+te+B*j,Ce=u+te+B*(j+1),vt=u+(te+1)+B*(j+1),rt=u+(te+1)+B*j;l.push(Ue,Ce,rt),l.push(Ce,vt,rt),se+=6}o.addGroup(f,se,E),f+=se,u+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},Ri=class i extends Ft{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],h=t/2,d=Math.PI/2*e,u=t,f=2*d+u,p=n*2+r,y=s+1,m=new P,g=new P;for(let b=0;b<=p;b++){let T=0,_=0,S=0,w=0;if(b<=n){let E=b/n,C=E*Math.PI/2;_=-h-e*Math.cos(C),S=e*Math.sin(C),w=-e*Math.cos(C),T=E*d}else if(b<=n+r){let E=(b-n)/r;_=-h+E*t,S=e,w=0,T=d+E*u}else{let E=(b-n-r)/n,C=E*Math.PI/2;_=h+e*Math.sin(C),S=e*Math.cos(C),w=e*Math.sin(C),T=d+u+E*d}let R=Math.max(0,Math.min(1,T/f)),v=0;b===0?v=.5/s:b===p&&(v=-.5/s);for(let E=0;E<=s;E++){let C=E/s,I=C*Math.PI*2,F=Math.sin(I),k=Math.cos(I);g.x=-S*k,g.y=_,g.z=S*F,o.push(g.x,g.y,g.z),m.set(-S*k,w,S*F),m.normalize(),l.push(m.x,m.y,m.z),c.push(C+v,R)}if(b>0){let E=(b-1)*y;for(let C=0;C<s;C++){let I=E+C,F=E+C+1,k=b*y+C,D=b*y+C+1;a.push(I,F,k),a.push(F,D,k)}}}this.setIndex(a),this.setAttribute("position",new ct(o,3)),this.setAttribute("normal",new ct(l,3)),this.setAttribute("uv",new ct(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Yi=class i extends Ft{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new P,h=new ie;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){let f=n+d/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ct(a,3)),this.setAttribute("normal",new ct(o,3)),this.setAttribute("uv",new ct(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},an=class i extends Ft{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],p=0,y=[],m=n/2,g=0;b(),a===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new ct(d,3)),this.setAttribute("normal",new ct(u,3)),this.setAttribute("uv",new ct(f,2));function b(){let _=new P,S=new P,w=0,R=(t-e)/n;for(let v=0;v<=r;v++){let E=[],C=v/r,I=C*(t-e)+e;for(let F=0;F<=s;F++){let k=F/s,D=k*l+o,B=Math.sin(D),X=Math.cos(D);S.x=I*B,S.y=-C*n+m,S.z=I*X,d.push(S.x,S.y,S.z),_.set(B,R,X).normalize(),u.push(_.x,_.y,_.z),f.push(k,1-C),E.push(p++)}y.push(E)}for(let v=0;v<s;v++)for(let E=0;E<r;E++){let C=y[E][v],I=y[E+1][v],F=y[E+1][v+1],k=y[E][v+1];(e>0||E!==0)&&(h.push(C,I,k),w+=3),(t>0||E!==r-1)&&(h.push(I,F,k),w+=3)}c.addGroup(g,w,0),g+=w}function T(_){let S=p,w=new ie,R=new P,v=0,E=_===!0?e:t,C=_===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,m*C,0),u.push(0,C,0),f.push(.5,.5),p++;let I=p;for(let F=0;F<=s;F++){let D=F/s*l+o,B=Math.cos(D),X=Math.sin(D);R.x=E*X,R.y=m*C,R.z=E*B,d.push(R.x,R.y,R.z),u.push(0,C,0),w.x=B*.5+.5,w.y=X*.5*C+.5,f.push(w.x,w.y),p++}for(let F=0;F<s;F++){let k=S+F,D=I+F;_===!0?h.push(D,D+1,k):h.push(D+1,D,k),v+=3}c.addGroup(g,v,_===!0?1:2),g+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},yn=class i extends an{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ma=class i extends Ft{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new ct(r,3)),this.setAttribute("normal",new ct(r.slice(),3)),this.setAttribute("uv",new ct(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(b){let T=new P,_=new P,S=new P;for(let w=0;w<t.length;w+=3)f(t[w+0],T),f(t[w+1],_),f(t[w+2],S),l(T,_,S,b)}function l(b,T,_,S){let w=S+1,R=[];for(let v=0;v<=w;v++){R[v]=[];let E=b.clone().lerp(_,v/w),C=T.clone().lerp(_,v/w),I=w-v;for(let F=0;F<=I;F++)F===0&&v===w?R[v][F]=E:R[v][F]=E.clone().lerp(C,F/I)}for(let v=0;v<w;v++)for(let E=0;E<2*(w-v)-1;E++){let C=Math.floor(E/2);E%2===0?(u(R[v][C+1]),u(R[v+1][C]),u(R[v][C])):(u(R[v][C+1]),u(R[v+1][C+1]),u(R[v+1][C]))}}function c(b){let T=new P;for(let _=0;_<r.length;_+=3)T.x=r[_+0],T.y=r[_+1],T.z=r[_+2],T.normalize().multiplyScalar(b),r[_+0]=T.x,r[_+1]=T.y,r[_+2]=T.z}function h(){let b=new P;for(let T=0;T<r.length;T+=3){b.x=r[T+0],b.y=r[T+1],b.z=r[T+2];let _=m(b)/2/Math.PI+.5,S=g(b)/Math.PI+.5;a.push(_,1-S)}p(),d()}function d(){for(let b=0;b<a.length;b+=6){let T=a[b+0],_=a[b+2],S=a[b+4],w=Math.max(T,_,S),R=Math.min(T,_,S);w>.9&&R<.1&&(T<.2&&(a[b+0]+=1),_<.2&&(a[b+2]+=1),S<.2&&(a[b+4]+=1))}}function u(b){r.push(b.x,b.y,b.z)}function f(b,T){let _=b*3;T.x=e[_+0],T.y=e[_+1],T.z=e[_+2]}function p(){let b=new P,T=new P,_=new P,S=new P,w=new ie,R=new ie,v=new ie;for(let E=0,C=0;E<r.length;E+=9,C+=6){b.set(r[E+0],r[E+1],r[E+2]),T.set(r[E+3],r[E+4],r[E+5]),_.set(r[E+6],r[E+7],r[E+8]),w.set(a[C+0],a[C+1]),R.set(a[C+2],a[C+3]),v.set(a[C+4],a[C+5]),S.copy(b).add(T).add(_).divideScalar(3);let I=m(S);y(w,C+0,b,I),y(R,C+2,T,I),y(v,C+4,_,I)}}function y(b,T,_,S){S<0&&b.x===1&&(a[T]=b.x-1),_.x===0&&_.z===0&&(a[T]=S/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function g(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}},ba=class i extends Ma{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Rn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){We("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],u=n[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new ie:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new P,s=[],r=[],a=[],o=new P,l=new xt;for(let f=0;f<=e;f++){let p=f/e;s[f]=this.getTangentAt(p,new P)}r[0]=new P,a[0]=new P;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(it(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,p))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(it(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],f*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},_r=class extends Rn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ie){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Qo=class extends _r{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function tu(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var Qd=new P,ef=new P,yh=new tu,Mh=new tu,bh=new tu,el=class extends Rn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new P){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(ef.subVectors(s[0],s[1]).add(s[0]),c=ef);let d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Qd.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Qd),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(d),f),y=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);y<1e-4&&(y=1),p<1e-4&&(p=y),m<1e-4&&(m=y),yh.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,p,y,m),Mh.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,p,y,m),bh.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,p,y,m)}else this.curveType==="catmullrom"&&(yh.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Mh.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),bh.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(yh.calc(l),Mh.calc(l),bh.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new P().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function tf(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function $0(i,e){let t=1-i;return t*t*e}function q0(i,e){return 2*(1-i)*i*e}function Y0(i,e){return i*i*e}function ia(i,e,t,n){return $0(i,e)+q0(i,t)+Y0(i,n)}function Z0(i,e){let t=1-i;return t*t*t*e}function J0(i,e){let t=1-i;return 3*t*t*i*e}function K0(i,e){return 3*(1-i)*i*i*e}function j0(i,e){return i*i*i*e}function sa(i,e,t,n,s){return Z0(i,e)+J0(i,t)+K0(i,n)+j0(i,s)}var Sa=class extends Rn{constructor(e=new ie,t=new ie,n=new ie,s=new ie){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ie){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(sa(e,s.x,r.x,a.x,o.x),sa(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},tl=class extends Rn{constructor(e=new P,t=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new P){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(sa(e,s.x,r.x,a.x,o.x),sa(e,s.y,r.y,a.y,o.y),sa(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ea=class extends Rn{constructor(e=new ie,t=new ie){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ie){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ie){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},nl=class extends Rn{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},wa=class extends Rn{constructor(e=new ie,t=new ie,n=new ie){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ie){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ia(e,s.x,r.x,a.x),ia(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},il=class extends Rn{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ia(e,s.x,r.x,a.x),ia(e,s.y,r.y,a.y),ia(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ta=class extends Rn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ie){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(tf(o,l.x,c.x,h.x,d.x),tf(o,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new ie().fromArray(s))}return this}},Ph=Object.freeze({__proto__:null,ArcCurve:Qo,CatmullRomCurve3:el,CubicBezierCurve:Sa,CubicBezierCurve3:tl,EllipseCurve:_r,LineCurve:Ea,LineCurve3:nl,QuadraticBezierCurve:wa,QuadraticBezierCurve3:il,SplineCurve:Ta}),sl=class extends Rn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ph[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Ph[s.type]().fromJSON(s))}return this}},Aa=class extends sl{constructor(e){super(),this.type="Path",this.currentPoint=new ie,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ea(this.currentPoint.clone(),new ie(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new wa(this.currentPoint.clone(),new ie(e,t),new ie(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new Sa(this.currentPoint.clone(),new ie(e,t),new ie(n,s),new ie(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Ta(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){let c=new _r(e,t,n,s,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Es=class extends Aa{constructor(e){super(e),this.uuid=li(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new Aa().fromJSON(s))}return this}};function Q0(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Kf(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=sg(i,e,r,t)),i.length>80*t){o=i[0],l=i[1];let h=o,d=l;for(let u=t;u<s;u+=t){let f=i[u],p=i[u+1];f<o&&(o=f),p<l&&(l=p),f>h&&(h=f),p>d&&(d=p)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return Ra(r,a,t,o,l,c,0),a}function Kf(i,e,t,n,s){let r;if(s===mg(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=nf(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=nf(a/n|0,i[a],i[a+1],r);return r&&yr(r,r.next)&&(Pa(r),r=r.next),r}function ws(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(yr(t,t.next)||Ut(t.prev,t,t.next)===0)){if(Pa(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Ra(i,e,t,n,s,r,a){if(!i)return;!a&&r&&cg(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?tg(i,n,s,r):eg(i)){e.push(l.i,i.i,c.i),Pa(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=ng(ws(i),e),Ra(i,e,t,n,s,r,2)):a===2&&ig(i,e,t,n,s,r):Ra(ws(i),e,t,n,s,r,1);break}}}function eg(i){let e=i.prev,t=i,n=i.next;if(Ut(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(s,r,a),d=Math.min(o,l,c),u=Math.max(s,r,a),f=Math.max(o,l,c),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=u&&p.y>=d&&p.y<=f&&ea(s,o,r,l,a,c,p.x,p.y)&&Ut(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function tg(i,e,t,n){let s=i.prev,r=i,a=i.next;if(Ut(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,d=r.y,u=a.y,f=Math.min(o,l,c),p=Math.min(h,d,u),y=Math.max(o,l,c),m=Math.max(h,d,u),g=Ih(f,p,e,t,n),b=Ih(y,m,e,t,n),T=i.prevZ,_=i.nextZ;for(;T&&T.z>=g&&_&&_.z<=b;){if(T.x>=f&&T.x<=y&&T.y>=p&&T.y<=m&&T!==s&&T!==a&&ea(o,h,l,d,c,u,T.x,T.y)&&Ut(T.prev,T,T.next)>=0||(T=T.prevZ,_.x>=f&&_.x<=y&&_.y>=p&&_.y<=m&&_!==s&&_!==a&&ea(o,h,l,d,c,u,_.x,_.y)&&Ut(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;T&&T.z>=g;){if(T.x>=f&&T.x<=y&&T.y>=p&&T.y<=m&&T!==s&&T!==a&&ea(o,h,l,d,c,u,T.x,T.y)&&Ut(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;_&&_.z<=b;){if(_.x>=f&&_.x<=y&&_.y>=p&&_.y<=m&&_!==s&&_!==a&&ea(o,h,l,d,c,u,_.x,_.y)&&Ut(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function ng(i,e){let t=i;do{let n=t.prev,s=t.next.next;!yr(n,s)&&Qf(n,t,t.next,s)&&Ca(n,s)&&Ca(s,n)&&(e.push(n.i,t.i,s.i),Pa(t),Pa(t.next),t=i=s),t=t.next}while(t!==i);return ws(t)}function ig(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&dg(a,o)){let l=ep(a,o);a=ws(a,a.next),l=ws(l,l.next),Ra(a,e,t,n,s,r,0),Ra(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function sg(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=Kf(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(ug(c))}s.sort(rg);for(let r=0;r<s.length;r++)t=ag(s[r],t);return t}function rg(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function ag(i,e){let t=og(i,e);if(!t)return e;let n=ep(t,i);return ws(n,n.next),ws(t,t.next)}function og(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(yr(i,t))return t;do{if(yr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&jf(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let d=Math.abs(s-t.y)/(n-t.x);Ca(t,i)&&(d<h||d===h&&(t.x>a.x||t.x===a.x&&lg(a,t)))&&(a=t,h=d)}t=t.next}while(t!==o);return a}function lg(i,e){return Ut(i.prev,i,e.prev)<0&&Ut(e.next,i,i.next)<0}function cg(i,e,t,n){let s=i;do s.z===0&&(s.z=Ih(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,hg(s)}function hg(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Ih(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function ug(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function jf(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function ea(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&jf(i,e,t,n,s,r,a,o)}function dg(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!fg(i,e)&&(Ca(i,e)&&Ca(e,i)&&pg(i,e)&&(Ut(i.prev,i,e.prev)||Ut(i,e.prev,e))||yr(i,e)&&Ut(i.prev,i,i.next)>0&&Ut(e.prev,e,e.next)>0)}function Ut(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function yr(i,e){return i.x===e.x&&i.y===e.y}function Qf(i,e,t,n){let s=Do(Ut(i,e,t)),r=Do(Ut(i,e,n)),a=Do(Ut(t,n,i)),o=Do(Ut(t,n,e));return!!(s!==r&&a!==o||s===0&&Lo(i,t,e)||r===0&&Lo(i,n,e)||a===0&&Lo(t,i,n)||o===0&&Lo(t,e,n))}function Lo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Do(i){return i>0?1:i<0?-1:0}function fg(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Qf(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ca(i,e){return Ut(i.prev,i,i.next)<0?Ut(i,e,i.next)>=0&&Ut(i,i.prev,e)>=0:Ut(i,e,i.prev)<0||Ut(i,i.next,e)<0}function pg(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function ep(i,e){let t=Lh(i.i,i.x,i.y),n=Lh(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function nf(i,e,t,n){let s=Lh(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Pa(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Lh(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function mg(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Dh=class{static triangulate(e,t,n=2){return Q0(e,t,n)}},vs=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];sf(e),rf(n,e);let a=e.length;t.forEach(sf);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,rf(n,t[l]);let o=Dh.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function sf(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function rf(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Mr=class i extends Ft{constructor(e=new Es([new ie(.5,.5),new ie(-.5,.5),new ie(-.5,-.5),new ie(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new ct(s,3)),this.setAttribute("uv",new ct(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,b=t.UVGenerator!==void 0?t.UVGenerator:gg,T,_=!1,S,w,R,v;if(g){T=g.getSpacedPoints(h),_=!0,u=!1;let ee=g.isCatmullRomCurve3?g.closed:!1;S=g.computeFrenetFrames(h,ee),w=new P,R=new P,v=new P}u||(m=0,f=0,p=0,y=0);let E=o.extractPoints(c),C=E.shape,I=E.holes;if(!vs.isClockWise(C)){C=C.reverse();for(let ee=0,ae=I.length;ee<ae;ee++){let le=I[ee];vs.isClockWise(le)&&(I[ee]=le.reverse())}}function k(ee){let le=10000000000000001e-36,ce=ee[0];for(let fe=1;fe<=ee.length;fe++){let Ge=fe%ee.length,ke=ee[Ge],Ze=ke.x-ce.x,Ke=ke.y-ce.y,L=Ze*Ze+Ke*Ke,_t=Math.max(Math.abs(ke.x),Math.abs(ke.y),Math.abs(ce.x),Math.abs(ce.y)),at=le*_t*_t;if(L<=at){ee.splice(Ge,1),fe--;continue}ce=ke}}k(C),I.forEach(k);let D=I.length,B=C;for(let ee=0;ee<D;ee++){let ae=I[ee];C=C.concat(ae)}function X(ee,ae,le){return ae||Xe("ExtrudeGeometry: vec does not exist"),ee.clone().addScaledVector(ae,le)}let W=C.length;function se(ee,ae,le){let ce,fe,Ge,ke=ee.x-ae.x,Ze=ee.y-ae.y,Ke=le.x-ee.x,L=le.y-ee.y,_t=ke*ke+Ze*Ze,at=ke*L-Ze*Ke;if(Math.abs(at)>Number.EPSILON){let A=Math.sqrt(_t),x=Math.sqrt(Ke*Ke+L*L),O=ae.x-Ze/A,G=ae.y+ke/A,q=le.x-L/x,he=le.y+Ke/x,de=((q-O)*L-(he-G)*Ke)/(ke*L-Ze*Ke);ce=O+ke*de-ee.x,fe=G+Ze*de-ee.y;let Y=ce*ce+fe*fe;if(Y<=2)return new ie(ce,fe);Ge=Math.sqrt(Y/2)}else{let A=!1;ke>Number.EPSILON?Ke>Number.EPSILON&&(A=!0):ke<-Number.EPSILON?Ke<-Number.EPSILON&&(A=!0):Math.sign(Ze)===Math.sign(L)&&(A=!0),A?(ce=-Ze,fe=ke,Ge=Math.sqrt(_t)):(ce=ke,fe=Ze,Ge=Math.sqrt(_t/2))}return new ie(ce/Ge,fe/Ge)}let $=[];for(let ee=0,ae=B.length,le=ae-1,ce=ee+1;ee<ae;ee++,le++,ce++)le===ae&&(le=0),ce===ae&&(ce=0),$[ee]=se(B[ee],B[le],B[ce]);let j=[],te,Ue=$.concat();for(let ee=0,ae=D;ee<ae;ee++){let le=I[ee];te=[];for(let ce=0,fe=le.length,Ge=fe-1,ke=ce+1;ce<fe;ce++,Ge++,ke++)Ge===fe&&(Ge=0),ke===fe&&(ke=0),te[ce]=se(le[ce],le[Ge],le[ke]);j.push(te),Ue=Ue.concat(te)}let Ce;if(m===0)Ce=vs.triangulateShape(B,I);else{let ee=[],ae=[];for(let le=0;le<m;le++){let ce=le/m,fe=f*Math.cos(ce*Math.PI/2),Ge=p*Math.sin(ce*Math.PI/2)+y;for(let ke=0,Ze=B.length;ke<Ze;ke++){let Ke=X(B[ke],$[ke],Ge);ye(Ke.x,Ke.y,-fe),ce===0&&ee.push(Ke)}for(let ke=0,Ze=D;ke<Ze;ke++){let Ke=I[ke];te=j[ke];let L=[];for(let _t=0,at=Ke.length;_t<at;_t++){let A=X(Ke[_t],te[_t],Ge);ye(A.x,A.y,-fe),ce===0&&L.push(A)}ce===0&&ae.push(L)}}Ce=vs.triangulateShape(ee,ae)}let vt=Ce.length,rt=p+y;for(let ee=0;ee<W;ee++){let ae=u?X(C[ee],Ue[ee],rt):C[ee];_?(R.copy(S.normals[0]).multiplyScalar(ae.x),w.copy(S.binormals[0]).multiplyScalar(ae.y),v.copy(T[0]).add(R).add(w),ye(v.x,v.y,v.z)):ye(ae.x,ae.y,0)}for(let ee=1;ee<=h;ee++)for(let ae=0;ae<W;ae++){let le=u?X(C[ae],Ue[ae],rt):C[ae];_?(R.copy(S.normals[ee]).multiplyScalar(le.x),w.copy(S.binormals[ee]).multiplyScalar(le.y),v.copy(T[ee]).add(R).add(w),ye(v.x,v.y,v.z)):ye(le.x,le.y,d/h*ee)}for(let ee=m-1;ee>=0;ee--){let ae=ee/m,le=f*Math.cos(ae*Math.PI/2),ce=p*Math.sin(ae*Math.PI/2)+y;for(let fe=0,Ge=B.length;fe<Ge;fe++){let ke=X(B[fe],$[fe],ce);ye(ke.x,ke.y,d+le)}for(let fe=0,Ge=I.length;fe<Ge;fe++){let ke=I[fe];te=j[fe];for(let Ze=0,Ke=ke.length;Ze<Ke;Ze++){let L=X(ke[Ze],te[Ze],ce);_?ye(L.x,L.y+T[h-1].y,T[h-1].x+le):ye(L.x,L.y,d+le)}}}dt(),Z();function dt(){let ee=s.length/3;if(u){let ae=0,le=W*ae;for(let ce=0;ce<vt;ce++){let fe=Ce[ce];$e(fe[2]+le,fe[1]+le,fe[0]+le)}ae=h+m*2,le=W*ae;for(let ce=0;ce<vt;ce++){let fe=Ce[ce];$e(fe[0]+le,fe[1]+le,fe[2]+le)}}else{for(let ae=0;ae<vt;ae++){let le=Ce[ae];$e(le[2],le[1],le[0])}for(let ae=0;ae<vt;ae++){let le=Ce[ae];$e(le[0]+W*h,le[1]+W*h,le[2]+W*h)}}n.addGroup(ee,s.length/3-ee,0)}function Z(){let ee=s.length/3,ae=0;Q(B,ae),ae+=B.length;for(let le=0,ce=I.length;le<ce;le++){let fe=I[le];Q(fe,ae),ae+=fe.length}n.addGroup(ee,s.length/3-ee,1)}function Q(ee,ae){let le=ee.length;for(;--le>=0;){let ce=le,fe=le-1;fe<0&&(fe=ee.length-1);for(let Ge=0,ke=h+m*2;Ge<ke;Ge++){let Ze=W*Ge,Ke=W*(Ge+1),L=ae+ce+Ze,_t=ae+fe+Ze,at=ae+fe+Ke,A=ae+ce+Ke;Te(L,_t,at,A)}}}function ye(ee,ae,le){l.push(ee),l.push(ae),l.push(le)}function $e(ee,ae,le){Ye(ee),Ye(ae),Ye(le);let ce=s.length/3,fe=b.generateTopUV(n,s,ce-3,ce-2,ce-1);bt(fe[0]),bt(fe[1]),bt(fe[2])}function Te(ee,ae,le,ce){Ye(ee),Ye(ae),Ye(ce),Ye(ae),Ye(le),Ye(ce);let fe=s.length/3,Ge=b.generateSideWallUV(n,s,fe-6,fe-3,fe-2,fe-1);bt(Ge[0]),bt(Ge[1]),bt(Ge[3]),bt(Ge[1]),bt(Ge[2]),bt(Ge[3])}function Ye(ee){s.push(l[ee*3+0]),s.push(l[ee*3+1]),s.push(l[ee*3+2])}function bt(ee){r.push(ee.x),r.push(ee.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return vg(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Ph[s.type]().fromJSON(s)),new i(n,e.options)}},gg={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],h=e[s*3+1];return[new ie(r,a),new ie(o,l),new ie(c,h)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],d=e[n*3+2],u=e[s*3],f=e[s*3+1],p=e[s*3+2],y=e[r*3],m=e[r*3+1],g=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ie(a,1-l),new ie(c,1-d),new ie(u,1-p),new ie(y,1-g)]:[new ie(o,1-l),new ie(h,1-d),new ie(f,1-p),new ie(m,1-g)]}};function vg(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Ia=class i extends Ma{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Zi=class i extends Ft{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=e/o,u=t/l,f=[],p=[],y=[],m=[];for(let g=0;g<h;g++){let b=g*u-a;for(let T=0;T<c;T++){let _=T*d-r;p.push(_,-b,0),y.push(0,0,1),m.push(T/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let b=0;b<o;b++){let T=b+c*g,_=b+c*(g+1),S=b+1+c*(g+1),w=b+1+c*g;f.push(T,_,w),f.push(_,S,w)}this.setIndex(f),this.setAttribute("position",new ct(p,3)),this.setAttribute("normal",new ct(y,3)),this.setAttribute("uv",new ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var pt=class i extends Ft{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new P,u=new P,f=[],p=[],y=[],m=[];for(let g=0;g<=n;g++){let b=[],T=g/n,_=a+T*o,S=e*Math.cos(_),w=Math.sqrt(e*e-S*S),R=0;g===0&&a===0?R=.5/t:g===n&&l===Math.PI&&(R=-.5/t);for(let v=0;v<=t;v++){let E=v/t,C=s+E*r;d.x=-w*Math.cos(C),d.y=S,d.z=w*Math.sin(C),p.push(d.x,d.y,d.z),u.copy(d).normalize(),y.push(u.x,u.y,u.z),m.push(E+R,1-T),b.push(c++)}h.push(b)}for(let g=0;g<n;g++)for(let b=0;b<t;b++){let T=h[g][b+1],_=h[g][b],S=h[g+1][b],w=h[g+1][b+1];(g!==0||a>0)&&f.push(T,_,w),(g!==n-1||l<Math.PI)&&f.push(_,S,w)}this.setIndex(f),this.setAttribute("position",new ct(p,3)),this.setAttribute("normal",new ct(y,3)),this.setAttribute("uv",new ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Qn=class i extends Ft{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],d=[],u=new P,f=new P,p=new P;for(let y=0;y<=n;y++){let m=a+y/n*o;for(let g=0;g<=s;g++){let b=g/s*r;f.x=(e+t*Math.cos(m))*Math.cos(b),f.y=(e+t*Math.cos(m))*Math.sin(b),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),u.x=e*Math.cos(b),u.y=e*Math.sin(b),p.subVectors(f,u).normalize(),h.push(p.x,p.y,p.z),d.push(g/s),d.push(y/n)}}for(let y=1;y<=n;y++)for(let m=1;m<=s;m++){let g=(s+1)*y+m-1,b=(s+1)*(y-1)+m-1,T=(s+1)*(y-1)+m,_=(s+1)*y+m;l.push(g,b,_),l.push(b,T,_)}this.setIndex(l),this.setAttribute("position",new ct(c,3)),this.setAttribute("normal",new ct(h,3)),this.setAttribute("uv",new ct(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function Ns(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(af(s))s.isRenderTargetTexture?(We("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(af(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function fn(i){let e={};for(let t=0;t<i.length;t++){let n=Ns(i[t]);for(let s in n)e[s]=n[s]}return e}function af(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function xg(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function nu(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}var Pi={clone:Ns,merge:fn},_g=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ct=class extends Kn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_g,this.fragmentShader=yg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ns(e.uniforms),this.uniformsGroups=xg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Se().setHex(s.value);break;case"v2":this.uniforms[n].value=new ie().fromArray(s.value);break;case"v3":this.uniforms[n].value=new P().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Dt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Je().fromArray(s.value);break;case"m4":this.uniforms[n].value=new xt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},br=class extends Ct{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Ts=class extends Kn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Se(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ja,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var As=class extends Kn{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Se(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ja,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var rl=class extends Kn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ff,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},al=class extends Kn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function or(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Sh(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Ji=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ol=class extends Ji{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Th,endingEnd:Th}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ah:r=e,o=2*t-n;break;case Rh:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ah:a=e,l=2*n-t;break;case Rh:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,p=(n-t)/(s-t),y=p*p,m=y*p,g=-u*m+2*u*y-u*p,b=(1+u)*m+(-1.5-2*u)*y+(-.5+u)*p+1,T=(-1-f)*m+(1.5+f)*y+.5*p,_=f*m-f*y;for(let S=0;S!==o;++S)r[S]=g*a[h+S]+b*a[c+S]+T*a[l+S]+_*a[d+S];return r}},ll=class extends Ji{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(s-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},cl=class extends Ji{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},hl=class extends Ji{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let p=(n-t)/(s-t),y=1-p;for(let m=0;m!==o;++m)r[m]=a[c+m]*y+a[l+m]*p;return r}let u=o*2,f=e-1;for(let p=0;p!==o;++p){let y=a[c+p],m=a[l+p],g=f*u+p*2,b=d[g],T=d[g+1],_=e*u+p*2,S=h[_],w=h[_+1],R=bg(n,t,b,S,s);r[p]=tp(R,y,T,w,m)}return r}};function tp(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Mg(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function bg(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=tp(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let l=Mg(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Cn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=or(t,this.TimeBufferType),this.values=or(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:or(e.times,Array),values:or(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Sh(e.settings)&&(n.settings={inTangents:or(e.settings.inTangents,Array),outTangents:or(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new cl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ll(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ol(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new hl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ra:t=this.InterpolantFactoryMethodDiscrete;break;case $o:t=this.InterpolantFactoryMethodLinear;break;case Fo:t=this.InterpolantFactoryMethodSmooth;break;case wh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return We("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ra;case this.InterpolantFactoryMethodLinear:return $o;case this.InterpolantFactoryMethodSmooth:return Fo;case this.InterpolantFactoryMethodBezier:return wh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Sh(this.settings)&&(of(this.settings.inTangents,e),of(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Xe("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Xe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Xe("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Xe("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&h0(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Xe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Fo,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{let d=o*n,u=d-n,f=d+n;for(let p=0;p!==n;++p){let y=t[d+p];if(y!==t[u+p]||y!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Sh(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function of(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}Cn.prototype.ValueTypeName="";Cn.prototype.TimeBufferType=Float32Array;Cn.prototype.ValueBufferType=Float32Array;Cn.prototype.DefaultInterpolation=$o;var Ki=class extends Cn{constructor(e,t,n){super(e,t,n)}};Ki.prototype.ValueTypeName="bool";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=ra;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;var ul=class extends Cn{constructor(e,t,n,s){super(e,t,n,s)}};ul.prototype.ValueTypeName="color";var dl=class extends Cn{constructor(e,t,n,s){super(e,t,n,s)}};dl.prototype.ValueTypeName="number";var fl=class extends Ji{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let h=c+o;c!==h;c+=4)Fn.slerpFlat(r,0,a,c-o,a,c,l);return r}},La=class extends Cn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new fl(this.times,this.values,this.getValueSize(),e)}};La.prototype.ValueTypeName="quaternion";La.prototype.InterpolantFactoryMethodSmooth=void 0;var ji=class extends Cn{constructor(e,t,n){super(e,t,n)}};ji.prototype.ValueTypeName="string";ji.prototype.ValueBufferType=Array;ji.prototype.DefaultInterpolation=ra;ji.prototype.InterpolantFactoryMethodLinear=void 0;ji.prototype.InterpolantFactoryMethodSmooth=void 0;var pl=class extends Cn{constructor(e,t,n,s){super(e,t,n,s)}};pl.prototype.ValueTypeName="vector";var ml=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],p=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},np=new ml,gl=class{constructor(e){this.manager=e!==void 0?e:np,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};gl.DEFAULT_MATERIAL_NAME="__DEFAULT";var Rs=class extends $t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Se(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Da=class extends Rs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy($t.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Se(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Eh=new xt,lf=new P,cf=new P,Sr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ie(512,512),this.mapType=bn,this.map=null,this.mapPass=null,this.matrix=new xt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xr,this._frameExtents=new ie(1,1),this._viewportCount=1,this._viewports=[new Dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;lf.setFromMatrixPosition(e.matrixWorld),t.position.copy(lf),cf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(cf),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Eh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Eh,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===fr||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Eh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Uo=new P,No=new Fn,ai=new P,Ua=class extends $t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xt,this.projectionMatrix=new xt,this.projectionMatrixInverse=new xt,this.coordinateSystem=Zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Uo,No,ai),ai.x===1&&ai.y===1&&ai.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Uo,No,ai.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Uo,No,ai),ai.x===1&&ai.y===1&&ai.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Uo,No,ai.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Xi=new P,hf=new ie,uf=new ie,Wt=class extends Ua{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=_s*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ta*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _s*2*Math.atan(Math.tan(ta*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z),Xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z)}getViewSize(e,t){return this.getViewBounds(e,hf,uf),t.subVectors(uf,hf)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ta*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Uh=class extends Sr{constructor(){super(new Wt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=_s*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Na=class extends Rs{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy($t.DEFAULT_UP),this.updateMatrix(),this.target=new $t,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Uh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Nh=class extends Sr{constructor(){super(new Wt(90,1,.5,500)),this.isPointLightShadow=!0}},Qi=class extends Rs{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Nh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},es=class extends Ua{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Fh=class extends Sr{constructor(){super(new es(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ci=class extends Rs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($t.DEFAULT_UP),this.updateMatrix(),this.target=new $t,this.shadow=new Fh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var lr=-90,cr=1,vl=class extends $t{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Wt(lr,cr,e,t);s.layers=this.layers,this.add(s);let r=new Wt(lr,cr,e,t);r.layers=this.layers,this.add(r);let a=new Wt(lr,cr,e,t);a.layers=this.layers,this.add(a);let o=new Wt(lr,cr,e,t);o.layers=this.layers,this.add(o);let l=new Wt(lr,cr,e,t);l.layers=this.layers,this.add(l);let c=new Wt(lr,cr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Zn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===fr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},xl=class extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Fa=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Sg.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Sg(){this._document.hidden===!1&&this.reset()}var iu="\\[\\]\\.:\\/",Eg=new RegExp("["+iu+"]","g"),su="[^"+iu+"]",wg="[^"+iu.replace("\\.","")+"]",Tg=/((?:WC+[\/:])*)/.source.replace("WC",su),Ag=/(WCOD+)?/.source.replace("WCOD",wg),Rg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",su),Cg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",su),Pg=new RegExp("^"+Tg+Ag+Rg+Cg+"$"),Ig=["material","materials","bones","map"],Oh=class{constructor(e,t,n){let s=n||It.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},It=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Eg,"")}static parseTrackName(e){let t=Pg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Ig.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){We("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Xe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Xe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Xe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Xe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Xe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Xe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Xe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;Xe("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Xe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Xe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};It.Composite=Oh;It.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};It.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};It.prototype.GetterByBindingType=[It.prototype._getValue_direct,It.prototype._getValue_array,It.prototype._getValue_arrayElement,It.prototype._getValue_toArray];It.prototype.SetterByBindingTypeAndVersioning=[[It.prototype._setValue_direct,It.prototype._setValue_direct_setNeedsUpdate,It.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[It.prototype._setValue_array,It.prototype._setValue_array_setNeedsUpdate,It.prototype._setValue_array_setMatrixWorldNeedsUpdate],[It.prototype._setValue_arrayElement,It.prototype._setValue_arrayElement_setNeedsUpdate,It.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[It.prototype._setValue_fromArray,It.prototype._setValue_fromArray_setNeedsUpdate,It.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Mb=new Float32Array(1);var hu=class hu{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};hu.prototype.isMatrix2=!0;var Bh=hu;function ru(i,e,t,n){let s=Lg(n);switch(t){case Jh:return i*e;case Tl:return i*e/s.components*s.byteLength;case Al:return i*e/s.components*s.byteLength;case ss:return i*e*2/s.components*s.byteLength;case Rl:return i*e*2/s.components*s.byteLength;case Kh:return i*e*3/s.components*s.byteLength;case Sn:return i*e*4/s.components*s.byteLength;case Cl:return i*e*4/s.components*s.byteLength;case Wa:case Xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case $a:case qa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Il:case Dl:return Math.max(i,16)*Math.max(e,8)/4;case Pl:case Ll:return Math.max(i,8)*Math.max(e,8)/2;case Ul:case Nl:case Ol:case Bl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Fl:case Ya:case kl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Hl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case zl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Gl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Vl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Wl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Xl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case $l:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ql:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Yl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Zl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Jl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Kl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case jl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ql:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ec:case tc:case nc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ic:case sc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Za:case rc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Lg(i){switch(i){case bn:case $h:return{byteLength:1,components:1};case wr:case qh:case on:return{byteLength:2,components:1};case El:case wl:return{byteLength:2,components:4};case ti:case Sl:case kn:return{byteLength:4,components:1};case Yh:case Zh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?We("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Ep(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Ng(i){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){let p=d[u],y=d[f];y.start<=p.start+p.count+1?p.count=Math.max(p.count,y.start+y.count-p.start):(++u,d[u]=y)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){let y=d[f];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Fg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Og=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Bg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Vg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Xg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$g=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Yg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Zg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Jg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Kg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,jg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ev=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,tv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,nv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,iv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,sv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,rv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,av=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ov=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,lv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,uv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dv="gl_FragColor = linearToOutputTexel( gl_FragColor );",fv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,pv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,mv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,gv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,vv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_v=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Mv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ev=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Tv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Av=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Rv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Cv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Pv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Iv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Lv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Uv=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Nv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Fv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ov=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bv=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,kv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Hv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$v=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Yv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Jv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Kv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Qv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ex=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,tx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,nx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ix=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,rx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ax=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ox=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ux=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,dx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,px=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,_x=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,yx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Mx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,bx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ex=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Tx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ax=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Px=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ix=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Lx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ux=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Nx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Fx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ox=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Vx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Wx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Xx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,$x=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Kx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,t_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,n_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,i_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,s_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,r_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,a_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,o_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,c_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,u_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,d_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,f_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,p_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,m_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,et={alphahash_fragment:Fg,alphahash_pars_fragment:Og,alphamap_fragment:Bg,alphamap_pars_fragment:kg,alphatest_fragment:Hg,alphatest_pars_fragment:zg,aomap_fragment:Gg,aomap_pars_fragment:Vg,batching_pars_vertex:Wg,batching_vertex:Xg,begin_vertex:$g,beginnormal_vertex:qg,bsdfs:Yg,iridescence_fragment:Zg,bumpmap_pars_fragment:Jg,clipping_planes_fragment:Kg,clipping_planes_pars_fragment:jg,clipping_planes_pars_vertex:Qg,clipping_planes_vertex:ev,color_fragment:tv,color_pars_fragment:nv,color_pars_vertex:iv,color_vertex:sv,common:rv,cube_uv_reflection_fragment:av,defaultnormal_vertex:ov,displacementmap_pars_vertex:lv,displacementmap_vertex:cv,emissivemap_fragment:hv,emissivemap_pars_fragment:uv,colorspace_fragment:dv,colorspace_pars_fragment:fv,envmap_fragment:pv,envmap_common_pars_fragment:mv,envmap_pars_fragment:gv,envmap_pars_vertex:vv,envmap_physical_pars_fragment:Rv,envmap_vertex:xv,fog_vertex:_v,fog_pars_vertex:yv,fog_fragment:Mv,fog_pars_fragment:bv,gradientmap_pars_fragment:Sv,lightmap_pars_fragment:Ev,lights_lambert_fragment:wv,lights_lambert_pars_fragment:Tv,lights_pars_begin:Av,lights_toon_fragment:Cv,lights_toon_pars_fragment:Pv,lights_phong_fragment:Iv,lights_phong_pars_fragment:Lv,lights_physical_fragment:Dv,lights_physical_pars_fragment:Uv,lights_fragment_begin:Nv,lights_fragment_maps:Fv,lights_fragment_end:Ov,lightprobes_pars_fragment:Bv,logdepthbuf_fragment:kv,logdepthbuf_pars_fragment:Hv,logdepthbuf_pars_vertex:zv,logdepthbuf_vertex:Gv,map_fragment:Vv,map_pars_fragment:Wv,map_particle_fragment:Xv,map_particle_pars_fragment:$v,metalnessmap_fragment:qv,metalnessmap_pars_fragment:Yv,morphinstance_vertex:Zv,morphcolor_vertex:Jv,morphnormal_vertex:Kv,morphtarget_pars_vertex:jv,morphtarget_vertex:Qv,normal_fragment_begin:ex,normal_fragment_maps:tx,normal_pars_fragment:nx,normal_pars_vertex:ix,normal_vertex:sx,normalmap_pars_fragment:rx,clearcoat_normal_fragment_begin:ax,clearcoat_normal_fragment_maps:ox,clearcoat_pars_fragment:lx,iridescence_pars_fragment:cx,opaque_fragment:hx,packing:ux,premultiplied_alpha_fragment:dx,project_vertex:fx,dithering_fragment:px,dithering_pars_fragment:mx,roughnessmap_fragment:gx,roughnessmap_pars_fragment:vx,shadowmap_pars_fragment:xx,shadowmap_pars_vertex:_x,shadowmap_vertex:yx,shadowmask_pars_fragment:Mx,skinbase_vertex:bx,skinning_pars_vertex:Sx,skinning_vertex:Ex,skinnormal_vertex:wx,specularmap_fragment:Tx,specularmap_pars_fragment:Ax,tonemapping_fragment:Rx,tonemapping_pars_fragment:Cx,transmission_fragment:Px,transmission_pars_fragment:Ix,uv_pars_fragment:Lx,uv_pars_vertex:Dx,uv_vertex:Ux,worldpos_vertex:Nx,background_vert:Fx,background_frag:Ox,backgroundCube_vert:Bx,backgroundCube_frag:kx,cube_vert:Hx,cube_frag:zx,depth_vert:Gx,depth_frag:Vx,distance_vert:Wx,distance_frag:Xx,equirect_vert:$x,equirect_frag:qx,linedashed_vert:Yx,linedashed_frag:Zx,meshbasic_vert:Jx,meshbasic_frag:Kx,meshlambert_vert:jx,meshlambert_frag:Qx,meshmatcap_vert:e_,meshmatcap_frag:t_,meshnormal_vert:n_,meshnormal_frag:i_,meshphong_vert:s_,meshphong_frag:r_,meshphysical_vert:a_,meshphysical_frag:o_,meshtoon_vert:l_,meshtoon_frag:c_,points_vert:h_,points_frag:u_,shadow_vert:d_,shadow_frag:f_,sprite_vert:p_,sprite_frag:m_},_e={common:{diffuse:{value:new Se(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Se(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new Se(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new Se(16777215)},opacity:{value:1},center:{value:new ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},pi={basic:{uniforms:fn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:fn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Se(0)},envMapIntensity:{value:1}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:fn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Se(0)},specular:{value:new Se(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:fn([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Se(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:fn([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Se(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:fn([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:fn([_e.points,_e.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:fn([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:fn([_e.common,_e.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:fn([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:fn([_e.sprite,_e.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distance:{uniforms:fn([_e.common,_e.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distance_vert,fragmentShader:et.distance_frag},shadow:{uniforms:fn([_e.lights,_e.fog,{color:{value:new Se(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};pi.physical={uniforms:fn([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new Se(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new Se(0)},specularColor:{value:new Se(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};var lc={r:0,b:0,g:0},g_=new xt,wp=new Je;wp.set(-1,0,0,0,1,0,0,0,1);function v_(i,e,t,n,s,r){let a=new Se(0),o=s===!0?0:1,l,c,h=null,d=0,u=null;function f(b){let T=b.isScene===!0?b.background:null;if(T&&T.isTexture){let _=b.backgroundBlurriness>0;T=e.get(T,_)}return T}function p(b){let T=!1,_=f(b);_===null?m(a,o):_&&_.isColor&&(m(_,1),T=!0);let S=i.xr.getEnvironmentBlendMode();S==="additive"?t.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(b,T){let _=f(T);_&&(_.isCubeTexture||_.mapping===Va)?(c===void 0&&(c=new ue(new jn(1,1,1),new Ct({name:"BackgroundCubeMaterial",uniforms:Ns(pi.backgroundCube.uniforms),vertexShader:pi.backgroundCube.vertexShader,fragmentShader:pi.backgroundCube.fragmentShader,side:Zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(g_.makeRotationFromEuler(T.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(wp),c.material.toneMapped=nt.getTransfer(_.colorSpace)!==gt,(h!==_||d!==_.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,d=_.version,u=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new ue(new Zi(2,2),new Ct({name:"BackgroundMaterial",uniforms:Ns(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=nt.getTransfer(_.colorSpace)!==gt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,u=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function m(b,T){b.getRGB(lc,nu(i)),t.buffers.color.setClear(lc.r,lc.g,lc.b,T,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,T=1){a.set(b),o=T,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,m(a,o)},render:p,addToRenderList:y,dispose:g}}function x_(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(I,F,k,D,B){let X=!1,W=d(I,D,k,F);r!==W&&(r=W,c(r.object)),X=f(I,D,k,B),X&&p(I,D,k,B),B!==null&&e.update(B,i.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,_(I,F,k,D),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return i.createVertexArray()}function c(I){return i.bindVertexArray(I)}function h(I){return i.deleteVertexArray(I)}function d(I,F,k,D){let B=D.wireframe===!0,X=n[F.id];X===void 0&&(X={},n[F.id]=X);let W=I.isInstancedMesh===!0?I.id:0,se=X[W];se===void 0&&(se={},X[W]=se);let $=se[k.id];$===void 0&&($={},se[k.id]=$);let j=$[B];return j===void 0&&(j=u(l()),$[B]=j),j}function u(I){let F=[],k=[],D=[];for(let B=0;B<t;B++)F[B]=0,k[B]=0,D[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:k,attributeDivisors:D,object:I,attributes:{},index:null}}function f(I,F,k,D){let B=r.attributes,X=F.attributes,W=0,se=k.getAttributes();for(let $ in se)if(se[$].location>=0){let te=B[$],Ue=X[$];if(Ue===void 0&&($==="instanceMatrix"&&I.instanceMatrix&&(Ue=I.instanceMatrix),$==="instanceColor"&&I.instanceColor&&(Ue=I.instanceColor)),te===void 0||te.attribute!==Ue||Ue&&te.data!==Ue.data)return!0;W++}return r.attributesNum!==W||r.index!==D}function p(I,F,k,D){let B={},X=F.attributes,W=0,se=k.getAttributes();for(let $ in se)if(se[$].location>=0){let te=X[$];te===void 0&&($==="instanceMatrix"&&I.instanceMatrix&&(te=I.instanceMatrix),$==="instanceColor"&&I.instanceColor&&(te=I.instanceColor));let Ue={};Ue.attribute=te,te&&te.data&&(Ue.data=te.data),B[$]=Ue,W++}r.attributes=B,r.attributesNum=W,r.index=D}function y(){let I=r.newAttributes;for(let F=0,k=I.length;F<k;F++)I[F]=0}function m(I){g(I,0)}function g(I,F){let k=r.newAttributes,D=r.enabledAttributes,B=r.attributeDivisors;k[I]=1,D[I]===0&&(i.enableVertexAttribArray(I),D[I]=1),B[I]!==F&&(i.vertexAttribDivisor(I,F),B[I]=F)}function b(){let I=r.newAttributes,F=r.enabledAttributes;for(let k=0,D=F.length;k<D;k++)F[k]!==I[k]&&(i.disableVertexAttribArray(k),F[k]=0)}function T(I,F,k,D,B,X,W){W===!0?i.vertexAttribIPointer(I,F,k,B,X):i.vertexAttribPointer(I,F,k,D,B,X)}function _(I,F,k,D){y();let B=D.attributes,X=k.getAttributes(),W=F.defaultAttributeValues;for(let se in X){let $=X[se];if($.location>=0){let j=B[se];if(j===void 0&&(se==="instanceMatrix"&&I.instanceMatrix&&(j=I.instanceMatrix),se==="instanceColor"&&I.instanceColor&&(j=I.instanceColor)),j!==void 0){let te=j.normalized,Ue=j.itemSize,Ce=e.get(j);if(Ce===void 0)continue;let vt=Ce.buffer,rt=Ce.type,dt=Ce.bytesPerElement,Z=rt===i.INT||rt===i.UNSIGNED_INT||j.gpuType===Sl;if(j.isInterleavedBufferAttribute){let Q=j.data,ye=Q.stride,$e=j.offset;if(Q.isInstancedInterleavedBuffer){for(let Te=0;Te<$.locationSize;Te++)g($.location+Te,Q.meshPerAttribute);I.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Te=0;Te<$.locationSize;Te++)m($.location+Te);i.bindBuffer(i.ARRAY_BUFFER,vt);for(let Te=0;Te<$.locationSize;Te++)T($.location+Te,Ue/$.locationSize,rt,te,ye*dt,($e+Ue/$.locationSize*Te)*dt,Z)}else{if(j.isInstancedBufferAttribute){for(let Q=0;Q<$.locationSize;Q++)g($.location+Q,j.meshPerAttribute);I.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Q=0;Q<$.locationSize;Q++)m($.location+Q);i.bindBuffer(i.ARRAY_BUFFER,vt);for(let Q=0;Q<$.locationSize;Q++)T($.location+Q,Ue/$.locationSize,rt,te,Ue*dt,Ue/$.locationSize*Q*dt,Z)}}else if(W!==void 0){let te=W[se];if(te!==void 0)switch(te.length){case 2:i.vertexAttrib2fv($.location,te);break;case 3:i.vertexAttrib3fv($.location,te);break;case 4:i.vertexAttrib4fv($.location,te);break;default:i.vertexAttrib1fv($.location,te)}}}}b()}function S(){E();for(let I in n){let F=n[I];for(let k in F){let D=F[k];for(let B in D){let X=D[B];for(let W in X)h(X[W].object),delete X[W];delete D[B]}}delete n[I]}}function w(I){if(n[I.id]===void 0)return;let F=n[I.id];for(let k in F){let D=F[k];for(let B in D){let X=D[B];for(let W in X)h(X[W].object),delete X[W];delete D[B]}}delete n[I.id]}function R(I){for(let F in n){let k=n[F];for(let D in k){let B=k[D];if(B[I.id]===void 0)continue;let X=B[I.id];for(let W in X)h(X[W].object),delete X[W];delete B[I.id]}}}function v(I){for(let F in n){let k=n[F],D=I.isInstancedMesh===!0?I.id:0,B=k[D];if(B!==void 0){for(let X in B){let W=B[X];for(let se in W)h(W[se].object),delete W[se];delete B[X]}delete k[D],Object.keys(k).length===0&&delete n[F]}}}function E(){C(),a=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:C,dispose:S,releaseStatesOfGeometry:w,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:y,enableAttribute:m,disableUnusedAttributes:b}}function __(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function y_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==Sn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let v=R===on&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==bn&&R!==kn&&!v&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(We("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&We("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:y,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:b,maxVaryings:T,maxFragmentUniforms:_,maxSamples:S,samples:w}}function M_(i){let e=this,t=null,n=0,s=!1,r=!1,a=new qn,o=new Je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let p=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,g=i.get(d);if(!s||p===null||p.length===0||r&&!m)r?h(null):c();else{let b=r?0:n,T=b*4,_=g.clippingState||null;l.value=_,_=h(p,u,T,f);for(let S=0;S!==T;++S)_[S]=t[S];g.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,p){let y=d!==null?d.length:0,m=null;if(y!==0){if(m=l.value,p!==!0||m===null){let g=f+y*4,b=u.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<g)&&(m=new Float32Array(g));for(let T=0,_=f;T!==y;++T,_+=4)a.copy(d[T]).applyMatrix4(b,o),a.normal.toArray(m,_),m[_+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}var Rr=4,b_=6,S_=20,E_=256,Ka=new es,ip=new Se,uu=null,du=0,fu=0,pu=!1,w_=new P,Fs=new P,hc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=w_}=r;uu=this._renderer.getRenderTarget(),du=this._renderer.getActiveCubeFace(),fu=this._renderer.getActiveMipmapLevel(),pu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ap(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(uu,du,fu),this._renderer.xr.enabled=pu,e.scissorTest=!1,Ar(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ts||e.mapping===Ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),uu=this._renderer.getRenderTarget(),du=this._renderer.getActiveCubeFace(),fu=this._renderer.getActiveMipmapLevel(),pu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:rn,minFilter:rn,generateMipmaps:!1,type:on,format:Sn,colorSpace:aa,depthBuffer:!1},s=sp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sp(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=T_(r)),this._blurMaterial=R_(r,e,t),this._ggxMaterial=A_(r,e,t)}return s}_compileMaterial(e){let t=new ue(new Ft,e);this._renderer.compile(t,Ka)}_sceneToCubeUV(e,t,n,s,r){let l=new Wt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(ip),d.toneMapping=ei,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ue(new jn,new un({name:"PMREM.Background",side:Zt,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,m=y.material,g=!1,b=e.background;b?b.isColor&&(m.color.copy(b),e.background=null,g=!0):(m.color.copy(ip),g=!0);for(let T=0;T<6;T++){let _=T%3;_===0?(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[T],r.y,r.z)):_===1?(l.up.set(0,0,c[T]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[T],r.z)):(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[T]));let S=this._cubeSize;Ar(s,_*S,T>2?S:0,S,S),d.setRenderTarget(s),g&&d.render(y,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=b}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===ts||e.mapping===Ls;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ap()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rp());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Ar(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Ka)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:p}=this,y=this._sizeLods[n],m=3*y*(n>p-Rr?n-p+Rr:0),g=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,Ar(r,m,g,3*y,2*y),s.setRenderTarget(r),s.render(o,Ka),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,Ar(e,m,g,3*y,2*y),s.setRenderTarget(e),s.render(o,Ka)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],d=3*h*(s>this._lodMax-Rr?s-this._lodMax+Rr:0),u=4*(this._cubeSize-h);Ar(t,d,u,3*h,2*h),a.setRenderTarget(t),a.render(l,Ka)}};function T_(i){let e=[],t=[],n=i,s=i-Rr+1+b_;for(let r=0;r<s;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,p=new Float32Array(f*u*d),y=new Float32Array(f*u*d);for(let g=0;g<d;g++){let b=g%3*2/3-1,T=g>2?0:-1,_=[b,T,0,b+2/3,T,0,b+2/3,T+1,0,b,T,0,b+2/3,T+1,0,b,T+1,0];p.set(_,f*u*g);for(let S=0;S<u;S++){let w=h[S*2]*2-1,R=h[S*2+1]*2-1;g===0?Fs.set(1,R,w):g===1?Fs.set(-w,1,-R):g===2?Fs.set(-w,R,1):g===3?Fs.set(-1,R,-w):g===4?Fs.set(-w,-1,R):Fs.set(w,R,-1),Fs.toArray(y,(g*u+S)*f)}}let m=new Ft;m.setAttribute("position",new Yt(p,f)),m.setAttribute("outputDirection",new Yt(y,f)),t.push(new ue(m,null)),n>Rr&&n--}return{lodMeshes:t,sizeLods:e}}function sp(i,e,t){let n=new Xt(i,e,t);return n.texture.mapping=Va,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ar(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function A_(i,e,t){return new Ct({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:E_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:fc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function R_(i,e,t){return new Ct({name:"SphericalGaussianBlur",defines:{SAMPLES:S_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:fc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function rp(){return new Ct({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function ap(){return new Ct({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function fc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var uc=class extends Xt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new _a(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new jn(5,5,5),r=new Ct({name:"CubemapFromEquirect",uniforms:Ns(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Zt,blending:Bn});r.uniforms.tEquirect.value=t;let a=new ue(s,r),o=t.minFilter;return t.minFilter===ns&&(t.minFilter=rn),new vl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function C_(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===yl||f===Ml)if(e.has(u)){let p=e.get(u).texture;return o(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let y=new uc(p.height);return y.fromEquirectangularTexture(i,u),e.set(u,y),u.addEventListener("dispose",c),o(y.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,p=f===yl||f===Ml,y=f===ts||f===Ls;if(p||y){let m=t.get(u),g=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return n===null&&(n=new hc(i)),m=p?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{let b=u.image;return p&&b&&b.height>0||y&&b&&l(b)?(n===null&&(n=new hc(i)),m=p?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===yl?u.mapping=ts:f===Ml&&(u.mapping=Ls),u}function l(u){let f=0,p=6;for(let y=0;y<p;y++)u[y]!==void 0&&f++;return f===p}function c(u){let f=u.target;f.removeEventListener("dispose",c);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function P_(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&xs("WebGLRenderer: "+n+" extension not supported."),s}}}function I_(i,e,t,n){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let p in u.attributes)e.remove(u.attributes[p]);u.removeEventListener("dispose",a),delete s[u.id];let f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)e.update(u[f],i.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,p=d.attributes.position,y=0;if(p===void 0)return;if(f!==null){let b=f.array;y=f.version;for(let T=0,_=b.length;T<_;T+=3){let S=b[T+0],w=b[T+1],R=b[T+2];u.push(S,w,w,R,R,S)}}else{let b=p.array;y=p.version;for(let T=0,_=b.length/3-1;T<_;T+=3){let S=T+0,w=T+1,R=T+2;u.push(S,w,w,R,R,S)}}let m=new(p.count>=65535?pa:fa)(u,1);m.version=y;let g=r.get(d);g&&e.remove(g),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function L_(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),t.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*a,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let y=0;for(let m=0;m<f;m++)y+=u[m];t.update(y,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function D_(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Xe("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function U_(i,e,t){let n=new WeakMap,s=new Dt;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let E=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",E)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],T=0;f===!0&&(T=1),p===!0&&(T=2),y===!0&&(T=3);let _=o.attributes.position.count*T,S=1;_>e.maxTextureSize&&(S=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let w=new Float32Array(_*S*4*d),R=new ha(w,_,S,d);R.type=kn,R.needsUpdate=!0;let v=T*4;for(let C=0;C<d;C++){let I=m[C],F=g[C],k=b[C],D=_*S*4*C;for(let B=0;B<I.count;B++){let X=B*v;f===!0&&(s.fromBufferAttribute(I,B),w[D+X+0]=s.x,w[D+X+1]=s.y,w[D+X+2]=s.z,w[D+X+3]=0),p===!0&&(s.fromBufferAttribute(F,B),w[D+X+4]=s.x,w[D+X+5]=s.y,w[D+X+6]=s.z,w[D+X+7]=0),y===!0&&(s.fromBufferAttribute(k,B),w[D+X+8]=s.x,w[D+X+9]=s.y,w[D+X+10]=s.z,w[D+X+11]=k.itemSize===4?s.w:1)}}u={count:d,texture:R,size:new ie(_,S)},n.set(o,u),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let p=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function N_(i,e,t,n,s){let r=new WeakMap;function a(c){let h=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var F_={[Oa]:"LINEAR_TONE_MAPPING",[Ba]:"REINHARD_TONE_MAPPING",[ka]:"CINEON_TONE_MAPPING",[Is]:"ACES_FILMIC_TONE_MAPPING",[za]:"AGX_TONE_MAPPING",[Ga]:"NEUTRAL_TONE_MAPPING",[Ha]:"CUSTOM_TONE_MAPPING"};function O_(i,e,t,n,s,r){let a=new Xt(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Ft;c.setAttribute("position",new ct([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ct([0,2,0,0,2,0],2));let h=new br({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new ue(c,h),u=new es(-1,1,1,-1,0,1),f=null,p=null,y=!1,m,g=null,b=[],T=!1;this.setSize=function(_,S){a.setSize(_,S),o!==null&&o.setSize(_,S),l!==null&&l.setSize(_,S);for(let w=0;w<b.length;w++){let R=b[w];R.setSize&&R.setSize(_,S)}},this.setEffects=function(_){b=_,T=b.length>0&&b[0].isRenderPass===!0;let S=a.width,w=a.height;b.length>0&&o===null&&(o=new Xt(S,w,{type:on,depthBuffer:!1,stencilBuffer:!1}),l=new Xt(S,w,{type:on,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<b.length;R++){let v=b[R];v.setSize&&v.setSize(S,w)}},this.begin=function(_,S){if(y||_.toneMapping===ei&&b.length===0)return!1;if(g=S,S!==null){let w=S.width,R=S.height;(a.width!==w||a.height!==R)&&this.setSize(w,R)}return T===!1&&_.setRenderTarget(a),m=_.toneMapping,_.toneMapping=ei,!0},this.hasRenderPass=function(){return T},this.end=function(_,S){_.toneMapping=m,y=!0;let w=a,R=o;for(let v=0;v<b.length;v++){let E=b[v];E.enabled!==!1&&(E.render(_,R,w,S),E.needsSwap!==!1&&(w=R,R=R===o?l:o))}if(f!==_.outputColorSpace||p!==_.toneMapping){f=_.outputColorSpace,p=_.toneMapping,h.defines={},nt.getTransfer(f)===gt&&(h.defines.SRGB_TRANSFER="");let v=F_[p];v&&(h.defines[v]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=w.texture,_.setRenderTarget(g),_.render(d,u),g=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var Tp=new gn,vu=new qi(1,1),Ap=new ha,Rp=new Zo,Cp=new _a,op=[],lp=[],cp=new Float32Array(16),hp=new Float32Array(9),up=new Float32Array(4);function Pr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=op[s];if(r===void 0&&(r=new Float32Array(s),op[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Jt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Kt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function pc(i,e){let t=lp[e];t===void 0&&(t=new Int32Array(e),lp[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function B_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function k_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;i.uniform2fv(this.addr,e),Kt(t,e)}}function H_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Jt(t,e))return;i.uniform3fv(this.addr,e),Kt(t,e)}}function z_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;i.uniform4fv(this.addr,e),Kt(t,e)}}function G_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Jt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Kt(t,e)}else{if(Jt(t,n))return;up.set(n),i.uniformMatrix2fv(this.addr,!1,up),Kt(t,n)}}function V_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Jt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Kt(t,e)}else{if(Jt(t,n))return;hp.set(n),i.uniformMatrix3fv(this.addr,!1,hp),Kt(t,n)}}function W_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Jt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Kt(t,e)}else{if(Jt(t,n))return;cp.set(n),i.uniformMatrix4fv(this.addr,!1,cp),Kt(t,n)}}function X_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function $_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;i.uniform2iv(this.addr,e),Kt(t,e)}}function q_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Jt(t,e))return;i.uniform3iv(this.addr,e),Kt(t,e)}}function Y_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;i.uniform4iv(this.addr,e),Kt(t,e)}}function Z_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function J_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;i.uniform2uiv(this.addr,e),Kt(t,e)}}function K_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Jt(t,e))return;i.uniform3uiv(this.addr,e),Kt(t,e)}}function j_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;i.uniform4uiv(this.addr,e),Kt(t,e)}}function Q_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(vu.compareFunction=t.isReversedDepthBuffer()?oc:ac,r=vu):r=Tp,t.setTexture2D(e||r,s)}function ey(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Rp,s)}function ty(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Cp,s)}function ny(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Ap,s)}function iy(i){switch(i){case 5126:return B_;case 35664:return k_;case 35665:return H_;case 35666:return z_;case 35674:return G_;case 35675:return V_;case 35676:return W_;case 5124:case 35670:return X_;case 35667:case 35671:return $_;case 35668:case 35672:return q_;case 35669:case 35673:return Y_;case 5125:return Z_;case 36294:return J_;case 36295:return K_;case 36296:return j_;case 35678:case 36198:case 36298:case 36306:case 35682:return Q_;case 35679:case 36299:case 36307:return ey;case 35680:case 36300:case 36308:case 36293:return ty;case 36289:case 36303:case 36311:case 36292:return ny}}function sy(i,e){i.uniform1fv(this.addr,e)}function ry(i,e){let t=Pr(e,this.size,2);i.uniform2fv(this.addr,t)}function ay(i,e){let t=Pr(e,this.size,3);i.uniform3fv(this.addr,t)}function oy(i,e){let t=Pr(e,this.size,4);i.uniform4fv(this.addr,t)}function ly(i,e){let t=Pr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function cy(i,e){let t=Pr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function hy(i,e){let t=Pr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function uy(i,e){i.uniform1iv(this.addr,e)}function dy(i,e){i.uniform2iv(this.addr,e)}function fy(i,e){i.uniform3iv(this.addr,e)}function py(i,e){i.uniform4iv(this.addr,e)}function my(i,e){i.uniform1uiv(this.addr,e)}function gy(i,e){i.uniform2uiv(this.addr,e)}function vy(i,e){i.uniform3uiv(this.addr,e)}function xy(i,e){i.uniform4uiv(this.addr,e)}function _y(i,e,t){let n=this.cache,s=e.length,r=pc(t,s);Jt(n,r)||(i.uniform1iv(this.addr,r),Kt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=vu:a=Tp;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function yy(i,e,t){let n=this.cache,s=e.length,r=pc(t,s);Jt(n,r)||(i.uniform1iv(this.addr,r),Kt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Rp,r[a])}function My(i,e,t){let n=this.cache,s=e.length,r=pc(t,s);Jt(n,r)||(i.uniform1iv(this.addr,r),Kt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Cp,r[a])}function by(i,e,t){let n=this.cache,s=e.length,r=pc(t,s);Jt(n,r)||(i.uniform1iv(this.addr,r),Kt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Ap,r[a])}function Sy(i){switch(i){case 5126:return sy;case 35664:return ry;case 35665:return ay;case 35666:return oy;case 35674:return ly;case 35675:return cy;case 35676:return hy;case 5124:case 35670:return uy;case 35667:case 35671:return dy;case 35668:case 35672:return fy;case 35669:case 35673:return py;case 5125:return my;case 36294:return gy;case 36295:return vy;case 36296:return xy;case 35678:case 36198:case 36298:case 36306:case 35682:return _y;case 35679:case 36299:case 36307:return yy;case 35680:case 36300:case 36308:case 36293:return My;case 36289:case 36303:case 36311:case 36292:return by}}var xu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=iy(t.type)}},_u=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Sy(t.type)}},yu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},mu=/(\w+)(\])?(\[|\.)?/g;function dp(i,e){i.seq.push(e),i.map[e.id]=e}function Ey(i,e,t){let n=i.name,s=n.length;for(mu.lastIndex=0;;){let r=mu.exec(n),a=mu.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){dp(t,c===void 0?new xu(o,i,e):new _u(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new yu(o),dp(t,d)),t=d}}}var Cr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Ey(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function fp(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var wy=37297,Ty=0;function Ay(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var pp=new Je;function Ry(i){nt._getMatrix(pp,nt.workingColorSpace,i);let e=`mat3( ${pp.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(i)){case oa:return[e,"LinearTransferOETF"];case gt:return[e,"sRGBTransferOETF"];default:return We("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function mp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Ay(i.getShaderSource(e),o)}else return r}function Cy(i,e){let t=Ry(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Py={[Oa]:"Linear",[Ba]:"Reinhard",[ka]:"Cineon",[Is]:"ACESFilmic",[za]:"AgX",[Ga]:"Neutral",[Ha]:"Custom"};function Iy(i,e){let t=Py[e];return t===void 0?(We("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var cc=new P;function Ly(){nt.getLuminanceCoefficients(cc);let i=cc.x.toFixed(4),e=cc.y.toFixed(4),t=cc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Dy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qa).join(`
`)}function Uy(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ny(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Qa(i){return i!==""}function gp(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function vp(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Fy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mu(i){return i.replace(Fy,By)}var Oy=new Map;function By(i,e){let t=et[e];if(t===void 0){let n=Oy.get(e);if(n!==void 0)t=et[n],We('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Mu(t)}var ky=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xp(i){return i.replace(ky,Hy)}function Hy(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function _p(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var zy={[Cs]:"SHADOWMAP_TYPE_PCF",[Er]:"SHADOWMAP_TYPE_VSM"};function Gy(i){return zy[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Vy={[ts]:"ENVMAP_TYPE_CUBE",[Ls]:"ENVMAP_TYPE_CUBE",[Va]:"ENVMAP_TYPE_CUBE_UV"};function Wy(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Vy[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Xy={[Ls]:"ENVMAP_MODE_REFRACTION"};function $y(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Xy[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var qy={[Wh]:"ENVMAP_BLENDING_MULTIPLY",[Df]:"ENVMAP_BLENDING_MIX",[Uf]:"ENVMAP_BLENDING_ADD"};function Yy(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":qy[i.combine]||"ENVMAP_BLENDING_NONE"}function Zy(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Jy(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Gy(t),c=Wy(t),h=$y(t),d=Yy(t),u=Zy(t),f=Dy(t),p=Uy(r),y=s.createProgram(),m,g,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Qa).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Qa).join(`
`),g.length>0&&(g+=`
`)):(m=[_p(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qa).join(`
`),g=[_p(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ei?"#define TONE_MAPPING":"",t.toneMapping!==ei?et.tonemapping_pars_fragment:"",t.toneMapping!==ei?Iy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,Cy("linearToOutputTexel",t.outputColorSpace),Ly(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qa).join(`
`)),a=Mu(a),a=gp(a,t),a=vp(a,t),o=Mu(o),o=gp(o,t),o=vp(o,t),a=xp(a),o=xp(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===Qh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Qh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let T=b+m+a,_=b+g+o,S=fp(s,s.VERTEX_SHADER,T),w=fp(s,s.FRAGMENT_SHADER,_);s.attachShader(y,S),s.attachShader(y,w),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function R(I){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(y)||"",k=s.getShaderInfoLog(S)||"",D=s.getShaderInfoLog(w)||"",B=F.trim(),X=k.trim(),W=D.trim(),se=!0,$=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(se=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,S,w);else{let j=mp(s,S,"vertex"),te=mp(s,w,"fragment");Xe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+B+`
`+j+`
`+te)}else B!==""?We("WebGLProgram: Program Info Log:",B):(X===""||W==="")&&($=!1);$&&(I.diagnostics={runnable:se,programLog:B,vertexShader:{log:X,prefix:m},fragmentShader:{log:W,prefix:g}})}s.deleteShader(S),s.deleteShader(w),v=new Cr(s,y),E=Ny(s,y)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(y,wy)),C},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ty++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=S,this.fragmentShader=w,this}var Ky=0,bu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Su(e),t.set(e,n)),n}},Su=class{constructor(e){this.id=Ky++,this.code=e,this.usedTimes=0}};function jy(i){return i===ss||i===Ya||i===Za}function Qy(i,e,t,n,s,r){let a=new ua,o=new bu,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return l.add(v),v===0?"uv":`uv${v}`}function y(v,E,C,I,F,k){let D=I.fog,B=F.geometry,X=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?I.environment:null,W=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,se=e.get(v.envMap||X,W),$=se&&se.mapping===Va?se.image.height:null,j=f[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&We("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));let te=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Ue=te!==void 0?te.length:0,Ce=0;B.morphAttributes.position!==void 0&&(Ce=1),B.morphAttributes.normal!==void 0&&(Ce=2),B.morphAttributes.color!==void 0&&(Ce=3);let vt,rt,dt,Z;if(j){let At=pi[j];vt=At.vertexShader,rt=At.fragmentShader}else{vt=v.vertexShader,rt=v.fragmentShader;let At=o.getVertexShaderStage(v),yt=o.getFragmentShaderStage(v);o.update(v,At,yt),dt=At.id,Z=yt.id}let Q=i.getRenderTarget(),ye=i.state.buffers.depth.getReversed(),$e=F.isInstancedMesh===!0,Te=F.isBatchedMesh===!0,Ye=!!v.map,bt=!!v.matcap,ee=!!se,ae=!!v.aoMap,le=!!v.lightMap,ce=!!v.bumpMap&&v.wireframe===!1,fe=!!v.normalMap,Ge=!!v.displacementMap,ke=!!v.emissiveMap,Ze=!!v.metalnessMap,Ke=!!v.roughnessMap,L=v.anisotropy>0,_t=v.clearcoat>0,at=v.dispersion>0,A=v.retroreflectivity>0,x=v.iridescence>0,O=v.sheen>0,G=v.transmission>0,q=L&&!!v.anisotropyMap,he=_t&&!!v.clearcoatMap,de=_t&&!!v.clearcoatNormalMap,Y=_t&&!!v.clearcoatRoughnessMap,K=x&&!!v.iridescenceMap,pe=x&&!!v.iridescenceThicknessMap,Ne=O&&!!v.sheenColorMap,xe=O&&!!v.sheenRoughnessMap,me=!!v.specularMap,Fe=!!v.specularColorMap,Ve=!!v.specularIntensityMap,je=G&&!!v.transmissionMap,N=G&&!!v.thicknessMap,ge=!!v.gradientMap,J=!!v.alphaMap,ve=v.alphaTest>0,Ee=!!v.alphaHash,ne=!!v.extensions,Oe=ei;v.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Oe=i.toneMapping);let Le={shaderID:j,shaderType:v.type,shaderName:v.name,vertexShader:vt,fragmentShader:rt,defines:v.defines,customVertexShaderID:dt,customFragmentShaderID:Z,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Te,batchingColor:Te&&F._colorsTexture!==null,instancing:$e,instancingColor:$e&&F.instanceColor!==null,instancingMorph:$e&&F.morphTexture!==null,outputColorSpace:Q===null?i.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:nt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Ye,matcap:bt,envMap:ee,envMapMode:ee&&se.mapping,envMapCubeUVHeight:$,aoMap:ae,lightMap:le,bumpMap:ce,normalMap:fe,displacementMap:Ge,emissiveMap:ke,normalMapObjectSpace:fe&&v.normalMapType===Of,normalMapTangentSpace:fe&&v.normalMapType===Ja,packedNormalMap:fe&&v.normalMapType===Ja&&jy(v.normalMap.format),metalnessMap:Ze,roughnessMap:Ke,anisotropy:L,anisotropyMap:q,clearcoat:_t,clearcoatMap:he,clearcoatNormalMap:de,clearcoatRoughnessMap:Y,dispersion:at,retroreflection:A,iridescence:x,iridescenceMap:K,iridescenceThicknessMap:pe,sheen:O,sheenColorMap:Ne,sheenRoughnessMap:xe,specularMap:me,specularColorMap:Fe,specularIntensityMap:Ve,transmission:G,transmissionMap:je,thicknessMap:N,gradientMap:ge,opaque:v.transparent===!1&&v.blending===di&&v.alphaToCoverage===!1,alphaMap:J,alphaTest:ve,alphaHash:Ee,combine:v.combine,mapUv:Ye&&p(v.map.channel),aoMapUv:ae&&p(v.aoMap.channel),lightMapUv:le&&p(v.lightMap.channel),bumpMapUv:ce&&p(v.bumpMap.channel),normalMapUv:fe&&p(v.normalMap.channel),displacementMapUv:Ge&&p(v.displacementMap.channel),emissiveMapUv:ke&&p(v.emissiveMap.channel),metalnessMapUv:Ze&&p(v.metalnessMap.channel),roughnessMapUv:Ke&&p(v.roughnessMap.channel),anisotropyMapUv:q&&p(v.anisotropyMap.channel),clearcoatMapUv:he&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:de&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Y&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:Ne&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:xe&&p(v.sheenRoughnessMap.channel),specularMapUv:me&&p(v.specularMap.channel),specularColorMapUv:Fe&&p(v.specularColorMap.channel),specularIntensityMapUv:Ve&&p(v.specularIntensityMap.channel),transmissionMapUv:je&&p(v.transmissionMap.channel),thicknessMapUv:N&&p(v.thicknessMap.channel),alphaMapUv:J&&p(v.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(fe||L),vertexNormals:!!B.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!B.attributes.uv&&(Ye||J),fog:!!D,useFog:v.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||B.attributes.normal===void 0&&fe===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ye,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Ue,morphTextureStride:Ce,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Oe,decodeVideoTexture:Ye&&v.map.isVideoTexture===!0&&nt.getTransfer(v.map.colorSpace)===gt,decodeVideoTextureEmissive:ke&&v.emissiveMap.isVideoTexture===!0&&nt.getTransfer(v.emissiveMap.colorSpace)===gt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Mn,flipSided:v.side===Zt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:ne&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ne&&v.extensions.multiDraw===!0||Te)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Le.vertexUv1s=l.has(1),Le.vertexUv2s=l.has(2),Le.vertexUv3s=l.has(3),l.clear(),Le}function m(v){let E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(let C in v.defines)E.push(C),E.push(v.defines[C]);return v.isRawShaderMaterial===!1&&(g(E,v),b(E,v),E.push(i.outputColorSpace)),E.push(v.customProgramCacheKey),E.join()}function g(v,E){v.push(E.precision),v.push(E.outputColorSpace),v.push(E.envMapMode),v.push(E.envMapCubeUVHeight),v.push(E.mapUv),v.push(E.alphaMapUv),v.push(E.lightMapUv),v.push(E.aoMapUv),v.push(E.bumpMapUv),v.push(E.normalMapUv),v.push(E.displacementMapUv),v.push(E.emissiveMapUv),v.push(E.metalnessMapUv),v.push(E.roughnessMapUv),v.push(E.anisotropyMapUv),v.push(E.clearcoatMapUv),v.push(E.clearcoatNormalMapUv),v.push(E.clearcoatRoughnessMapUv),v.push(E.iridescenceMapUv),v.push(E.iridescenceThicknessMapUv),v.push(E.sheenColorMapUv),v.push(E.sheenRoughnessMapUv),v.push(E.specularMapUv),v.push(E.specularColorMapUv),v.push(E.specularIntensityMapUv),v.push(E.transmissionMapUv),v.push(E.thicknessMapUv),v.push(E.combine),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.morphAttributeCount),v.push(E.numSunLights),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numSunLightShadows),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.numLightProbes),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function b(v,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function T(v){let E=f[v.type],C;if(E){let I=pi[E];C=Pi.clone(I.uniforms)}else C=v.uniforms;return C}function _(v,E){let C=h.get(E);return C!==void 0?++C.usedTimes:(C=new Jy(i,E,v,s),c.push(C),h.set(E,C)),C}function S(v){if(--v.usedTimes===0){let E=c.indexOf(v);c[E]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function w(v){o.remove(v)}function R(){o.dispose()}return{getParameters:y,getProgramCacheKey:m,getUniforms:T,acquireProgram:_,releaseProgram:S,releaseShaderCache:w,programs:c,dispose:R}}function e1(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function t1(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function yp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Mp(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,p,y,m,g){let b=i[e];return b===void 0?(b={id:u.id,object:u,geometry:f,material:p,materialVariant:a(u),groupOrder:y,renderOrder:u.renderOrder,z:m,group:g},i[e]=b):(b.id=u.id,b.object=u,b.geometry=f,b.material=p,b.materialVariant=a(u),b.groupOrder=y,b.renderOrder=u.renderOrder,b.z=m,b.group=g),e++,b}function l(u,f,p,y,m,g,b){b.reversedDepth===!0&&(m=-m);let T=o(u,f,p,y,m,g);p.transmission>0?n.push(T):p.transparent===!0?s.push(T):t.push(T)}function c(u,f,p,y,m,g){let b=o(u,f,p,y,m,g);p.transmission>0?n.unshift(b):p.transparent===!0?s.unshift(b):t.unshift(b)}function h(u,f){t.length>1&&t.sort(u||t1),n.length>1&&n.sort(f||yp),s.length>1&&s.sort(f||yp)}function d(){for(let u=e,f=i.length;u<f;u++){let p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function n1(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new Mp,i.set(n,[a])):s>=r.length?(a=new Mp,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function i1(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new P,color:new Se};break;case"SpotLight":t={position:new P,direction:new P,color:new Se,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Se,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Se,groundColor:new Se};break;case"RectAreaLight":t={color:new Se,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function s1(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var r1=0;function a1(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function o1(i){let e=new i1,t=s1(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);let s=new P,r=new xt,a=new xt;function o(c){let h=0,d=0,u=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let f=0,p=0,y=0,m=0,g=0,b=0,T=0,_=0,S=0,w=0,R=0,v=0,E=0,C=0;c.sort(a1);for(let F=0,k=c.length;F<k;F++){let D=c[F],B=D.color,X=D.intensity,W=D.distance,se=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===ss?se=D.shadow.map.texture:se=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=B.r*X,d+=B.g*X,u+=B.b*X;else if(D.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(D.sh.coefficients[$],X);C++}else if(D.isSunLight){let $=e.get(D);if($.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let j=D.shadow,te=t.get(D);te.shadowIntensity=j.intensity,te.shadowBias=j.bias,te.shadowNormalBias=j.normalBias,te.shadowRadius=j.radius,te.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[p]=te,n.sunShadowMap[p]=se;let Ue=j.getViewportCount();for(let Ce=0;Ce<Ue;Ce++)n.sunShadowMatrix[y+Ce]=j.getMatrix(Ce),n.sunShadowCascade[y+Ce]=j._cascadeData[Ce];y+=Ue,p++}n.sun[f]=$,f++}else if(D.isDirectionalLight){let $=e.get(D);if($.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let j=D.shadow,te=t.get(D);te.shadowIntensity=j.intensity,te.shadowBias=j.bias,te.shadowNormalBias=j.normalBias,te.shadowRadius=j.radius,te.shadowMapSize=j.mapSize,n.directionalShadow[m]=te,n.directionalShadowMap[m]=se,n.directionalShadowMatrix[m]=D.shadow.matrix,S++}n.directional[m]=$,m++}else if(D.isSpotLight){let $=e.get(D);$.position.setFromMatrixPosition(D.matrixWorld),$.color.copy(B).multiplyScalar(X),$.distance=W,$.coneCos=Math.cos(D.angle),$.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),$.decay=D.decay,n.spot[b]=$;let j=D.shadow;if(D.map&&(n.spotLightMap[v]=D.map,v++,j.updateMatrices(D),D.castShadow&&E++),n.spotLightMatrix[b]=j.matrix,D.castShadow){let te=t.get(D);te.shadowIntensity=j.intensity,te.shadowBias=j.bias,te.shadowNormalBias=j.normalBias,te.shadowRadius=j.radius,te.shadowMapSize=j.mapSize,n.spotShadow[b]=te,n.spotShadowMap[b]=se,R++}b++}else if(D.isRectAreaLight){let $=e.get(D);$.color.copy(B).multiplyScalar(X),$.halfWidth.set(D.width*.5,0,0),$.halfHeight.set(0,D.height*.5,0),n.rectArea[T]=$,T++}else if(D.isPointLight){let $=e.get(D);if($.color.copy(D.color).multiplyScalar(D.intensity),$.distance=D.distance,$.decay=D.decay,D.castShadow){let j=D.shadow,te=t.get(D);te.shadowIntensity=j.intensity,te.shadowBias=j.bias,te.shadowNormalBias=j.normalBias,te.shadowRadius=j.radius,te.shadowMapSize=j.mapSize,te.shadowCameraNear=j.camera.near,te.shadowCameraFar=j.camera.far,n.pointShadow[g]=te,n.pointShadowMap[g]=se,n.pointShadowMatrix[g]=D.shadow.matrix,w++}n.point[g]=$,g++}else if(D.isHemisphereLight){let $=e.get(D);$.skyColor.copy(D.color).multiplyScalar(X),$.groundColor.copy(D.groundColor).multiplyScalar(X),n.hemi[_]=$,_++}}T>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_e.LTC_FLOAT_1,n.rectAreaLTC2=_e.LTC_FLOAT_2):(n.rectAreaLTC1=_e.LTC_HALF_1,n.rectAreaLTC2=_e.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let I=n.hash;(I.sunLength!==f||I.directionalLength!==m||I.pointLength!==g||I.spotLength!==b||I.rectAreaLength!==T||I.hemiLength!==_||I.numSunShadows!==p||I.numDirectionalShadows!==S||I.numPointShadows!==w||I.numSpotShadows!==R||I.numSpotMaps!==v||I.numLightProbes!==C)&&(n.sun.length=f,n.directional.length=m,n.spot.length=b,n.rectArea.length=T,n.point.length=g,n.hemi.length=_,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+v-E,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,I.sunLength=f,I.directionalLength=m,I.pointLength=g,I.spotLength=b,I.rectAreaLength=T,I.hemiLength=_,I.numSunShadows=p,I.numDirectionalShadows=S,I.numPointShadows=w,I.numSpotShadows=R,I.numSpotMaps=v,I.numLightProbes=C,n.version=r1++)}function l(c,h){let d=0,u=0,f=0,p=0,y=0,m=0,g=h.matrixWorldInverse;for(let b=0,T=c.length;b<T;b++){let _=c[b];if(_.isSunLight){let S=n.sun[d];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(g),d++}else if(_.isDirectionalLight){let S=n.directional[u];S.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),u++}else if(_.isSpotLight){let S=n.spot[p];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),p++}else if(_.isRectAreaLight){let S=n.rectArea[y];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(g),a.identity(),r.copy(_.matrixWorld),r.premultiply(g),a.extractRotation(r),S.halfWidth.set(_.width*.5,0,0),S.halfHeight.set(0,_.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),y++}else if(_.isPointLight){let S=n.point[f];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(g),f++}else if(_.isHemisphereLight){let S=n.hemi[m];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(g),m++}}}return{setup:o,setupView:l,state:n}}function bp(i){let e=new o1(i),t=[],n=[],s=[];function r(u){d.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function l1(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new bp(i),e.set(s,[o])):r>=a.length?(o=new bp(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var c1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,h1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,u1=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],d1=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],Sp=new xt,ja=new P,gu=new P;function f1(i,e,t){let n=new xr,s=new ie,r=new ie,a=new Dt,o=new rl,l=new al,c={},h=t.maxTextureSize,d={[On]:Zt,[Zt]:On,[Mn]:Mn},u=new Ct({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ie},radius:{value:4}},vertexShader:c1,fragmentShader:h1}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let p=new Ft;p.setAttribute("position",new Yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new ue(p,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cs;let g=this.type;this.render=function(w,R,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===pf&&(We("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Cs);let E=i.getRenderTarget(),C=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Bn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let k=g!==this.type;k&&R.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(B=>B.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,B=w.length;D<B;D++){let X=w[D],W=X.shadow;if(W===void 0){We("WebGLShadowMap:",X,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let se=W.getFrameExtents();s.multiply(se),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/se.x),s.x=r.x*se.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/se.y),s.y=r.y*se.y,W.mapSize.y=r.y));let $=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=$,W.map===null||k===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Er){if(X.isPointLight){We("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Xt(s.x,s.y,{format:ss,type:on,minFilter:rn,magFilter:rn,generateMipmaps:!1}),W.map.texture.name=X.name+".shadowMap",W.map.depthTexture=new qi(s.x,s.y,kn),W.map.depthTexture.name=X.name+".shadowMapDepth",W.map.depthTexture.format=ci,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Nt,W.map.depthTexture.magFilter=Nt}else X.isPointLight?(W.map=new uc(s.x),W.map.depthTexture=new jo(s.x,ti)):(W.map=new Xt(s.x,s.y),W.map.depthTexture=new qi(s.x,s.y,ti)),W.map.depthTexture.name=X.name+".shadowMap",W.map.depthTexture.format=ci,this.type===Cs?(W.map.depthTexture.compareFunction=$?oc:ac,W.map.depthTexture.minFilter=rn,W.map.depthTexture.magFilter=rn):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Nt,W.map.depthTexture.magFilter=Nt);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);let j=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();X.isPointLight!==!0&&W.updateMatrices(X,v);for(let te=0;te<j;te++){let Ue=W.getCamera(te);if(X.isPointLight){let Ce=W.camera,vt=W.matrix,rt=X.distance||Ce.far;rt!==Ce.far&&(Ce.far=rt,Ce.updateProjectionMatrix()),ja.setFromMatrixPosition(X.matrixWorld),Ce.position.copy(ja),gu.copy(Ce.position),gu.add(u1[te]),Ce.up.copy(d1[te]),Ce.lookAt(gu),Ce.updateMatrixWorld(),vt.makeTranslation(-ja.x,-ja.y,-ja.z),Sp.multiplyMatrices(Ce.projectionMatrix,Ce.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Sp,Ce.coordinateSystem,Ce.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,te),i.clear();else{te===0&&(i.setRenderTarget(W.map),i.clear());let Ce=W.getViewport(te);a.set(r.x*Ce.x,r.y*Ce.y,r.x*Ce.z,r.y*Ce.w),F.viewport(a)}n=W.getFrustum(te),_(R,v,Ue,X,this.type)}W.isPointLightShadow!==!0&&this.type===Er&&b(W,v),W.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(E,C,I)};function b(w,R){let v=e.update(y);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null?w.mapPass=new Xt(s.x,s.y,{format:ss,type:on}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(R,null,v,u,y,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(R,null,v,f,y,null)}function T(w,R,v,E){let C=null,I=v.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)C=I;else if(C=v.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let F=C.uuid,k=R.uuid,D=c[F];D===void 0&&(D={},c[F]=D);let B=D[k];B===void 0&&(B=C.clone(),D[k]=B,R.addEventListener("dispose",S)),C=B}if(C.visible=R.visible,C.wireframe=R.wireframe,E===Er?C.side=R.shadowSide!==null?R.shadowSide:R.side:C.side=R.shadowSide!==null?R.shadowSide:d[R.side],C.alphaMap=R.alphaMap,C.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,C.map=R.map,C.clipShadows=R.clipShadows,C.clippingPlanes=R.clippingPlanes,C.clipIntersection=R.clipIntersection,C.displacementMap=R.displacementMap,C.displacementScale=R.displacementScale,C.displacementBias=R.displacementBias,C.wireframeLinewidth=R.wireframeLinewidth,C.linewidth=R.linewidth,v.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let F=i.properties.get(C);F.light=v}return C}function _(w,R,v,E,C){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&C===Er)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,w.matrixWorld);let k=e.update(w),D=w.material;if(Array.isArray(D)){let B=k.groups;for(let X=0,W=B.length;X<W;X++){let se=B[X],$=D[se.materialIndex];if($&&$.visible){let j=T(w,$,E,C);w.onBeforeShadow(i,w,R,v,k,j,se),i.renderBufferDirect(v,null,k,j,w,se),w.onAfterShadow(i,w,R,v,k,j,se)}}}else if(D.visible){let B=T(w,D,E,C);w.onBeforeShadow(i,w,R,v,k,B,null),i.renderBufferDirect(v,null,k,B,w,null),w.onAfterShadow(i,w,R,v,k,B,null)}}let F=w.children;for(let k=0,D=F.length;k<D;k++)_(F[k],R,v,E,C)}function S(w){w.target.removeEventListener("dispose",S);for(let v in c){let E=c[v],C=w.target.uuid;C in E&&(E[C].dispose(),delete E[C])}}}function p1(i,e){function t(){let N=!1,ge=new Dt,J=null,ve=new Dt(0,0,0,0);return{setMask:function(Ee){J!==Ee&&!N&&(i.colorMask(Ee,Ee,Ee,Ee),J=Ee)},setLocked:function(Ee){N=Ee},setClear:function(Ee,ne,Oe,Le,At){At===!0&&(Ee*=Le,ne*=Le,Oe*=Le),ge.set(Ee,ne,Oe,Le),ve.equals(ge)===!1&&(i.clearColor(Ee,ne,Oe,Le),ve.copy(ge))},reset:function(){N=!1,J=null,ve.set(-1,0,0,0)}}}function n(){let N=!1,ge=!1,J=null,ve=null,Ee=null;return{setReversed:function(ne){if(ge!==ne){let Oe=e.get("EXT_clip_control");ne?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT),ge=ne;let Le=Ee;Ee=null,this.setClear(Le)}},getReversed:function(){return ge},setTest:function(ne){ne?Q(i.DEPTH_TEST):ye(i.DEPTH_TEST)},setMask:function(ne){J!==ne&&!N&&(i.depthMask(ne),J=ne)},setFunc:function(ne){if(ge&&(ne=Yf[ne]),ve!==ne){switch(ne){case Bo:i.depthFunc(i.NEVER);break;case ko:i.depthFunc(i.ALWAYS);break;case Ho:i.depthFunc(i.LESS);break;case ur:i.depthFunc(i.LEQUAL);break;case zo:i.depthFunc(i.EQUAL);break;case Go:i.depthFunc(i.GEQUAL);break;case Vo:i.depthFunc(i.GREATER);break;case Wo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ve=ne}},setLocked:function(ne){N=ne},setClear:function(ne){Ee!==ne&&(Ee=ne,ge&&(ne=1-ne),i.clearDepth(ne))},reset:function(){N=!1,J=null,ve=null,Ee=null,ge=!1}}}function s(){let N=!1,ge=null,J=null,ve=null,Ee=null,ne=null,Oe=null,Le=null,At=null;return{setTest:function(yt){N||(yt?Q(i.STENCIL_TEST):ye(i.STENCIL_TEST))},setMask:function(yt){ge!==yt&&!N&&(i.stencilMask(yt),ge=yt)},setFunc:function(yt,Vn,si){(J!==yt||ve!==Vn||Ee!==si)&&(i.stencilFunc(yt,Vn,si),J=yt,ve=Vn,Ee=si)},setOp:function(yt,Vn,si){(ne!==yt||Oe!==Vn||Le!==si)&&(i.stencilOp(yt,Vn,si),ne=yt,Oe=Vn,Le=si)},setLocked:function(yt){N=yt},setClear:function(yt){At!==yt&&(i.clearStencil(yt),At=yt)},reset:function(){N=!1,ge=null,J=null,ve=null,Ee=null,ne=null,Oe=null,Le=null,At=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,p=[],y=null,m=!1,g=null,b=null,T=null,_=null,S=null,w=null,R=null,v=new Se(0,0,0),E=0,C=!1,I=null,F=null,k=null,D=null,B=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,se=0,$=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec($)[1]),W=se>=1):$.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),W=se>=2);let j=null,te={},Ue=i.getParameter(i.SCISSOR_BOX),Ce=i.getParameter(i.VIEWPORT),vt=new Dt().fromArray(Ue),rt=new Dt().fromArray(Ce);function dt(N,ge,J,ve){let Ee=new Uint8Array(4),ne=i.createTexture();i.bindTexture(N,ne),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Oe=0;Oe<J;Oe++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(ge,0,i.RGBA,1,1,ve,0,i.RGBA,i.UNSIGNED_BYTE,Ee):i.texImage2D(ge+Oe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ee);return ne}let Z={};Z[i.TEXTURE_2D]=dt(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=dt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=dt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=dt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(i.DEPTH_TEST),a.setFunc(ur),ce(!1),fe(kh),Q(i.CULL_FACE),ae(Bn);function Q(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function ye(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function $e(N,ge){return u[N]!==ge?(i.bindFramebuffer(N,ge),u[N]=ge,N===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ge),N===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ge),!0):!1}function Te(N,ge){let J=p,ve=!1;if(N){J=f.get(ge),J===void 0&&(J=[],f.set(ge,J));let Ee=N.textures;if(J.length!==Ee.length||J[0]!==i.COLOR_ATTACHMENT0){for(let ne=0,Oe=Ee.length;ne<Oe;ne++)J[ne]=i.COLOR_ATTACHMENT0+ne;J.length=Ee.length,ve=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,ve=!0);ve&&i.drawBuffers(J)}function Ye(N){return y!==N?(i.useProgram(N),y=N,!0):!1}let bt={[Ps]:i.FUNC_ADD,[gf]:i.FUNC_SUBTRACT,[vf]:i.FUNC_REVERSE_SUBTRACT};bt[xf]=i.MIN,bt[_f]=i.MAX;let ee={[yf]:i.ZERO,[Mf]:i.ONE,[bf]:i.SRC_COLOR,[Gh]:i.SRC_ALPHA,[Rf]:i.SRC_ALPHA_SATURATE,[Tf]:i.DST_COLOR,[Ef]:i.DST_ALPHA,[Sf]:i.ONE_MINUS_SRC_COLOR,[Vh]:i.ONE_MINUS_SRC_ALPHA,[Af]:i.ONE_MINUS_DST_COLOR,[wf]:i.ONE_MINUS_DST_ALPHA,[Cf]:i.CONSTANT_COLOR,[Pf]:i.ONE_MINUS_CONSTANT_COLOR,[If]:i.CONSTANT_ALPHA,[Lf]:i.ONE_MINUS_CONSTANT_ALPHA};function ae(N,ge,J,ve,Ee,ne,Oe,Le,At,yt){if(N===Bn){m===!0&&(ye(i.BLEND),m=!1);return}if(m===!1&&(Q(i.BLEND),m=!0),N!==mf){if(N!==g||yt!==C){if((b!==Ps||S!==Ps)&&(i.blendEquation(i.FUNC_ADD),b=Ps,S=Ps),yt)switch(N){case di:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case dn:i.blendFunc(i.ONE,i.ONE);break;case Hh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Xe("WebGLState: Invalid blending: ",N);break}else switch(N){case di:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case dn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Hh:Xe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zh:Xe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xe("WebGLState: Invalid blending: ",N);break}T=null,_=null,w=null,R=null,v.set(0,0,0),E=0,g=N,C=yt}return}Ee=Ee||ge,ne=ne||J,Oe=Oe||ve,(ge!==b||Ee!==S)&&(i.blendEquationSeparate(bt[ge],bt[Ee]),b=ge,S=Ee),(J!==T||ve!==_||ne!==w||Oe!==R)&&(i.blendFuncSeparate(ee[J],ee[ve],ee[ne],ee[Oe]),T=J,_=ve,w=ne,R=Oe),(Le.equals(v)===!1||At!==E)&&(i.blendColor(Le.r,Le.g,Le.b,At),v.copy(Le),E=At),g=N,C=!1}function le(N,ge){N.side===Mn?ye(i.CULL_FACE):Q(i.CULL_FACE);let J=N.side===Zt;ge&&(J=!J),ce(J),N.blending===di&&N.transparent===!1?ae(Bn):ae(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);let ve=N.stencilWrite;o.setTest(ve),ve&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ke(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):ye(i.SAMPLE_ALPHA_TO_COVERAGE)}function ce(N){I!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),I=N)}function fe(N){N!==df?(Q(i.CULL_FACE),N!==F&&(N===kh?i.cullFace(i.BACK):N===ff?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ye(i.CULL_FACE),F=N}function Ge(N){N!==k&&(W&&i.lineWidth(N),k=N)}function ke(N,ge,J){N?(Q(i.POLYGON_OFFSET_FILL),(D!==ge||B!==J)&&(D=ge,B=J,a.getReversed()&&(ge=-ge),i.polygonOffset(ge,J))):ye(i.POLYGON_OFFSET_FILL)}function Ze(N){N?Q(i.SCISSOR_TEST):ye(i.SCISSOR_TEST)}function Ke(N){N===void 0&&(N=i.TEXTURE0+X-1),j!==N&&(i.activeTexture(N),j=N)}function L(N,ge,J){J===void 0&&(j===null?J=i.TEXTURE0+X-1:J=j);let ve=te[J];ve===void 0&&(ve={type:void 0,texture:void 0},te[J]=ve),(ve.type!==N||ve.texture!==ge)&&(j!==J&&(i.activeTexture(J),j=J),i.bindTexture(N,ge||Z[N]),ve.type=N,ve.texture=ge)}function _t(){let N=te[j];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function at(){try{i.compressedTexImage2D(...arguments)}catch(N){Xe("WebGLState:",N)}}function A(){try{i.compressedTexImage3D(...arguments)}catch(N){Xe("WebGLState:",N)}}function x(){try{i.texSubImage2D(...arguments)}catch(N){Xe("WebGLState:",N)}}function O(){try{i.texSubImage3D(...arguments)}catch(N){Xe("WebGLState:",N)}}function G(){try{i.compressedTexSubImage2D(...arguments)}catch(N){Xe("WebGLState:",N)}}function q(){try{i.compressedTexSubImage3D(...arguments)}catch(N){Xe("WebGLState:",N)}}function he(){try{i.texStorage2D(...arguments)}catch(N){Xe("WebGLState:",N)}}function de(){try{i.texStorage3D(...arguments)}catch(N){Xe("WebGLState:",N)}}function Y(){try{i.texImage2D(...arguments)}catch(N){Xe("WebGLState:",N)}}function K(){try{i.texImage3D(...arguments)}catch(N){Xe("WebGLState:",N)}}function pe(N){return d[N]!==void 0?d[N]:i.getParameter(N)}function Ne(N,ge){d[N]!==ge&&(i.pixelStorei(N,ge),d[N]=ge)}function xe(N){vt.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),vt.copy(N))}function me(N){rt.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),rt.copy(N))}function Fe(N,ge){let J=c.get(ge);J===void 0&&(J=new WeakMap,c.set(ge,J));let ve=J.get(N);ve===void 0&&(ve=i.getUniformBlockIndex(ge,N.name),J.set(N,ve))}function Ve(N,ge){let ve=c.get(ge).get(N);l.get(ge)!==ve&&(i.uniformBlockBinding(ge,ve,N.__bindingPointIndex),l.set(ge,ve))}function je(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},j=null,te={},u={},f=new WeakMap,p=[],y=null,m=!1,g=null,b=null,T=null,_=null,S=null,w=null,R=null,v=new Se(0,0,0),E=0,C=!1,I=null,F=null,k=null,D=null,B=null,vt.set(0,0,i.canvas.width,i.canvas.height),rt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Q,disable:ye,bindFramebuffer:$e,drawBuffers:Te,useProgram:Ye,setBlending:ae,setMaterial:le,setFlipSided:ce,setCullFace:fe,setLineWidth:Ge,setPolygonOffset:ke,setScissorTest:Ze,activeTexture:Ke,bindTexture:L,unbindTexture:_t,compressedTexImage2D:at,compressedTexImage3D:A,texImage2D:Y,texImage3D:K,pixelStorei:Ne,getParameter:pe,updateUBOMapping:Fe,uniformBlockBinding:Ve,texStorage2D:he,texStorage3D:de,texSubImage2D:x,texSubImage3D:O,compressedTexSubImage2D:G,compressedTexSubImage3D:q,scissor:xe,viewport:me,reset:je}}function m1(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ie,h=new WeakMap,d=new Set,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(A,x){return p?new OffscreenCanvas(A,x):la("canvas")}function m(A,x,O){let G=1,q=at(A);if((q.width>O||q.height>O)&&(G=O/Math.max(q.width,q.height)),G<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let he=Math.floor(G*q.width),de=Math.floor(G*q.height);u===void 0&&(u=y(he,de));let Y=x?y(he,de):u;return Y.width=he,Y.height=de,Y.getContext("2d").drawImage(A,0,0,he,de),We("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+he+"x"+de+")."),Y}else return"data"in A&&We("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),A;return A}function g(A){return A.generateMipmaps}function b(A){i.generateMipmap(A)}function T(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(A,x,O,G,q,he=!1){if(A!==null){if(i[A]!==void 0)return i[A];We("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let de;G&&(de=e.get("EXT_texture_norm16"),de||We("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=x;if(x===i.RED&&(O===i.FLOAT&&(Y=i.R32F),O===i.HALF_FLOAT&&(Y=i.R16F),O===i.UNSIGNED_BYTE&&(Y=i.R8),O===i.UNSIGNED_SHORT&&de&&(Y=de.R16_EXT),O===i.SHORT&&de&&(Y=de.R16_SNORM_EXT)),x===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.R8UI),O===i.UNSIGNED_SHORT&&(Y=i.R16UI),O===i.UNSIGNED_INT&&(Y=i.R32UI),O===i.BYTE&&(Y=i.R8I),O===i.SHORT&&(Y=i.R16I),O===i.INT&&(Y=i.R32I)),x===i.RG&&(O===i.FLOAT&&(Y=i.RG32F),O===i.HALF_FLOAT&&(Y=i.RG16F),O===i.UNSIGNED_BYTE&&(Y=i.RG8),O===i.UNSIGNED_SHORT&&de&&(Y=de.RG16_EXT),O===i.SHORT&&de&&(Y=de.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RG8UI),O===i.UNSIGNED_SHORT&&(Y=i.RG16UI),O===i.UNSIGNED_INT&&(Y=i.RG32UI),O===i.BYTE&&(Y=i.RG8I),O===i.SHORT&&(Y=i.RG16I),O===i.INT&&(Y=i.RG32I)),x===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),O===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),O===i.UNSIGNED_INT&&(Y=i.RGB32UI),O===i.BYTE&&(Y=i.RGB8I),O===i.SHORT&&(Y=i.RGB16I),O===i.INT&&(Y=i.RGB32I)),x===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),O===i.UNSIGNED_INT&&(Y=i.RGBA32UI),O===i.BYTE&&(Y=i.RGBA8I),O===i.SHORT&&(Y=i.RGBA16I),O===i.INT&&(Y=i.RGBA32I)),x===i.RGB&&(O===i.UNSIGNED_SHORT&&de&&(Y=de.RGB16_EXT),O===i.SHORT&&de&&(Y=de.RGB16_SNORM_EXT),O===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),x===i.RGBA){let K=he?oa:nt.getTransfer(q);O===i.FLOAT&&(Y=i.RGBA32F),O===i.HALF_FLOAT&&(Y=i.RGBA16F),O===i.UNSIGNED_BYTE&&(Y=K===gt?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT&&de&&(Y=de.RGBA16_EXT),O===i.SHORT&&de&&(Y=de.RGBA16_SNORM_EXT),O===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function S(A,x){let O;return A?x===null||x===ti||x===Tr?O=i.DEPTH24_STENCIL8:x===kn?O=i.DEPTH32F_STENCIL8:x===wr&&(O=i.DEPTH24_STENCIL8,We("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ti||x===Tr?O=i.DEPTH_COMPONENT24:x===kn?O=i.DEPTH_COMPONENT32F:x===wr&&(O=i.DEPTH_COMPONENT16),O}function w(A,x){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==Nt&&A.minFilter!==rn?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function R(A){let x=A.target;x.removeEventListener("dispose",R),E(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&d.delete(x)}function v(A){let x=A.target;x.removeEventListener("dispose",v),I(x)}function E(A){let x=n.get(A);if(x.__webglInit===void 0)return;let O=A.source,G=f.get(O);if(G){let q=G[x.__cacheKey];q.usedTimes--,q.usedTimes===0&&C(A),Object.keys(G).length===0&&f.delete(O)}n.remove(A)}function C(A){let x=n.get(A);i.deleteTexture(x.__webglTexture);let O=A.source,G=f.get(O);delete G[x.__cacheKey],a.memory.textures--}function I(A){let x=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(x.__webglFramebuffer[G]))for(let q=0;q<x.__webglFramebuffer[G].length;q++)i.deleteFramebuffer(x.__webglFramebuffer[G][q]);else i.deleteFramebuffer(x.__webglFramebuffer[G]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[G])}else{if(Array.isArray(x.__webglFramebuffer))for(let G=0;G<x.__webglFramebuffer.length;G++)i.deleteFramebuffer(x.__webglFramebuffer[G]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let G=0;G<x.__webglColorRenderbuffer.length;G++)x.__webglColorRenderbuffer[G]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[G]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let O=A.textures;for(let G=0,q=O.length;G<q;G++){let he=n.get(O[G]);he.__webglTexture&&(i.deleteTexture(he.__webglTexture),a.memory.textures--),n.remove(O[G])}n.remove(A)}let F=0;function k(){F=0}function D(){return F}function B(A){F=A}function X(){let A=F;return A>=s.maxTextures&&We("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+s.maxTextures),F+=1,A}function W(A){let x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function se(A,x){let O=n.get(A);if(A.isVideoTexture&&L(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&O.__version!==A.version){let G=A.image;if(G===null)We("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)We("WebGLRenderer: Texture marked for update but image is incomplete");else{ye(O,A,x);return}}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+x)}function $(A,x){let O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){ye(O,A,x);return}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+x)}function j(A,x){let O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){ye(O,A,x);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+x)}function te(A,x){let O=n.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&O.__version!==A.version){$e(O,A,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+x)}let Ue={[dr]:i.REPEAT,[oi]:i.CLAMP_TO_EDGE,[Xo]:i.MIRRORED_REPEAT},Ce={[Nt]:i.NEAREST,[Nf]:i.NEAREST_MIPMAP_NEAREST,[Ds]:i.NEAREST_MIPMAP_LINEAR,[rn]:i.LINEAR,[bl]:i.LINEAR_MIPMAP_NEAREST,[ns]:i.LINEAR_MIPMAP_LINEAR},vt={[kf]:i.NEVER,[Wf]:i.ALWAYS,[Hf]:i.LESS,[ac]:i.LEQUAL,[zf]:i.EQUAL,[oc]:i.GEQUAL,[Gf]:i.GREATER,[Vf]:i.NOTEQUAL};function rt(A,x){if(x.type===kn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===rn||x.magFilter===bl||x.magFilter===Ds||x.magFilter===ns||x.minFilter===rn||x.minFilter===bl||x.minFilter===Ds||x.minFilter===ns)&&We("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,Ue[x.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,Ue[x.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,Ue[x.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,Ce[x.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,Ce[x.minFilter]),x.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,vt[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Nt||x.minFilter!==Ds&&x.minFilter!==ns||x.type===kn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function dt(A,x){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",R));let G=x.source,q=f.get(G);q===void 0&&(q={},f.set(G,q));let he=W(x);if(he!==A.__cacheKey){q[he]===void 0&&(q[he]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),q[he].usedTimes++;let de=q[A.__cacheKey];de!==void 0&&(q[A.__cacheKey].usedTimes--,de.usedTimes===0&&C(x)),A.__cacheKey=he,A.__webglTexture=q[he].texture}return O}function Z(A,x,O){return Math.floor(Math.floor(A/O)/x)}function Q(A,x,O,G){let he=A.updateRanges;if(he.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,O,G,x.data);else{he.sort((Ne,xe)=>Ne.start-xe.start);let de=0;for(let Ne=1;Ne<he.length;Ne++){let xe=he[de],me=he[Ne],Fe=xe.start+xe.count,Ve=Z(me.start,x.width,4),je=Z(xe.start,x.width,4);me.start<=Fe+1&&Ve===je&&Z(me.start+me.count-1,x.width,4)===Ve?xe.count=Math.max(xe.count,me.start+me.count-xe.start):(++de,he[de]=me)}he.length=de+1;let Y=t.getParameter(i.UNPACK_ROW_LENGTH),K=t.getParameter(i.UNPACK_SKIP_PIXELS),pe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let Ne=0,xe=he.length;Ne<xe;Ne++){let me=he[Ne],Fe=Math.floor(me.start/4),Ve=Math.ceil(me.count/4),je=Fe%x.width,N=Math.floor(Fe/x.width),ge=Ve,J=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,je),t.pixelStorei(i.UNPACK_SKIP_ROWS,N),t.texSubImage2D(i.TEXTURE_2D,0,je,N,ge,J,O,G,x.data)}A.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Y),t.pixelStorei(i.UNPACK_SKIP_PIXELS,K),t.pixelStorei(i.UNPACK_SKIP_ROWS,pe)}}function ye(A,x,O){let G=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(G=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(G=i.TEXTURE_3D);let q=dt(A,x),he=x.source;t.bindTexture(G,A.__webglTexture,i.TEXTURE0+O);let de=n.get(he);if(he.version!==de.__version||q===!0){if(t.activeTexture(i.TEXTURE0+O),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let J=nt.getPrimaries(nt.workingColorSpace),ve=x.colorSpace===ni?null:nt.getPrimaries(x.colorSpace),Ee=x.colorSpace===ni||J===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let K=m(x.image,!1,s.maxTextureSize);K=_t(x,K);let pe=r.convert(x.format,x.colorSpace),Ne=r.convert(x.type),xe=_(x.internalFormat,pe,Ne,x.normalized,x.colorSpace,x.isVideoTexture);rt(G,x);let me,Fe=x.mipmaps,Ve=x.isVideoTexture!==!0,je=de.__version===void 0||q===!0,N=he.dataReady,ge=w(x,K);if(x.isDepthTexture)xe=S(x.format===is,x.type),je&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,xe,K.width,K.height):t.texImage2D(i.TEXTURE_2D,0,xe,K.width,K.height,0,pe,Ne,null));else if(x.isDataTexture)if(Fe.length>0){Ve&&je&&t.texStorage2D(i.TEXTURE_2D,ge,xe,Fe[0].width,Fe[0].height);for(let J=0,ve=Fe.length;J<ve;J++)me=Fe[J],Ve?N&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,me.width,me.height,pe,Ne,me.data):t.texImage2D(i.TEXTURE_2D,J,xe,me.width,me.height,0,pe,Ne,me.data);x.generateMipmaps=!1}else Ve?(je&&t.texStorage2D(i.TEXTURE_2D,ge,xe,K.width,K.height),N&&Q(x,K,pe,Ne)):t.texImage2D(i.TEXTURE_2D,0,xe,K.width,K.height,0,pe,Ne,K.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ve&&je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,xe,Fe[0].width,Fe[0].height,K.depth);for(let J=0,ve=Fe.length;J<ve;J++)if(me=Fe[J],x.format!==Sn)if(pe!==null)if(Ve){if(N)if(x.layerUpdates.size>0){let Ee=ru(me.width,me.height,x.format,x.type);for(let ne of x.layerUpdates){let Oe=me.data.subarray(ne*Ee/me.data.BYTES_PER_ELEMENT,(ne+1)*Ee/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,ne,me.width,me.height,1,pe,Oe)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,me.width,me.height,K.depth,pe,me.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,xe,me.width,me.height,K.depth,0,me.data,0,0);else We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?N&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,me.width,me.height,K.depth,pe,Ne,me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,xe,me.width,me.height,K.depth,0,pe,Ne,me.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{Ve&&je&&t.texStorage2D(i.TEXTURE_2D,ge,xe,Fe[0].width,Fe[0].height);for(let J=0,ve=Fe.length;J<ve;J++)me=Fe[J],x.format!==Sn?pe!==null?Ve?N&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,me.width,me.height,pe,me.data):t.compressedTexImage2D(i.TEXTURE_2D,J,xe,me.width,me.height,0,me.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?N&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,me.width,me.height,pe,Ne,me.data):t.texImage2D(i.TEXTURE_2D,J,xe,me.width,me.height,0,pe,Ne,me.data)}else if(x.isDataArrayTexture)if(Ve){if(je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,xe,K.width,K.height,K.depth),N)if(x.layerUpdates.size>0){let J=ru(K.width,K.height,x.format,x.type);for(let ve of x.layerUpdates){let Ee=K.data.subarray(ve*J/K.data.BYTES_PER_ELEMENT,(ve+1)*J/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ve,K.width,K.height,1,pe,Ne,Ee)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,pe,Ne,K.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,xe,K.width,K.height,K.depth,0,pe,Ne,K.data);else if(x.isData3DTexture)Ve?(je&&t.texStorage3D(i.TEXTURE_3D,ge,xe,K.width,K.height,K.depth),N&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,pe,Ne,K.data)):t.texImage3D(i.TEXTURE_3D,0,xe,K.width,K.height,K.depth,0,pe,Ne,K.data);else if(x.isFramebufferTexture){if(je)if(Ve)t.texStorage2D(i.TEXTURE_2D,ge,xe,K.width,K.height);else{let J=K.width,ve=K.height;for(let Ee=0;Ee<ge;Ee++)t.texImage2D(i.TEXTURE_2D,Ee,xe,J,ve,0,pe,Ne,null),J>>=1,ve>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){let J=i.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),K.parentNode!==J){J.appendChild(K),d.add(x),J.onpaint=ve=>{let Ee=ve.changedElements;for(let ne of d)Ee.includes(ne.image)&&(ne.needsUpdate=!0)},J.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,K);else{let Ee=i.RGBA,ne=i.RGBA,Oe=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ee,ne,Oe,K)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Fe.length>0){if(Ve&&je){let J=at(Fe[0]);t.texStorage2D(i.TEXTURE_2D,ge,xe,J.width,J.height)}for(let J=0,ve=Fe.length;J<ve;J++)me=Fe[J],Ve?N&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,pe,Ne,me):t.texImage2D(i.TEXTURE_2D,J,xe,pe,Ne,me);x.generateMipmaps=!1}else if(Ve){if(je){let J=at(K);t.texStorage2D(i.TEXTURE_2D,ge,xe,J.width,J.height)}N&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,pe,Ne,K)}else t.texImage2D(i.TEXTURE_2D,0,xe,pe,Ne,K);g(x)&&b(G),de.__version=he.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function $e(A,x,O){if(x.image.length!==6)return;let G=dt(A,x),q=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+O);let he=n.get(q);if(q.version!==he.__version||G===!0){t.activeTexture(i.TEXTURE0+O);let de=nt.getPrimaries(nt.workingColorSpace),Y=x.colorSpace===ni?null:nt.getPrimaries(x.colorSpace),K=x.colorSpace===ni||de===Y?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);let pe=x.isCompressedTexture||x.image[0].isCompressedTexture,Ne=x.image[0]&&x.image[0].isDataTexture,xe=[];for(let ne=0;ne<6;ne++)!pe&&!Ne?xe[ne]=m(x.image[ne],!0,s.maxCubemapSize):xe[ne]=Ne?x.image[ne].image:x.image[ne],xe[ne]=_t(x,xe[ne]);let me=xe[0],Fe=r.convert(x.format,x.colorSpace),Ve=r.convert(x.type),je=_(x.internalFormat,Fe,Ve,x.normalized,x.colorSpace),N=x.isVideoTexture!==!0,ge=he.__version===void 0||G===!0,J=q.dataReady,ve=w(x,me);rt(i.TEXTURE_CUBE_MAP,x);let Ee;if(pe){N&&ge&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,je,me.width,me.height);for(let ne=0;ne<6;ne++){Ee=xe[ne].mipmaps;for(let Oe=0;Oe<Ee.length;Oe++){let Le=Ee[Oe];x.format!==Sn?Fe!==null?N?J&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Oe,0,0,Le.width,Le.height,Fe,Le.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Oe,je,Le.width,Le.height,0,Le.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Oe,0,0,Le.width,Le.height,Fe,Ve,Le.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Oe,je,Le.width,Le.height,0,Fe,Ve,Le.data)}}}else{if(Ee=x.mipmaps,N&&ge){Ee.length>0&&ve++;let ne=at(xe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,je,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(Ne){N?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,xe[ne].width,xe[ne].height,Fe,Ve,xe[ne].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,je,xe[ne].width,xe[ne].height,0,Fe,Ve,xe[ne].data);for(let Oe=0;Oe<Ee.length;Oe++){let At=Ee[Oe].image[ne].image;N?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Oe+1,0,0,At.width,At.height,Fe,Ve,At.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Oe+1,je,At.width,At.height,0,Fe,Ve,At.data)}}else{N?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Fe,Ve,xe[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,je,Fe,Ve,xe[ne]);for(let Oe=0;Oe<Ee.length;Oe++){let Le=Ee[Oe];N?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Oe+1,0,0,Fe,Ve,Le.image[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Oe+1,je,Fe,Ve,Le.image[ne])}}}g(x)&&b(i.TEXTURE_CUBE_MAP),he.__version=q.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Te(A,x,O,G,q,he){let de=r.convert(O.format,O.colorSpace),Y=r.convert(O.type),K=_(O.internalFormat,de,Y,O.normalized,O.colorSpace),pe=n.get(x),Ne=n.get(O);if(Ne.__renderTarget=x,!pe.__hasExternalTextures){let xe=Math.max(1,x.width>>he),me=Math.max(1,x.height>>he);q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?t.texImage3D(q,he,K,xe,me,x.depth,0,de,Y,null):t.texImage2D(q,he,K,xe,me,0,de,Y,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),Ke(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,G,q,Ne.__webglTexture,0,Ze(x)):(q===i.TEXTURE_2D||q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,G,q,Ne.__webglTexture,he),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ye(A,x,O){if(i.bindRenderbuffer(i.RENDERBUFFER,A),x.depthBuffer){let G=x.depthTexture,q=G&&G.isDepthTexture?G.type:null,he=S(x.stencilBuffer,q),de=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ke(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ze(x),he,x.width,x.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ze(x),he,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,he,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,de,i.RENDERBUFFER,A)}else{let G=x.textures;for(let q=0;q<G.length;q++){let he=G[q],de=r.convert(he.format,he.colorSpace),Y=r.convert(he.type),K=_(he.internalFormat,de,Y,he.normalized,he.colorSpace);Ke(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ze(x),K,x.width,x.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ze(x),K,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,K,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function bt(A,x,O){let G=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let q=n.get(x.depthTexture);if(q.__renderTarget=x,(!q.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),G){if(q.__webglInit===void 0&&(q.__webglInit=!0,x.depthTexture.addEventListener("dispose",R)),q.__webglTexture===void 0){q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),rt(i.TEXTURE_CUBE_MAP,x.depthTexture);let pe=r.convert(x.depthTexture.format),Ne=r.convert(x.depthTexture.type),xe;x.depthTexture.format===ci?xe=i.DEPTH_COMPONENT24:x.depthTexture.format===is&&(xe=i.DEPTH24_STENCIL8);for(let me=0;me<6;me++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,xe,x.width,x.height,0,pe,Ne,null)}}else se(x.depthTexture,0);let he=q.__webglTexture,de=Ze(x),Y=G?i.TEXTURE_CUBE_MAP_POSITIVE_X+O:i.TEXTURE_2D,K=x.depthTexture.format===is?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===ci)Ke(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Y,he,0,de):i.framebufferTexture2D(i.FRAMEBUFFER,K,Y,he,0);else if(x.depthTexture.format===is)Ke(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Y,he,0,de):i.framebufferTexture2D(i.FRAMEBUFFER,K,Y,he,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ee(A){let x=n.get(A),O=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){let G=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),G){let q=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,G.removeEventListener("dispose",q)};G.addEventListener("dispose",q),x.__depthDisposeCallback=q}x.__boundDepthTexture=G}if(A.depthTexture&&!x.__autoAllocateDepthBuffer)if(O)for(let G=0;G<6;G++)bt(x.__webglFramebuffer[G],A,G);else{let G=A.texture.mipmaps;G&&G.length>0?bt(x.__webglFramebuffer[0],A,0):bt(x.__webglFramebuffer,A,0)}else if(O){x.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[G]),x.__webglDepthbuffer[G]===void 0)x.__webglDepthbuffer[G]=i.createRenderbuffer(),Ye(x.__webglDepthbuffer[G],A,!1);else{let q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=x.__webglDepthbuffer[G];i.bindRenderbuffer(i.RENDERBUFFER,he),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,he)}}else{let G=A.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Ye(x.__webglDepthbuffer,A,!1);else{let q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,he),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,he)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(A,x,O){let G=n.get(A);x!==void 0&&Te(G.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&ee(A)}function le(A){let x=A.texture,O=n.get(A),G=n.get(x);A.addEventListener("dispose",v);let q=A.textures,he=A.isWebGLCubeRenderTarget===!0,de=q.length>1;if(de||(G.__webglTexture===void 0&&(G.__webglTexture=i.createTexture()),G.__version=x.version,a.memory.textures++),he){O.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[Y]=[];for(let K=0;K<x.mipmaps.length;K++)O.__webglFramebuffer[Y][K]=i.createFramebuffer()}else O.__webglFramebuffer[Y]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let Y=0;Y<x.mipmaps.length;Y++)O.__webglFramebuffer[Y]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(de)for(let Y=0,K=q.length;Y<K;Y++){let pe=n.get(q[Y]);pe.__webglTexture===void 0&&(pe.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&Ke(A)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let Y=0;Y<q.length;Y++){let K=q[Y];O.__webglColorRenderbuffer[Y]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[Y]);let pe=r.convert(K.format,K.colorSpace),Ne=r.convert(K.type),xe=_(K.internalFormat,pe,Ne,K.normalized,K.colorSpace,A.isXRRenderTarget===!0),me=Ze(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,me,xe,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,O.__webglColorRenderbuffer[Y])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Ye(O.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(he){t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture),rt(i.TEXTURE_CUBE_MAP,x);for(let Y=0;Y<6;Y++)if(x.mipmaps&&x.mipmaps.length>0)for(let K=0;K<x.mipmaps.length;K++)Te(O.__webglFramebuffer[Y][K],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,K);else Te(O.__webglFramebuffer[Y],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);g(x)&&b(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){for(let Y=0,K=q.length;Y<K;Y++){let pe=q[Y],Ne=n.get(pe),xe=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(xe=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(xe,Ne.__webglTexture),rt(xe,pe),Te(O.__webglFramebuffer,A,pe,i.COLOR_ATTACHMENT0+Y,xe,0),g(pe)&&b(xe)}t.unbindTexture()}else{let Y=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Y=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Y,G.__webglTexture),rt(Y,x),x.mipmaps&&x.mipmaps.length>0)for(let K=0;K<x.mipmaps.length;K++)Te(O.__webglFramebuffer[K],A,x,i.COLOR_ATTACHMENT0,Y,K);else Te(O.__webglFramebuffer,A,x,i.COLOR_ATTACHMENT0,Y,0);g(x)&&b(Y),t.unbindTexture()}A.depthBuffer&&ee(A)}function ce(A){let x=A.textures;for(let O=0,G=x.length;O<G;O++){let q=x[O];if(g(q)){let he=T(A),de=n.get(q).__webglTexture;t.bindTexture(he,de),b(he),t.unbindTexture()}}}let fe=[],Ge=[];function ke(A){if(A.samples>0){if(Ke(A)===!1){let x=A.textures,O=A.width,G=A.height,q=i.COLOR_BUFFER_BIT,he=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=n.get(A),Y=x.length>1;if(Y)for(let pe=0;pe<x.length;pe++)t.bindFramebuffer(i.FRAMEBUFFER,de.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,de.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer);let K=A.texture.mipmaps;K&&K.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,de.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let pe=0;pe<x.length;pe++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(q|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(q|=i.STENCIL_BUFFER_BIT)),Y){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,de.__webglColorRenderbuffer[pe]);let Ne=n.get(x[pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ne,0)}i.blitFramebuffer(0,0,O,G,0,0,O,G,q,i.NEAREST),l===!0&&(fe.length=0,Ge.length=0,fe.push(i.COLOR_ATTACHMENT0+pe),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(fe.push(he),Ge.push(he),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ge)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,fe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Y)for(let pe=0;pe<x.length;pe++){t.bindFramebuffer(i.FRAMEBUFFER,de.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,de.__webglColorRenderbuffer[pe]);let Ne=n.get(x[pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,de.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,Ne,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){let x=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Ze(A){return Math.min(s.maxSamples,A.samples)}function Ke(A){let x=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function L(A){let x=a.render.frame;h.get(A)!==x&&(h.set(A,x),A.update())}function _t(A,x){let O=A.colorSpace,G=A.format,q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==aa&&O!==ni&&(nt.getTransfer(O)===gt?(G!==Sn||q!==bn)&&We("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xe("WebGLTextures: Unsupported texture color space:",O)),x}function at(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=k,this.getTextureUnits=D,this.setTextureUnits=B,this.setTexture2D=se,this.setTexture2DArray=$,this.setTexture3D=j,this.setTextureCube=te,this.rebindTextures=ae,this.setupRenderTarget=le,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=ee,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=Ke,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function g1(i,e){function t(n,s=ni){let r,a=nt.getTransfer(s);if(n===bn)return i.UNSIGNED_BYTE;if(n===El)return i.UNSIGNED_SHORT_4_4_4_4;if(n===wl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Yh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Zh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===$h)return i.BYTE;if(n===qh)return i.SHORT;if(n===wr)return i.UNSIGNED_SHORT;if(n===Sl)return i.INT;if(n===ti)return i.UNSIGNED_INT;if(n===kn)return i.FLOAT;if(n===on)return i.HALF_FLOAT;if(n===Jh)return i.ALPHA;if(n===Kh)return i.RGB;if(n===Sn)return i.RGBA;if(n===ci)return i.DEPTH_COMPONENT;if(n===is)return i.DEPTH_STENCIL;if(n===Tl)return i.RED;if(n===Al)return i.RED_INTEGER;if(n===ss)return i.RG;if(n===Rl)return i.RG_INTEGER;if(n===Cl)return i.RGBA_INTEGER;if(n===Wa||n===Xa||n===$a||n===qa)if(a===gt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Wa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===$a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===qa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Wa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===$a)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===qa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Pl||n===Il||n===Ll||n===Dl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Pl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Il)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ll)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Dl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ul||n===Nl||n===Fl||n===Ol||n===Bl||n===Ya||n===kl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ul||n===Nl)return a===gt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Fl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ol)return r.COMPRESSED_R11_EAC;if(n===Bl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ya)return r.COMPRESSED_RG11_EAC;if(n===kl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Hl||n===zl||n===Gl||n===Vl||n===Wl||n===Xl||n===$l||n===ql||n===Yl||n===Zl||n===Jl||n===Kl||n===jl||n===Ql)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Hl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===zl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Gl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Vl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Wl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Xl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===$l)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ql)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Yl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Zl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Jl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Kl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===jl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ql)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ec||n===tc||n===nc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ec)return a===gt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===tc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===nc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ic||n===sc||n===Za||n===rc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ic)return r.COMPRESSED_RED_RGTC1_EXT;if(n===sc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Za)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===rc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Tr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var v1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,x1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Eu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ya(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ct({vertexShader:v1,fragmentShader:x1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ue(new Zi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},wu=class extends hi{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,p=null,y=typeof XRWebGLBinding<"u",m=new Eu,g={},b=t.getContextAttributes(),T=null,_=null,S=[],w=[],R=new ie,v=null,E=null,C=new Wt;C.viewport=new Dt;let I=new Wt;I.viewport=new Dt;let F=[C,I],k=new xl,D=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let Q=S[Z];return Q===void 0&&(Q=new gr,S[Z]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(Z){let Q=S[Z];return Q===void 0&&(Q=new gr,S[Z]=Q),Q.getGripSpace()},this.getHand=function(Z){let Q=S[Z];return Q===void 0&&(Q=new gr,S[Z]=Q),Q.getHandSpace()};function X(Z){let Q=w.indexOf(Z.inputSource);if(Q===-1)return;let ye=S[Q];ye!==void 0&&(ye.update(Z.inputSource,Z.frame,c||a),ye.dispatchEvent({type:Z.type,data:Z.inputSource}))}function W(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",se);for(let Z=0;Z<S.length;Z++){let Q=w[Z];Q!==null&&(w[Z]=null,S[Z].disconnect(Q))}D=null,B=null,m.reset();for(let Z in g)delete g[Z];if(e.setRenderTarget(T),f=null,u=null,d=null,s=null,_=null,dt.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(R.width,R.height,!1),E!==null){let Z=E.camera;Z.fov=E.fov,Z.zoom=E.zoom,Z.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&We("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&We("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(T=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",W),s.addEventListener("inputsourceschange",se),b.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(R),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,$e=null,Te=null;b.depth&&(Te=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=b.stencil?is:ci,$e=b.stencil?Tr:ti);let Ye={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Ye),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),_=new Xt(u.textureWidth,u.textureHeight,{format:Sn,type:bn,depthTexture:new qi(u.textureWidth,u.textureHeight,$e,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let ye={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ye),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new Xt(f.framebufferWidth,f.framebufferHeight,{format:Sn,type:bn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),dt.setContext(s),dt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function se(Z){for(let Q=0;Q<Z.removed.length;Q++){let ye=Z.removed[Q],$e=w.indexOf(ye);$e>=0&&(w[$e]=null,S[$e].disconnect(ye))}for(let Q=0;Q<Z.added.length;Q++){let ye=Z.added[Q],$e=w.indexOf(ye);if($e===-1){for(let Ye=0;Ye<S.length;Ye++)if(Ye>=w.length){w.push(ye),$e=Ye;break}else if(w[Ye]===null){w[Ye]=ye,$e=Ye;break}if($e===-1)break}let Te=S[$e];Te&&Te.connect(ye)}}let $=new P,j=new P;function te(Z,Q,ye){$.setFromMatrixPosition(Q.matrixWorld),j.setFromMatrixPosition(ye.matrixWorld);let $e=$.distanceTo(j),Te=Q.projectionMatrix.elements,Ye=ye.projectionMatrix.elements,bt=Te[14]/(Te[10]-1),ee=Te[14]/(Te[10]+1),ae=(Te[9]+1)/Te[5],le=(Te[9]-1)/Te[5],ce=(Te[8]-1)/Te[0],fe=(Ye[8]+1)/Ye[0],Ge=bt*ce,ke=bt*fe,Ze=$e/(-ce+fe),Ke=Ze*-ce;if(Q.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ke),Z.translateZ(Ze),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Te[10]===-1)Z.projectionMatrix.copy(Q.projectionMatrix),Z.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let L=bt+Ze,_t=ee+Ze,at=Ge-Ke,A=ke+($e-Ke),x=ae*ee/_t*L,O=le*ee/_t*L;Z.projectionMatrix.makePerspective(at,A,x,O,L,_t),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Ue(Z,Q){Q===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(Q.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let Q=Z.near,ye=Z.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(ye=m.depthFar)),k.near=I.near=C.near=Q,k.far=I.far=C.far=ye,(D!==k.near||B!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),D=k.near,B=k.far),k.layers.mask=Z.layers.mask|6,C.layers.mask=k.layers.mask&-5,I.layers.mask=k.layers.mask&-3;let $e=Z.parent,Te=k.cameras;Ue(k,$e);for(let Ye=0;Ye<Te.length;Ye++)Ue(Te[Ye],$e);Te.length===2?te(k,C,I):k.projectionMatrix.copy(C.projectionMatrix),E===null&&Z.isPerspectiveCamera&&(E={camera:Z,fov:Z.fov,zoom:Z.zoom}),Ce(Z,k,$e)};function Ce(Z,Q,ye){ye===null?Z.matrix.copy(Q.matrixWorld):(Z.matrix.copy(ye.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(Q.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(Q.projectionMatrix),Z.projectionMatrixInverse.copy(Q.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=_s*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(Z){return g[Z]};let vt=null;function rt(Z,Q){if(h=Q.getViewerPose(c||a),p=Q,h!==null){let ye=h.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let $e=!1;ye.length!==k.cameras.length&&(k.cameras.length=0,$e=!0);for(let ee=0;ee<ye.length;ee++){let ae=ye[ee],le=null;if(f!==null)le=f.getViewport(ae);else{let fe=d.getViewSubImage(u,ae);le=fe.viewport,ee===0&&(e.setRenderTargetTextures(_,fe.colorTexture,fe.depthStencilTexture),e.setRenderTarget(_))}let ce=F[ee];ce===void 0&&(ce=new Wt,ce.layers.enable(ee),ce.viewport=new Dt,F[ee]=ce),ce.matrix.fromArray(ae.transform.matrix),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.projectionMatrix.fromArray(ae.projectionMatrix),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert(),ce.viewport.set(le.x,le.y,le.width,le.height),ee===0&&(k.matrix.copy(ce.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),$e===!0&&k.cameras.push(ce)}let Te=s.enabledFeatures;if(Te&&Te.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){d=n.getBinding();let ee=d.getDepthInformation(ye[0]);ee&&ee.isValid&&ee.texture&&m.init(ee,s.renderState)}if(Te&&Te.includes("camera-access")&&y){e.state.unbindTexture(),d=n.getBinding();for(let ee=0;ee<ye.length;ee++){let ae=ye[ee].camera;if(ae){let le=g[ae];le||(le=new ya,g[ae]=le);let ce=d.getCameraImage(ae);le.sourceTexture=ce}}}}for(let ye=0;ye<S.length;ye++){let $e=w[ye],Te=S[ye];$e!==null&&Te!==void 0&&Te.update($e,Q,c||a)}vt&&vt(Z,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),p=null}let dt=new Ep;dt.setAnimationLoop(rt),this.setAnimationLoop=function(Z){vt=Z},this.dispose=function(){}}},_1=new xt,Pp=new Je;Pp.set(-1,0,0,0,1,0,0,0,1);function y1(i,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,nu(i)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,b,T,_){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),d(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),u(m,g),g.isMeshPhysicalMaterial&&f(m,g,_)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),y(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,b,T):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Zt&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Zt&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let b=e.get(g),T=b.envMap,_=b.envMapRotation;T&&(m.envMap.value=T,m.envMapRotation.value.setFromMatrix4(_1.makeRotationFromEuler(_)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Pp),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,b,T){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*b,m.scale.value=T*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function d(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function u(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function f(m,g,b){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Zt&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function y(m,g){let b=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function M1(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,S){let w=S.program;n.uniformBlockBinding(_,w)}function c(_,S){let w=s[_.id];w===void 0&&(m(_),w=h(_),s[_.id]=w,_.addEventListener("dispose",b));let R=S.program;n.updateUBOMapping(_,R);let v=e.render.frame;r[_.id]!==v&&(u(_),r[_.id]=v)}function h(_){let S=d();_.__bindingPointIndex=S;let w=i.createBuffer(),R=_.__size,v=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,R,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,w),w}function d(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return Xe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){let S=s[_.id],w=_.uniforms,R=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let v=0,E=w.length;v<E;v++){let C=w[v];if(Array.isArray(C))for(let I=0,F=C.length;I<F;I++)f(C[I],v,I,R);else f(C,v,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(_,S,w,R){if(y(_,S,w,R)===!0){let v=_.__offset,E=_.value;if(Array.isArray(E)){let C=0;for(let I=0;I<E.length;I++){let F=E[I],k=g(F);p(F,_.__data,C),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(C+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(E,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,_.__data)}}function p(_,S,w){typeof _=="number"||typeof _=="boolean"?S[0]=_:_.isMatrix3?(S[0]=_.elements[0],S[1]=_.elements[1],S[2]=_.elements[2],S[3]=0,S[4]=_.elements[3],S[5]=_.elements[4],S[6]=_.elements[5],S[7]=0,S[8]=_.elements[6],S[9]=_.elements[7],S[10]=_.elements[8],S[11]=0):ArrayBuffer.isView(_)?S.set(new _.constructor(_.buffer,_.byteOffset,S.length)):_.toArray(S,w)}function y(_,S,w,R){let v=_.value,E=S+"_"+w;if(R[E]===void 0)return typeof v=="number"||typeof v=="boolean"?R[E]=v:ArrayBuffer.isView(v)?R[E]=v.slice():R[E]=v.clone(),!0;{let C=R[E];if(typeof v=="number"||typeof v=="boolean"){if(C!==v)return R[E]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(C.equals(v)===!1)return C.copy(v),!0}}return!1}function m(_){let S=_.uniforms,w=0,R=16;for(let E=0,C=S.length;E<C;E++){let I=Array.isArray(S[E])?S[E]:[S[E]];for(let F=0,k=I.length;F<k;F++){let D=I[F],B=Array.isArray(D.value)?D.value:[D.value];for(let X=0,W=B.length;X<W;X++){let se=B[X],$=g(se),j=w%R,te=j%$.boundary,Ue=j+te;w+=te,Ue!==0&&R-Ue<$.storage&&(w+=R-Ue),D.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=w,w+=$.storage}}}let v=w%R;return v>0&&(w+=R-v),_.__size=w,_.__cache={},this}function g(_){let S={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(S.boundary=4,S.storage=4):_.isVector2?(S.boundary=8,S.storage=8):_.isVector3||_.isColor?(S.boundary=16,S.storage=12):_.isVector4?(S.boundary=16,S.storage=16):_.isMatrix3?(S.boundary=48,S.storage=48):_.isMatrix4?(S.boundary=64,S.storage=64):_.isTexture?We("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(S.boundary=16,S.storage=_.byteLength):We("WebGLRenderer: Unsupported uniform value type.",_),S}function b(_){let S=_.target;S.removeEventListener("dispose",b);let w=a.indexOf(S.__bindingPointIndex);a.splice(w,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function T(){for(let _ in s)i.deleteBuffer(s[_]);a=[],s={},r={}}return{bind:l,update:c,dispose:T}}var b1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),fi=null;function S1(){return fi===null&&(fi=new bs(b1,16,16,ss,on),fi.name="DFG_LUT",fi.minFilter=rn,fi.magFilter=rn,fi.wrapS=oi,fi.wrapT=oi,fi.generateMipmaps=!1,fi.needsUpdate=!0),fi}var dc=class{constructor(e={}){let{canvas:t=Xf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=bn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let y=f,m=new Set([Cl,Rl,Al]),g=new Set([bn,ti,wr,Tr,El,wl]),b=new Uint32Array(4),T=new Int32Array(4),_=new P,S=null,w=null,R=[],v=[],E=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ei,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,I=!1,F=null,k=null,D=null,B=null;this._outputColorSpace=Vt;let X=0,W=0,se=null,$=-1,j=null,te=new Dt,Ue=new Dt,Ce=null,vt=new Se(0),rt=0,dt=t.width,Z=t.height,Q=1,ye=null,$e=null,Te=new Dt(0,0,dt,Z),Ye=new Dt(0,0,dt,Z),bt=!1,ee=new xr,ae=!1,le=!1,ce=new xt,fe=new P,Ge=new Dt,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ze=!1;function Ke(){return se===null?Q:1}let L=n;function _t(M,U){return t.getContext(M,U)}let at,A,x,O,G,q,he,de,Y,K,pe,Ne,xe,me,Fe,Ve,je,N,ge,J,ve,Ee,ne;try{let M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",At,!1),t.addEventListener("webglcontextrestored",yt,!1),t.addEventListener("webglcontextcreationerror",Vn,!1),L===null){let U="webgl2";if(L=_t(U,M),L===null)throw _t(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Oe()}catch(M){throw t.removeEventListener("webglcontextlost",At,!1),t.removeEventListener("webglcontextrestored",yt,!1),t.removeEventListener("webglcontextcreationerror",Vn,!1),Xe("WebGLRenderer: "+M.message),M}function Oe(){at=new P_(L),at.init(),ve=new g1(L,at),A=new y_(L,at,e,ve),x=new p1(L,at),A.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),k=L.createFramebuffer(),D=L.createFramebuffer(),B=L.createFramebuffer(),O=new D_(L),G=new e1,q=new m1(L,at,x,G,A,ve,O),he=new C_(C),de=new Ng(L),Ee=new x_(L,de),Y=new I_(L,de,O,Ee),K=new N_(L,Y,de,Ee,O),N=new U_(L,A,q),Fe=new M_(G),pe=new Qy(C,he,at,A,Ee,Fe),Ne=new y1(C,G),xe=new n1,me=new l1(at),je=new v_(C,he,x,K,p,l),Ve=new f1(C,K,A),ne=new M1(L,O,A,x),ge=new __(L,at,O),J=new L_(L,at,O),O.programs=pe.programs,C.capabilities=A,C.extensions=at,C.properties=G,C.renderLists=xe,C.shadowMap=Ve,C.state=x,C.info=O}y!==bn&&(E=new O_(y,t.width,t.height,o,s,r));let Le=new wu(C,L);this.xr=Le,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let M=at.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=at.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(M){M!==void 0&&(Q=M,this.setSize(dt,Z,!1))},this.getSize=function(M){return M.set(dt,Z)},this.setSize=function(M,U,V=!0){if(Le.isPresenting){We("WebGLRenderer: Can't change size while VR device is presenting.");return}dt=M,Z=U,t.width=Math.floor(M*Q),t.height=Math.floor(U*Q),V===!0&&(t.style.width=M+"px",t.style.height=U+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(dt*Q,Z*Q).floor()},this.setDrawingBufferSize=function(M,U,V){dt=M,Z=U,Q=V,t.width=Math.floor(M*V),t.height=Math.floor(U*V),this.setViewport(0,0,M,U)},this.setEffects=function(M){if(y===bn){Xe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let U=0;U<M.length;U++)if(M[U].isOutputPass===!0){We("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(te)},this.getViewport=function(M){return M.copy(Te)},this.setViewport=function(M,U,V,H){M.isVector4?Te.set(M.x,M.y,M.z,M.w):Te.set(M,U,V,H),x.viewport(te.copy(Te).multiplyScalar(Q).round())},this.getScissor=function(M){return M.copy(Ye)},this.setScissor=function(M,U,V,H){M.isVector4?Ye.set(M.x,M.y,M.z,M.w):Ye.set(M,U,V,H),x.scissor(Ue.copy(Ye).multiplyScalar(Q).round())},this.getScissorTest=function(){return bt},this.setScissorTest=function(M){x.setScissorTest(bt=M)},this.setOpaqueSort=function(M){ye=M},this.setTransparentSort=function(M){$e=M},this.getClearColor=function(M){return M.copy(je.getClearColor())},this.setClearColor=function(){je.setClearColor(...arguments)},this.getClearAlpha=function(){return je.getClearAlpha()},this.setClearAlpha=function(){je.setClearAlpha(...arguments)},this.clear=function(M=!0,U=!0,V=!0){let H=0;if(M){let z=!1;if(se!==null){let be=se.texture.format;z=m.has(be)}if(z){let be=se.texture.type,Re=g.has(be),Me=je.getClearColor(),Pe=je.getClearAlpha(),De=Me.r,Qe=Me.g,ot=Me.b;Re?(b[0]=De,b[1]=Qe,b[2]=ot,b[3]=Pe,L.clearBufferuiv(L.COLOR,0,b)):(T[0]=De,T[1]=Qe,T[2]=ot,T[3]=Pe,L.clearBufferiv(L.COLOR,0,T))}else H|=L.COLOR_BUFFER_BIT}U&&(H|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(H|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&L.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),F=M},this.dispose=function(){t.removeEventListener("webglcontextlost",At,!1),t.removeEventListener("webglcontextrestored",yt,!1),t.removeEventListener("webglcontextcreationerror",Vn,!1),je.dispose(),xe.dispose(),me.dispose(),G.dispose(),he.dispose(),K.dispose(),Ee.dispose(),ne.dispose(),pe.dispose(),Le.dispose(),Le.removeEventListener("sessionstart",bd),Le.removeEventListener("sessionend",Sd),ds.stop()};function At(M){M.preventDefault(),ca("WebGLRenderer: Context Lost."),I=!0}function yt(){ca("WebGLRenderer: Context Restored."),I=!1;let M=O.autoReset,U=Ve.enabled,V=Ve.autoUpdate,H=Ve.needsUpdate,z=Ve.type;Oe(),O.autoReset=M,Ve.enabled=U,Ve.autoUpdate=V,Ve.needsUpdate=H,Ve.type=z}function Vn(M){Xe("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function si(M){let U=M.target;U.removeEventListener("dispose",si),e0(U)}function e0(M){t0(M),G.remove(M)}function t0(M){let U=G.get(M).programs;U!==void 0&&(U.forEach(function(V){pe.releaseProgram(V)}),M.isShaderMaterial&&pe.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,V,H,z,be){U===null&&(U=ke);let Re=z.isMesh&&z.matrixWorld.determinantAffine()<0,Me=s0(M,U,V,H,z);x.setMaterial(H,Re);let Pe=V.index,De=1;if(H.wireframe===!0){if(Pe=Y.getWireframeAttribute(V),Pe===void 0)return;De=2}let Qe=V.drawRange,ot=V.attributes.position,Ie=Qe.start*De,Mt=(Qe.start+Qe.count)*De;be!==null&&(Ie=Math.max(Ie,be.start*De),Mt=Math.min(Mt,(be.start+be.count)*De)),Pe!==null?(Ie=Math.max(Ie,0),Mt=Math.min(Mt,Pe.count)):ot!=null&&(Ie=Math.max(Ie,0),Mt=Math.min(Mt,ot.count));let zt=Mt-Ie;if(zt<0||zt===1/0)return;Ee.setup(z,H,Me,V,Pe);let Pt,wt=ge;if(Pe!==null&&(Pt=de.get(Pe),wt=J,wt.setIndex(Pt)),z.isMesh)H.wireframe===!0?(x.setLineWidth(H.wireframeLinewidth*Ke()),wt.setMode(L.LINES)):wt.setMode(L.TRIANGLES);else if(z.isLine){let ln=H.linewidth;ln===void 0&&(ln=1),x.setLineWidth(ln*Ke()),z.isLineSegments?wt.setMode(L.LINES):z.isLineLoop?wt.setMode(L.LINE_LOOP):wt.setMode(L.LINE_STRIP)}else z.isPoints?wt.setMode(L.POINTS):z.isSprite&&wt.setMode(L.TRIANGLES);if(z.isBatchedMesh)if(at.get("WEBGL_multi_draw"))wt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{let ln=z._multiDrawStarts,Ae=z._multiDrawCounts,pn=z._multiDrawCount,ft=Pe?de.get(Pe).bytesPerElement:1,Un=G.get(H).currentProgram.getUniforms();for(let ri=0;ri<pn;ri++)Un.setValue(L,"_gl_DrawID",ri),wt.render(ln[ri]/ft,Ae[ri])}else if(z.isInstancedMesh)wt.renderInstances(Ie,zt,z.count);else if(V.isInstancedBufferGeometry){let ln=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Ae=Math.min(V.instanceCount,ln);wt.renderInstances(Ie,zt,Ae)}else wt.render(Ie,zt)};function Md(M,U,V,H){F!==null&&M.isNodeMaterial&&F.setObject(H,M),ae===!0&&Fe.setState(M,V,!1),M.transparent===!0&&M.side===Mn&&M.forceSinglePass===!1?(M.side=Zt,M.needsUpdate=!0,oo(M,U,H),M.side=On,M.needsUpdate=!0,oo(M,U,H),M.side=Mn):oo(M,U,H)}this.compile=function(M,U,V=null){V===null&&(V=M),F!==null&&F.renderStart(M,U,V),w=me.get(V),w.init(U),v.push(w),V.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(w.pushLight(z),z.castShadow&&w.pushShadow(z))}),M!==V&&M.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(w.pushLight(z),z.castShadow&&w.pushShadow(z))}),w.setupLights(),F!==null&&F.updateLights(w.state.lightsArray),le=this.localClippingEnabled,ae=Fe.init(this.clippingPlanes,le),ae===!0&&Fe.setGlobalState(this.clippingPlanes,U),F!==null&&Ve.render(w.state.shadowsArray,V,U);let H=new Set;return M.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;let be=z.material;if(be)if(Array.isArray(be))for(let Re=0;Re<be.length;Re++){let Me=be[Re];Md(Me,V,U,z),H.add(Me)}else Md(be,V,U,z),H.add(be)}),w=v.pop(),F!==null&&F.renderEnd(),H},this.compileAsync=function(M,U,V=null){let H=this.compile(M,U,V);return new Promise(z=>{function be(){if(H.forEach(function(Re){let Pe=G.get(Re).currentProgram;(Pe===void 0||Pe.isReady())&&H.delete(Re)}),H.size===0){z(M);return}setTimeout(be,10)}at.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let jc=null;function n0(M){jc&&jc(M)}function bd(){ds.stop()}function Sd(){ds.start()}let ds=new Ep;ds.setAnimationLoop(n0),typeof self<"u"&&ds.setContext(self),this.setAnimationLoop=function(M){jc=M,Le.setAnimationLoop(M),M===null?ds.stop():ds.start()},Le.addEventListener("sessionstart",bd),Le.addEventListener("sessionend",Sd),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){Xe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;F!==null&&F.renderStart(M,U);let V=Le.enabled===!0&&Le.isPresenting===!0,H=E!==null&&(se===null||V)&&E.begin(C,se);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Le.enabled===!0&&Le.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Le.cameraAutoUpdate===!0&&Le.updateCamera(U),U=Le.getCamera()),M.isScene===!0&&M.onBeforeRender(C,M,U,se),w=me.get(M,v.length),w.init(U),w.state.textureUnits=q.getTextureUnits(),v.push(w),ce.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),ee.setFromProjectionMatrix(ce,Zn,U.reversedDepth),le=this.localClippingEnabled,ae=Fe.init(this.clippingPlanes,le),S=xe.get(M,R.length),S.init(),R.push(S),Le.enabled===!0&&Le.isPresenting===!0){let Re=C.xr.getDepthSensingMesh();Re!==null&&Qc(Re,U,-1/0,C.sortObjects)}Qc(M,U,0,C.sortObjects),S.finish(),F!==null&&F.updateLights(w.state.lightsArray),C.sortObjects===!0&&S.sort(ye,$e),Ze=Le.enabled===!1||Le.isPresenting===!1||Le.hasDepthSensing()===!1,Ze&&je.addToRenderList(S,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ae===!0&&Fe.beginShadows();let z=w.state.shadowsArray;if(Ve.render(z,M,U),ae===!0&&Fe.endShadows(),(H&&E.hasRenderPass())===!1){let Re=S.opaque,Me=S.transmissive;if(w.setupLights(),U.isArrayCamera){let Pe=U.cameras;if(Me.length>0)for(let De=0,Qe=Pe.length;De<Qe;De++){let ot=Pe[De];wd(Re,Me,M,ot)}Ze&&je.render(M);for(let De=0,Qe=Pe.length;De<Qe;De++){let ot=Pe[De];Ed(S,M,ot,ot.viewport)}}else Me.length>0&&wd(Re,Me,M,U),Ze&&je.render(M),Ed(S,M,U)}se!==null&&W===0&&(q.updateMultisampleRenderTarget(se),q.updateRenderTargetMipmap(se)),H&&E.end(C),M.isScene===!0&&M.onAfterRender(C,M,U),Ee.resetDefaultState(),$=-1,j=null,v.pop(),v.length>0?(w=v[v.length-1],q.setTextureUnits(w.state.textureUnits),ae===!0&&Fe.setGlobalState(C.clippingPlanes,w.state.camera)):w=null,R.pop(),R.length>0?S=R[R.length-1]:S=null,F!==null&&F.renderEnd()};function Qc(M,U,V,H){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)V=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLightProbeGrid)w.pushLightProbeGrid(M);else if(M.isLight)w.pushLight(M),M.castShadow&&w.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(ee)){H&&Ge.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ce);let Re=K.update(M),Me=M.material;Me.visible&&S.push(M,Re,Me,V,Ge.z,null,U)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(ee))){let Re=K.update(M),Me=M.material;if(H&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ge.copy(M.boundingSphere.center)):(Re.boundingSphere===null&&Re.computeBoundingSphere(),Ge.copy(Re.boundingSphere.center)),Ge.applyMatrix4(M.matrixWorld).applyMatrix4(ce)),Array.isArray(Me)){let Pe=Re.groups;for(let De=0,Qe=Pe.length;De<Qe;De++){let ot=Pe[De],Ie=Me[ot.materialIndex];Ie&&Ie.visible&&S.push(M,Re,Ie,V,Ge.z,ot,U)}}else Me.visible&&S.push(M,Re,Me,V,Ge.z,null,U)}}let be=M.children;for(let Re=0,Me=be.length;Re<Me;Re++)Qc(be[Re],U,V,H)}function Ed(M,U,V,H){let{opaque:z,transmissive:be,transparent:Re}=M;w.setupLightsView(V),ae===!0&&Fe.setGlobalState(C.clippingPlanes,V),H&&x.viewport(te.copy(H)),z.length>0&&ao(z,U,V),be.length>0&&ao(be,U,V),Re.length>0&&ao(Re,U,V),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function wd(M,U,V,H){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[H.id]===void 0){let Ie=at.has("EXT_color_buffer_half_float")||at.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[H.id]=new Xt(1,1,{generateMipmaps:!0,type:Ie?on:bn,minFilter:ns,samples:Math.max(4,A.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:nt.workingColorSpace})}let be=w.state.transmissionRenderTarget[H.id],Re=H.viewport||te;be.setSize(Re.z*C.transmissionResolutionScale,Re.w*C.transmissionResolutionScale);let Me=C.getRenderTarget(),Pe=C.getActiveCubeFace(),De=C.getActiveMipmapLevel();C.setRenderTarget(be),C.getClearColor(vt),rt=C.getClearAlpha(),rt<1&&C.setClearColor(16777215,.5),C.clear(),Ze&&je.render(V);let Qe=C.toneMapping;C.toneMapping=ei;let ot=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),w.setupLightsView(H),ae===!0&&Fe.setGlobalState(C.clippingPlanes,H),ao(M,V,H),q.updateMultisampleRenderTarget(be),q.updateRenderTargetMipmap(be),at.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let Mt=0,zt=U.length;Mt<zt;Mt++){let Pt=U[Mt],{object:wt,geometry:ln,material:Ae,group:pn}=Pt;if(Ae.side===Mn&&wt.layers.test(H.layers)){let ft=Ae.side;Ae.side=Zt,Ae.needsUpdate=!0,Td(wt,V,H,ln,Ae,pn),Ae.side=ft,Ae.needsUpdate=!0,Ie=!0}}Ie===!0&&(q.updateMultisampleRenderTarget(be),q.updateRenderTargetMipmap(be))}C.setRenderTarget(Me,Pe,De),C.setClearColor(vt,rt),ot!==void 0&&(H.viewport=ot),C.toneMapping=Qe}function ao(M,U,V){let H=U.isScene===!0?U.overrideMaterial:null;for(let z=0,be=M.length;z<be;z++){let Re=M[z],{object:Me,geometry:Pe,group:De}=Re,Qe=Re.material;Qe.allowOverride===!0&&H!==null&&(Qe=H),Me.layers.test(V.layers)&&Td(Me,U,V,Pe,Qe,De)}}function Td(M,U,V,H,z,be){F!==null&&z.isNodeMaterial&&F.setObject(M,z),M.onBeforeRender(C,U,V,H,z,be),M.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),z.onBeforeRender(C,U,V,H,M,be),z.transparent===!0&&z.side===Mn&&z.forceSinglePass===!1?(z.side=Zt,z.needsUpdate=!0,C.renderBufferDirect(V,U,H,z,M,be),z.side=On,z.needsUpdate=!0,C.renderBufferDirect(V,U,H,z,M,be),z.side=Mn):C.renderBufferDirect(V,U,H,z,M,be),M.onAfterRender(C,U,V,H,z,be)}function oo(M,U,V){U.isScene!==!0&&(U=ke);let H=G.get(M),z=w.state.lights,be=w.state.shadowsArray,Re=z.state.version,Me=pe.getParameters(M,z.state,be,U,V,w.state.lightProbeGridArray),Pe=pe.getProgramCacheKey(Me),De=H.programs;H.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?U.environment:null,H.fog=U.fog;let Qe=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;H.envMap=he.get(M.envMap||H.environment,Qe),H.envMapRotation=H.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,De===void 0&&(M.addEventListener("dispose",si),De=new Map,H.programs=De);let ot=De.get(Pe);if(ot!==void 0){if(H.currentProgram===ot&&H.lightsStateVersion===Re)return Rd(M,Me),ot}else Me.uniforms=pe.getUniforms(M),F!==null&&M.isNodeMaterial&&F.build(M,V,Me),M.onBeforeCompile(Me,C),ot=pe.acquireProgram(Me,Pe),De.set(Pe,ot),H.uniforms=Me.uniforms;let Ie=H.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ie.clippingPlanes=Fe.uniform),Rd(M,Me),H.needsLights=a0(M),H.lightsStateVersion=Re,H.needsLights&&(Ie.ambientLightColor.value=z.state.ambient,Ie.lightProbe.value=z.state.probe,Ie.sunLights.value=z.state.sun,Ie.sunLightShadows.value=z.state.sunShadow,Ie.directionalLights.value=z.state.directional,Ie.directionalLightShadows.value=z.state.directionalShadow,Ie.spotLights.value=z.state.spot,Ie.spotLightShadows.value=z.state.spotShadow,Ie.rectAreaLights.value=z.state.rectArea,Ie.ltc_1.value=z.state.rectAreaLTC1,Ie.ltc_2.value=z.state.rectAreaLTC2,Ie.pointLights.value=z.state.point,Ie.pointLightShadows.value=z.state.pointShadow,Ie.hemisphereLights.value=z.state.hemi,Ie.sunShadowMatrix.value=z.state.sunShadowMatrix,Ie.sunShadowCascade.value=z.state.sunShadowCascade,Ie.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ie.spotLightMatrix.value=z.state.spotLightMatrix,Ie.spotLightMap.value=z.state.spotLightMap,Ie.pointShadowMatrix.value=z.state.pointShadowMatrix),H.lightProbeGrid=w.state.lightProbeGridArray.length>0,H.currentProgram=ot,H.uniformsList=null,ot}function Ad(M){if(M.uniformsList===null){let U=M.currentProgram.getUniforms();M.uniformsList=Cr.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function Rd(M,U){let V=G.get(M);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function i0(M,U){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;_.setFromMatrixPosition(U.matrixWorld);for(let V=0,H=M.length;V<H;V++){let z=M[V];if(z.texture!==null&&z.boundingBox.containsPoint(_))return z}return null}function s0(M,U,V,H,z){U.isScene!==!0&&(U=ke),q.resetTextureUnits();let be=U.fog,Re=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?U.environment:null,Me=se===null?C.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:nt.workingColorSpace,Pe=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,De=he.get(H.envMap||Re,Pe),Qe=H.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,ot=!!V.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ie=!!V.morphAttributes.position,Mt=!!V.morphAttributes.normal,zt=!!V.morphAttributes.color,Pt=ei;H.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Pt=C.toneMapping);let wt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ln=wt!==void 0?wt.length:0,Ae=G.get(H),pn=w.state.lights;if(ae===!0&&(le===!0||M!==j)){let Rt=M===j&&H.id===$;Fe.setState(H,M,Rt)}let ft=!1;H.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==pn.state.version||Ae.outputColorSpace!==Me||z.isBatchedMesh&&Ae.batching===!1||!z.isBatchedMesh&&Ae.batching===!0||z.isBatchedMesh&&Ae.batchingColor===!0&&z._colorsTexture===null||z.isBatchedMesh&&Ae.batchingColor===!1&&z._colorsTexture!==null||z.isInstancedMesh&&Ae.instancing===!1||!z.isInstancedMesh&&Ae.instancing===!0||z.isSkinnedMesh&&Ae.skinning===!1||!z.isSkinnedMesh&&Ae.skinning===!0||z.isInstancedMesh&&Ae.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ae.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Ae.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Ae.instancingMorph===!1&&z.morphTexture!==null||Ae.envMap!==De||H.fog===!0&&Ae.fog!==be||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==Fe.numPlanes||Ae.numIntersection!==Fe.numIntersection)||Ae.vertexAlphas!==Qe||Ae.vertexTangents!==ot||Ae.morphTargets!==Ie||Ae.morphNormals!==Mt||Ae.morphColors!==zt||Ae.toneMapping!==Pt||Ae.morphTargetsCount!==ln||!!Ae.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(ft=!0):(ft=!0,Ae.__version=H.version);let Un=Ae.currentProgram;ft===!0&&(Un=oo(H,U,z),F&&H.isNodeMaterial&&F.onUpdateProgram(H,Un,Ae));let ri=!1,Bi=!1,Ws=!1,Et=Un.getUniforms(),kt=Ae.uniforms;if(x.useProgram(Un.program)&&(ri=!0,Bi=!0,Ws=!0),H.id!==$&&($=H.id,Bi=!0),Ae.needsLights){let Rt=i0(w.state.lightProbeGridArray,z);Ae.lightProbeGrid!==Rt&&(Ae.lightProbeGrid=Rt,Bi=!0)}if(ri||j!==M){x.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),Et.setValue(L,"projectionMatrix",M.projectionMatrix),Et.setValue(L,"viewMatrix",M.matrixWorldInverse);let Hi=Et.map.cameraPosition;Hi!==void 0&&Hi.setValue(L,fe.setFromMatrixPosition(M.matrixWorld)),A.logarithmicDepthBuffer&&Et.setValue(L,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Et.setValue(L,"isOrthographic",M.isOrthographicCamera===!0),j!==M&&(j=M,Bi=!0,Ws=!0)}if(Ae.needsLights&&(pn.state.sunShadowMap.length>0&&Et.setValue(L,"sunShadowMap",pn.state.sunShadowMap,q),pn.state.directionalShadowMap.length>0&&Et.setValue(L,"directionalShadowMap",pn.state.directionalShadowMap,q),pn.state.spotShadowMap.length>0&&Et.setValue(L,"spotShadowMap",pn.state.spotShadowMap,q),pn.state.pointShadowMap.length>0&&Et.setValue(L,"pointShadowMap",pn.state.pointShadowMap,q)),z.isSkinnedMesh){Et.setOptional(L,z,"bindMatrix"),Et.setOptional(L,z,"bindMatrixInverse");let Rt=z.skeleton;Rt&&(Rt.boneTexture===null&&Rt.computeBoneTexture(),Et.setValue(L,"boneTexture",Rt.boneTexture,q))}z.isBatchedMesh&&(Et.setOptional(L,z,"batchingTexture"),Et.setValue(L,"batchingTexture",z._matricesTexture,q),Et.setOptional(L,z,"batchingIdTexture"),Et.setValue(L,"batchingIdTexture",z._indirectTexture,q),Et.setOptional(L,z,"batchingColorTexture"),z._colorsTexture!==null&&Et.setValue(L,"batchingColorTexture",z._colorsTexture,q));let ki=V.morphAttributes;if((ki.position!==void 0||ki.normal!==void 0||ki.color!==void 0)&&N.update(z,V,Un),(Bi||Ae.receiveShadow!==z.receiveShadow)&&(Ae.receiveShadow=z.receiveShadow,Et.setValue(L,"receiveShadow",z.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&U.environment!==null&&(kt.envMapIntensity.value=U.environmentIntensity),kt.dfgLUT!==void 0&&(kt.dfgLUT.value=S1()),Bi){if(Et.setValue(L,"toneMappingExposure",C.toneMappingExposure),Ae.needsLights&&r0(kt,Ws),be&&H.fog===!0&&Ne.refreshFogUniforms(kt,be),Ne.refreshMaterialUniforms(kt,H,Q,Z,w.state.transmissionRenderTarget[M.id]),Ae.needsLights&&Ae.lightProbeGrid){let Rt=Ae.lightProbeGrid;kt.probesSH.value=Rt.texture,kt.probesMin.value.copy(Rt.boundingBox.min),kt.probesMax.value.copy(Rt.boundingBox.max),kt.probesResolution.value.copy(Rt.resolution)}Cr.upload(L,Ad(Ae),kt,q)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Cr.upload(L,Ad(Ae),kt,q),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Et.setValue(L,"center",z.center),Et.setValue(L,"modelViewMatrix",z.modelViewMatrix),Et.setValue(L,"normalMatrix",z.normalMatrix),Et.setValue(L,"modelMatrix",z.matrixWorld),H.uniformsGroups!==void 0){let Rt=H.uniformsGroups;for(let Hi=0,Xs=Rt.length;Hi<Xs;Hi++){let Pd=Rt[Hi];ne.update(Pd,Un),ne.bind(Pd,Un)}}return Un}function r0(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.sunLights.needsUpdate=U,M.sunLightShadows.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function a0(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return se},this.setRenderTargetTextures=function(M,U,V){let H=G.get(M);H.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),G.get(M.texture).__webglTexture=U,G.get(M.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:V,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,U){let V=G.get(M);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(M,U=0,V=0){se=M,X=U,W=V;let H=null,z=!1,be=!1;if(M){let Me=G.get(M);if(Me.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(L.FRAMEBUFFER,Me.__webglFramebuffer),te.copy(M.viewport),Ue.copy(M.scissor),Ce=M.scissorTest,x.viewport(te),x.scissor(Ue),x.setScissorTest(Ce),$=-1;return}else if(Me.__webglFramebuffer===void 0)q.setupRenderTarget(M);else if(Me.__hasExternalTextures)q.rebindTextures(M,G.get(M.texture).__webglTexture,G.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let Qe=M.depthTexture;if(Me.__boundDepthTexture!==Qe){if(Qe!==null&&G.has(Qe)&&(M.width!==Qe.image.width||M.height!==Qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(M)}}let Pe=M.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(be=!0);let De=G.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(De[U])?H=De[U][V]:H=De[U],z=!0):M.samples>0&&q.useMultisampledRTT(M)===!1?H=G.get(M).__webglMultisampledFramebuffer:Array.isArray(De)?H=De[V]:H=De,te.copy(M.viewport),Ue.copy(M.scissor),Ce=M.scissorTest}else te.copy(Te).multiplyScalar(Q).floor(),Ue.copy(Ye).multiplyScalar(Q).floor(),Ce=bt;if(V!==0&&(H=k),x.bindFramebuffer(L.FRAMEBUFFER,H)&&x.drawBuffers(M,H),x.viewport(te),x.scissor(Ue),x.setScissorTest(Ce),z){let Me=G.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,Me.__webglTexture,V)}else if(be){let Me=U;for(let Pe=0;Pe<M.textures.length;Pe++){let De=G.get(M.textures[Pe]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Pe,De.__webglTexture,V,Me)}}else if(M!==null&&V!==0){let Me=G.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Me.__webglTexture,V)}$=-1};function Cd(M){let U=G.get(M);return(U.__readFormat!==M.format||U.__readType!==M.type)&&(U.__readFormat=M.format,U.__readType=M.type,U.__formatReadable=A.textureFormatReadable(M.format),U.__typeReadable=A.textureTypeReadable(M.type)),U}this.readRenderTargetPixels=function(M,U,V,H,z,be,Re,Me=0){if(!(M&&M.isWebGLRenderTarget)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=G.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Re!==void 0&&(Pe=Pe[Re]),Pe){x.bindFramebuffer(L.FRAMEBUFFER,Pe);try{let De=M.textures[Me],Qe=De.format,ot=De.type;M.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Me);let Ie=Cd(De);if(Ie.__formatReadable===!1){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ie.__typeReadable===!1){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-H&&V>=0&&V<=M.height-z&&L.readPixels(U,V,H,z,ve.convert(Qe),ve.convert(ot),be)}finally{let De=se!==null?G.get(se).__webglFramebuffer:null;x.bindFramebuffer(L.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(M,U,V,H,z,be,Re,Me=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=G.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Re!==void 0&&(Pe=Pe[Re]),Pe)if(U>=0&&U<=M.width-H&&V>=0&&V<=M.height-z){x.bindFramebuffer(L.FRAMEBUFFER,Pe);let De=M.textures[Me],Qe=De.format,ot=De.type;M.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Me);let Ie=Cd(De);if(Ie.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ie.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Mt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Mt),L.bufferData(L.PIXEL_PACK_BUFFER,be.byteLength,L.STREAM_READ),L.readPixels(U,V,H,z,ve.convert(Qe),ve.convert(ot),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);let zt=se!==null?G.get(se).__webglFramebuffer:null;x.bindFramebuffer(L.FRAMEBUFFER,zt);let Pt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await qf(L,Pt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Mt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,be),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(Mt),L.deleteSync(Pt),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,U=null,V=0){let H=Math.pow(2,-V),z=Math.floor(M.image.width*H),be=Math.floor(M.image.height*H),Re=U!==null?U.x:0,Me=U!==null?U.y:0;q.setTexture2D(M,0),L.copyTexSubImage2D(L.TEXTURE_2D,V,0,0,Re,Me,z,be),x.unbindTexture()},this.copyTextureToTexture=function(M,U,V=null,H=null,z=0,be=0){let Re,Me,Pe,De,Qe,ot,Ie,Mt,zt,Pt=M.isCompressedTexture?M.mipmaps[be]:M.image;if(V!==null)Re=V.max.x-V.min.x,Me=V.max.y-V.min.y,Pe=V.isBox3?V.max.z-V.min.z:1,De=V.min.x,Qe=V.min.y,ot=V.isBox3?V.min.z:0;else{let kt=Math.pow(2,-z);Re=Math.floor(Pt.width*kt),Me=Math.floor(Pt.height*kt),M.isDataArrayTexture?Pe=Pt.depth:M.isData3DTexture?Pe=Math.floor(Pt.depth*kt):Pe=1,De=0,Qe=0,ot=0}H!==null?(Ie=H.x,Mt=H.y,zt=H.z):(Ie=0,Mt=0,zt=0);let wt=ve.convert(U.format),ln=ve.convert(U.type),Ae;U.isData3DTexture?(q.setTexture3D(U,0),Ae=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(q.setTexture2DArray(U,0),Ae=L.TEXTURE_2D_ARRAY):(q.setTexture2D(U,0),Ae=L.TEXTURE_2D),x.activeTexture(L.TEXTURE0),x.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),x.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),x.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);let pn=x.getParameter(L.UNPACK_ROW_LENGTH),ft=x.getParameter(L.UNPACK_IMAGE_HEIGHT),Un=x.getParameter(L.UNPACK_SKIP_PIXELS),ri=x.getParameter(L.UNPACK_SKIP_ROWS),Bi=x.getParameter(L.UNPACK_SKIP_IMAGES);x.pixelStorei(L.UNPACK_ROW_LENGTH,Pt.width),x.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Pt.height),x.pixelStorei(L.UNPACK_SKIP_PIXELS,De),x.pixelStorei(L.UNPACK_SKIP_ROWS,Qe),x.pixelStorei(L.UNPACK_SKIP_IMAGES,ot);let Ws=M.isDataArrayTexture||M.isData3DTexture,Et=U.isDataArrayTexture||U.isData3DTexture;if(M.isDepthTexture){let kt=G.get(M),ki=G.get(U),Rt=G.get(kt.__renderTarget),Hi=G.get(ki.__renderTarget);x.bindFramebuffer(L.READ_FRAMEBUFFER,Rt.__webglFramebuffer),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,Hi.__webglFramebuffer);for(let Xs=0;Xs<Pe;Xs++)Ws&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,G.get(M).__webglTexture,z,ot+Xs),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,G.get(U).__webglTexture,be,zt+Xs)),L.blitFramebuffer(De,Qe,Re,Me,Ie,Mt,Re,Me,L.DEPTH_BUFFER_BIT,L.NEAREST);x.bindFramebuffer(L.READ_FRAMEBUFFER,null),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(z!==0||M.isRenderTargetTexture||G.has(M)){let kt=G.get(M),ki=G.get(U);x.bindFramebuffer(L.READ_FRAMEBUFFER,D),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,B);for(let Rt=0;Rt<Pe;Rt++)Ws?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,kt.__webglTexture,z,ot+Rt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,kt.__webglTexture,z),Et?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ki.__webglTexture,be,zt+Rt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ki.__webglTexture,be),z!==0?L.blitFramebuffer(De,Qe,Re,Me,Ie,Mt,Re,Me,L.COLOR_BUFFER_BIT,L.NEAREST):Et?L.copyTexSubImage3D(Ae,be,Ie,Mt,zt+Rt,De,Qe,Re,Me):L.copyTexSubImage2D(Ae,be,Ie,Mt,De,Qe,Re,Me);x.bindFramebuffer(L.READ_FRAMEBUFFER,null),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Et?M.isDataTexture||M.isData3DTexture?L.texSubImage3D(Ae,be,Ie,Mt,zt,Re,Me,Pe,wt,ln,Pt.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(Ae,be,Ie,Mt,zt,Re,Me,Pe,wt,Pt.data):L.texSubImage3D(Ae,be,Ie,Mt,zt,Re,Me,Pe,wt,ln,Pt):M.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,be,Ie,Mt,Re,Me,wt,ln,Pt.data):M.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,be,Ie,Mt,Pt.width,Pt.height,wt,Pt.data):L.texSubImage2D(L.TEXTURE_2D,be,Ie,Mt,Re,Me,wt,ln,Pt);x.pixelStorei(L.UNPACK_ROW_LENGTH,pn),x.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ft),x.pixelStorei(L.UNPACK_SKIP_PIXELS,Un),x.pixelStorei(L.UNPACK_SKIP_ROWS,ri),x.pixelStorei(L.UNPACK_SKIP_IMAGES,Bi),be===0&&U.generateMipmaps&&L.generateMipmap(Ae),x.unbindTexture()},this.initRenderTarget=function(M){G.get(M).__webglFramebuffer===void 0&&q.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?q.setTextureCube(M,0):M.isData3DTexture?q.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?q.setTexture2DArray(M,0):q.setTexture2D(M,0),x.unbindTexture()},this.resetState=function(){X=0,W=0,se=null,x.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=nt._getUnpackColorSpace()}};var Ir={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Pn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},E1=new es(-1,1,1,-1,0,1),Tu=class extends Ft{constructor(){super(),this.setAttribute("position",new ct([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ct([0,2,0,0,2,0],2))}},w1=new Tu,rs=class{constructor(e){this._mesh=new ue(w1,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,E1)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Lr=class extends Pn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Ct?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Pi.clone(e.uniforms),this.material=new Ct({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new rs(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var eo=class extends Pn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},mc=class extends Pn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var gc=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new ie);this._width=n.width,this._height=n.height,t=new Xt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:on}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Lr(Ir),this.copyPass.material.blending=Bn,this.timer=new Fa}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}eo!==void 0&&(a instanceof eo?n=!0:a instanceof mc&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new ie);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var vc=class extends Pn{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Se}render(e,t,n){let s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}};var Ip={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Se(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var Dr=class i extends Pn{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new ie(e.x,e.y):new ie(256,256),this.clearColor=new Se(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Xt(r,a,{type:on,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let d=new Xt(r,a,{type:on,depthBuffer:!1});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let u=new Xt(r,a,{type:on,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),a=Math.round(a/2)}let o=Ip;this.highPassUniforms=Pi.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ct({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ie(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Pi.clone(Ir.uniforms),this.blendMaterial=new Ct({uniforms:this.copyUniforms,vertexShader:Ir.vertexShader,fragmentShader:Ir.fragmentShader,premultipliedAlpha:!0,blending:dn,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Se,this._oldClearAlpha=1,this._basic=new un,this._fsQuad=new rs(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ie(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(n*n))/n);let s=[],r=[];for(let a=1;a<e;a+=2){let o=t[a],l=a+1<e?t[a+1]:0,c=o+l;s.push((a*o+(a+1)*l)/c),r.push(c)}return new Ct({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new ie(.5,.5)},direction:{value:new ie(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Ct({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Dr.BlurDirectionX=new ie(1,0);Dr.BlurDirectionY=new ie(0,1);var to={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var xc=class extends Pn{constructor(){super(),this.isOutputPass=!0,this.uniforms=Pi.clone(to.uniforms),this.material=new br({name:to.name,uniforms:this.uniforms,vertexShader:to.vertexShader,fragmentShader:to.fragmentShader}),this._fsQuad=new rs(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},nt.getTransfer(this._outputColorSpace)===gt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Oa?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ba?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ka?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Is?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===za?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ga?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Ha&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var T1=`
  attribute float aSize;
  attribute float aAlpha;
  attribute vec3 aColor;
  varying float vAlpha;
  varying vec3 vColor;
  uniform float uScale;
  void main() {
    vAlpha = aAlpha;
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uScale / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`,A1=`
  varying float vAlpha;
  varying vec3 vColor;
  uniform float uSoft;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = mix(1.0, smoothstep(0.5, 0.0, d), uSoft);
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`,Au={value:10};function R1(i,e){return new Ct({vertexShader:T1,fragmentShader:A1,uniforms:{uScale:Au,uSoft:{value:e}},transparent:!0,depthWrite:!1,blending:i?dn:di})}var C1={dust:{color:"#fff2c8",size:[4,10],alpha:[.2,.6],vel:[.05,.05,.05],additive:!0,drift:.3},snow:{color:"#ffffff",size:[5,12],alpha:[.5,.95],vel:[.2,-.9,.1],additive:!1,drift:.6},embers:{color:"#ff8a2a",size:[4,9],alpha:[.5,1],vel:[.05,.6,.05],additive:!0,drift:.5,flicker:!0},spores:{color:"#6ad8ff",size:[5,11],alpha:[.3,.9],vel:[.05,.12,.05],additive:!0,drift:.4,flicker:!0},leaves:{color:"#ff5a2a",size:[8,14],alpha:[.7,1],vel:[.25,-.4,.1],additive:!1,drift:.8},fireflies:{color:"#d8ff6a",size:[5,10],alpha:[.3,1],vel:[.1,.05,.1],additive:!0,drift:1,flicker:!0},ash:{color:"#8a8a8a",size:[4,8],alpha:[.3,.7],vel:[.1,-.3,.05],additive:!1,drift:.4},gold:{color:"#ffd76a",size:[4,9],alpha:[.3,.9],vel:[.03,.08,.03],additive:!0,drift:.3,flicker:!0}},Ii=class{constructor(e,t,n=300,s={}){let r={...C1[e],...s};this.p=r,this.box=t,this.count=n;let a=new Ft;this.pos=new Float32Array(n*3),this.vel=new Float32Array(n*3),this.size=new Float32Array(n),this.alpha=new Float32Array(n),this.base=new Float32Array(n),this.col=new Float32Array(n*3),this.phase=new Float32Array(n);let o=new Se(r.color),l=r.color2?new Se(r.color2):o;for(let c=0;c<n;c++){this.pos[c*3]=Us.lerp(t.min.x,t.max.x,Math.random()),this.pos[c*3+1]=Us.lerp(t.min.y,t.max.y,Math.random()),this.pos[c*3+2]=Us.lerp(t.min.z,t.max.z,Math.random()),this.vel[c*3]=(Math.random()-.5)*2*r.vel[0],this.vel[c*3+1]=r.vel[1]*(.6+Math.random()*.8)+(Math.random()-.5)*.05,this.vel[c*3+2]=(Math.random()-.5)*2*r.vel[2],this.size[c]=Us.lerp(r.size[0],r.size[1],Math.random()),this.base[c]=Us.lerp(r.alpha[0],r.alpha[1],Math.random()),this.alpha[c]=this.base[c];let h=Math.random();this.col[c*3]=o.r+(l.r-o.r)*h,this.col[c*3+1]=o.g+(l.g-o.g)*h,this.col[c*3+2]=o.b+(l.b-o.b)*h,this.phase[c]=Math.random()*100}a.setAttribute("position",new Yt(this.pos,3)),a.setAttribute("aSize",new Yt(this.size,1)),a.setAttribute("aAlpha",new Yt(this.alpha,1)),a.setAttribute("aColor",new Yt(this.col,3)),this.geo=a,this.points=new xa(a,R1(r.additive,1)),this.points.frustumCulled=!1,this.points.renderOrder=5,this.t=0}update(e){this.t+=e;let{min:t,max:n}=this.box,s=this.p,r=this.pos,a=this.vel;for(let o=0;o<this.count;o++){let l=o*3,c=this.phase[o];r[l]+=(a[l]+Math.sin(this.t*.7+c)*s.drift*.2)*e,r[l+1]+=a[l+1]*e,r[l+2]+=(a[l+2]+Math.cos(this.t*.6+c)*s.drift*.2)*e,r[l+1]<t.y&&(r[l+1]=n.y),r[l+1]>n.y&&(r[l+1]=t.y),r[l]<t.x&&(r[l]=n.x),r[l]>n.x&&(r[l]=t.x),r[l+2]<t.z&&(r[l+2]=n.z),r[l+2]>n.z&&(r[l+2]=t.z),s.flicker&&(this.alpha[o]=this.base[o]*(.55+.45*Math.sin(this.t*2.5+c*3)))}this.geo.attributes.position.needsUpdate=!0,s.flicker&&(this.geo.attributes.aAlpha.needsUpdate=!0)}dispose(){this.geo.dispose(),this.points.material.dispose()}};var P1={uniforms:{tDiffuse:{value:null},uTime:{value:0},uRes:{value:new ie(1,1)},uVignette:{value:.35},uTint:{value:new P(1,1,1)},uSaturation:{value:1.05},uContrast:{value:1.04},uFade:{value:0},uFadeColor:{value:new P(0,0,0)},uGrain:{value:.035},uAberration:{value:.0012},uPixel:{value:0},uFlash:{value:0},uWarp:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uTime, uVignette, uSaturation, uContrast, uFade, uGrain, uAberration, uPixel, uFlash, uWarp;
    uniform vec2 uRes;
    uniform vec3 uTint, uFadeColor;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main() {
      vec2 uv = vUv;
      if (uWarp > 0.0) {
        uv.x += sin(uv.y * 40.0 + uTime * 6.0) * 0.004 * uWarp;
        uv.y += cos(uv.x * 30.0 + uTime * 4.0) * 0.003 * uWarp;
      }
      if (uPixel > 1.0) {
        vec2 px = uPixel / uRes;
        uv = (floor(uv / px) + 0.5) * px;
      }
      vec2 dir = uv - 0.5;
      float ab = uAberration * (0.5 + length(dir) * 2.0);
      vec3 col;
      col.r = texture2D(tDiffuse, uv + dir * ab).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - dir * ab).b;
      col *= uTint;
      float l = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(vec3(l), col, uSaturation);
      col = (col - 0.5) * uContrast + 0.5;
      float v = smoothstep(0.95, 0.25, length(dir * vec2(1.0, 0.85)));
      col *= mix(1.0, v, uVignette);
      col += (hash(uv * uRes + fract(uTime) * 91.0) - 0.5) * uGrain;
      col = mix(col, vec3(1.0), uFlash);
      col = mix(col, uFadeColor, uFade);
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `},_c=class{constructor(e){this.container=e,this.quality=1,this.renderer=new dc({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Cs,this.renderer.toneMapping=Is,this.renderer.toneMappingExposure=1,this.renderer.outputColorSpace=Vt,this.renderer.domElement.id="gl",e.appendChild(this.renderer.domElement),this.scene=new ys,this.camera=new Wt(40,16/9,.1,400),this.composer=new gc(this.renderer),this.renderPass=new vc(this.scene,this.camera),this.composer.addPass(this.renderPass),this.bloom=new Dr(new ie(512,512),.55,.5,.82),this.composer.addPass(this.bloom),this.composer.addPass(new xc),this.grade=new Lr(P1),this.composer.addPass(this.grade),this.post=this.grade.uniforms,this.shakeAmt=0,this.shakeTime=0,window.addEventListener("resize",()=>this.resize()),this.resize()}setQuality(e){this.quality=e;let t=Math.min(window.devicePixelRatio||1,2)*(e===0?.6:1);this.renderer.setPixelRatio(t),this.renderer.shadowMap.enabled=e>0,this.bloom.enabled=e>0,this.resize()}resize(){let e=window.innerWidth,t=window.innerHeight;this.width=e,this.height=t,this.renderer.setSize(e,t),this.composer.setSize(e,t),this.bloom.setSize(Math.floor(e/2),Math.floor(t/2));let n=this.renderer.getPixelRatio();this.post.uRes.value.set(e*n,t*n),Au.value=t*n/90,this.updateCamera(this.camera)}updateCamera(e){if(!e)return;e.aspect=this.width/this.height;let t=e.userData.baseFov||e.fov;if(e.userData.baseFov=t,e.aspect<16/9){let n=Math.tan(t*Math.PI/360)*1.7777777777777777/e.aspect;e.fov=Math.atan(n)*360/Math.PI}else e.fov=t;e.updateProjectionMatrix()}setView(e,t){this.scene=e,this.camera=t,this.renderPass.scene=e,this.renderPass.camera=t,this.updateCamera(t)}shake(e,t=.3){this.shakeAmt=Math.max(this.shakeAmt,e),this.shakeTime=Math.max(this.shakeTime,t)}render(e,t){this.post.uTime.value=t;let n=this.camera,s=0,r=0;if(this.shakeTime>0){this.shakeTime-=e;let a=this.shakeAmt*Math.max(0,Math.min(1,this.shakeTime*4));s=(Math.random()-.5)*a,r=(Math.random()-.5)*a,n.position.x+=s,n.position.y+=r}else this.shakeAmt=0;this.composer.render(e),n.position.x-=s,n.position.y-=r}};var Lp="data:font/woff2;base64,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";var Dp="data:font/woff2;base64,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";var Up="data:font/woff2;base64,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";var Np="data:font/woff2;base64,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";var Fp="data:font/woff2;base64,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";var st={ui:"UIFont",title:"TitleFont",wick:"WickFont",taper:"TaperFont",small:"SmallFont"};async function Op(){let i=[["UIFont",Lp,{weight:"400 700"}],["TitleFont",Dp,{}],["WickFont",Up,{weight:"700"}],["TaperFont",Np,{}],["SmallFont",Fp,{}]];await Promise.all(i.map(async([e,t,n])=>{try{let s=new FontFace(e,`url(${t})`,n);await s.load(),document.fonts.add(s)}catch(s){console.warn("font failed",e,s)}}))}function Ur(i,e=st.ui,t=""){let n=e===st.wick?'"Comic Sans MS", cursive':"monospace";return`${t?t+" ":""}${i}px ${e}, ${n}`}var Bp=960,kp=540,F1=["..XX...XX..",".XXXX.XXXX.","XXXXXXXXXXX","XXXXXXXXXXX","XXXXXXXXXXX",".XXXXXXXXX.","..XXXXXXX..","...XXXXX...","....XXX....",".....X....."],O1=["..XX...XX..",".XXXX.XXXX.","XXXXX.XXXXX","XXXX.XXXXXX","XXXXX.XXXXX",".XXXXX.XXX.","..XXX.XXX..","...XX.XX...","....X.X....",".....X....."],Ru=new Map;function B1(i,e=!1,t=0){let n=i+e+t;if(Ru.has(n))return Ru.get(n);let s=4,r=t?10:0,a=document.createElement("canvas");a.width=11*s+r*2,a.height=10*s+r*2;let o=a.getContext("2d"),l=e?O1:F1;t&&(o.shadowColor=i,o.shadowBlur=t),o.fillStyle=i;for(let h=0;h<l.length;h++)for(let d=0;d<l[h].length;d++)l[h][d]==="X"&&o.fillRect(r+d*s,r+h*s,s,s);let c={canvas:a,pad:r,w:11*s,h:10*s};return Ru.set(n,c),c}var yc=class{constructor(e){this.canvas=document.createElement("canvas"),this.canvas.id="ui",e.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.scale=1,this.ox=0,this.oy=0,window.addEventListener("resize",()=>this.resize()),this.resize()}resize(){let e=window.innerWidth,t=window.innerHeight,n=Math.min(window.devicePixelRatio||1,2);this.dpr=n,this.canvas.width=Math.round(e*n),this.canvas.height=Math.round(t*n),this.canvas.style.width=e+"px",this.canvas.style.height=t+"px",this.scale=Math.min(e/Bp,t/kp),this.ox=(e-Bp*this.scale)/2,this.oy=(t-kp*this.scale)/2}begin(){let e=this.ctx;e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,this.canvas.width,this.canvas.height);let t=this.scale*this.dpr;e.setTransform(t,0,0,t,this.ox*this.dpr,this.oy*this.dpr),e.imageSmoothingEnabled=!1,e.textBaseline="top"}fillScreen(e,t=1){let n=this.ctx;n.save(),n.setTransform(1,0,0,1,0,0),n.globalAlpha=t,n.fillStyle=e,n.fillRect(0,0,this.canvas.width,this.canvas.height),n.restore()}box(e,t,n,s,r={}){let a=this.ctx,o=r.border??4;a.save(),a.globalAlpha=r.alpha??1,a.fillStyle=r.fill??"#000",a.fillRect(e,t,n,s),o&&(a.strokeStyle=r.stroke??"#fff",a.lineWidth=o,a.strokeRect(e+o/2,t+o/2,n-o,s-o)),a.restore()}text(e,t,n,s={}){let r=this.ctx;r.save(),r.font=Ur(s.size??24,s.family??st.ui,s.weight),r.textAlign=s.align??"left",r.textBaseline=s.baseline??"top",r.globalAlpha=s.alpha??1,s.shadow&&(r.fillStyle=s.shadow,r.fillText(e,t+2,n+2)),s.glow&&(r.shadowColor=s.glow,r.shadowBlur=s.glowSize??12),r.fillStyle=s.color??"#fff",r.fillText(e,t,n),r.restore()}measure(e,t=24,n=st.ui){let s=this.ctx;s.save(),s.font=Ur(t,n);let r=s.measureText(e).width;return s.restore(),r}heart(e,t,n=16,s="#ff0000",r={}){let a=B1(s,!!r.broken,r.glow??0),o=n/a.w,l=this.ctx;l.save(),l.globalAlpha=r.alpha??1,l.translate(e,t),r.rot&&l.rotate(r.rot),l.drawImage(a.canvas,-(a.w/2+a.pad)*o,-(a.h/2+a.pad)*o,a.canvas.width*o,a.canvas.height*o),l.restore()}bar(e,t,n,s,r,a="#ffff00",o="#c00000"){let l=this.ctx;l.fillStyle=o,l.fillRect(e,t,n,s),l.fillStyle=a,l.fillRect(e,t,Math.max(0,Math.min(1,r))*n,s)}toVirtual(e,t){return[(e-this.ox)/this.scale,(t-this.oy)/this.scale]}};var Hp={ArrowUp:"up",KeyW:"up",ArrowDown:"down",KeyS:"down",ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",KeyZ:"confirm",Enter:"confirm",NumpadEnter:"confirm",Space:"confirm",KeyX:"cancel",ShiftLeft:"cancel",ShiftRight:"cancel",Backspace:"cancel",KeyC:"menu",ControlLeft:"menu",ControlRight:"menu",Escape:"pause"},Cu=["up","down","left","right","confirm","cancel","menu","pause"],Pu=class{constructor(){this.down={},this.pressedNow={},this.releasedNow={},this.sources={},this.textListeners=[],this.lastDevice="keyboard",this.padPrev={};for(let e of Cu)this.down[e]=!1,this.sources[e]=new Set;this.onFirstGesture=[],this._gestured=!1,window.addEventListener("keydown",e=>{if(this._gesture(),this.textListeners.length&&this._routeText(e))return;let t=Hp[e.code];t&&(e.preventDefault(),!e.repeat&&(this.lastDevice="keyboard",this._press(t,"key:"+e.code)))}),window.addEventListener("keyup",e=>{let t=Hp[e.code];t&&(e.preventDefault(),this._release(t,"key:"+e.code))}),window.addEventListener("blur",()=>this.releaseAll()),window.addEventListener("pointerdown",()=>this._gesture(),{passive:!0}),window.addEventListener("touchstart",()=>this._gesture(),{passive:!0})}_gesture(){if(!this._gestured){this._gestured=!0;for(let e of this.onFirstGesture)e()}}_routeText(e){let t=this.textListeners[this.textListeners.length-1];return e.key.length===1&&!e.ctrlKey&&!e.metaKey&&/[A-Za-z0-9 !?.'-]/.test(e.key)?(e.preventDefault(),t.onChar(e.key),!0):e.code==="Backspace"?(e.preventDefault(),t.onBackspace(),!0):(e.code==="Enter"||e.code==="NumpadEnter")&&t.onEnter?(e.preventDefault(),e.repeat||t.onEnter(),!0):!1}pushText(e){this.textListeners.push(e)}popText(e){let t=this.textListeners.indexOf(e);t>=0&&this.textListeners.splice(t,1)}_press(e,t){let n=this.sources[e];n.size===0&&(this.down[e]=!0,this.pressedNow[e]=!0),n.add(t)}_release(e,t){let n=this.sources[e];n.has(t)&&(n.delete(t),n.size===0&&(this.down[e]=!1,this.releasedNow[e]=!0))}releaseAll(){for(let e of Cu)this.sources[e].clear(),this.down[e]=!1}poll(){let e=navigator.getGamepads?navigator.getGamepads():[];for(let t of e){if(!t)continue;let n=l=>t.buttons[l]&&t.buttons[l].pressed,s=t.axes[0]||0,r=t.axes[1]||0,a={confirm:n(0),cancel:n(1)||n(2),menu:n(3),pause:n(9),up:n(12)||r<-.5,down:n(13)||r>.5,left:n(14)||s<-.5,right:n(15)||s>.5},o="pad"+t.index;for(let l of Cu){let c=this.padPrev[o+l];a[l]&&!c&&(this._press(l,o),this.lastDevice="gamepad",this._gesture()),!a[l]&&c&&this._release(l,o),this.padPrev[o+l]=a[l]}}}endFrame(){this.pressedNow={},this.releasedNow={}}held(e){return this.down[e]}pressed(e){return!!this.pressedNow[e]}released(e){return!!this.releasedNow[e]}consume(e){let t=!!this.pressedNow[e];return this.pressedNow[e]=!1,t}axis(){let e=0,t=0;return this.down.left&&(e-=1),this.down.right&&(e+=1),this.down.up&&(t-=1),this.down.down&&(t+=1),{x:e,y:t}}touchPress(e,t){this.lastDevice="touch",this._press(e,"touch:"+t)}touchRelease(e,t){this._release(e,"touch:"+t)}},He=new Pu;var Iu=class{constructor(){this.time=0,this.realTime=0,this.mode=null,this.overlays=[],this.waiters=[],this.fadeAlpha=0,this.fadeColor="#000",this.fadeTween=null,this.topDrawers=new Set,this.paused=!1,this.flashAlpha=0,this.letterbox=0,this.letterboxTarget=0}init(e,t){this.engine=e,this.ui=t}setMode(e){this.mode&&this.mode.exit&&this.mode.exit(),this.mode=e,e&&e.enter&&e.enter()}wait(e){return new Promise(t=>this.waiters.push({t:this.time+e,resolve:t}))}frame(){return new Promise(e=>this.waiters.push({t:-1,resolve:e}))}async waitUntil(e){for(;!e();)await this.frame()}async waitConfirm(){for(await this.frame();!He.pressed("confirm");)await this.frame()}tween(e,t,n=s=>s){return new Promise(s=>{let r=this.time,a=()=>{let o=Math.min(1,(this.time-r)/Math.max(e,1e-4));t(n(o)),o>=1?s():this.frame().then(a)};a()})}fade(e,t=.5,n){n&&(this.fadeColor=n);let s=this.fadeAlpha;return this.tween(t,r=>{this.fadeAlpha=s+(e-s)*r})}fadeOut(e=.5,t="#000"){return this.fade(1,e,t)}fadeIn(e=.5){return this.fade(0,e)}flash(e=1){this.flashAlpha=e}pushOverlay(e){return this.overlays.push(e),e}removeOverlay(e){let t=this.overlays.indexOf(e);t>=0&&this.overlays.splice(t,1)}get busy(){return this.overlays.some(e=>e.blocking!==!1)}update(e){if(this.realTime+=e,this.paused){let s=this.overlays[this.overlays.length-1];s&&s.pauseOverlay&&s.update(e,!0);return}if(this.time+=e,this.waiters.length){let s=[];this.waiters=this.waiters.filter(r=>r.t<=this.time?(s.push(r),!1):!0);for(let r of s)r.resolve()}let t=this.busy,n=this.overlays[this.overlays.length-1];for(let s of[...this.overlays])s.update(e,s===n);this.mode&&this.mode.update(e,t||this.busy),this.flashAlpha=Math.max(0,this.flashAlpha-e*3),this.letterbox+=(this.letterboxTarget-this.letterbox)*Math.min(1,e*6)}draw(e){if(this.mode&&this.mode.draw&&this.mode.draw(e),this.letterbox>.002){let t=e.ctx,n=60*this.letterbox;t.save(),t.setTransform(1,0,0,1,0,0),t.fillStyle="#000";let s=e.canvas.height,r=e.canvas.width,a=n*e.scale*e.dpr+e.oy*e.dpr;t.fillRect(0,0,r,a),t.fillRect(0,s-a,r,a),t.restore()}for(let t of this.overlays)t.draw(e);this.fadeAlpha>.001&&e.fillScreen(this.fadeColor,this.fadeAlpha),this.flashAlpha>.001&&e.fillScreen("#fff",this.flashAlpha);for(let t of this.topDrawers)t(e)}},qe=new Iu;function Lu(i,e,t=1){let n=t===1?e.length:e[0].length,s=i.createBuffer(t,n,i.sampleRate);if(t===1)s.copyToChannel(e,0);else for(let r=0;r<t;r++)s.copyToChannel(e[r],r);return s}function gi(i,e,t,n=.002){let s=i.length,r=Math.max(1,Math.floor(n*e));for(let a of t){if(a.f<=0||a.f>=e*.45)continue;let o=2*Math.PI*a.f/e,l=Math.cos(o),c=Math.sin(o),h=Math.cos(a.phase||0),d=Math.sin(a.phase||0),u=a.amp,f=Math.exp(-1/(a.tau*e)),p=a.delay?Math.floor(a.delay*e):0;for(let y=p;y<s;y++){let m=y-p<r?(y-p)/r:1;i[y]+=u*d*m;let g=h*l-d*c;if(d=h*c+d*l,h=g,u*=f,u<1e-5)break}}return i}function Ot(i,e=.85){let t=0;for(let n=0;n<i.length;n++)t=Math.max(t,Math.abs(i[n]));if(t>0){let n=e/t;for(let s=0;s<i.length;s++)i[s]*=n}return i}function En(i,e,t=.05){let n=Math.min(i.length,Math.floor(t*e));for(let s=0;s<n;s++)i[i.length-1-s]*=s/n;return i}function vn(i=12345){let e=i>>>0;return()=>(e^=e<<13,e>>>=0,e^=e>>>17,e^=e<<5,e>>>=0,e/4294967296*2-1)}function tn(i,e,t,n,s=.707,r=0){let a=2*Math.PI*Math.min(n,e*.49)/e,o=Math.cos(a),c=Math.sin(a)/(2*s),h=Math.pow(10,r/40),d,u,f,p,y,m;switch(t){case"lowpass":d=(1-o)/2,u=1-o,f=(1-o)/2,p=1+c,y=-2*o,m=1-c;break;case"highpass":d=(1+o)/2,u=-(1+o),f=(1+o)/2,p=1+c,y=-2*o,m=1-c;break;case"bandpass":d=c,u=0,f=-c,p=1+c,y=-2*o,m=1-c;break;case"peak":d=1+c*h,u=-2*o,f=1-c*h,p=1+c/h,y=-2*o,m=1-c/h;break;default:return i}d/=p,u/=p,f/=p,y/=p,m/=p;let g=0,b=0,T=0,_=0;for(let S=0;S<i.length;S++){let w=i[S],R=d*w+u*g+f*b-y*T-m*_;b=g,g=w,_=T,T=R,i[S]=R}return i}function Nr(i,e,t,n={}){let s=Math.floor(i*t),r=new Float32Array(s),a=i/e,o=Math.max(2,Math.floor(a-.6)),l=a-.5-o,c=(1-l)/(1+l),h=new Float32Array(o),d=vn(n.seed??Math.floor(e*100)),u=n.bright??.5,f=0;for(let _=0;_<h.length;_++){let S=d();f=f+(S-f)*(.2+u*.8),h[_]=f}if(n.pickPos){let _=Math.floor(o*n.pickPos);for(let S=h.length-1;S>=_;S--)h[S]-=h[S-_]*.9}let p=n.damp??.996,y=n.blend??.5,m=0,g=0,b=0,T=0;for(let _=0;_<s;_++){let S=h[m],w=p*(S*y+g*(1-y));g=S;let R=c*w+b-c*T;b=w,T=R,r[_]=S,h[m]=R,m=m+1===o?0:m+1}return r}var xn=i=>440*Math.pow(2,(i-69)/12);function k1(i,e,t){let n=xn(e),s=Math.floor(i*t),r=new Float32Array(s),a=vn(e*7+1),o=18e-5+(e>72?(e-72)*3e-5:0),l=1.7*Math.pow(261.6/n,.45),c=[],h=[1,1.00055],d=[];for(let f=0;f<=28;f++)d.push(a()*Math.PI*.5);for(let f of h)for(let p=1;p<=28;p++){let y=p*n*Math.sqrt(1+o*p*p)*f;if(y>1e4)break;let m=1/Math.sqrt(1+Math.pow(y/2600,2)),g=.55+.45*Math.abs(Math.sin(Math.PI*p/8.3)),b=m*g/Math.pow(p,1.15)/h.length,T=d[p];c.push({f:y,amp:b*.62,tau:l*.32/(1+.12*(p-1)),phase:T}),c.push({f:y,amp:b*.38,tau:l*1.6/(1+.22*(p-1)),phase:T})}gi(r,i,c,.0015);let u=new Float32Array(Math.floor(i*.012));for(let f=0;f<u.length;f++)u[f]=a()*(1-f/u.length);tn(u,i,"bandpass",Math.min(4e3,n*6),1.2);for(let f=0;f<u.length;f++)r[f]+=u[f]*.05;return En(Ot(r,.8),i,.08)}function H1(i,e,t){let n=xn(e),s=new Float32Array(Math.floor(i*t));return gi(s,i,[{f:n,amp:1,tau:1.1},{f:n*2,amp:.08,tau:.5},{f:n*6.27,amp:.2,tau:.18},{f:n*17.55,amp:.07,tau:.05}],.001),En(Ot(s,.75),i)}function z1(i,e,t){let n=xn(e),s=new Float32Array(Math.floor(i*t));return gi(s,i,[{f:n,amp:1,tau:.9},{f:n*2.76,amp:.3,tau:.35},{f:n*5.4,amp:.12,tau:.12},{f:n*8.93,amp:.05,tau:.05}],.001),En(Ot(s,.75),i)}function G1(i,e,t){let n=xn(e),s=new Float32Array(Math.floor(i*t));return gi(s,i,[{f:n*.5,amp:.45,tau:2.6},{f:n,amp:.8,tau:1.8},{f:n*1.19,amp:.4,tau:1.2},{f:n*1.5,amp:.3,tau:.9},{f:n*2,amp:.55,tau:.8},{f:n*2.52,amp:.2,tau:.5},{f:n*3.01,amp:.15,tau:.35},{f:n*4.1,amp:.1,tau:.2}],.002),En(Ot(s,.75),i)}function V1(i,e,t){let n=xn(e),s=new Float32Array(Math.floor(i*t));return gi(s,i,[{f:n,amp:1,tau:.35},{f:n*3.93,amp:.25,tau:.08},{f:n*9.2,amp:.06,tau:.03}],.002),En(Ot(s,.8),i)}function W1(i,e,t){let n=xn(e),s=new Float32Array(Math.floor(i*t));return gi(s,i,[{f:n,amp:1,tau:.7},{f:n*2,amp:.05,tau:.3},{f:n*5.9,amp:.15,tau:.06},{f:n*13.1,amp:.05,tau:.02}],.001),En(Ot(s,.8),i)}function X1(i,e,t){let n=xn(e),s=Math.floor(i*t),r=new Float32Array(s),a=2*Math.PI*n/i;for(let o=0;o<s;o++){let l=o/i,c=.35+1.6*Math.exp(-l*3.5),h=Math.sin(a*14*o)*.6*Math.exp(-l*40),d=Math.sin(a*o)*c+h,u=Math.exp(-l*(.9+n/1200))*Math.min(1,l*800);r[o]=Math.sin(a*o+d)*u}return En(Ot(r,.75),i)}function $1(i,e,t){let n=Nr(i,xn(e),t,{bright:.35,damp:.9975,pickPos:.15,seed:e*31});return tn(n,i,"lowpass",5e3,.7),En(Ot(n,.8),i)}function q1(i,e,t){let n=Nr(i,xn(e),t,{bright:.4,damp:.9965,pickPos:.18,seed:e*17});return tn(n,i,"peak",180,.8,3),tn(n,i,"lowpass",4200,.7),En(Ot(n,.8),i)}function Y1(i,e,t){let n=Nr(i,xn(e),t,{bright:.3,damp:.985,pickPos:.2,seed:e*13});return tn(n,i,"lowpass",2600,.7),tn(n,i,"peak",400,1,2),En(Ot(n,.8),i)}function Z1(i,e,t){let n=Nr(i,xn(e),t,{bright:.95,damp:.998,pickPos:.08,seed:e*3}),s=Nr(i,xn(e+12),t,{bright:.95,damp:.997,pickPos:.1,seed:e*5});for(let r=0;r<n.length;r++)n[r]=n[r]+s[r]*.4;return tn(n,i,"highpass",120,.7),En(Ot(n,.8),i)}function J1(i,e,t){let n=xn(e),s=new Float32Array(Math.floor(i*t));gi(s,i,[{f:n,amp:1,tau:.9},{f:n*1.504,amp:.5,tau:.6},{f:n*1.742,amp:.3,tau:.45},{f:n*2,amp:.2,tau:.35},{f:n*2.245,amp:.1,tau:.25}],.003);let r=vn(99),a=new Float32Array(Math.floor(i*.06));for(let o=0;o<a.length;o++)a[o]=r()*Math.exp(-o/(i*.012));tn(a,i,"lowpass",900,.7);for(let o=0;o<a.length;o++)s[o]+=a[o]*.6;return En(Ot(s,.85),i)}function K1(i,e,t){let n=Math.floor(i*t),s=new Float32Array(n),r=vn(7),a=[0,7,12,16,19,24];for(let o of a){let l=xn(e+o);for(let c=-1;c<=1;c++){let h=l*(1+c*.004),d=r()*.5+.5;for(let u=0;u<n;u++)d+=h/i,d>1&&(d-=1),s[u]+=(2*d-1)*.15}}for(let o=0;o<n;o++){let l=o/i;s[o]=(s[o]+r()*.3*Math.exp(-l*30))*Math.exp(-l*5.5)*Math.min(1,l*400)}return tn(s,i,"lowpass",5200,.8),En(Ot(s,.85),i)}function j1(i){let e=Math.floor(i*.45),t=new Float32Array(e),n=0,s=vn(1);for(let r=0;r<e;r++){let a=r/i,o=44+120*Math.exp(-a*28);n+=2*Math.PI*o/i,t[r]=Math.sin(n)*Math.exp(-a*6.5)+(a<.004?s()*.5*(1-a/.004):0)}for(let r=0;r<e;r++)t[r]=Math.tanh(t[r]*1.6);return Ot(t,.95)}function Q1(i){let e=Math.floor(i*.32),t=new Float32Array(e),n=vn(2);for(let o=0;o<e;o++)t[o]=n();tn(t,i,"highpass",900,.7),tn(t,i,"peak",4500,1,4);let s=new Float32Array(e),r=0,a=0;for(let o=0;o<e;o++){let l=o/i;r+=2*Math.PI*185/i,a+=2*Math.PI*330/i,s[o]=t[o]*Math.exp(-l*16)*.8+(Math.sin(r)*.6+Math.sin(a)*.3)*Math.exp(-l*30)}return Ot(s,.9)}function Mc(i,e,t,n){let s=Math.floor(i*e),r=new Float32Array(s),a=[205.3,304.4,369.6,522.7,540,800].map(c=>c*1.7),o=a.map(()=>0),l=vn(n);for(let c=0;c<s;c++){let h=0;for(let d=0;d<a.length;d++)o[d]+=a[d]/i,o[d]>1&&(o[d]-=1),h+=o[d]<.5?1:-1;r[c]=h/6*.6+l()*.5}tn(r,i,"highpass",7e3,.7),tn(r,i,"highpass",6e3,.7);for(let c=0;c<s;c++)r[c]*=Math.exp(-(c/i)*t);return Ot(r,.8)}function eM(i){let e=Math.floor(i*1.8),t=new Float32Array(e),n=vn(3);for(let r=0;r<e;r++)t[r]=n();tn(t,i,"highpass",3e3,.6),tn(t,i,"peak",6e3,.8,5);let s=Mc(i,1.8,1.2,4);for(let r=0;r<e;r++){let a=r/i;t[r]=(t[r]*.7+s[r]*.5)*(Math.exp(-a*2.2)*.8+Math.exp(-a*12)*.4)}return Ot(t,.75)}function tM(i){let e=Math.floor(i*1.2),t=new Float32Array(e);gi(t,i,[{f:3200,amp:.3,tau:.6},{f:4570,amp:.25,tau:.5},{f:5310,amp:.2,tau:.4},{f:7110,amp:.15,tau:.3}]);let n=Mc(i,1.2,3.5,5);for(let s=0;s<e;s++)t[s]+=n[s]*.35;return Ot(t,.7)}function Du(i,e){let t=Math.floor(i*.5),n=new Float32Array(t),s=0,r=vn(e);for(let a=0;a<t;a++){let o=a/i,l=e*(1+.6*Math.exp(-o*18));s+=2*Math.PI*l/i,n[a]=Math.sin(s)*Math.exp(-o*7)+r()*.08*Math.exp(-o*40)}return Ot(n,.9)}function nM(i){let e=Math.floor(i*.4),t=new Float32Array(e),n=vn(6);for(let s=0;s<e;s++){let r=s/i,a=0;for(let o of[0,.011,.022])r>=o&&(a=Math.max(a,Math.exp(-(r-o)*180)));a=Math.max(a,r>.03?Math.exp(-(r-.03)*14)*.6:0),t[s]=n()*a}return tn(t,i,"bandpass",1200,1.1),Ot(t,.85)}function iM(i){let e=Math.floor(i*.08),t=new Float32Array(e);return gi(t,i,[{f:1700,amp:1,tau:.012},{f:510,amp:.6,tau:.02}],5e-4),Ot(t,.8)}function sM(i){let e=Math.floor(i*.12),t=new Float32Array(e),n=vn(8);for(let s=0;s<e;s++){let r=s/i;t[s]=n()*Math.min(1,r*120)*Math.exp(-r*45)}return tn(t,i,"highpass",5e3,.7),Ot(t,.6)}var zp=["kick","clap","snare","rim","hat","ohat","ride","tomlo","tommid","tomhi","shaker","crash"];function Gp(i){let e=i.sampleRate,t={},n=(r,a,o,l)=>{t[r]=o.map((c,h)=>({root:c,buffer:Lu(i,a(e,c,Array.isArray(l)?l[h]:l))}))};n("piano",k1,[36,48,60,72,84],[3.4,3,2.4,1.8,1.3]),n("musicbox",H1,[72,84,96],1.8),n("glock",z1,[72,84,96],1.6),n("bell",G1,[48,60,72,84],[4,3.5,3,2.5]),n("marimba",V1,[48,60,72,84],1),n("kalimba",W1,[60,72,84],1.4),n("epiano",X1,[48,60,72,84],[2.6,2.2,1.8,1.4]),n("harp",$1,[36,48,60,72,84],[3,2.6,2.2,1.8,1.4]),n("guitar",q1,[40,52,64,76],[2.4,2.2,1.8,1.4]),n("pizz",Y1,[43,55,67,79],.7),n("harpsi",Z1,[48,60,72,84],[1.8,1.6,1.3,1]),n("timpani",J1,[41,48],2.2),n("orchhit",K1,[60],.9);let s={kick:j1(e),snare:Q1(e),hat:Mc(e,.12,38,11),ohat:Mc(e,.5,7,12),crash:eM(e),ride:tM(e),tomlo:Du(e,95),tommid:Du(e,130),tomhi:Du(e,175),clap:nM(e),rim:iM(e),shaker:sM(e)};t.drums={};for(let r in s)t.drums[r]=Lu(i,s[r]);return t}var Vp="undersoul.save.v1",Wp="undersoul.meta.v1",Xp="undersoul.settings.v1";function Sc(i){try{return JSON.parse(localStorage.getItem(i))}catch{return null}}function $p(i,e){try{return localStorage.setItem(i,JSON.stringify(e)),!0}catch{return!1}}var Uu={skin:2,hair:0,hairColor:1,eyes:0,shirt:0,stripe:0,pants:0,shoes:0,accessory:0};function bc(){return{name:"KID",look:{...Uu},soul:"determination",lv:1,exp:0,hope:1,hopeExp:0,hp:20,gold:0,items:[],box:[],weapon:"twig",armor:"bandage",skills:[],bonusSP:0,room:"h1",spawn:"default",pos:null,flags:{},kills:{hollows:0,frostmere:0,echofall:0,emberdeep:0,capital:0},spares:0,totalKills:0,bosses:{},playTime:0,saveRoomName:""}}var nn=bc();function qp(i,e,t){return nn=bc(),nn.name=i,nn.look={...e},nn.soul=t,nn}function Yp(){let i=Sc(Vp);return i?(nn=Object.assign(bc(),i),nn.kills=Object.assign(bc().kills,i.kills||{}),!0):!1}function Zp(){return Sc(Vp)}function no(){return Sc(Wp)||{}}function rM(i){$p(Wp,i)}function Jp(i,e){let t=no();return e===void 0?t[i]:(t[i]=e,rM(t),e)}var tt=Object.assign({master:.8,music:.75,sfx:.85,quality:2,pixel:!1,shake:!0,textSpeed:1},Sc(Xp)||{});function vi(){$p(Xp,tt)}var aM={piano:{kind:"sample",bank:"piano",gain:.85,release:.35,velFilter:!0},musicbox:{kind:"sample",bank:"musicbox",gain:.5,release:.9},glock:{kind:"sample",bank:"glock",gain:.45,release:.7},bell:{kind:"sample",bank:"bell",gain:.55,release:2.5},marimba:{kind:"sample",bank:"marimba",gain:.75,release:.3},kalimba:{kind:"sample",bank:"kalimba",gain:.6,release:.6},epiano:{kind:"sample",bank:"epiano",gain:.6,release:.4,velFilter:!0},harp:{kind:"sample",bank:"harp",gain:.75,release:1.5},guitar:{kind:"sample",bank:"guitar",gain:.7,release:.25},pizz:{kind:"sample",bank:"pizz",gain:.75,release:.2},harpsi:{kind:"sample",bank:"harpsi",gain:.5,release:.2},timpani:{kind:"sample",bank:"timpani",gain:.9,release:1.2},orchhit:{kind:"sample",bank:"orchhit",gain:.7,release:.2},drums:{kind:"drums",gain:.85},square:{kind:"osc",wave:"pulse50",a:.004,d:.15,s:.7,r:.05,gain:.13,vib:[.2,5.6,14]},pulse25:{kind:"osc",wave:"pulse25",a:.004,d:.15,s:.7,r:.05,gain:.13,vib:[.2,5.6,14]},pulse12:{kind:"osc",wave:"pulse12",a:.003,d:.12,s:.65,r:.04,gain:.14,vib:[.2,5.8,12]},chip:{kind:"osc",wave:"pulse25",a:.002,d:.08,s:.5,r:.02,gain:.11},tri:{kind:"osc",wave:"triangle",a:.003,d:.2,s:.9,r:.04,gain:.42},sine:{kind:"osc",wave:"sine",a:.01,d:.2,s:.8,r:.15,gain:.3,vib:[.3,5,10]},saw:{kind:"osc",wave:"sawtooth",a:.005,d:.2,s:.7,r:.08,gain:.08,filter:{f:2600,q:.7}},strings:{kind:"osc",wave:"sawtooth",unison:[-9,0,9],a:.14,d:.3,s:.85,r:.45,gain:.05,filter:{f:2e3,vel:1800,q:.6},vib:[.35,5,9]},slowstr:{kind:"osc",wave:"sawtooth",unison:[-10,0,10],a:.55,d:.5,s:.9,r:.9,gain:.045,filter:{f:1700,vel:1200,q:.5},vib:[.5,4.6,8]},brass:{kind:"osc",wave:"sawtooth",unison:[-5,5],a:.035,d:.25,s:.75,r:.14,gain:.07,filter:{f:500,env:[2600,.08,1500],q:1.2},vib:[.3,5.4,12]},flute:{kind:"osc",wave:"flute",a:.05,d:.1,s:.9,r:.12,gain:.24,breath:.08,vib:[.2,5.2,16]},ocarina:{kind:"osc",wave:"sine",a:.03,d:.1,s:.85,r:.1,gain:.3,breath:.05,vib:[.25,5.5,18]},choir:{kind:"choir",a:.28,d:.3,s:.9,r:.6,gain:.06,vib:[.4,4.6,10]},organ:{kind:"osc",wave:"organ",a:.01,d:.05,s:1,r:.08,gain:.1,trem:[6.2,.18]},bass:{kind:"osc",wave:"sawtooth",sub:.5,a:.004,d:.35,s:.55,r:.06,gain:.2,filter:{f:240,env:[1300,.1,420],q:1}},synbass:{kind:"osc",wave:"pulse25",a:.003,d:.2,s:.6,r:.04,gain:.16,filter:{f:280,env:[2600,.07,600],q:5}},lead:{kind:"osc",wave:"sawtooth",unison:[-6,6],a:.008,d:.2,s:.7,r:.1,gain:.06,filter:{f:3600,q:1},vib:[.25,5.5,15]},dguitar:{kind:"osc",wave:"sawtooth",unison:[-9,9],a:.003,d:.4,s:.75,r:.08,gain:.05,filter:{f:3e3,q:.8}},accordion:{kind:"osc",wave:"pulse25",unison:[0,11],a:.03,d:.1,s:.9,r:.08,gain:.07,filter:{f:2400,q:.8},trem:[5,.12]},pad:{kind:"osc",wave:"sawtooth",unison:[-14,0,14],a:.9,d:.5,s:.9,r:1.6,gain:.035,filter:{f:1100,q:.6}},bellpad:{kind:"osc",wave:"triangle",unison:[-6,6],a:.6,d:.5,s:.9,r:1.8,gain:.12,vib:[.8,4,6]},whistle:{kind:"osc",wave:"sine",a:.04,d:.1,s:.9,r:.08,gain:.22,breath:.03,vib:[.15,6,22]}},Nu=class{constructor(){this.ready=!1,this.ctx=null}init(e){if(this.ctx&&!e)return;let t=window.AudioContext||window.webkitAudioContext;if(!t&&!e)return;this.ctx=e||new t({latencyHint:"interactive"});let n=this.ctx;this.limiter=n.createDynamicsCompressor(),this.limiter.threshold.value=-8,this.limiter.knee.value=8,this.limiter.ratio.value=10,this.limiter.attack.value=.003,this.limiter.release.value=.25,this.limiter.connect(n.destination),this.master=n.createGain(),this.master.connect(this.limiter),this.musicOut=n.createGain(),this.musicFilter=n.createBiquadFilter(),this.musicFilter.type="lowpass",this.musicFilter.frequency.value=2e4,this.musicFilter.Q.value=.5,this.musicOut.connect(this.musicFilter),this.musicMakeup=n.createGain(),this.musicMakeup.gain.value=2.2,this.musicFilter.connect(this.musicMakeup),this.musicMakeup.connect(this.master),this.sfxOut=n.createGain(),this.sfxOut.connect(this.master),this.reverbIn=n.createGain(),this.convolver=n.createConvolver(),this.convolver.buffer=this.makeImpulse(2.8,.62),this.reverbOut=n.createGain(),this.reverbOut.gain.value=.55,this.reverbIn.connect(this.convolver),this.convolver.connect(this.reverbOut),this.reverbOut.connect(this.musicMakeup),this.musicSend=n.createGain(),this.musicSend.connect(this.reverbIn),this.musicEchoSend=n.createGain(),this.sfxReverbIn=n.createGain(),this.sfxReverbIn.connect(this.convolver),this.echoIn=n.createGain(),this.echoDelay=n.createDelay(2),this.echoDelay.delayTime.value=.36,this.echoFb=n.createGain(),this.echoFb.gain.value=.32,this.echoLp=n.createBiquadFilter(),this.echoLp.type="lowpass",this.echoLp.frequency.value=2600,this.musicEchoSend.connect(this.echoIn),this.echoIn.connect(this.echoDelay),this.echoDelay.connect(this.echoLp),this.echoLp.connect(this.echoFb),this.echoFb.connect(this.echoDelay);let s=n.createGain();s.gain.value=.5,this.echoLp.connect(s),s.connect(this.musicMakeup),s.connect(this.reverbIn),this.waves=this.makeWaves(),this.noiseBuf=this.makeNoise(2),this.bank=Gp(n),this.applyVolumes(),this.ready=!0}resume(){this.ctx&&this.ctx.state!=="running"&&this.ctx.resume()}applyVolumes(){if(!this.ctx)return;let e=this.ctx.currentTime;this.master.gain.setTargetAtTime(tt.master,e,.05),this.musicOut.gain.setTargetAtTime(tt.music,e,.05),this.musicSend.gain.setTargetAtTime(tt.music,e,.05),this.musicEchoSend.gain.setTargetAtTime(tt.music,e,.05),this.sfxOut.gain.setTargetAtTime(tt.sfx,e,.05)}makeImpulse(e,t){let n=this.ctx,s=n.sampleRate,r=Math.floor(s*e),a=n.createBuffer(2,r,s);for(let o=0;o<2;o++){let l=a.getChannelData(o),c=vn(77+o*1e3),h=0;for(let d=0;d<r;d++){let u=d/s,f=9e3*Math.exp(-u*1.6)+900,p=1-Math.exp(-2*Math.PI*f/s);h+=p*(c()-h);let y=u<.012?0:1;l[d]=h*Math.exp(-u/t)*y*.9}for(let[d,u]of[[.013,.5],[.021,.35],[.034,.3],[.047,.22]]){let f=Math.floor((d+o*.003)*s);f<r&&(l[f]+=u)}}return a}makeNoise(e){let t=this.ctx,n=Math.floor(t.sampleRate*e),s=t.createBuffer(1,n,t.sampleRate),r=s.getChannelData(0),a=vn(4242);for(let o=0;o<n;o++)r[o]=a();return s}makeWaves(){let e=this.ctx,t=48,n=r=>{let a=new Float32Array(t),o=new Float32Array(t);for(let l=1;l<t;l++)a[l]=2*Math.sin(Math.PI*l*r)/(Math.PI*l);return e.createPeriodicWave(a,o)},s=r=>{let a=new Float32Array(r.length+1),o=new Float32Array(r.length+1);return r.forEach((l,c)=>{o[c+1]=l}),e.createPeriodicWave(a,o)};return{pulse50:n(.5),pulse25:n(.25),pulse12:n(.125),flute:s([1,.12,.06,.02]),organ:s([1,.7,.45,.5,0,.3,0,.35,0,0,0,.15])}}setOsc(e,t){this.waves[t]?e.setPeriodicWave(this.waves[t]):e.type=t}playNote(e,t,n,s,r,a,o={}){let l=aM[e];if(!l)return;let c=o.pitch||0;return l.kind==="sample"?this.playSample(l,t+c,n,s,r,a,o):l.kind==="drums"?this.playDrum(t,n,r,a,l,o):l.kind==="choir"?this.playChoir(l,t+c,n,s,r,a):this.playOsc(l,t+c,n,s,r,a)}playSample(e,t,n,s,r,a,o){let l=this.ctx,c=this.bank[e.bank],h=c[0];for(let m of c)Math.abs(m.root-t)<Math.abs(h.root-t)&&(h=m);let d=l.createBufferSource();d.buffer=h.buffer,d.playbackRate.value=Math.pow(2,(t-h.root)/12);let u=l.createGain(),f=e.gain*r*r;u.gain.setValueAtTime(f,n);let p=n+(o.ring?h.buffer.duration:s);u.gain.setValueAtTime(f,p),u.gain.setTargetAtTime(0,p,e.release/4);let y=d;if(e.velFilter){let m=l.createBiquadFilter();m.type="lowpass",m.frequency.value=1400+r*r*11e3,m.Q.value=.3,d.connect(m),y=m}y.connect(u),u.connect(a),d.start(n),d.stop(Math.min(n+h.buffer.duration/d.playbackRate.value,p+e.release*1.5)+.05)}playDrum(e,t,n,s,r,a){let o=zp[(e%12+12)%12],l=this.bank.drums[o];if(!l)return;let c=this.ctx,h=c.createBufferSource();h.buffer=l,a.pitch&&(h.playbackRate.value=Math.pow(2,a.pitch/24));let d=c.createGain();d.gain.value=r.gain*n*n,h.connect(d),d.connect(s),h.start(t)}playOsc(e,t,n,s,r,a){let o=this.ctx,l=440*Math.pow(2,(t-69)/12),c=o.createGain(),h=e.gain*(.35+.65*r),d=e.a,u=e.d,f=e.s,p=e.r,y=c.gain;y.setValueAtTime(0,n),y.linearRampToValueAtTime(h,n+d),y.setTargetAtTime(h*f,n+d,u/3);let m=n+Math.max(s,d+.01);y.cancelScheduledValues(m),y.setTargetAtTime(0,m,p/4);let g=m+p*1.6+.05,b=c;if(e.filter){let R=o.createBiquadFilter();R.type="lowpass",R.Q.value=e.filter.q??.7;let v=e.filter.f+(e.filter.vel?e.filter.vel*r:0);if(e.filter.env){let[E,C,I]=e.filter.env;R.frequency.setValueAtTime(v,n),R.frequency.linearRampToValueAtTime(E*(.6+r*.5),n+.005),R.frequency.setTargetAtTime(I,n+.005,C)}else R.frequency.value=v;R.connect(c),b=R}let T=null,_=null;if(e.vib&&s>e.vib[0]&&(_=o.createOscillator(),_.frequency.value=e.vib[1],T=o.createGain(),T.gain.setValueAtTime(0,n),T.gain.setValueAtTime(0,n+e.vib[0]),T.gain.linearRampToValueAtTime(e.vib[2],n+e.vib[0]+.3),_.connect(T),_.start(n),_.stop(g)),e.trem){let R=o.createOscillator();R.frequency.value=e.trem[0];let v=o.createGain();v.gain.value=e.trem[1]*h,R.connect(v),v.connect(c.gain),R.start(n),R.stop(g)}let S=e.unison||[0],w=1/Math.sqrt(S.length);for(let R of S){let v=o.createOscillator();this.setOsc(v,e.wave),v.frequency.value=l,v.detune.value=R,T&&T.connect(v.detune);let E=o.createGain();E.gain.value=w,v.connect(E),E.connect(b),v.start(n),v.stop(g)}if(e.sub){let R=o.createOscillator();R.type="sine",R.frequency.value=l/2;let v=o.createGain();v.gain.value=e.sub*2.2,R.connect(v),v.connect(c),R.start(n),R.stop(g)}if(e.breath){let R=o.createBufferSource();R.buffer=this.noiseBuf,R.loop=!0;let v=o.createBiquadFilter();v.type="bandpass",v.frequency.value=Math.min(9e3,l*2),v.Q.value=2;let E=o.createGain();E.gain.setValueAtTime(0,n),E.gain.linearRampToValueAtTime(e.breath*4,n+.02),E.gain.setTargetAtTime(e.breath,n+.02,.05),R.connect(v),v.connect(E),E.connect(c),R.start(n,Math.random()*1.5),R.stop(g)}c.connect(a)}playChoir(e,t,n,s,r,a){let o=this.ctx,l=440*Math.pow(2,(t-69)/12),c=o.createGain(),h=e.gain*(.4+.6*r);c.gain.setValueAtTime(0,n),c.gain.linearRampToValueAtTime(h,n+e.a);let d=n+Math.max(s,e.a);c.gain.setValueAtTime(h,d),c.gain.setTargetAtTime(0,d,e.r/4);let u=d+e.r*1.6+.05,f=o.createGain(),p=[[750,6,1],[1150,8,.55],[2800,12,.22],[350,3,.4]];for(let[g,b,T]of p){let _=o.createBiquadFilter();_.type="bandpass",_.frequency.value=g,_.Q.value=b;let S=o.createGain();S.gain.value=T*3,f.connect(_),_.connect(S),S.connect(c)}let y=o.createOscillator();y.frequency.value=e.vib[1];let m=o.createGain();m.gain.setValueAtTime(0,n),m.gain.linearRampToValueAtTime(e.vib[2],n+e.vib[0]+.2),y.connect(m),y.start(n),y.stop(u);for(let g of[-7,6]){let b=o.createOscillator();b.type="sawtooth",b.frequency.value=l,b.detune.value=g,m.connect(b.detune),b.connect(f),b.start(n),b.stop(u)}c.connect(a)}},oe=new Nu;var oM=Math.PI*2;var Kp={linear:i=>i,inQuad:i=>i*i,outQuad:i=>1-(1-i)*(1-i),inOutQuad:i=>i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2,outCubic:i=>1-Math.pow(1-i,3),inCubic:i=>i*i*i,inOutCubic:i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2,outBack:i=>1+2.70158*Math.pow(i-1,3)+1.70158*Math.pow(i-1,2),outElastic:i=>i===0||i===1?i:Math.pow(2,-10*i)*Math.sin((i*10-.75)*(oM/3))+1,inOutSine:i=>-(Math.cos(Math.PI*i)-1)/2};function Ec(i=1){let e=i>>>0,t=()=>{e=e+1831565813>>>0;let n=e;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296};return{next:t,range:(n,s)=>n+(s-n)*t(),int:(n,s)=>Math.floor(n+(s-n+1)*t()),pick:n=>n[Math.floor(t()*n.length)],chance:n=>t()<n,sign:()=>t()<.5?-1:1}}function jp(i){let e=Math.floor(i/60),t=Math.floor(i%60);return`${e}:${String(t).padStart(2,"0")}`}var wc={c:0,d:2,e:4,f:5,g:7,a:9,b:11};function Qp(i,e,t,n){let s=0;for(let r=e;r<i.length;r++)if(i[r]===t)s++;else if(i[r]===n&&(s--,s===0))return r;throw new Error("MML: unbalanced "+t)}function lM(i,e){let t=[],n=0,s=0;for(let r=0;r<i.length;r++)i[r]==="["?n++:i[r]==="]"?n--:i[r]===e&&n===0&&(t.push(i.slice(s,r)),s=r+1);return t.push(i.slice(s)),t}function Ou(i,e,t){let n=0,s=()=>{let l=/^-?\d+/.exec(i.slice(n,n+6));return l?(n+=l[0].length,parseInt(l[0],10)):null},r=l=>{let c=l/2,h=l;for(;i[n]===".";)h+=c,c/=2,n++;return h},a=()=>{let l=s(),c=r(l?4/l:e.len);for(;i[n]==="^";){n++;let h=s();c+=r(h?4/h:e.len)}return c},o=(l,c)=>{t.push({t:e.t,d:c,m:l+e.tr,v:e.vel/15,g:e.gate,ins:e.ins})};for(;n<i.length;){let l=i[n];if(l===" "||l===`
`||l==="	"||l==="\r"||l==="|"){n++;continue}if(wc[l]!==void 0){n++;let c=wc[l];for(;i[n]==="+"||i[n]==="#";)c++,n++;for(;i[n]==="-";)c--,n++;let h=a();o((e.oct+1)*12+c,h),e.t+=h;continue}switch(l){case"r":{n++,e.t+=a();break}case"o":{n++,e.oct=s()??4;break}case"<":{n++,e.oct--;break}case">":{n++,e.oct++;break}case"l":{n++;let c=s();e.len=r(4/(c||4));break}case"v":{n++,e.vel=s()??12;break}case"q":{n++,e.gate=(s()??7)/8;break}case"k":{n++,e.tr=s()??0;break}case"L":{n++,e.loopAt=e.t;break}case"@":{n++;let c=/^[a-z0-9_]+/.exec(i.slice(n));c&&(e.ins=c[0],n+=c[0].length);break}case"[":{let c=Qp(i,n,"[","]"),h=i.slice(n+1,c);n=c+1;let d=s()??2,u=lM(h,"|");for(let f=0;f<d;f++)Ou(u[0],e,t),u.length>1&&f<d-1&&Ou(u.slice(1).join("|"),e,t);break}case"(":{let c=Qp(i,n,"(",")"),h=i.slice(n+1,c);n=c+1;let d=e.oct,u=[];for(let p=0;p<h.length;p++){let y=h[p];if(wc[y]!==void 0){let m=wc[y];for(;h[p+1]==="+"||h[p+1]==="#";)m++,p++;for(;h[p+1]==="-";)m--,p++;u.push((d+1)*12+m)}else y==="<"?d--:y===">"?d++:y==="o"&&(d=parseInt(h[p+1],10),p++)}let f=a();for(let p of u)o(p,f);e.t+=f;break}case";":{for(;n<i.length&&i[n]!==`
`;)n++;break}default:console.warn("MML: unexpected",JSON.stringify(l),"near",JSON.stringify(i.slice(Math.max(0,n-12),n+12))),n++}}}function cM(i,e){let t={t:0,oct:4,len:1,vel:12,gate:.92,tr:0,ins:e,loopAt:null},n=[];return Ou(i.replace(/;[^\n]*/g,""),t,n),n.sort((s,r)=>s.t-r.t),{events:n,length:t.t,loopAt:t.loopAt}}var tm={},Fu={};function nm(i){Object.assign(tm,i)}function em(i){if(Fu[i])return Fu[i];let e=tm[i];if(!e)return null;let t=e.ch.map(a=>({...a,...cM(a.mml,a.ins)})),n=0;for(let a of t)n=Math.max(n,a.length);let s=t.find(a=>a.loopAt!=null)?.loopAt??0,r={id:i,def:e,chans:t,length:e.length??n,loopAt:s};return Fu[i]=r,r}var Tc=class{constructor(e,t){let n=oe.ctx;this.p=e,this.def=e.def,this.rate=t.rate??1,this.pitch=t.pitch??0,this.loop=this.def.loop!==!1&&t.loop!==!1,this.spb=60/(this.def.bpm*this.rate),this.start=n.currentTime+.08,this.rng=Ec(t.seed??1234),this.swing=this.def.swing??0,this.out=n.createGain(),this.out.gain.value=0;let s=(t.volume??1)*(this.def.volume??1);this.out.gain.setValueAtTime(0,n.currentTime),this.out.gain.linearRampToValueAtTime(s,n.currentTime+Math.max(.01,t.fade??.02)),this.out.connect(oe.musicOut),this.done=!1,this.chans=e.chans.map(r=>{let a=n.createGain();a.gain.value=r.vol??.7;let o=n.createStereoPanner();o.pan.value=r.pan??0,a.connect(o);let l=o;if(r.lp){let c=n.createBiquadFilter();c.type="lowpass",c.frequency.value=r.lp,l.connect(c),l=c}if(r.dist){let c=n.createWaveShaper();c.curve=hM(r.dist),c.oversample="2x";let h=n.createBiquadFilter();h.type="lowpass",h.frequency.value=3800,l.connect(c),c.connect(h),l=h}if(l.connect(this.out),r.rev){let c=n.createGain();c.gain.value=r.rev,l.connect(c),c.connect(oe.musicSend),this.sends=(this.sends||[]).concat(c)}if(r.echo){let c=n.createGain();c.gain.value=r.echo,l.connect(c),c.connect(oe.musicEchoSend),this.sends=(this.sends||[]).concat(c)}return{src:r,input:a,idx:0,cycle:0}}),oe.echoDelay.delayTime.setValueAtTime(Math.min(1.9,this.spb*(this.def.echoBeats??.75)),n.currentTime)}beatToTime(e){return this.start+e*this.spb}pump(e){if(this.done)return;let t=this.p.length,n=t-this.p.loopAt,s=!1;for(let r of this.chans){let a=r.src.events,o=0;for(;o++<400;){if(r.idx>=a.length){if(!this.loop||n<=.001)break;if(r.cycle+=n,r.idx=a.findIndex(y=>y.t>=this.p.loopAt-1e-6),r.idx<0){r.idx=a.length;break}}let l=a[r.idx],c=l.t+r.cycle;this.swing&&Math.abs(l.t%1-.5)<.001&&(c+=this.swing*.5);let h=this.beatToTime(c);if(h>e){s=!0;break}if(r.idx++,h<oe.ctx.currentTime-.05)continue;let d=l.ins==="drums",u=(this.rng.next()-.5)*(d?.004:.01),f=l.v*(1+(this.rng.next()-.5)*.12);Math.abs(l.t%4)<.001?f*=1.06:Math.abs(l.t%1)<.001&&(f*=1.02),f=Math.min(1,f);let p=l.d*this.spb*l.g;oe.playNote(l.ins,l.m,Math.max(oe.ctx.currentTime,h+u),p,f,r.input,{pitch:this.pitch}),s=!0}}if(!this.loop&&!s){let r=this.beatToTime(t);oe.ctx.currentTime>r+2&&(this.done=!0)}}beat(){let e=(oe.ctx.currentTime-this.start)/this.spb;if(!this.loop||e<this.p.length)return e;let t=this.p.length-this.p.loopAt;return this.p.loopAt+(e-this.p.loopAt)%t}stop(e=.5){let n=oe.ctx.currentTime;this.out.gain.cancelScheduledValues(n),this.out.gain.setValueAtTime(this.out.gain.value,n),this.out.gain.linearRampToValueAtTime(0,n+Math.max(.01,e));for(let s of this.sends||[])s.gain.setValueAtTime(s.gain.value,n),s.gain.linearRampToValueAtTime(0,n+Math.max(.01,e));this.done=!0,setTimeout(()=>{try{this.out.disconnect()}catch{}for(let s of this.sends||[])try{s.disconnect()}catch{}},(e+4)*1e3)}};function hM(i){let t=new Float32Array(1024);for(let n=0;n<1024;n++){let s=n*2/1024-1;t[n]=Math.tanh(s*i)/Math.tanh(i)}return t}var Bu=class{constructor(){this.player=null,this.currentId=null,this.stack=[],this.timer=null}ensureTimer(){this.timer||(this.timer=setInterval(()=>this.pump(),25))}pump(){if(!oe.ctx)return;let e=oe.ctx.currentTime+.15;if(this.player&&this.player.pump(e),this.oneShots){for(let t of this.oneShots)t.pump(e);this.oneShots=this.oneShots.filter(t=>!t.done)}}play(e,t={}){if(!oe.ready){this.pending=[e,t];return}if(e===this.currentId&&this.player&&!t.restart&&(t.rate??1)===this.player.rate&&(t.pitch??0)===this.player.pitch)return;let n=em(e);if(!n){console.warn("no track",e);return}this.player&&this.player.stop(t.fadeOut??.4),this.player=new Tc(n,t),this.currentId=e,this.currentOpts=t,this.ensureTimer(),this.pump()}jingle(e,t={}){if(!oe.ready)return;let n=em(e);if(!n)return;let s=new Tc(n,{...t,loop:!1});return this.oneShots=(this.oneShots||[]).concat(s),this.ensureTimer(),this.pump(),s}stop(e=.5){this.player&&this.player.stop(e),this.player=null,this.currentId=null}push(e=.3){this.stack.push([this.currentId,this.currentOpts]),this.stop(e)}pop(e=.6){let[t,n]=this.stack.pop()||[];t&&this.play(t,{...n||{},fade:e,restart:!0})}muffle(e,t=.4){if(!oe.ctx)return;let n=oe.musicFilter.frequency;n.cancelScheduledValues(oe.ctx.currentTime),n.setTargetAtTime(e?700:2e4,oe.ctx.currentTime,t/3)}beat(){return this.player?this.player.beat():0}},In=new Bu;var Os=()=>oe.ctx;function sm(i,e,t,n,s,r=0){i.gain.setValueAtTime(1e-4,e),i.gain.linearRampToValueAtTime(n,e+t),r>0?i.gain.setTargetAtTime(n*r,e+t,s/3):i.gain.exponentialRampToValueAtTime(1e-4,e+t+s)}function Be(i){let e=Os(),t=(i.t??e.currentTime)+(i.delay??0),n=e.createOscillator();oe.setOsc(n,i.wave??"square");let s=i.f;n.frequency.setValueAtTime(s,t),i.f2&&(i.lin?n.frequency.linearRampToValueAtTime(i.f2,t+(i.glide??i.d)):n.frequency.exponentialRampToValueAtTime(Math.max(1,i.f2),t+(i.glide??i.d)));let r=e.createGain();sm(r,t,i.a??.002,i.v??.2,i.d??.1);let a=n;if(i.lp){let o=e.createBiquadFilter();o.type="lowpass",o.frequency.value=i.lp,n.connect(o),a=o}return a.connect(r),Cc(r,i),n.start(t),n.stop(t+(i.a??.002)+(i.d??.1)+.05),n}function mt(i){let e=Os(),t=(i.t??e.currentTime)+(i.delay??0),n=e.createBufferSource();n.buffer=oe.noiseBuf,n.loop=!0;let s=e.createBiquadFilter();s.type=i.type??"bandpass",s.frequency.setValueAtTime(i.f??2e3,t),i.f2&&s.frequency.exponentialRampToValueAtTime(i.f2,t+(i.glide??i.d??.1)),s.Q.value=i.q??1;let r=e.createGain();sm(r,t,i.a??.002,i.v??.2,i.d??.1),n.connect(s),s.connect(r),Cc(r,i),n.start(t,Math.random()*1.5),n.stop(t+(i.a??.002)+(i.d??.1)+.05)}function Cc(i,e){let t=Os(),n=i;if(e.pan){let s=t.createStereoPanner();s.pan.value=e.pan,i.connect(s),n=s}if(n.connect(oe.sfxOut),e.rev){let s=t.createGain();s.gain.value=e.rev,n.connect(s),s.connect(oe.sfxReverbIn)}}function _n(i,e,t={}){let n=Os(),s=oe.bank[i],r=s[0];for(let c of s)Math.abs(c.root-e)<Math.abs(r.root-e)&&(r=c);let a=n.currentTime+(t.delay??0),o=n.createBufferSource();o.buffer=r.buffer,o.playbackRate.value=Math.pow(2,(e-r.root)/12);let l=n.createGain();l.gain.value=t.v??.3,o.connect(l),Cc(l,t),o.start(a)}function Fr(i,e={}){let t=Os(),n=t.createBufferSource();n.buffer=oe.bank.drums[i],n.playbackRate.value=e.rate??1;let s=t.createGain();s.gain.value=e.v??.5,n.connect(s),Cc(s,e),n.start(t.currentTime+(e.delay??0))}var jt=(i,e=.04)=>i*(1+(Math.random()-.5)*2*e),Ac=i=>440*Math.pow(2,(i-69)/12),im={narrator:{wave:"pulse50",f:392,jit:0,d:.045,v:.07,lp:3e3},default:{wave:"pulse50",f:440,jit:1,d:.045,v:.07,lp:2800},sprig:{wave:"sine",f:860,jit:2,d:.05,v:.13,f2:780},sprig_evil:{wave:"sawtooth",f:180,jit:1,d:.06,v:.1,lp:1400},willow:{wave:"triangle",f:520,jit:.5,d:.07,v:.2,f2:500},wick:{wave:"triangle",f:196,jit:.5,d:.06,v:.26,f2:185},taper:{wave:"pulse25",f:330,jit:2,d:.05,v:.09,lp:2400},maris:{wave:"pulse50",f:262,jit:1.5,d:.05,v:.09,lp:1800},lotl:{wave:"pulse12",f:620,jit:1.5,d:.035,v:.08,lp:3800},luxe:{wave:"sawtooth",f:311,jit:3,d:.05,v:.06,lp:2600,ring:!0},king:{wave:"triangle",f:131,jit:.3,d:.09,v:.3,f2:125},echo:{wave:"sine",f:660,jit:.3,d:.09,v:.1,rev:.5},wren:{wave:"sine",f:247,jit:0,d:.08,v:.14,rev:.4,f2:233},monster:{wave:"pulse25",f:494,jit:2,d:.04,v:.07,lp:3e3},low:{wave:"pulse50",f:220,jit:1,d:.05,v:.08,lp:1600},high:{wave:"pulse25",f:740,jit:2,d:.035,v:.06,lp:4200},hush:{wave:"sine",f:330,jit:.5,d:.1,v:.12,rev:.4,f2:300},silk:{wave:"pulse12",f:587,jit:1,d:.04,v:.07,lp:3600},tuft:{wave:"pulse25",f:523,jit:3,d:.035,v:.07,lp:3600},rowan:{wave:"triangle",f:392,jit:.5,d:.07,v:.2,rev:.3}},ze={voice(i="default"){if(!oe.ready)return;let e=im[i]||im.default,t=(Math.random()-.5)*2*e.jit,n=e.f*Math.pow(2,t/12);Be({wave:e.wave,f:n,f2:e.f2?e.f2*Math.pow(2,t/12):void 0,d:e.d,v:e.v,lp:e.lp,rev:e.rev}),e.ring&&Be({wave:"sine",f:n*2.01,d:e.d,v:e.v*.5})},move(){oe.ready&&Be({wave:"pulse25",f:1318,f2:1250,d:.045,v:.07,lp:5e3})},select(){oe.ready&&(Be({wave:"pulse50",f:988,d:.03,v:.07,lp:5e3}),Be({wave:"pulse50",f:1480,d:.06,v:.07,delay:.035,lp:5e3}))},back(){oe.ready&&(Be({wave:"pulse50",f:1175,d:.03,v:.06,lp:4e3}),Be({wave:"pulse50",f:784,d:.05,v:.06,delay:.035,lp:4e3}))},buzz(){oe.ready&&(Be({wave:"sawtooth",f:110,d:.18,v:.12,lp:900}),Be({wave:"sawtooth",f:116,d:.18,v:.12,lp:900}))},encounter(){oe.ready&&(Be({wave:"pulse25",f:587,f2:1760,d:.07,v:.14,glide:.06}),Be({wave:"pulse50",f:1760,d:.12,v:.1,delay:.07}),Be({wave:"pulse50",f:2349,d:.18,v:.08,delay:.1,rev:.2}))},soulBlink(){oe.ready&&Be({wave:"pulse50",f:1568,d:.04,v:.08})},soulFly(){oe.ready&&(mt({f:500,f2:4e3,q:2,d:.35,v:.2,a:.02}),Be({wave:"triangle",f:900,f2:300,d:.35,v:.12}))},slash(){oe.ready&&(mt({f:jt(1200),f2:6500,q:1.2,d:.2,v:.3,a:.01,pan:-.3}),mt({type:"highpass",f:5e3,q:.5,d:.12,v:.12,delay:.05,pan:.3}))},hitEnemy(i=1){oe.ready&&(Be({wave:"sine",f:140,f2:42,d:.22,v:.5*i}),mt({f:1400,f2:300,q:.8,d:.14,v:.35*i}),Be({wave:"pulse25",f:jt(220),f2:70,d:.1,v:.12}),Fr("snare",{v:.25*i,rate:.7}))},crit(){oe.ready&&(ze.hitEnemy(1.2),_n("glock",96,{v:.25,rev:.3}),_n("glock",103,{v:.2,delay:.05,rev:.3}))},miss(){oe.ready&&mt({f:3e3,f2:900,q:3,d:.15,v:.12})},hurt(){oe.ready&&(Be({wave:"pulse50",f:jt(330,.02),f2:82,d:.14,v:.2,lp:2400}),Be({wave:"sawtooth",f:165,f2:55,d:.16,v:.12,lp:1200}),mt({f:900,f2:250,q:.7,d:.12,v:.22}))},graze(){oe.ready&&Be({wave:"sine",f:jt(2400,.08),d:.03,v:.03})},heal(){oe.ready&&[72,76,79,84,88].forEach((i,e)=>Be({wave:"pulse25",f:Ac(i),d:.09,v:.07,delay:e*.045,lp:6e3,rev:.25}))},save(){oe.ready&&([88,95,100,107].forEach((i,e)=>_n("glock",i,{v:.22,delay:e*.07,rev:.5})),_n("bell",76,{v:.12,delay:.1,rev:.6}),mt({type:"highpass",f:7e3,q:.5,d:.6,a:.2,v:.04,rev:.4}))},levelUp(){oe.ready&&([60,64,67,72,76,79,84].forEach((i,e)=>Be({wave:"pulse50",f:Ac(i),d:.08,v:.08,delay:e*.04,lp:5e3})),Be({wave:"pulse25",f:Ac(84),d:.4,v:.06,delay:.3,rev:.3}))},hopeUp(){oe.ready&&[79,83,86,91,95].forEach((i,e)=>_n("musicbox",i,{v:.25,delay:e*.06,rev:.5}))},dust(){if(!oe.ready)return;let e=Os().currentTime;for(let t=0;t<26;t++){let n=e+Math.pow(t/26,1.3)*.9;mt({t:n,f:jt(2600-t*70,.2),q:3,d:.05,v:.12*(1-t/30),pan:(Math.random()-.5)*.6})}mt({f:1800,f2:200,q:.6,d:1,v:.12,a:.05})},spare(){oe.ready&&(mt({f:700,f2:5e3,q:1.5,d:.6,v:.14,a:.08,rev:.4}),[84,88,91,96].forEach((i,e)=>_n("glock",i,{v:.12,delay:.1+e*.06,rev:.5})))},flee(){if(oe.ready)for(let i=0;i<5;i++)mt({f:1500,q:2,d:.04,v:.12,delay:i*.08,pan:-.2-i*.15})},crack(){oe.ready&&(mt({type:"highpass",f:1500,q:.7,d:.1,v:.45}),Be({wave:"pulse50",f:180,f2:60,d:.1,v:.25}),Be({wave:"square",f:1200,f2:400,d:.05,v:.1}))},shatter(){if(oe.ready){mt({type:"highpass",f:2500,q:.7,d:.5,v:.35});for(let i=0;i<8;i++)_n("glock",96+Math.floor(Math.random()*12),{v:.12,delay:i*.025+Math.random()*.03,rev:.4})}},item(){oe.ready&&[79,84,88].forEach((i,e)=>Be({wave:"pulse25",f:Ac(i),d:.1,v:.08,delay:e*.06,rev:.2}))},buy(){oe.ready&&(Be({wave:"pulse50",f:1975,d:.05,v:.07}),Be({wave:"pulse50",f:2637,d:.2,v:.07,delay:.06,rev:.2}))},phone(){if(oe.ready)for(let i=0;i<4;i++)Be({wave:"sine",f:1318,d:.05,v:.12,delay:i*.1}),Be({wave:"sine",f:1661,d:.05,v:.12,delay:i*.1+.05})},door(){oe.ready&&(mt({f:400,f2:180,q:1.5,d:.25,v:.25}),Be({wave:"sine",f:90,f2:60,d:.2,v:.2}))},step(i="stone"){if(!oe.ready)return;let e=(Math.random()-.5)*.2;i==="snow"?mt({f:jt(1100,.2),q:.8,d:.09,v:.07,a:.01,pan:e}):i==="water"?mt({f:jt(900,.2),f2:2e3,q:2,d:.1,v:.06,pan:e}):i==="wood"?(Be({wave:"sine",f:jt(180),f2:120,d:.06,v:.12}),mt({f:2e3,q:1,d:.02,v:.03,pan:e})):i==="metal"?(Be({wave:"triangle",f:jt(900,.05),d:.05,v:.04}),mt({f:3500,q:2,d:.03,v:.03,pan:e})):mt(i==="grass"?{f:jt(3e3,.2),q:.6,d:.06,v:.035,a:.01,pan:e}:{f:jt(700,.15),q:1.4,d:.045,v:.08,pan:e})},splash(){if(oe.ready){mt({f:800,f2:3500,q:.8,d:.35,v:.2,a:.01});for(let i=0;i<4;i++)Be({wave:"sine",f:jt(900,.3),f2:1800,d:.06,v:.05,delay:.05+i*.05})}},switch(){oe.ready&&(Be({wave:"square",f:220,d:.03,v:.1,lp:2e3}),Be({wave:"square",f:440,d:.05,v:.08,delay:.05,lp:2e3}),Fr("rim",{v:.3}))},spikes(){oe.ready&&(mt({f:2e3,f2:600,q:2,d:.2,v:.18}),Be({wave:"sawtooth",f:200,f2:90,d:.2,v:.08,lp:1200}))},push(){oe.ready&&mt({f:300,q:1,d:.3,v:.2,a:.03})},correct(){oe.ready&&[76,79,84].forEach((i,e)=>_n("marimba",i,{v:.35,delay:e*.08}))},wrong(){oe.ready&&(Be({wave:"pulse50",f:233,d:.25,v:.1,lp:1500}),Be({wave:"pulse50",f:220,d:.35,v:.1,delay:.2,lp:1500}))},shoot(){oe.ready&&Be({wave:"pulse25",f:jt(1400),f2:400,d:.08,v:.07})},pop(){oe.ready&&Be({wave:"sine",f:jt(700),f2:1400,d:.05,v:.12})},dash(){oe.ready&&mt({f:800,f2:3e3,q:1.2,d:.15,v:.15,a:.01})},blink(){oe.ready&&(Be({wave:"sine",f:600,f2:2400,d:.08,v:.1}),Be({wave:"sine",f:2400,f2:900,d:.08,v:.08,delay:.06}))},jump(){oe.ready&&Be({wave:"pulse25",f:300,f2:700,d:.08,v:.06})},land(){oe.ready&&Be({wave:"sine",f:120,f2:60,d:.08,v:.12})},block(){oe.ready&&(Be({wave:"triangle",f:jt(1760,.03),d:.12,v:.1}),Be({wave:"square",f:3520,d:.04,v:.03}),mt({f:5e3,q:2,d:.05,v:.06}))},magic(){oe.ready&&(Be({wave:"sine",f:400,f2:1600,d:.3,v:.1,rev:.4}),Be({wave:"sine",f:603,f2:2410,d:.3,v:.06,rev:.4}))},fire(){oe.ready&&mt({type:"lowpass",f:1200,f2:400,q:.7,d:.35,v:.2,a:.03})},spear(){oe.ready&&(Be({wave:"sawtooth",f:1600,f2:500,d:.12,v:.06,lp:4e3}),mt({f:4e3,f2:1500,q:2,d:.1,v:.08}))},spearAppear(){oe.ready&&Be({wave:"pulse25",f:jt(1900,.02),d:.05,v:.05})},laser(){oe.ready&&(Be({wave:"sawtooth",f:180,d:.5,v:.08,lp:1600,a:.02}),Be({wave:"square",f:360.5,d:.5,v:.05,lp:2400,a:.02}),mt({f:3e3,q:.5,d:.5,v:.08,a:.02}))},charge(){oe.ready&&Be({wave:"sawtooth",f:100,f2:900,d:.5,v:.06,lp:2e3,a:.05})},explosion(){oe.ready&&(mt({type:"lowpass",f:2400,f2:120,q:.5,d:1,v:.5,a:.005}),Be({wave:"sine",f:90,f2:30,d:.6,v:.45}),Fr("crash",{v:.2,rate:.7}))},rumble(i=1.2){oe.ready&&mt({type:"lowpass",f:180,q:.5,d:i,v:.4,a:.2})},bell(i=72){oe.ready&&_n("bell",i,{v:.35,rev:.6})},chime(){oe.ready&&[84,91,96].forEach((i,e)=>_n("musicbox",i,{v:.25,delay:e*.1,rev:.6}))},echoFlower(){oe.ready&&_n("kalimba",84,{v:.2,rev:.7})},ding(){oe.ready&&_n("glock",88,{v:.25,rev:.3})},whoosh(){oe.ready&&mt({f:300,f2:2400,q:.8,d:.4,v:.15,a:.15})},applause(){if(oe.ready)for(let i=0;i<40;i++)mt({f:jt(1600,.3),q:2,d:.03,v:.06,delay:Math.random()*1.4,pan:(Math.random()-.5)*1.6})},laugh(){if(oe.ready)for(let i=0;i<5;i++)Be({wave:"pulse25",f:520-i*25,d:.06,v:.06,delay:i*.11})},typewriter(){oe.ready&&Fr("rim",{v:.12,rate:jt(1.4,.1)})},impact(){oe.ready&&(Fr("kick",{v:.8}),mt({type:"lowpass",f:900,q:.5,d:.3,v:.25}))},gong(){oe.ready&&(_n("bell",43,{v:.5,rev:.8}),_n("timpani",36,{v:.4}))},drumroll(i=1){if(!oe.ready)return;let e=Math.floor(i/.05);for(let t=0;t<e;t++)Fr("snare",{v:.1+.2*(t/e),delay:t*.05,rate:jt(1,.03)})},note(i,e="piano"){oe.ready&&_n(e,i,{v:.4,rev:.3})}},Or=null;function uM(i){if(!oe.ready){Rc=i;return}if(Or&&Or.kind===i)return;let e=Os();if(Or){let a=Or;a.gain.gain.setTargetAtTime(0,e.currentTime,.4),setTimeout(()=>a.nodes.forEach(o=>{try{o.stop()}catch{}}),2500),Or=null}if(!i)return;let t=e.createGain();t.gain.value=0,t.connect(oe.sfxOut);let n=[],s=(a,o,l,c,h,d)=>{let u=e.createBufferSource();u.buffer=oe.noiseBuf,u.loop=!0;let f=e.createBiquadFilter();f.type=a,f.frequency.value=o,f.Q.value=l;let p=e.createGain();if(p.gain.value=c,u.connect(f),f.connect(p),p.connect(t),h){let y=e.createOscillator();y.frequency.value=h;let m=e.createGain();m.gain.value=d,y.connect(m),m.connect(f.frequency),y.start(),n.push(y)}u.start(0,Math.random()*1.9),n.push(u)},r={wind:()=>{s("bandpass",500,1.5,.5,.13,250),s("bandpass",1200,3,.15,.21,500)},water:()=>{s("lowpass",900,.7,.35,.3,200),s("bandpass",3e3,.8,.08,0,0)},waterfall:()=>{s("lowpass",1400,.5,.6,0,0),s("bandpass",400,.8,.4,.2,60)},lava:()=>{s("lowpass",200,.8,.6,.4,60),s("bandpass",700,2,.08,1.3,300)},hum:()=>{s("lowpass",120,1,.35,.1,20)},cave:()=>{s("lowpass",300,.6,.18,.07,80)},rain:()=>{s("highpass",3e3,.4,.2,0,0),s("bandpass",1200,.6,.1,0,0)}};(r[i]||r.cave)(),t.gain.setTargetAtTime(.35,e.currentTime,.8),Or={kind:i,gain:t,nodes:n}}var Rc=null;function rm(){if(Rc){let i=Rc;Rc=null,uM(i)}}var dM={c:0,d:2,e:4,f:5,g:7,a:9,b:11},om=["c","c+","d","d+","e","f","f+","g","g+","a","a+","b"],ku={"":[0,4,7],m:[0,3,7],7:[0,4,7,10],maj7:[0,4,7,11],m7:[0,3,7,10],dim:[0,3,6],dim7:[0,3,6,9],m7b5:[0,3,6,10],aug:[0,4,8],sus4:[0,5,7],sus2:[0,2,7],add9:[0,4,7,14],madd9:[0,3,7,14],6:[0,4,7,9],m6:[0,3,7,9],9:[0,4,7,10,14],m9:[0,3,7,10,14],maj9:[0,4,7,11,14],"7sus4":[0,5,7,10],5:[0,7]};function am(i){let e=dM[i[0].toLowerCase()];for(let t of i.slice(1))t==="#"||t==="+"?e++:(t==="b"||t==="-")&&e--;return(e+12)%12}function fM(i){let[e,t]=i.split("/"),n=/^([A-Ga-g][#b+-]?)(.*)$/.exec(e),s=am(n[1]),r=ku[n[2]]?n[2]:n[2].replace(/^M/,"maj"),a=ku[r]||ku[""];return{root:s,iv:a,bass:t?am(t):s,sym:i}}function re(i,e=4){return i.trim().split(/\s+/).filter(t=>t!=="|").map(t=>{let[n,s]=t.split(":");return n==="r"||n==="-"?{chord:null,beats:s?parseFloat(s):e}:{chord:fM(n),beats:s?parseFloat(s):e}})}var pM=[[4,"1"],[3,"2."],[2,"2"],[1.5,"4."],[1,"4"],[.75,"8."],[.5,"8"],[1/3,"12"],[.375,"16."],[.25,"16"],[1/6,"24"],[.125,"32"]];function Hu(i){let e=[],t=i,n=0;for(;t>.001&&n++<40;){let s=pM.find(([r])=>r<=t+1e-4);if(!s)break;e.push(s[1]),t-=s[0]}return e.join("^")||"32"}var Ln=(i,e)=>`o${Math.floor(i/12)-1}${om[i%12]}${Hu(e)}`,Li=i=>`r${Hu(i)}`,Pc=(i,e)=>i.length===1?Ln(i[0],e):`(${i.map(t=>`o${Math.floor(t/12)-1}${om[t%12]}`).join(" ")})${Hu(e)}`;function Ic(i,e,t,n=3){let s=i.iv.slice(0,Math.max(n,3)).map(l=>(i.root+l)%12),r=[...new Set(s)],a=null,o=1/0;for(let l=0;l<r.length;l++){let c=r.slice(l).concat(r.slice(0,l));for(let h=e-12;h<=e+6;h++){if(h%12!==c[0])continue;let d=[h];for(let p=1;p<c.length;p++){let y=d[p-1]+1;for(;y%12!==c[p];)y++;d.push(y)}let u=d.reduce((p,y)=>p+y,0)/d.length,f=Math.abs(u-e)*.6;if(t)for(let p=0;p<Math.min(d.length,t.length);p++)f+=Math.abs(d[p]-t[p]);f<o&&(o=f,a=d)}}return a}function ht(i,e=64,t={}){let n=null;return i.map(({chord:s,beats:r})=>{if(!s)return Li(r);let a=Ic(s,e,n,t.voices??3);if(n=a,t.split){let o=[],l=r;for(;l>.001;){let c=Math.min(t.split,l);o.push(Pc(a,c)),l-=c}return o.join(" ")}return Pc(a,r)}).join(" ")}function lt(i,e,t=.5,n=57,s={}){let r=null;return i.map(({chord:a,beats:o})=>{if(!a)return Li(o);let l=Ic(a,n,r,s.voices??3);r=l;let c=a.bass,h=l[0]-12;for(;h%12!==c;)h--;let d=[h,...l],u=[],f=0,p=0;for(;f<o-.001;){let y=e[p%e.length],m=Math.floor(y/10),g=y%10,b=Math.min(t,o-f);y<0?u.push(Li(b)):u.push(Ln(d[g%d.length]+12*m+(g>=d.length?12:0),b)),f+=b,p++}return u.join(" ")}).join(" ")}function we(i,e="whole",t=38,n={}){let s=[],r=a=>{let o=t;for(;o%12!==a;)o++;return o-t>6&&(o-=12),o};return i.forEach(({chord:a,beats:o},l)=>{if(!a){s.push(Li(o));return}let c=r(a.bass),h=c+7,d=c+a.iv[1];if(e==="whole")s.push(Ln(c,o));else if(e==="half"){let u=0,f=0;for(;u<o-.001;){let p=Math.min(2,o-u);s.push(Ln(f%2?h-12:c,p)),u+=p,f++}}else if(e==="pump")for(let u=0;u<o-.001;u+=.5)s.push(Ln(c,.5));else if(e==="octave")for(let u=0,f=0;u<o-.001;u+=.5,f++)s.push(Ln(f%2?c+12:c,.5));else if(e==="root5")for(let u=0,f=0;u<o-.001;u+=1,f++)s.push(Ln([c,h,c+12,h][f%4],1));else if(e==="waltz")for(let u=0;u<o-.001;u+=3)s.push(Ln(c,1),Li(2));else if(e==="walk"){let u=i[(l+1)%i.length].chord,f=u?r(u.bass):c,p=Math.round(o),y=[c,d,h,f>c?f-1:f+1];if(p===2)s.push(Ln(c,1),Ln(f>c?f-1:f+1,1));else for(let m=0;m<p;m++)s.push(Ln(m<4?y[m]:y[m%4],1))}else{let u=n.step??.5,f=e,p=0,y=0,m=[];for(;p<o-.001;){let g=f[y%f.length],b=g==="x"?c:g==="5"?h:g==="o"?c+12:g==="3"?d:g==="l"?c-12:g==="7"?c+(a.iv[3]??10):null;b!=null?m.push([b,u]):g==="."&&m.length?m[m.length-1][1]+=u:m.push([null,u]),p+=u,y++}for(let[g,b]of m)s.push(g==null?Li(b):Ln(g,b))}}),s.join(" ")}function Bt(i,e,t=64,n={}){let s=null,r=n.step??.5;return i.map(({chord:a,beats:o})=>{if(!a)return Li(o);let l=Ic(a,t,s,n.voices??3);s=l;let c=[],h=0,d=0,u=[];for(;h<o-.001;){let f=e[d%e.length];f==="x"?u.push([l,r]):f==="."&&u.length?u[u.length-1][1]+=r:u.push([null,r]),h+=r,d++}for(let[f,p]of u)c.push(f?Pc(f,p):Li(p));return c.join(" ")}).join(" ")}function Lc(i,e=3,t=38,n=60){let s=null,r=[];return i.forEach(({chord:a,beats:o})=>{if(!a){r.push(Li(o));return}let l=Ic(a,n,s,3);s=l;let c=t;for(;c%12!==a.bass;)c++;c-t>6&&(c-=12);for(let h=0;h<o-.001;h+=e){r.push(Ln(c,1));for(let d=1;d<e;d++)r.push(Pc(l,1))}}),r.join(" ")}var Lt=(i,e)=>Array(e).fill(i).join(" ");var Hn="o5 <a8 >d8 e8 f+8 a4. f+8 g4 f+8 e8 d2 <b8 >d8 f+8 e8 d4 c+8 d8 e2. r4",Qt="o5 <a8 >d8 e8 f+8 a4. b8 b4 a8 g8 f+4 e4 g4 f+8 e8 e4. d8 d1",Di="o5 d8 e8 f+4 f+8 e8 d8 c+8 <b4 >d4 g2 g8 f+8 e8 d8 e4 g4 a2 a8 g8 f+8 e8",mM=i=>i.replace(/^o5/,"o4"),sn=re(`
  D G Bm Asus4:2 A:2
  D G:2 Em:2 A7 D
  Bm G Em A
  D G:2 Em:2 A7 D`),zu=re("D D"),gM=re("D D G G Bm A A A",3),Gu=re("D D G D Em A7 D D",3),vM=re("Bm Bm A G G Em A7 A",3),lm=[...gM,...Gu,...vM,...Gu],cm={tale:{bpm:78,ch:[{ins:"musicbox",vol:.8,rev:.45,pan:.1,mml:`r1 r1 L ${Hn} ${Qt} ${Di} ${Qt}`},{ins:"harp",vol:.45,rev:.4,pan:-.25,mml:`${lt(zu,[0,2,3,13,11,3,2,1],.5,57)} L ${lt(sn,[0,2,3,13,11,3,2,1],.5,57)}`},{ins:"slowstr",vol:.5,rev:.5,mml:`r1 r1 L ${ht(sn,64)}`},{ins:"piano",vol:.3,rev:.3,mml:`v9 r1 r1 L ${we(sn,"whole",38)}`}]},title:{bpm:70,ch:[{ins:"piano",vol:.62,rev:.5,pan:.1,mml:`v11 r1 r1 L ${Hn} ${Qt}`},{ins:"piano",vol:.38,rev:.5,pan:-.15,mml:`v8 ${lt(zu,[0,2,3,11,12,11,3,2],.5,55)} L ${lt(sn.slice(0,10),[0,2,3,11,12,11,3,2],.5,55)}`},{ins:"bellpad",vol:.3,rev:.6,mml:`r1 r1 L ${ht(sn.slice(0,10),67)}`}]},home:{bpm:100,ch:[{ins:"piano",vol:.6,rev:.45,pan:.12,mml:`v11 r2. L
        o5 <a4 >d4 e4 f+2 a4 g4 f+4 e4 d2. <b4 >d4 f+4 e4 d4 c+4 e2. r2.
        o5 <a4 >d4 e4 f+2 b4 b4 a4 g4 f+2 e4 g4 f+4 e4 e2 d4 d2. r2.
        @flute v10 o5 d4 e4 f+4 f+4 e4 d4 c+2. <b4 >d4 g4 g2. g4 f+4 e4 d4 e4 g4 a2.
        @piano v11 o5 <a4 >d4 e4 f+2 b4 b4 a4 g4 f+2 e4 g4 f+4 e4 e2 d4 d2. r2.`},{ins:"piano",vol:.36,rev:.45,pan:-.15,mml:`v8 r2. L ${Lc(lm,3,38,57)}`},{ins:"strings",vol:.26,rev:.5,mml:`r2. L ${ht(lm,60)}`},{ins:"harp",vol:.25,rev:.5,pan:-.3,mml:`r2. L ${Lt("r2.",24)} ${lt(Gu,[11,12,13,12,11,3],.5,69)}`}]},ending:{bpm:90,ch:[{ins:"piano",vol:.5,rev:.4,pan:.15,mml:`v12 r1 r1 L ${Hn} ${Qt} ${Di} ${Qt}`},{ins:"flute",vol:.4,rev:.45,pan:-.1,mml:`v11 r1 r1 L ${Lt("r1",8)} ${Di} ${Qt}`},{ins:"strings",vol:.45,rev:.45,pan:-.1,mml:`r1 r1 L ${Lt("r1",4)} ${mM(Qt)} ${ht(sn.slice(10),62)}`},{ins:"harp",vol:.4,rev:.4,pan:-.3,mml:`${lt(zu,[0,2,3,13,11,3,2,1],.5,57)} L ${lt(sn,[0,2,3,13,11,3,2,1],.5,57)}`},{ins:"slowstr",vol:.4,rev:.5,mml:`r1 r1 L ${ht(sn,64)}`},{ins:"bass",vol:.42,mml:`r1 r1 L ${we(sn,"x..5x.5.",38)}`},{ins:"drums",vol:.35,mml:"r1 r1 L [c4 e8 e8 d4 e8 c8 c4 e8 e8 d4 e8 e+8]8"}]}};var Hr=`o4 a8 >e8 d4 c4 <b8 >c8 d4. c8 <a2 a8 >f8 e4 d4 c8 d8 e2. r4
  <a8 >e8 d4 c4 <b8 >c8 d4. e8 f4 g4 a4 g8 f8 e4 d4 c4 <b4 a2`,kr=`o5 a4 g8 f8 e4 c4 d4. e8 d2 g4 f8 e8 d4 <b4 >c2. r4
  f4 e8 d8 c4 <a4 b4. >c8 d2 <a2 g+2 b2 r2`,as=re("Am F Dm E Am F Dm:2 E7:2 Am"),Ui=re("Fmaj7 G Em Am Dm7 G Esus4:2 E:2 E7"),hm=re("Am Am"),Vu=re("F Dm Bb C F Dm Gm7:2 C7:2 F"),Wu=re("Bb C Am Dm Gm C F:2 D7:2 Gm:2 C7:2"),xM=`o5 c8 f8 a8 >c8 <a4 f4 g8 f8 e8 f8 d4 r4 d8 f8 b-8 >d8 c4 <b-4 a8 g8 f8 g8 e4 r4
  c8 f8 a8 >c8 <a4 f4 a8 b-8 a8 g8 f4 d4 f8 g8 a8 b-8 >c4 <b-4 a2 r2`,um=`o5 d4. c8 <b-4 >d4 e4. d8 c4 e4 c4. d8 e4 c4 f2 d4 r4
  d4 c8 <b-8 a4 g4 >e4 d8 c8 <b-4 >c4 f4 e4 f+4 d4 g4 f4 e4 c4`,Xu=re("C#m7 Amaj7 E B C#m7 Amaj7 F#m7 Bsus4:2 B:2"),$u=re("Amaj7 B G#m7 C#m7 F#m7 B Emaj7 G#7"),_M=`o5 g+2 e4 f+4 e2. c+4 e4 g+4 b4 g+4 f+1 g+2 e4 f+4 e2 c+4 e4 a2 g+4 f+4 e2 d+2
  o5 c+4 e4 g+4 a4 b2 a4 f+4 g+2. d+4 e2 r2 c+4 e4 a4 >c+4 <b2 a4 f+4 g+2 e4 d+4 c4 d+4 g+2`,dm=re("Fm7 Fm7 Dbmaj7 C7 Fm7 Fm7 Bbm7:2 C7:2 Fm7"),qu=re("Dbmaj7 Eb Cm7 Fm7 Bbm7 Eb7 Abmaj7:2 Db:2 C7"),yM=`o5 r4 c8 e-8 f8 a-8 f4 e-8 c8 e-8 f8 r2 r4 f8 a-8 >c8 <b-8 a-4 g8 e8 c8 <b-8 >c4 r4
  r4 c8 e-8 f8 a-8 b-8 >c8 <a-4 f4 e-8 f8 r4 d-8 c8 <b-8 a-8 g8 a-8 b-8 >c8 f2 r2`,MM=`o5 f4. e-8 f8 a-8 r4 g4. f8 e-8 g8 r4 e-4 c4 <b-8 >c8 e-4 f2. r4
  f8 a-8 >c8 <b-8 a-8 f8 e-8 d-8 e-4 g4 b-4 g4 a-8 g8 f8 e-8 f8 e-8 d-8 c8 e2 r2`,Br=re("Em C D Bm Em C Am B7"),fm=`o5 e4. f+8 g4 b4 a4. g8 e2 f+4. g8 a4 >d4 c+4 <b4 f+2
  e4. f+8 g4 b4 >c4. <b8 g2 a4 >c4 e4 d4 d+2 <b2`,Yu=re("Gm Cm Eb D Gm Cm:2 Am7b5:2 D7 Gm"),Zu=re("Eb Cm Am7b5 D Gm Cm:2 Am7b5:2 D7 Gm"),bM=`o4 d8 g8 a8 b-8 >d4. <b-8 >c4 <b-8 a8 g2 e-8 g8 b-8 a8 g4 f+8 g8 a2. r4
  d8 g8 a8 b-8 >d4. e-8 e-4 d8 c8 <b-4 a4 >c4 <b-8 a8 a4. g8 g1
  o4 g8 a8 b-4 b-8 a8 g8 f+8 e-4 g4 >c2 c8 <b-8 a8 g8 a4 >c4 d2 d8 c8 <b-8 a8
  d8 g8 a8 b-8 >d4. e-8 e-4 d8 c8 <b-4 a4 >c4 <b-8 a8 a4. g8 g1`,pm={hollows:{bpm:88,ch:[{ins:"piano",vol:.55,rev:.55,pan:.1,mml:`v11 r1 r1 L ${Hr} ${kr}`},{ins:"ocarina",vol:.3,rev:.6,pan:.2,mml:`v10 r1 r1 L ${Lt("r1",8)} ${kr.replace("o5","o5")}`},{ins:"harp",vol:.36,rev:.5,pan:-.25,mml:`${lt(hm,[0,2,3,11,12,11,3,2],.5,57)} L ${lt([...as,...Ui],[0,2,3,11,12,11,3,2],.5,57)}`},{ins:"slowstr",vol:.4,rev:.6,mml:`r1 r1 L ${ht([...as,...Ui],60)}`},{ins:"tri",vol:.4,mml:`${we(hm,"x...5...",33)} L ${we([...as,...Ui],"x...5...",33)}`}]},frostmere:{bpm:118,ch:[{ins:"glock",vol:.5,rev:.35,pan:.15,mml:`v12 r1 r1 L ${xM} ${um}`},{ins:"flute",vol:.3,rev:.4,pan:-.1,mml:`v9 r1 r1 L ${Lt("r1",8)} ${um.replace("o5","o4")}`},{ins:"pizz",vol:.5,rev:.3,pan:-.2,mml:`${we(re("F F"),"root5",41)} L ${we([...Vu,...Wu],"root5",41)}`},{ins:"strings",vol:.28,rev:.45,mml:`r1 r1 L ${ht([...Vu,...Wu],62)}`},{ins:"harp",vol:.25,rev:.4,pan:.3,mml:`r1 r1 L ${lt([...Vu,...Wu],[11,12,13,12],.5,65)}`},{ins:"drums",vol:.3,mml:"[a+8 a+8 (a+ e)8 a+8]4 L [(c a+)8 a+8 (a+ d+)8 a+8 (c a+)8 a+8 (a+ d+)8 a+16 a+16]16"}]},snowcap:{bpm:104,ch:[{ins:"glock",vol:.45,rev:.35,pan:.15,mml:`v12 r1 r1 L ${Hn} ${Qt} ${Di} ${Qt}`},{ins:"flute",vol:.28,rev:.4,pan:-.15,mml:`v10 r1 r1 L ${Lt("r1",8)} ${Di.replace("o5","o4")} ${Lt("r1",4)}`},{ins:"accordion",vol:.3,rev:.3,pan:-.2,mml:`r1 r1 L ${Bt(sn,"-x-x-x-x",62)}`},{ins:"pizz",vol:.5,rev:.25,mml:`${we(re("D D"),"root5",38)} L ${we(sn,"root5",38)}`},{ins:"drums",vol:.28,mml:"r1 r1 L [(c a+)8 a+8 (d+ a+)8 a+8 (c a+)8 (c a+)8 (d+ a+)8 a+8]16"}]},echofall:{bpm:80,ch:[{ins:"piano",vol:.5,rev:.7,pan:.1,mml:`v10 r1 r1 L ${_M}`},{ins:"kalimba",vol:.4,rev:.6,pan:-.25,echo:.3,mml:`${lt(re("C#m7 C#m7"),[11,12,13,12],.5,64)} L ${lt([...Xu,...$u],[11,12,13,12],.5,64)}`},{ins:"pad",vol:.5,rev:.7,mml:`r1 r1 L ${ht([...Xu,...$u],57)}`},{ins:"sine",vol:.35,mml:`${we(re("C#m7 C#m7"),"whole",37)} L ${we([...Xu,...$u],"whole",37)}`},{ins:"drums",vol:.15,mml:"r1 r1 L [r2 a+4 r4 r4 a+8 a+8 r4 d+4]8"}]},wishing:{bpm:64,ch:[{ins:"piano",vol:.55,rev:.7,pan:.1,mml:`v10 r1 L ${Hr} ${kr}`},{ins:"piano",vol:.3,rev:.7,pan:-.15,mml:`v7 ${lt(re("Am"),[0,2,3,11,3,2,3,2],.5,52)} L ${lt([...as,...Ui],[0,2,3,11,3,2,3,2],.5,52)}`},{ins:"slowstr",vol:.35,rev:.7,mml:`r1 L ${ht([...as,...Ui],62)}`},{ins:"choir",vol:.4,rev:.7,mml:`r1 L ${Lt("r1",8)} ${ht(Ui,67)}`}]},emberdeep:{bpm:112,ch:[{ins:"lead",vol:.45,rev:.3,echo:.2,pan:.1,mml:`v11 r1 r1 L ${yM} ${MM}`},{ins:"epiano",vol:.4,rev:.3,pan:-.2,mml:`r1 r1 L ${Bt([...dm,...qu],"-x.-x.-x",63)}`},{ins:"synbass",vol:.55,mml:`${we(re("Fm7 Fm7"),"x..xo..x..x.5.o.",29,{step:.25})} L ${we([...dm,...qu],"x..xo..x..x.5.o.",29,{step:.25})}`},{ins:"drums",vol:.45,mml:"[(c e)8 e8 (d e)8 e8 e8 (c e)8 (d e)8 c+8]2 L [(c e)8 e8 (d e)8 e8 e8 (c e)8 (d e)8 (e c+)8 (c e)8 e8 (d e)8 e8 e8 (c e)8 (d e)8 f8]8"},{ins:"brass",vol:.25,rev:.3,mml:`r1 r1 L ${Lt("r1",8)} ${ht(qu,65,{split:2})}`}]},core:{bpm:140,ch:[{ins:"lead",vol:.45,rev:.3,echo:.25,pan:.1,mml:`v11 r1 r1 L ${fm} ${fm}`},{ins:"pulse12",vol:.35,rev:.25,pan:-.25,mml:`${lt(re("Em Em"),[1,2,3,12,11,12,3,2],.25,64)} L ${lt([...Br,...Br],[1,2,3,12,11,12,3,2],.25,64)}`},{ins:"synbass",vol:.5,mml:`${we(re("Em Em"),"octave",28)} L ${we([...Br,...Br],"octave",28)}`},{ins:"pad",vol:.4,rev:.4,mml:`r1 r1 L ${ht([...Br,...Br],60)}`},{ins:"drums",vol:.45,mml:"[(c e)8 e8 (d e)8 e8]4 L [(c e)8 e8 (d e)8 (c e)8 (c e)8 e8 (d e)8 f8]15 [(c b)8 e8 d8 d8 d16 d16 d16 d16 d8 d8]1"}]},new_hallow:{bpm:84,ch:[{ins:"piano",vol:.5,rev:.55,pan:.1,mml:`v11 r1 L ${bM}`},{ins:"strings",vol:.3,rev:.55,pan:-.15,mml:`r1 L ${ht([...Yu,...Zu],60)}`},{ins:"bell",vol:.25,rev:.7,mml:`o3 g1 L ${we([...Yu,...Zu],"x.......",55)}`},{ins:"tri",vol:.4,mml:`r1 L ${we([...Yu,...Zu],"half",31)}`},{ins:"drums",vol:.2,mml:"r1 L [c4 r4 c8 c8 r4]16"}]},hall:{bpm:60,ch:[{ins:"bell",vol:.35,rev:.8,mml:`r1 L ${Hn} ${Qt} ${Lt("r1",8)}`},{ins:"choir",vol:.5,rev:.8,mml:`r1 L ${ht(sn,62)}`},{ins:"slowstr",vol:.25,rev:.8,mml:`r1 L ${we(sn,"whole",38)}`}]}};var mm=re("C C Ab G C C F:2 Fm:2 C"),SM=`o5 e8 g8 >c8 <g8 e8 g8 c4 d8 e8 f+8 g8 a-4 g4 a-8 >c8 e-8 c8 <a-8 >c8 <a-4 g4 f8 e8 d4 <b4
  >e8 g8 >c8 <g8 e8 g8 c4 d8 e8 f+8 g8 a-4 g4 a4 >c4 <a-4 >c4 <c2 r2`,td=`o4 e-8 g8 >c8 <g8 e-8 g8 c4 d8 e-8 f+8 g8 a-4 g4 a-8 >c8 e-8 c8 <a-8 >c8 <a-4 g4 f8 e-8 d4 <b4
  >e-8 g8 >c8 <g8 e-8 g8 c4 d8 e-8 f+8 g8 a-4 g4 a-4 >c4 <a-4 >c4 <c2 r2`,EM=re("Cm5 Cm5 Ab5 G5 Cm5 Cm5 F5 C5".replace(/m5/g,"5")),Dc=re("Dm7 G7 Cmaj7 A7 Dm7 G7 Em7:2 A7:2 Dm7"),wM=`o5 r8 d8 f8 a8 g+8 a8 r4 r8 f8 d8 <b8 >c4 <a4 >r8 e8 g8 b8 a8 g8 e4 c+8 d8 e8 g8 f8 e8 c+4
  r8 d8 f8 a8 >c8 <a8 g+8 a8 f8 d8 <b8 g8 a8 b8 >d4 g8 f8 e8 d8 c+8 e8 g8 b-8 a4 r4 r2`,TM=`o5 r4 a8 g8 f8 e8 d4 r8 b8 >d8 <b8 g4 f4 e8 g8 b8 >d8 c4 <b4 a8 g8 e8 c+8 d4 e4
  f8 a8 >c8 <a8 g+8 a8 f4 d8 <b8 g8 f8 e8 d8 <b4 >r8 e8 g8 b8 >c+8 <b-8 g8 e8 d2 r2`,Ju=re("C G/B Am F C G F:2 G:2 C"),Ku=re("F G Em Am Dm G E7 G7"),AM=`o5 c4 g4 >c4. <g8 f8 e8 d8 e8 d4 <g4 a4 >e4 a4. e8 f8 e8 d8 c8 <a4 >c4
  c4 g4 >c4. d8 e8 d8 c8 <b8 >d4 <g4 a8 g8 f8 e8 d4 <b4 >c2 r2
  o5 a4. g8 f4 a4 g4. f8 e4 g4 e8 f8 g4 b4 g4 a2 >c2 <d4 f4 a4 >d4 c4 <b4 g4 f4 e4 g+4 b4 >d4 <g12 a12 b12 >c12 d12 e12 f4 d4`,gm=re("Cm7 Abmaj7 Fm7 G7sus4:2 G7:2 Cm7 Abmaj7 Fm7 G7sus4:2 G7:2"),RM="o5 g4. e-8 f4 e-4 c2. r4 a-4. g8 f4 e-4 d2 <b2 >g4. e-8 f4 g4 >c2 <b-4 a-4 g4. f8 e-4 c4 d1",vm=re("Bbmaj7 Gm7 Cm7 F7 Bbmaj7 Gm7 Cm7 F7"),xm=re("Ebmaj7 D7 Gm7 C7 Cm7 F7 Bbmaj7:2 G7:2 Cm7:2 F7:2"),CM=`o5 d8 r8 f8 r8 a8 g8 f8 r8 d8 r8 b-8 a8 g4 r4 e-8 r8 g8 r8 b-8 a8 g8 e-8 f4 a4 >c4 r4
  <d8 r8 f8 r8 a8 g8 f8 r8 b-8 a8 g8 d8 f4 r4 e-8 g8 b-8 >d8 c4 <b-4 a2 r2`,PM=`o5 g4 b-4 >d4 <b-4 a4 f+4 d4 c4 <b-4 >d4 f4 d4 e4 g4 b-4 g4
  e-4 g4 >c4 <b-4 a4 f4 e-4 c4 d4 f4 b4 g4 e-4 g4 f4 a4`,ju=re("Am7 D9 Am7 D9 Fmaj7 E7 Am7:2 G:2 Fmaj7:2 E7:2"),Qu=re("Dm7 G7 Cmaj7 Fmaj7 Bm7b5 E7 Am7 E7"),IM=`o5 e4 r8 e8 g8 a8 r4 f+8 e8 d8 e8 r2 e4 r8 e8 g8 a8 >c8 d8 e8 d8 c8 <a8 r2
  a4 g8 a8 >c4 <a4 g+4 e8 f+8 g+4 b4 a4 g4 e4 d4 c4 <a4 b2
  o5 f4 a4 >c4 <a4 g4. f8 d4 <b4 >c8 e8 g8 b8 >c4 <g4 a2. r4 a4 f4 d4 <b4 >d4 <b4 g+4 e4 >c4 e4 a4 >c4 <b2 g+2`,_m=re("Dm A7 Dm A7 Bb F Gm A",3),ym=re("F C Dm Am Bb Gm A7 Dm",3),LM=`o5 d8 f8 a8 f8 d8 f8 c+8 e8 a8 e8 c+8 e8 d8 f8 a8 >d8 c8 <b-8 a8 g8 f8 e8 d8 c+8
  d8 f8 b-8 f8 d8 f8 c8 f8 a8 f8 c8 f8 b-8 a8 g8 f8 e8 d8 c+4 e4 a4
  o5 a8 >c8 <a8 f8 c8 f8 e8 g8 >c8 <g8 e8 g8 f8 e8 d8 e8 f8 a8 e4 c4 <a4
  >d8 c8 <b-8 a8 b-8 >d8 g8 f8 e8 d8 e8 g8 f8 e8 d8 c+8 <b8 >c+8 d2.`,Mm=re("Fmaj7 Em7:2 A7:2 Dm7 Gm7:2 C7:2 Fmaj7 Bbmaj7 Gm7 C7"),DM=`o5 e4 c8 <a8 r4 >c8 d8 e4 g4 e4 c+4 d4. f8 a4 f4 g4 b-4 a4 g4
  a4 f8 c8 r4 e8 f8 d2 f4 d4 b-4. a8 g4 f4 e2 r2`,bm=re("G Em C D G Em C:2 D:2 G"),Sm=re("C D Bm Em C D Am7:2 D7:2 D7"),UM=`o5 d8 g8 b8 g8 a4 g4 e8 g8 b8 g8 f+4 e4 e8 g8 >c8 <b8 a4 g4 f+4 a4 d2
  d8 g8 b8 >d8 c4 <b4 g8 b8 >e8 d8 <b4 g4 a8 g8 e8 g8 f+8 e8 d8 f+8 g2 r2
  o5 e4. g8 >c4 <g4 f+4. a8 >d4 <a4 b4. a8 f+4 d4 e2 g4 b4 >c4. <b8 a4 g4 f+4 e4 d4 f+4 e4 c4 f+4 a4 >c2 <a2`,ed=re("E A C#m Bsus4:2 B:2 E A:2 F#m:2 B7 E"),Em={sprig:{bpm:100,ch:[{ins:"musicbox",vol:.7,rev:.4,pan:.1,mml:`r1 L ${SM}`},{ins:"pizz",vol:.5,rev:.3,pan:-.2,mml:`${we(re("C"),"x-5-x-5-",36)} L ${we(mm,"x-5-x-5-",36)}`},{ins:"marimba",vol:.35,rev:.3,pan:.25,mml:`r1 L ${Bt(mm,"-x-x-x-x",64)}`},{ins:"drums",vol:.2,mml:"r1 L [d+4 r4 d+4 d+8 d+8]8"}]},sprig_evil:{bpm:84,ch:[{ins:"square",vol:.5,rev:.4,echo:.2,mml:`r1 L v11 ${td}`},{ins:"dguitar",vol:.5,dist:6,pan:-.2,mml:`r1 L ${Bt(EM,"x..x..x.",50,{voices:2})}`},{ins:"choir",vol:.45,rev:.6,mml:`r1 L ${ht(re("Cm Cm Ab G Cm Cm Fm C"),58)}`},{ins:"bass",vol:.5,mml:`${we(re("Cm"),"x..x..x.",36)} L ${we(re("Cm Cm Ab G Cm Cm Fm C"),"x..x..x.",36)}`},{ins:"drums",vol:.5,mml:"c4 r4 c4 d4 L [c4 r8 c8 d4 r4 c8 c8 r4 d4 r4]4"}]},wick:{bpm:112,swing:.3,ch:[{ins:"epiano",vol:.55,rev:.3,pan:.15,mml:`r1 L v12 ${wM} @marimba ${TM} @epiano`},{ins:"bass",vol:.55,mml:`${we(re("Dm7"),"walk",38)} L ${we([...Dc,...Dc],"walk",38)}`},{ins:"piano",vol:.3,rev:.3,pan:-.2,mml:`v8 r1 L ${Bt([...Dc,...Dc],"x..x....",60,{voices:4})}`},{ins:"drums",vol:.35,mml:"[f+4 (f+ e)8 f+8 f+4 (f+ e)8 f+8]1 L [f+4 (f+ e)8 f+8 f+4 (f+ e)8 f+8 f+4 (f+ e)8 f+8 f+4 (f+ e d+)8 f+8]8"}]},taper:{bpm:132,ch:[{ins:"square",vol:.5,rev:.25,pan:.1,mml:`r1 L v12 ${AM}`},{ins:"brass",vol:.4,rev:.3,pan:-.15,mml:`r1 L ${Bt([...Ju,...Ku],"x.-x.-x-",60)}`},{ins:"bass",vol:.5,mml:`${we(re("C"),"root5",36)} L ${we([...Ju,...Ku],"root5",36)}`},{ins:"timpani",vol:.4,rev:.3,mml:`o3 c4 r4 <g4 r4 L ${we([...Ju,...Ku],"x...x...",43)}`},{ins:"drums",vol:.4,mml:"d16 d16 d16 d16 d16 d16 d16 d16 d16 d16 d16 d16 d8 d8 L [c8 d16 d16 d8 c8 c8 d16 d16 d4 c8 d16 d16 d8 c8 c8 d16 d16 (d b)4]8"}]},hush:{bpm:76,ch:[{ins:"ocarina",vol:.4,rev:.6,pan:.1,mml:`r1 r1 L v10 ${RM}`},{ins:"epiano",vol:.45,rev:.5,pan:-.15,lp:3e3,mml:`r1 r1 L ${Bt(gm,"x..x..x.",60,{voices:4})}`},{ins:"sine",vol:.4,mml:`${we(re("Cm7 Cm7"),"x...x.x.",36)} L ${we(gm,"x...x.x.",36)}`},{ins:"drums",vol:.3,lp:5e3,mml:"[c4 r8 c8 d4 r4]2 L [c4 r8 c8 d4 r8 a+8 c8 r8 r8 c8 d4 r4]4"}]},lab:{bpm:104,ch:[{ins:"pulse12",vol:.45,rev:.3,echo:.2,pan:.15,mml:`r1 L v12 ${CM} @marimba ${PM} @pulse12`},{ins:"marimba",vol:.4,rev:.3,pan:-.25,mml:`${lt(re("Bbmaj7"),[1,3,2,11],.5,62)} L ${lt([...vm,...xm],[1,3,2,11],.5,62)}`},{ins:"synbass",vol:.45,mml:`${we(re("Bbmaj7"),"x-x-5-x-",34)} L ${we([...vm,...xm],"x-x-5-x-",34)}`},{ins:"drums",vol:.3,mml:"[c8 e8 d+8 e8]2 L [c8 e8 d+8 e8 c8 c8 d+8 e8]16"}]},luxe:{bpm:122,ch:[{ins:"brass",vol:.45,rev:.3,pan:.1,mml:`r1 r1 L v12 ${IM}`},{ins:"strings",vol:.35,rev:.35,pan:-.2,mml:`r1 r1 L ${Bt([...ju,...Qu],"x.-x-x--",67)}`},{ins:"synbass",vol:.5,mml:`${we(re("Am7 Am7"),"octave",33)} L ${we([...ju,...Qu],"octave",33)}`},{ins:"epiano",vol:.3,rev:.3,pan:.25,mml:`r1 r1 L ${Bt([...ju,...Qu],"-x-x-x-x",60,{voices:4})}`},{ins:"drums",vol:.45,mml:"[(c e)8 f8 (c d c+)8 f8 (c e)8 f8 (c d c+)8 f8]2 L [(c e)8 f8 (c d c+)8 f8 (c e)8 f8 (c d c+)8 f8]16"}]},silk:{bpm:150,ch:[{ins:"harpsi",vol:.5,rev:.3,pan:.15,mml:`r2. L v12 ${LM}`},{ins:"harpsi",vol:.35,rev:.3,pan:-.2,mml:`v9 r2. L ${Lc([..._m,...ym],3,38,57)}`},{ins:"pizz",vol:.45,rev:.2,mml:`r2. L ${we([..._m,...ym],"waltz",38)}`}]},shop:{bpm:88,swing:.25,ch:[{ins:"flute",vol:.4,rev:.4,pan:.15,mml:`r1 L v11 ${DM}`},{ins:"epiano",vol:.45,rev:.35,pan:-.15,mml:`${Bt(re("Fmaj7"),"x..x....",62,{voices:4})} L ${Bt(Mm,"x..x....",62,{voices:4})}`},{ins:"bass",vol:.45,mml:`${we(re("Fmaj7"),"x..5..x.",41)} L ${we(Mm,"x..5..x.",41)}`},{ins:"drums",vol:.25,mml:"[a+8 a+8 (a+ d+)8 a+8]2 L [(c a+)8 a+8 (a+ d+)8 a+8 a+8 (c a+)8 (a+ d+)8 a+8]8"}]},hangout:{bpm:124,ch:[{ins:"pulse25",vol:.45,rev:.25,pan:.1,mml:`r1 L v12 ${UM}`},{ins:"epiano",vol:.35,rev:.3,pan:-.2,mml:`r1 L ${Bt([...bm,...Sm],"x.-x.-x-",62)}`},{ins:"bass",vol:.5,mml:`${we(re("G"),"x.x.5.o.",43)} L ${we([...bm,...Sm],"x.x.5.o.",43)}`},{ins:"drums",vol:.4,mml:"[c8 e8 d8 e8]2 L [(c e)8 e8 (d e)8 e8 (c e)8 (c e)8 (d e)8 e8]16"}]},creator:{bpm:84,ch:[{ins:"glock",vol:.45,rev:.6,echo:.3,pan:.15,mml:`r1 r1 L k2 ${Hn} ${Qt} k0`},{ins:"pad",vol:.55,rev:.6,mml:`${ht(re("E E"),64)} L ${ht(ed,64)}`},{ins:"harp",vol:.3,rev:.6,pan:-.3,mml:`${lt(re("E E"),[1,2,3,12],.5,64)} L ${lt(ed,[1,2,3,12],.5,64)}`},{ins:"sine",vol:.3,mml:`${we(re("E E"),"whole",40)} L ${we(ed,"whole",40)}`}]}};var os="(c e)8 e8 (d e)8 e8 (c e)8 (c e)8 (d e)8 e8",Ni="(c e)8 e8 (d e)8 e8 d16 d16 d16 d16 a16 a16 g16 g16",Dn="(c e)8 (c e)8 (d e)8 e8 (c e)8 (c e)8 (d e)8 (c e)8",wm=re("Em Em C D Em Em Am B7"),nd=re("C D Bm Em C D B7sus4:2 B7:2 B7"),NM=`o4 r8 e8 g8 b8 >e4 d8 <b8 a8 g8 f+8 g8 e4 r4 r8 e8 g8 >c8 e4 d8 c8 <b8 a8 f+8 a8 d4 r4
  r8 e8 g8 b8 >e4 f+8 g8 f+8 e8 d8 <b8 >e4. r8 c8 <b8 a8 >c8 e8 d8 c8 <a8 b8 >d+8 f+8 a8 f+8 d+8 <b8 a8
  o5 e4. d8 c4 <g4 a4. b8 >c4 d4 f+4. e8 d4 <b4 >e2. r4 e4. d8 c4 <g4 a4. b8 >c4 d4 e4 d+4 f+4 d+4 <b2 r2`,Tm=re("Bb7 Eb7 Bb7 Bb7 Eb7 Eb7 Bb7 Bb7 F7 Eb7 Bb7 F7"),zr="o4 b-8 >d-8 d8 f8 a-8 f8 d8 <b-8",Uc="o4 e-8 g-8 g8 b-8 >d-8 <b-8 g8 e-8",FM="o4 f8 a-8 a8 >c8 e-8 c8 <a8 f8",OM="o4 f8 a8 >c8 e-8 f4 r4",BM=[zr,Uc,zr,zr,Uc,Uc,zr,zr,FM,Uc,zr,OM].join(" "),id=re("Dm Bb Gm A Dm Bb Gm:2 A:2 Dm"),Nc=re("Bb C Am Dm Gm A Bb:2 C:2 A7"),Am=`o4 a8 >d8 e8 f8 a4. f8 g4 f8 e8 d2 <b-8 >d8 f8 e8 d4 c+8 d8 e2. r4
  <a8 >d8 e8 f8 a4. b-8 b-4 a8 g8 f4 e4 g4 f8 e8 e4. d8 d1`,kM="o5 f4. e8 d4 f4 e4. d8 c2 c4. d8 e4 c4 f2. r4 g4. f8 e4 d4 c+4. d8 e4 a4 g4 f4 e4 c4 c+2 e2",Rm=re("Am F C G Am F E7 E7"),Cm=re("F G C Am F G E7:2 Am:2 E7"),HM=`o5 e8 e8 a8 e8 >c8 <a8 e8 a8 f8 f8 a8 f8 >c8 <a8 f8 a8 g8 g8 >c8 <g8 >e8 c8 <g8 >c8 d4 <b4 g4 d4
  e8 e8 a8 e8 >c8 <a8 e8 a8 f8 f8 a8 f8 >c8 d8 e8 f8 e4 d4 c4 <b4 g+4 e4 b4 g+4
  o5 a2 >c2 <b2 >d2 e2. d8 c8 <a1 a4 >c4 f4 e4 d4 <b4 g4 >d4 e4 d4 c4 <b4 g+2 b2`,io=re("Em Em C C Am Am B7 B7"),Pm="o4 e2. b4 o5 e1 o4 c2. g4 o5 c1 o4 a2. o5 e4 a1 o5 d+2 f+2 b1",Im=re("Em D C B7 Em D C B7"),sd=re("Am Em C D Am Em F B7"),zM=`o5 e8 f+8 g8 a8 b4 a8 g8 f+8 e8 d8 e8 f+4 d4 e8 d8 c8 d8 e4 g4 f+4 d+4 <b4 >d+4
  e8 f+8 g8 a8 b4 >e4 d4 <a4 f+4 a4 g4 e4 c4 e4 d+4 f+4 b2
  o5 a2 >c4. <b8 g2 e4 b4 >c2 <b4 g4 a2 f+4 d4 e4 a4 >c4 e4 d4 <b4 g4 b4 a4 >c4 f4 e4 d+2 <b2`,rd=re("Em C G D Em C G B"),ad=re("C D Em G C D B7sus4:2 B7:2 B7"),GM=`o5 b4. a8 g4 e4 g4. a8 e2 d4. e8 g4 b4 a2 f+2 b4. >c8 d4 e4 e4. d8 c4 <g4 b4 a4 g4 d4 d+2 f+2
  o5 e4 g4 >c4. <b8 a4 f+4 d4 f+4 g4. f+8 e4 b4 d2 g2 >c4. <b8 a4 g4 f+4 a4 >d4 c+4 <e4 f+4 d+4 f+4 b1`,so=re("Dm Bb Gm A Dm Bb Gm:2 A:2 Dm"),Fc=re("Dm Bb Gm A Dm Bb Gm:2 A7:2 Dm"),Lm=re("Cm5 Cm5 Ab5 G5 Cm5 Cm5 F5 C5".replace(/Cm5/g,"C5")),Dm=re("Ab Bb Cm Cm Ab Bb G G"),VM="o5 c4 e-4 a-4 g4 f4 d4 b-4 a-4 g2 >c2 <b2 g2 a-4 >c4 e-4 d4 c4 <b-4 >d4 c4 <b1 g1",WM=re("Dm Dm C C Bb Bb A A"),Um=re("Gm A Dm Dm Gm A Bb A7"),XM=`o5 d8 d8 >d8 <a8 r8 g+8 a8 f8 d8 f8 a8 >c8 <a8 g+8 a8 >d8 <c8 c8 >c8 <g8 r8 f+8 g8 e8 c8 e8 g8 b-8 g8 f+8 g8 >c8
  <<b-8 b-8 >b-8 f8 r8 e8 f8 d8 <b-8 >d8 f8 a-8 f8 e8 f8 b-8 a4 c+4 e4 g4 f4 e4 d4 c+4`,$M="o5 g4. a8 b-4 a4 g4 f4 e4 c+4 d2 f2 a2. r4 b-4. a8 g4 f4 e4 f4 g4 a4 b-2 >d2 c+1",Nm={battle:{bpm:152,ch:[{ins:"square",vol:.45,rev:.2,pan:.1,mml:`r1 r1 L v12 ${NM}`},{ins:"pulse25",vol:.28,rev:.2,pan:-.25,mml:`r1 r1 L ${Bt([...wm,...nd],"-x-x-x-x",64)}`},{ins:"pulse12",vol:.2,rev:.25,pan:.3,mml:`r1 r1 L ${Lt("r1",8)} ${lt(nd,[1,2,3,2],.25,72)}`},{ins:"bass",vol:.55,mml:`${we(re("Em Em"),"x.xox.xo",40)} L ${we([...wm,...nd],"x.xox.xo",40)}`},{ins:"drums",vol:.45,mml:`${os} ${Ni} L [${os} ${os} ${os} ${Ni}]4`}]},dogguard:{bpm:144,swing:.33,ch:[{ins:"square",vol:.4,rev:.2,pan:.1,mml:`r1 L v12 ${BM}`},{ins:"organ",vol:.3,rev:.25,pan:-.2,mml:`r1 L ${Bt(Tm,"-x-x-x-x",62,{voices:4})}`},{ins:"bass",vol:.5,mml:`${we(re("Bb7"),"walk",34)} L ${we(Tm,"walk",34)}`},{ins:"drums",vol:.4,mml:"(c f+)4 (d f+)4 (c f+)4 (d f+)8 d8 L [(c f+)4 (d f+)8 f+8 (c f+)4 (d f+)8 f+8]12"}]},queen_battle:{bpm:140,ch:[{ins:"strings",vol:.5,rev:.35,pan:.1,mml:`r1 r1 L v12 ${Am} ${kM}`},{ins:"piano",vol:.4,rev:.3,pan:-.2,mml:`v9 r1 r1 L ${lt([...id,...Nc],[0,1,2,3,11,3,2,1],.5,57)}`},{ins:"choir",vol:.35,rev:.5,mml:`r1 r1 L ${Lt("r1",8)} ${ht(Nc,62)}`},{ins:"bass",vol:.5,mml:`${we(re("Dm Dm"),"pump",38)} L ${we([...id,...Nc],"pump",38)}`},{ins:"timpani",vol:.45,rev:.3,mml:`o2 d8 d8 d8 d8 d8 d8 d8 d8 d16 d16 d16 d16 d16 d16 d16 d16 a4 d4 L ${we([...id,...Nc],"x...x...",38)}`},{ins:"drums",vol:.35,mml:"r1 r1 L [c8 d16 d16 c8 d8 c8 c8 d8 d16 d16]16"}]},taper_battle:{bpm:168,ch:[{ins:"square",vol:.45,rev:.2,pan:.1,mml:`r1 L v12 ${HM}`},{ins:"brass",vol:.35,rev:.3,pan:-.15,mml:`r1 L ${Lt("r1",8)} ${ht(Cm,62,{split:1})}`},{ins:"pulse25",vol:.25,rev:.2,pan:-.25,mml:`r1 L ${Bt(Rm,"x-x-x-x-",60)} ${Lt("r1",8)}`},{ins:"bass",vol:.55,mml:`${we(re("Am"),"pump",33)} L ${we([...Rm,...Cm],"pump",33)}`},{ins:"drums",vol:.45,mml:`d16 d16 d16 d16 d16 d16 d16 d16 a16 a16 g16 g16 (c b)4 L [${Dn} ${Dn} ${Dn} ${Ni}]4`}]},maris:{bpm:150,ch:[{ins:"brass",vol:.45,rev:.4,pan:.1,mml:`r1 L ${Pm} ${Pm}`},{ins:"strings",vol:.45,rev:.35,pan:-.2,mml:`${lt(re("Em"),[1,1,2,1,3,1,2,1],.25,59)} L ${lt([...io,...io],[1,1,2,1,3,1,2,1],.25,59)}`},{ins:"choir",vol:.3,rev:.5,mml:`r1 L ${Lt("r1",8)} ${ht(io,60)}`},{ins:"timpani",vol:.45,rev:.3,mml:`o2 e4 e4 e4 e8 e8 L ${we([...io,...io],"x.x.x...",40)}`},{ins:"drums",vol:.35,mml:"g8 g8 a8 a8 g16 g16 g16 g16 a8 a8 L [(c g)8 g8 (d a)8 g8 (c g)8 (c g)8 (d a)8 a8]16"}]},maris_battle:{bpm:172,ch:[{ins:"lead",vol:.5,rev:.25,echo:.15,pan:.1,mml:`r1 r1 L v12 ${zM}`},{ins:"dguitar",vol:.5,dist:7,pan:-.25,mml:`r1 r1 L ${Bt([...Im,...sd].map(i=>({...i,chord:i.chord&&{...i.chord,iv:[0,7]}})),"x.x.x.xx",52,{voices:2})}`},{ins:"brass",vol:.3,rev:.3,pan:.2,mml:`r1 r1 L ${Lt("r1",8)} ${ht(sd,64,{split:2})}`},{ins:"bass",vol:.55,mml:`${we(re("Em Em"),"octave",40)} L ${we([...Im,...sd],"octave",40)}`},{ins:"drums",vol:.5,mml:`${Dn} ${Ni} L [${Dn} ${Dn} ${Dn} ${Ni}]4`}]},luxe_battle:{bpm:132,ch:[{ins:"lead",vol:.45,rev:.3,echo:.25,pan:.1,mml:`r1 r1 L v12 ${GM}`},{ins:"pulse12",vol:.3,rev:.25,pan:-.25,echo:.2,mml:`${lt(re("Em Em"),[1,2,3,12],.25,64)} L ${lt([...rd,...ad],[1,2,3,12],.25,64)}`},{ins:"pad",vol:.4,rev:.4,mml:`r1 r1 L ${ht([...rd,...ad],60)}`},{ins:"synbass",vol:.5,mml:`${we(re("Em Em"),"octave",28)} L ${we([...rd,...ad],"octave",28)}`},{ins:"drums",vol:.45,mml:"[(c e)8 f8 (c d c+)8 f8 (c e)8 f8 (c d c+)8 f8]2 L [(c e)8 f8 (c d c+)8 f8 (c e)8 f8 (c d c+)8 f8]16"}]},king:{bpm:116,ch:[{ins:"brass",vol:.5,rev:.45,pan:.1,mml:`r1 r1 L v12 ${Am} ${Lt("r1",8)}`},{ins:"choir",vol:.45,rev:.6,mml:`r1 r1 L ${ht(so,60)} k-7 ${Hr} k0`},{ins:"strings",vol:.4,rev:.4,pan:-.2,mml:`${lt(re("Dm Dm"),[1,2,3,2],.5,57)} L ${lt([...so,...Fc],[1,2,3,2],.5,57)}`},{ins:"bass",vol:.45,mml:`${we(re("Dm Dm"),"x.x.x.x.",38)} L ${we([...so,...Fc],"x.x.x.x.",38)}`},{ins:"timpani",vol:.5,rev:.35,mml:`o2 d4 r4 d8 d8 d4 d16 d16 d16 d16 d16 d16 d16 d16 a4 r4 L ${we([...so,...Fc],"x...x.x.",38)}`},{ins:"bell",vol:.25,rev:.7,mml:`r1 r1 L ${we([...so,...Fc],"x.......",62)}`},{ins:"drums",vol:.3,mml:"r1 r1 L [c4 d8 d16 d16 c4 d4]16"}]},sprig_final:{bpm:160,ch:[{ins:"lead",vol:.45,rev:.25,echo:.2,dist:3,pan:.1,mml:`r1 r1 L v12 ${td.replace(/^o4/,"o5")} ${VM}`},{ins:"dguitar",vol:.5,dist:8,pan:-.25,mml:`r1 r1 L ${Bt([...Lm,...Dm].map(i=>({...i,chord:i.chord&&{...i.chord,iv:[0,7]}})),"xxx.xxx.",48,{voices:2})}`},{ins:"orchhit",vol:.4,rev:.4,mml:"r1 r1 L [o4 c4 r4 r2 r1 r1 r1]4"},{ins:"synbass",vol:.55,mml:`${we(re("C C"),"pump",36)} L ${we([...Lm,...Dm],"pump",36)}`},{ins:"drums",vol:.5,mml:`[c8 c8 d8 c8 c8 c8 d8 d8]2 L [${Dn} ${Dn} ${Dn} ${Ni}]4`}]},rowan:{bpm:148,ch:[{ins:"lead",vol:.45,rev:.35,echo:.2,pan:.1,mml:`r1 r1 L v12 ${Hn} ${Qt} ${Di} ${Qt}`},{ins:"choir",vol:.4,rev:.6,mml:`r1 r1 L ${ht(sn,64)}`},{ins:"piano",vol:.35,rev:.3,pan:-.2,mml:`v9 ${lt(re("D D"),[0,1,2,3,11,3,2,1],.5,60)} L ${lt(sn,[0,1,2,3,11,3,2,1],.5,60)}`},{ins:"strings",vol:.35,rev:.4,pan:.25,mml:`r1 r1 L ${Lt("r1",8)} ${Di.replace("o5","o4")} ${Qt.replace("o5","o4")}`},{ins:"bass",vol:.5,mml:`${we(re("D D"),"octave",38)} L ${we(sn,"octave",38)}`},{ins:"drums",vol:.45,mml:`${os} ${Ni} L [${os} ${os} ${os} ${Ni}]4`}]},last_flame:{bpm:176,ch:[{ins:"square",vol:.5,rev:.25,echo:.2,pan:.1,mml:`r1 r1 L v13 ${XM} ${$M}`},{ins:"dguitar",vol:.5,dist:8,pan:-.25,mml:`${Bt(re("D5 D5"),"x.xxx.xx",50,{voices:2})} L ${Bt(re("D5 D5 C5 C5 Bb5 Bb5 A5 A5 G5 A5 D5 D5 G5 A5 Bb5 A5"),"x.xxx.xx",50,{voices:2})}`},{ins:"organ",vol:.25,rev:.4,mml:`r1 r1 L ${Lt("r1",8)} ${ht(Um,62)}`},{ins:"bass",vol:.55,mml:`${we(re("Dm Dm"),"octave",38)} L ${we([...WM,...Um],"octave",38)}`},{ins:"drums",vol:.5,mml:`[c16 c16 d8]7 (c b)8 d8 L [${Dn} ${Dn} ${Dn} ${Ni}]4`}]}};var Fm="o5 <a4 >d4 e4 f+2 a4 g4 f+4 e4 d2. <b4 >d4 f+4 e4 d4 c+4 e2. r2.",Om={genocide:{bpm:50,ch:[{ins:"musicbox",vol:.45,rev:.8,mml:"L o5 <a8 r8 >d8 r8 r2 r1 r2 f+8 r8 r4 r1 <b8 r8 r4 r2 r1 r1 r1"},{ins:"pad",vol:.5,rev:.7,mml:`L ${ht(re("Dm:8 Bbmaj7:8 Gm6:8 A7:8"),50)}`},{ins:"sine",vol:.35,mml:"L o1 d1 d1 d1 d1 d1 d1 c+1 c+1"},{ins:"bell",vol:.25,rev:.9,mml:"L o2 d1 r1 r1 r1 o2 d1 r1 r1 r1"}]},gameover:{bpm:64,ch:[{ins:"piano",vol:.55,rev:.7,pan:.1,mml:`v10 L k-2 ${Hn} ${Qt} k0`},{ins:"bellpad",vol:.35,rev:.7,mml:`L ${ht(re("C F Am Gsus4:2 G:2 C F:2 Dm:2 G7 C"),64)}`},{ins:"slowstr",vol:.3,rev:.7,mml:`L ${we(re("C F Am Gsus4:2 G:2 C F:2 Dm:2 G7 C"),"whole",36)}`}]},deep_lab:{bpm:58,ch:[{ins:"musicbox",vol:.5,rev:.8,pan:-.2,mml:`r2. L ${Fm} ${Lt("r2.",8)}`},{ins:"musicbox",vol:.18,rev:.8,pan:.3,mml:`r2. L r4 k-1 ${Fm.replace(" r2.","")} k0 r2 ${Lt("r2.",8)}`},{ins:"pad",vol:.45,rev:.7,mml:`r2. L ${ht(re("Dm:6 Ebmaj7:6 Dm:6 C#dim:6 Dm:6 Ebmaj7:6 Bbm:6 A:6"),52)}`},{ins:"drums",vol:.2,mml:"r2. L [g4 r2 r2. r2. g8 g8 r4 r4]4"}]},ominous:{bpm:60,ch:[{ins:"strings",vol:.4,rev:.6,mml:"L [o3 d16 d16 d16 d16]8 [o3 e-16 e-16 e-16 e-16]4 [o3 d16 d16 d16 d16]4"},{ins:"slowstr",vol:.35,rev:.6,mml:"L o2 d1 d1 e-1 d1"},{ins:"timpani",vol:.35,rev:.5,mml:"L [o2 d8 d8 r4 r2]4"}]},fallen:{bpm:72,ch:[{ins:"musicbox",vol:.6,rev:.6,pan:.1,mml:`r1 L ${Hr} ${kr}`},{ins:"harp",vol:.35,rev:.6,pan:-.2,mml:`${lt(re("Am"),[0,2,3,11],.5,52)} L ${lt([...as,...Ui],[0,2,3,11],.5,52)}`},{ins:"slowstr",vol:.3,rev:.6,mml:`r1 L ${ht([...as,...Ui],60)}`}]}};var Bm={...cm,...pm,...Em,...Nm,...Om};var Oc={white:"#ffffff",red:"#ff3434",yellow:"#ffff00",blue:"#2f7dff",cyan:"#46e6ff",orange:"#ff9a1f",green:"#35ff58",purple:"#c95cff",pink:"#ff79d6",gray:"#8d8d8d",gold:"#ffd257"},km=document.createElement("canvas").getContext("2d"),od=new Map;function Bc(i,e){let t=e+"|"+i,n=od.get(t);return n===void 0&&(km.font=e,n=km.measureText(i).width,od.set(t,n)),n}function Hm(){od.clear()}function qM(i){let e=[],t=Oc.white,n=null,s=1,r=0;for(;r<i.length;){let a=i[r];if(a==="["){let o=i.indexOf("]",r);if(o>r){let l=i.slice(r+1,o),c=!0;if(Oc[l]?t=Oc[l]:l.startsWith("#")?t=l:l==="/"?(t=Oc.white,n=null,s=1):l==="shake"||l==="wave"?n=l:l==="p"?e.length&&(e[e.length-1].pause+=.3):l==="P"?e.length&&(e[e.length-1].pause+=.8):l.startsWith("s:")?s=parseFloat(l.slice(2))||1:c=!1,c){r=o+1;continue}}}e.push({ch:a,color:t,fx:n,speed:s,pause:0,x:0,y:0}),r++}return e}function YM(i,e,t,n,s){let r=Ur(t,n),a=0,o=0,l=0,c=!0,h=0,d=i.length,u=1;for(;h<d;){let f=i[h];if(f.ch===`
`){f.x=a,f.y=o,f.hidden=!0,a=0,o+=s,u++,l=0,c=!0,h++;continue}if(c&&f.ch==="*"&&i[h+1]&&i[h+1].ch===" "&&(l=Bc("* ",r)),c=!1,f.ch===" "){f.x=a,f.y=o,a+=Bc(" ",r),h++;continue}let p=h,y=0;for(;p<d&&i[p].ch!==" "&&i[p].ch!==`
`;)y+=Bc(i[p].ch,r),p++;a+y>e&&a>l&&(a=l,o+=s,u++);for(let m=h;m<p;m++)i[m].x=a,i[m].y=o,a+=Bc(i[m].ch,r);h=p}return{lines:u,height:u*s}}function ZM(i,e,t,n,s,r,a,o,l=1){i.save(),i.font=Ur(r,a),i.textBaseline="top",i.textAlign="left",i.globalAlpha=l;let c=Math.min(s,e.length);for(let h=0;h<c;h++){let d=e[h];if(d.hidden||d.ch===" ")continue;let u=0,f=0;d.fx==="shake"?(u=(Math.random()-.5)*2.2,f=(Math.random()-.5)*2.2):d.fx==="wave"&&(f=Math.sin(o*6+h*.6)*2.5),i.fillStyle=d.color,i.fillText(d.ch,Math.round(t+d.x+u),Math.round(n+d.y+f))}i.restore()}var Fi=class{constructor(e,t={}){this.size=t.size??26,this.family=t.family??st.ui,this.lineHeight=t.lineHeight??Math.round(this.size*1.35),this.cps=t.cps??32,this.onBlip=t.onBlip,this.blipEvery=t.blipEvery??2,this.glyphs=qM(e),this.layout=YM(this.glyphs,t.width??700,this.size,this.family,this.lineHeight),this.shown=0,this.timer=t.delay??0,this.blipCount=0,this.done=this.glyphs.length===0,this.instant=!!t.instant,this.instant&&this.skip()}skip(){this.shown=this.glyphs.length,this.done=!0}update(e){if(this.done)return;this.timer-=e;let t=0;for(;this.timer<=0&&!this.done&&t++<50;){let n=this.glyphs[this.shown];this.shown++;let s=1/(this.cps*n.speed),r=this.glyphs[this.shown];/[.!?]/.test(n.ch)&&(!r||r.ch===" "||r.ch===`
`)?s+=.18:(n.ch===","||n.ch===";"||n.ch===":"||n.ch==="."&&r&&r.ch===".")&&(s+=.1),s+=n.pause,/[A-Za-z0-9]/.test(n.ch)&&(this.blipCount%this.blipEvery===0&&this.onBlip&&this.onBlip(n.ch),this.blipCount++),this.timer+=s,this.shown>=this.glyphs.length&&(this.done=!0)}}draw(e,t,n,s,r=1){ZM(e,this.glyphs,t,n,this.shown,this.size,this.family,s,r)}};var cd={};function zm(i){Object.assign(cd,i)}function JM(i){return cd[i]||cd.narrator||{voice:"narrator"}}var ld={x:40,y:372,w:880,h:150},hd=class{constructor(e,t,n){this.spk=e,this.pages=t,this.opts=n,this.page=0,this.choices=n.choices||null,this.choiceIdx=n.defaultChoice??0,this.choosing=!1,this.alpha=0,this.closing=!1,this.time=0,this.makeTyper()}makeTyper(){let e=this.spk,t=this.pages[this.page],n=e.font||st.ui,s=e.size||(n===st.taper?30:n===st.wick?27:26);this.typer=new Fi(t,{width:ld.w-70,size:s,family:n,cps:(e.cps||32)*(this.opts.cps||1)*tt.textSpeed,onBlip:()=>ze.voice(e.voice),blipEvery:e.blipEvery||2,delay:this.page===0?.08:0}),this.autoTimer=this.opts.auto??null}update(e,t){if(this.time+=e,this.alpha=Math.min(1,this.alpha+e*8),!this.closing&&(this.typer.update(e),!!t)){if(this.choosing){let n=this.choices.length,s=n<=2,r=s?"left":"up",a=s?"right":"down";He.pressed(r)&&(this.choiceIdx=(this.choiceIdx+n-1)%n,ze.move()),He.pressed(a)&&(this.choiceIdx=(this.choiceIdx+1)%n,ze.move()),He.pressed("confirm")&&(ze.select(),this.finish(this.choiceIdx));return}if(!this.typer.done){He.pressed("cancel")&&!this.opts.noSkip&&this.typer.skip();return}if(this.choices&&this.page===this.pages.length-1){this.choosing=!0;return}if(this.autoTimer!=null){this.autoTimer-=e,this.autoTimer<=0&&this.advance();return}He.pressed("confirm")&&this.advance()}}advance(){this.page<this.pages.length-1?(this.page++,this.makeTyper()):this.choices?this.choosing=!0:this.finish(0)}finish(e){this.closing=!0,qe.removeOverlay(this),this.resolve(e)}draw(e){let t=e.ctx,n=this.opts.pos==="top"?{...ld,y:18}:ld;t.save(),t.globalAlpha=this.alpha,e.box(n.x,n.y,n.w,n.h,{fill:"rgba(0,0,0,0.92)"});let s=this.spk;if(s.name&&!this.opts.hideName){let r=typeof s.name=="function"?s.name():s.name;t.font=`20px ${st.small}, monospace`;let a=t.measureText(r).width+28,o=n.y-26;t.fillStyle="#000",t.fillRect(n.x+18,o,a,30),t.strokeStyle=s.color||"#fff",t.lineWidth=3,t.strokeRect(n.x+19.5,o+1.5,a-3,27),e.text(r,n.x+32,o+5,{size:20,family:st.small,color:s.color||"#fff"})}if(this.typer.draw(t,n.x+32,n.y+22,this.time),this.choosing){let r=this.choices.length,a=n.y+22+this.typer.layout.height+6;if(r<=2){let o=[n.x+180,n.x+520];this.choices.forEach((l,c)=>{e.text(l,o[c],a,{size:26,color:c===this.choiceIdx?"#ffff00":"#fff"}),c===this.choiceIdx&&e.heart(o[c]-22,a+13,18,"#ff2020")})}else this.choices.forEach((o,l)=>{let c=l%2,h=Math.floor(l/2),d=n.x+90+c*380,u=a+h*30;e.text(o,d,u,{size:24,color:l===this.choiceIdx?"#ffff00":"#fff"}),l===this.choiceIdx&&e.heart(d-20,u+12,16,"#ff2020")})}else this.typer.done&&this.autoTimer==null&&Math.floor(this.time*3)%2===0&&e.heart(n.x+n.w-28,n.y+n.h-24,12,"#ffffff",{alpha:.8});t.restore()}};function Gm(i,e,t={}){typeof e=="string"&&(e=[e]);let n=typeof i=="object"?i:JM(i||"narrator");return new Promise(s=>{let r=new hd(n,e,t);r.resolve=s,qe.pushOverlay(r)})}function Vm(i,e,t){return Gm(i,e,t)}async function ud(i,e,t,n={}){return Gm(i,typeof e=="string"?[e]:e,{...n,choices:t})}var qt={determination:{id:"determination",trait:"DETERMINATION",color:"#ff2a2a",echo:"Rue",echoTitle:"the stubborn one",item:"a red ribbon",blurb:"A heart that refuses to break. Fall, stand, try again.",action:"STEEL",actionDesc:"Press X to harden your SOUL: a moment of invulnerability.",passive:"REFUSE",passiveDesc:"Once per battle, a fatal hit leaves you at 1 HP instead.",stats:{hp:0,atk:0,def:0},tree:{heart:[{id:"dt_holdon",name:"Hold On",cost:1,type:"ability",ability:"holdon",desc:"SOUL skill (30%): heal 8 + your LV."},{id:"dt_stay",name:"Stay Determined",cost:1,type:"passive",desc:"REFUSE also restores 25% of your HP."},{id:"dt_word",name:"Kind Word",cost:2,type:"ability",ability:"kindword",desc:"SOUL skill (25%): speak with conviction. +30 MERCY."},{id:"dt_keep",name:"Keep Going",cost:2,type:"passive",desc:"Heal 1 + 5% max HP at the start of each of your turns."}],soul:[{id:"dt_nerve",name:"Steel Nerve",cost:1,type:"mod",desc:"STEEL recharges in 3s instead of 4s."},{id:"dt_temper",name:"Tempered",cost:1,type:"mod",desc:"STEEL lasts 0.8s."},{id:"dt_ember",name:"Ember Heart",cost:2,type:"passive",desc:"Grazing bullets builds RESOLVE 50% faster."},{id:"dt_checkpoint",name:"Checkpoint",cost:2,type:"ability",ability:"checkpoint",desc:"SOUL skill (100%): full heal, and the next attack cannot hurt you for 2s."}],blade:[{id:"dt_steady",name:"Steady Hands",cost:1,type:"passive",stats:{atk:2},desc:"ATK +2."},{id:"dt_resolute",name:"Resolute Strike",cost:1,type:"ability",ability:"critnext",desc:"SOUL skill (35%): your next FIGHT is a perfect hit x1.5."},{id:"dt_unyield",name:"Unyielding",cost:2,type:"passive",stats:{def:2,hp:8},desc:"DEF +2, max HP +8."},{id:"dt_burn",name:"Burning Will",cost:2,type:"ability",ability:"burn",desc:"SOUL skill (60%): 20 + 3xLV damage, ignoring DEF."}]}},patience:{id:"patience",trait:"PATIENCE",color:"#42e8ff",echo:"Ivo",echoTitle:"the quiet one",item:"a toy knife",blurb:"Stillness is a kind of strength. Wait for the opening.",action:"STILL",actionDesc:"Hold X to slow time around you. The focus meter refills when released.",passive:"CALM",passiveDesc:"Standing still slowly restores HP while dodging.",stats:{hp:4,atk:-1,def:0},tree:{heart:[{id:"pa_breath",name:"Deep Breath",cost:1,type:"ability",ability:"breath",desc:"SOUL skill (25%): heal 6, then regenerate during the next attack."},{id:"pa_wait",name:"Waiting Game",cost:1,type:"passive",desc:"Every ACT gives +10 extra MERCY."},{id:"pa_lull",name:"Lull",cost:2,type:"ability",ability:"lull",desc:"SOUL skill (30%): the next attack is 30% slower. +20 MERCY."},{id:"pa_serene",name:"Serenity",cost:2,type:"passive",desc:"CALM regeneration is twice as fast."}],soul:[{id:"pa_longer",name:"Longer Breath",cost:1,type:"mod",desc:"STILL focus lasts 3.5s instead of 2.5s."},{id:"pa_deeper",name:"Deeper Stillness",cost:1,type:"mod",desc:"STILL slows bullets to 30% instead of 45%."},{id:"pa_unhurried",name:"Unhurried",cost:2,type:"passive",desc:"Cyan bullets heal 1 HP when they pass through you while still."},{id:"pa_stopwatch",name:"Stopwatch",cost:2,type:"ability",ability:"stopwatch",desc:"SOUL skill (70%): the next attack is frozen for its first 2.5s."}],blade:[{id:"pa_measured",name:"Measured Cut",cost:1,type:"passive",desc:"The FIGHT cursor moves 25% slower."},{id:"pa_counter",name:"Counter",cost:1,type:"passive",desc:"After a turn without damage, your next FIGHT deals +50%."},{id:"pa_patient",name:"Patient Strike",cost:2,type:"ability",ability:"patient",desc:"SOUL skill (40%): damage grows with every turn of the battle."},{id:"pa_hourglass",name:"Hourglass",cost:2,type:"passive",stats:{hp:10,def:2},desc:"Max HP +10, DEF +2."}]}},bravery:{id:"bravery",trait:"BRAVERY",color:"#ff9a1f",echo:"Tamsin",echoTitle:"the loud one",item:"a pair of scuffed gloves",blurb:"Charge in. Being afraid and going anyway is the whole point.",action:"DASH",actionDesc:"Press X to dash in the direction you move, briefly untouchable.",passive:"VALOR",passiveDesc:"You move 20% faster and FIGHT deals 15% more.",stats:{hp:-2,atk:2,def:0},tree:{heart:[{id:"br_rally",name:"Rally",cost:1,type:"ability",ability:"rally",desc:"SOUL skill (25%): ATK +4 and DEF +2 for 3 turns."},{id:"br_face",name:"Brave Face",cost:1,type:"passive",desc:"The first attack of each battle deals 20% less."},{id:"br_stand",name:"Stand Up For",cost:2,type:"ability",ability:"standup",desc:"SOUL skill (30%): defend them from themselves. +35 MERCY."},{id:"br_heroic",name:"Heroic",cost:2,type:"passive",desc:"Below 30% HP, all damage taken is reduced by 30%."}],soul:[{id:"br_quick",name:"Quick Feet",cost:1,type:"mod",desc:"DASH recharges in 0.8s."},{id:"br_after",name:"Afterimage",cost:1,type:"mod",desc:"DASH invulnerability lasts longer."},{id:"br_momentum",name:"Momentum",cost:2,type:"passive",desc:"Move another 10% faster."},{id:"br_blaze",name:"Blaze Trail",cost:2,type:"mod",desc:"Dashing through small bullets burns them away."}],blade:[{id:"br_knuckle",name:"Tough Knuckles",cost:1,type:"passive",stats:{atk:3},desc:"ATK +3."},{id:"br_flurry",name:"Flurry",cost:1,type:"ability",ability:"flurry",desc:"SOUL skill (40%): your next FIGHT strikes three times."},{id:"br_nofear",name:"No Fear",cost:2,type:"passive",desc:"The critical window on the FIGHT bar is wider."},{id:"br_charge",name:"Charge",cost:2,type:"ability",ability:"charge",desc:"SOUL skill (60%): next FIGHT deals double and ignores DEF."}]}},integrity:{id:"integrity",trait:"INTEGRITY",color:"#2f6dff",echo:"Odette",echoTitle:"the graceful one",item:"a pair of worn ballet slippers",blurb:"Stand straight. Tell the truth. Move like you mean it.",action:"BLINK",actionDesc:"Press X to step through space a short distance.",passive:"POISE",passiveDesc:"DEF +3. In gravity fields you can double jump.",stats:{hp:0,atk:0,def:3},tree:{heart:[{id:"in_plea",name:"Honest Plea",cost:1,type:"ability",ability:"plea",desc:"SOUL skill (25%): tell them the truth. +30 MERCY."},{id:"in_poise",name:"Composure",cost:1,type:"passive",stats:{def:2},desc:"DEF +2."},{id:"in_grace",name:"Grace",cost:2,type:"ability",ability:"grace",desc:"SOUL skill (35%): heal 12 and shake off slowdowns."},{id:"in_duet",name:"Pas de Deux",cost:2,type:"passive",desc:"Sparing a monster heals 25% of your HP."}],soul:[{id:"in_stride",name:"Long Stride",cost:1,type:"mod",desc:"BLINK reaches further."},{id:"in_recover",name:"Quick Recovery",cost:1,type:"mod",desc:"BLINK recharges in 1.4s."},{id:"in_pirouette",name:"Pirouette",cost:2,type:"mod",desc:"You are untouchable for a moment after a BLINK."},{id:"in_feather",name:"Featherweight",cost:2,type:"passive",desc:"Jump higher in gravity fields, and jump three times."}],blade:[{id:"in_form",name:"Clean Form",cost:1,type:"passive",stats:{atk:2},desc:"ATK +2."},{id:"in_fouette",name:"Fouett\xE9",cost:1,type:"ability",ability:"double",desc:"SOUL skill (35%): your next FIGHT strikes twice."},{id:"in_posture",name:"Iron Posture",cost:2,type:"passive",stats:{def:3,hp:6},desc:"DEF +3, max HP +6."},{id:"in_jete",name:"Grand Jet\xE9",cost:2,type:"ability",ability:"jete",desc:"SOUL skill (60%): a leaping strike for 25 + 3xLV damage."}]}},perseverance:{id:"perseverance",trait:"PERSEVERANCE",color:"#c95cff",echo:"Fenn",echoTitle:"the careful one",item:"a dog-eared notebook",blurb:"You can always turn back a page and try the sentence again.",action:"ANCHOR",actionDesc:"Press X to drop an anchor. Press again to snap back to it.",passive:"MARGINS",passiveDesc:"40% of damage taken can be won back by grazing bullets.",stats:{hp:2,atk:0,def:1},tree:{heart:[{id:"pe_study",name:"Study",cost:1,type:"ability",ability:"study",desc:"SOUL skill (15%): learn their HP, MERCY and a hint. +10 MERCY."},{id:"pe_notes",name:"Take Notes",cost:1,type:"passive",desc:"Every ACT gives +8 extra MERCY."},{id:"pe_encourage",name:"Encourage",cost:2,type:"ability",ability:"encourage",desc:"SOUL skill (30%): +25 MERCY to every monster."},{id:"pe_ending",name:"Happy Ending",cost:2,type:"passive",desc:"Sparing gives double HOPE."}],soul:[{id:"pe_bookmark",name:"Bookmark",cost:1,type:"mod",desc:"Snapping back to your anchor heals 2 HP."},{id:"pe_margins",name:"Wide Margins",cost:1,type:"mod",desc:"60% of damage becomes recoverable."},{id:"pe_revision",name:"Revision",cost:2,type:"ability",ability:"revision",desc:"SOUL skill (50%): restore your HP to what it was last turn."},{id:"pe_epilogue",name:"Epilogue",cost:2,type:"mod",desc:"Snapping back makes you briefly untouchable."}],blade:[{id:"pe_pen",name:"Sharp Pen",cost:1,type:"passive",stats:{atk:2},desc:"ATK +2."},{id:"pe_twist",name:"Plot Twist",cost:1,type:"ability",ability:"twist",desc:"SOUL skill (35%): next FIGHT adds 3x your recoverable HP as damage."},{id:"pe_persist",name:"Persistence",cost:2,type:"passive",desc:"Each FIGHT in a row deals 10% more."},{id:"pe_final",name:"Final Chapter",cost:2,type:"ability",ability:"finalch",desc:"SOUL skill (60%): 18 + 3xLV damage, and heal half of it."}]}},kindness:{id:"kindness",trait:"KINDNESS",color:"#35ff58",echo:"Juniper",echoTitle:"the gentle one",item:"a flour-dusted apron",blurb:"Protect who you can. Feed everyone else.",action:"SHIELD",actionDesc:"Hold X to raise a shield toward the direction you face.",passive:"NURTURE",passiveDesc:"Healing items restore 50% more. Heal 2 HP each turn.",stats:{hp:6,atk:-2,def:0},tree:{heart:[{id:"ki_mend",name:"Mend",cost:1,type:"ability",ability:"mend",desc:"SOUL skill (20%): heal 12."},{id:"ki_meal",name:"Warm Meal",cost:1,type:"passive",desc:"Items heal another 25% more."},{id:"ki_soothe",name:"Soothe",cost:2,type:"ability",ability:"soothe",desc:"SOUL skill (30%): +30 MERCY and their next attack is gentler."},{id:"ki_embrace",name:"Embrace",cost:2,type:"ability",ability:"embrace",desc:"SOUL skill (70%): if their MERCY is 50% or more, spare them now."}],soul:[{id:"ki_wide",name:"Wide Guard",cost:1,type:"mod",desc:"The shield covers a wider arc."},{id:"ki_steady",name:"Steady Guard",cost:1,type:"mod",desc:"No slowdown while shielding."},{id:"ki_reflect",name:"Reflect",cost:2,type:"passive",desc:"Every third blocked bullet heals 1 HP."},{id:"ki_aegis",name:"Aegis",cost:2,type:"ability",ability:"aegis",desc:"SOUL skill (60%): a full ring of shield for the first 3s of the next attack."}],blade:[{id:"ki_firm",name:"Firm Hand",cost:1,type:"passive",stats:{atk:2},desc:"ATK +2."},{id:"ki_tough",name:"Tough Love",cost:1,type:"ability",ability:"toughlove",desc:"SOUL skill (30%): a half-strength FIGHT that also gives +20 MERCY."},{id:"ki_bigheart",name:"Big Heart",cost:2,type:"passive",stats:{hp:12},desc:"Max HP +12."},{id:"ki_pan",name:"Frying Pan",cost:2,type:"ability",ability:"pan",desc:"SOUL skill (55%): 16 + 3xLV damage, and heal 10."}]}},justice:{id:"justice",trait:"JUSTICE",color:"#ffe81f",echo:"Colt",echoTitle:"the fair one",item:"a battered cowboy hat",blurb:"Draw only when you have to. Aim true when you do.",action:"SHOOT",actionDesc:"Press X to fire upward. Shots break most small bullets.",passive:"RESOLVE",passiveDesc:"FIGHT deals 20% more. Breaking bullets builds RESOLVE.",stats:{hp:0,atk:3,def:-1},tree:{heart:[{id:"ju_warn",name:"Fair Warning",cost:1,type:"ability",ability:"warning",desc:"SOUL skill (20%): their next attack is 30% shorter. +15 MERCY."},{id:"ju_fair",name:"Fair Play",cost:1,type:"passive",desc:"Sparing a monster restores 5 HP."},{id:"ju_deputy",name:"Deputize",cost:2,type:"ability",ability:"deputize",desc:"SOUL skill (30%): offer them a badge. +35 MERCY."},{id:"ju_truce",name:"Truce",cost:2,type:"passive",stats:{def:2},desc:"DEF +2, and MERCY gains are 20% larger."}],soul:[{id:"ju_draw",name:"Quick Draw",cost:1,type:"mod",desc:"Fire faster."},{id:"ju_iron",name:"Big Iron",cost:1,type:"mod",desc:"Shots are larger and pierce."},{id:"ju_spread",name:"Spread Shot",cost:2,type:"mod",desc:"Fire three shots at once."},{id:"ju_sharp",name:"Sharpshooter",cost:2,type:"passive",desc:"Every fifth bullet you break heals 1 HP."}],blade:[{id:"ju_aim",name:"Aim",cost:1,type:"ability",ability:"critnext",desc:"SOUL skill (25%): your next FIGHT is a perfect hit."},{id:"ju_six",name:"Six Shooter",cost:1,type:"passive",stats:{atk:3},desc:"ATK +3."},{id:"ju_noon",name:"High Noon",cost:2,type:"ability",ability:"noon",desc:"SOUL skill (50%): your next FIGHT strikes four times."},{id:"ju_judge",name:"Judgement",cost:2,type:"ability",ability:"judge",desc:"SOUL skill (70%): 10 + 5xLV damage."}]}}},ii=["determination","patience","bravery","integrity","perseverance","kindness","justice"],KM={holdon:{name:"Hold On",cost:30,desc:"Heal 8 + LV."},kindword:{name:"Kind Word",cost:25,desc:"+30 MERCY.",target:!0},checkpoint:{name:"Checkpoint",cost:100,desc:"Full heal; next attack cannot hurt for 2s."},critnext:{name:"Aim",cost:30,desc:"Next FIGHT is perfect."},burn:{name:"Burning Will",cost:60,desc:"20 + 3xLV damage.",target:!0},breath:{name:"Deep Breath",cost:25,desc:"Heal 6 and regenerate."},lull:{name:"Lull",cost:30,desc:"Slower attack. +20 MERCY.",target:!0},stopwatch:{name:"Stopwatch",cost:70,desc:"Freeze the next attack for 2.5s."},patient:{name:"Patient Strike",cost:40,desc:"Damage grows each turn.",target:!0},rally:{name:"Rally",cost:25,desc:"ATK +4, DEF +2 for 3 turns."},standup:{name:"Stand Up For",cost:30,desc:"+35 MERCY.",target:!0},flurry:{name:"Flurry",cost:40,desc:"Next FIGHT strikes 3x."},charge:{name:"Charge",cost:60,desc:"Next FIGHT x2, ignores DEF."},plea:{name:"Honest Plea",cost:25,desc:"+30 MERCY.",target:!0},grace:{name:"Grace",cost:35,desc:"Heal 12."},double:{name:"Fouett\xE9",cost:35,desc:"Next FIGHT strikes twice."},jete:{name:"Grand Jet\xE9",cost:60,desc:"25 + 3xLV damage.",target:!0},study:{name:"Study",cost:15,desc:"Reveal stats. +10 MERCY.",target:!0},encourage:{name:"Encourage",cost:30,desc:"+25 MERCY to all."},revision:{name:"Revision",cost:50,desc:"Restore last turn's HP."},twist:{name:"Plot Twist",cost:35,desc:"Next FIGHT + 3x grey HP."},finalch:{name:"Final Chapter",cost:60,desc:"18 + 3xLV dmg, heal half.",target:!0},mend:{name:"Mend",cost:20,desc:"Heal 12."},soothe:{name:"Soothe",cost:30,desc:"+30 MERCY, gentler attack.",target:!0},embrace:{name:"Embrace",cost:70,desc:"Spare if MERCY >= 50%.",target:!0},aegis:{name:"Aegis",cost:60,desc:"Full shield for 3s."},toughlove:{name:"Tough Love",cost:30,desc:"Soft FIGHT, +20 MERCY."},pan:{name:"Frying Pan",cost:55,desc:"16 + 3xLV dmg, heal 10.",target:!0},warning:{name:"Fair Warning",cost:20,desc:"Shorter attack. +15 MERCY.",target:!0},deputize:{name:"Deputize",cost:30,desc:"+35 MERCY.",target:!0},noon:{name:"High Noon",cost:50,desc:"Next FIGHT strikes 4x."},judge:{name:"Judgement",cost:70,desc:"10 + 5xLV damage.",target:!0}};KM.critnext.cost=30;var Wm={narrator:{voice:"narrator"},sprig:{name:"SPRIG",voice:"sprig",color:"#ffe14a"},sprig_evil:{name:"SPRIG",voice:"sprig_evil",color:"#ffe14a",cps:26},willow:{name:"WILLOW",voice:"willow",color:"#f2a66a",cps:28},wick:{name:"wick",voice:"wick",color:"#8fd3ff",font:st.wick,blipEvery:3,cps:28},taper:{name:"TAPER",voice:"taper",color:"#ff7a3a",font:st.taper,cps:34},maris:{name:"MARIS",voice:"maris",color:"#4ad0c0",cps:34},lotl:{name:"DR. LOTL",voice:"lotl",color:"#ff9ad0",cps:36},luxe:{name:"LUXE",voice:"luxe",color:"#ff5ad0",cps:34},king:{name:"OAKHEART",voice:"king",color:"#e8c060",cps:26},rowan:{name:"ROWAN",voice:"rowan",color:"#9ae07a",cps:30},hush:{name:"hush",voice:"hush",color:"#b8c0ff",cps:18,blipEvery:3},tuft:{name:"TUFT",voice:"tuft",color:"#ffb04a",cps:36},silk:{name:"MADAME SILK",voice:"silk",color:"#c070ff"},mitts:{name:"MITTS",voice:"high",color:"#f0d0e0"},cinder:{name:"CINDER",voice:"low",color:"#ff9a4a"},monster:{name:"MONSTER",voice:"monster",color:"#ddd"},wren:{name:"???",voice:"wren",color:"#ff3030",cps:24},echo:{get name(){return(qt[nn.soul]?.echo||"ECHO").toUpperCase()},get color(){return qt[nn.soul]?.color||"#fff"},voice:"echo",cps:26}};var Bs=null;function jM(){if(Bs)return Bs;let i=new Uint8Array([70,70,70,255,150,150,150,255,225,225,225,255,255,255,255,255]);return Bs=new bs(i,4,1,Sn),Bs.minFilter=Nt,Bs.magFilter=Nt,Bs.needsUpdate=!0,Bs}var Gr=new Map;function ut(i,e={}){let t="toon"+i+JSON.stringify(e);if(!e.map&&!e.unique&&Gr.has(t))return Gr.get(t);let n=new As({color:new Se(i),gradientMap:jM(),map:e.map||null,transparent:!!e.transparent,opacity:e.opacity??1,side:e.side??On});return e.emissive&&(n.emissive=new Se(e.emissive),n.emissiveIntensity=e.emissiveIntensity??1),!e.map&&!e.unique&&Gr.set(t,n),n}function wn(i,e={}){let t="lit"+i+JSON.stringify({...e,map:!!e.map});if(!e.map&&!e.unique&&Gr.has(t))return Gr.get(t);let n=new Ts({color:new Se(i),roughness:e.roughness??.85,metalness:e.metalness??0,map:e.map||null,normalMap:e.normalMap||null,flatShading:!!e.flat,transparent:!!e.transparent,opacity:e.opacity??1,side:e.side??On});return e.emissive&&(n.emissive=new Se(e.emissive),n.emissiveIntensity=e.emissiveIntensity??1,e.emissiveMap&&(n.emissiveMap=e.emissiveMap)),!e.map&&!e.unique&&Gr.set(t,n),n}function ls(i,e=2,t={}){return new un({color:new Se(i).multiplyScalar(e),transparent:t.transparent??!1,opacity:t.opacity??1,blending:t.additive?dn:di,depthWrite:!t.additive,toneMapped:!1,side:t.side??On})}var dd=new Map;function QM(i){return dd.has(i)||dd.set(i,new un({color:i,side:Zt})),dd.get(i)}function eb(i,e=.025,t="#140c1c"){let n=i.geometry,s=QM(t).clone();s.onBeforeCompile=a=>{a.uniforms.uThick={value:e},a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
uniform float uThick;`).replace("#include <begin_vertex>",`#include <begin_vertex>
transformed += normalize(normal) * uThick;`)};let r=new ue(n,s);return r.name="outline",r.raycast=()=>{},i.add(r),r}function ks(i,e=.022,t){let n=[];i.traverse(s=>{s.isMesh&&s.name!=="outline"&&!s.userData.noOutline&&n.push(s)});for(let s of n){let r=s.scale,a=(Math.abs(r.x)+Math.abs(r.y)+Math.abs(r.z))/3||1;eb(s,e/a,t)}return i}function cs(i,e=!0,t=!1){return i.traverse(n=>{n.isMesh&&n.name!=="outline"&&(n.castShadow=e,n.receiveShadow=t)}),i}var fd=new Map;function tb(i,e){let t=document.createElement("canvas");return t.width=i,t.height=e,t}function nb(i,e=[1,1],t={}){let n=new $i(i);return n.wrapS=n.wrapT=dr,n.repeat.set(e[0],e[1]),n.colorSpace=t.linear?ni:Vt,n.anisotropy=4,t.pixel&&(n.magFilter=Nt,n.minFilter=Ds),n}function Ht(i,e){let t=new Se(i);return t.offsetHSL(0,0,e),"#"+t.getHexString()}function kc(i,e,t,n,s,r,a=2){for(let o=0;o<r;o++){i.fillStyle=s[Math.floor(n.next()*s.length)],i.globalAlpha=.15+n.next()*.25;let l=a*(.5+n.next());i.fillRect(n.next()*e,n.next()*t,l,l)}i.globalAlpha=1}function zn(i,e,t,n,s={}){if(fd.has(i)){let l=fd.get(i).clone();return l.needsUpdate=!0,l}let r=tb(e,t),a=r.getContext("2d");n(a,e,t,Ec(s.seed??7));let o=nb(r,[1,1],s);return fd.set(i,o),o.clone()}var hs={bricks(i="#6a3f8a",e="#3b2150",t={}){return zn("bricks"+i+e,256,256,(n,s,r,a)=>{n.fillStyle=e,n.fillRect(0,0,s,r);let o=8,l=r/o,c=s/4;for(let h=0;h<o;h++){let d=h%2?c/2:0;for(let u=-1;u<5;u++){let f=u*c+d,p=h*l;n.fillStyle=Ht(i,(a.next()-.5)*.08),n.fillRect(f+2,p+2,c-4,l-4),n.fillStyle=Ht(i,.08),n.fillRect(f+2,p+2,c-4,2),n.fillStyle=Ht(i,-.1),n.fillRect(f+2,p+l-4,c-4,2)}}kc(n,s,r,a,[Ht(i,.15),Ht(i,-.2)],600)},t)},tiles(i="#7a4f9a",e="#4b2d63",t={}){return zn("tiles"+i+e,256,256,(n,s,r,a)=>{n.fillStyle=e,n.fillRect(0,0,s,r);let o=4,l=s/o;for(let c=0;c<o;c++)for(let h=0;h<o;h++)n.fillStyle=Ht(i,(a.next()-.5)*.06),n.fillRect(h*l+2,c*l+2,l-4,l-4),n.fillStyle=Ht(i,.05),n.fillRect(h*l+2,c*l+2,l-4,3);n.strokeStyle=Ht(e,-.05),n.globalAlpha=.5;for(let c=0;c<6;c++){n.beginPath();let h=a.next()*s,d=a.next()*r;n.moveTo(h,d);for(let u=0;u<5;u++)h+=(a.next()-.5)*30,d+=(a.next()-.5)*30,n.lineTo(h,d);n.stroke()}n.globalAlpha=1,kc(n,s,r,a,[Ht(i,.1),Ht(i,-.15)],500)},t)},noise(i="#ffffff",e=.06,t={}){return zn("noise"+i+e,256,256,(n,s,r,a)=>{n.fillStyle=i,n.fillRect(0,0,s,r);for(let o=0;o<3e3;o++){n.fillStyle=Ht(i,(a.next()-.5)*e*2),n.globalAlpha=.5;let l=2+a.next()*6;n.fillRect(a.next()*s,a.next()*r,l,l)}n.globalAlpha=1},t)},snow(i={}){return zn("snow",256,256,(e,t,n,s)=>{e.fillStyle="#e9f1ff",e.fillRect(0,0,t,n);for(let r=0;r<200;r++){let a=s.next()*t,o=s.next()*n,l=8+s.next()*30,c=e.createRadialGradient(a,o,0,a,o,l);c.addColorStop(0,s.next()<.5?"rgba(200,215,255,0.35)":"rgba(255,255,255,0.5)"),c.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=c,e.fillRect(a-l,o-l,l*2,l*2)}kc(e,t,n,s,["#ffffff","#c9d8f5"],800,2)},i)},planks(i="#8a5a34",e={}){return zn("planks"+i,256,256,(t,n,s,r)=>{let o=s/6;for(let l=0;l<6;l++){t.fillStyle=Ht(i,(r.next()-.5)*.1),t.fillRect(0,l*o,n,o),t.strokeStyle=Ht(i,-.12),t.globalAlpha=.35;for(let h=0;h<6;h++){t.beginPath();let d=l*o+r.next()*o;t.moveTo(0,d),t.bezierCurveTo(n*.3,d+(r.next()-.5)*8,n*.6,d+(r.next()-.5)*8,n,d),t.stroke()}t.globalAlpha=1,t.fillStyle=Ht(i,-.2),t.fillRect(0,l*o,n,2);let c=r.next()*n;t.fillRect(c,l*o,2,o)}},e)},rock(i="#2d3a5c",e={}){return zn("rock"+i,256,256,(t,n,s,r)=>{t.fillStyle=i,t.fillRect(0,0,n,s);for(let a=0;a<90;a++){let o=r.next()*n,l=r.next()*s,c=10+r.next()*40;t.fillStyle=Ht(i,(r.next()-.5)*.12),t.beginPath(),t.moveTo(o+c,l);for(let h=0;h<7;h++){let d=h/7*Math.PI*2,u=c*(.6+r.next()*.5);t.lineTo(o+Math.cos(d)*u,l+Math.sin(d)*u)}t.fill()}kc(t,n,s,r,[Ht(i,.12),Ht(i,-.15)],700)},e)},metal(i="#5b5f6e",e={}){return zn("metal"+i,256,256,(t,n,s,r)=>{t.fillStyle=i,t.fillRect(0,0,n,s);let a=128;for(let o=0;o<2;o++)for(let l=0;l<2;l++){t.fillStyle=Ht(i,(r.next()-.5)*.05),t.fillRect(l*a+2,o*a+2,a-4,a-4),t.fillStyle=Ht(i,-.2);for(let[c,h]of[[10,10],[a-14,10],[10,a-14],[a-14,a-14]])t.beginPath(),t.arc(l*a+c+2,o*a+h+2,4,0,Math.PI*2),t.fill()}t.strokeStyle=Ht(i,.1),t.globalAlpha=.2;for(let o=0;o<80;o++){t.beginPath();let l=r.next()*s;t.moveTo(0,l),t.lineTo(n,l+(r.next()-.5)*4),t.stroke()}t.globalAlpha=1},e)},grass(i="#3f7a3a",e={}){return zn("grass"+i,256,256,(t,n,s,r)=>{t.fillStyle=i,t.fillRect(0,0,n,s);for(let a=0;a<2500;a++){t.strokeStyle=Ht(i,(r.next()-.4)*.2),t.beginPath();let o=r.next()*n,l=r.next()*s;t.moveTo(o,l),t.lineTo(o+(r.next()-.5)*4,l-4-r.next()*6),t.stroke()}},e)},carpet(i="#8f2f3a",e="#e0b14a",t={}){return zn("carpet"+i+e,128,256,(n,s,r)=>{n.fillStyle=i,n.fillRect(0,0,s,r),n.fillStyle=e,n.fillRect(8,0,6,r),n.fillRect(s-14,0,6,r),n.globalAlpha=.25;for(let a=0;a<r;a+=32)n.beginPath(),n.moveTo(s/2,a+4),n.lineTo(s/2+14,a+16),n.lineTo(s/2,a+28),n.lineTo(s/2-14,a+16),n.fill();n.globalAlpha=1},t)},radial(i="#ffffff"){return zn("radial"+i,128,128,(e,t)=>{let n=e.createRadialGradient(t/2,t/2,0,t/2,t/2,t/2);n.addColorStop(0,i),n.addColorStop(.4,i+"88"),n.addColorStop(1,i+"00"),e.fillStyle=n,e.fillRect(0,0,t,t)})},shaft(){return zn("shaft",64,256,(i,e,t)=>{let n=i.createLinearGradient(0,0,0,t);n.addColorStop(0,"rgba(255,255,255,0)"),n.addColorStop(.25,"rgba(255,255,255,0.8)"),n.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=n,i.fillRect(0,0,e,t);let s=i.createLinearGradient(0,0,e,0);s.addColorStop(0,"rgba(0,0,0,1)"),s.addColorStop(.5,"rgba(0,0,0,0)"),s.addColorStop(1,"rgba(0,0,0,1)"),i.globalCompositeOperation="destination-out",i.fillStyle=s,i.fillRect(0,0,e,t)})},stained(i={}){return zn("stained",128,256,(e,t,n,s)=>{e.fillStyle="#2a1a08",e.fillRect(0,0,t,n);let r=["#ffcf4a","#ff9c2a","#fff1a8","#e8b33a","#ffd97a"];for(let a=8;a<n-8;a+=24)for(let o=8;o<t-8;o+=28)e.fillStyle=r[Math.floor(s.next()*r.length)],e.fillRect(o,a,24,20);e.fillStyle="#2a1a08",e.beginPath(),e.arc(t/2,60,30,0,Math.PI*2),e.fill(),e.fillStyle="#ff4a4a",e.beginPath(),e.arc(t/2,60,22,0,Math.PI*2),e.fill()},i)}};function Hs(i={}){let e=new ys;e.background=new Se(i.bg??"#050308"),i.fog!==!1&&(e.fog=new da(i.fogColor??i.bg??"#050308",i.fogDensity??.05));let t=new Da(i.sky??"#6a5a8a",i.ground??"#1a1020",i.hemi??.6);e.add(t),e.userData.hemi=t;let n=new Wt(i.fov??40,16/9,.1,300);return n.userData.baseFov=i.fov??40,{scene:e,cam:n}}var Vr=null;function ib(){if(Vr)return Vr;let i=new Es;return i.moveTo(0,-.5),i.bezierCurveTo(-.1,-.35,-.55,-.1,-.5,.18),i.bezierCurveTo(-.45,.45,-.1,.5,0,.25),i.bezierCurveTo(.1,.5,.45,.45,.5,.18),i.bezierCurveTo(.55,-.1,.1,-.35,0,-.5),Vr=new Mr(i,{depth:.18,bevelEnabled:!0,bevelSize:.05,bevelThickness:.06,bevelSegments:3,curveSegments:16}),Vr.center(),Vr}function zs(i,e=2.2,t=!0){let n=new Tt,s=new ue(ib(),ls(i,e));if(n.add(s),t){let r=new vr(new Ms({map:hs.radial("#ffffff"),color:i,transparent:!0,opacity:.55,blending:dn,depthWrite:!1}));r.scale.set(2.2,2.2,1),n.add(r),n.userData.halo=r}return n.userData.heart=s,n}function Gs(i){i.traverse(e=>{if(e.geometry&&e.geometry!==Vr&&e.geometry.dispose(),e.material){let t=Array.isArray(e.material)?e.material:[e.material];for(let n of t)n.map&&n.map.isCanvasTexture&&!n.map.userData?.shared&&n.map.dispose(),n.userData?.shared||n.dispose()}})}function us(i,e,t=0){let n=new ue(new Zi(i[0],i[1]),e);return n.rotation.x=-Math.PI/2,n.position.y=t,n.receiveShadow=!0,n}function Xm(i="#8ab0ff",e="#ffe0b0",t=60,n=0){let s=new Ct({side:Zt,depthWrite:!1,fog:!1,uniforms:{uTop:{value:new Se(i)},uBot:{value:new Se(e)},uH:{value:n}},vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uTop; uniform vec3 uBot; uniform float uH; varying vec3 vP; void main(){ float t = smoothstep(uH - 0.1, 0.6, vP.y); gl_FragColor = vec4(mix(uBot, uTop, t), 1.0); }"}),r=new ue(new pt(t,32,16),s);return r.renderOrder=-10,r.userData.noOutline=!0,r}var Hc=Math.PI*2,Oi=(i,e)=>i+Math.random()*(e-i);function $m(i=1.6,e=70,t=["#ffd23a","#ffe36a","#f5c02a"]){let n=new Tt,s=new an(.012,.015,.25,4),r=new pt(.045,6,4),a=new pt(.035,6,4),o=ut("#3f8a3a"),l=t.map(b=>ut(b,{emissive:b,emissiveIntensity:.15})),c=ut("#c96a1a"),h=new Ss(s,o,e),d=new Ss(r,l[0],e*5),u=new Ss(a,c,e),f=new xt,p=new Fn,y=new P,m=new P,g=new Se;for(let b=0;b<e;b++){let T=Oi(0,Hc),_=Math.sqrt(Math.random())*i,S=Math.cos(T)*_,w=Math.sin(T)*_,R=Oi(.18,.3);f.compose(m.set(S,R/2,w),p.identity(),y.set(1,R/.25,1)),h.setMatrixAt(b,f);let v=new P(S,R,w);p.setFromEuler(new Jn(Oi(-.4,.4),Oi(0,Hc),Oi(-.4,.4)));for(let E=0;E<5;E++){let C=E/5*Hc,I=new P(Math.cos(C)*.05,0,Math.sin(C)*.05).applyQuaternion(p);f.compose(m.copy(v).add(I),p,y.set(1,.45,1)),d.setMatrixAt(b*5+E,f),d.setColorAt(b*5+E,g.set(t[b%t.length]))}f.compose(m.copy(v).add(new P(0,.02,0)),p,y.set(1,.7,1)),u.setMatrixAt(b,f)}for(let b of[h,d,u])b.castShadow=!0,b.receiveShadow=!0,n.add(b);return n}function ro(i=10,e=1.4,t="#fff4d0",n=.35){let s=new Tt,r=new un({map:hs.shaft(),color:new Se(t),transparent:!0,opacity:n,blending:dn,depthWrite:!1,side:Mn,toneMapped:!1});for(let o=0;o<3;o++){let l=new ue(new an(e*(.55+o*.12),e*(.9+o*.2),i,24,1,!0),r);l.position.y=i/2,l.rotation.y=o*.7,l.userData.noOutline=!0,s.add(l)}let a=new ue(new Yi(e*1.2,32),new un({map:hs.radial("#ffffff"),color:new Se(t),transparent:!0,opacity:n*1.4,blending:dn,depthWrite:!1,toneMapped:!1}));return a.rotation.x=-Math.PI/2,a.position.y=.02,s.add(a),s}function qm(i=4,e=.35,t="#8d63ae",n={}){let s=new Tt,r=wn(t,{map:n.map||hs.bricks(t,"#3b2150"),roughness:.9}),a=new ue(new an(e,e*1.05,i,12),r);a.position.y=i/2,s.add(a);let o=wn(new Se(t).offsetHSL(0,0,.08).getStyle()),l=new ue(new jn(e*2.8,.3,e*2.8),o);l.position.y=.15,s.add(l);let c=l.clone();return c.position.y=i-.15,s.add(c),cs(s,!0,!0),s}function Ym(i=3.2,e=!0){let t=new Tt,n=new ue(new an(.12,.18,i*.3,6),ut("#4a2f1f"));n.position.y=i*.15,t.add(n);let s=ut("#1f4a3a"),r=ut("#eef4ff"),a=4;for(let o=0;o<a;o++){let l=(.95-o*.18)*(i/3.2),c=i*.34,h=i*.28+o*i*.17,d=new ue(new yn(l,c,8),s);if(d.position.y=h+c/2,d.rotation.y=o*.4,t.add(d),e){let u=new ue(new yn(l*.72,c*.42,8),r);u.position.y=h+c*.8,u.rotation.y=o*.4,t.add(u)}}return ks(t,.03),cs(t,!0,!1),t}function zc(i=1,e="#5a5470"){let t=new ba(i*.5,0),n=t.attributes.position;for(let a=0;a<n.count;a++)n.setXYZ(a,n.getX(a)*Oi(.8,1.15),n.getY(a)*Oi(.6,.9),n.getZ(a)*Oi(.8,1.15));t.computeVertexNormals();let s=new ue(t,wn(e,{flat:!0,roughness:.95}));s.position.y=i*.25,s.rotation.y=Oi(0,Hc),s.castShadow=!0,s.receiveShadow=!0;let r=new Tt;return r.add(s),r}var Gn={skin:["#ffe3cc","#f6cba5","#e7b28a","#c98e62","#a8693f","#7b4a2c","#553220"],hair:["Bob","Short","Long","Spiky","Bun","Braids","Ponytail","Buzz"],hairColor:["#3b2517","#6e4220","#18171d","#d1a04a","#b3432b","#ece6da","#6a4ab8","#3f7fbf","#e06aa0","#4aa36a"],eyes:["Closed","Open","Sleepy","Bright","Determined"],shirt:["#3f7fbf","#c94a4a","#4a9a5a","#e0b23a","#8a5ac9","#e07a3a","#3fb5b5","#e8e8e8","#34343f","#e087b0"],stripe:["#b04ab0","#e8e8e8","#e0b23a","#34343f","#c94a4a","#3f7fbf","#4a9a5a","#e07a3a","#3fb5b5","#e087b0"],pants:["#5a4a3a","#2f3f6a","#38383f","#6a7a4a","#8a3a4a","#b0a080"],shoes:["#3a2a1f","#1f1f24","#c94a4a","#e8e8e8","#3f7fbf"],accessory:["None","Scarf","Bandage","Flower","Glasses","Bow","Beanie"]},xi=Math.PI*2;function sb(i,e){let t=document.createElement("canvas");t.width=64,t.height=128;let n=t.getContext("2d");n.fillStyle=i,n.fillRect(0,0,64,128),n.fillStyle=e,n.fillRect(0,50,64,12),n.fillRect(0,76,64,12),n.globalAlpha=.08,n.fillStyle="#000";for(let r=0;r<128;r+=4)n.fillRect(0,r,64,1);n.globalAlpha=1;let s=new $i(t);return s.colorSpace=Vt,s}function Vc(i,e,t="neutral",n="#ff2a2a"){let s=i.getContext("2d"),r=i.width;s.clearRect(0,0,r,r);let a=Gn.eyes[e.eyes]||"Closed",o="#2a1a14",l=[r*.36,r*.64],c=r*.5;s.lineCap="round",s.lineWidth=r*.028,s.strokeStyle=o,s.fillStyle=o;let h=a==="Closed"||t==="blink"||t==="happy";for(let u=0;u<2;u++){let f=l[u];if(h)s.beginPath(),t==="happy"?s.arc(f,c+r*.02,r*.05,Math.PI*1.1,Math.PI*1.9):(s.moveTo(f-r*.05,c),s.lineTo(f+r*.05,c)),s.stroke();else if(a==="Sleepy")s.beginPath(),s.ellipse(f,c+r*.01,r*.04,r*.028,0,0,Math.PI),s.fill(),s.beginPath(),s.moveTo(f-r*.055,c),s.lineTo(f+r*.055,c),s.stroke();else{let p=a==="Bright"?.062:.045;if(s.beginPath(),s.ellipse(f,c,r*p*.8,r*p,0,0,xi),s.fill(),(a==="Bright"||a==="Determined")&&(s.fillStyle=n,s.globalAlpha=.55,s.beginPath(),s.ellipse(f,c+r*.012,r*p*.5,r*p*.55,0,0,xi),s.fill(),s.globalAlpha=1,s.fillStyle=o),s.fillStyle="#fff",s.beginPath(),s.arc(f-r*.012,c-r*.018,r*.014,0,xi),s.fill(),s.fillStyle=o,a==="Determined"||t==="angry"){s.beginPath();let y=u===0?1:-1;s.moveTo(f-r*.06*y,c-r*.085),s.lineTo(f+r*.05*y,c-r*.06),s.stroke()}}if(t==="sad"){s.beginPath();let p=u===0?1:-1;s.moveTo(f-r*.05*p,c-r*.06),s.lineTo(f+r*.05*p,c-r*.085),s.stroke()}}s.fillStyle="#ff8a8a",s.globalAlpha=.3;for(let u of l)s.beginPath(),s.ellipse(u,c+r*.1,r*.05,r*.025,0,0,xi),s.fill();s.globalAlpha=1,s.lineWidth=r*.02,s.beginPath();let d=r*.68;t==="happy"?s.arc(r/2,d-r*.02,r*.04,.15*Math.PI,.85*Math.PI):t==="sad"?s.arc(r/2,d+r*.03,r*.035,1.15*Math.PI,1.85*Math.PI):t==="shock"?s.ellipse(r/2,d,r*.022,r*.03,0,0,xi):(s.moveTo(r/2-r*.025,d),s.lineTo(r/2+r*.025,d)),s.stroke(),e.accessory===2&&(s.fillStyle="#f4ecd8",s.save(),s.translate(r*.68,r*.63),s.rotate(-.4),s.fillRect(-r*.06,-r*.022,r*.12,r*.044),s.fillStyle="#d8c8a8",s.fillRect(-r*.015,-r*.022,r*.03,r*.044),s.restore())}function Gc(i,e,t){return new ue(new Ri(i,e,6,14),t)}function Wc(i,e={}){let t=Gn,n=new Tt;n.name="human";let s=ut(t.skin[i.skin]),r=ut(t.hairColor[i.hairColor]),a=ut("#ffffff",{map:sb(t.shirt[i.shirt],t.stripe[i.stripe])}),o=ut(t.shirt[i.shirt]),l=ut(t.pants[i.pants]),c=ut(t.shoes[i.shoes]),h=new Tt;h.position.y=0,n.add(h);let d=Gc(.2,.2,a);d.position.y=.62,d.scale.set(1,1,.85),h.add(d);let u=Gc(.17,.02,l);u.position.y=.42,u.scale.set(1.05,1,.85),h.add(u);let f=E=>{let C=new Tt;C.position.set(E,.4,0);let I=Gc(.075,.18,l);I.position.y=-.16,C.add(I);let F=new ue(new pt(.1,12,8),c);return F.scale.set(.9,.55,1.35),F.position.set(0,-.34,.035),C.add(F),h.add(C),C},p=f(-.095),y=f(.095),m=E=>{let C=new Tt;C.position.set(E,.8,0);let I=Gc(.062,.2,o);I.position.y=-.14,C.add(I);let F=new ue(new pt(.065,12,8),s);return F.position.y=-.3,C.add(F),C.rotation.z=E<0?-.12:.12,h.add(C),C},g=m(-.255),b=m(.255),T=new ue(new an(.06,.07,.1,10),s);T.position.y=.86,h.add(T);let _=new Tt;_.position.y=1.07,h.add(_);let S=new ue(new pt(.27,28,20),s);S.scale.set(1,.96,.96),_.add(S);for(let E of[-1,1]){let C=new ue(new pt(.05,10,8),s);C.position.set(E*.265,-.02,0),C.scale.set(.5,1,.8),_.add(C)}let w=document.createElement("canvas");w.width=w.height=256;let R=new $i(w);R.colorSpace=Vt;let v=new ue(new pt(.273,24,16,Math.PI/2-.85,1.7,Math.PI/2-.8,1.6),new As({map:R,transparent:!0,depthWrite:!1,gradientMap:s.gradientMap}));return v.scale.copy(S.scale),v.userData.noOutline=!0,v.renderOrder=2,_.add(v),rb(_,i,r),ab(_,h,i),n.userData={parts:{body:h,torso:d,head:_,armL:g,armR:b,legL:p,legR:y},faceCanvas:w,faceTex:R,look:{...i},soulColor:e.soulColor||"#ff2a2a",phase:0,blink:2+Math.random()*3,expr:"neutral",moving:0},Vc(w,i,"neutral",n.userData.soulColor),R.needsUpdate=!0,e.outline!==!1&&ks(n,.018),cs(n,!0,!1),n}function rb(i,e,t){let n=Gn.hair[e.hair],s=.285,r=(l,c=s)=>{let h=new ue(new pt(c,26,16,Math.PI/2+.78,xi-1.56,0,l),t);return h.scale.set(1.02,.98,1),i.add(h),h},a=(l=.72,c=s-.004)=>{let h=new ue(new pt(c,24,10,Math.PI/2-.95,1.9,0,l),t);return h.scale.set(1.02,.98,1),i.add(h),h},o=()=>{let l=new ue(new pt(s,24,12,0,xi,0,.9),t);l.scale.set(1.02,.98,1),i.add(l)};switch(n){case"Bob":r(2.05),o(),a(.78);break;case"Short":r(1.55),o(),a(.62);break;case"Long":{r(2.1),o(),a(.78);let l=new ue(new Ri(.2,.25,6,12),t);l.position.set(0,-.28,-.12),l.scale.set(1.25,1,.55),i.add(l);break}case"Spiky":{r(1.5),o(),a(.6);for(let c=0;c<7;c++){let h=c/7*Math.PI-Math.PI/2+Math.PI,d=new ue(new yn(.07,.2,8),t),u=.5+c%2*.35;d.position.set(Math.sin(h)*.2,.2,Math.cos(h)*.2-.02),d.rotation.set(Math.cos(h)*u,0,-Math.sin(h)*u),i.add(d)}let l=new ue(new yn(.06,.18,8),t);l.position.set(.05,.24,.12),l.rotation.set(.9,0,-.3),i.add(l);break}case"Bun":{r(1.7),o(),a(.7);let l=new ue(new pt(.12,14,10),t);l.position.set(0,.27,-.1),i.add(l);break}case"Braids":{r(1.9),o(),a(.74);for(let l of[-1,1]){for(let h=0;h<3;h++){let d=new ue(new pt(.065-h*.006,10,8),t);d.position.set(l*.25,-.22-h*.1,-.05),i.add(d)}let c=new ue(new pt(.035,8,6),ut("#e04a6a"));c.position.set(l*.25,-.5,-.05),i.add(c)}break}case"Ponytail":{r(1.6),o(),a(.7);let l=new ue(new Ri(.08,.28,6,10),t);l.position.set(0,-.05,-.33),l.rotation.x=.5,i.add(l);break}case"Buzz":{let l=new ue(new pt(.276,24,12,0,xi,0,1.25),t);l.scale.set(1,.97,.97),i.add(l);break}default:r(2),o(),a(.75)}}function ab(i,e,t){let n=Gn.accessory[t.accessory];if(n==="Scarf"){let s=ut("#d94a4a"),r=new ue(new Qn(.15,.06,8,20),s);r.rotation.x=Math.PI/2,r.position.y=.86,e.add(r);let a=new ue(new jn(.1,.28,.04),s);a.position.set(.1,.72,.17),a.rotation.z=.15,e.add(a)}else if(n==="Flower"){let s=ut("#ffd23a"),r=new Tt;for(let o=0;o<5;o++){let l=new ue(new pt(.035,8,6),s),c=o/5*xi;l.position.set(Math.cos(c)*.04,Math.sin(c)*.04,0),r.add(l)}let a=new ue(new pt(.028,8,6),ut("#e07a2a"));a.position.z=.015,r.add(a),r.position.set(.2,.17,.12),r.rotation.y=.7,i.add(r)}else if(n==="Glasses"){let s=ut("#222222");for(let a of[-1,1]){let o=new ue(new Qn(.052,.01,6,18),s);o.position.set(a*.075,0,.265),i.add(o)}let r=new ue(new jn(.05,.012,.012),s);r.position.set(0,.01,.27),i.add(r)}else if(n==="Bow"){let s=ut("#e04a6a");for(let a of[-1,1]){let o=new ue(new yn(.06,.12,8),s);o.position.set(a*.07+.1,.27,.02),o.rotation.z=a*Math.PI/2,i.add(o)}let r=new ue(new pt(.035,8,6),s);r.position.set(.1,.27,.02),i.add(r)}else if(n==="Beanie"){let s=ut("#3f6fbf"),r=new ue(new pt(.3,22,12,0,xi,0,1.25),s);r.position.y=.02,i.add(r);let a=new ue(new Qn(.27,.035,8,24),ut("#e8e8e8"));a.rotation.x=Math.PI/2,a.position.y=.1,i.add(a);let o=new ue(new pt(.06,10,8),ut("#e8e8e8"));o.position.y=.31,i.add(o)}}function Xc(i,e){let t=i.userData;!t.faceCanvas||t.expr===e||(t.expr=e,Vc(t.faceCanvas,t.look,e,t.soulColor),t.faceTex.needsUpdate=!0)}function $c(i,e,t=0){let n=i.userData,s=n.parts;n.moving+=((t>.1?1:0)-n.moving)*Math.min(1,e*10),n.phase+=e*(t>.1?3.2+t*1.6:1.4);let r=n.moving,a=Math.sin(n.phase*2);s.legL.rotation.x=a*.7*r,s.legR.rotation.x=-a*.7*r,s.armL.rotation.x=-a*.6*r,s.armR.rotation.x=a*.6*r,s.body.position.y=Math.abs(Math.cos(n.phase*2))*.05*r;let o=Math.sin(n.phase)*.012*(1-r);s.torso.scale.y=1+o,s.head.position.y=1.07+o*.6,s.head.rotation.z=Math.sin(n.phase*.5)*.03*(1-r),n.blink-=e,n.blink<=0&&n.expr==="neutral"&&(Vc(n.faceCanvas,n.look,"blink",n.soulColor),n.faceTex.needsUpdate=!0,n.blinkUntil=.12,n.blink=2.5+Math.random()*3),n.blinkUntil!==void 0&&(n.blinkUntil-=e,n.blinkUntil<=0&&(n.blinkUntil=void 0,Vc(n.faceCanvas,n.look,n.expr,n.soulColor),n.faceTex.needsUpdate=!0))}var md=class{constructor(e,t,n={}){this.title=e,this.items=t,this.idx=n.start??0,this.opts=n,this.alpha=0,this.blocking=!0,this.pauseOverlay=!!n.pauseOverlay}open(){return new Promise(e=>{this.resolve=e,qe.pushOverlay(this)})}close(e){qe.removeOverlay(this),this.resolve?.(e)}update(e,t){if(this.alpha=Math.min(1,this.alpha+e*8),!t)return;let n=this.items.length;He.pressed("up")&&(this.idx=(this.idx+n-1)%n,ze.move()),He.pressed("down")&&(this.idx=(this.idx+1)%n,ze.move());let s=this.items[this.idx];if(He.pressed("left")&&s.left&&(s.left(),ze.move()),He.pressed("right")&&s.right&&(s.right(),ze.move()),He.pressed("confirm"))if(s.disabled)ze.buzz();else if(s.select){ze.select();let r=s.select();r!==void 0&&this.close(r)}else s.right&&(s.right(),ze.move());He.pressed("cancel")&&!this.opts.noCancel&&(ze.back(),this.close(null))}draw(e){let t=this.opts.w??560,n=this.opts.rowH??40,s=90+this.items.length*n,r=(960-t)/2,a=this.opts.y??(540-s)/2;e.ctx.save(),e.ctx.globalAlpha=this.alpha,this.opts.dim!==!1&&e.fillScreen("#000",.55*this.alpha),e.box(r,a,t,s,{fill:"rgba(0,0,0,0.95)"}),e.text(this.title,480,a+22,{size:22,family:st.title,align:"center",color:this.opts.titleColor??"#fff"}),this.items.forEach((o,l)=>{let c=a+72+l*n,h=l===this.idx,d=o.disabled?"#666":h?"#ffff00":"#fff";e.text(o.label,r+64,c,{size:26,color:d}),o.value&&e.text(o.value(),r+t-48,c,{size:26,color:d,align:"right"}),h&&e.heart(r+40,c+14,18,this.opts.heartColor??"#ff2020")}),this.opts.footer&&e.text(this.opts.footer,480,a+s-28,{size:16,family:st.small,align:"center",color:"#999"}),e.ctx.restore()}},pd=i=>{let e=Math.round(i*10);return"|".repeat(e)+".".repeat(10-e)};function Zm(i,e={}){let t=(o,l)=>{tt[o]=Math.round(Math.max(0,Math.min(1,tt[o]+l))*10)/10,oe.applyVolumes(),vi()},n=["LOW","MEDIUM","HIGH"],s={.6:"SLOW",1:"NORMAL",1.6:"FAST"},r=[.6,1,1.6],a=[{label:"Master volume",value:()=>pd(tt.master),left:()=>t("master",-.1),right:()=>t("master",.1)},{label:"Music",value:()=>pd(tt.music),left:()=>t("music",-.1),right:()=>t("music",.1)},{label:"Sound effects",value:()=>pd(tt.sfx),left:()=>{t("sfx",-.1),ze.select()},right:()=>{t("sfx",.1),ze.select()}},{label:"Graphics",value:()=>n[tt.quality],left:()=>{tt.quality=Math.max(0,tt.quality-1),i.setQuality(tt.quality),vi()},right:()=>{tt.quality=Math.min(2,tt.quality+1),i.setQuality(tt.quality),vi()}},{label:"Retro pixels",value:()=>tt.pixel?"ON":"OFF",left:()=>{tt.pixel=!tt.pixel,vi()},right:()=>{tt.pixel=!tt.pixel,vi()}},{label:"Screen shake",value:()=>tt.shake?"ON":"OFF",left:()=>{tt.shake=!tt.shake,vi()},right:()=>{tt.shake=!tt.shake,vi()}},{label:"Text speed",value:()=>s[tt.textSpeed]||"NORMAL",left:()=>{let o=r.indexOf(tt.textSpeed);tt.textSpeed=r[Math.max(0,(o<0?1:o)-1)],vi()},right:()=>{let o=r.indexOf(tt.textSpeed);tt.textSpeed=r[Math.min(2,(o<0?1:o)+1)],vi()}},{label:"Done",select:()=>!0}];return Hm(),new md("SETTINGS",a,{w:640,rowH:42,footer:"LEFT / RIGHT to change",...e}).open()}var qc=class{constructor(){_i(this,"id","title");let{scene:e,cam:t}=Hs({bg:"#040206",fogDensity:.07,hemi:.35,sky:"#4a3a6a"});this.scene=e,this.cam=t,this.save=Zp(),this.meta=no();let n=us([60,60],wn("#2a2230",{map:hs.rock("#2a2230")}));n.material.map.repeat.set(10,10),e.add(n);let s=$m(1.7,110);e.add(s);let r=ro(16,1.6,"#fff0c8",.28);e.add(r);let a=new Na("#fff1cf",60,30,.32,.6,1.4);a.position.set(0,16,0),a.target.position.set(0,0,0),a.castShadow=!0,a.shadow.mapSize.set(1024,1024),e.add(a,a.target);for(let o=0;o<8;o++){let l=o/8*Math.PI*2+.3,c=qm(5+o%3,.4,"#5e4478");c.position.set(Math.cos(l)*9,0,Math.sin(l)*9),c.rotation.z=(o%2?1:-1)*.04,e.add(c);let h=zc(1+o%3*.5,"#3a3048");h.position.set(Math.cos(l+.4)*6.5,0,Math.sin(l+.4)*6.5),e.add(h)}if(this.dust=new Ii("dust",{min:new P(-1.6,0,-1.6),max:new P(1.6,12,1.6)},160),e.add(this.dust.points),this.save){let o=qt[this.save.soul]?.color;this.kid=Wc(this.save.look,{soulColor:o}),this.kid.rotation.y=.4,e.add(this.kid)}this.meta.genocideDone&&(this.crack=zs("#ff2020",2.5),this.crack.scale.setScalar(.4),this.crack.position.set(0,2.2,0),e.add(this.crack)),this.items=this.save?[{label:"Continue",id:"continue"},{label:"Reset",id:"new"},{label:"Settings",id:"settings"}]:[{label:"Begin Game",id:"new"},{label:"Settings",id:"settings"}],this.idx=0,this.t=0,this.show=0,this.confirmReset=!1}run(){return new Promise(e=>{this.resolve=e,qe.setMode(this)})}enter(){qe.engine.setView(this.scene,this.cam);let e=qe.engine.post;e.uSaturation.value=1,e.uTint.value.set(1,1,1),e.uVignette.value=.5,qe.engine.bloom.strength=.7,In.play("title",{fade:1.5})}exit(){Gs(this.scene),this.dust.dispose()}update(e,t){this.t+=e,this.show=Math.min(1,this.show+e*.5);let n=this.t*.06;if(this.cam.position.set(Math.sin(n)*7.5,3.2+Math.sin(this.t*.2)*.3,Math.cos(n)*7.5),this.cam.lookAt(0,1.1,0),this.dust.update(e),this.kid&&$c(this.kid,e,0),this.crack&&(this.crack.rotation.y=this.t),t||this.show<.3)return;let s=this.items.length;if(He.pressed("up")&&(this.idx=(this.idx+s-1)%s,ze.move(),this.confirmReset=!1),He.pressed("down")&&(this.idx=(this.idx+1)%s,ze.move(),this.confirmReset=!1),He.pressed("confirm")){let r=this.items[this.idx].id;if(r==="settings"){ze.select(),Zm(qe.engine);return}if(r==="new"&&this.save&&!this.confirmReset){ze.select(),this.confirmReset=!0;return}ze.select(),this.resolve(r)}He.pressed("cancel")&&(this.confirmReset=!1)}draw(e){let t=e.ctx,n=this.show;t.save(),t.globalAlpha=n;let s=Math.sin(this.t*1.2)*2;e.text("UNDERSOUL",480,70+s,{size:58,family:st.title,align:"center",color:"#fff",glow:"#ff2a2a",glowSize:28}),e.text("UNDERSOUL",480,70+s,{size:58,family:st.title,align:"center",color:"#fff"}),e.text("SEVEN HEARTS BENEATH THE MOUNTAIN",480,146,{size:16,family:st.small,align:"center",color:"#c8b8e8"}),ii.forEach((a,o)=>{let l=480+(o-3)*34,c=184+Math.sin(this.t*2+o*.8)*4;e.heart(l,c,16,qt[a].color,{glow:10})});let r=395;if(this.items.forEach((a,o)=>{let l=r+o*40,c=o===this.idx,h=a.label;a.id==="new"&&this.save&&this.confirmReset&&(h="Really reset?  (Z)"),e.text(h,480,l,{size:28,align:"center",color:c?"#ffff00":"#fff"}),c&&e.heart(480-e.measure(h,28)/2-26,l+15,18,"#ff2020")}),this.save){let a=this.save,o=`${a.name}   LV ${a.lv}   ${jp(a.playTime||0)}   ${a.saveRoomName||""}`;e.text(o,480,350,{size:20,align:"center",color:"#bbb"})}e.text("Z / ENTER  confirm     X / SHIFT  back     C  menu",480,505,{size:14,family:st.small,align:"center",color:"#777"}),e.text("v1.0",940,520,{size:12,family:st.small,align:"right",color:"#555"}),t.restore()}};var gd=[{text:"Long ago, two peoples shared the surface of the world: HUMANS and MONSTERS.",at:0},{text:"One day, a war broke out between them.",at:1},{text:"Seven human mages each gave up a piece of their heart...",at:2},{text:"...and wove a BARRIER that sealed the monsters beneath the mountain.",at:3},{text:"The seven lights scattered into the dark. Legends say they are still looking for someone to belong to.",at:4},{text:`MT. HALLOW
20XX`,at:5,center:!0},{text:"Those who climb the mountain, it is said, never return.",at:6},{text:"",at:7}],ob=120,Yc=[["#c8b890","#fff0d0"],["#6a2a1a","#e07a3a"],null,["#5a4a6a","#e0a070"],null,["#3a2a4a","#e08a4a"],["#1a1830","#6a5a7a"],null];function Wr(i,e=.9,t=!1){let n=new Tt;if(t){let s=new ue(new pt(.35*e,14,10),ut(i));s.scale.set(1,1.1,1),s.position.y=.38*e,n.add(s);for(let r of[-1,1]){let a=new ue(new yn(.1*e,.3*e,6),ut(i));a.position.set(r*.18*e,.78*e,0),a.rotation.z=-r*.3,n.add(a);let o=new ue(new pt(.05*e,6,5),ls("#fff6d0",1.6));o.position.set(r*.12*e,.5*e,.3*e),n.add(o)}}else{let s=new ue(new Ri(.16*e,.4*e,4,10),ut(i));s.position.y=.4*e,n.add(s);let r=new ue(new pt(.17*e,12,10),ut("#e8c8a0"));r.position.y=.88*e,n.add(r)}return ks(n,.02),cs(n,!0,!1),n}function lb(i){let e=new Tt,t=new ue(new yn(.35,1.3,10),ut("#3a2a22"));t.position.y=.65,e.add(t);let n=new ue(new pt(.2,12,10),ut("#3a2a22"));n.position.y=1.35,e.add(n);let s=zs(i,2.6);return s.scale.setScalar(.28),s.position.set(0,1.1,.42),e.add(s),e.userData.orb=s,ks(e,.02),e}function Jm(i=8,e=8,t="#5a4a3a"){let n=new yn(e,i,9,4),s=n.attributes.position;for(let a=0;a<s.count;a++)s.getY(a)<i/2-.1&&(s.setX(a,s.getX(a)*(.85+Math.random()*.3)),s.setZ(a,s.getZ(a)*(.85+Math.random()*.3)));n.computeVertexNormals();let r=new ue(n,wn(t,{flat:!0}));return r.position.y=i/2,r.castShadow=!0,r.receiveShadow=!0,r}function cb(i){let e=[],t=wn("#6a8a4a",{roughness:1});for(let r=0;r<8;r++){let a=new Tt;a.position.x=r*ob,i.add(a),e.push(a)}let n=Yc,s=[["#c8b890","#fff0d0"],["#6a2a1a","#e07a3a"],null,["#5a4a6a","#e0a070"],null,["#3a2a4a","#e08a4a"],["#1a1830","#6a5a7a"],null];n.forEach((r,a)=>{r&&e[a].add(Xm(r[0],r[1],55))});{let r=e[0];r.add(us([120,120],t));let a=new ue(new pt(6,24,12,0,Math.PI*2,0,Math.PI/2),t);a.scale.y=.25,a.position.set(0,-1.1,-3.5),a.receiveShadow=!0,r.add(a);let o=new Tt,l=new ue(new an(.2,.3,2.4,8),ut("#5a3a22"));l.position.y=1.2,o.add(l);let c=new ue(new Ia(1.4,1),ut("#4a7a3a"));c.position.y=3,o.add(c),o.position.set(0,.2,-3.2),cs(o,!0,!1),r.add(o);let h=["#7a5a9a","#9a6a4a","#5a7aa0","#a0a05a"];for(let u=0;u<8;u++){let f=Wr(h[u%4],1.3,u%2===1),p=-1.2+u*.34;f.position.set(Math.sin(p)*3.4,0,Math.cos(p)*1.4+.4),f.rotation.y=p*.5,r.add(f)}let d=new ue(new Yi(1.4,32),ls("#ffe8a0",1.5));d.position.set(5,7,-12),r.add(d)}{let r=e[1];r.add(us([120,120],wn("#6a5a3a")));for(let o=0;o<6;o++){let l=Wr("#8a3a2a",1);l.position.set(-3+o%3*.8,0,-1+Math.floor(o/3)*1.1),l.rotation.y=Math.PI/2;let c=new ue(new an(.03,.03,1.8,5),ut("#3a2a1a"));c.position.set(.25,.9,0),c.rotation.z=-.5,l.add(c),r.add(l);let h=Wr("#5a4a7a",1.1,!0);h.position.set(3-o%3*.8,0,-1+Math.floor(o/3)*1.1),h.rotation.y=-Math.PI/2,r.add(h)}let a=new Ii("ash",{min:new P(-6,0,-5),max:new P(6,7,3)},140,{color:"#6a5a50"});a.points.position.x=0,r.add(a.points),r.userData.fx=a}{let r=e[2];r.add(us([30,30],wn("#3a3a44")));let a=[];ii.forEach((l,c)=>{let h=lb(qt[l].color),d=c/7*Math.PI*2;h.position.set(Math.sin(d)*2.4,0,Math.cos(d)*2.4),h.rotation.y=d+Math.PI,r.add(h),a.push(h.userData.orb);let u=new Qi(qt[l].color,3,4,2);u.position.copy(h.position).setY(1.2),r.add(u)});let o=ro(9,.5,"#ffffff",.45);r.add(o),r.userData.orbs=a}{let r=e[3];r.add(us([120,120],wn("#4a5a3a"))),r.add(Jm(9,8));let a=new ue(new pt(9.5,32,16,0,Math.PI*2,0,Math.PI/2),new un({color:new Se("#ffffff"),transparent:!0,opacity:.12,side:Mn,blending:dn,depthWrite:!1}));r.add(a),r.userData.dome=a;for(let o=0;o<5;o++){let l=Wr("#4a3a5a",.8,!0);l.position.set(-1+o*.5,0,8.5-o*.4),l.rotation.y=Math.PI,r.add(l)}}{let r=e[4],a=[];ii.forEach((o,l)=>{let c=zs(qt[o].color,2.6);c.scale.setScalar(.35),c.position.set((l-3)*1.1,4+Math.sin(l)*.6,0),r.add(c),a.push(c)});for(let o=0;o<10;o++){let l=zc(1+o%3,"#2a2230");l.position.set((o-5)*1.6,-2+o%2,-3-o%3),r.add(l)}r.userData.lights=a}{let r=e[5];r.add(us([120,120],wn("#3a4a2a")));let a=Jm(14,12,"#4a3e36");a.position.z=-10,r.add(a);for(let o=0;o<14;o++){let l=Ym(2+o%3,!1);l.position.set(-10+o*1.6,0,-2+o%3*1.5),r.add(l)}}{let r=e[6],a=new ue(new an(5,7,2,9),wn("#4a3e36",{flat:!0}));a.position.y=-1,a.receiveShadow=!0,r.add(a);let o=new ue(new Yi(1.3,24),new un({color:"#000"}));o.rotation.x=-Math.PI/2,o.position.set(.5,.01,0),r.add(o);let l=Wr("#3f7fbf",1);l.position.set(-1.3,0,.3),l.rotation.y=Math.PI/2,r.add(l),r.userData.kid=l;let c=new ue(new Qn(.9,.05,5,20,2),ut("#3a5a2a"));c.rotation.x=-Math.PI/2,c.position.set(-.6,.05,-.1),r.add(c)}{let r=e[7],a=ro(20,1.3,"#fff0d0",.3);a.position.y=-18,r.add(a);let o=Wr("#3f7fbf",1);o.position.y=0,r.add(o),r.userData.kid=o}return e}var hb=[[[0,3.2,9],[0,1.2,-1],[1.5,3,8],[0,1.2,-1]],[[0,2.6,7],[0,.9,0],[0,2.2,5.5],[0,.9,0]],[[0,6,6],[0,1,0],[0,4.5,5],[0,1.2,0]],[[0,8,26],[0,4,0],[0,6,21],[0,4,0]],[[0,4,9],[0,3,0],[0,2.5,8],[0,1,0]],[[0,3,12],[0,6,-10],[0,2.5,10],[0,7,-10]],[[3,2,5],[0,.6,0],[2.4,1.6,4],[0,.6,0]],[[.01,6,0],[0,-10,0],[.01,3,0],[0,-10,0]]],Zc=class{constructor(){_i(this,"id","intro");let{scene:e,cam:t}=Hs({bg:"#1a1208",fogDensity:.02,hemi:.9,sky:"#e8d0a0",ground:"#3a2a1a"});this.scene=e,this.cam=t;let n=new Ci("#ffe8c0",2.2);n.position.set(4,10,6),n.castShadow=!0,n.shadow.mapSize.set(2048,2048),n.shadow.camera.left=-14,n.shadow.camera.right=14,n.shadow.camera.top=14,n.shadow.camera.bottom=-14,e.add(n,n.target),this.sunLight=n,this.panels=cb(e),this.idx=0,this.pt=0,this.skipHeld=0,this.typer=null,this.textAlpha=0}run(){return new Promise(e=>{this.resolve=e,qe.setMode(this)})}enter(){qe.engine.setView(this.scene,this.cam);let e=qe.engine.post;e.uSaturation.value=.35,e.uTint.value.set(1.12,.98,.78),e.uVignette.value=.8,qe.engine.bloom.strength=.8,In.play("tale",{fade:.5,restart:!0}),this.startPanel(0),qe.fadeIn(1.2)}exit(){let e=qe.engine.post;e.uSaturation.value=1.05,e.uTint.value.set(1,1,1),e.uVignette.value=.35,Gs(this.scene)}startPanel(e){this.idx=e,this.pt=0;let t=gd[e];this.typer=new Fi(t.text,{width:760,size:28,family:st.ui,cps:22});let n=this.panels[e];this.scene.fog.color.set(Yc[e]?Yc[e][1]:"#050308"),this.scene.fog.density=Yc[e]?.011:.05,this.sunLight.position.set(n.position.x+4,10,6),this.sunLight.target.position.set(n.position.x,0,0)}async finish(){this.finishing||(this.finishing=!0,In.stop(1.5),await qe.fadeOut(1.2,"#000"),this.resolve())}update(e){this.pt+=e;let t=this.idx,n=this.panels[t],[s,r,a,o]=hb[t],l=t===7?4:8.5,c=Kp.inOutSine(Math.min(1,this.pt/l)),h=(u,f)=>new P(u[0]+(f[0]-u[0])*c,u[1]+(f[1]-u[1])*c,u[2]+(f[2]-u[2])*c);this.cam.position.copy(h(s,a)).add(n.position),this.cam.lookAt(h(r,o).add(n.position)),this.typer.update(e);let d=n.userData;d.fx&&d.fx.update(e),d.orbs&&d.orbs.forEach((u,f)=>{u.position.y=1.1+Math.sin(this.pt*2+f)*.08+this.pt*.04,u.rotation.y=this.pt}),d.dome&&(d.dome.material.opacity=.08+.06*Math.sin(this.pt*2)),d.lights&&d.lights.forEach((u,f)=>{u.position.y=4-this.pt*(.4+f*.05),u.position.x=(f-3)*(1.1+this.pt*.25),u.rotation.y=this.pt*(1+f*.2)}),t===6&&d.kid&&(d.kid.position.x=-1.3+Math.min(1.6,this.pt*.3),this.pt>6&&(d.kid.position.y=-(this.pt-6)*(this.pt-6)*3)),t===7&&d.kid&&(d.kid.position.y=-this.pt*this.pt*1.5,d.kid.rotation.z=this.pt*3,d.kid.rotation.x=this.pt*2),t===6&&this.pt>6.5&&!this.fellSound&&(this.fellSound=!0),this.textAlpha=Math.min(1,this.pt*2)*(this.pt>l-.6?Math.max(0,(l-this.pt)/.6):1),this.pt>=l&&(t+1<gd.length?this.startPanel(t+1):this.finish()),He.pressed("confirm")&&this.typer.done&&this.pt>1&&(this.pt=l-.5),He.held("cancel")||He.held("confirm")?this.skipHeld+=e:this.skipHeld=0,this.skipHeld>1.2&&this.finish()}draw(e){let t=gd[this.idx];e.ctx.save();let n=t.center?230:420;e.ctx.fillStyle="rgba(0,0,0,0.35)",!t.center&&t.text&&e.ctx.fillRect(80,n-18,800,110),t.center?t.text.split(`
`).forEach((r,a)=>e.text(r.slice(0,Math.max(0,this.typer.shown-a*10)),480,n+a*44,{size:32,align:"center",color:"#f0e0c0",alpha:this.textAlpha})):this.typer.draw(e.ctx,110,n,this.pt,this.textAlpha),this.skipHeld>.1&&e.text("Skipping...",940,510,{size:14,family:st.small,align:"right",color:"#aaa",alpha:Math.min(1,this.skipHeld)}),e.ctx.restore()}};var Vs=["ABCDEFG","HIJKLMN","OPQRSTU","VWXYZ","abcdefg","hijklmn","opqrstu","vwxyz"],Km=8,ub={WREN:["That name is already spoken for.",!1],SPRIG:["I already CHOSE that name.",!1,"sprig"],WICK:["nope.",!1,"wick"],TAPER:["I'LL ALLOW IT!!!!",!0,"taper"],WILLOW:["I think you should choose your own name, my child.",!1,"willow"],MARIS:["GET YOUR OWN NAME!",!1,"maris"],LOTL:["u-um... that one's taken... sorry...",!1,"lotl"],LUXE:["OOOH! A FAN! Darling, you have EXCELLENT taste.",!0,"luxe"],OAKHEART:["That name is too heavy to carry.",!1],ROWAN:["...",!0],FRISK:["A familiar name. But this is not their story.",!0],CHARA:["The name echoes somewhere far below.",!0],HUSH:["...oh... you can have it... i don't mind...",!0,"hush"],KID:["A classic.",!0],TUFT:["WHOA! Same name as me! That's SO cool!",!0,"tuft"]},xd=class{constructor(e=""){this.name=e,this.row=0,this.col=0,this.t=0,this.blocking=!0,this.listener={onChar:t=>{this.name.length<Km&&(this.name+=t,ze.move())},onBackspace:()=>{this.name=this.name.slice(0,-1),ze.back()},onEnter:()=>{this.name.trim().length?(ze.select(),this.close(this.name.trim())):ze.buzz()}}}open(){return new Promise(e=>{this.resolve=e,He.pushText(this.listener),qe.pushOverlay(this)})}close(e){He.popText(this.listener),qe.removeOverlay(this),this.resolve(e)}rows(){return Vs.length+1}rowLen(e){return e===Vs.length?3:Vs[e].length}update(e,t){if(this.t+=e,!!t){if(He.pressed("up")&&(this.row=(this.row+this.rows()-1)%this.rows(),this.col=Math.min(this.col,this.rowLen(this.row)-1),ze.move()),He.pressed("down")&&(this.row=(this.row+1)%this.rows(),this.col=Math.min(this.col,this.rowLen(this.row)-1),ze.move()),He.pressed("left")&&(this.col=(this.col+this.rowLen(this.row)-1)%this.rowLen(this.row),ze.move()),He.pressed("right")&&(this.col=(this.col+1)%this.rowLen(this.row),ze.move()),He.pressed("pause")){ze.back(),this.close(null);return}He.pressed("confirm")&&(this.row===Vs.length?this.col===0?(ze.back(),this.close(null)):this.col===1?(this.name=this.name.slice(0,-1),ze.back()):this.name.trim().length?(ze.select(),this.close(this.name.trim())):ze.buzz():this.name.length<Km?(this.name+=Vs[this.row][this.col],ze.select()):ze.buzz()),He.pressed("cancel")&&(this.name=this.name.slice(0,-1),ze.back())}}draw(e){e.fillScreen("#000",.92),e.text("Name the fallen human.",480,36,{size:30,align:"center"}),e.text(this.name+(Math.floor(this.t*2)%2?"_":" "),480,88,{size:40,align:"center",color:"#fff"}),Vs.forEach((t,n)=>{for(let s=0;s<t.length;s++){let r=n===this.row&&s===this.col,a=Math.sin(this.t*9+n*3+s*7)*.8,o=Math.cos(this.t*8+s*5+n)*.8;e.text(t[s],230+s*80+a,150+n*36+o,{size:28,color:r?"#ffff00":"#fff"})}}),["Quit","Backspace","Done"].forEach((t,n)=>{let s=this.row===Vs.length&&n===this.col;e.text(t,250+n*220,460,{size:28,color:s?"#ffff00":"#fff"})}),e.text("Type your name and press ENTER, or pick letters with the arrows.",480,510,{size:14,family:st.small,align:"center",color:"#888"})}},vd=[{key:"name",label:"NAME"},{key:"skin",label:"SKIN"},{key:"hair",label:"HAIR"},{key:"hairColor",label:"HAIR COLOR"},{key:"eyes",label:"EYES"},{key:"shirt",label:"SWEATER"},{key:"stripe",label:"STRIPES"},{key:"pants",label:"PANTS"},{key:"shoes",label:"SHOES"},{key:"accessory",label:"EXTRA"},{key:"random",label:"RANDOMIZE"},{key:"done",label:"DONE"}],db=new Set(["skin","hairColor","shirt","stripe","pants","shoes"]),Jc=class{constructor(e){_i(this,"id","creator");let{scene:t,cam:n}=Hs({bg:"#07050c",fogDensity:.06,hemi:.5,sky:"#8a7ab0"});this.scene=t,this.cam=n,this.look={...e?.look||Uu},this.name=e?.name||"";let s=new Ci("#fff4e8",2.2);s.position.set(2,4,4),s.castShadow=!0,t.add(s);let r=new Ci("#8a6aff",2.5);r.position.set(-3,2,-3),t.add(r);let a=new ue(new an(.9,1,.12,40),new Ts({color:"#1a1424",roughness:.6,metalness:.2}));a.position.y=-.06,a.receiveShadow=!0,t.add(a);let o=new ue(new Qn(.96,.015,8,64),ls("#ff4a4a",2));o.rotation.x=Math.PI/2,o.position.y=.01,t.add(o),this.ring=o,this.particles=new Ii("gold",{min:new P(-4,0,-4),max:new P(4,4,2)},150),t.add(this.particles.points),this.row=0,this.t=0,this.spin=0,this.rebuild()}run(){return new Promise(e=>{this.resolve=e,qe.setMode(this)})}enter(){qe.engine.setView(this.scene,this.cam),qe.engine.bloom.strength=.6,In.play("creator",{fade:1}),qe.fadeIn(.6)}exit(){Gs(this.scene),this.particles.dispose()}rebuild(){this.model&&this.scene.remove(this.model),this.model=Wc(this.look),this.model.rotation.y=this.spin,this.scene.add(this.model)}change(e,t){let n=Gn[e].length;this.look[e]=(this.look[e]+t+n)%n,this.rebuild(),(e==="eyes"||e==="accessory")&&Xc(this.model,"happy"),this.happyT=.8}async editName(){let e=await new xd(this.name).open();if(e==null)return;let t=e.toUpperCase(),n=ub[t];n&&(await Vm(n[2]||"narrator",n[0]),!n[1])||(this.name=e)}async finishCreate(){if(!this.name&&(await this.editName(),!this.name))return;await ud("narrator",[`* Is this who fell?
* ${this.name}.`],["Yes","No"])===0&&(ze.save(),this.leaving=!0,await qe.fadeOut(.8),this.resolve({name:this.name,look:{...this.look}}))}update(e,t){if(this.t+=e,this.spin+=e*.5,this.model.rotation.y=Math.sin(this.spin*.6)*.9,$c(this.model,e,0),this.happyT!==void 0&&(this.happyT-=e,this.happyT<=0&&(Xc(this.model,"neutral"),this.happyT=void 0)),this.particles.update(e),this.ring.material.color.setHSL(this.t*.05%1,.8,.6).multiplyScalar(2),this.cam.position.set(.95,1.05,3.3),this.cam.lookAt(.95,.72,0),t||this.leaving)return;let n=vd.length;He.pressed("up")&&(this.row=(this.row+n-1)%n,ze.move()),He.pressed("down")&&(this.row=(this.row+1)%n,ze.move());let s=vd[this.row];if(Gn[s.key])He.pressed("left")&&(this.change(s.key,-1),ze.move()),(He.pressed("right")||He.pressed("confirm"))&&(this.change(s.key,1),ze.move());else if(He.pressed("confirm")){if(ze.select(),s.key==="name"&&this.editName(),s.key==="random"){for(let r of Object.keys(Gn))this.look[r]=Math.floor(Math.random()*Gn[r].length);this.rebuild(),Xc(this.model,"happy"),this.happyT=.8}s.key==="done"&&this.finishCreate()}}draw(e){e.box(560,40,370,460,{fill:"rgba(0,0,0,0.78)"}),e.text("WHO FELL?",560+370/2,58,{size:18,family:st.title,align:"center"}),vd.forEach((r,a)=>{let o=102+a*32,l=a===this.row,c=l?"#ffff00":"#fff";e.text(r.label,604,o,{size:22,color:c}),l&&e.heart(584,o+12,15,"#ff2020");let h="";if(r.key==="name")h=this.name||"(choose)";else if(Gn[r.key]){let d=Gn[r.key][this.look[r.key]];db.has(r.key)?(e.ctx.fillStyle=d,e.ctx.fillRect(820,o+2,60,20),e.ctx.strokeStyle="#fff",e.ctx.lineWidth=2,e.ctx.strokeRect(820,o+2,60,20)):h=d}h&&e.text(h,906,o,{size:22,color:c,align:"right"}),l&&Gn[r.key]&&(e.text("<",798,o,{size:22,color:"#888"}),e.text(">",890,o,{size:22,color:"#888"}))}),e.text("ARROWS change    Z select",560+370/2,480,{size:12,family:st.small,align:"center",color:"#888"})}},fb={determination:"You look like you don't give up easily. Good. Neither do I.",patience:"...Hello. There's no hurry. There never was.",bravery:"OH, finally! Someone to go on an adventure with! Let's GO!",integrity:"Stand up straight. There. Now we can begin properly.",perseverance:"Um. Hi. I, uh, wrote down some notes. For you. In case.",kindness:"Oh, sweetheart. You're shivering. Come here, I'll keep you warm.",justice:"Howdy, partner. Reckon we're riding together now."},Kc=class{constructor(e){_i(this,"id","soul");let{scene:t,cam:n}=Hs({bg:"#030205",fogDensity:.05,hemi:.2});this.scene=t,this.cam=n,this.hearts=ii.map(s=>{let r=zs(qt[s].color,1.25);return r.userData.halo.material.opacity=.3,r.scale.setScalar(.5),t.add(r),r}),this.light=new Qi("#ff2a2a",8,12,2),this.light.position.set(0,1,2),t.add(this.light),this.particles=new Ii("dust",{min:new P(-6,-3,-6),max:new P(6,4,3)},220,{color:"#ffffff"}),t.add(this.particles.points),this.idx=0,this.angle=0,this.t=0,this.look=e,this.makeText()}run(){return new Promise(e=>{this.resolve=e,qe.setMode(this)})}enter(){qe.engine.setView(this.scene,this.cam),qe.engine.bloom.strength=.5,In.play("creator",{fade:1}),qe.fadeIn(1),this.intro=new Fi("Seven lights drift in the dark. One of them turns toward you.",{width:800,size:24,cps:30})}exit(){Gs(this.scene),this.particles.dispose()}makeText(){let e=qt[ii[this.idx]];this.greet=new Fi(`"${fb[e.id]}"`,{width:820,size:22,cps:45,onBlip:()=>ze.voice("echo"),blipEvery:3})}async choose(){let e=qt[ii[this.idx]];if(await ud("narrator",[`* Take the ${e.trait} SOUL?`],["Yes","No"])!==0)return;this.leaving=!0,ze.soulFly();let n=this.hearts[this.idx];await qe.tween(1,s=>{n.position.lerp(new P(0,.3,4.2),s*.2),n.scale.setScalar(.5+s*.8)}),qe.flash(1),ze.save(),await qe.fadeOut(.3,e.color),await qe.wait(.3),qe.fadeColor="#000",this.resolve(e.id)}update(e,t){this.t+=e,this.intro.update(e),this.greet.update(e),this.particles.update(e);let n=this.hearts.length,r=-(this.idx/n)*Math.PI*2-this.angle;r=Math.atan2(Math.sin(r),Math.cos(r)),this.angle+=r*Math.min(1,e*6),this.leaving||this.hearts.forEach((o,l)=>{let c=this.angle+l/n*Math.PI*2,h=l===this.idx;o.position.set(Math.sin(c)*2.3,.75+Math.sin(this.t*1.5+l)*.08,Math.cos(c)*2.3-1);let d=h?.62+Math.sin(this.t*4)*.03:.38;o.scale.setScalar(o.scale.x+(d-o.scale.x)*Math.min(1,e*8)),o.rotation.y=h?Math.sin(this.t*1.5)*.5:c});let a=new Se(qt[ii[this.idx]].color);this.light.color.lerp(a,Math.min(1,e*4)),this.particles.points.material.uniforms.uSoft.value=1,this.cam.position.set(0,.9,4.6),this.cam.lookAt(0,.1,0),!(t||this.leaving)&&(He.pressed("left")&&(this.idx=(this.idx+n-1)%n,ze.move(),this.makeText()),He.pressed("right")&&(this.idx=(this.idx+1)%n,ze.move(),this.makeText()),He.pressed("confirm")&&this.t>.6&&(ze.select(),this.choose()))}draw(e){let t=qt[ii[this.idx]];this.intro.draw(e.ctx,140,22,this.t,.8);let n=300;e.box(40,n,880,222,{fill:"rgba(0,0,0,0.82)",stroke:t.color}),e.text(t.trait,70,n+18,{size:28,family:st.title,color:t.color,glow:t.color,glowSize:12}),e.text(`${t.echo}, ${t.echoTitle}`,890,n+22,{size:20,align:"right",color:"#ccc"}),this.greet.draw(e.ctx,70,n+62,this.t),e.text(t.blurb,70,n+96,{size:20,color:"#aaa"}),e.text(`X ACTION: ${t.action}`,70,n+130,{size:20,color:t.color}),e.text(t.actionDesc,250,n+130,{size:20}),e.text(`PASSIVE: ${t.passive}`,70,n+160,{size:20,color:t.color}),e.text(t.passiveDesc,250,n+160,{size:20});let s=t.stats,r=(a,o)=>`${a} ${o>0?"+":""}${o}`;e.text([r("HP",s.hp),r("ATK",s.atk),r("DEF",s.def)].join("    "),70,n+190,{size:18,family:st.small,color:"#bbb"}),e.text("<  LEFT / RIGHT  >     Z choose",890,n+192,{size:14,family:st.small,align:"right",color:"#777"})}};function pb(){return qt[nn.soul]||qt.determination}function mb(i=nn.soul){let e=qt[i].tree;return[...e.heart,...e.soul,...e.blade]}var gb=i=>nn.skills.includes(i);function vb(){let i={hp:0,atk:0,def:0};for(let e of mb())if(e.stats&&gb(e.id))for(let t in e.stats)i[t]+=e.stats[t];return i}function jm(){return 16+4*nn.lv+(nn.hope-1)*2+pb().stats.hp+vb().hp}async function _d(){await qe.wait(1e3)}function Qm(){let i=document.getElementById("touch");if(!(!i||!("ontouchstart"in window||navigator.maxTouchPoints>0))){i.classList.add("on");for(let t of i.querySelectorAll(".tbtn")){let n=t.dataset.a,s=n+Math.random(),r=o=>{o.preventDefault(),t.classList.add("on"),He.touchPress(n,s)},a=o=>{o.preventDefault(),t.classList.remove("on"),He.touchRelease(n,s)};t.addEventListener("pointerdown",r),t.addEventListener("pointerup",a),t.addEventListener("pointercancel",a),t.addEventListener("pointerleave",a)}}}var yd=class{constructor(){_i(this,"id","gate");this.t=0,this.state="wait"}run(){return new Promise(e=>{this.resolve=e,qe.setMode(this)})}update(e){if(this.t+=e,this.state==="wait"&&(He.pressed("confirm")||He.pressed("cancel")||He.pressed("menu")||this.gestured))this.state="loading",this.lt=0;else if(this.state==="loading"&&(this.lt+=e,this.lt>.05&&!this.inited)){this.inited=!0;try{oe.init(),oe.resume()}catch(t){console.warn("audio init failed",t)}if(In.pending){let[t,n]=In.pending;In.pending=null,In.play(t,n)}rm(),this.resolve()}}draw(e){if(e.fillScreen("#000"),this.state==="wait"){let t=.55+.45*Math.sin(this.t*3);e.heart(480,230,40,"#ff2020",{glow:16}),e.text("UNDERSOUL",480,290,{size:30,family:st.title,align:"center"}),e.text("Press Z, Enter, or tap to begin",480,350,{size:22,align:"center",color:"#fff",alpha:t}),e.text("Best with sound on.",480,390,{size:16,family:st.small,align:"center",color:"#777"})}else e.heart(480,230,40,"#ff2020",{glow:16}),e.text("...",480,290,{size:24,align:"center"})}};async function xb(){let i=new yd;for(He.onFirstGesture.push(()=>{i.gestured=!0}),await i.run(),no().seenIntro||(await new Zc().run(),Jp("seenIntro",!0));;){qe.fadeAlpha=1;let t=new qc,n=qe.fadeIn(1.2),s=await t.run();if(await n,await qe.fadeOut(.6),s==="continue"&&Yp()){await _d(!1);continue}let r=await new Jc().run();if(!r)continue;let a=await new Kc(r.look).run();qp(r.name,r.look,a),nn.hp=jm(),await _d(!0)}}async function _b(){let i=document.getElementById("app");await Op();let e=new _c(i);e.setQuality(tt.quality);let t=new yc(i);qe.init(e,t),nm(Bm),zm(Wm),Qm(),window.__game=qe;let n=performance.now(),s=r=>{let a=Math.min(window.__dtMax||.05,(r-n)/1e3);n=r,He.poll();try{qe.update(a),e.post.uPixel.value=tt.pixel?3*Math.min(window.devicePixelRatio||1,2):0,e.render(a,qe.realTime),t.begin(),qe.draw(t)}catch(o){console.error(o)}He.endFrame(),requestAnimationFrame(s)};requestAnimationFrame(s),xb().catch(r=>console.error(r))}_b();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
