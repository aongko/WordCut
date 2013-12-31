//// THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
//// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//// PARTICULAR PURPOSE.
////
//// Copyright (c) Microsoft Corporation. All rights reserved
function availableLength() {
    const limit = 25000;
    var char = input.innerText.length;
    
    var rem = limit - char;
    charLeft.innerHTML = rem;
    if (char >= 25000) {
        charLeft.style.color = "#ff7777";
    }
    else
        charLeft.style.color = "white";
    //if (char > limit) {
    //add code to either remove extra chars or highlight them.
    //}

}

(function () {
    "use strict";
    var pageName = document.getElementById("pageName");

    var page = WinJS.UI.Pages.define("/content/speedRead.html", {
        ready: function (element, options) {
            if (pageName.innerHTML != "Speed Read") {
                contentArea.style.opacity = "0";
                runEnterContentAnimation();
            }
            process.addEventListener("click", processRead, false);
            input.addEventListener("change", availableLength, false);
        }
    });


    function processRead() {
        WordCut.input = input.innerText;
        WinJS.Navigation.navigate("/content/read.html");
        var pageName = document.getElementById("pageName");
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
    }
})();
