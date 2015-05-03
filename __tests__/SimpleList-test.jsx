var jsdom = require('mocha-jsdom');
var expect = require('chai').expect;

describe('SimpleList', function () {
  jsdom();

  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var SimpleList = require('../app/scripts/views/listview/SimpleList');

  var dummyData = [
    {
      mediaID: 'V1',
      title: 'Video 1'
    },
    {
      mediaID: 'V2',
      title: 'Video 2'
    }
  ];

  it('renders a list of items', function () {
    var simpleList = TestUtils.renderIntoDocument(
      <SimpleList
        dataSource={dummyData}
        onUserClickItem={function () {}}
      />
    );
    var item = TestUtils.scryRenderedDOMComponentsWithClass(simpleList, 'item-wrapper');

    expect(item[1].getDOMNode().textContent).to.equal('Video 2');
  });

  it('gets mediaID when click on a item', function () {
    var handleUserClickItem = function (mediaID) {
      expect(mediaID).to.equal('V1');
    };
    var simpleList = TestUtils.renderIntoDocument(
      <SimpleList
        dataSource={dummyData}
        onUserClickItem={handleUserClickItem}
      />
    );
    var item = TestUtils.scryRenderedDOMComponentsWithClass(simpleList, 'item-wrapper');

    TestUtils.Simulate.click(item[0].getDOMNode());
  });
});
