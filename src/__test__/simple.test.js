/* eslint-disable react/jsx-filename-extension */
import { expect } from 'chai';
import React from 'react';
import _ from 'lodash';
import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import SimpleRouter from '../SimpleRouter';
import routerConfig from './config/simple.config';

describe('SimpleRouter basic method', () => {
  it('should have public methods', () => {
    const sRouter = new SimpleRouter();
    ['setRoutes', 'setHistory', 'run', 'destroy']
      .forEach((method) => {
        expect(method in sRouter).to.be.true();
        expect(_.isFunction(sRouter[method])).to.be.true();
      });
  });

  it('support Component and fetchComponent', (done) => {
    const memHistory = createMemoryHistory({
      initialEntries: ['/1'],
    });
    const sRouter = new SimpleRouter();
    sRouter.setRoutes(routerConfig);
    sRouter.setHistory(memHistory);
    sRouter._innerRender({ pathname: '/1' })
      .then((component) => {
        expect(component.props.routeConfig.path).to.eq('/1');
      })
      .then(() => {
        memHistory.push('/2');
        return sRouter._innerRender({ pathname: '/2' }).then((component) => {
          expect(component.props.routeConfig.path).to.eq('/2');
          done();
        });
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should mount right', (done) => {
    const memHistory = createMemoryHistory({
      initialEntries: ['/1'],
    });
    const sRouter = new SimpleRouter();
    sRouter.setRoutes(routerConfig);
    sRouter.setHistory(memHistory);
    sRouter.run((component) => {
      const wrapper = mount(<div>{component}</div>);
      expect(wrapper.find('.comp-1')).to.have.length(1);
      done();
    }, err => done(err));
  });

  it('should mount right after location change', (done) => {
    const memHistory = createMemoryHistory({
      initialEntries: ['/1'],
    });
    const sRouter = new SimpleRouter();
    sRouter.setRoutes(routerConfig);
    sRouter.setHistory(memHistory);
    memHistory.push('/2');
    sRouter.run((component) => {
      const wrapper = mount(<div>{component}</div>);
      expect(wrapper.find('.comp-2')).to.have.length(1);
      done();
    }, err => done(err));
  });
});
