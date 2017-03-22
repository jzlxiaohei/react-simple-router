import { Comp1, Comp2 } from './example';
import { Layout1, Layout2, Layout3 } from './layout';

export default[
  {
    path: '/1',
    Container: Layout1,
    component: Comp1,
    onEnter() {},
    onLeave() {},
  },
  {
    path: '/2',
    Container: [Layout1, Layout2],
    fetchComponent() {
      return Promise.resolve(Comp2);
    },
    onEnter() {},
    onLeave() {},
  },
  {
    path: '/3',
    Container: [Layout1, Layout2, Layout3],
    fetchComponent() {
      return Promise.resolve(Comp2);
    },
  },
  {
    path: '/3',
    Container: [Layout1, Layout2, Layout3],
    fetchComponent() {
      return Promise.resolve(Comp2);
    },
  },
];
