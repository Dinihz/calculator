const lightTheme = "styles/style-light.css"
const darkTheme = "styles/style-dark.css"
const sunICon = "assets/sun.svg"
const moonICon = "assets/moon.svg"
const themeIcon = document.getElementById("theme-icon")

function changeTheme() {
    const theme = document.getElementById("theme");
    if (theme.getAttribute("href") === lightTheme) {
        theme.setAttribute("href", darkTheme);
        themeIcon.setAttribute("src", sunICon);
    } else {
        theme.setAttribute("href", lightTheme);
        themeIcon.setAttribute("src", moonICon)
    }
}

