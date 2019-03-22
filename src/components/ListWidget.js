import React from 'react'
import WidgetService from "../services/WidgetService";

let widgetService = WidgetService.getInstance();

const ListWidget = ({length, index, widget, deleteWidget, updateWidget, moveWidgetUp, moveWidgetDown, previewing}) =>
    <form>
        <div className="form-group row" style={{display: previewing ? 'none' : 'flex'}}>
            <label className="col-sm-8 col-form-label widget-type">List Widget</label>
            <div className="col-sm-4 pr-3 pt-2">
                <div className="row float-right">
                    <div>
                        <span className="fa-stack move-up"
                              hidden={index === 0}
                              onClick={() => moveWidgetUp(index)}>
                            <i className="fas fa-square fa-stack-2x"/>
                            <i className="fas fa-arrow-up fa-stack-1x fa-inverse"/>
                        </span>
                    </div>
                    <div>
                        <span className="fa-stack move-down"
                              hidden={index === length - 1}
                              onClick={() => moveWidgetDown(index)}>
                            <i className="fas fa-square fa-stack-2x"/>
                            <i className="fas fa-arrow-down fa-stack-1x fa-inverse"/>
                        </span>
                    </div>
                    <div className="ml-1">
                        <select className="custom-select"
                                defaultValue="LIST"
                                onChange={event => {
                                    let updatedWidget = widgetService.updateWidgetToType(widget.id, event.target.value);
                                    updateWidget(index, updatedWidget)
                                }}>
                            <option value="HEADING">Heading</option>
                            <option value="PARAGRAPH">Paragraph</option>
                            <option value="LIST">List</option>
                            <option value="IMAGE">Image</option>
                            <option value="LINK">Link</option>
                        </select>
                    </div>
                    <div className="ml-1">
                        <span className="fas fa-minus-square fa-2x"
                              role="button"
                              onClick={() => deleteWidget(index)}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="form-group row" style={{display: previewing ? 'none' : 'flex'}}>
            <label htmlFor="listTextFld" className="col-sm-2 col-form-label">List Text: </label>
            <div className="col-sm-10 px-0">
                <textarea className="form-control"
                          id="listTextFld"
                          defaultValue={widget.listItems}
                          rows={ widget.listItems.split("\n").length}
                          onChange={event => {
                              widget.listItems = event.target.value;
                              let updatedWidget = Object.assign({}, widget);
                              updateWidget(index, updatedWidget)
                          }}/>
            </div>
        </div>
        <div className="form-group row" style={{display: previewing ? 'none' : 'flex'}}>
            <label htmlFor="listType" className="col-sm-2 col-form-label">List Type: </label>
            <div className="col-sm-10 px-0">
                <select className="custom-select list-style"
                        id="listStyle"
                        defaultValue={widget.listStyle}
                        onChange={event => {
                            widget.listStyle = event.target.value;
                            let updatedWidget = Object.assign({}, widget);
                            updateWidget(index, updatedWidget)
                        }}>
                    <option value="unordered">Unordered list</option>
                    <option value="ordered">Ordered list</option>
                </select>
            </div>
        </div>
        <div className="form-group row mb-0" style={{display: previewing ? 'none' : 'flex'}}>
            <label htmlFor="listName" className="col-sm-2 col-form-label">List Name: </label>
            <div className="col-sm-10 px-0">
                <input className="form-control"
                       id="listName"
                       placeholder="List Widget"/>
            </div>
        </div>
        <div className="form-group row pt-3" style={{display: previewing ? 'none' : 'flex'}}>
            <div className="col-sm-12"><label className="widget-preview">Preview</label></div>
        </div>
        <div className="form-group row mb-4">
            <div className="col-sm-12">
                {
                    widget.listStyle === "unordered" ?
                        <ul>
                            {
                                widget.listItems.split("\n").map((item, index) =>
                                    <li key={index}>{item}</li>
                                )
                            }
                        </ul>
                        :
                        <ol>
                            {
                                widget.listItems.split("\n").map((item, index) =>
                                    <li key={index}>{item}</li>
                                )
                            }
                        </ol>
                }
            </div>
        </div>
    </form>;

export default ListWidget;