import React from 'react';
import './styles.scss';

import {
  makeBold,
  makeItalic,
  strikeThrough,
  underLineText,
  justifyLeft,
  justifyCenter,
  justifyRight,
  undoChange,
  redoChange,
  orderedList,
  unorderedList,
} from './utilFunctions';

import Icon from '@mdi/react';
import {
  mdiFormatBold,
  mdiFormatItalic,
  mdiFormatUnderline,
  mdiFormatAlignLeft,
  mdiFormatAlignJustify,
  mdiFormatAlignRight,
  mdiFormatStrikethroughVariant,
  mdiUndo,
  mdiRedo,
  mdiFormatListBulleted,
  mdiFormatListNumbered,
} from '@mdi/js';

function WYSIWYGEditor({ onChange, editorRef }) {
  function saveHandler() {
    //Get editor content
    let text = document.getElementById('user-eidtor').innerHTML;
    console.log(text);
  }
  return (
    <div className="main-eidtor-area">
      <div className="editor-toolbar">
        {/**Come Back here to redesing form flow experience */}
        <button className="toobar-button" onClick={makeBold}>
          <Icon path={mdiFormatBold} size={0.8} />
        </button>
        <button className="toobar-button" onClick={makeItalic}>
          <Icon path={mdiFormatItalic} size={0.8} />
        </button>
        <button className="toobar-button" onClick={underLineText}>
          <Icon path={mdiFormatUnderline} size={0.8} />
        </button>
        <button className="toobar-button" onClick={justifyLeft}>
          <Icon path={mdiFormatAlignLeft} size={0.8} />
        </button>
        <button className="toobar-button" onClick={justifyCenter}>
          <Icon path={mdiFormatAlignJustify} size={0.8} />
        </button>
        <button className="toobar-button" onClick={justifyRight}>
          <Icon path={mdiFormatAlignRight} size={0.8} />
        </button>
        <button className="toobar-button" onClick={strikeThrough}>
          <Icon path={mdiFormatStrikethroughVariant} size={0.8} />
        </button>
        <button className="toobar-button" onClick={undoChange}>
          <Icon path={mdiUndo} size={0.8} />
        </button>
        <button className="toobar-button" onClick={redoChange}>
          <i className="mdi mdi-redo"></i>
          <Icon path={mdiRedo} size={0.8} />
        </button>
        <button className="toobar-button" onClick={unorderedList}>
          <Icon path={mdiFormatListBulleted} size={0.8} />
        </button>
        <button className="toobar-button" onClick={orderedList}>
          <Icon path={mdiFormatListNumbered} size={0.8} />
        </button>
      </div>
      <div
        className="user-development-plan-eidtor"
        id="user-editor"
        contentEditable="true"
        onInput={onChange}
        ref={editorRef}
      ></div>
    </div>
  );
}

export default WYSIWYGEditor;
