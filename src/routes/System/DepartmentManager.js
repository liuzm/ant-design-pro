// #系统设置 - 部门管理
import React, { PureComponent } from 'react';
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Icon,
  Input,
  Menu,
  notification,
  Radio,
  Row,
  Tree,
} from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const style = {
  width: '110%',
  height: '25px',
  textAlign: 'center',
  border: '1px solid #c5b4b4',
  lineHeight: '25px',
};

@connect(({ systemdepart, loading }) => ({
  systemdepart,
  loading: loading.models.systemdepart,
}))
@Form.create()
export default class MenuComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      showEditStatus: 1, // 1详情 2编辑 3添加
      menu: {},
    };
  }

  Caidan = (
    <Menu>
      <Menu.Item key="1">
        <a onClick={e => this.updateState(e, 3)}>添加下级目录</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a onClick={e => this.updateState(e, 2)}>编辑菜单</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a onClick={() => this.deleteMenu()}>删除菜单</a>
      </Menu.Item>
    </Menu>
  );
  CaidanTwo = (
    <Menu>
      <Menu.Item key="1">
        <a onClick={e => this.updateState(e, 3)}>添加下级目录</a>
      </Menu.Item>
    </Menu>
  );

  deleteMenu = () => {
    this.props.dispatch({
      type: 'systemdepart/delete',
      payload: {
        desc: fields.desc,
      },
      callback: payload => {
        notification.open({
          message: payload,
          icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
        });
      },
    });
    this.props.dispatch({
      type: 'systemdepart/fetch',
      payload: values,
    });
  };

  updateState = (e, value) => {
    e.stopPropagation();

    let menu1 = {};
    this.props.systemmenu.result.data.forEach(menu => {
      if (menu.id === this.state.id) {
        menu1 = menu;
      }
    });
    if (value === 2) {
      let parentName = '';
      this.setState({
        menu: menu1,
        showEditStatus: value,
      });

      this.props.systemmenu.result.data.forEach(menu => {
        if (menu.id === menu1.parentId) {
          parentName = menu.menuName;
        }
      });
      this.props.form.setFieldsValue({
        menuName: menu1.menuName,
        permissionCode: menu1.permissionCode,
        menuType: menu1.menuType,
        menuUrl: menu1.menuUrl,
        menuImg: menu1.menuImg,
        parentName: parentName,
      });
    } else {
      this.props.form.resetFields();
      this.setState({
        menu: menu1,
        showEditStatus: value,
      });
      this.props.form.setFieldsValue({
        parentName: menu1.menuName,
      });
    }
  };

  handleButtonClick = id => {
    this.setState({
      id: id,
    });
  };

  info = depart => {
    let parentName = '';
    this.props.systemdepart.result.data.forEach(menu1 => {
      if (menu1.departId === depart.parentId) {
        parentName = menu1.name;
      }
    });
    this.setState({
      showEditStatus: 1,
      id: depart.departId,
      depart: depart,
    });
    this.props.form.setFieldsValue({
      name: depart.name,
      orderNum: depart.orderNum,
      parentName: parentName,
    });
  };

  recursion(DepartList, i) {
    if (JSON.stringify(DepartList) === '{}') {
      return;
    }
    let arr = [];
    let j = 0;
    DepartList.forEach(depart => {
      if (depart.parentId === i) {
        arr[j] = (
          <TreeNode
            title={
              <div style={style} onClick={() => this.info(depart)}>
                <Icon
                  type={
                    depart.orderNum === null ? 'file' : depart.orderNum === 3 ? 'tag-o' : 'folder'
                  }
                />&nbsp;&nbsp;{depart.name}&nbsp;&nbsp;
                <Dropdown trigger={['click']} overlay={this.Caidan} placement="bottomLeft">
                  <Icon
                    onClick={this.handleButtonClick.bind(this, depart.deptId)}
                    type="caret-down"
                  />
                </Dropdown>
              </div>
            }
            key={depart.deptId}
          >
            {this.recursion(DepartList, depart.deptId)}
          </TreeNode>
        );
        j = j + 1;
      }
    });
    return arr;
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'systemdepart/fetch',
    });
  }

  Preservation = async () => {
    let adopt = false;
    this.props.form.validateFields(err => {
      if (err) {
        adopt = false;
      } else {
        adopt = true;
      }
    });
    if (adopt) {
      let json = this.props.form.getFieldsValue();
      if (this.state.showEditStatus === 3) {
        json['parentId'] = this.state.id;
        this.state.MenuList.forEach(menu => {
          if (menu.id === this.state.id) {
            json['menuNumber'] = menu.menuNumber + 1;
          }
        });
        this.props.dispatch({
          type: 'systemdepart/add',
          payload: {
            desc: fields.desc,
          },
          callback: payload => {
            notification.open({
              message: payload,
              icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
            });
          },
        });
      } else if (this.state.showEditStatus === 2) {
        json['id'] = this.state.id;

        this.props.dispatch({
          type: 'systemdepart/update',
          payload: {
            desc: fields.desc,
          },
          callback: payload => {
            notification.open({
              message: payload,
              icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
            });
          },
        });
      }
      this.props.dispatch({
        type: 'systemdepart/fetch',
        payload: values,
      });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      systemdepart: { result },
    } = this.props;

    return (
      <PageHeaderLayout title={'部门管理'}>
        <Row>
          <Col span={6}>
            <Card>
              <Tree showLine defaultExpandAll onSelect={this.onSelect}>
                <TreeNode
                  title={
                    <div style={style}>
                      <Icon type="folder" />&nbsp;&nbsp;部门组织结构&nbsp;&nbsp;
                      <Dropdown trigger={['click']} overlay={this.CaidanTwo} placement="bottomLeft">
                        <Icon onClick={this.handleButtonClick.bind(this, 3)} type="caret-down" />
                      </Dropdown>
                    </div>
                  }
                  key="0-0"
                >
                  {this.recursion(result.data, 0)}
                </TreeNode>
              </Tree>
            </Card>
          </Col>
          <Col span={18}>
            <Card>
              <h2
                style={{
                  marginLeft: '7%',
                  fontWeight: 600,
                }}
              >
                {this.state.showEditStatus === 1
                  ? '部门详情'
                  : this.state.showEditStatus === 2
                    ? '编辑部门'
                    : '添加部门'}
              </h2>
              <hr
                style={{
                  color: '#EBEBEB',
                  width: '90%',
                  marginLeft: '5%',
                }}
              />
              <Form style={{ marginTop: 20 }} layout="horizontal">
                <FormItem label="部门名称" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: '请输入部门名称!',
                      },
                    ],
                  })(
                    <Input
                      disabled={this.state.showEditStatus === 1}
                      placeholder="请输入部门名称"
                    />
                  )}
                </FormItem>

                <FormItem label="排序" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                  {getFieldDecorator('orderNum')(
                    <Input disabled={this.state.showEditStatus === 1} />
                  )}
                </FormItem>
                <FormItem label="父级菜单" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                  {getFieldDecorator('parentId')(<Input disabled />)}
                </FormItem>
                {this.state.showEditStatus !== 1 && (
                  <FormItem>
                    <Button
                      onClick={this.Preservation}
                      type="primary"
                      style={{ marginLeft: '45%' }}
                    >
                      保存
                    </Button>
                  </FormItem>
                )}
              </Form>
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
