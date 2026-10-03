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
