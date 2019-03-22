import React from 'react'
import WidgetService from "../services/WidgetService";

let widgetService = WidgetService.getInstance();

const LinkWidget = ({length, index, widget, deleteWidget, updateWidget, moveWidgetUp, moveWidgetDown, previewing}) =>
    <form>
        <div className="form-group row" style={{display: previewing ? 'none' : 'flex'}}>
            <label className="col-sm-8 col-form-label widget-type">Link Widget</label>
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
                                defaultValue="LINK"
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
            <label htmlFor="linkURLFld" className="col-sm-2 col-form-label">Link URL: </label>
            <div className="col-sm-10 px-0">
                <input className="form-control"
                       id="linkURLFld"
                       placeholder={widget.linkHref}
                       onChange={event => {
                           widget.linkHref = event.target.value;
                           let updatedWidget = Object.assign({}, widget);
                           updateWidget(index, updatedWidget)
                       }}/>
            </div>
        </div>
        <div className="form-group row" style={{display: previewing ? 'none' : 'flex'}}>
            <label htmlFor="linkText" className="col-sm-2 col-form-label">Link Text: </label>
            <div className="col-sm-10 px-0">
                <input className="form-control"
                       id="linkTextFld"
                       placeholder={widget.linkTitle}
                       onChange={event => {
                           widget.linkTitle = event.target.value;
                           let updatedWidget = Object.assign({}, widget);
                           updateWidget(index, updatedWidget)
                       }}/>
            </div>
        </div>
        <div className="form-group row" style={{display: previewing ? 'none' : 'flex'}}>
            <label htmlFor="linkName" className="col-sm-2 col-form-label">Link Name: </label>
            <div className="col-sm-10 px-0">
                <input className="form-control"
                       id="linkName"
                       placeholder="Link Widget"/>
            </div>
        </div>
        <div className="form-group row mb-0" style={{display: previewing ? 'none' : 'flex'}}>
            <div className="col-sm-12"><label className="widget-preview">Preview</label></div>
        </div>
        <div className="form-group row pt-3 mb-4">
            <div className="col-sm-12">
                <a href={widget.linkHref}>{widget.linkTitle}</a>
            </div>
        </div>
    </form>;

export default LinkWidget;