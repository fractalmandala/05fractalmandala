const COPY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;

const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

export function enhanceCodeBlocks(container: HTMLElement) {
  // Unwrap any previously wrapped blocks before re-enhancing (handles navigation)
  container.querySelectorAll('.code-block-wrapper').forEach((wrapper) => {
    const pre = wrapper.querySelector('pre');
    if (pre) wrapper.parentNode?.insertBefore(pre, wrapper);
    wrapper.remove();
  });

  container.querySelectorAll('pre').forEach((pre) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    pre.parentNode?.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement('button');
    btn.className = 'code-copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = COPY_ICON;
    wrapper.appendChild(btn);

    btn.addEventListener('click', async () => {
      const text = pre.querySelector('code')?.innerText ?? pre.innerText;
      try {
        await navigator.clipboard.writeText(text);
        btn.innerHTML = CHECK_ICON + '<span class="copied-label">Copied!</span>';
        btn.classList.add('is-copied');
        setTimeout(() => {
          btn.innerHTML = COPY_ICON;
          btn.classList.remove('is-copied');
        }, 2000);
      } catch {
        // Clipboard API unavailable (e.g. non-HTTPS) — fail silently
      }
    });
  });
}
