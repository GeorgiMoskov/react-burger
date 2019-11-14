import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = props => {
  const { controlTypesMapData, onControlTypeAdd, onControlTypeRemove } = props;

  const renderBuildControls = () => {
    return controlTypesMapData
      .map((data, controlType) => {
        return (
          <BuildControl
            key={controlType}
            controlType={controlType}
            label={data.label}
            onAdd={(controlType) => onControlTypeAdd(controlType)}
            onRemove={(controlType) => onControlTypeRemove(controlType)}
            isRemoveDisabled={!Boolean(data.amount)}
        />
        )
      })
      .toList();

  }

  return (
    <div className={classes.BuildControls}>
      {renderBuildControls()}
    </div>
  );
};

export default buildControls;
