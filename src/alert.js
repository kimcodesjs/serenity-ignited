/* eslint-disable */

export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};
// type is either success or error
export const showAlert = (type, msg) => {
  hideAlert();
  // const markup = `<div class="alert alert--${type}">${msg}</div>`;
  const html = document.createElement('div');
  html.className = `alert alert--${type}`;
  html.innerHTML = msg;
  document.querySelector('body').insertAdjacentElement('afterbegin', html);

  window.setTimeout(hideAlert, 5000);
};
