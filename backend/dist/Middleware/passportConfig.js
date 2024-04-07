"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator"));var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _fs=_interopRequireDefault(require("fs"));var _path=_interopRequireDefault(require("path"));var _passport=_interopRequireDefault(require("passport"));var _passportJwt=require("passport-jwt");var _Users=_interopRequireDefault(require("../Model/Sequelize/Users"));var pathToKey=_path["default"].join(__dirname,'..','id_rsa_pub.pem');var PUB_KEY=_fs["default"].readFileSync(pathToKey,'utf8');var options={jwtFromRequest:_passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),secretOrKey:PUB_KEY,algorithms:['RS256']};_passport["default"].use(new _passportJwt.Strategy(options,/*#__PURE__*/function(){var _ref=(0,_asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(jwt_payload,done){var user;return _regenerator["default"].wrap(function _callee$(_context){while(1)switch(_context.prev=_context.next){case 0:_context.prev=0;_context.next=3;return _Users["default"].findOne({uid:jwt_payload.sub});case 3:user=_context.sent;if(!user){_context.next=8;break;}return _context.abrupt("return",done(null,user));case 8:return _context.abrupt("return",done(null,false));case 9:_context.next=14;break;case 11:_context.prev=11;_context.t0=_context["catch"](0);return _context.abrupt("return",done(_context.t0,false));case 14:case"end":return _context.stop();}},_callee,null,[[0,11]]);}));return function(_x,_x2){return _ref.apply(this,arguments);};}()));var _default=exports["default"]=_passport["default"];
//# sourceMappingURL=passportConfig.js.map