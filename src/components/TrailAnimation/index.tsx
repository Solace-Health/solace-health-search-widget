import * as React from 'react';
import { animated, useTrail } from '@react-spring/web';

const TrailAnimation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    from: { opacity: 0, transform: 'translate3d(0,-50px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
  });
  return (
    <div>
      {trail.map((props, index) => (
        <animated.div key={index} style={props}>
          {items[index]}
        </animated.div>
      ))}
    </div>
  );
};

export default TrailAnimation;
