import REST from "./rest";
import User from "./user";
import Router from "next/router";
import Error from "../models/error";

 /**
   * * @param {object} object with key and value
   *
   * @return {string} query string
   */
  const objectToQuery = (param) => {
    if(!param) return '';
    return '?' + Object.keys(param).map((i) => {
      return i + "=" + param[i];
    }).join('&')
  }

class API {
  /**
   * Returns a teacher login result promise object.
   *
   * @param {string} req teacher login credential in Json
   * @return {promise} login result in promise
   */
  static teacherLogin(req) {
    return REST.post("teacher/login", req);
  }

  /**
   * Returns a student login result promise object.
   *
   * @param {string} req login credential in Json
   * @return {promise} login stuent result in promise
   */
  static studentLogin(req) {
    return REST.post("student/login", req);
  }

  /**
   * Returns a manager login result promise object.
   *
   * @param {string} req manager login credential in Json
   * @return {promise} login result in promise
   */
  static managerLogin(req) {
    return REST.post("manager/login", req);
  }

  /**
   * Logout from the system
   * @Logout
   */
  static logout() {
    User.deleteToken();
    User.deletePermittedMenus();
    Router.push("/");
  }

  /**
   * Returns a student list promise object.
   * @param {string} param query string
   *
   * @return {promise} student list in promise
   */
  static getStudentList(param) {
    return REST.get(`student/list${objectToQuery(param)}`);
  }

  /**
   * Returns a teacher list promise object.
   * @param {string} param query string
   *
   * @return {promise} teacher list in promise
   */
  static getTeacherist(param) {
    return REST.get(`teacher/list${objectToQuery(param)}`);
  }

  /**
   * @param teacher id
   * get a student by id
   *  @return {promise} teacher object
   */
  static getTeacher(param) {
    return REST.get(`teacher/info?id=${param}`);
  }

   /**
   * @param {object} new teacher
   * add a new teacher
   */
  static addTeacher(param) {
    return REST.post("teacher/add", param);
  }

  /**
   * @param {object} updated teacher
   * update a existing teacher
   */
  static updateTeacher(param) {
    return REST.post("teacher/update", param);
  }

   /**
   *
   * @return {promise} delete a teacher
   */
  static deleteTeacher(param) {
    return REST.post("teacher/delete", param);
  }

  /**
   * Returns a course list promise object.
   * @param {string} param query string
   *
   * @return {promise} course list in promise
   */
  static getCourseList(param) {
    return REST.get(`course/list${objectToQuery(param)}`);
  }

  /**
   * Returns a course type list promise object.
   *
   * @return {promise} course type list in promise
   */
  static getCourseTypeList() {
    return REST.get("course/type/list");
  }

  /**
   * @param {object} new course type
   * add a new course type
   */
  //Rest.post方法,此组件属于axios组件。
  static addCourseType(param) {
    return REST.post("course/type/add", param);
  }

   /**
   * @param {object} updated course type
   * update a existing course type
   */
  static updateCourseType(param) {
    return REST.post("course/type/update", param);
  }

   /**
   * @param course type id
   * get a course type by id
   *  @return {promise} course type object
   */
  static getCourseType(param) {
    return REST.get(`course/type/info?id=${param}`);
  }

  /**
   * @param {object} new course
   * add a new course
   */
  static addCourse(param) {
    return REST.post("course/add", param);
  }

  /**
   * @param {object} updated course
   * update a existing course
   */
  static updateCourse(param) {
    return REST.post("course/update", param);
  }

  /**
   * @param course id
   * get a student by id
   *  @return {promise} course object
   */
  static getCourse(param) {
    return REST.get(`course/info?id=${param}`);
  }

  /**
   * @param {object} new student
   * add a new student
   */
  static addStudent(param) {
    return REST.post("student/add", param);
  }

  /**
   * @param {object} updated student
   * update a existing student
   */
  static updateStudent(param) {
    return REST.post("student/update", param);
  }

  /**
   * @param student id
   * get a student by id
   *  @return {promise} student object
   */
  static getStudent(param) {
    return REST.get(`student/info?id=${param}`);
  }

  /**
   * Returns a student type list promise object.
   *
   * @return {promise} student type list in promise
   */
  static getStudentTypeList() {
    return REST.get("student/type/list");
  }

  /**
   * Returns a student course list promise object.
   *
   * @return {promise} student course list in promise
   */
  static getStudentCourseList(param) {
    return REST.get(`student/course/list${objectToQuery(param)}`);
  }

   /**
   *
   * @return {promise} add student course
   */
  static addStudetCourse(param) {
    return REST.post("student/course/add", param);
  }

  /**
   *
   * @return {promise} delete a student
   */
  static deleteStudent(param) {
    return REST.post("student/delete", param);
  }

   /**
   *
   * @return {promise} delete a student type
   */
  static deleteStudentType(param) {
    return REST.post("student/type/delete", param);
  }

  /**
   *
   * @return {promise} delete a course
   */
  static deleteCourse(param) {
    return REST.post("course/delete", param);
  }

  /**
   *
   * @return {promise} delete a course type
   */
  static deleteCourseType(param) {
    return REST.post("course/type/delete", param);
  }

   /**
   * Returns a manager list promise object.
   *
   * @return {promise} manager list in promise
   */
  static getManagerList(param) {
    return REST.get(`manager/list${objectToQuery(param)}`);
  }

   /**
   *
   * @return {promise} delete a manager 
   */
  static deleteManager(param) {
    return REST.post("manager/delete", param);
  }

  /**
   * @param {object} new manager
   * add a new manager
   */
  static addManager(param) {
    return REST.post("manager/add", param);
  }

  /**
   * @param {object} updated manager
   * update a existing manager
   */
  static updateManager(param) {
    return REST.post("manager/update", param);
  }

  /**
   * @param manager id
   * get a manager by id
   *  @return {promise} manager object
   */
  static getManager(param) {
    return REST.get(`manager/info?id=${param}`);
  }

   /**
   * Returns a role list promise object.
   *
   * @return {promise} role list in promise
   */
  static getRoleList(param) {
    return REST.get(`role/list${objectToQuery(param)}`);
  }

   /**
   * @param {object} new role
   * add a new role
   */
  static addRole(param) {
    return REST.post("role/add", param);
  }

  /**
   * @param {object} updated role
   * update a existing role
   */
  static updateRole(param) {
    return REST.post("role/update", param);
  }

   /**
   *
   * @return {promise} delete a role 
   */
  static deleteRole(param) {
    return REST.post("role/delete", param);
  }

  /**
   * @param role id
   * get a role by id
   *  @return {promise} role object
   */
  static getRole(param) {
    return REST.get(`role/info?id=${param}`);
  }

  /**
   * @param {object} password JSON
   * change password
   */
  static changePassword(param) {
    return REST.post("settings/password", param);
  }

  /**
  * course date stat
  */
  static getStatCourseDate() {
    return REST.get("stat/course-date");
  }

  /**
  * course pie stat
  */
  static getStatCoursePie() {
    return REST.get("stat/course-pie");
  }

   /**
   *
   * @param API reponse in  Promise
   * @return {result} bool indicating API request result
   */
  static CheckAPIResult(param) {
    return param instanceof Error ? false: true;
  }
}

export default API;
