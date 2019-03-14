import React from 'react'

const HeadingWidget = ({length, index, widget, deleteWidget, updateWidget, moveWidgetUp, moveWidgetDown, previewing}) =>
    <form>
        <div className="form-group row" style={{display: previewing ? 'none' : 'flex'}}>
            <label className="col-sm-8 col-form-label widget-type">Heading Widget</label>
            <div className="col-sm-4 pr-3 pt-2">
                <div className="row float-right">
                    <div>
                        <span className="fa-stack move-up"
                              hidden={index === 0}
                              onClick={() => moveWidgetUp(widget.id, index)}>
                            <i className="fas fa-square fa-stack-2x"/>
                            <i className="fas fa-arrow-up fa-stack-1x fa-inverse"/>
                        </span>
                    </div>
                    <div>
                        <span className="fa-stack move-down"
                              hidden={index === length - 1}
                              onClick={() => moveWidgetDown(widget.id, index)}>
                            <i className="fas fa-square fa-stack-2x"/>
                            <i className="fas fa-arrow-down fa-stack-1x fa-inverse"/>
                        </span>
                    </div>
                    <div className="ml-1">
                        <select className="custom-select"
                                defaultValue="HEADING"
                                onChange={event => {
                                    widget.type = event.target.value;
                                    let updatedWidget = Object.assign({}, widget);
                                    updateWidget(widget.id, updatedWidget)
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
                              onClick={() => deleteWidget(widget.id)}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="form-group row" style={{display: previewing ? 'none' : 'flex'}}>
            <label htmlFor="headingTextFld" className="col-sm-2 col-form-label">Heading Text: </label>
            <div className="col-sm-10 px-0">
                <input className="form-control"
                       id="headingTextFld"
                       placeholder={widget.headingText === "" ? "Heading text" : widget.headingText}
                       onChange={event => {
                           widget.text = event.target.value;
                           let updatedWidget = Object.assign({}, widget);
                           updateWidget(widget.widgetId, updatedWidget)
                       }}/>
            </div>
        </div>
        <div className="form-group row" style={{display: previewing ? 'none' : 'flex'}}>
            <label htmlFor="headingSize" className="col-sm-2 col-form-label">Heading Size: </label>
            <div className="col-sm-10 px-0">
                <select className="custom-select heading-size"
                        defaultValue={widget.size}
                        onChange={event => {
                            widget.size = parseInt(event.target.value);
                            let updatedWidget = Object.assign({}, widget);
                            updateWidget(widget.widgetId, updatedWidget)
                        }}>
                    <option value="Choose size">Choose size</option>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>
            </div>
        </div>
        <div className="form-group row" style={{display: previewing ? 'none' : 'flex'}}>
            <label htmlFor="headingName" className="col-sm-2 col-form-label">Heading Name: </label>
            <div className="col-sm-10 px-0">
                <input className="form-control"
                       id="headingName"
                       placeholder="Heading Widget"/>
            </div>
        </div>
        <div className="form-group row mb-0" style={{display: previewing ? 'none' : 'flex'}}>
            <div className="col-sm-12"><label className="widget-preview">Preview</label></div>
        </div>
        <div className="form-group row pt-3 mb-4">
            <div className="col-sm-12">
                {widget.size === 1 && <h1>{widget.headingText}</h1>}
                {widget.size === 2 && <h2>{widget.headingText}</h2>}
                {widget.size === 3 && <h3>{widget.headingText}</h3>}
            </div>
        </div>
    </form>;

export default HeadingWidget;