import React from 'react'
import HeadingWidget from "./HeadingWidget";
import ParagraphWidget from "./ParagraphWidget";
import ListWidget from "./ListWidget";
import ImageWidget from "./ImageWidget";
import LinkWidget from "./LinkWidget";

const WidgetList = ({topicId, widgets, previewing, findWidgets, currentTopicId, createWidget, deleteWidget, updateWidget, moveWidgetUp, moveWidgetDown, saveWidgetList, togglePreviewMode}) =>
    <div onLoad={topicId !== currentTopicId && findWidgets(topicId)}>
        <div id="save-and-preview" className="mt-3 mr-1 pr-4 text-right">
            <button id="save-btn"
                    type="button"
                    className="btn btn-success"
                    onClick={() => saveWidgetList(topicId, widgets)}>Save
            </button>
            <label htmlFor="preview-btn" className="mx-3">Preview</label>
            <label id="preview-btn"
                   className="switch align-middle mt-2">
                <input type="checkbox"
                       onClick={togglePreviewMode}/>
                <span className="slider round"/>
            </label>
        </div>
        <div id="widget-list" className="mt-4 border rounded">
            {
                widgets !== null && widgets.map((widget, index) =>
                    <div className="mt-2 pl-4 pr-5 border-bottom" key={index}>
                        {widget.type === 'HEADING'
                        && <HeadingWidget
                                length={widgets.length}
                                index={index}
                                widget={widget}
                                deleteWidget={deleteWidget}
                                updateWidget={updateWidget}
                                moveWidgetUp={moveWidgetUp}
                                moveWidgetDown={moveWidgetDown}
                                previewing={previewing}/>}
                        {widget.type === 'PARAGRAPH'
                        && <ParagraphWidget
                                length={widgets.length}
                                index={index}
                                widget={widget}
                                deleteWidget={deleteWidget}
                                updateWidget={updateWidget}
                                moveWidgetUp={moveWidgetUp}
                                moveWidgetDown={moveWidgetDown}
                                previewing={previewing}/>}
                        {widget.type === 'LIST'
                        && <ListWidget
                                length={widgets.length}
                                index={index}
                                widget={widget}
                                deleteWidget={deleteWidget}
                                updateWidget={updateWidget}
                                moveWidgetUp={moveWidgetUp}
                                moveWidgetDown={moveWidgetDown}
                                previewing={previewing}/>}
                        {widget.type === 'IMAGE'
                        && <ImageWidget
                                length={widgets.length}
                                index={index}
                                widget={widget}
                                deleteWidget={deleteWidget}
                                updateWidget={updateWidget}
                                moveWidgetUp={moveWidgetUp}
                                moveWidgetDown={moveWidgetDown}
                                previewing={previewing}/>}
                        {widget.type === 'LINK'
                        && <LinkWidget
                                length={widgets.length}
                                index={index}
                                widget={widget}
                                deleteWidget={deleteWidget}
                                updateWidget={updateWidget}
                                moveWidgetUp={moveWidgetUp}
                                moveWidgetDown={moveWidgetDown}
                                previewing={previewing}/>}
                    </div>
                )
            }
        </div>
        <span id="addNewWidgetBtn"
              className="fa-stack fa-1x float-right mt-4"
              role="button">
            <i className="fas fa-square fa-stack-2x"/>
            <i className="fas fa-plus-circle fa-stack-1x fa-inverse"
               onClick={() => createWidget(topicId, {
                   id: (new Date()).getTime(),
                   type: 'HEADING',
                   size: 1,
                   headingText: "Default heading text",
                   paragraphText: "Default paragraph text",
                   style: "unordered",
                   items: "Enter one list item per line",
                   src: "Image URL",
                   title: "Link text",
                   href: "Link URL"
               })}/>
        </span>
    </div>;

export default WidgetList;
