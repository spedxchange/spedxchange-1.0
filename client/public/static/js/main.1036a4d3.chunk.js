(window.webpackJsonpSPEDXchange=window.webpackJsonpSPEDXchange||[]).push([[0],{332:function(e,t,a){e.exports=a.p+"static/media/spedxchange-brand.e4717b2e.svg"},386:function(e,t,a){e.exports=a(666)},392:function(e,t,a){},666:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(52),l=a.n(c),o=(a(391),a(392),a(22)),i=a(23),s=a(25),u=a(24),m=a(26),p=a(20),d=a(687),E=a(677),h=a(44),f=a(39),b=a(689),g=function(e){var t=e.signIn,a=e.register;return r.a.createElement(d.a.Item,{position:"right"},r.a.createElement(b.a,{basic:!0,inverted:!0,content:"Sign Up",onClick:a}),r.a.createElement(b.a,{basic:!0,inverted:!0,content:"Login",onClick:t}))},O=a(351),v=a(130),y=function(e){var t=e.signOut,a=e.profile;return r.a.createElement(d.a.Item,{position:"right"},r.a.createElement(O.a,{avatar:!0,spaced:"right",src:a.photoURL||"/assets/img/user.png"}),r.a.createElement(v.a,{pointing:"top right",text:a.displayName},r.a.createElement(v.a.Menu,null,r.a.createElement(v.a.Item,{text:"Create Question",icon:"plus"}),r.a.createElement(v.a.Item,{text:"My Questions",icon:"calendar"}),r.a.createElement(v.a.Item,{text:"My Network",icon:"users"}),r.a.createElement(v.a.Item,{text:"My Profile",icon:"user"}),r.a.createElement(v.a.Item,{as:h.b,to:"/settings",text:"Settings",icon:"settings"}),r.a.createElement(v.a.Item,{text:"Sign Out",icon:"power",onClick:t}))))},j=function(e,t){return{type:"MODAL_OPEN",payload:{modalType:e,modalProps:t}}},w=function(){return{type:"MODAL_CLOSE"}},C=a(28),k=a.n(C),S=a(42),x=a(70),I=a.n(x),A=a(163),N=a(88),P={headers:{"Content-Type":"application/json"}},T=a(60),L=a.n(T),D=function(e){e?I.a.defaults.headers.common["x-auth-token"]=e:delete I.a.defaults.headers.common["x-auth-token"]},R=function(){return function(){var e=Object(S.a)(k.a.mark((function e(t,a){var n;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return localStorage.token&&D(localStorage.token),e.prev=1,e.next=4,I.a.get("/api/auth");case 4:n=e.sent,t({type:"USER_LOADED",payload:n.data}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),t({type:"AUTH_ERROR"});case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,a){return e.apply(this,arguments)}}()},q=a(332),_=a.n(q),M={openModal:j,signOut:function(){return function(){var e=Object(S.a)(k.a.mark((function e(t,a){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D();case 3:return e.next=5,t(R());case 5:t({type:"SIGNOUT_USER"}),e.next=12;break;case 8:throw e.prev=8,e.t0=e.catch(0),console.log(e.t0),new A.a({_error:"Sign Out Failed"});case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,a){return e.apply(this,arguments)}}()}},U=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).handleSignIn=function(){a.props.openModal("LoginModal")},a.handleRegister=function(){a.props.openModal("RegisterModal")},a.handleSignOut=function(){a.props.signOut()},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.auth,t=e.authenticated&&e.currentUser;return r.a.createElement(d.a,{inverted:!0,fixed:"top",className:"app-header"},r.a.createElement(E.a,null,r.a.createElement(d.a.Item,{as:h.c,className:"brand",exact:!0,to:"/",header:!0},r.a.createElement("img",{src:_.a,alt:"SPEDxchange",className:"ui"})),t?r.a.createElement(y,{profile:e.currentUser,signOut:this.handleSignOut}):r.a.createElement(g,{signIn:this.handleSignIn,register:this.handleRegister})))}}]),t}(n.Component),Q=Object(f.g)(Object(p.connect)((function(e){return{auth:e.auth}}),M)(U)),F=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={activeItem:"closTagsest"},a.handleItemClick=function(e,t){var n=t.name;return a.setState({activeItem:n})},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.state.activeItem;return r.a.createElement(d.a,{text:!0,vertical:!0,className:"app-sidebar"},r.a.createElement(d.a.Item,{link:!0,name:"About Us",active:"About Us"===e,onClick:this.handleItemClick}),r.a.createElement(d.a.Item,{link:!0,name:"Resources",active:"Resources"===e,onClick:this.handleItemClick}),r.a.createElement(d.a.Item,{link:!0,name:"Scholarships",active:"Scholarships"===e,onClick:this.handleItemClick}),r.a.createElement(d.a.Item,{link:!0,name:"Eye On SPED",active:"Eye On SPED"===e,onClick:this.handleItemClick}),r.a.createElement(d.a.Item,{link:!0,name:"Contact Us",active:"Contact Us"===e,onClick:this.handleItemClick}),r.a.createElement("hr",null),r.a.createElement(d.a.Item,{link:!0,name:"Questions",active:"Questions"===e,onClick:this.handleItemClick}),r.a.createElement(d.a.Item,{link:!0,name:"Categories",active:"Categories"===e,onClick:this.handleItemClick,className:"indent"}),r.a.createElement(d.a.Item,{link:!0,name:"Tags",active:"Tags"===e,onClick:this.handleItemClick,className:"indent"}),r.a.createElement(d.a.Item,{link:!0,name:"People",active:"People"===e,onClick:this.handleItemClick,className:"indent"}),r.a.createElement("hr",null),r.a.createElement(d.a.Item,{link:!0,name:"Jobs",active:"Jobs"===e,onClick:this.handleItemClick}))}}]),t}(n.Component),z=a(690),H=a(692),V=a(688),B=a(686),G=a(177),J=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.tag;return r.a.createElement(G.a,{as:"a"},e.tagName)}}]),t}(n.Component),Y=a(333),W=a.n(Y),K=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.question;return r.a.createElement(H.a,{vertical:!0},r.a.createElement("div",{className:"flex-wrap"},r.a.createElement("div",{className:"votes"},r.a.createElement("div",null,r.a.createElement(V.a,{size:"mini"},r.a.createElement(V.a.Value,null,"100"),r.a.createElement(V.a.Label,null,"votes"))),r.a.createElement("div",null,r.a.createElement(V.a,{size:"mini"},r.a.createElement(V.a.Value,null,"100"),r.a.createElement(V.a.Label,null,"answers")))),r.a.createElement("div",{className:"flex-item grow content"},r.a.createElement("h3",null,r.a.createElement("a",{href:"/"},e.title)),r.a.createElement("p",null,e.content),r.a.createElement("div",{className:"info"},r.a.createElement("div",{className:"flex-wrap responsive"},r.a.createElement("div",{className:"flex-item grow"},r.a.createElement(B.a,{horizontal:!0},e.tags&&Object.values(e.tags).map((function(e,t){return r.a.createElement(J,{key:t,tag:e})})))),r.a.createElement("div",{className:"flex-item"},r.a.createElement("div",{className:"user"},r.a.createElement(B.a,{horizontal:!0},r.a.createElement(B.a.Item,null,r.a.createElement(O.a,{avatar:!0,src:e.user.avatar}),r.a.createElement(B.a.Content,{verticalAlign:"middle"},e.user.displayName)))),e.updated&&r.a.createElement("div",{className:"asked"},"asked ",W()(e.updated).from())))))))}}]),t}(n.Component),X=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.questions,a=e.deleteQuestion;return r.a.createElement(n.Fragment,null,r.a.createElement("h1",null,"Questions"),t&&t.map((function(e){return r.a.createElement(K,{key:e._id,question:e,deleteQuestion:a})})))}}]),t}(n.Component),Z=function(){var e=Object(S.a)(k.a.mark((function e(){var t;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,I.a.get("/api/questions");case 3:return t=e.sent,e.abrupt("return",t.data);case 7:e.prev=7,e.t0=e.catch(0),console.log("Error: ",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),$=function(e){return function(){var t=Object(S.a)(k.a.mark((function t(a){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{a({type:"CREATE_QUESTION",payload:{question:e}}),T.toastr.success("Success!","Question has been created")}catch(n){T.toastr.error("Error!","error")}case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},ee=function(e){return function(){var t=Object(S.a)(k.a.mark((function t(a){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{a({type:"UPDATE_QUESTION",payload:{question:e}}),T.toastr.success("Success!","Question has been updated")}catch(n){T.toastr.error("Error!","error")}case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},te=a(691),ae=a(678),ne=function(e){var t=e.inverted,a=void 0===t||t;return r.a.createElement(te.a,{inverted:a,active:!0},r.a.createElement(ae.a,{content:"Loading..."}))},re=a(693),ce=function(){return r.a.createElement(n.Fragment,null,r.a.createElement(re.a,{attached:"top",content:"Recent Activity"}),r.a.createElement(H.a,{attached:!0},r.a.createElement("p",null,"Recent activity")))},le={createQuestion:$,updateQuestion:ee,deleteQuestion:function(e){return{type:"DELETE_QUESTION",payload:{questionId:e}}},loadQuestions:function(){return function(){var e=Object(S.a)(k.a.mark((function e(t){var a;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t({type:"ASYNC_ACTION_START"}),e.next=4,Z();case 4:a=e.sent,t({type:"FETCH_QUESTIONS",payload:{questions:a}}),t({type:"ASYNC_ACTION_FINISH"}),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0),t({type:"ASYNC_ACTION_ERROR"});case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}()}},oe=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).handleDeleteQuestion=function(e){a.props.deleteQuestion(e)},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.props.loadQuestions()}},{key:"render",value:function(){var e=this.props,t=e.questions;return e.loading?r.a.createElement(ne,null):r.a.createElement(z.a,{className:"questions-dashboard"},r.a.createElement(z.a.Column,{mobile:16,tablet:10,computer:12},r.a.createElement(X,{questions:t,deleteQuestion:this.handleDeleteQuestion})),r.a.createElement(z.a.Column,{mobile:16,tablet:6,computer:4},r.a.createElement(ce,null)))}}]),t}(n.Component),ie=Object(p.connect)((function(e){return{questions:e.questions,loading:e.async.loading}}),le)(oe),se=a(82),ue=function(e){var t=e.history;return r.a.createElement(H.a,{inverted:!0,textAlign:"center",vertical:!0,className:"masthead"},r.a.createElement(E.a,{text:!0},r.a.createElement(re.a,{as:"h1",inverted:!0},"SPEDxchange"),r.a.createElement(b.a,{onClick:function(){return t.push("/questions")},size:"huge",inverted:!0},"Get started",r.a.createElement(se.a,{name:"right arrow",inverted:!0}))))},me=a(685),pe=a(668),de={filter:"brightness(30%)"},Ee={position:"absolute",bottom:"5%",left:"5%",width:"100%",height:"auto",color:"white"},he=function(e){var t=e.question;return r.a.createElement(H.a.Group,null,r.a.createElement(H.a,{basic:!0,attached:"top",style:{padding:"0"}},r.a.createElement(O.a,{src:"/assets/img/category/".concat(t.category,".jpg"),fluid:!0,style:de}),r.a.createElement(H.a,{basic:!0,style:Ee},r.a.createElement(me.a.Group,null,r.a.createElement(me.a,null,r.a.createElement(me.a.Content,null,r.a.createElement(re.a,{size:"huge",content:t.title,style:{color:"white"}}),r.a.createElement("p",null,t.date&&Object(pe.default)(t.date.toDate(),"EEEE do LLL")," at ",t.date&&Object(pe.default)(t.date.toDate(),"h:mm a")),r.a.createElement("p",null,"Hosted by ",r.a.createElement("strong",null,t.hostedBy))))))),r.a.createElement(H.a,{attached:"bottom"},r.a.createElement(b.a,null,"Cancel My Place"),r.a.createElement(b.a,{color:"teal"},"JOIN THIS QUESTION"),r.a.createElement(b.a,{as:h.b,to:"/manage/".concat(t.id),color:"orange",floated:"right"},"Manage Question")))},fe=a(349),be=a(171),ge=a.n(be),Oe=function(){return r.a.createElement(se.a,{name:"marker",color:"red"})},ve=function(e){var t=e.lat,a=e.lng;return r.a.createElement(H.a,{attached:"bottom",style:{padding:0}},r.a.createElement("div",{style:{height:"300px",width:"100%"}},r.a.createElement(ge.a,{bootstrapURLKeys:{key:"AIzaSyC4D1LiEjXq9Gw_Jx4m0fk1vfKwb6frWiI"},defaultCenter:{lat:t,lng:a},defaultZoom:14},r.a.createElement(Oe,{lat:t,lng:a}))))},ye=function(e){var t=e.question,a=Object(n.useState)(!1),c=Object(fe.a)(a,2),l=c[0],o=c[1];return r.a.createElement(H.a.Group,null,r.a.createElement(H.a,{attached:"top"},r.a.createElement(z.a,null,r.a.createElement(z.a.Column,{width:1},r.a.createElement(se.a,{size:"large",color:"teal",name:"info"})),r.a.createElement(z.a.Column,{width:15},r.a.createElement("p",null,t.description)))),r.a.createElement(H.a,{attached:!0},r.a.createElement(z.a,{verticalAlign:"middle"},r.a.createElement(z.a.Column,{width:1},r.a.createElement(se.a,{name:"calendar",size:"large",color:"teal"})),r.a.createElement(z.a.Column,{width:15},r.a.createElement("span",null,t.date&&Object(pe.default)(t.date.toDate(),"EEEE do LLL")," at ",t.date&&Object(pe.default)(t.date.toDate(),"h:mm a"))))),r.a.createElement(H.a,{attached:!0},r.a.createElement(z.a,{verticalAlign:"middle"},r.a.createElement(z.a.Column,{width:1},r.a.createElement(se.a,{name:"marker",size:"large",color:"teal"})),r.a.createElement(z.a.Column,{width:11},r.a.createElement("span",null,t.venue)),r.a.createElement(z.a.Column,{width:4},r.a.createElement(b.a,{onClick:function(){return o(!l)},color:"teal",size:"tiny",content:l?"Hide Map":"Show Map"})))),l&&r.a.createElement(ve,{lat:t.venueLatLng.lat,lng:t.venueLatLng.lng}))},je=a(684),we=a(681),Ce=function(){return r.a.createElement(n.Fragment,null,r.a.createElement(H.a,{textAlign:"center",attached:"top",inverted:!0,color:"teal",style:{border:"none"}},r.a.createElement(re.a,null,"Chat about this question")),r.a.createElement(H.a,{attached:!0},r.a.createElement(je.a.Group,null,r.a.createElement(je.a,null,r.a.createElement(je.a.Avatar,{src:"/assets/user.png"}),r.a.createElement(je.a.Content,null,r.a.createElement(je.a.Author,{as:"a"},"Matt"),r.a.createElement(je.a.Metadata,null,r.a.createElement("div",null,"Today at 5:42PM")),r.a.createElement(je.a.Text,null,"How artistic!"),r.a.createElement(je.a.Actions,null,r.a.createElement(je.a.Action,null,"Reply")))),r.a.createElement(je.a,null,r.a.createElement(je.a.Avatar,{src:"/assets/user.png"}),r.a.createElement(je.a.Content,null,r.a.createElement(je.a.Author,{as:"a"},"Elliot Fu"),r.a.createElement(je.a.Metadata,null,r.a.createElement("div",null,"Yesterday at 12:30AM")),r.a.createElement(je.a.Text,null,r.a.createElement("p",null,"This has been very useful for my research. Thanks as well!")),r.a.createElement(je.a.Actions,null,r.a.createElement(je.a.Action,null,"Reply"))),r.a.createElement(je.a.Group,null,r.a.createElement(je.a,null,r.a.createElement(je.a.Avatar,{src:"/assets/user.png"}),r.a.createElement(je.a.Content,null,r.a.createElement(je.a.Author,{as:"a"},"Jenny Hess"),r.a.createElement(je.a.Metadata,null,r.a.createElement("div",null,"Just now")),r.a.createElement(je.a.Text,null,"Elliot you are always so right :)"),r.a.createElement(je.a.Actions,null,r.a.createElement(je.a.Action,null,"Reply")))))),r.a.createElement(je.a,null,r.a.createElement(je.a.Avatar,{src:"/assets/user.png"}),r.a.createElement(je.a.Content,null,r.a.createElement(je.a.Author,{as:"a"},"Joe Henderson"),r.a.createElement(je.a.Metadata,null,r.a.createElement("div",null,"5 days ago")),r.a.createElement(je.a.Text,null,"Dude, this is awesome. Thanks so much"),r.a.createElement(je.a.Actions,null,r.a.createElement(je.a.Action,null,"Reply")))),r.a.createElement(we.a,{reply:!0},r.a.createElement(we.a.TextArea,null),r.a.createElement(b.a,{content:"Add Reply",labelPosition:"left",icon:"edit",primary:!0})))))},ke=function(e){var t=e.attendees;return r.a.createElement(n.Fragment,null,r.a.createElement(H.a,{textAlign:"center",style:{border:"none"},attached:"top",secondary:!0,inverted:!0,color:"teal"},t&&t.length," ",t&&1===t.length?"Person":"People"," Going"),r.a.createElement(H.a,{attached:!0},r.a.createElement(B.a,{relaxed:!0,divided:!0,verticalAlign:"middle"},t&&t.map((function(e){return r.a.createElement(B.a.Item,{key:e.id,style:{position:"relative"}},!1,r.a.createElement(O.a,{avatar:!0,src:e.photoURL}),r.a.createElement(B.a.Content,{verticalAlign:"middle"},r.a.createElement(B.a.Header,{as:"h4"},e.name)))})))))},Se=Object(p.connect)((function(e,t){var a=t.match.params.id,n={};return a&&e.questions.length>0&&(n=e.questions.filter((function(e){return e.id===a}))[0]),{question:n}}))((function(e){var t=e.question;return r.a.createElement(z.a,null,r.a.createElement(z.a.Column,{width:10},r.a.createElement(he,{question:t}),r.a.createElement(ye,{question:t}),r.a.createElement(Ce,null)),r.a.createElement(z.a.Column,{width:6},r.a.createElement(ke,{attendees:t.attendees})))})),xe=function(){return r.a.createElement("h1",null,"User Dashboard")},Ie=function(){return r.a.createElement("h1",null,"User Detail")},Ae=function(){return r.a.createElement(n.Fragment,null,r.a.createElement(d.a,{vertical:!0},r.a.createElement(re.a,{icon:"user",attached:!0,inverted:!0,color:"grey",content:"Profile"}),r.a.createElement(d.a.Item,{as:h.c,to:"/settings/basic"},"Basics"),r.a.createElement(d.a.Item,{as:h.c,to:"/settings/about"},"About Me"),r.a.createElement(d.a.Item,{as:h.c,to:"/settings/photos"},"My Photos")),r.a.createElement(d.a,{vertical:!0},r.a.createElement(re.a,{icon:"settings",attached:!0,inverted:!0,color:"grey",content:"Account"}),r.a.createElement(d.a.Item,{as:h.c,to:"/settings/account"},"My Account")))},Ne=function(){return r.a.createElement("h1",null,"Basic Page")},Pe=function(){return r.a.createElement("h1",null,"About Page")},Te=function(){return r.a.createElement("h1",null,"Photos Page")},Le=a(680),De=a(317),Re=a(318),qe=a(33),_e=function(e){var t=e.input,a=e.type,n=e.placeholder,c=e.meta,l=c.touched,o=c.error;return r.a.createElement(we.a.Field,{error:l&&!!o},r.a.createElement("input",Object.assign({},t,{placeholder:n,type:a})),l&&o&&r.a.createElement(G.a,{basic:!0,color:"red"},o))},Me=Object(qe.combineValidators)({newPassword1:Object(qe.isRequired)({message:"Please enter a password"}),newPassword2:Object(qe.composeValidators)(Object(qe.isRequired)({message:"Please confirm your password"}),Object(qe.matchesField)("newPassword1")({message:"Passwords do not match"}))()}),Ue=Object(Re.a)({form:"account",validate:Me})((function(e){var t=e.error,a=e.invalid,n=e.submitting,c=e.handleSubmit,l=e.updatePassword;return r.a.createElement(H.a,null,r.a.createElement(re.a,{dividing:!0,size:"large",content:"Account"}),r.a.createElement("div",null,r.a.createElement(re.a,{color:"teal",sub:!0,content:"Change password"}),r.a.createElement("p",null,"Use this form to update your account settings"),r.a.createElement(we.a,{onSubmit:c(l)},r.a.createElement(De.a,{width:8,name:"newPassword1",type:"password",pointing:"left",inline:!0,component:_e,basic:!0,placeholder:"New Password"}),r.a.createElement(De.a,{width:8,name:"newPassword2",type:"password",inline:!0,basic:!0,pointing:"left",component:_e,placeholder:"Confirm Password"}),t&&r.a.createElement(G.a,{basic:!0,color:"red"},t),r.a.createElement(Le.a,null),r.a.createElement(b.a,{disabled:a||n,size:"large",positive:!0,content:"Update Password"}))))})),Qe={updatePassword:function(e){return function(){var e=Object(S.a)(k.a.mark((function e(t,a){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t(Object(N.a)("account"));case 3:T.toastr.success("Success","Your password has been updated"),e.next=10;break;case 6:throw e.prev=6,e.t0=e.catch(0),console.log(e.t0),new A.a({_error:e.t0.message});case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t,a){return e.apply(this,arguments)}}()}},Fe=Object(p.connect)(null,Qe)((function(e){var t=e.updatePassword;return r.a.createElement(z.a,null,r.a.createElement(z.a.Column,{width:12},r.a.createElement(f.d,null,r.a.createElement(f.a,{exact:!0,from:"/settings",to:"/settings/basic"}),r.a.createElement(f.b,{path:"/settings/basic",component:Ne}),r.a.createElement(f.b,{path:"/settings/about",component:Pe}),r.a.createElement(f.b,{path:"/settings/photos",component:Te}),r.a.createElement(f.b,{path:"/settings/account",render:function(){return r.a.createElement(Ue,{updatePassword:t})}}))),r.a.createElement(z.a.Column,{width:4},r.a.createElement(Ae,null)))})),ze=a(31),He=a(336),Ve=a.n(He),Be=function(e){var t=e.input,a=e.rows,n=e.type,c=e.placeholder,l=e.meta,o=l.touched,i=l.error;return r.a.createElement(we.a.Field,{error:o&&!!i},r.a.createElement("textarea",Object.assign({},t,{placeholder:c,rows:a,type:n})),o&&i&&r.a.createElement(G.a,{basic:!0,color:"red"},i))},Ge=a(679),Je=function(e){var t=e.input,a=e.placeholder,n=e.multiple,c=e.options,l=e.meta,o=l.touched,i=l.error;return r.a.createElement(we.a.Field,{error:o&&!!i},r.a.createElement(Ge.a,{value:t.value||null,onChange:function(e,a){return t.onChange(a.value)},placeholder:a,options:c,multiple:n}),o&&i&&r.a.createElement(G.a,{basic:!0,color:"red"},i))},Ye=a(350),We=a(337),Ke=a.n(We),Xe=(a(631),function(e){var t=e.input,a=e.placeholder,n=e.meta,c=n.touched,l=n.error,o=Object(Ye.a)(e,["input","placeholder","meta"]);return r.a.createElement(we.a.Field,{error:c&&!!l},r.a.createElement(Ke.a,Object.assign({},o,{placeholderText:a,selected:t.value?new Date(t.value):null,onChange:t.onChange,onBlur:t.onBlur,onChangeRaw:function(e){return e.preventDefault()}})),c&&l&&r.a.createElement(G.a,{basic:!0,color:"red"},l))}),Ze=a(53),$e=a.n(Ze),et=function(e){var t=e.input,a=t.value,n=t.onChange,c=t.onBlur,l=(e.width,e.options),o=e.placeholder,i=e.onSelect,s=e.meta,u=s.touched,m=s.error;return r.a.createElement($e.a,{value:a,onChange:n,searchOptions:l,onSelect:i},(function(e){var t=e.getInputProps,a=e.suggestions,n=e.getSuggestionItemProps,l=e.loading;return r.a.createElement(we.a.Field,{error:u&&!!m},r.a.createElement("input",Object.assign({placeholder:o},t({placeholder:o,onBlur:c}))),u&&m&&r.a.createElement(G.a,{basic:!0,color:"red"},m),a.length>0&&r.a.createElement(H.a,{style:{marginTop:0,position:"absolute",zIndex:1e3,width:"100%"}},l&&r.a.createElement("div",null,"Loading..."),r.a.createElement(B.a,{selection:!0},a.map((function(e){return r.a.createElement(B.a.Item,n(e),r.a.createElement(B.a.Header,null,e.formattedSuggestion.mainText),r.a.createElement(B.a.Description,null,e.formattedSuggestion.secondaryText))})))))}))};function tt(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var at={createQuestion:$,updateQuestion:ee},nt=Object(qe.combineValidators)({title:Object(qe.isRequired)({message:"Title is required"}),category:Object(qe.isRequired)({message:"Category is required"}),description:Object(qe.composeValidators)(Object(qe.isRequired)({message:"Description is required"}),Object(qe.hasLengthGreaterThan)(6)({message:"Description needd to be at least 6 characters"}))(),city:Object(qe.isRequired)({message:"City is required"}),venue:Object(qe.isRequired)({message:"Venue is required"}),date:Object(qe.isRequired)({message:"Date is required"})}),rt=[{key:"drinks",text:"Drinks",value:"drinks"},{key:"culture",text:"Culture",value:"culture"},{key:"film",text:"Film",value:"film"},{key:"food",text:"Food",value:"food"},{key:"music",text:"Music",value:"music"},{key:"travel",text:"Travel",value:"travel"}],ct=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={cityLatLng:{},venueLatLng:{}},a.onSubmit=function(e){if(e.venueLatLng=a.state.venueLatLng,a.props.initialValues.id)a.props.updateQuestion(e),a.props.history.push("/questions/".concat(a.props.initialValues.id));else{var t=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?tt(a,!0).forEach((function(t){Object(ze.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):tt(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},e,{id:Ve()(),hostPhotoURL:"assets/img/user.png",hostedBy:"Bob"});a.props.createQuestion(t),a.props.history.push("/questions/".concat(t.id))}},a.handleCitySelect=function(e){Object(Ze.geocodeByAddress)(e).then((function(e){return Object(Ze.getLatLng)(e[0])})).then((function(e){a.setState({cityLatLng:e})})).then((function(){a.props.change("city",e)}))},a.handleVenueSelect=function(e){Object(Ze.geocodeByAddress)(e).then((function(e){return Object(Ze.getLatLng)(e[0])})).then((function(e){a.setState({venueLatLng:e})})).then((function(){a.props.change("venue",e)}))},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.history,a=e.initialValues,n=e.invalid,c=e.submitting,l=e.pristine;return r.a.createElement(z.a,null,r.a.createElement(z.a.Column,{width:10},r.a.createElement(H.a,null,r.a.createElement(re.a,{sub:!0,color:"teal",content:"Question Details"}),r.a.createElement(we.a,{onSubmit:this.props.handleSubmit(this.onSubmit),autoComplete:"off"},r.a.createElement(De.a,{name:"title",type:"text",component:_e,placeholder:"Question Name"}),r.a.createElement(De.a,{name:"category",component:Je,options:rt,placeholder:"Category"}),r.a.createElement(De.a,{type:"text",name:"description",component:Be,rows:5,placeholder:"Description"}),r.a.createElement(re.a,{sub:!0,color:"teal",content:"Location Details"}),r.a.createElement(De.a,{type:"text",name:"city",component:et,options:{types:["(cities)"]},onSelect:this.handleCitySelect,placeholder:"City"}),r.a.createElement(De.a,{type:"text",name:"venue",component:et,options:{location:new google.maps.LatLng(this.state.cityLatLng),radius:1e3,types:["establishment"]},onSelect:this.handleVenueSelect,placeholder:"Venue"}),r.a.createElement(De.a,{type:"text",name:"date",component:Xe,dateFormat:"dd LLL yyyy h:mm a",showTimeSelect:!0,timeFormat:"HH:mm",placeholder:"Date"}),r.a.createElement(b.a,{type:"submit",positive:!0,disabled:n||c||l},"Submit"),r.a.createElement(b.a,{type:"button",onClick:a.id?function(){return t.push("/questions/".concat(a.id))}:function(){return t.push("/questions")}},"Cancel")))))}}]),t}(n.Component),lt=Object(p.connect)((function(e,t){var a=t.match.params.id,n={};return a&&e.questions.length>0&&(n=e.questions.filter((function(e){return e.id===a}))[0]),{initialValues:n}}),at)(Object(Re.a)({form:"questionForm",validate:nt})(ct)),ot=function(e){return new Promise((function(t){return setTimeout(t,e)}))},it=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){a.setState({address:e})},a.state={address:""},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.selectAddress;return r.a.createElement($e.a,{value:this.state.address,onChange:this.handleChange,onSelect:e},(function(e){var t=e.getInputProps,a=e.suggestions,n=e.getSuggestionItemProps,c=e.loading;return r.a.createElement("div",null,r.a.createElement("input",t({placeholder:"Search Places ...",className:"location-search-input"})),r.a.createElement("div",{className:"autocomplete-dropdown-container"},c&&r.a.createElement("div",null,"Loading..."),a.map((function(e){var t=e.active?"suggestion-item--active":"suggestion-item",a=e.active?{backgroundColor:"#fafafa",cursor:"pointer"}:{backgroundColor:"#ffffff",cursor:"pointer"};return r.a.createElement("div",n(e,{className:t,style:a}),r.a.createElement("span",null,e.description))}))))}))}}]),t}(r.a.Component),st=function(){return r.a.createElement(se.a,{name:"marker",color:"red"})},ut=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.latlng;return r.a.createElement("div",{style:{height:"300px",width:"100%"}},r.a.createElement(ge.a,{bootstrapURLKeys:{key:"AIzaSyC4D1LiEjXq9Gw_Jx4m0fk1vfKwb6frWiI"},defaultCenter:e,defaultZoom:this.props.zoom},r.a.createElement(st,{lat:e.lat,lng:e.lng})))}}]),t}(n.Component);ut.defaultProps={zoom:11};var mt=ut,pt={incrementAsync:function(e){return function(){var t=Object(S.a)(k.a.mark((function t(a){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a({type:"ASYNC_ACTION_START",payload:e}),t.next=3,ot(1e3);case 3:a({type:"INCREMENT_COUNTER;"}),a({type:"ASYNC_ACTION_FINISH"});case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},decrementAsync:function(e){return function(){var t=Object(S.a)(k.a.mark((function t(a){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a({type:"ASYNC_ACTION_START",payload:e}),t.next=3,ot(1e3);case 3:a({type:"DECREMENT_COUNTER;"}),a({type:"ASYNC_ACTION_FINISH"});case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},openModal:j},dt=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={latlng:{lat:59.95,lng:30.33}},a.handleSelect=function(e){Object(Ze.geocodeByAddress)(e).then((function(e){return Object(Ze.getLatLng)(e[0])})).then((function(e){a.setState({latlng:e})})).catch((function(e){return console.error("Error",e)}))},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.data,a=e.incrementAsync,n=e.decrementAsync,c=e.openModal,l=e.loading,o=e.buttonName;return r.a.createElement("div",null,r.a.createElement("h1",null,"Test Component"),r.a.createElement("h3",null,"answer ",t),r.a.createElement(b.a,{name:"increment",loading:"increment"===o&&l,onClick:function(e){return a(e.target.name)},positive:!0,content:"add"}),r.a.createElement(b.a,{name:"decrement",loading:"decrement"===o&&l,onClick:function(e){return n(e.target.name)},negative:!0,content:"sub"}),r.a.createElement(b.a,{onClick:function(){return c("TestModal",{data:42})},color:"teal",content:"Open Modal"}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(it,{selectAddress:this.handleSelect}),r.a.createElement(mt,{key:this.state.latlng.lng,latlng:this.state.latlng}))}}]),t}(n.Component),Et=Object(p.connect)((function(e){return{data:e.test.data,loading:e.async.loading,buttonName:e.async.elementName}}),pt)(dt),ht=a(682),ft={login:function(e){return function(){var t=Object(S.a)(k.a.mark((function t(a,n){var r,c,l;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=P,c=JSON.stringify(e),t.prev=2,t.next=5,I.a.post("/api/auth",c,r);case 5:return l=t.sent,t.next=8,D(l.data.token);case 8:return t.next=10,a(R());case 10:a({type:"MODAL_CLOSE"}),t.next=17;break;case 13:throw t.prev=13,t.t0=t.catch(2),console.log(t.t0),new A.a({_error:"Login Failed"});case 17:case"end":return t.stop()}}),t,null,[[2,13]])})));return function(e,a){return t.apply(this,arguments)}}()}},bt=Object(p.connect)(null,ft)(Object(Re.a)({form:"loginForm"})((function(e){var t=e.login,a=e.handleSubmit,n=e.error;return r.a.createElement(we.a,{size:"large",onSubmit:a(t),autoComplete:"off"},r.a.createElement(H.a,null,r.a.createElement(De.a,{name:"email",component:_e,type:"text",placeholder:"Email Address"}),r.a.createElement(De.a,{name:"password",component:_e,type:"password",placeholder:"password"}),n&&r.a.createElement(G.a,{basic:!0,color:"red"},n),r.a.createElement(b.a,{fluid:!0,size:"large",color:"teal"},"Login")))}))),gt={closeModal:w},Ot=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(ht.a,{size:"mini",open:!0,onClose:this.props.closeModal},r.a.createElement(ht.a.Header,null,"Login to SPEDxchange"),r.a.createElement(ht.a.Content,null,r.a.createElement(ht.a.Description,null,r.a.createElement(bt,null))))}}]),t}(n.Component),vt=Object(p.connect)(null,gt)(Ot),yt={registeredUser:function(e){return function(){var t=Object(S.a)(k.a.mark((function t(a,n){var r,c,l;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=P,c=JSON.stringify(e),t.prev=2,t.next=5,I.a.post("/api/users",c,r);case 5:return l=t.sent,t.next=8,D(l.data.token);case 8:return t.next=10,a(R());case 10:a({type:"MODAL_CLOSE"}),t.next=17;break;case 13:throw t.prev=13,t.t0=t.catch(2),console.log(t.t0),new A.a({_error:t.t0.message});case 17:case"end":return t.stop()}}),t,null,[[2,13]])})));return function(e,a){return t.apply(this,arguments)}}()}},jt=Object(qe.combineValidators)({displayName:Object(qe.isRequired)("displayName"),email:Object(qe.isRequired)("email"),password:Object(qe.isRequired)("password")}),wt=Object(p.connect)(null,yt)(Object(Re.a)({form:"registerForm",validate:jt})((function(e){var t=e.handleSubmit,a=e.registeredUser,n=e.error,c=e.invalid,l=e.subbmitting;return r.a.createElement("div",null,r.a.createElement(we.a,{onSubmit:t(a),size:"large",autoComplete:"off"},r.a.createElement(H.a,null,r.a.createElement(De.a,{name:"displayName",type:"text",component:_e,placeholder:"Name"}),r.a.createElement(De.a,{name:"email",type:"text",component:_e,placeholder:"Email"}),r.a.createElement(De.a,{name:"password",type:"password",component:_e,placeholder:"Password"}),n&&r.a.createElement(G.a,{basic:!0,color:"red"},n),r.a.createElement(b.a,{diabled:c||l,fluid:!0,size:"large",color:"teal"},"Register"))))}))),Ct={closeModal:w},kt=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(ht.a,{size:"mini",open:!0,onClose:this.props.closeModal},r.a.createElement(ht.a.Header,null,"Sign Up to SPEDxchange!"),r.a.createElement(ht.a.Content,null,r.a.createElement(ht.a.Description,null,r.a.createElement(wt,null))))}}]),t}(n.Component),St={LoginModal:vt,RegisterModal:Object(p.connect)(null,Ct)(kt)},xt=Object(p.connect)((function(e){return{currentModal:e.modals}}))((function(e){var t,a=e.currentModal;if(a){var n=a.modalType,c=a.modalProps,l=St[n];t=r.a.createElement(l,c)}return r.a.createElement("span",null,t)})),It=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(n.Fragment,null,r.a.createElement(xt,null),r.a.createElement(f.b,{exact:!0,path:"/",component:ue}),r.a.createElement(f.b,{path:"/(.+)",render:function(){return r.a.createElement(n.Fragment,null,r.a.createElement(Q,null),r.a.createElement(F,null),r.a.createElement(E.a,{className:"main"},r.a.createElement(E.a,{className:"content"},r.a.createElement(f.d,{key:e.props.location.key},r.a.createElement(f.b,{exact:!0,path:"/questions",component:ie}),r.a.createElement(f.b,{path:"/questions/:id",component:Se}),r.a.createElement(f.b,{path:"/people",component:xe}),r.a.createElement(f.b,{path:"/profile/:id",component:Ie}),r.a.createElement(f.b,{path:"/settings",component:Fe}),r.a.createElement(f.b,{path:["/createQuestion","/manage/:id"],component:lt}),r.a.createElement(f.b,{path:"/test",component:Et})))))}}))}}]),t}(n.Component),At=Object(f.g)(It);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Nt,Pt=a(32),Tt=a(347),Lt=a(319),Dt=function(e,t){return function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,n=arguments.length>1?arguments[1]:void 0,r=n.type,c=n.payload,l=t[r];return l?l(a,c):a}};function Rt(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function qt(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?Rt(a,!0).forEach((function(t){Object(ze.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Rt(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var _t,Mt,Ut,Qt,Ft=Dt({data:42},(Nt={},Object(ze.a)(Nt,"INCREMENT_COUNTER;",(function(e){return qt({},e,{data:e.data+1})})),Object(ze.a)(Nt,"DECREMENT_COUNTER;",(function(e){return qt({},e,{data:e.data-1})})),Nt)),zt=a(181),Ht=Dt([],(_t={},Object(ze.a)(_t,"CREATE_QUESTION",(function(e,t){return[].concat(Object(zt.a)(e),[t.question])})),Object(ze.a)(_t,"UPDATE_QUESTION",(function(e,t){return[].concat(Object(zt.a)(e.filter((function(e){return e.id!==t.question.id}))),[t.question])})),Object(ze.a)(_t,"DELETE_QUESTION",(function(e,t){return Object(zt.a)(e.filter((function(e){return e.id!==t.questionId})))})),Object(ze.a)(_t,"FETCH_QUESTIONS",(function(e,t){return t.questions})),_t)),Vt=Dt(null,(Mt={},Object(ze.a)(Mt,"MODAL_OPEN",(function(e,t){return{modalType:t.modalType,modalProps:t.modalProps}})),Object(ze.a)(Mt,"MODAL_CLOSE",(function(e){return null})),Mt)),Bt=Dt({authenticated:!1,currentUser:null},(Ut={},Object(ze.a)(Ut,"SIGNOUT_USER",(function(e){return{authenticated:!1,currentUser:null}})),Object(ze.a)(Ut,"USER_LOADED",(function(e,t){return{authenticated:!0,currentUser:t}})),Object(ze.a)(Ut,"AUTH_ERROR",(function(e){return{authenticated:!1,currentUser:null}})),Ut));function Gt(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function Jt(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?Gt(a,!0).forEach((function(t){Object(ze.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Gt(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var Yt=Dt({loading:!1,elementName:null},(Qt={},Object(ze.a)(Qt,"ASYNC_ACTION_START",(function(e,t){return Jt({},e,{loading:!0,elementName:t})})),Object(ze.a)(Qt,"ASYNC_ACTION_FINISH",(function(e){return Jt({},e,{loading:!1,elementName:null})})),Object(ze.a)(Qt,"ASYNC_ACTION_ERROR",(function(e){return Jt({},e,{loading:!1,elementName:null})})),Qt)),Wt=Object(Pt.combineReducers)({form:Lt.a,test:Ft,questions:Ht,modals:Vt,auth:Bt,async:Yt,toastr:T.reducer}),Kt=a(348),Xt=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidUpdate",value:function(e){this.props.location.pathname!==e.location.pathname&&window.scrollTo(0,0)}},{key:"render",value:function(){return this.props.children}}]),t}(n.Component),Zt=Object(f.g)(Xt),$t=function(){var e=[Kt.a],t=Object(Tt.composeWithDevTools)(Pt.applyMiddleware.apply(void 0,e));return Object(Pt.createStore)(Wt,t)}(),ea=document.getElementById("root");l.a.render(r.a.createElement(p.Provider,{store:$t},r.a.createElement(h.a,null,r.a.createElement(Zt,null,r.a.createElement(L.a,{position:"bottom-right",transitionIn:"fadeIn",transitionOut:"fadeOut"}),r.a.createElement(At,null)))),ea),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[386,1,2]]]);
//# sourceMappingURL=main.1036a4d3.chunk.js.map