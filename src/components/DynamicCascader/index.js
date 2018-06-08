import React from 'react';
import PropTypes from 'prop-types';
import { Cascader } from 'antd';
import request from '../../utils/request';

class DynamicCascader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemHash: {},
      options: [],
    };
  }

  onPropsChange(valueArr) {
    this.props.onChange && this.props.onChange(valueArr[valueArr.length - 1], valueArr);
  }

  componentDidMount() {
    let self = this;
    if (self.props.data.length > 0) {
      self.initData(this.props.data);
    } else {
      request(self.props.url, {
        method: 'GET',
      }).then(function(data) {
        self.initData(data.result);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.data !== this.props.data);
    if (nextProps.data !== this.props.data) {
      this.initData(nextProps.data);
    }
  }

  initData(data) {
    let self = this;

    let folderNodes = [];
    let options = [];
    let hash = {};
    data.forEach(item => {
      hash[item['value']] = item;
      if (item.folder + '' == 'true') {
        folderNodes.push(item);
      }
    });

    data.forEach(item => {
      let hashVP = hash[item['parentValue']];
      if (hashVP) {
        !hashVP['children'] && (hashVP['children'] = []);
        hashVP['children'].push(item);
      } else {
        options.push(item);
      }
    });

    //folder节点,子节点为空时,递归删除
    for (let i = 0, len = folderNodes.length; i < len; i++) {
      let curNode = folderNodes[i];

      while (curNode != null && typeof curNode != 'undefined') {
        let value = curNode['value'];
        if (hash[value]['children'] && hash[value]['children'].length > 0) break;

        let pValue = curNode['parentValue'];
        let pNode = hash[pValue];
        let pArr = pNode ? pNode['children'] : options;

        let index = pArr.findIndex(item => item['value'] === value);
        if (index == -1) break;

        pArr.splice(index, 1);
        curNode = hash[pValue];
      }
    }

    self.setState({
      itemHash: hash,
      options: options,
    });
  }

  formatValue(value) {
    let result = [];

    let hash = this.state.itemHash;

    let curNode = hash[value];
    while (curNode) {
      result.unshift(curNode['value']);
      let pValue = curNode['parentValue'];
      curNode = hash[pValue];
    }
    return result;
  }

  render() {
    let fValue = this.formatValue(this.props.cvalue);
    return (
      <Cascader
        options={this.state.options}
        value={fValue}
        expandTrigger={this.props.expandTrigger}
        size={this.props.size}
        disabled={this.props.disabled}
        getPopupContainer={this.props.getPopupContainer}
        onChange={cvalue => this.onPropsChange(cvalue)}
        style={{ width: this.props.width || '100%' }}
      />
    );
  }
}

DynamicCascader.propTypes = {
  url: PropTypes.string,
  data: PropTypes.array,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  expandTrigger: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  cvalue: PropTypes.string,
  getPopupContainer: PropTypes.func,
};

DynamicCascader.defaultProps = {
  data: [],
  expandTrigger: 'click',
  size: 'default',
  disabled: false,
  getPopupContainer: () => document.body,
};

export default DynamicCascader;
