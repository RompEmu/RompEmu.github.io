const platform = navigator.userAgentData?.platform || navigator.platform || "";
const os = /mac/i.test(platform) ? "Mac" : /win/i.test(platform) ? "Windows" : /linux/i.test(platform) ? "Linux" : null;

if (os) {
  for (const a of document.querySelectorAll("[data-os-label]")) a.textContent = `Download for ${os}`;
}

fetch("https://api.github.com/repos/RompEmu/RomP/releases/latest")
  .then(r => r.ok ? r.json() : null)
  .then(release => {
    if (!release) return;
    const tag = document.querySelector("[data-tag]");
    tag.textContent = release.tag_name;
    tag.hidden = false;
    for (const p of document.querySelectorAll("[data-version]")) {
      p.textContent = `Version ${release.tag_name.replace(/^v/, "")} for macOS, Windows and Linux`;
    }
  })
  .catch(() => {});

for (const switcher of document.querySelectorAll(".switcher")) {
  const buttons = switcher.querySelectorAll("button[data-look]");
  for (const button of buttons) {
    button.addEventListener("click", () => {
      for (const b of buttons) b.setAttribute("aria-pressed", String(b === button));
      for (const img of switcher.querySelectorAll("img[data-look]")) {
        img.classList.toggle("is-on", img.dataset.look === button.dataset.look);
      }
    });
  }
}
