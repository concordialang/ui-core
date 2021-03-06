'use strict'
var __awaiter =
	(this && this.__awaiter) ||
	function(thisArg, _arguments, P, generator) {
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value))
				} catch (e) {
					reject(e)
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value))
				} catch (e) {
					reject(e)
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: new P(function(resolve) {
							resolve(result.value)
					  }).then(fulfilled, rejected)
			}
			step(
				(generator = generator.apply(thisArg, _arguments || [])).next()
			)
		})
	}
var __generator =
	(this && this.__generator) ||
	function(thisArg, body) {
		var _ = {
				label: 0,
				sent: function() {
					if (t[0] & 1) throw t[1]
					return t[1]
				},
				trys: [],
				ops: [],
			},
			f,
			y,
			t,
			g
		return (
			(g = { next: verb(0), throw: verb(1), return: verb(2) }),
			typeof Symbol === 'function' &&
				(g[Symbol.iterator] = function() {
					return this
				}),
			g
		)
		function verb(n) {
			return function(v) {
				return step([n, v])
			}
		}
		function step(op) {
			if (f) throw new TypeError('Generator is already executing.')
			while (_)
				try {
					if (
						((f = 1),
						y &&
							(t =
								op[0] & 2
									? y['return']
									: op[0]
									? y['throw'] ||
									  ((t = y['return']) && t.call(y), 0)
									: y.next) &&
							!(t = t.call(y, op[1])).done)
					)
						return t
					if (((y = 0), t)) op = [op[0] & 2, t.value]
					switch (op[0]) {
						case 0:
						case 1:
							t = op
							break
						case 4:
							_.label++
							return { value: op[1], done: false }
						case 5:
							_.label++
							y = op[1]
							op = [0]
							continue
						case 7:
							op = _.ops.pop()
							_.trys.pop()
							continue
						default:
							if (
								!((t = _.trys),
								(t = t.length > 0 && t[t.length - 1])) &&
								(op[0] === 6 || op[0] === 2)
							) {
								_ = 0
								continue
							}
							if (
								op[0] === 3 &&
								(!t || (op[1] > t[0] && op[1] < t[3]))
							) {
								_.label = op[1]
								break
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1]
								t = op
								break
							}
							if (t && _.label < t[2]) {
								_.label = t[2]
								_.ops.push(op)
								break
							}
							if (t[2]) _.ops.pop()
							_.trys.pop()
							continue
					}
					op = body.call(thisArg, _)
				} catch (e) {
					op = [6, e]
					y = 0
				} finally {
					f = t = 0
				}
			if (op[0] & 5) throw op[1]
			return { value: op[0] ? op[1] : void 0, done: true }
		}
	}
Object.defineProperty(exports, '__esModule', { value: true })
var database_js_1 = require('database-js')
var AstProcessor = /** @class */ (function() {
	function AstProcessor() {}
	AstProcessor.prototype.filterAstFile = function(filePath) {
		return __awaiter(this, void 0, void 0, function() {
			var connection, statement, rows, error_1
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						_a.trys.push([0, 3, 4, 6])
						connection = new database_js_1.Connection(
							'json:///' + filePath
						)
						return [
							4 /*yield*/,
							connection.prepareStatement('SELECT docs'),
						]
					case 1:
						statement = _a.sent()
						return [4 /*yield*/, statement.query()]
					case 2:
						rows = _a.sent()
						return [2 /*return*/, rows]
					case 3:
						error_1 = _a.sent()
						throw error_1
					case 4:
						return [4 /*yield*/, connection.close()]
					case 5:
						_a.sent()
						return [7 /*endfinally*/]
					case 6:
						return [2 /*return*/]
				}
			})
		})
	}
	AstProcessor.prototype.getFeatureFromDoc = function(doc) {
		var name = doc.feature.name
		var position = doc.feature.location.line
		var uiElements = this.buildUiElements(doc.feature.uiElements)
		var feature = { name: name, position: position, uiElements: uiElements }
		return feature
	}
	AstProcessor.prototype.buildUiElements = function(uiElements) {
		var elements = []
		for (
			var _i = 0, uiElements_1 = uiElements;
			_i < uiElements_1.length;
			_i++
		) {
			var uiElement = uiElements_1[_i]
			var name_1 = uiElement.name
			var widget = this.getUiElementType(uiElement) || 'textbox'
			var position = uiElement.location.line
			var props = this.getUiElementProps(uiElement)
			var element = {
				name: name_1,
				widget: widget,
				position: position,
				props: props,
			}
			elements.push(element)
		}
		return elements
	}
	AstProcessor.prototype.getUiElementType = function(uiElement) {
		var TYPE_PROPERTY = 'type'
		var UI_ELEMENT_TYPE = 'ui_element_type'
		var entities = uiElement.items.find(function(item) {
			return item.property === TYPE_PROPERTY
		}).nlpResult.entities
		var elementType = entities.find(function(entity) {
			return entity.entity === UI_ELEMENT_TYPE
		}).value
		return elementType
	}
	AstProcessor.prototype.getUiElementProps = function(uiElement) {
		var items = uiElement.items.filter(function(item) {
			return item.property !== 'type'
		})
		var uiElementProps = {}
		for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
			var item = items_1[_i]
			var entities = item.nlpResult.entities
			var propertyEntity = entities.find(function(e) {
				return e.entity === 'ui_property'
			}).value
			var valueEntity = entities.find(function(e) {
				return e.entity === 'value' || e.entity === 'value_list'
			})
			uiElementProps[propertyEntity] = valueEntity
				? valueEntity.value
				: true
		}
		return uiElementProps
	}
	AstProcessor.prototype.processAstFile = function(filePath) {
		return __awaiter(this, void 0, void 0, function() {
			var content, docs, features
			var _this = this
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						return [4 /*yield*/, this.filterAstFile(filePath)]
					case 1:
						content = _a.sent()
						docs = content.shift().docs
						docs = docs.filter(function(doc) {
							return doc.feature
						})
						features = docs.map(function(doc) {
							return _this.getFeatureFromDoc(doc)
						})
						return [2 /*return*/, { features: features }]
				}
			})
		})
	}
	return AstProcessor
})()
exports.AstProcessor = AstProcessor
