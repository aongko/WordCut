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
    var applicationData = Windows.Storage.ApplicationData.current;
    var localFolder = applicationData.localFolder;
    var localSettings = applicationData.localSettings;

    var page = WinJS.UI.Pages.define("/content/speedRead.html", {
        ready: function (element, options) {
            if (pageName.innerHTML != "Speed Read") {
                contentArea.style.opacity = "0";
                runEnterContentAnimation();
            }
            readLocalFile();
            process.addEventListener("click", processRead, false);
            input.addEventListener("change", OnchangedInput, false);

            // Simple setting

            var value = localSettings.values["localSpeedSettings"];

            if (!value) {
                // No data
                speed.value = WordCut.speed;
            }
            else {
                // Access data in value
                speed.value = value;
            }
        }
    });

    function OnchangedInput() {
        availableLength();
        writeCurrentFile();
    }

    function writeCurrentFile() {
        var input = document.getElementById("input").innerText;

        localFolder.createFileAsync("CurrentFile.txt", Windows.Storage.CreationCollisionOption.replaceExisting)
           .then(function (localFile) {
               return Windows.Storage.FileIO.writeTextAsync(localFile, input);
           }).done(function () {
           });
    }

    function readLocalFile() {
        localFolder.getFileAsync("CurrentFile.txt")
           .then(function (localFile) {
               return Windows.Storage.FileIO.readTextAsync(localFile);
           }).done(function (savedLocalFile) {
               // Data is contained in savedLocalFile
               document.getElementById("input").innerText = savedLocalFile;
           }, function () {
               // savedLocalFile not found
           });
    }

    function processRead() {
        var msg = null;
        if (speed.value <= 0) {
            msg = new Windows.UI.Popups.MessageDialog(
            "Speed must be filled with positive integer");
        }
        else if(input.innerText.length <= 0) {
            msg = new Windows.UI.Popups.MessageDialog(
            "There is no text for read");
        }

        if (msg == null)
        {
            localSettings.values["localSpeedSettings"] = speed.value;
            WordCut.input = input.innerText;
            WordCut.speed = 60000 / speed.value;
            WinJS.Navigation.navigate("/content/read.html");
            var pageName = document.getElementById("pageName");
        }
        else{
        msg.defaultCommandIndex = 0;
        msg.cancelCommandIndex = 1;
        msg.showAsync();
    }
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
