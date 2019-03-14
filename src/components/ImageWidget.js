import React from 'react'

const ImageWidget = ({length, index, widget, deleteWidget, updateWidget, moveWidgetUp, moveWidgetDown, previewing}) =>
    <form>
        <div className="form-group row" style={{display: previewing ? 'none' : 'flex'}}>
            <label className="col-sm-8 col-form-label widget-type">Image Widget</label>
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
                                defaultValue="IMAGE"
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
            <label htmlFor="imageURLFld" className="col-sm-2 col-form-label">Image URL: </label>
            <div className="col-sm-10 px-0">
                <input className="form-control"
                       id="imageURLFld"
                       placeholder={widget.src}
                       onChange={event => {
                           widget.src = event.target.value;
                           let updatedWidget = Object.assign({}, widget);
                           updateWidget(widget.id, updatedWidget)
                       }}/>
            </div>
        </div>
        <div className="form-group row" style={{display: previewing ? 'none' : 'flex'}}>
            <label htmlFor="imageName" className="col-sm-2 col-form-label">Image Name: </label>
            <div className="col-sm-10 px-0">
                <input className="form-control"
                       id="imageName"
                       placeholder="Image Widget"/>
            </div>
        </div>
        <div className="form-group row mb-0" style={{display: previewing ? 'none' : 'flex'}}>
            <div className="col-sm-12"><label className="widget-preview">Preview</label></div>
        </div>
        <div className="form-group row pt-3 mb-4">
            <div className="col-sm-12">
                <img src={widget.src}
                     className="img-thumbnail"
                     alt="Loading..."/>
            </div>
        </div>
    </form>;

export default ImageWidget;