import { Comp1, Comp2 } from './example';

export default[
  {
    path: '/1',
    component: Comp1,
  },
  {
    path: '/2',
    fetchComponent() {
      return Promise.resolve(Comp2);
    },
  },
];
