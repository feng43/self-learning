var flag = true;
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 640) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

    // if (flag) {
    //     // alert(0)
    //     loadCss("../../PublicCss/reset.css");
    //     loadScript("../../PublicJS/layer_mobile/layer.js");
    //     loadCss("../../PublicJS/layer_mobile/need/layer.css");

    // };
})(document, window);

// function loadCss(url) {
//     var link = document.createElement("link");
//     link.type = "text/css";
//     link.rel = "stylesheet";
//     link.href = url;
//     document.getElementsByTagName("head")[0].appendChild(link);
// };

// function loadScript(url) {
//     var script = document.createElement("script");
//     script.type = "type/javascript";
//     script.src = url;
//     document.getElementsByTagName("head")[0].appendChild(script);
// };
