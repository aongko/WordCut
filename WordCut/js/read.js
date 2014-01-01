//// THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
//// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//// PARTICULAR PURPOSE.
////
//// Copyright (c) Microsoft Corporation. All rights reserved

//Global so we can access it anywhere

(function () {
    "use strict";
    var pageName = document.getElementById("pageName");
    var intervalID = null;
    var splittedString = null;
    var index = 0;

    var page = WinJS.UI.Pages.define("/content/read.html", {
        ready: function (element, options) {
            if (pageName.innerHTML != "Read Leisurely") {
                contentArea.style.opacity = "0";
                runEnterContentAnimation(); //ANIMATION FUNCTION called
            }
            initRead(); //first function called
        }
    });

    //ANIMATION
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

    //When finish read
    function END()
    {
        WordCut.speed = 100;
        readController.innerHTML = "Back";
        clearInterval(intervalID);
    }

    //this is first function
    function initRead() {
        lblRead.innerHTML = "Processing...";
        WordCut.input = "Ready Ready Ready 3 3 3 2 2 2 1 1 1 "+ WordCut.input.replace(/(\r\n|\n|\r)/gm, " ") + " Finish";
        splittedString = WordCut.input.split(" ");
        readController.addEventListener("click", readFuncCont, false);
        
        index = 0;
        intervalID = setInterval(function () {
            lblRead.innerHTML = splittedString[index++];
            if (index === splittedString.length) {
                END();
            }
        }, WordCut.speed);
    }

    //onclick function
    function readFuncCont() {
        if (readController.innerHTML == "Back") {
            WinJS.Navigation.navigate("/content/speedRead.html");
            var pageName = document.getElementById("pageName");
            pageName.innerHTML = "Speed Read";
            return;
        }
        if (readController.innerHTML == "Resume") {
            intervalID = setInterval(function () {
                lblRead.innerHTML = splittedString[index++];
                if (index === splittedString.length) {
                    END();
                }
            }, WordCut.speed);
            readController.innerHTML = "Pause";
            return;
        }
        if (readController.innerHTML == "Pause") {
            clearInterval(intervalID);
            readController.innerHTML = "Resume";
            return;
        }
    }

})();
