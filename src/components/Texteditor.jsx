import React, { useState, useRef, useEffect } from 'react';

import UnderlineIcon from '../assets/icons/texteditor/Icon_Underline';
import Icon_Bold from "../assets/icons/texteditor/Icon_Bold"
import Icon_Italic from '../assets/icons/texteditor/Icon_Italic';
import Icon_Align_Left from '../assets/icons/texteditor/Icon_Align_Left';
import Icon_Align_Center from '../assets/icons/texteditor/Icon_Align_Center';
import Icon_Align_Right from '../assets/icons/texteditor/Icon_Align_Right';
import Icon_Unordered_List from '../assets/icons/texteditor/Icon_Unordered_List';
import Icon_Ordered_List from '../assets/icons/texteditor/Icon_Ordered_List';
import Icon_Strike_Through from '../assets/icons/texteditor/Icon_strike_Through';
import Icon_Link from '../assets/icons/texteditor/Icon_Link';
import Icon_Unlink from '../assets/icons/texteditor/Icon_Unlink';
import Icon_Undo from '../assets/icons/texteditor/Icon_Undo';
import Icon_Redo from '../assets/icons/texteditor/Icon_Redo';

export default function TextEditor({ refTest }) {

    const [active, setActive] = useState(false);
    const filenameRef = useRef(null);
    const contentRef = useRef(null);

    const formatDoc = (cmd, value = null) => {
        if (document && document.execCommand) {
            document.execCommand(cmd, false, value);
        }
    };

    const addLink = () => {
        const url = prompt('Insert URL');
        if (url) formatDoc('createLink', url);
    };

    const toggleCodeView = () => {
        const content = refTest.current;
        setActive(!active);
        if (!active) {
            content.textContent = content.innerHTML;
            content.setAttribute('contenteditable', false);
        } else {
            content.innerHTML = content.textContent;
            content.setAttribute('contenteditable', true);
        }
    };

    useEffect(() => {
        const content = refTest.current;

        const handleMouseEnter = () => {
            const links = content.querySelectorAll('a');
            links.forEach((item) => {
                item.addEventListener('mouseenter', () => {
                    content.setAttribute('contenteditable', false);
                    item.target = '_blank';
                });
                item.addEventListener('mouseleave', () => {
                    content.setAttribute('contenteditable', true);
                });
            });
        };

        content.addEventListener('mouseenter', handleMouseEnter);
        return () => {
            content.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    const buttonClasses = 'bg-white border-2 border-[#ddd] rounded-md cursor-pointer w-10 h-10 flex items-center justify-center hover:bg-[#eee]';

    return (
        <div className="max-w-[800px] w-[800px] bg-white rounded-md overflow-hidden">

            <div className="p-4 bg-[#eee]">
                <div className="flex flex-wrap items-center gap-3">
                    <button className={buttonClasses} onClick={() => formatDoc('undo')}><Icon_Undo /></button>
                    <button className={buttonClasses} onClick={() => formatDoc('redo')}><Icon_Redo /></button>
                    <button className={buttonClasses} onClick={() => formatDoc('bold')}><Icon_Bold /></button>
                    <button className={buttonClasses} onClick={() => formatDoc('underline')}><UnderlineIcon /></button>
                    <button className={buttonClasses} onClick={() => formatDoc('italic')}><Icon_Italic /></button>
                    <button className={buttonClasses} onClick={() => formatDoc('strikeThrough')}><Icon_Strike_Through /></button>
                    <button className={buttonClasses} onClick={() => formatDoc('insertUnorderedList')}><Icon_Unordered_List /></button>
                    <button className={buttonClasses} onClick={() => formatDoc('insertOrderedList')}><Icon_Ordered_List /></button>
                    <button className={buttonClasses} onClick={addLink}><Icon_Link /></button>
                    <button className={buttonClasses} onClick={() => formatDoc('unlink')}><Icon_Unlink /></button>
                    <button className={buttonClasses} onClick={toggleCodeView} data-active={active}>
                        &lt;/&gt;
                    </button>
                </div>
            </div>


            <div id="content" className='p-4 outline-none h-96 overflow-auto' ref={refTest} contentEditable={!active} spellCheck="false">
                Beschreibung Einfügen
            </div>
        </div>
    );
}
