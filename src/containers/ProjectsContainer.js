// ProjectsContainer.js

import { connect } from 'react-redux'
import { setSelectedProject } from '../actions/actions'
import Projects from '../components/Projects'

const mapStateToProps = (state) => {
    return ({
        projects: state.projects
    });
}

const mapDispatchToProps = (dispatch) => {
    return { setSelectedProject: (selectedProject) => { dispatch(setSelectedProject(selectedProject)); } };
}

const ProjectsContainer = connect(mapStateToProps, mapDispatchToProps)(Projects);

export default ProjectsContainer
