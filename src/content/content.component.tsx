import * as React from 'react';
import classes from './content.module.scss';

export const Content = (props: any) => {
  const componentClasses = [classes.content];
  if (props.className) {
    componentClasses.push(props.className);
  }
  return (
    <div className={componentClasses.join(' ')}>
      {props.children}
    </div>
  );
};
