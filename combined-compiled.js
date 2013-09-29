var loadScript;function loadJS(a){""!=a&&(unloadJS(),loadScript=document.createElement("script"),loadScript.setAttribute("type","text/javascript"),loadScript.setAttribute("src",a),loadScript.setAttribute("Id","loadedJS"),loadScript.setAttribute("onerror","alert('Error loading file!');"),"undefined"!=typeof loadScript?document.getElementsByTagName("head")[0].appendChild(loadScript):alert("Error loading script!"))}
function unloadJS(){var a=document.getElementById("loadedJS");a&&a.parentNode.removeChild(a)}function AEObject(){this.getParamList=function(){};this.run=function(){}}var axesPicked,axesN,axesNmax,xyAxes,axesAlignmentData=[],plotType;
function initiatePlotAlignment(){axesPicked=0;xyEl=document.getElementById("r_xy");polarEl=document.getElementById("r_polar");ternaryEl=document.getElementById("r_ternary");mapEl=document.getElementById("r_map");imageEl=document.getElementById("r_image");closePopup("axesList");!0==xyEl.checked?setAxes("XY"):!0==polarEl.checked?setAxes("polar"):!0==ternaryEl.checked?setAxes("ternary"):!0==mapEl.checked?setAxes("map"):!0==imageEl.checked&&setAxes("image")}
function setAxes(a){plotType=a;clearSidebar();removeAllMouseEvents();addMouseEvent("click",pickCorners,!0);axesN=0;xyAxes=[];"XY"===plotType||"bar"===plotType?(axesNmax=4,showPopup("xyAxesInfo")):"polar"===plotType?(axesNmax=3,showPopup("polarAxesInfo")):"ternary"===plotType?(axesNmax=3,showPopup("ternaryAxesInfo")):"map"===plotType?(axesNmax=2,showPopup("mapAxesInfo")):"image"===plotType&&(axesNmax=0,alignAxes())}
function pickCorners(a){axesN<axesNmax&&(xi=a.layerX,yi=a.layerY,xyAxes[axesN]=[],xyAxes[axesN][0]=parseFloat(xi),xyAxes[axesN][1]=parseFloat(yi),axesN+=1,dataCtx.beginPath(),dataCtx.fillStyle="rgb(0,0,200)",dataCtx.arc(xi,yi,3,0,2*Math.PI,!0),dataCtx.fill(),updateZoom(a),axesN===axesNmax&&(axesPicked=1,removeMouseEvent("click",pickCorners,!0),"XY"===plotType?showPopup("xyAlignment"):"polar"===plotType?showPopup("polarAlignment"):"ternary"===plotType?showPopup("ternaryAlignment"):"map"===plotType&&
showPopup("mapAlignment"),dataCanvas.width=dataCanvas.width))}
function alignAxes(){if("XY"===plotType){var a=document.getElementById("xmin"),d=document.getElementById("xmax"),b=document.getElementById("ymin"),g=document.getElementById("ymax"),f=document.getElementById("xlog"),c=document.getElementById("ylog");axesAlignmentData[0]=parseFloat(a.value);axesAlignmentData[1]=parseFloat(d.value);axesAlignmentData[2]=parseFloat(b.value);axesAlignmentData[3]=parseFloat(g.value);axesAlignmentData[4]=!0===f.checked?!0:!1;axesAlignmentData[5]=!0===c.checked?!0:!1;closePopup("xyAlignment")}else"polar"==
plotType?(a=document.getElementById("rpoint1"),d=document.getElementById("thetapoint1"),b=document.getElementById("rpoint2"),g=document.getElementById("thetapoint2"),f=document.getElementById("degrees"),document.getElementById("radians"),c=document.getElementById("clockwise"),axesAlignmentData[0]=parseFloat(a.value),axesAlignmentData[1]=parseFloat(d.value),axesAlignmentData[2]=parseFloat(b.value),axesAlignmentData[3]=parseFloat(g.value),axesAlignmentData[4]=!0===f.checked?!0:!1,axesAlignmentData[5]=
!0===c.checked?!0:!1,closePopup("polarAlignment")):"ternary"===plotType?(document.getElementById("range0to1"),a=document.getElementById("range0to100"),d=document.getElementById("ternarynormal"),axesAlignmentData[0]=!0===a.checked?!0:!1,axesAlignmentData[1]=!0===d.checked?!0:!1,closePopup("ternaryAlignment")):"map"===plotType?(a=document.getElementById("scaleLength"),axesAlignmentData[0]=parseFloat(a.value),closePopup("mapAlignment")):"image"===plotType&&(axesPicked=1,axesAlignmentData[0]=imageDimensions[0],
axesAlignmentData[1]=imageDimensions[2],axesAlignmentData[2]=imageDimensions[1],axesAlignmentData[3]=imageDimensions[3]);1===axesPicked&&acquireData()}var fg_color=[0,0,0],bg_color=[255,255,255],colorPickerMode="fg",testImgCanvas,testImgContext,boxCoordinates=[0,0,1,1],drawingBox=!1,drawingPen=!1,drawingEraser=!1,binaryData;function colorPickerWindow(a){colorPickerMode=a;"fg"===a?showPopup("colorPickerFG"):"bg"===a&&showPopup("colorPickerBG")}
function pickColor(){removeAllMouseEvents();addMouseEvent("click",colorPicker,!0)}
function colorPicker(a){xi=a.layerX;yi=a.layerY;iData=ctx.getImageData(cx0,cy0,currentImageWidth,currentImageHeight);xi<currentImageWidth+cx0&&(yi<currentImageHeight+cy0&&xi>cx0&&yi>cy0)&&(ii=xi-cx0,jj=yi-cy0,a=4*jj*currentImageWidth+4*ii,a=[iData.data[a],iData.data[a+1],iData.data[a+2]],redEl=document.getElementById("color_red"),greenEl=document.getElementById("color_green"),blueEl=document.getElementById("color_blue"),removeMouseEvent("click",colorPicker,!0),"fg"===colorPickerMode?(assignColor("fg",
a),redEl=document.getElementById("color_red_fg"),greenEl=document.getElementById("color_green_fg"),blueEl=document.getElementById("color_blue_fg"),showPopup("colorPickerFG")):"bg"===colorPickerMode&&(assignColor("bg",a),redEl=document.getElementById("color_red_bg"),greenEl=document.getElementById("color_green_bg"),blueEl=document.getElementById("color_blue_bg"),showPopup("colorPickerBG")),redEl.value=a[0],greenEl.value=a[1],blueEl.value=a[2])}
function assignColor(a,d){"fg"===a?(d||(redEl=document.getElementById("color_red_fg"),greenEl=document.getElementById("color_green_fg"),blueEl=document.getElementById("color_blue_fg"),d=[],d[0]=redEl.value,d[1]=greenEl.value,d[2]=blueEl.value),fg_color=d,document.getElementById("autoFGBtn").style.borderColor="rgb("+fg_color[0]+","+fg_color[1]+","+fg_color[2]+")"):"bg"===a&&(d||(redEl=document.getElementById("color_red_bg"),greenEl=document.getElementById("color_green_bg"),blueEl=document.getElementById("color_blue_bg"),
d=[],d[0]=redEl.value,d[1]=greenEl.value,d[2]=blueEl.value),bg_color=d,document.getElementById("autoBGBtn").style.borderColor="rgb("+bg_color[0]+","+bg_color[1]+","+bg_color[2]+")")}function boxPaint(){removeAllMouseEvents();addMouseEvent("mousedown",boxPaintMousedown,!0);addMouseEvent("mouseup",boxPaintMouseup,!0);addMouseEvent("mousemove",boxPaintMousedrag,!0)}function boxPaintMousedown(a){boxCoordinates[0]=parseInt(a.layerX);boxCoordinates[1]=parseInt(a.layerY);drawingBox=!0}
function boxPaintMouseup(a){boxCoordinates[2]=parseInt(a.layerX);boxCoordinates[3]=parseInt(a.layerY);hoverCanvas.width=hoverCanvas.width;dataCtx.fillStyle="rgba(255,255,0,1)";dataCtx.fillRect(boxCoordinates[0],boxCoordinates[1],boxCoordinates[2]-boxCoordinates[0],boxCoordinates[3]-boxCoordinates[1]);drawingBox=!1}
function boxPaintMousedrag(a){!0===drawingBox&&(xt=parseInt(a.layerX),yt=parseInt(a.layerY),hoverCanvas.width=hoverCanvas.width,hoverCtx.strokeStyle="rgb(0,0,0)",hoverCtx.strokeRect(boxCoordinates[0],boxCoordinates[1],xt-boxCoordinates[0],yt-boxCoordinates[1]))}function penPaint(){removeAllMouseEvents();showToolbar("paintToolbar");addMouseEvent("mousedown",penPaintMousedown,!0);addMouseEvent("mouseup",penPaintMouseup,!0);addMouseEvent("mousemove",penPaintMousedrag,!0)}
function penPaintMousedown(a){!1===drawingPen&&(xt=parseInt(a.layerX),yt=parseInt(a.layerY),drawingPen=!0,ctx.strokeStyle="rgba(255,255,0,1)",thkRange=document.getElementById("paintThickness"),dataCtx.lineWidth=parseInt(thkRange.value),dataCtx.beginPath(),dataCtx.moveTo(xt,yt))}function penPaintMouseup(a){dataCtx.closePath();dataCtx.lineWidth=1;drawingPen=!1}
function penPaintMousedrag(a){!0===drawingPen&&(xt=parseInt(a.layerX),yt=parseInt(a.layerY),dataCtx.strokeStyle="rgba(255,255,0,1)",dataCtx.lineTo(xt,yt),dataCtx.stroke())}function eraser(){removeAllMouseEvents();showToolbar("paintToolbar");addMouseEvent("mousedown",eraserMousedown,!0);addMouseEvent("mouseup",eraserMouseup,!0);addMouseEvent("mousemove",eraserMousedrag,!0);dataCtx.globalCompositeOperation="destination-out"}
function eraserMousedown(a){!1===drawingEraser&&(xt=parseInt(a.layerX),yt=parseInt(a.layerY),drawingEraser=!0,dataCtx.globalCompositeOperation="destination-out",dataCtx.strokeStyle="rgba(0,0,0,1)",thkRange=document.getElementById("paintThickness"),dataCtx.lineWidth=parseInt(thkRange.value),dataCtx.beginPath(),dataCtx.moveTo(xt,yt))}function eraserMouseup(a){dataCtx.closePath();dataCtx.lineWidth=1;dataCtx.globalCompositeOperation="source-over";drawingEraser=!1}
function eraserMousedrag(a){!0===drawingEraser&&(xt=parseInt(a.layerX),yt=parseInt(a.layerY),dataCtx.globalCompositeOperation="destination-out",dataCtx.strokeStyle="rgba(0,0,0,1)",dataCtx.lineTo(xt,yt),dataCtx.stroke())}
function updateTestWindow(){colorModeEl=document.getElementById("colorModeFG");colorDistanceEl=document.getElementById("colorDistance");!0===colorModeEl.checked?(colmode="fg",chosenColor=fg_color):(colmode="bg",chosenColor=bg_color);cdistance=parseInt(colorDistanceEl.value);binaryData=selectFromMarkedRegion(colmode,chosenColor,cdistance);tempImgCanvas=document.createElement("canvas");tempImgCanvas.width=canvasWidth;tempImgCanvas.height=canvasHeight;tempImgContext=tempImgCanvas.getContext("2d");timgData=
tempImgContext.getImageData(0,0,canvasWidth,canvasHeight);timgData=binaryToImageData(binaryData,timgData);tempImgContext.putImageData(timgData,0,0);testImage=tempImgCanvas.toDataURL();var a=new Image;a.onload=function(){testImgContext.drawImage(a,0,0,canvasWidth/2,canvasHeight/2);processingNote(!1)};a.src=testImage}function saveTest(){window.open().location=testImgCanvas.toDataURL()}function launchTestWindow(){processingNote(!0);setTimeout("updateTestWindow();showPopup('testImageWindow');",100)}
function scanPlot(){autoStepEl=document.getElementById("autostepalgo");xStepEl=document.getElementById("xstepalgo");yStepEl=document.getElementById("ystepalgo");closePopup("testImageWindow");xyData=[];pointsPicked=0;resetLayers();AEObject.run();pointsStatus(pointsPicked);for(var a=0;a<pointsPicked;a++)dataCtx.beginPath(),dataCtx.fillStyle="rgb(200,0,200)",dataCtx.arc(xyData[a][0],xyData[a][1],3,0,2*Math.PI,!0),dataCtx.fill()}
function displayParameters(){var a=document.getElementById("curvesAlgoSelect");document.getElementById("paramZone");var d=document.getElementById("URLinput");"customAlgorithm"!==a.value&&(d.style.display="none",AEObject=window[a.value],makeParameterTable())}
function makeParameterTable(){if(AEObject.getParamList){var a=AEObject.getParamList(),d=document.getElementById("paramZone");d.innerHTML="";for(var b=0;b<a.length;b++)d.innerHTML+="<p>"+a[b][0]+" ("+a[b][1]+") <input type='text' value='"+a[b][2]+"' size=3 id='pv"+b+"'></p>"}}
var mainCanvas,dataCanvas,drawCanvas,hoverCanvas,topCanvas,cx0,cy0,canvasWidth,canvasHeight,cwidth,cheight,caspectratio,currentImage,originalImage,currentImageHeight,currentImageWidth,currentImageData,imageDimensions=[],onScreenDimensions=[],ctx,dataCtx,drawCtx,hoverCtx,topCtx,originalScreen,mainScreen,dataScreen,drawScreen,hoverScreen,topScreen;
function loadImage(a){var d=parseInt(a.height),b=parseInt(a.width),g=d/b,f=d,c=b;g>caspectratio?(f=cheight,c=cheight/g):(c=cwidth,f=cwidth*g);currentImage=a;currentImageHeight=parseInt(f);currentImageWidth=parseInt(c);ctx.fillStyle="rgb(255,255,255)";ctx.fillRect(0,0,canvasWidth,canvasHeight);ctx.drawImage(a,cx0,cy0,c,f);currentScreen=getCanvasData();imageDimensions[0]=1;imageDimensions[1]=1;imageDimensions[2]=b;imageDimensions[3]=d;onScreenDimensions[0]=cx0;onScreenDimensions[1]=cy0;onScreenDimensions[2]=
c+cx0;onScreenDimensions[3]=f+cy0}function saveCanvasImage(){var a=ctx.getImageData(cx0,cy0,currentImageWidth,currentImageHeight),d=document.createElement("canvas");d.width=currentImageWidth;d.height=currentImageHeight;tCanvasContext=d.getContext("2d");tCanvasContext.putImageData(a,0,0);newImage=new Image;newImage.src=d.toDataURL();newImage.onload=function(){currentImage=newImage;currentScreen=getCanvasData()}}function getCanvasData(){return ctx.getImageData(0,0,canvasWidth,canvasHeight)}
function putCanvasData(a){mainCanvas.width=mainCanvas.width;ctx.putImageData(a,0,0)}function reloadPlot(){mainCanvas.width=mainCanvas.width;ctx.drawImage(currentImage,cx0,cy0,currentImageWidth,currentImageHeight)}function redrawCanvas(){mainCanvas.width=mainCanvas.width;putCanvasData(currentScreen)}function resetLayers(){dataCanvas.width=dataCanvas.width;drawCanvas.width=drawCanvas.width;hoverCanvas.width=hoverCanvas.width;topCanvas.width=topCanvas.width}
function savePNG(){window.open().location=mainCanvas.toDataURL()}function dropHandler(a){a=a.dataTransfer.files;1==a.length&&fileLoader(a[0])}function fileLoader(a){if(a.type.match("image.*")){var d=new FileReader;d.onload=function(){var a=d.result,g=new Image;g.onload=function(){loadImage(g);originalScreen=getCanvasData();originalImage=g;setDefaultState()};g.src=a};d.readAsDataURL(a)}}
function loadNewFile(){var a=document.getElementById("fileLoadBox");1==a.files.length&&fileLoader(a.files[0]);closePopup("loadNewImage")}var dataToPixelxy;
function pixelToData(a,d,b){if(1===axesPicked&&1<=d){var g=[];if("XY"===b){b=xyAxes[0][0];var f=xyAxes[0][1],c=xyAxes[1][0],e=xyAxes[1][1],h=xyAxes[2][0],k=xyAxes[2][1],l=xyAxes[3][0],r=xyAxes[3][1],m=axesAlignmentData[0],p=axesAlignmentData[1],n=axesAlignmentData[2],q=axesAlignmentData[3];!0===axesAlignmentData[4]&&(m=Math.log(m)/Math.log(10),p=Math.log(p)/Math.log(10));!0===axesAlignmentData[5]&&(n=Math.log(n)/Math.log(10),q=Math.log(q)/Math.log(10));var p=p-m,q=q-n,s=Math.sqrt((b-c)*(b-c)+(f-e)*
(f-e)),t=Math.sqrt((h-l)*(h-l)+(k-r)*(k-r)),p=p/s,q=q/t,t=taninverse(-(e-f),c-b),r=taninverse(-(r-k),l-h),s=r-t;for(ii=0;ii<d;ii++){var c=a[ii][0],e=a[ii][1],l=Math.sqrt((c-b)*(c-b)+(e-f)*(e-f)),u=taninverse(-(e-f),c-b)-t,l=l*Math.cos(u)-l*Math.sin(u)/Math.tan(s),l=l*p+m,u=Math.sqrt((c-h)*(c-h)+(e-k)*(e-k)),c=r-taninverse(-(e-k),c-h),c=u*Math.cos(c)-u*Math.sin(c)/Math.tan(s),c=c*q+n;!0===axesAlignmentData[4]&&(l=Math.pow(10,l));!0===axesAlignmentData[5]&&(c=Math.pow(10,c));g[ii]=[];g[ii][0]=l;g[ii][1]=
c}}else if("image"===b){b=onScreenDimensions[0];f=onScreenDimensions[1];c=onScreenDimensions[2];e=onScreenDimensions[1];h=onScreenDimensions[0];k=onScreenDimensions[1];l=onScreenDimensions[0];r=onScreenDimensions[3];m=axesAlignmentData[0];p=axesAlignmentData[1];n=axesAlignmentData[2];q=axesAlignmentData[3];p-=m;q-=n;s=Math.sqrt((b-c)*(b-c)+(f-e)*(f-e));t=Math.sqrt((h-l)*(h-l)+(k-r)*(k-r));p/=s;q/=t;t=taninverse(-(e-f),c-b);r=taninverse(-(r-k),l-h);s=r-t;for(ii=0;ii<d;ii++)c=a[ii][0],e=a[ii][1],l=
Math.sqrt((c-b)*(c-b)+(e-f)*(e-f)),u=taninverse(-(e-f),c-b)-t,l=l*Math.cos(u)-l*Math.sin(u)/Math.tan(s),l=l*p+m,u=Math.sqrt((c-h)*(c-h)+(e-k)*(e-k)),c=r-taninverse(-(e-k),c-h),c=u*Math.cos(c)-u*Math.sin(c)/Math.tan(s),c=c*q+n,g[ii]=[],g[ii][0]=Math.round(l),g[ii][1]=Math.round(c)}else if("map"===b){my0=canvasHeight;my2=my1=0;h=canvasWidth;my3=canvasHeight;b=0;f=-(my1-my0);h-=0;k=-(my3-my0);m=xyAxes[0][0];n=xyAxes[0][1];c=xyAxes[1][0];e=xyAxes[1][1];c=axesAlignmentData[0]/Math.sqrt((m-c)*(m-c)+(n-
e)*(n-e));m=0;p=canvasWidth*c;n=0;q=canvasHeight*c;p-=m;q-=n;e=b*k-f*h;for(ii=0;ii<d;ii++)c=a[ii][0]-0,t=-(a[ii][1]-my0),l=(-f*p*c+b*p*t)/e+m,c=(k*q*c-h*q*t)/e+n,g[ii]=[],g[ii][0]=l,g[ii][1]=c}else if("polar"===b){m=parseFloat(xyAxes[0][0]);n=parseFloat(xyAxes[0][1]);b=parseFloat(xyAxes[1][0]);f=parseFloat(xyAxes[1][1]);c=parseFloat(xyAxes[2][0]);e=parseFloat(xyAxes[2][1]);h=parseFloat(axesAlignmentData[0]);t=parseFloat(axesAlignmentData[1]);k=parseFloat(axesAlignmentData[2]);parseFloat(axesAlignmentData[3]);
p=axesAlignmentData[4];!0===p&&(t*=Math.PI/180);q=Math.sqrt((b-m)*(b-m)+(f-n)*(f-n));l=Math.sqrt((c-m)*(c-m)+(e-n)*(e-n))-q;b=taninverse(-(f-n),b-m);b-=t;for(ii=0;ii<d;ii++)c=a[ii][0],e=a[ii][1],f=(k-h)/l*(Math.sqrt((c-m)*(c-m)+(e-n)*(e-n))-q)+h,c=taninverse(-(e-n),c-m)-b,!0==p&&(c=180*c/Math.PI),g[ii]=[],g[ii][0]=f,g[ii][1]=c}else if("ternary"===plotType){m=xyAxes[0][0];n=xyAxes[0][1];b=xyAxes[1][0];f=xyAxes[1][1];h=Math.sqrt((m-b)*(m-b)+(n-f)*(n-f));b=taninverse(-(f-n),b-m);k=Math.sqrt(3);p=axesAlignmentData[0];
q=axesAlignmentData[1];for(ii=0;ii<d;ii++)c=a[ii][0],e=a[ii][1],f=Math.sqrt((c-m)*(c-m)+(e-n)*(e-n)),c=taninverse(-(e-n),c-m)-b,e=f*Math.cos(c)/h,l=f*Math.sin(c)/h,f=1-e-l/k,c=e-l/k,e=2*l/k,!1==q&&(l=c,c=f,f=e,e=l),!0==p&&(f*=100,c*=100,e*=100),g[ii]=[],g[ii][0]=f,g[ii][1]=c,g[ii][2]=e}return g}return 0}
function dataToPixel(a,d,b){dataToPixelxy=[];if("XY"===b){var g=xyAxes[0][0],f=xyAxes[0][1],c=xyAxes[1][0],e=xyAxes[1][1],h=xyAxes[2][0];b=xyAxes[2][1];var k=xyAxes[3][0],l=xyAxes[3][1],r=axesAlignmentData[0],m=axesAlignmentData[1],p=axesAlignmentData[2],n=axesAlignmentData[3];!0===axesAlignmentData[4]&&(r=Math.log(r)/Math.log(10),m=Math.log(m)/Math.log(10));!0===axesAlignmentData[5]&&(p=Math.log(p)/Math.log(10),n=Math.log(n)/Math.log(10));var q=(g-c)*(b-l)-(f-e)*(h-k),s=[[]];s[0][0]=((g*e-f*c)*(h-
k)-(g-c)*(h*l-b*k))/q;s[0][1]=((g*e-f*c)*(b-l)-(f-e)*(h*l-b*k))/q;var s=pixelToData(s,1,"XY"),q=s[0][0],s=s[0][1],m=m-r,t=n-p,n=Math.sqrt((g-c)*(g-c)+(f-e)*(f-e)),u=Math.sqrt((h-k)*(h-k)+(b-l)*(b-l)),n=m/n,m=t/u,f=taninverse(-(e-f),c-g),h=taninverse(-(l-b),k-h),g=(a-r)*Math.cos(f)/n+(d-s)*Math.cos(h)/m+g;a=b-(a-q)*Math.sin(f)/n-(d-p)*Math.sin(h)/m;dataToPixelxy[0]=g;dataToPixelxy[1]=a}return 0}
function generateCSV(){if(1===axesPicked&&1<=pointsPicked){showPopup("csvWindow");var a=document.getElementById("tarea");a.value="";var d=pixelToData(xyData,pointsPicked,plotType);if("XY"===plotType||"map"===plotType||"polar"===plotType||"image"===plotType)for(var b=0;b<pointsPicked;b++)a.value=a.value+d[b][0]+","+d[b][1]+"\n";else if("ternary"===plotType)for(b=0;b<pointsPicked;b++)a.value=a.value+d[b][0]+","+d[b][1]+","+d[b][2]+"\n"}}var cropStatus=0,cropCoordinates=[0,0,0,0];
function hflip(){processingNote(!0);for(var a=ctx.getImageData(cx0,cy0,currentImageWidth,currentImageHeight),d=0;d<currentImageHeight;d++)for(var b=0;b<currentImageWidth/2;b++)for(var g=4*d*currentImageWidth+4*b,f=4*(d+1)*currentImageWidth-4*(b+1),c=0;4>c;c++){var e=a.data[g+c];a.data[g+c]=a.data[f+c];a.data[f+c]=e}ctx.putImageData(a,cx0,cy0);saveCanvasImage();processingNote(!1)}
function vflip(){processingNote(!0);for(var a=ctx.getImageData(cx0,cy0,currentImageWidth,currentImageHeight),d=0;d<currentImageWidth;d++)for(var b=0;b<currentImageHeight/2;b++)for(var g=4*b*currentImageWidth+4*d,f=4*(currentImageHeight-(b+2))*currentImageWidth+4*d,c=0;4>c;c++){var e=a.data[g+c];a.data[g+c]=a.data[f+c];a.data[f+c]=e}ctx.putImageData(a,cx0,cy0);saveCanvasImage();processingNote(!1)}
function cropPlot(){redrawCanvas();removeAllMouseEvents();addMouseEvent("mousedown",cropMousedown,!0);addMouseEvent("mouseup",cropMouseup,!0);addMouseEvent("mousemove",cropMousemove,!0)}function cropMousedown(a){cropCoordinates[0]=parseInt(a.layerX);cropCoordinates[1]=parseInt(a.layerY);cropStatus=1}
function cropMouseup(a){cropCoordinates[2]=parseInt(a.layerX);cropCoordinates[3]=parseInt(a.layerY);cropStatus=0;hoverCanvas.width=hoverCanvas.width;cropWidth=cropCoordinates[2]-cropCoordinates[0];cropHeight=cropCoordinates[3]-cropCoordinates[1];if(0<cropWidth&&0<cropHeight){a=document.createElement("canvas");var d=a.getContext("2d");a.width=cropWidth;a.height=cropHeight;var b=ctx.getImageData(cropCoordinates[0],cropCoordinates[1],cropWidth,cropHeight);d.putImageData(b,0,0);cropSrc=a.toDataURL();
cropImg=new Image;cropImg.src=cropSrc;cropImg.onload=function(){loadImage(cropImg)}}}function cropMousemove(a){1==cropStatus&&(hoverCanvas.width=hoverCanvas.width,hoverCtx.strokeStyle="rgb(0,0,0)",hoverCtx.strokeRect(cropCoordinates[0],cropCoordinates[1],parseInt(a.layerX)-cropCoordinates[0],parseInt(a.layerY)-cropCoordinates[1]))}function restoreOriginalImage(){loadImage(originalImage)}function rotateCanvas(){}
function findDifference(a,d){for(var b=canvasWidth,g=canvasHeight,f=[],c=0;c<g;c++){f[c]=[];for(var e=0;e<b;e++){var h=4*c*b+4*e;f[c][e]=!1;for(var k=0;4>k;k++)a.data[h+k]!=d.data[h+k]&&(f[c][e]=!0)}}return f}function copyUsingDifference(a,d,b){for(var g=canvasWidth,f=canvasHeight,c=0;c<f;c++)for(var e=0;e<g;e++){var h=4*c*g+4*e;if(!0===b[c][e])for(var k=0;4>k;k++)a.data[h+k]=d.data[h+k]}return a}
function colorSelect(a,d,b,g){dw=canvasWidth;dh=canvasHeight;redv=b[0];greenv=b[1];bluev=b[2];b=[];for(var f=0;f<dh;f++){b[f]=[];for(var c=0;c<dw;c++)index=4*f*dw+4*c,ir=a.data[index],ig=a.data[index+1],ib=a.data[index+2],dist=Math.sqrt((ir-redv)*(ir-redv)+(ig-greenv)*(ig-greenv)+(ib+bluev)*(ib+bluev)),b[f][c]=!1,"fg"===d?dist<=g&&(b[f][c]=!0):"bg"===d&&dist>g&&(b[f][c]=!0)}return b}
function colorSelectDiff(a,d,b,g,f){dw=canvasWidth;dh=canvasHeight;redv=b[0];greenv=b[1];bluev=b[2];b=[];for(var c=0;c<dh;c++){b[c]=[];for(var e=0;e<dw;e++){index=4*c*dw+4*e;var h=a.data[index],k=a.data[index+1],l=a.data[index+2],h=Math.sqrt((h-redv)*(h-redv)+(k-greenv)*(k-greenv)+(l-bluev)*(l-bluev));b[c][e]=!1;"fg"===d&&1===f[c][e]?h<=g&&(b[c][e]=!0):"bg"===d&&1===f[c][e]&&h>g&&(b[c][e]=!0)}}return b}
function selectFromMarkedRegion(a,d,b){dw=canvasWidth;dh=canvasHeight;redv=d[0];greenv=d[1];bluev=d[2];d=dataCtx.getImageData(0,0,canvasWidth,canvasHeight);for(var g=getCanvasData(),f=[],c=0;c<dh;c++){f[c]=[];for(var e=0;e<dw;e++){index=4*c*dw+4*e;var h=d.data[index],k=d.data[index+1],l=d.data[index+2],r=g.data[index],m=g.data[index+1],p=g.data[index+2];f[c][e]=!1;255===h&&(255===k&&0===l)&&(h=Math.sqrt((r-redv)*(r-redv)+(m-greenv)*(m-greenv)+(p-bluev)*(p-bluev)),"fg"===a&&h<=b?f[c][e]=!0:"bg"===
a&&h>b&&(f[c][e]=!0))}}return f}function binaryToImageData(a,d){dw=canvasWidth;dh=canvasHeight;for(var b=0;b<dh;b++)for(var g=0;g<dw;g++)index=4*b*dw+4*g,!1===a[b][g]?(d.data[index]=255,d.data[index+1]=255,d.data[index+2]=255):(d.data[index]=0,d.data[index+1]=0,d.data[index+2]=0),d.data[index+3]=255;return d}
function init(){checkBrowser();mainCanvas=document.getElementById("mainCanvas");dataCanvas=document.getElementById("dataCanvas");drawCanvas=document.getElementById("drawCanvas");hoverCanvas=document.getElementById("hoverCanvas");topCanvas=document.getElementById("topCanvas");var a=document.getElementById("canvasDiv");zCanvas=document.getElementById("zoomCanvas");zctx=zCanvas.getContext("2d");tempCanvas=document.createElement("canvas");tctx=tempCanvas.getContext("2d");tempCanvas.width=zoom_dx;tempCanvas.height=
zoom_dy;cx0=zoom_dx/2;cy0=zoom_dy/2;canvasWidth=parseFloat(a.offsetWidth);canvasHeight=parseFloat(a.offsetHeight);mainCanvas.height=canvasHeight;mainCanvas.width=canvasWidth;dataCanvas.height=canvasHeight;dataCanvas.width=canvasWidth;drawCanvas.height=canvasHeight;drawCanvas.width=canvasWidth;hoverCanvas.height=canvasHeight;hoverCanvas.width=canvasWidth;topCanvas.height=canvasHeight;topCanvas.width=canvasWidth;cheight=canvasHeight-zoom_dy;cwidth=canvasWidth-zoom_dx;caspectratio=cheight/cwidth;ctx=
mainCanvas.getContext("2d");dataCtx=dataCanvas.getContext("2d");drawCtx=drawCanvas.getContext("2d");hoverCtx=hoverCanvas.getContext("2d");topCtx=topCanvas.getContext("2d");mPosn=document.getElementById("mousePosition");img=new Image;img.onload=function(){loadImage(img);originalImage=img};img.src="start.png";testImgCanvas=document.getElementById("testImg");testImgCanvas.width=canvasWidth/2;testImgCanvas.height=canvasHeight/2;testImgContext=testImgCanvas.getContext("2d");topCanvas.addEventListener("mousemove",
updateZoom,!1);document.body.addEventListener("keydown",toggleCrosshair,!1);topCanvas.addEventListener("dragover",function(a){a.preventDefault()},!0);topCanvas.addEventListener("drop",function(a){a.preventDefault();dropHandler(a)},!0);setDefaultState();initZoom();activeScreen=originalScreen=getCanvasData();displayParameters()}function setDefaultState(){pointsPicked=axesPicked=0;xyData=[];axesAlignmentData=[]}
function checkBrowser(){window.FileReader||alert("\tWARNING!\nYou are using an unsupported browser. Please use Google Chrome 6+ or Firefox 3.6+.\n Sorry for the inconvenience.")}var xyData=[],pointsPicked=0;function acquireData(){0===axesPicked?showPopup("alignAxes"):(showSidebar("manualMode"),removeAllMouseEvents())}
function pickPoints(){0===axesPicked?alert("Define the axes first!"):(removeAllMouseEvents(),addMouseEvent("click",clickPoints,!0),pointsStatus(pointsPicked),showSidebar("manualMode"))}function clickPoints(a){xi=a.layerX;yi=a.layerY;xyData[pointsPicked]=[];xyData[pointsPicked][0]=parseFloat(xi);xyData[pointsPicked][1]=parseFloat(yi);pointsPicked+=1;dataCtx.beginPath();dataCtx.fillStyle="rgb(200,0,0)";dataCtx.arc(xi,yi,3,0,2*Math.PI,!0);dataCtx.fill();pointsStatus(pointsPicked);updateZoom(a)}
function clearPoints(){pointsPicked=0;pointsStatus(pointsPicked);resetLayers();removeAllMouseEvents()}function undoPointSelection(){if(1<=pointsPicked){pointsPicked-=1;pointsStatus(pointsPicked);resetLayers();for(ii=0;ii<pointsPicked;ii++)xi=xyData[ii][0],yi=xyData[ii][1],dataCtx.beginPath(),dataCtx.fillStyle="rgb(200,0,0)",dataCtx.arc(xi,yi,3,0,2*Math.PI,!0),dataCtx.fill()}}
function pointsStatus(a){var d=document.getElementById("pointsStatus"),b=document.getElementById("autoPointsStatus");d.innerHTML=a;b.innerHTML=a}function deleteSpecificPoint(){removeAllMouseEvents();addMouseEvent("click",deleteSpecificPointHandler,!0)}
function deleteSpecificPointHandler(a){for(var d=parseFloat(a.layerX),b=parseFloat(a.layerY),g=10,f=0,c=0,e=0;e<pointsPicked;e++){var h=parseFloat(xyData[e][0]),k=parseFloat(xyData[e][1]),h=Math.sqrt((h-d)*(h-d)+(k-b)*(k-b));h<g&&(f=1,c=e,g=h)}if(1===f){xyData.splice(c,1);pointsPicked-=1;pointsStatus(pointsPicked);resetLayers();for(e=0;e<pointsPicked;e++)xp=xyData[e][0],yp=xyData[e][1],dataCtx.beginPath(),dataCtx.fillStyle="rgb(200,0,0)",dataCtx.arc(xp,yp,3,0,2*Math.PI,!0),dataCtx.fill()}updateZoom(a)}
function taninverse(a,d){var b;0<a?b=Math.atan2(a,d):0>=a&&(b=Math.atan2(a,d)+2*Math.PI);b>=2*Math.PI&&(b=0);return b}var mouseEventType=[],mouseEventFunction=[],mouseEventCapture=[],mouseEvents=0;
function addMouseEvent(a,d,b){for(var g=!1,f=0;f<mouseEvents;f++)a===mouseEventType[f]&&(d===mouseEventFunction[f]&&b===mouseEventCapture[f])&&(g=!0);!1===g&&(topCanvas.addEventListener(a,d,b),mouseEventType[mouseEvents]=a,mouseEventFunction[mouseEvents]=d,mouseEventCapture[mouseEvents]=b,mouseEvents+=1)}
function removeAllMouseEvents(){if(0<mouseEvents){for(var a=0;a<mouseEvents;a++)topCanvas.removeEventListener(mouseEventType[a],mouseEventFunction[a],mouseEventCapture[a]);mouseEvents=0;mouseEventType=[];moueEventFunction=[];mouseEventCapture=[]}clearToolbar()}
function removeMouseEvent(a,d,b){for(var g=!1,f=0,c=0;c<mouseEvents;c++)a===mouseEventType[c]&&(d===mouseEventFunction[c]&&b===mouseEventCapture[c])&&(g=!0,f=c);!0===g&&(topCanvas.removeEventListener(a,d,b),mouseEvents-=1,mouseEventType.splice(f,1),mouseEventFunction.splice(f,1),mouseEventCapture.splice(f,1))}
function showPopup(a){document.getElementById("shadow").style.visibility="visible";a=document.getElementById(a);var d=parseInt(window.innerWidth),b=parseInt(window.innerHeight),g=parseInt(a.offsetWidth),f=parseInt(a.offsetHeight);a.style.left=(d-g)/2+"px";a.style.top=(b-f)/2+"px";a.style.visibility="visible"}function closePopup(a){document.getElementById("shadow").style.visibility="hidden";document.getElementById(a).style.visibility="hidden"}
function processingNote(a){document.getElementById("wait").style.visibility=!0===a?"visible":"hidden"}var sidebarList=["editImageToolbar","manualMode","autoMode"];function showSidebar(a){clearSidebar();document.getElementById(a).style.visibility="visible"}function clearSidebar(){for(ii=0;ii<sidebarList.length;ii++)document.getElementById(sidebarList[ii]).style.visibility="hidden"}var toolbarList=["paintToolbar","colorPickerToolbar"];
function showToolbar(a){clearToolbar();document.getElementById(a).style.visibility="visible"}function clearToolbar(){for(ii=0;ii<toolbarList.length;ii++)document.getElementById(toolbarList[ii]).style.visibility="hidden"}var zCanvas,zctx,tempCanvas,tctx,zoom_dx=20,zoom_dy=20,zWindowWidth=200,zWindowHeight=200,mPosn,extendedCrosshair=!1,pix=[[]];
function initZoom(){var a=document.getElementById("zoomCrossHair").getContext("2d");a.strokeStyle="rgb(0,0,0)";a.beginPath();a.moveTo(zWindowWidth/2,0);a.lineTo(zWindowWidth/2,zWindowHeight);a.moveTo(0,zWindowHeight/2);a.lineTo(zWindowWidth,zWindowHeight/2);a.stroke()}
function updateZoom(a){xpos=a.layerX;ypos=a.layerY;dx=zoom_dx;dy=zoom_dy;1!=axesPicked?mPosn.innerHTML=xpos+", "+ypos:1==axesPicked&&(pix[0][0]=parseFloat(xpos),pix[0][1]=parseFloat(ypos),a=pixelToData(pix,1,plotType),"image"===plotType?mPosn.innerHTML=a[0][0]+", "+a[0][1]:(mPosn.innerHTML=parseFloat(a[0][0]).toExponential(3)+", "+parseFloat(a[0][1]).toExponential(3),"ternary"===plotType&&(mPosn.innerHTML+=", "+parseFloat(a[0][2]).toExponential(3))));!0===extendedCrosshair&&(hoverCanvas.width=hoverCanvas.width,
hoverCtx.strokeStyle="rgba(0,0,0, 0.5)",hoverCtx.beginPath(),hoverCtx.moveTo(xpos,0),hoverCtx.lineTo(xpos,canvasHeight),hoverCtx.moveTo(0,ypos),hoverCtx.lineTo(canvasWidth,ypos),hoverCtx.stroke());if(0<=xpos-dx/2&&0<=ypos-dy/2&&xpos+dx/2<=canvasWidth&&ypos+dy/2<=canvasHeight){a=ctx.getImageData(xpos-dx/2,ypos-dy/2,dx,dy);for(var d=dataCtx.getImageData(xpos-dx/2,ypos-dy/2,dx,dy),b=0;b<d.data.length;b+=4)0!=d.data[b]+d.data[b+1]+d.data[b+2]+d.data[b+3]&&(a.data[b]=d.data[b],a.data[b+1]=d.data[b+1],
a.data[b+2]=d.data[b+2]);tctx.putImageData(a,0,0);a=tempCanvas.toDataURL();var g=new Image;g.onload=function(){zctx.drawImage(g,0,0,parseInt(zWindowWidth),parseInt(zWindowHeight))};g.src=a}}function toggleCrosshair(a){220===a.keyCode&&(a.preventDefault(),extendedCrosshair=!extendedCrosshair,hoverCanvas.width=hoverCanvas.width)}
var averagingWindowAlgo={getParamList:function(){return[["\u0394X","Px","5"],["\u0394Y","Px","5"]]},run:function(){var a=[],d=0;xyData=[];pointsPicked=0;for(var b=document.getElementById("pv0"),b=parseFloat(b.value),g=document.getElementById("pv1"),g=parseFloat(g.value),f=canvasWidth,c=canvasHeight,e=[],h=0;h<f;h++){blobs=-1;firstbloby=-2*g;for(var k=bi=0;k<c;k++)!0===binaryData[k][h]&&(k>firstbloby+g?(blobs+=1,bi=1,firstbloby=e[blobs]=k):(bi+=1,e[blobs]=parseFloat((e[blobs]*(bi-1)+k)/parseFloat(bi))));
if(0<=blobs){xi=h;for(k=0;k<=blobs;k++)yi=e[k],a[d]=[],a[d][0]=parseFloat(xi),a[d][1]=parseFloat(yi),a[d][2]=1,d+=1}}if(0===d)return 0;for(f=0;f<d;f++)if(1===a[f][2]){for(var c=1,e=f+1,h=a[f][0],k=a[f][1],l=h,r=k,m=1;1===c&&e<d;){var p=a[e][0],n=a[e][1];Math.abs(p-h)<=b&&(Math.abs(n-k)<=g&&1===a[e][2])&&(l=(l*m+p)/(m+1),r=(r*m+n)/(m+1),m+=1,a[e][2]=0);p>h+2*b&&(c=0);e+=1}a[f][2]=0;xyData[pointsPicked]=[];xyData[pointsPicked][0]=parseFloat(l);xyData[pointsPicked][1]=parseFloat(r);pointsPicked+=1}}},
averagingWindowWithStepSizeAlgo={getParamList:function(){if("XY"===plotType)return[["X_min","Units",axesAlignmentData[0].toString()],["\u0394X Step","Units","0.1"],["X_max","Units",axesAlignmentData[1].toString()],["Y_min","Units",axesAlignmentData[2].toString()],["Y_max","Units",axesAlignmentData[3].toString()],["Line width","Px","30"]];showPopup("xyAxesOnly");return[["X_min","Units","0"],["\u0394X Step","Units","0.1"],["X_max","Units","0"],["Y_min","Units","0"],["Y_max","Units","0"],["Line width",
"Px","30"]]},run:function(){if("XY"===plotType){xyData=[];pointsPicked=0;resetLayers();for(var a=canvasWidth,d=canvasHeight,b=document.getElementById("pv0"),g=document.getElementById("pv1"),f=document.getElementById("pv2"),c=document.getElementById("pv5"),e=document.getElementById("pv3"),h=document.getElementById("pv4"),b=parseFloat(b.value),g=parseFloat(g.value),f=parseFloat(f.value),c=parseFloat(c.value),e=parseFloat(e.value),h=parseFloat(h.value);b<=f;b+=g){var k,l,r,m;dataToPixel(b,e,"XY");k=
dataToPixelxy[0];r=dataToPixelxy[1];dataToPixel(b,h,"XY");l=dataToPixelxy[0];m=dataToPixelxy[1];k=Math.sqrt((m-r)*(m-r)+(l-k)*(l-k));l=(h-e)/k;r=!1;for(var p=m=0,n=!1,q=0;q<=k;q++)if(dataToPixel(b,1*-q*l+h,"XY"),xi_pix=dataToPixelxy[0],yi_pix=dataToPixelxy[1],0<=xi_pix&&(xi_pix<a&&0<=yi_pix&&yi_pix<d)&&(!0===binaryData[parseInt(yi_pix,10)][parseInt(xi_pix,10)]?!1===r&&(p=m=q,r=!0,n=!1):!1===n&&(p=q,n=!0),!0===r&&(q>=m+c||q<=k&&q>k)))r=!1,m>p&&(p=q),dataToPixel(b,1*-((m+p)/2)*l+h,"XY"),xyData[pointsPicked]=
[],xyData[pointsPicked][0]=parseFloat(dataToPixelxy[0]),xyData[pointsPicked][1]=parseFloat(dataToPixelxy[1]),pointsPicked+=1}}else showPopup("xyAxesOnly")}},blobDetectorAlgo={getParamList:function(){return[["Min size","Px","0"],["Max size","Px","1000"]]},run:function(){xyData=[];pointsPicked=0;for(var a=document.getElementById("pv0").value,d=document.getElementById("pv1").value,b=[],g=0;g<canvasHeight;g++){b[g]=[];for(var f=0;f<canvasWidth;f++)b[g][f]=!1}for(var g=0,f=[],c=[],e=[],h=[],k=[],l=0;l<
canvasHeight;l++)for(var r=0;r<canvasWidth;r++){if(!0===binaryData[l][r]&&!1===b[l][r]){b[l][r]=!0;g+=1;f[g-1]=1;h[g-1]=[];k[g-1]=[];h[g-1][0]=r;k[g-1][0]=l;c[g-1]=r;e[g-1]=l;for(var m=1,p=1;m<=p;){ai=k[g-1][m-1];bi=h[g-1][m-1];for(var n=-1;1>=n;n++)for(var q=-1;1>=q;q++)0<=ai+n&&(0<=bi+q&&ai+n<canvasHeight&&bi+q<canvasWidth)&&(!0==binaryData[ai+n][bi+q]&&!1==b[ai+n][bi+q])&&(f[g-1]+=1,p=f[g-1],k[g-1][p-1]=ai+n,h[g-1][p-1]=bi+q,e[g-1]=(e[g-1]*(p-1)+(ai+n))/p,c[g-1]=(c[g-1]*(p-1)+(bi+q))/p,b[ai+n][bi+
q]=!0);m+=1}}b[l][r]=!0}for(b=0;b<g;b++)h=2*Math.sqrt(f[b]/Math.PI),h>=a&&h<=d&&(xyData[pointsPicked]=[],xyData[pointsPicked][0]=parseFloat(c[b]),xyData[pointsPicked][1]=parseFloat(e[b]),xyData[pointsPicked][2]=f[b],pointsPicked+=1)}},xStepAlgo={getParamList:function(){return[["\u0394X","Px","5"],["Line Width","Px","15"]]},run:function(){xyData=[];pointsPicked=0;resetLayers();for(var a=document.getElementById("pv0"),a=parseFloat(a.value),d=document.getElementById("pv1"),d=parseFloat(d.value),b=canvasWidth,
g=canvasHeight,f=[],c=1,e=0;e<b;){blobs=-1;firstbloby=-2*d;for(var h=bi=0;h<g;h++)!0===binaryData[h][e]&&(c=a,h>firstbloby+d?(blobs+=1,bi=1,firstbloby=f[blobs]=h):(bi+=1,f[blobs]=parseFloat((f[blobs]*(bi-1)+h)/parseFloat(bi))));if(0<=blobs){xi=e;for(h=0;h<=blobs;h++)yi=f[h],xyData[pointsPicked]=[],xyData[pointsPicked][0]=parseFloat(xi),xyData[pointsPicked][1]=parseFloat(yi),pointsPicked+=1}e+=c}}},yStepAlgo={getParamList:function(){return[["\u0394Y","Px","5"],["Line Width","Px","15"]]},run:function(){xyData=
[];pointsPicked=0;resetLayers();for(var a=document.getElementById("pv0"),a=parseFloat(a.value),d=document.getElementById("pv1"),d=parseFloat(d.value),b=canvasWidth,g=[],f=-1,c=canvasHeight-1;0<=c;){blobs=-1;firstblobx=-2*d;for(var e=bi=0;e<b;e++)!0===binaryData[c][e]&&(f=-a,e>firstblobx+d?(blobs+=1,bi=1,firstblobx=g[blobs]=e):(bi+=1,g[blobs]=parseFloat((g[blobs]*(bi-1)+e)/parseFloat(bi))));if(0<=blobs){yi=c;for(e=0;e<=blobs;e++)xi=g[e],xyData[pointsPicked]=[],xyData[pointsPicked][0]=parseFloat(xi),
xyData[pointsPicked][1]=parseFloat(yi),pointsPicked+=1}c+=f}}};
