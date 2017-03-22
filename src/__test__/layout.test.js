/* eslint-disable react/jsx-filename-extension */
import { expect } from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import SimpleRouter from '../SimpleRouter';
import routerConfig from './config/layout.config';


describe('config with Container', () => {
  const sRouter = new SimpleRouter();
  const memHistory = createMemoryHistory();
  sRouter.setHistory(memHistory);
  sRouter.setRoutes(routerConfig);
  sRouter.run((component) => {
    const wrapper = mount(<div>{component}</div>);
    expect(wrapper.find('.layout-1 .layout-2 .comp-1')).to.have.length(1);
    expect(wrapper.find('.layout-2')).to.have.length(0);
  });
  it('should work when Container is react element', () => {
    memHistory.push('/1');
    sRouter.run((component) => {
      const wrapper = mount(<div>{component}</div>);
      expect(wrapper.find('.layout-1 .comp-1')).to.have.length(1);
    });
    sRouter.destroy();
  });

  it('should work when container is array of react elements', (done) => {
    memHistory.push('/2');
    sRouter.run((component) => {
      try {
        const wrapper = mount(<div>{component}</div>);
        expect(wrapper.find('.layout-1 .layout-2 .comp-2')).to.have.length(1);
        expect(wrapper.find('.layout-2 .layout-1 .comp-2')).to.have.length(0);
        done();
      } catch (err) {
        done(err);
      }
    });
    sRouter.destroy();
  });

  it('should work when container is array of react elements', (done) => {
    memHistory.push('/2');
    sRouter.run((component) => {
      try {
        const wrapper = mount(<div>{component}</div>);
        expect(wrapper.find('.layout-1 .layout-2 .comp-2')).to.have.length(1);
        expect(wrapper.find('.layout-2 .layout-1 .comp-2')).to.have.length(0);
        done();
      } catch (err) {
        done(err);
      }
    });
    sRouter.destroy();
  });

  it('should work when container is array of react elements - 2', (done) => {
    memHistory.push('/3');
    sRouter.run((component) => {
      try {
        const wrapper = mount(<div>{component}</div>);
        expect(wrapper.find('.layout-1 .layout-2 .layout-3 .comp-2')).to.have.length(1);
        done();
      } catch (err) {
        done(err);
      }
    });
    sRouter.destroy();
  });
});
