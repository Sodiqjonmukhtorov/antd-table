import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, deleteUser, filterUser, cancelFilterUser, updateUsername } from '../features/Users';
import { Layout, Table, Input, InputNumber, Button, Modal, DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';

const { Header } = Layout;
const { Search } = Input;


const Home = () => {
  const dispatch = useDispatch();
  let userList = useSelector((state) => state.users.value);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [grade, setGrade] = useState('');
  const [newName, setNewName] = useState("");
  const [newBirthday, setNewBirthday] = useState("");
  const [newGrade, setNewGrade] = useState('');
  const [user, setUser] = useState("");

  const showModalAddModal = () => {
    setIsAddModalOpen(true);
  };

  const showModalEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleOkAddModal = () => {
    setIsAddModalOpen(false);
    if (name !== "" || birthday !== "" || grade !== "") {
      dispatch(addUser({id: userList[userList.length-1].id + 1, name, birthday, grade}));
    }
    setName("");
    setBirthday("");
    setGrade("");
  };

  const handleOkEditModal = () => {
    setIsEditModalOpen(false);
    console.log(newGrade)
    // if (type newGrade === '') {
    //   setNewGrade(user.grade)
    // }
    dispatch(updateUsername({
      id: user.id, 
      name: newName !== '' ? newName : user.name, 
      birthday: newBirthday !== '' ? newBirthday : user.birthday, 
      grade: typeof newGrade === 'string' || newGrade === null ? user.grade : newGrade
      // name: newName,
      // birthday: newBirthday,
      // grade: newGrade

      }));
    setNewName("");
    setNewBirthday("");
    setNewGrade("");
  };

  const handleCancelAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleCancelEditModal = () => {
    setIsEditModalOpen(false);
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 3,
      },
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
      sorter: {
        compare: (a, b) =>
          moment(a.birthday, "DD-MM-YYYY") - moment(b.birthday, "DD-MM-YYYY"),
          multiple: 2,
      },
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      sorter: {
        compare: (a, b) => a.grade - b.grade,
        multiple: 1,
      },  
    },
    {
      title: '',
      dataIndex: 'edit',
      render: (record, id) =>  {
        return (
          <Button
            type="primary"
            style={{background: 'teal'}}
            onClick={() => {
              showModalEditModal();
              setUser(id);
            }}>
            EDIT
          </Button>
        )
      } 
    },
    {
      title: '',
      dataIndex: 'delete',
      render: (record, id) =>  {
        return (
          <Button
            type="primary"
            style={{background: 'teal'}}
            onClick={()=> {dispatch(deleteUser(id))}}
          >
            DELETE
          </Button>
        )
      } 
    }
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const onSearch = (value) => {
    console.log(value);
    dispatch(filterUser(value));
  };

  return (
    <Layout className="layout" style={{background: 'white', }}>
      {/* header of page */}
      <Header className='header' style={{width: '100vw', background: 'lightseagreen', textAlign: 'center', 
        fontSize: '24px', fontWeight: 'bold', color: 'white', position: 'fixed', zIndex: 2}}>
        React Antd CRUD Project
      </Header>

      <Space direction='horizontal' style={{marginTop: '80px'}}>
      {/* button for open modal */}
        <Button type="primary"
          style={{background: 'teal', width: 'fit-content', marginLeft: '30px'}}
          onClick={showModalAddModal}>
          ADD
        </Button>

        {/* input for search */}
        <Search
          placeholder='Search'
          onSearch={onSearch}
          style={{width: '200px', marginLeft: '40px'}}
        />

        {/* cancel search results */}
        <Button type='primary'
          style={{background: 'teal', width: 'fit-content', marginLeft: '30px'}}
          onClick={()=>dispatch(cancelFilterUser())}
        >
          CANCEL SEARCH
        </Button>

      </Space>

      {/* Modal for add user */}
      <Modal title='ADD NEW USER' 
        style={{marginTop: '100px'}}
        headStyle={{color: 'teal'}}
        cancelButtonProps={{style: {color: 'teal'}}}
        okButtonProps={{style:{background: "teal"}}}
        open={isAddModalOpen} onOk={handleOkAddModal} onCancel={handleCancelAddModal}
        destroyOnClose
      >
        <div className='modalLabel'>Name</div>
        <Input placeholder='Name' type='text' onChange={(event)=>{setName(event.target.value)}}/>
        <div className='modalLabel'>Birthday</div>
        <DatePicker 
          onChange={(value)=>{setBirthday(typeof value !== 'string' ? value.format('DD.MM.YYYY') : '')}} 
          format={'DD.MM.YYYY'}
          inputReadOnly 
          defaultValue={""}
        />
        <div className='modalLabel'>Grade (from 0 to 100)</div>
        <InputNumber min={0} max={100} placeholder='Grade' onChange={(value)=>{setGrade(value)}}/>
      </Modal>

      {/* Modal for edit user */}
      <Modal title="EDIT USER" 
        style={{marginTop: '100px'}}
        headStyle={{color: 'teal'}}
        cancelButtonProps={{style: {color: 'teal'}}}
        okButtonProps={{style:{background: "teal"}}}
        open={isEditModalOpen} onOk={handleOkEditModal} onCancel={handleCancelEditModal}
        destroyOnClose
      >
        <div className='modalLabel'>Name</div>
        <Input placeholder='Name' type='text' defaultValue={user.name} onChange={(event)=>{setNewName(event.target.value)}}/>
        <div className='modalLabel'>Birthday</div>
        <DatePicker 
          onChange={(value)=>{setNewBirthday(value !== null ? value.format('DD.MM.YYYY') : '')}} 
          allowClear={false}
          inputReadOnly 
          defaultValue={typeof user.birthday === 'string' && user.birthday !== '' ? dayjs(user.birthday, 'DD.MM.YYYY'): ''}
          format={'DD.MM.YYYY'}
        />
        <div className='modalLabel'>Grade (from 0 to 100)</div>
        <InputNumber min={0} max={100} placeholder='Grade' onChange={(value)=>{setNewGrade(value)}} defaultValue={user.grade}/>
      </Modal>
      
      {/* table with data */} 
      <div style={{display: 'block', width: '100%', padding: 30}}>
        <h3>Student math grades</h3>
        <Table dataSource={userList} columns={columns} onChange={onChange} rowKey='id' style={{marginTop: '10px'}}/>
      </div>
    </Layout>
  )
}

export default Home;