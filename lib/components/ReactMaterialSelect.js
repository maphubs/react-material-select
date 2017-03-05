'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactMaterialSelect = function (_Component) {
    _inherits(ReactMaterialSelect, _Component);

    function ReactMaterialSelect(props) {
        _classCallCheck(this, ReactMaterialSelect);

        var _this = _possibleConstructorReturn(this, (ReactMaterialSelect.__proto__ || Object.getPrototypeOf(ReactMaterialSelect)).call(this, props));

        var selectedValue = null;

        // find selected value by dataValue
        if (props.defaultValue) {
            selectedValue = _this.getOptions().find(function (value) {
                return value.key === props.defaultValue;
            });
        }

        _this.state = {
            isOpen: false,
            rmsListTopValue: 0,
            rmsListMaxHeight: 'none',
            isSelected: selectedValue,
            selected: {
                label: selectedValue ? selectedValue.label : props.label,
                value: selectedValue ? selectedValue.key : props.defaultValue
            }
        };

        _this.mounted = true;
        _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
        _this.fireChangeEvent = _this.fireChangeEvent.bind(_this);
        _this.handleToggleSelect = _this.handleToggleSelect.bind(_this);
        _this.handleOptionClick = _this.handleOptionClick.bind(_this);
        _this.handleResetSelect = _this.handleResetSelect.bind(_this);
        _this.changeState = _this.changeState.bind(_this);
        _this.getValue = _this.getValue.bind(_this);
        _this.countTopRmsList = _this.countTopRmsList.bind(_this);
        return _this;
    }

    _createClass(ReactMaterialSelect, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('click', this.handleDocumentClick, false);
            document.addEventListener('touchend', this.handleDocumentClick, false);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.mounted = false;
            document.removeEventListener('click', this.handleDocumentClick, false);
            document.removeEventListener('touchend', this.handleDocumentClick, false);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (this.refs.rmsList && !prevState.isOpen && this.state.isOpen) {
                // opening list
                this.countTopRmsList();
            } else if (prevState.isOpen && !this.state.isOpen) {
                // closing list
                this.setState({ rmsListTopValue: 0 });
            }
        }
        // the simplest way to get selected value

    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.selected.value;
        }
    }, {
        key: 'getLabel',
        value: function getLabel() {
            return this.state.selected.label;
        }
    }, {
        key: 'handleToggleSelect',
        value: function handleToggleSelect() {
            this.setState({ isOpen: !this.state.isOpen });
        }
    }, {
        key: 'handleOptionClick',
        value: function handleOptionClick(e) {
            var value = e.target.attributes.data.value;
            var label = void 0;
            // if there is only one option this.props.children is object not an array
            if (this.props.children instanceof Array) {
                label = this.props.children[e.target.value].props.children;
            } else if (this.props.children) {
                label = this.props.children.props.children;
            }

            this.changeState({
                isOpen: false,
                isSelected: value,
                selected: {
                    value: value,
                    label: label
                }
            });
        }

        // change state with callback function

    }, {
        key: 'changeState',
        value: function changeState(newState) {
            this.fireChangeEvent(newState);
            this.setState(newState);
        }
    }, {
        key: 'handleResetSelect',
        value: function handleResetSelect() {
            this.changeState({
                isOpen: false,
                isSelected: null,
                selected: {
                    value: '',
                    label: ''
                }
            });
        }

        // close select on click outside the select

    }, {
        key: 'handleDocumentClick',
        value: function handleDocumentClick(event) {
            if (this.mounted) {
                if (!this.refs.rmsWrapper.contains(event.target)) {
                    this.setState({
                        isOpen: false
                    });
                }
            }
        }

        // fire callback function

    }, {
        key: 'fireChangeEvent',
        value: function fireChangeEvent(newState) {
            if (newState.selected.value !== this.state.selected.value && this.props.onChange) {
                this.props.onChange(newState.selected);
            }
        }

        // get childrens

    }, {
        key: 'getOptions',
        value: function getOptions() {
            // if there is only one option this.props.children is object not an array
            if (this.props.children instanceof Array) {
                // console.log(this.props.children.length, this.props.children)
                return this.props.children.map(function (child) {
                    return {
                        key: child.props.dataValue,
                        label: child.props.children
                    };
                });
            }

            if (this.props.children) {
                return [{
                    key: this.props.children.props.dataValue,
                    label: this.props.children.props.children
                }];
            }

            return [];
        }
    }, {
        key: 'countTopRmsList',
        value: function countTopRmsList() {
            var bottomMargin = 40;
            var bodyHeight = document.body.offsetHeight;
            var rect = this.refs.rmsListInner.getBoundingClientRect();
            var bottom = rect.bottom;
            var top = rect.top;
            var listHeight = bottom - top;
            var rmsListTopValue = 0;
            if (bodyHeight - bottom <= listHeight) {
                if (listHeight + bottomMargin > bodyHeight) {
                    if (top === 0) {
                        rmsListTopValue = top;
                    } else {
                        rmsListTopValue = -top;
                    }
                } else {
                    rmsListTopValue = -listHeight / 2 - bottomMargin;
                }
            }

            // rmsListTopValue: document.body.offsetHeight - this.refs.rmsList.getBoundingClientRect().bottom > this.refs.rmsList.offsetHeight ? 0 : -this.refs.rmsList.offsetHeight / 2 - bottomMargin,


            this.setState({
                rmsListTopValue: rmsListTopValue,
                rmsListMaxHeight: bodyHeight + 'px'
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                label = _props.label,
                resetLabel = _props.resetLabel;


            var textClassName = (0, _classnames2.default)('rms-text', { 'rms-text__empty': !this.state.isSelected });
            return _react2.default.createElement(
                'div',
                { className: 'rms-wrapper', ref: 'rmsWrapper' },
                _react2.default.createElement(
                    'div',
                    { className: textClassName, onClick: this.handleToggleSelect },
                    _react2.default.createElement(
                        'span',
                        null,
                        this.state.selected.label ? this.state.selected.label : label
                    )
                ),
                _react2.default.createElement(
                    'label',
                    { className: 'rms-label' },
                    label
                ),
                _react2.default.createElement(
                    'i',
                    { className: 'rms-caret' },
                    'arrow_drop_down'
                ),
                this.state.isOpen && _react2.default.createElement(
                    'ul',
                    { ref: 'rmsList', className: 'rms-list', style: { top: this.state.rmsListTopValue, maxHeight: '100vh', overflowY: 'auto' } },
                    _react2.default.createElement(
                        'div',
                        { ref: 'rmsListInner' },
                        resetLabel && _react2.default.createElement(
                            'li',
                            { className: 'rms-item rms-item__reset', onMouseDown: this.handleResetSelect, onClick: this.handleResetSelect },
                            resetLabel
                        ),
                        this.getOptions().map(function (opt, key) {
                            var selectClassName = (0, _classnames2.default)('rms-item', { 'rms-item__active': opt.selected });
                            return _react2.default.createElement(
                                'li',
                                { key: 'reactMaterialSelect_' + key, className: selectClassName, value: key, data: opt.key, onMouseDown: _this2.handleOptionClick, onClick: _this2.handleOptionClick },
                                opt.label
                            );
                        })
                    )
                )
            );
        }
    }]);

    return ReactMaterialSelect;
}(_react.Component);

ReactMaterialSelect.propTypes = {
    children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]).isRequired,
    defaultValue: _react.PropTypes.string,
    resetLabel: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool]),
    onChange: _react.PropTypes.func,
    label: _react.PropTypes.string
};

ReactMaterialSelect.defaultProps = {
    resetLabel: 'No value'
};

exports.default = ReactMaterialSelect;