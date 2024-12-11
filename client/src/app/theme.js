// Handle dark mode preference
(function () {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
  const storedTheme = localStorage.getItem("theme");

  // Priority: Stored Theme > System Preference
  if (storedTheme === "dark" || (!storedTheme && prefersDarkMode.matches)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
})();
