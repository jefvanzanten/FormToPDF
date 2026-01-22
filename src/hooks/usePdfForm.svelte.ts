export function createPdfForm<T extends Record<string, unknown>>(initialData: T) {
  let data = $state(initialData);
  let loading = $state(false);
  let error = $state("");
  let previewEl: HTMLElement | undefined = $state();

  function extractStyles(): string {
    const styles: string[] = [];

    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          styles.push(rule.cssText);
        }
      } catch (e) {
        // Skip cross-origin stylesheets
      }
    }

    return styles.join("\n");
  }

  async function generatePdf(filename: string) {
    if (!previewEl) return;

    loading = true;
    error = "";

    try {
      const htmlContent = previewEl.innerHTML;
      const css = extractStyles();

      const response = await fetch("http://localhost:8000/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          html_content: htmlContent,
          css: css,
          filename,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "PDF generation failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      error = e instanceof Error ? e.message : "An error occurred";
    } finally {
      loading = false;
    }
  }

  return {
    get data() { return data; },
    set data(value: T) { data = value; },
    get loading() { return loading; },
    get error() { return error; },
    get previewEl() { return previewEl; },
    set previewEl(el: HTMLElement | undefined) { previewEl = el; },
    generatePdf,
  };
}
