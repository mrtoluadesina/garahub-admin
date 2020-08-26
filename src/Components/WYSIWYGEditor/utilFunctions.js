export function makeBold(e) {
  e.preventDefault();
  return document.execCommand('bold', false, '');
}

export function makeItalic(e) {
  e.preventDefault();
  return document.execCommand('italic', false, '');
}

export function strikeThrough(e) {
  e.preventDefault();
  return document.execCommand('strikeThrough', false, '');
}

export function underLineText(e) {
  e.preventDefault();
  return document.execCommand('underline', false, '');
}

export function justifyRight(e) {
  e.preventDefault();
  return document.execCommand('justifyRight', false, '');
}

export function justifyLeft(e) {
  e.preventDefault();
  return document.execCommand('justifyLeft', false, '');
}

export function justifyCenter(e) {
  e.preventDefault();
  return document.execCommand('justifyCenter', false, '');
}

export function undoChange(e) {
  e.preventDefault();
  return document.execCommand('undo', false, '');
}

export function redoChange(e) {
  e.preventDefault();
  return document.execCommand('redo', false, '');
}

export function unorderedList(e) {
  e.preventDefault();
  return document.execCommand('insertUnorderedList', false, '');
}

export function orderedList(e) {
  e.preventDefault();
  return document.execCommand('insertOrderedList', false, '');
}
