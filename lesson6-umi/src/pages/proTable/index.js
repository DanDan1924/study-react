import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import request from "../../utils/request";


const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'city',
    key: 'city',
  },
];


class proTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ProTable
        size="small"
        columns={columns}
        request={async (params)=>{
          const res = await request("/api/getProductData", {
            data: params,
            method: "post"
          })
          return Promise.resolve(res)
        }}
        rowKey="name"
        pagination={{
          defaultCurrent: 10,
        }}
    />
    );
  }
}

export default connect(
  // mapStateToProps
  ({ more }) => ({ more }),
  // mapDispatchToProps
  {
    // getProductData: values => ({
    //   type: 'more/getProductData',
    //   payload: values,
    // }),
    // getMoreDataBySearch: values => ({
    //   type: 'more/getMoreDataBySearch',
    //   payload: values,
    // }),
  },
)(proTable);
