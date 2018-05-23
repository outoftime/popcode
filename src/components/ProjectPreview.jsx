import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const MAX_LENGTH = 50;

export default function ProjectPreview({
  preview,
  project,
  onProjectArchived,
  onProjectUnArchived,
}) {
  return (
    <div>
      <div className="project-preview">
        <div
          className={classnames('project-preview__label', {
            'project-preview__label_archived': project.archived,
          })}
        >
          {preview.slice(0, MAX_LENGTH)}
        </div>
        {project.archived ?
          (
            <div
              className="project-preview__archive"
              onClick={(e) => {
                e.stopPropagation();
                onProjectUnArchived();
              }}
            >
              <span className="u__icon">&#xf0aa;</span>
            </div>
          ) :
          (
            <div
              className="project-preview__archive"
              onClick={(e) => {
                e.stopPropagation();
                onProjectArchived();
              }}
            >
              <span className="u__icon">&#xf187;</span>
            </div>
          )
        }
      </div>
      <div className="project-preview__timestamp">
        {moment(project.updatedAt).fromNow()}
      </div>
    </div>
  );
}

ProjectPreview.propTypes = {
  preview: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  onProjectArchived: PropTypes.func.isRequired,
  onProjectUnArchived: PropTypes.func.isRequired,
};
