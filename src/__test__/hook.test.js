/* eslint-disable react/jsx-filename-extension */
import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import createMemoryHistory from 'history/createMemoryHistory';
import SimpleRouter from '../SimpleRouter';
import routerConfig from './config/hook.config';


describe('config with onEnter onLeave', () => {
  const sRouter = new SimpleRouter();
  const memHistory = createMemoryHistory();
  sRouter.setHistory(memHistory);
  sRouter.setRoutes(routerConfig);
  it('should call onEnter and onLeave', (done) => {
    const spyFns = {};
    const sinonRouteConfig = routerConfig.map((rConfig, index) => {
      const configClone = _.clone(rConfig);
      spyFns[index] = {};
      configClone.onEnter = spyFns[index].onEnter = sinon.spy();
      configClone.onLeave = spyFns[index].onLeave = sinon.spy();
      return configClone;
    });
    sRouter.setRoutes(sinonRouteConfig);
    memHistory.push('/1');
    sRouter._innerRender({ pathname: '/1' })
      .then(() => {
        expect(spyFns[0].onLeave.callCount).to.be.equal(0);
        expect(spyFns[0].onEnter.callCount).to.be.equal(1);
      })
      .then(() => {
        memHistory.push('/2');
        return sRouter._innerRender({ pathname: '/2' });
      })
      .then(() => {
        expect(spyFns[0].onLeave.callCount).to.be.equal(1);
        expect(spyFns[0].onEnter.callCount).to.be.equal(1);
        expect(spyFns[1].onLeave.callCount).to.be.equal(0);
        expect(spyFns[1].onEnter.callCount).to.be.equal(1);
      })
      .then(() => {
        memHistory.goBack();
        return sRouter._innerRender({ pathname: '/1' });
      })
      .then(() => {
        expect(spyFns[0].onLeave.callCount).to.be.equal(1);
        expect(spyFns[0].onEnter.callCount).to.be.equal(2);
        expect(spyFns[1].onLeave.callCount).to.be.equal(1);
        expect(spyFns[1].onEnter.callCount).to.be.equal(1);
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      })
      .then(() => {
        sRouter.setRoutes(routerConfig);
      });
    // sRouter.push('/1');
    // sRouter.run(() => {});
    // sRouter.destroy();
  });
});
