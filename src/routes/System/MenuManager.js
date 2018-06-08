// #系统设置 - 菜单管理
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

@connect(({ systemmenu, loading }) => ({
  systemmenu,
  loading: loading.models.systemmenu,
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
      type: 'systemmenu/delete',
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
      type: 'systemmenu/fetch',
      payload: values,
    });
  };

  updateState = (e, value) => {
    e.stopPropagation();

    let menu1 = {};
    this.props.systemmenu.data.list.forEach(menu => {
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

      console.log(this.state.showEditStatus);
      this.props.systemmenu.data.list.forEach(menu => {
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

  info = menu => {
    let parentName = '';
    this.props.systemmenu.data.list.forEach(menu1 => {
      if (menu1.id === menu.parentId) {
        parentName = menu1.menuName;
      }
    });
    this.setState({
      showEditStatus: 1,
      id: menu.id,
      menu: menu,
    });
    this.props.form.setFieldsValue({
      menuName: menu.menuName,
      permissionCode: menu.permissionCode,
      menuType: menu.menuType,
      menuUrl: menu.menuUrl,
      menuImg: menu.menuImg,
      parentName: parentName,
    });
  };

  recursion(MenuList, i) {
    if (MenuList.size <= 0) {
      return;
    }
    let arr = [];
    let j = 0;
    MenuList.forEach(menu => {
      if (menu.parentId === i) {
        arr[j] = (
          <TreeNode
            title={
              <div style={style} onClick={() => this.info(menu)}>
                <Icon
                  type={menu.menuType === 2 ? 'file' : menu.menuType === 3 ? 'tag-o' : 'folder'}
                />&nbsp;&nbsp;{menu.menuName}&nbsp;&nbsp;
                <Dropdown trigger={['click']} overlay={this.Caidan} placement="bottomLeft">
                  <Icon onClick={this.handleButtonClick.bind(this, menu.id)} type="caret-down" />
                </Dropdown>
              </div>
            }
            key={menu.id}
          >
            {this.recursion(MenuList, menu.id)}
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
      type: 'systemmenu/fetch',
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
          type: 'systemmenu/add',
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
          type: 'systemmenu/update',
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
        type: 'systemmenu/fetch',
        payload: values,
      });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      systemmenu: { data },
    } = this.props;

    return (
      <PageHeaderLayout title={'菜单管理'}>
        <Row>
          <Col span={6}>
            <Card>
              <Tree showLine defaultExpandAll onSelect={this.onSelect}>
                <TreeNode
                  title={
                    <div style={style}>
                      <Icon type="folder" />&nbsp;&nbsp;菜单结构&nbsp;&nbsp;
                      <Dropdown trigger={['click']} overlay={this.CaidanTwo} placement="bottomLeft">
                        <Icon onClick={this.handleButtonClick.bind(this, 3)} type="caret-down" />
                      </Dropdown>
                    </div>
                  }
                  key="0-0"
                >
                  {this.recursion(data.list, -1)}
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
                  ? '菜单详情'
                  : this.state.showEditStatus === 2
                    ? '编辑菜单'
                    : '添加菜单'}
              </h2>
              <hr
                style={{
                  color: '#EBEBEB',
                  width: '90%',
                  marginLeft: '5%',
                }}
              />
              <Form style={{ marginTop: 20 }} layout="horizontal">
                <FormItem label="菜单名称" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                  {getFieldDecorator('menuName', {
                    rules: [
                      {
                        required: true,
                        message: '请输入菜单名称!',
                      },
                    ],
                  })(
                    <Input
                      disabled={this.state.showEditStatus === 1}
                      placeholder="请输入菜单名称"
                    />
                  )}
                </FormItem>
                <FormItem label="权限标识" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                  {getFieldDecorator('permissionCode', {
                    rules: [
                      {
                        required: true,
                        message: '请输入权限标识!',
                      },
                    ],
                  })(
                    <Input
                      disabled={this.state.showEditStatus === 1}
                      placeholder="请输入权限标识"
                    />
                  )}
                </FormItem>
                <FormItem label="菜单级别" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                  {getFieldDecorator('menuType', {
                    rules: [
                      {
                        required: true,
                        message: '请选择菜单级别!',
                      },
                    ],
                  })(
                    <RadioGroup disabled={this.state.showEditStatus === 1}>
                      <Radio value={1}>目录</Radio>
                      <Radio value={2}>页面</Radio>
                      <Radio value={3}>按钮</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem label="菜单地址" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                  {getFieldDecorator('menuUrl')(
                    <Input
                      disabled={this.state.showEditStatus === 1}
                      placeholder="请输入菜单地址"
                    />
                  )}
                </FormItem>
                <FormItem label="图标" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                  {getFieldDecorator('menuImg')(
                    <Input disabled={this.state.showEditStatus === 1} />
                  )}
                </FormItem>
                <FormItem label="父级菜单" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                  {getFieldDecorator('parentName')(<Input disabled />)}
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
