/* ==========================================================
   深浅色主题切换
   - 本脚本在 <head> 中同步加载：先于首屏渲染应用主题，避免闪烁
   - 用户选择保存在 localStorage，下次访问自动恢复
   - 主题状态写在 <html> 的 data-theme 属性上（深色为 data-theme="dark"，浅色不设该属性）
   ========================================================== */

(function () {
  "use strict";

  const STORAGE_KEY = "portfolio-theme";
  const root = document.documentElement;

  /* 读取上次选择；没有记录或值不合法时返回 null */
  function readSaved() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return v === "dark" || v === "light" ? v : null;
    } catch (e) {
      return null;   // 隐私模式等场景下 localStorage 不可用
    }
  }

  function save(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) { /* 存不上也不影响本次切换 */ }
  }

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  /* 应用主题，并同步按钮的无障碍描述 */
  function apply(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }

    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.setAttribute("aria-label", theme === "dark" ? "切换到浅色主题" : "切换到深色主题");
    }
  }

  /* 立即恢复上次选择（默认浅色） */
  apply(readSaved() || "light");

  /* 脚本在 <head> 中执行时按钮还未解析，DOM 就绪后再绑定点击 */
  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;

    apply(currentTheme());   // 首屏未设 data-theme 时补齐按钮描述

    btn.addEventListener("click", function () {
      const next = currentTheme() === "dark" ? "light" : "dark";
      apply(next);
      save(next);
    });
  });
})();