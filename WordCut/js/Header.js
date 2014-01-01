function speedHelp() {
    "use strict";
    WinJS.Navigation.navigate("/content/speedHelp.html");
    var pageName = document.getElementById("pageName");
    pageName.innerHTML = "(?)";
}

function speedRead() {
    "use strict";
    WinJS.Navigation.navigate("/content/speedRead.html");
    var pageName = document.getElementById("pageName");
    pageName.innerHTML = "Speed Read";
}