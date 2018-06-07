// #系统设置 - 角色管理
import React, { Fragment, PureComponent } from 'react'
import { connect } from 'dva'
import moment from 'moment'
import { Button, Card, Divider, Dropdown, Form, Icon, Input, Menu, message, Modal, } from 'antd'
import StandardTable from 'components/StandardTable'
import DynamicCascader from 'components/DynamicCascader'
import config from '../../utils/config'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

import styles from './RoleList.less'

const FormItem = Form.Item

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',')

@Form.create()
class CreateForm extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      department: '',
    }
  }

  okHandle = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      this.props.form.resetFields()
      this.props.handleAdd(fieldsValue)
    })
  }

  getContainer = el => {
    return el
  }

  onValueChange (value) {
    this.setState({
      value: value,
    })
  }

  render () {

    const {modalVisible, form, handleModalVisible} = this.props

    return (
      <Modal
        destroyOnClose
        title="新建角色"
        visible={modalVisible}
        onOk={this.okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="角色名称">
          {form.getFieldDecorator('roleName', {
            rules: [{required: true, message: '请输入至少五个字符的规则描述！', min: 2}],
          })(<Input placeholder="请输入"/>)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="角色标识">
          {form.getFieldDecorator('roleCode', {
            rules: [{required: true, message: '请输入角色标识！'}],
          })(<Input placeholder="请输入"/>)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="角色描述">
          {form.getFieldDecorator('roleDesc', {
            rules: [{required: true, message: '请输入角色描述！', min: 6}],
          })(<Input placeholder="请输入"/>)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="角色所属部门">
          {form.getFieldDecorator('department', {
            rules: [{required: true, message: '请选择部门！'}],
          })(
            <DynamicCascader
              url={config.api.deptsAll}
              expandTrigger="hover"
              onChange={value => this.onValueChange(value)}
              cvalue={this.state.department}
              getPopupContainer={this.getContainer}
            />
          )}
        </FormItem>
      </Modal>
    )
  }
}

@Form.create()
class UpdateForm extends PureComponent {
  constructor (props) {
    super(props)
  }

  render () {
    const {updateModalVisible, handleUpdateModalVisible,stepFormValues,form} = this.props
    return (
      <Modal
        width={640}
        bodyStyle={{padding: '32px 40px 48px'}}
        destroyOnClose
        title="角色修改配置"
        visible={updateModalVisible}
        onCancel={() => handleUpdateModalVisible()}
      >
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="角色名称">
          {form.getFieldDecorator('roleName', {
            rules: [{required: true, message: '请输入至少五个字符的规则描述！', min: 2}],
            initialValue: stepFormValues.roleName
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="角色标识">
          {form.getFieldDecorator('roleCode', {
            rules: [{required: true, message: '请输入角色标识！'}],
            initialValue: stepFormValues.roleCode
          })(<Input placeholder="请输入"/>)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="角色描述">
          {form.getFieldDecorator('roleDesc', {
            rules: [{required: true, message: '请输入角色描述！', min: 6}],
            initialValue: stepFormValues.roleDesc
          })(<Input placeholder="请输入"/>)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="角色所属部门">
          {form.getFieldDecorator('department', {
            rules: [{required: true, message: '请选择部门！'}],
            initialValue: stepFormValues.department
          })(
            <DynamicCascader
              url={config.api.deptsAll}
              expandTrigger="hover"
              onChange={value => this.onValueChange(value)}
              cvalue={form.department}
              getPopupContainer={this.getContainer}
            />
          )}
        </FormItem>
      </Modal>
    )
  }
}

/* eslint react/no-multi-comp:0 */
@connect(({systemrole, loading}) => ({
  systemrole,
  loading: loading.models.systemrole,
}))

@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  }

  componentDidMount () {
    const {dispatch} = this.props
    dispatch({
      type: 'systemrole/fetch',
    })
  }

  columns = [
    {
      title: 'ID',
      dataIndex: 'roleId',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '角色标识',
      dataIndex: 'roleCode',
    },
    {
      title: '角色描述',
      dataIndex: 'roleDesc',
    },
    {
      title: '部门',
      dataIndex: 'department',
      sorter: true,
      align: 'right',
      // mark to display a total number
      needTotal: true,
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
          <Divider type="vertical"/>
          <a href="">重置密码</a>
          <Divider type="vertical"/>
          <a href="">删除</a>
        </Fragment>
      ),
    },
  ]

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const {dispatch} = this.props
    const {formValues} = this.state

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj}
      newObj[key] = getValue(filtersArg[key])
      return newObj
    }, {})

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    }
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`
    }

    dispatch({
      type: 'systemrole/fetch',
      payload: params,
    })
  }

  handleMenuClick = e => {
    const {dispatch} = this.props
    const {selectedRows} = this.state

    if (!selectedRows) return
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'systemrole/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            })
          },
        })
        break
      default:
        break
    }
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    })
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    })
  }

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    })
  }

  handleAdd = fields => {
    this.props.dispatch({
      type: 'systemrole/add',
      payload: {
        desc: fields.desc,
      },
    })

    message.success('添加成功')
    this.handleModalVisible()
  }

  handleUpdate = fields => {
    this.props.dispatch({
      type: 'systemrole/update',
      payload: {
        name: fields.name,
        desc: fields.desc,
        key: fields.key,
      },
    })

    message.success('配置成功')
    this.handleUpdateModalVisible()
  }

  render () {
    const {
      systemrole: {result},
      loading,
    } = this.props
    const {selectedRows, modalVisible, updateModalVisible, stepFormValues} = this.state
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    )

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    }
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    }
    return (
      <PageHeaderLayout title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down"/>
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={result.data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              rowKey="id"
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible}/>
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            stepFormValues={stepFormValues}
          />
        ) : null}
      </PageHeaderLayout>
    )
  }
}
