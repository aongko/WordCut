function speedHelp() {
    "use strict";
    clearReadProgress();
    WinJS.Navigation.navigate("/content/speedHelp.html");
    var pageName = document.getElementById("pageName");
    pageName.innerHTML = "(?)";
}

function speedRead() {
    "use strict";
    clearReadProgress();
    WinJS.Navigation.navigate("/content/speedRead.html");
    var pageName = document.getElementById("pageName");
    pageName.innerHTML = "Speed Read";
}

function clearReadProgress()
{
    if (pageName.innerText == "Read Leisurely")
    {
        END();
    }
}