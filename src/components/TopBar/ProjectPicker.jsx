import isEmpty from 'lodash-es/isEmpty';
import reduce from 'lodash-es/reduce';
import concat from 'lodash-es/concat';
import partial from 'lodash-es/partial';
import PropTypes from 'prop-types';
import React from 'react';
import ProjectPreview from '../../containers/ProjectPreview';
import ProjectPickerButton from './ProjectPickerButton';
import createMenu, {MenuItem} from './createMenu';

const ProjectPicker = createMenu({
  menuClass: 'top-bar__menu_right top-bar__menu_project-picker',
  name: 'projectPicker',

  isVisible({
    currentProjectKey,
    isUserAuthenticated,
    projectKeys,
  }) {
    return Boolean(currentProjectKey) &&
      !isEmpty(projectKeys) &&
      isUserAuthenticated;
  },

  renderItems({
    archivedViewOpen,
    currentProjectKey,
    projects,
    onChangeCurrentProject,
    onToggleViewArchived,
  }) {
    const activeItems = reduce(projects, (activeProjects, project) => {
      if (!project.archived) {
        activeProjects.push(
          <MenuItem
            isActive={project.projectKey === currentProjectKey}
            key={project.projectKey}
            onClick={partial(onChangeCurrentProject, project.projectKey)}
          >
            <ProjectPreview projectKey={project.projectKey} />
          </MenuItem>,
        );
      }
      return activeProjects;
    }, []);

    const viewButton = (
      <MenuItem
        key="archivedProjectButton"
        onClick={onToggleViewArchived}
      >
        View Archived Projects
        {archivedViewOpen ?
          <span className="u__icon"> &#xf077; </span> :
          <span className="u__icon"> &#xf078; </span>
        }
      </MenuItem>
    );
    let archivedItems;
    if (archivedViewOpen) {
      archivedItems = reduce(projects, (archivedProjects, project) => {
        if (project.archived) {
          archivedProjects.push(
            <MenuItem
              isActive={project.projectKey === currentProjectKey}
              key={project.projectKey}
              onClick={partial(onChangeCurrentProject, project.projectKey)}
            >
              <ProjectPreview projectKey={project.projectKey} />
            </MenuItem>,
          );
        }
        return archivedProjects;
      }, []);
    } else {
      archivedItems = null;
    }
    return concat(activeItems, viewButton, archivedItems);
  },
})(ProjectPickerButton);

ProjectPicker.propTypes = {
  archivedViewOpen: PropTypes.bool.isRequired,
  currentProjectKey: PropTypes.string,
  projects: PropTypes.array.isRequired,
  onToggleViewArchived: PropTypes.func.isRequired,
};

ProjectPicker.defaultProps = {
  currentProjectKey: null,
};

export default ProjectPicker;
