//// THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
//// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//// PARTICULAR PURPOSE.
////
//// Copyright (c) Microsoft Corporation. All rights reserved

(function () {
    "use strict";
    var pageName = document.getElementById("pageName");

    var page = WinJS.UI.Pages.define("/content/read.html", {
        ready: function (element, options) {
            if (pageName.innerHTML != "Read Leisurely") {
                contentArea.style.opacity = "0";
                runEnterContentAnimation();
            }
            read();
        }
    });

    function read() {
        lblRead.innerHTML = WordCut.input;
    }

    function runEnterContentAnimation() {

        content.style.overflow = "hidden";

        // Run the enterContent animation
        // The animation will cause opacity to transition to 1
        // Use the recommended offset by leaving the offset argument empty to get the best performance
        WinJS.UI.Animation.enterContent(contentArea, null).done(
            function () {
                content.style.overflow = "auto";
            });
        pageName.innerHTML = "Read Leisurely";
    }
})();
