"use strict";

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ageOfDate_1 = require("./util/ageOfDate");
var ResultViewer_1 = require("./ResultViewer");
var react_redux_1 = require("react-redux");
var reselect_1 = require("reselect");
var selectors_1 = require("../../state/sessions/selectors");
var styled_1 = require("../../styled");
var reducers_1 = require("../../state/sessions/reducers");
var defaultResponseRecord = new reducers_1.ResponseRecord({
  date: '',
  time: new Date(),
  resultID: 'default-id'
});
var Results = function Results(_a) {
  var setRef = _a.setRef,
      responses = _a.responses;
  var response1 = responses.get(0) || defaultResponseRecord;
  var isSubscription = responses.size > 1;
  return React.createElement(
    ResultWindow,
    { ref: setRef, isSubscription: isSubscription },
    responses.size <= 1 ? React.createElement(
      Response,
      { key: 'first', isSubscription: isSubscription },
      responses.size > 1 && response1.time && React.createElement(
        SubscriptionTime,
        null,
        React.createElement(
          SubscriptionTimeText,
          null,
          ageOfDate_1.default(response1.time)
        )
      ),
      React.createElement(
        ResultWrapper,
        { isSubscription: isSubscription },
        React.createElement(ResultViewer_1.ResultViewer, { value: response1.date, isSubscription: isSubscription })
      )
    ) : responses.map(function (response) {
      return React.createElement(
        Response,
        { key: response.resultID || String(response.time), isSubscription: isSubscription },
        responses.size > 1 && response.time && React.createElement(
          SubscriptionTime,
          null,
          React.createElement(
            SubscriptionTimeText,
            null,
            ageOfDate_1.default(response.time)
          )
        ),
        React.createElement(
          ResultWrapper,
          { isSubscription: responses.size > 1 },
          React.createElement(ResultViewer_1.ResultViewer, { value: response.date, isSubscription: isSubscription })
        )
      );
    })
  );
};
var mapStateToProps = reselect_1.createStructuredSelector({
  responses: selectors_1.getResponses
});
exports.default = react_redux_1.connect(mapStateToProps)(Results);
var ResultWindow = styled_1.styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 1;\n  position: relative;\n  overflow: ", ";\n  max-height: none !important;\n\n  .cm-string {\n    color: rgb(41, 185, 115);\n  }\n\n  .cm-def {\n    color: rgb(241, 143, 1);\n  }\n\n  .cm-property {\n    color: rgb(51, 147, 220);\n  }\n\n  &::-webkit-scrollbar {\n    display: none;\n  }\n\n  .CodeMirror {\n    background: ", ";\n  }\n  .CodeMirror-gutters {\n    cursor: col-resize;\n  }\n  .CodeMirror-foldgutter,\n  .CodeMirror-foldgutter-open:after,\n  .CodeMirror-foldgutter-folded:after {\n    padding-left: 3px;\n  }\n"], ["\n  flex: 1;\n  position: relative;\n  overflow: ", ";\n  max-height: none !important;\n\n  .cm-string {\n    color: rgb(41, 185, 115);\n  }\n\n  .cm-def {\n    color: rgb(241, 143, 1);\n  }\n\n  .cm-property {\n    color: rgb(51, 147, 220);\n  }\n\n  &::-webkit-scrollbar {\n    display: none;\n  }\n\n  .CodeMirror {\n    background: ", ";\n  }\n  .CodeMirror-gutters {\n    cursor: col-resize;\n  }\n  .CodeMirror-foldgutter,\n  .CodeMirror-foldgutter-open:after,\n  .CodeMirror-foldgutter-folded:after {\n    padding-left: 3px;\n  }\n"])), function (props) {
  return props.isSubscription ? 'auto' : 'visible';
}, function (p) {
  return p.theme.editorColours.resultBackground;
});
var Response = styled_1.styled('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  display: flex;\n  flex: 1;\n  height: ", ";\n  flex-direction: column;\n  &:not(:first-child):last-of-type {\n    margin-bottom: 48px;\n  }\n"], ["\n  position: relative;\n  display: flex;\n  flex: 1;\n  height: ", ";\n  flex-direction: column;\n  &:not(:first-child):last-of-type {\n    margin-bottom: 48px;\n  }\n"])), function (props) {
  return props.isSubscription ? "auto" : '100%';
});
var SubscriptionTime = styled_1.styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: relative;\n  height: 17px;\n  margin-top: 12px;\n  margin-bottom: 4px;\n  &:before {\n    position: absolute;\n    width: 100%;\n    content: '';\n    top: 9px;\n    left: 95px;\n    border-top: 1px solid ", ";\n  }\n"], ["\n  position: relative;\n  height: 17px;\n  margin-top: 12px;\n  margin-bottom: 4px;\n  &:before {\n    position: absolute;\n    width: 100%;\n    content: '';\n    top: 9px;\n    left: 95px;\n    border-top: 1px solid ", ";\n  }\n"])), function (p) {
  return p.theme.colours.white20;
});
var SubscriptionTimeText = styled_1.styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  color: rgba(23, 42, 58, 1);\n  font-size: 12px;\n  color: rgba(255, 255, 255, 0.5);\n  padding-left: 15px;\n"], ["\n  color: rgba(23, 42, 58, 1);\n  font-size: 12px;\n  color: rgba(255, 255, 255, 0.5);\n  padding-left: 15px;\n"])));
var ResultWrapper = styled_1.styled('div')(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  flex: 1;\n  height: ", ";\n  position: ", ";\n"], ["\n  display: flex;\n  flex: 1;\n  height: ", ";\n  position: ", ";\n"])), function (props) {
  return props.isSubscription ? "auto" : '100%';
}, function (props) {
  return props.isSubscription ? "relative" : 'static';
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=Results.jsx.map