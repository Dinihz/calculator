const lightTheme = "styles/style-light.css"
const darkTheme = "styles/style-dark.css"
const sunICon = "assets/sun.svg"
const moonICon = "assets/moon.svg"
const themeIcon = document.getElementById("theme-icon")
const githublightIcon = "assets/githlight.svg"
const githubDarkIcon = "assets/githubdark.svg"
const githubICon = document.getElementById("github-icon")

function changeTheme() {
    const themeLink = document.getElementById("theme");
    const currentTheme = themeLink.getAttribute("href");

    if (currentTheme === lightTheme) {
        return setDarkTheme(themeLink);
    }

    return setLightTheme(themeLink);
}

function setDarkTheme(themeLink) {
    themeLink.setAttribute("href", darkTheme);
    themeIcon.setAttribute("src", sunICon);
    githubICon.setAttribute("src", githublightIcon);
}

function setLightTheme(themeLink) {
    themeLink.setAttribute("href", lightTheme);
    themeIcon.setAttribute("src", moonICon);
    githubICon.setAttribute("src", githubDarkIcon);
}
