var JisonParser = require('jison').Parser;
var grammar = require('./grammar');

var Parser = function() {

  var parser = new JisonParser(grammar);

  parser.yy.ast = _ast;
  _ast.initialize();

  return parser;

};

Parser.grammar = grammar;
module.exports = Parser;

var _ast = {

  initialize: function() {
    this._nodes = [];
    this._node = {};
    this._stash = [];
  },

  set: function(props) {
    for (k in props) this._node[k] = props[k]; 
    return this._node;
  },

  node: function(obj) {
    if (arguments.length) this._node = obj;
    return this._node;
  },

  push: function() {
    this._nodes.push(this._node);
    this._node = {};
  },

  unshift: function() {
    this._nodes.unshift(this._node);
    this._node = {};
  },

  yield: function() {
    var _nodes = this._nodes;
    this.initialize();
    return _nodes;
  }
};