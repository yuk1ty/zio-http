"use strict";(self.webpackChunkzio_http_docs=self.webpackChunkzio_http_docs||[]).push([[902],{3905:function(t,e,r){r.d(e,{Zo:function(){return l},kt:function(){return d}});var n=r(7294);function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){o(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function s(t,e){if(null==t)return{};var r,n,o=function(t,e){if(null==t)return{};var r,n,o={},a=Object.keys(t);for(n=0;n<a.length;n++)r=a[n],e.indexOf(r)>=0||(o[r]=t[r]);return o}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(n=0;n<a.length;n++)r=a[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(o[r]=t[r])}return o}var p=n.createContext({}),c=function(t){var e=n.useContext(p),r=e;return t&&(r="function"==typeof t?t(e):i(i({},e),t)),r},l=function(t){var e=c(t.components);return n.createElement(p.Provider,{value:e},t.children)},u={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},m=n.forwardRef((function(t,e){var r=t.components,o=t.mdxType,a=t.originalType,p=t.parentName,l=s(t,["components","mdxType","originalType","parentName"]),m=c(r),d=o,f=m["".concat(p,".").concat(d)]||m[d]||u[d]||a;return r?n.createElement(f,i(i({ref:e},l),{},{components:r})):n.createElement(f,i({ref:e},l))}));function d(t,e){var r=arguments,o=e&&e.mdxType;if("string"==typeof t||o){var a=r.length,i=new Array(a);i[0]=m;var s={};for(var p in e)hasOwnProperty.call(e,p)&&(s[p]=e[p]);s.originalType=t,s.mdxType="string"==typeof t?t:o,i[1]=s;for(var c=2;c<a;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},6083:function(t,e,r){r.r(e),r.d(e,{frontMatter:function(){return s},contentTitle:function(){return p},metadata:function(){return c},toc:function(){return l},default:function(){return m}});var n=r(7462),o=r(3366),a=(r(7294),r(3905)),i=["components"],s={},p="HTTPS Cient",c={unversionedId:"zio-http-basic-examples/https-client",id:"zio-http-basic-examples/https-client",isDocsHomePage:!1,title:"HTTPS Cient",description:"",source:"@site/docs/zio-http-basic-examples/https-client.md",sourceDirName:"zio-http-basic-examples",slug:"/zio-http-basic-examples/https-client",permalink:"/zio-http/docs/zio-http-basic-examples/https-client",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Simple Server",permalink:"/zio-http/docs/zio-http-basic-examples/hello-world"},next:{title:"HTTPS Server",permalink:"/zio-http/docs/zio-http-basic-examples/https-server"}},l=[],u={toc:l};function m(t){var e=t.components,r=(0,o.Z)(t,i);return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"https-cient"},"HTTPS Cient"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-scala"},'import io.netty.handler.ssl.SslContextBuilder\nimport zhttp.http.{Header, HttpData}\nimport zhttp.service.client.ClientSSLHandler.ClientSSLOptions\nimport zhttp.service.{ChannelFactory, Client, EventLoopGroup}\nimport zio._\n\nimport java.io.InputStream\nimport java.security.KeyStore\nimport javax.net.ssl.TrustManagerFactory\n\nobject HttpsClient extends App {\n  val env     = ChannelFactory.auto ++ EventLoopGroup.auto()\n  val url     = "https://sports.api.decathlon.com/groups/water-aerobics"\n  val headers = List(Header.host("sports.api.decathlon.com"))\n\n  //Configuring Truststore for https(optional)\n  val trustStore: KeyStore                     = KeyStore.getInstance("JKS")\n  val trustStorePath: InputStream              = getClass.getResourceAsStream("truststore.jks")\n  val trustStorePassword: String               = "changeit"\n  val trustManagerFactory: TrustManagerFactory =\n    TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm)\n\n  trustStore.load(trustStorePath, trustStorePassword.toCharArray)\n  trustManagerFactory.init(trustStore)\n\n  val sslOption: ClientSSLOptions =\n    ClientSSLOptions\n        .CustomSSL(SslContextBuilder.forClient().trustManager(trustManagerFactory).build())\n\n  val program = for {\n    res <- Client.request(url, headers, sslOption)\n    _   <- console.putStrLn {\n      res.content match {\n        case HttpData.CompleteData(data) => data.map(_.toChar).mkString\n        case HttpData.StreamData(_)      => "<Chunked>"\n        case HttpData.Empty              => ""\n      }\n    }\n  } yield ()\n\n  override def run(args: List[String]): URIO[zio.ZEnv, ExitCode] \n    = program.exitCode.provideCustomLayer(env)\n\n}\n')))}m.isMDXComponent=!0}}]);