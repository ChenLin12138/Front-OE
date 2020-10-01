import React, { useEffect, useState } from "react";
import API from "../../lib/api";
import Notification from "../../lib/notification";
import { Modal, Button, Form, Input } from "antd";

function EditCourseTypeModal(props) {
  //该组件接受的4个props
  //visible,可见性
  //toggleModal，切换组件
  //courseTypeID，id
  //handleCourseTypeAdded，
  const { visible, toggleModal, courseTypeID, handleCourseTypeAdded } = props;
  //根据props.courseTypeID的传值判断是添加还是修改
  const isNewCourseType = !courseTypeID;
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  //useEffect是react最重要的钩子之一
  //曾经react只有一套api，而现在有两套:class API和函数钩子api,函数api主要是为了解决class api重的问题
  //钩子是用来解决非纯函数副效应的，例如函数api内的状态变化，以为存储的函数中是不应该包含状态的
  //保存状态useState()
  //保存上下文useContext()
  //保存引用useRef()()
  //通用的负效应钩子useEffect()
  //组件每渲染一次，useEffect()就会执行一次，也可以自行设置useEffect的依赖项
  //那么我们下面这个useEffect是有依赖项的，他的依赖项是[visible]，就以为这当visible变化时，useEffect执行一次
  //指定的结果是什么呢？新天直接返回渲染结果，修改去数据库获取数据进行显示。
  useEffect(() => {
    if (isNewCourseType) return;

    const fetchData = async () => {
      setLoading(true);
      API.getCourseType(courseTypeID).then((res) => {
        let success = API.CheckAPIResult(res);
        if (!success) {
          setLoading(false);
          return;
        }

        const courseType = res.data.datas[0];
        form.setFieldsValue(courseType);
        setLoading(false);
      });
    };
    fetchData();
  }, [visible]);

  const onFinish = async (input) => {
    setLoading(true);
    
    const { name } = input;
    let courseType = makeCourseType(input);

    let res;
    //新建提交API.addCourseType
    if (isNewCourseType) {
      res = await API.addCourseType(courseType);
    } else {
      res = await API.updateCourseType(courseType);
    }

    let success = API.CheckAPIResult(res);
    if (!success) {
      Notification.notify(`Course Type ${name} ${isNewCourseType ? "Added": "Edited"} Failed, Error Code: ${res['code']}, Error Message: ${res['msg']}`);
      setLoading(false);
      return;
    }

    Notification.notify(
      `Course Type ${isNewCourseType ? "Added": "Edited"} Successful`,
      `Course Type ${name} has been ${isNewCourseType ? "added": "edited"} successfully`
    );

    setLoading(false);
    toggleModal();
    // Refresh parent course type list
    handleCourseTypeAdded();
    resetForm();
  };

  const makeCourseType= (input) => {
    if (!isNewCourseType) {
      input["id"] = courseTypeID;
    }
    return input;
  };

  const resetForm = () => {
    form.resetFields();
  }

  return (
    <Modal
      visible={visible}
      title={isNewCourseType ? "Add Course Type" : "Edit Course Type"}
      onCancel={() => {
        toggleModal();
        resetForm();
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            toggleModal();
            resetForm();
          }}
        >
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          onClick={form.submit}
          loading={loading}
        >
          Save
        </Button>,
      ]}
    >
      {/* form在onFinish上指定了，提交哪个api */}
      <Form form={form} name="addcoursetype" onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input course type name!",
            },
          ]}
        >
          <Input type="text" placeholder="name" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditCourseTypeModal;