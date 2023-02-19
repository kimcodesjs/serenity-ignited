/* eslint-disable */

export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};
// type is either success or error
export const showAlert = (msg) => {
  hideAlert();
  const html = document.createElement('div');
  html.className = `alert`;
  html.innerHTML = msg;
  document.querySelector('body').insertAdjacentElement('afterbegin', html);

  window.setTimeout(hideAlert, 5000);
};
