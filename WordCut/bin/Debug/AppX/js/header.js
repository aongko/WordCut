function speedTest() {
    "use strict";
    WinJS.Navigation.navigate("/content/speedTest.html");
    var pageName = document.getElementById("pageName");
    pageName.innerHTML = "Speed Test";
}

function speedRead() {
    "use strict";
    WinJS.Navigation.navigate("/content/speedRead.html");
    var pageName = document.getElementById("pageName");
    pageName.innerHTML = "Speed Read";
}