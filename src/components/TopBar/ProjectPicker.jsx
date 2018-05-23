import isEmpty from 'lodash-es/isEmpty';
import reduce from 'lodash-es/reduce';
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
    const items = reduce(projects, (projectItems, project) => {
      if (!archivedViewOpen && !project.archived) {
        projectItems.push(
          <MenuItem
            isActive={project.projectKey === currentProjectKey}
            key={project.projectKey}
            onClick={partial(onChangeCurrentProject, project.projectKey)}
          >
            <ProjectPreview projectKey={project.projectKey} />
          </MenuItem>,
        );
      } else if (archivedViewOpen) {
        projectItems.push(
          <MenuItem
            isActive={project.projectKey === currentProjectKey}
            key={project.projectKey}
            onClick={partial(onChangeCurrentProject, project.projectKey)}
          >
            <ProjectPreview projectKey={project.projectKey} />
          </MenuItem>,
        );
      }
      return projectItems;
    }, []);

    items.push(
      <MenuItem
        isSticky
        key="archivedProjectButton"
        onClick={onToggleViewArchived}
      >

        {archivedViewOpen ?
          <div>
            Hide Archived Projects
            <span className="u__icon"> &#xf077; </span>
          </div> :
          <div>
            View Archived Projects
            <span className="u__icon"> &#xf078; </span>
          </div>
        }
      </MenuItem>,
    );

    return items;
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
