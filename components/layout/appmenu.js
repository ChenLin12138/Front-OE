import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import Link from "next/link";
import { AppSubmenu, AppMenuItem } from "./appmenuitem";
import {
  UserAddOutlined,
  SettingOutlined,
  TeamOutlined,
  BookOutlined,
  SelectOutlined,
  HomeOutlined,
  DashboardOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import LayoutService from "./layoutservice";
import { useRouter } from "next/router";
import loginTypes from "../types/logintypes";
import { AppMenuKeys } from "../layout/appmenuconfig";

function AppMenu() {
  const [openKeys, SetOpenKeys] = useState([]);
  const [selectedKeys, SetSelectedKeys] = useState([]);
  const router = useRouter();
  const path = router.pathname;
  const {student, teacher } = loginTypes;

  useEffect(() => {
    SetOpenKeys(LayoutService.getOpenKeys(path));
    SetSelectedKeys(LayoutService.getSelectedkeys(path));
  }, []);

  const onOpenChange = (openKeys) => {
    SetOpenKeys(openKeys);
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
    >
      <AppSubmenu
        key={AppMenuKeys.homeSubMenu}
        icon={<HomeOutlined />}
        title="Home"
      >
        <AppMenuItem
          key={AppMenuKeys.dashBoard}
          icon={<DashboardOutlined />}
        >
          <Link href={AppMenuKeys.dashBoard}>
            <a>Dashboard</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu
        key={AppMenuKeys.studentSubMenu}
        icon={<TeamOutlined />}
        title="Students"
        owners={[student, teacher]}
      >
        <AppMenuItem
          key={AppMenuKeys.studentList}
          icon={<TeamOutlined />}
          owners={[teacher]}
        >
          <Link href={AppMenuKeys.studentList}>
            <a>Student List</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem
          key={AppMenuKeys.editStudent}
          icon={<UserAddOutlined />}
          owners={[teacher]}
        >
          <Link href={AppMenuKeys.editStudent}>
            <a>Add Student</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem
          key={AppMenuKeys.studentSelection}
          icon={<SelectOutlined />}
          owners={[teacher, student]}
        >
          <Link href={AppMenuKeys.studentSelection}>
            <a>Selections</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu
        key={AppMenuKeys.courseSubMenu}
        icon={<BookOutlined />}
        title="Course"
        owners={[teacher]}
      >
        <AppMenuItem key={AppMenuKeys.courseList} owners={[teacher]}>
          <Link href={AppMenuKeys.courseList}>
            <a>Course List</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem key={AppMenuKeys.editCourse} owners={[teacher]}>
          <Link href={AppMenuKeys.editCourse}>
            <a>Add Course</a>
          </Link>
        </AppMenuItem>
        <AppMenuItem key={AppMenuKeys.courseType} owners={[teacher]}>
          <Link href={AppMenuKeys.courseType}>
            <a>Course Type</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu
        key={AppMenuKeys.teacherSubMenu}
        title="Teacher"
        icon={<TeamOutlined />}
      >
        <AppMenuItem key={AppMenuKeys.teacherList} icon={<TeamOutlined />}>
          <Link href={AppMenuKeys.teacherList}>
            <a>Teacher List</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu
        key={AppMenuKeys.managerSubMenu}
        title="Manager"
        icon={<TeamOutlined />}
      >
        <AppMenuItem key={AppMenuKeys.managerList} icon={<TeamOutlined />}>
          <Link href={AppMenuKeys.managerList}>
            <a>Manager List</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu key={AppMenuKeys.roleSubMenu} title="Role" icon={<UserSwitchOutlined />}>
        <AppMenuItem key={AppMenuKeys.roleList}>
          <Link href={AppMenuKeys.roleList}>
            <a>Role List</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
      <AppSubmenu
        key={AppMenuKeys.settingSubMenu}
        icon={<SettingOutlined />}
        title="Settings"
      >
        <AppMenuItem key={AppMenuKeys.settingPassword}>
          <Link href={AppMenuKeys.settingPassword}>
            <a>Change Password</a>
          </Link>
        </AppMenuItem>
      </AppSubmenu>
    </Menu>
  );
}

export default AppMenu;