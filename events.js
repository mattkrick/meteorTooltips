"use strict";
var tooltips = window.tooltips = {};

tooltips.removeTooltip = function () {
  tooltips.renderedView && Blaze.remove(tooltips.renderedView);
  tooltips.renderedView = undefined;
  tooltips.templateName = undefined;
  tooltips.lastEnteredTip = undefined;
};

function tooltipEnter(e, t) {
  var iconOffset = $(e.currentTarget).offset();
  var iconWidth = e.currentTarget.offsetWidth;
  var iconHeight = e.currentTarget.offsetHeight;
  if (document.body.getElementsByClassName('tooltip').length) tooltips.removeTooltip();
  tooltips.templateName = t.data.name || t.data;

  tooltips.renderedView = Blaze.renderWithData(Template.tooltip, tooltips.templateName, document.body);
  var el = document.body.getElementsByClassName('tooltip')[0];
  var background = document.body.getElementsByClassName('tooltip-background')[0];
  var maxTop = window.innerHeight - el.offsetHeight;
  var pos = t.data && t.data.pos;
  var elWidth = $(el).outerWidth();
  var elTop, elLeft, backTop, backLeft;
  var backgroundHeadStart = 0;
  var animationName;
  switch (pos) {
    case 'above':
      elTop = Math.max(0, iconOffset.top - el.offsetHeight);
      elLeft = Math.max(0, iconOffset.left - (elWidth - iconWidth)/2);
      backTop = el.offsetHeight - backgroundHeadStart ;
      backLeft = (elWidth/2);
      animationName = 'move-up';

      break;
    case 'below':
      elTop = Math.min(maxTop, iconOffset.top + iconHeight);
      elLeft = Math.max(0, iconOffset.left - (elWidth - iconWidth)/2);
      backTop = backgroundHeadStart;
      backLeft = (elWidth/2);
      animationName = 'move-down';
      break;
    case 'right':
      elLeft = Math.min(window.innerWidth - elWidth, iconOffset.left + iconWidth);
      elTop = Math.min(iconOffset.top - (el.offsetHeight - iconHeight)/2, maxTop);
      backTop = (el.offsetHeight/2);
      backLeft = backgroundHeadStart;
      animationName = 'move-right';
      break;
    default:
      elLeft = Math.max(0, iconOffset.left - elWidth);
      elTop = Math.min(iconOffset.top - (el.offsetHeight - iconHeight)/2, maxTop);
      backTop = (el.offsetHeight/2);
      backLeft = el.offsetWidth - backgroundHeadStart;
      animationName = 'move-left';
  }
  $(el).css({
    top: elTop,
    left: elLeft,
    animationName: animationName
  });
  var radius = Math.max(el.offsetHeight, elWidth);
  $(background).css({
    top: backTop - radius,
    left: backLeft - radius,
    height: radius * 2,
    width: radius * 2
  });
}

Template.tooltipTrigger.events({
  'click .tooltip-region': function (e, t) {
    tooltipEnter(e, t);
  },
  'mouseenter .tooltip-region': function (e, t) {
    tooltipEnter(e, t);
  },
  'mouseleave .tooltip-region': function (e, t) {
    Meteor.setTimeout(function () {
      if (e.timeStamp - tooltips.lastEnteredTip < 50) return;
      if (tooltips.templateName !== (t.data.name || t.data)) return;
      tooltips.removeTooltip();
    }, 75);
  }
});

Template.tooltip.events({
  'mouseenter .tooltip': function (e, t) {
    tooltips.lastEnteredTip = e.timeStamp;
  },
  'mouseleave .tooltip': function (e, t) {
    tooltips.removeTooltip();
  }
});


