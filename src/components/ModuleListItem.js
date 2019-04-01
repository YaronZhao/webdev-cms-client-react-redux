import React from 'react'

const  ModuleListItem = ({index, modules, module, userId, courseId, moduleId,
                          selected, selectModule, updateModule, deleteModule}) =>
    <span
        className={selected? "nav-item py-1 pl-3 mb-3 rounded left-nav-span active-module" :
                             "nav-item py-1 pl-3 mb-3 rounded left-nav-span"}
        onClick={() => selectModule(modules, module)}>
        <input id={"module-" + index}
               className="btn border-0 float-left module-title"
               contentEditable="true"
               placeholder={(module.title === "") ? "New Module" : module.title}
               type="text"/>
        <span>
            <i className="fas fa-minus-circle mx-2 mt-2 module-delete float-right"
               role="button"
               onClick={() => deleteModule(userId, courseId, moduleId)}/>
        </span>
        <span>
            <i className="fas fa-save ml-2 mt-2 module-save float-right"
               role="button"
               onClick={() => {
                   let inputId = "module-" + index;
                   let newTitle = document.getElementById(inputId).value;
                   document.getElementById(inputId).blur();
                   updateModule(userId, courseId, moduleId, {
                       "title": newTitle
                   })
               }}/>
        </span>
        <span>
            <i className="fas fa-pencil-alt ml-2 mt-2 module-edit float-right"
               role="button"
               onClick={() => {
                   let inputId = "module-" + index;
                   document.getElementById(inputId).focus()
               }}/>
        </span>
    </span>;

export default ModuleListItem;
