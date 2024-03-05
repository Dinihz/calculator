const lightTheme = "styles/style-light.css"
const darkTheme = "styles/style-dark.css"
const sunICon = "assets/sun.svg"
const moonICon = "assets/moon.svg"
const themeIcon = document.getElementById("theme-icon")
const githublightIcon = "assets/githlight.svg"
const githubdarkIcon = "assets/githubdark.svg"
const githubICon = document.getElementById("github-icon")
const previusOperation = document.querySelector("#previous")
const currentOperation = document.querySelector("current")
const buttons = document.querySelectorAll("#buttons-container button")

function changeTheme() {
    const theme = document.getElementById("theme");
    if (theme.getAttribute("href") === lightTheme) {
        theme.setAttribute("href", darkTheme);
        themeIcon.setAttribute("src", sunICon);
        githubICon.setAttribute("src", githublightIcon);

    } else {
        theme.setAttribute("href", lightTheme);
        themeIcon.setAttribute("src", moonICon);
        githubICon.setAttribute("src", githubdarkIcon);
    }
}





