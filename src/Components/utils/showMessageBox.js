async function showMessageBox({
  type = "info",
  title,
  message,
  detail = "",
  buttons,
  defaultId,
  cancelId,
} = {}) {
  if (!window.api?.showMessageBox) {   // 👈 matches preload now
    console.error("Electron API not available");
    return { response: -1, checkboxChecked: false };
  }
  const defaults = {
    info:    { title: "Information", buttons: ["OK"],     defaultId: 0, cancelId: 0 },
    warning: { title: "Warning",     buttons: ["Yes","No"], defaultId: 1, cancelId: 1 },
    error:   { title: "Error",       buttons: ["OK"],     defaultId: 0, cancelId: 0 },
    question:{ title: "Confirm",     buttons: ["Yes","No"], defaultId: 0, cancelId: 1 },
  };

  const config = {
    type,
    title: title ?? defaults[type]?.title,
    message,
    detail,
    buttons: buttons ?? defaults[type]?.buttons,
    defaultId: defaultId ?? defaults[type]?.defaultId,
    cancelId: cancelId ?? defaults[type]?.cancelId,
  };
  return await window.api.showMessageBox(config);
}

export default showMessageBox;
