import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import { Table, Space, Popconfirm, message ,Button } from 'antd';
import EditCourseTypeModal from "./editcoursetypemodal";
import SearchBar from "../searchbar";
import Helper from "../../lib/helper"

const { Column } = Table;

function  CourseTypeList() {
  const [courseTypeData, setCourseTypeData] = useState([]);

  const [search, setSearch] = useState();
  const onSearch = (value) => {
    setPagination({...pagination, current: 1});
    setSearch(value);
  };

  const [courseTypeID, setCourseTypeID] = useState();
  const [updateCounter, setUpdateCounter] = useState(0);
  const handleCourseTypeAdded = () => {
    setUpdateCounter(updateCounter + 1);
  };

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, showSizeChanger: true });

  const fetchData = async () => {
    setLoading(true);
    let params = Helper.paginationToUrlObject(pagination);
    if (search) {
      params['kw'] = search;
    }
    API.getCourseTypeList(params).then((res) => {
      let success = API.CheckAPIResult(res);
      if (!success) {
        setLoading(false);
        return;
      }
      let data = res.data.datas.map((item) => {
        return {
          ...item,
          key: item["id"],
        };
      });
      setPagination({
        ...pagination,
        // total: res.data["pager"]["rowcount"],
      });
      setCourseTypeData(data);
      setLoading(false);
    });
  }
  useEffect(() => {
    fetchData();
  }, [updateCounter, search]);

  //useState是一个ReactHooks的用法
  //当我们用函数而不是类来写组件的时候，函数要用到state，那么我们就通过useState使用state.
  //第一个元素是state的对象内容，第二个对象等价于setState方法
  //调用setState方法后，数据发生变化，页面会重新渲染
  const [modalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
    if (modalVisible) {
      setCourseTypeID();
    }
    setModalVisible(!modalVisible);
  };

  const onDelete = async (courseType) => {
    const res = await API.deleteCourseType({ id: courseType["id"] });
    let success = API.CheckAPIResult(res);
    if (!success) {
      message.error(`Error occured: ${res['msg']}`);
      return;
    }
    message.success('Course Type Deleted');
    setUpdateCounter(updateCounter + 1);
  };

  const onTableChange = (pagination, filters, sorter, extra) => {
    setPagination(pagination);
    setUpdateCounter(updateCounter + 1);
  }

  return (
    <React.Fragment>
      <div>
        <Button type="primary" onClick={toggleModal}>
          Add Course Type
        </Button>
      </div>
      <br />
      {/* 这里向EditCourseTypeModal传入4个props */}
      <EditCourseTypeModal
        visible={modalVisible}
        handleCourseTypeAdded={handleCourseTypeAdded}
        toggleModal={toggleModal}
        courseTypeID={courseTypeID}
      />
      <div style={{ width: "30%" }}>
        <SearchBar placeHolder="search by name" onSearch={onSearch} />
      </div>
      <br />
      <Table dataSource={courseTypeData} onChange={onTableChange} loading={loading} pagination={pagination}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          sorter={(a, b) => a["name"].localeCompare(b["name"])}
        />
        <Column title="Created At" dataIndex="ctime" key="ctime" />
        <Column
          title="Action"
          dataIndex="action"
          render={(text, record) => (
            <Space size="middle">
              <a
                onClick={() => {
                  toggleModal();
                  setCourseTypeID(record["id"]);
                }}
              >
                Edit
              </a>
              <Popconfirm
                title="Are you sure to delete this course type?"
                onConfirm={() => {
                  onDelete(record);
                }}
                okText="Yes"
                cancelText="No"
              >
                <a>Delete</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </React.Fragment>
  );
}

export default CourseTypeList;