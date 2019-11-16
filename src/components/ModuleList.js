import React, {Component} from 'react'
import ModuleListItem from "./ModuleListItem";

class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newModuleTitle: "",
        }
    }

    updateForm = event => {
        this.setState({
            newModuleTitle: event.target.value
        });
        console.log(this.state.newModuleTitle)
    };

    render() {
        return (
            <div id="left-nav" className="col-3 show px-0">
                <nav className="nav flex-column nav-pills py-md-4 px-md-4">
                    {
                        this.props.modules.map((module, index) => (
                            <ModuleListItem
                                key={index}
                                index={index}
                                modules={this.props.modules}
                                module={module}
                                userId={this.props.userId}
                                courseId={this.props.courseId}
                                moduleId={module.id}
                                selected={this.props.selectedModule === module}
                                selectModule={this.props.selectModule}
                                updateModule={this.props.updateModule}
                                deleteModule={this.props.deleteModule}/>
                        ))
                    }
                    <span className="nav-item py-1 pl-1 mb-3 rounded left-nav-span w-100"
                          id="add-new-module-span">
                        <input id="newModuleName"
                               className="w-75"
                               type="text"
                               onChange={this.updateForm}/>
						<button type="button"
                                id="addNewModuleBtn"
                                className="fas fa-plus fa-2x border-0"
                                onClick={() =>
                                    this.props.createModule(
                                        this.props.userId,
                                        this.props.courseId,
                                        {
                                            title: (this.state.newModuleTitle === "") ?
                                                "New Module" : this.state.newModuleTitle,
                                            lessons: []
                                        })}/>
                    </span>
                </nav>
            </div>
        )
    }
}

export default ModuleList;
